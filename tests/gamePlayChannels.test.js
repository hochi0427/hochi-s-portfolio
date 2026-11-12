import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRenderer } from 'vue';

const renderer = createRenderer({
  createComment: () => ({}), insert() {}, remove() {}, parentNode() {}, nextSibling() {},
});
let scenario = 0;
async function fixture(saved, blocked = false) {
  // A fresh module simulates a new page load; remount() retains the session fallback.
  const { useGameChannels } = await import(`../src/components/world/useGameChannels.js?case=${scenario++}`);
  const storage = new Map(saved === undefined ? [] : [['hochi:game-play-channel', JSON.stringify(saved)]]);
  const previousWindow = globalThis.window;
  const originalSet = globalThis.setTimeout;
  const originalClear = globalThis.clearTimeout;
  const timers = new Map();
  let sequence = 0;
  globalThis.window = { sessionStorage: {
    getItem(key) { if (blocked) throw Error('blocked'); return storage.get(key) ?? null; },
    setItem(key, value) { if (blocked) throw Error('blocked'); storage.set(key, value); },
  } };
  globalThis.setTimeout = (callback, delay) => { timers.set(++sequence, { callback, delay }); return sequence; };
  globalThis.clearTimeout = id => timers.delete(id);
  const apps = [];
  function mount() {
    let state;
    const app = renderer.createApp({ setup() { state = useGameChannels(7); return () => null; } });
    app.mount({});
    apps.push(app);
    return state;
  }
  return {
    state: mount(), mount, timers, storage,
    advance() { for (const [id, timer] of [...timers]) { timers.delete(id); timer.callback(); } },
    close() {
      apps.forEach(app => app.unmount());
      globalThis.window = previousWindow;
      globalThis.setTimeout = originalSet;
      globalThis.clearTimeout = originalClear;
    },
  };
}

test('first visit keeps CH 00 under the tutorial, then schedules exactly one six-second transition', async () => {
  const f = await fixture();
  try {
    assert.equal(f.state.selected.value, -1);
    assert.equal(f.state.firstVisit, true);
    assert.equal(f.timers.size, 0);
    f.state.tutorialChanged(true);
    f.advance();
    assert.equal(f.state.selected.value, -1);
    assert.equal(f.timers.size, 0);
    f.state.tutorialChanged(false);
    assert.equal(f.timers.size, 1);
    f.state.tutorialChanged(false);
    assert.equal(f.timers.size, 1);
    assert.equal([...f.timers.values()][0].delay, 6000);
    f.advance();
    assert.equal(f.state.selected.value, 0);
    assert.equal(f.timers.size, 0);
    assert.equal(f.storage.get('hochi:game-play-channel'), '0');
  } finally { f.close(); }
});

test('manual navigation cancels auto advance, wraps through CH 00, and never restarts its timer', async () => {
  const f = await fixture();
  try {
    f.state.stepChannel(-1);
    assert.equal(f.state.selected.value, 6);
    assert.equal(f.timers.size, 0);
    f.state.stepChannel(1);
    assert.equal(f.state.selected.value, -1);
    f.advance();
    assert.equal(f.state.selected.value, -1);
    f.state.stepChannel(1);
    assert.equal(f.state.selected.value, 0);
    f.state.selectChannel(3);
    f.state.tutorialChanged(false);
    f.advance();
    assert.equal(f.state.selected.value, 3);
    assert.equal(f.mount().selected.value, 3);
    assert.equal(f.timers.size, 0);
  } finally { f.close(); }
});

test('saved project is restored synchronously without introduction or timer', async () => {
  const f = await fixture(4);
  try {
    assert.equal(f.state.selected.value, 4);
    assert.equal(f.state.firstVisit, false);
    f.state.tutorialChanged(true);
    f.state.tutorialChanged(false);
    assert.equal(f.timers.size, 0);
  } finally { f.close(); }
});

test('manually revisited CH 00 restores without auto advance', async () => {
  const f = await fixture(-1);
  try {
    assert.equal(f.state.selected.value, -1);
    assert.equal(f.timers.size, 0);
  } finally { f.close(); }
});

test('unmount clears pending timers and an interrupted initial welcome resumes at CH 01', async () => {
  const f = await fixture();
  f.state.tutorialChanged(false);
  assert.equal(f.timers.size, 1);
  f.close();
  assert.equal(f.timers.size, 0);
  const returning = await fixture(JSON.parse(f.storage.get('hochi:game-play-channel')));
  try {
    assert.equal(returning.state.selected.value, 0);
    assert.equal(returning.timers.size, 0);
  } finally { returning.close(); }
});

test('blocked storage uses the in-memory fallback across internal navigation', async () => {
  const f = await fixture(undefined, true);
  try {
    f.state.selectChannel(5);
    assert.equal(f.mount().selected.value, 5);
    assert.equal(f.timers.size, 0);
  } finally { f.close(); }
});

test('invalid stored channel recovers and invalid manual selections are ignored', async () => {
  const f = await fixture(99);
  try {
    assert.equal(f.state.selected.value, -1);
    f.state.selectChannel(99);
    assert.equal(f.state.selected.value, -1);
    assert.equal(f.timers.size, 0);
    f.state.tutorialChanged(false);
    assert.equal(f.timers.size, 1);
  } finally { f.close(); }
});

test('project selection during the tutorial prevents its completion notification from scheduling an override', async () => {
  const f = await fixture();
  try {
    f.state.tutorialChanged(true);
    f.state.selectChannel(1);
    f.state.tutorialChanged(false);
    f.advance();
    assert.equal(f.state.selected.value, 1);
    assert.equal(f.timers.size, 0);
    assert.equal(f.mount().selected.value, 1);
  } finally { f.close(); }
});

test('manual project selection cancels the intro timer after skipping the tutorial', async () => {
  const f = await fixture();
  try {
    f.state.tutorialChanged(false);
    assert.equal(f.timers.size, 1);
    f.state.selectChannel(4);
    f.advance();
    assert.equal(f.state.selected.value, 4);
    assert.equal(f.timers.size, 0);
  } finally { f.close(); }
});

test('compass replay cancels pending auto advance and never resets the selected channel', async () => {
  const f = await fixture();
  try {
    f.state.tutorialChanged(false);
    assert.equal(f.timers.size, 1);
    f.state.tutorialChanged(true);
    assert.equal(f.timers.size, 0);
    f.state.tutorialChanged(false);
    f.advance();
    assert.equal(f.state.selected.value, -1);
    assert.equal(f.timers.size, 0);
    f.state.selectChannel(5);
    f.state.tutorialChanged(true);
    f.state.tutorialChanged(false);
    assert.equal(f.state.selected.value, 5);
  } finally { f.close(); }
});
