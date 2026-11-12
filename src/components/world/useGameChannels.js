import { onBeforeUnmount, ref } from "vue";

const SESSION_KEY = "hochi:game-play-channel";
let memorySelection = null;

// Read before the first render so returning visitors never flash CH 00.
export function useGameChannels(projectCount) {
  const valid = value => Number.isInteger(value) && value >= -1 && value < projectCount;
  let restored = memorySelection;
  try {
    const saved = window.sessionStorage.getItem(SESSION_KEY);
    if (saved !== null && valid(JSON.parse(saved))) restored = JSON.parse(saved);
  } catch { /* Keep session navigation working when storage is unavailable. */ }
  const firstVisit = !valid(restored);
  const selected = ref(firstVisit ? -1 : restored);
  let introTimer = null;
  let introEligible = firstVisit;

  function save(index) {
    memorySelection = index;
    try { window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(index)); }
    catch { /* The in-memory fallback lasts through internal navigation. */ }
  }
  // Leaving the initial welcome early should resume at the first project.
  if (firstVisit) save(0);

  function clearIntroTimer() {
    if (introTimer !== null) clearTimeout(introTimer);
    introTimer = null;
  }
  function cancelIntro() {
    clearIntroTimer();
    introEligible = false;
  }
  function tutorialChanged(active) {
    // Loading/alignment time belongs to the tutorial too, not the six-second intro.
    if (active) { clearIntroTimer(); return; }
    if (!introEligible || selected.value !== -1) return;
    introEligible = false;
    introTimer = setTimeout(() => selectChannel(0), 6000);
  }
  function selectChannel(index) {
    if (!valid(index)) return;
    cancelIntro();
    selected.value = index;
    save(index);
  }
  function stepChannel(direction) {
    const channelCount = projectCount + 1;
    selectChannel(((selected.value + 1 + direction) % channelCount + channelCount) % channelCount - 1);
  }
  onBeforeUnmount(cancelIntro);
  return { selected, firstVisit, selectChannel, stepChannel, cancelIntro, tutorialChanged };
}
