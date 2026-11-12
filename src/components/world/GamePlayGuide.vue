<template>
  <div ref="guideTools" class="compass-guide" @keydown.esc.stop="closeGuide">
    <button ref="compassButton" class="compass-guide__trigger" type="button" aria-label="Compass Guide" title="How to Explore" :aria-expanded="guideOpen" :aria-controls="panelId" :disabled="visible" @click="guideOpen = !guideOpen"><i class="fa-solid fa-compass" aria-hidden="true"></i></button>
    <Transition name="guide-fade">
      <section v-if="guideOpen" :id="panelId" class="compass-guide__panel" aria-labelledby="compass-title">
        <h2 id="compass-title">How to Explore</h2>
        <h3>Your Adventure Starts Here!</h3>
        <p>Try pressing the buttons on the screen to discover different projects. Each key has something new to explore!</p>
        <button class="guide-action" type="button" @click="startTutorial">Show Me How <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
      </section>
    </Transition>
  </div>

  <Teleport to="body">
    <Transition name="guide-fade">
      <div v-if="visible" class="key-tutorial" role="dialog" aria-modal="true" :aria-labelledby="tutorialId" :aria-owns="geometry.buttonId">
        <svg class="key-tutorial__shade" :viewBox="`0 0 ${geometry.width} ${geometry.height}`" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path :d="shadePath" fill-rule="evenodd" @pointerdown.stop.prevent @click.stop @wheel.prevent /></svg>
        <div class="key-tutorial__ring" :style="ringStyle" aria-hidden="true"><img class="key-tutorial__hand" :src="`${base}images/pixel-point-hand.svg`" alt="" /></div>
        <section ref="instruction" class="key-tutorial__instruction" :style="instructionStyle">
          <button ref="closeButton" class="close-tutorial" type="button" aria-label="Close tutorial" title="Close tutorial" @click="finishTutorial(true)"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
          <h2 :id="tutorialId">Press a key to explore!</h2>
          <p>Each key unlocks a different project.</p>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
let tutorialSeenInMemory = false;
const SESSION_KEY = "hochi:game-play-tutorial-seen";
function hasSeenTutorial() {
  if (tutorialSeenInMemory) return true;
  try { return window.sessionStorage.getItem(SESSION_KEY) === "true"; }
  catch { return false; }
}
function rememberTutorial() {
  tutorialSeenInMemory = true;
  try { window.sessionStorage.setItem(SESSION_KEY, "true"); }
  catch { /* Internal navigation still uses the in-memory fallback. */ }
}
</script>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";

const props = defineProps({ anchor: { type: Object, default: null }, controllerElement: { default: null }, targetIndex: { type: Number, required: true } });
const emit = defineEmits(["tutorial-change"]);
const base = import.meta.env.BASE_URL;
const panelId = useId();
const tutorialId = useId();
const guideTools = ref(null);
const compassButton = ref(null);
const closeButton = ref(null);
const instruction = ref(null);
const guideOpen = ref(false);
const requested = ref(!hasSeenTutorial());
const geometry = ref(null);
const visible = computed(() => requested.value && geometry.value !== null);
let layoutFrame = null;
let autoCloseTimer;
let resizeObserver;
let prepared = false;
let disposed = false;

function targetButton() {
  return props.controllerElement?.querySelectorAll(".accessible-key")[props.targetIndex];
}
function updateLayout() {
  layoutFrame = null;
  if (!requested.value || !props.anchor || disposed) return;
  const stage = props.controllerElement?.querySelector(".controller-stage");
  const button = targetButton();
  if (!stage || !button || button.disabled || !stage.clientWidth) return;
  if (!prepared) {
    prepared = true;
    button.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" });
    button.focus({ preventScroll: true });
  }
  const bounds = stage.getBoundingClientRect();
  const scale = bounds.width / stage.clientWidth;
  const x = bounds.left + props.anchor.x * scale;
  const y = bounds.top + props.anchor.y * scale;
  const radius = Math.max(38, props.anchor.radius * scale + 8);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const copyWidth = Math.min(300, width - 32);
  const copyHeight = instruction.value?.offsetHeight || 148;
  const below = y + radius + 24;
  const top = below + copyHeight <= height - 16 ? below : y - radius - copyHeight - 24;
  geometry.value = { x, y, radius, width, height, buttonId: button.id, copyWidth, copyLeft: Math.max(16, Math.min(width - copyWidth - 16, x - copyWidth / 2)), copyTop: Math.max(16, Math.min(height - copyHeight - 16, top)) };
}
function scheduleLayout() {
  if (layoutFrame === null && !disposed && requested.value) layoutFrame = requestAnimationFrame(updateLayout);
}
const shadePath = computed(() => {
  const { x, y, radius: r, width, height } = geometry.value;
  return `M0 0H${width}V${height}H0Z M${x - r} ${y}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0Z`;
});
const ringStyle = computed(() => geometry.value ? { left: `${geometry.value.x - geometry.value.radius}px`, top: `${geometry.value.y - geometry.value.radius}px`, width: `${geometry.value.radius * 2}px`, height: `${geometry.value.radius * 2}px` } : {});
const instructionStyle = computed(() => geometry.value ? { left: `${geometry.value.copyLeft}px`, top: `${geometry.value.copyTop}px`, width: `${geometry.value.copyWidth}px` } : {});
function startTutorial() {
  guideOpen.value = false;
  prepared = false;
  requested.value = true;
  nextTick(scheduleLayout);
}
function finishTutorial(returnToCompass = false) {
  if (!requested.value) return;
  window.clearTimeout(autoCloseTimer);
  rememberTutorial();
  requested.value = false;
  geometry.value = null;
  if (returnToCompass) nextTick(() => compassButton.value?.focus({ preventScroll: true }));
}
function completeFromKey(index) {
  if (visible.value && index === props.targetIndex) finishTutorial();
}
defineExpose({ completeFromKey });
function closeGuide() {
  guideOpen.value = false;
  compassButton.value?.focus({ preventScroll: true });
}
function outsidePointer(event) {
  if (guideOpen.value && !guideTools.value?.contains(event.target)) guideOpen.value = false;
}
function handleKeydown(event) {
  if (!visible.value) return;
  if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); finishTutorial(true); }
  if (event.key === "Tab") {
    event.preventDefault();
    const target = targetButton();
    const next = document.activeElement === target ? closeButton.value : target;
    next?.focus({ preventScroll: true });
  }
}
watch(visible, async value => {
  window.clearTimeout(autoCloseTimer);
  emit("tutorial-change", value);
  if (!value && instruction.value) resizeObserver?.unobserve(instruction.value);
  if (value) {
    autoCloseTimer = window.setTimeout(() => finishTutorial(document.activeElement === closeButton.value), 4000);
    await nextTick();
    if (instruction.value) resizeObserver?.observe(instruction.value);
    scheduleLayout();
  }
});
watch(() => [props.anchor, props.controllerElement], () => {
  if (props.controllerElement) resizeObserver?.observe(props.controllerElement);
  scheduleLayout();
});
onMounted(() => {
  resizeObserver = new ResizeObserver(scheduleLayout);
  if (props.controllerElement) resizeObserver.observe(props.controllerElement);
  window.addEventListener("resize", scheduleLayout, { passive: true });
  window.addEventListener("scroll", scheduleLayout, { capture: true, passive: true });
  window.visualViewport?.addEventListener("resize", scheduleLayout);
  window.visualViewport?.addEventListener("scroll", scheduleLayout);
  document.addEventListener("pointerdown", outsidePointer);
  document.addEventListener("keydown", handleKeydown, true);
  scheduleLayout();
});
onBeforeUnmount(() => {
  disposed = true;
  window.clearTimeout(autoCloseTimer);
  if (layoutFrame !== null) cancelAnimationFrame(layoutFrame);
  resizeObserver?.disconnect();
  window.removeEventListener("resize", scheduleLayout);
  window.removeEventListener("scroll", scheduleLayout, true);
  window.visualViewport?.removeEventListener("resize", scheduleLayout);
  window.visualViewport?.removeEventListener("scroll", scheduleLayout);
  document.removeEventListener("pointerdown", outsidePointer);
  document.removeEventListener("keydown", handleKeydown, true);
});
</script>

<style scoped>
.compass-guide { position: fixed; z-index: 20; top: 24px; right: 32px; color: #254c60; font-family: Arial, Helvetica, sans-serif; }
.compass-guide__trigger { display: grid; place-items: center; width: 40px; height: 40px; padding: 0; border: 0; background: transparent; box-shadow: none; color: #526e61; font-size: 21px; cursor: pointer; }
.compass-guide__trigger:disabled { cursor: default; }
.compass-guide__panel { position: absolute; top: 48px; right: 0; width: min(320px, calc(100vw - 40px)); padding: 20px; border: 1px solid rgba(255, 255, 255, .6); border-radius: 12px; background: rgba(255, 255, 255, .85); box-shadow: 0 8px 24px rgba(42, 83, 89, .12); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #32545a; }
.compass-guide__panel h2 { margin: 0 0 16px; font: 600 12px/1.5 Arial, Helvetica, sans-serif; text-transform: uppercase; }
.compass-guide__panel h3 { margin: 0 0 8px; font-size: 14px; line-height: 1.5; }
.compass-guide__panel p { margin: 0; font-size: 13px; line-height: 1.7; }
.guide-action { display: inline-flex; align-items: center; gap: 10px; margin-top: 18px; padding: 8px 0; border: 0; background: transparent; color: #32545a; font: 600 13px/1.5 Arial, Helvetica, sans-serif; cursor: pointer; }
.key-tutorial { position: fixed; z-index: 100; inset: 0; overflow: hidden; pointer-events: none; font-family: Arial, Helvetica, sans-serif; }
.key-tutorial *, .compass-guide * { box-sizing: border-box; letter-spacing: 0; }
.key-tutorial__shade { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.key-tutorial__shade path { fill: #081c25b8; pointer-events: fill; }
.key-tutorial__ring { position: absolute; border: 2px solid #f6f0e5; border-radius: 50%; box-shadow: 0 0 10px #fff9, inset 0 0 8px #fff4; animation: key-glow 1800ms ease-in-out infinite; }
.key-tutorial__hand { position: absolute; top: -40px; left: calc(50% - 22px); width: 44px; height: 36px; image-rendering: pixelated; transform: rotate(90deg); filter: drop-shadow(0 2px 1px #102e3570); animation: tutorial-press 1400ms ease-in-out infinite; }
.key-tutorial__instruction { position: absolute; padding: 24px 32px; border: 1px solid rgba(255, 255, 255, .6); border-radius: 12px; background: rgba(255, 255, 255, .85); box-shadow: 0 8px 24px rgba(42, 83, 89, .12); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #32545a; text-align: center; pointer-events: auto; }
.key-tutorial__instruction h2 { margin: 0 0 8px; font: 600 17px/1.4 Arial, Helvetica, sans-serif; }
.key-tutorial__instruction p { margin: 0; font-size: 13px; line-height: 1.6; }
.close-tutorial { position: absolute; top: 5px; right: 5px; display: grid; place-items: center; width: 28px; height: 28px; padding: 0; border: 0; border-radius: 4px; background: transparent; color: #61756c; font-size: 16px; cursor: pointer; }
.close-tutorial:hover { color: #254c60; }
button:focus-visible { outline: 3px solid #38859a; outline-offset: 4px; }
.guide-fade-enter-active, .guide-fade-leave-active { transition: opacity 180ms ease; }
.guide-fade-enter-from, .guide-fade-leave-to { opacity: 0; }
@keyframes key-glow { 50% { box-shadow: 0 0 20px #fff9, inset 0 0 10px #fff6; } }
@keyframes tutorial-press { 0%, 100% { transform: translateY(-5px) rotate(90deg); } 45%, 60% { transform: translateY(7px) rotate(90deg); } }
@media (max-width: 760px) { .compass-guide { top: 18px; right: 18px; } }
@media (prefers-reduced-motion: reduce) { .key-tutorial__ring, .key-tutorial__hand { animation: none; } .guide-fade-enter-active, .guide-fade-leave-active { transition: none; } }
</style>
