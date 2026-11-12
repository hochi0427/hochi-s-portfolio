<template>
  <Teleport to="body" :disabled="inline">
    <div
      class="hochi-guide"
      :class="{ 'hochi-guide--speaking': bubbleVisible, 'hochi-guide--story': isStory, 'hochi-guide--detailed': hasDetailedGreeting, 'hochi-guide--inline': inline }"
      @pointerenter="onPointerEnter"
      @pointerleave="onPointerLeave"
      @focusin="onStoryFocus"
      @focusout="onStoryBlur"
    >
      <Transition name="hochi-bubble">
        <div
          v-if="bubbleVisible"
          :id="bubbleId"
          ref="bubbleElement"
          class="hochi-guide__bubble"
          :role="isStory ? 'region' : 'tooltip'"
          :aria-label="isStory ? 'Hochi story' : undefined"
        >
          <template v-if="isStory">
            <div v-if="inline" class="hochi-guide__story-content" aria-live="polite" aria-atomic="true">
              <p v-for="(message, index) in messages" :key="index" class="hochi-guide__story-text hochi-guide__story-measure" aria-hidden="true">{{ message }}</p>
              <Transition name="hochi-story" mode="out-in"><p :key="storyIndex" class="hochi-guide__story-text">{{ messages[storyIndex] }}</p></Transition>
            </div>
            <p v-else class="hochi-guide__story-text" aria-live="polite" aria-atomic="true">{{ messages[storyIndex] }}</p>
            <div class="hochi-guide__story-actions">
              <span class="hochi-guide__story-progress" aria-hidden="true">{{ storyIndex + 1 }} / {{ messages.length }}</span>
              <button type="button" @click="advanceStory">
                {{ storyIndex < messages.length - 1 ? "Next" : restartOnEnd ? "Back to Start" : "Close" }}
                <i :class="storyIndex < messages.length - 1 ? 'fa-solid fa-arrow-right' : restartOnEnd ? 'fa-solid fa-arrow-rotate-left' : 'fa-solid fa-xmark'" aria-hidden="true"></i>
              </button>
            </div>
          </template>
          <template v-else><span :class="{ 'hochi-guide__greeting-copy': hasDetailedGreeting }">{{ greetingText }}</span></template>
        </div>
      </Transition>
      <button
        ref="characterElement"
        class="hochi-guide__character"
        type="button"
        aria-label="Meet Hochi"
        :aria-describedby="bubbleVisible ? bubbleId : undefined"
        :aria-expanded="bubbleVisible"
        @focus="onFocus"
        @blur="onBlur"
        @click="toggleBubble"
      >
        <img :src="portrait" alt="" draggable="false" />
      </button>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, useId } from "vue";

const portrait = `${import.meta.env.BASE_URL}world/portrait/Hochi.png`;
const props = defineProps({
  messages: { type: Array, default: () => [] },
  greetingText: { type: String, default: "Hi, I'm Hochi!" },
  inline: { type: Boolean, default: false },
  restartOnEnd: { type: Boolean, default: false },
});
const isStory = computed(() => props.messages.length > 0);
const hasDetailedGreeting = computed(() => !isStory.value && props.greetingText !== "Hi, I'm Hochi!");
const storyIndex = ref(0);
const storyOpen = ref(false);
const characterElement = ref(null);
const bubbleElement = ref(null);
const bubbleId = useId();
const greeting = ref(false);
const hovered = ref(false);
const focused = ref(false);
const tapped = ref(false);
const dismissed = ref(false);
let greetingTimer;

const bubbleVisible = computed(() => isStory.value ? storyOpen.value : !dismissed.value
  && (greeting.value || hovered.value || focused.value || tapped.value));

function openStory() {
  if (storyOpen.value) return;
  storyIndex.value = 0;
  storyOpen.value = true;
}

function closeStory() {
  if (bubbleElement.value?.contains(document.activeElement)) {
    characterElement.value?.focus({ preventScroll: true });
  }
  storyOpen.value = false;
}

function advanceStory() {
  if (storyIndex.value < props.messages.length - 1) storyIndex.value += 1;
  else if (props.restartOnEnd) storyIndex.value = 0;
  else closeStory();
}

function onStoryFocus(event) {
  if (props.inline) return;
  if (!isStory.value || !event.target.matches(":focus-visible")) return;
  focused.value = true;
  openStory();
}

function onStoryBlur(event) {
  if (props.inline) return;
  if (!isStory.value || event.currentTarget.contains(event.relatedTarget)) return;
  focused.value = false;
  if (!hovered.value) storyOpen.value = false;
}

function endGreeting() {
  greeting.value = false;
  window.clearTimeout(greetingTimer);
}

function onScroll() {
  if (props.inline) return;
  if (isStory.value) {
    storyOpen.value = false;
    return;
  }
  if (!greeting.value) return;
  endGreeting();
  dismissed.value = true;
}

function onPointerEnter(event) {
  if (props.inline) return;
  if (event.pointerType !== "mouse") return;
  hovered.value = true;
  if (isStory.value) {
    openStory();
    return;
  }
  dismissed.value = false;
}

function onPointerLeave(event) {
  if (props.inline) return;
  if (event.pointerType !== "mouse") return;
  if (isStory.value) {
    hovered.value = false;
    if (!focused.value) storyOpen.value = false;
    return;
  }
  endGreeting();
  hovered.value = false;
  tapped.value = false;
  dismissed.value = true;
}

function onFocus(event) {
  if (isStory.value) return;
  if (!event.currentTarget.matches(":focus-visible")) return;
  focused.value = true;
  dismissed.value = false;
}

function onBlur() {
  if (isStory.value) return;
  focused.value = false;
  tapped.value = false;
}

function toggleBubble(event) {
  if (isStory.value) {
    if (event.detail === 0) {
      openStory();
      return;
    }
    if (storyOpen.value) closeStory();
    else openStory();
    return;
  }
  const show = !bubbleVisible.value;
  endGreeting();
  tapped.value = show;
  dismissed.value = !show;
}

function onKeydown(event) {
  if (event.key !== "Escape") return;
  if (isStory.value) {
    closeStory();
    return;
  }
  endGreeting();
  tapped.value = false;
  dismissed.value = true;
}

onMounted(() => {
  if (isStory.value) openStory();
  else {
    greeting.value = true;
    greetingTimer = window.setTimeout(endGreeting, 3000);
  }
  // Capture also receives scrolls from a page's nested scrolling container.
  if (!props.inline) {
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("keydown", onKeydown);
  }
});

onBeforeUnmount(() => {
  window.clearTimeout(greetingTimer);
  window.removeEventListener("scroll", onScroll, true);
  window.removeEventListener("keydown", onKeydown);
});
</script>

<style scoped>
.hochi-guide {
  --character-width: min(180px, 32svh);
  position: fixed;
  z-index: 30;
  right: 4px;
  bottom: 0;
  width: var(--character-width);
  pointer-events: none;
  animation: hochi-arrive 300ms ease-out both;
}

.hochi-guide__character {
  display: block;
  width: 100%;
  aspect-ratio: 1283 / 1197;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  box-shadow: none;
  cursor: pointer;
  pointer-events: auto;
  transform-origin: bottom right;
  transition: transform 300ms ease;
  -webkit-tap-highlight-color: transparent;
}

.hochi-guide__character img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
}

.hochi-guide--speaking .hochi-guide__character { transform: scale(1.08); }
.hochi-guide__character:focus-visible { outline: 2px solid #286d9b; outline-offset: 3px; }

.hochi-guide__bubble {
  position: absolute;
  z-index: 1;
  right: calc(var(--character-width) * 0.35);
  bottom: calc(100% - 12px);
  box-sizing: border-box;
  width: max-content;
  max-width: min(330px, calc(100vw - var(--character-width) * 0.35 - 24px));
  padding: 18px 26px;
  border: 1px solid #d8e9f1;
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(45, 93, 122, 0.15);
  color: #315f80;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 22px;
  line-height: 1.4;
  letter-spacing: 0;
  text-align: center;
  pointer-events: auto;
}

.hochi-guide__bubble::after {
  content: "";
  position: absolute;
  right: 22px;
  bottom: -7px;
  width: 12px;
  height: 12px;
  border-right: 1px solid #d8e9f1;
  border-bottom: 1px solid #d8e9f1;
  background: #ffffff;
  transform: rotate(45deg);
}

.hochi-guide--story .hochi-guide__bubble,
.hochi-guide--detailed .hochi-guide__bubble {
  right: 8px;
  width: 360px;
  max-width: calc(100vw - 24px);
  padding: 20px 24px;
  font-size: 15px;
  line-height: 1.65;
  text-align: left;
}
.hochi-guide__greeting-copy { display: block; white-space: pre-line; }
.hochi-guide--detailed .hochi-guide__bubble {
  max-height: max(100px, calc(100svh - var(--character-width) * 1197 / 1283 - 24px));
  overflow-y: auto;
}
.hochi-guide__story-text { margin: 0; }
.hochi-guide__story-actions { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-top: 16px; }
.hochi-guide__story-progress { color: #7695a7; font-size: 11px; font-variant-numeric: tabular-nums; }
.hochi-guide__story-actions button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0 6px 12px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: #315f80;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}
.hochi-guide__story-actions button:hover { color: #173f63; }
.hochi-guide__story-actions button:focus-visible { outline: 2px solid #286d9b; outline-offset: 3px; }
.hochi-guide--story .hochi-bubble-enter-from,
.hochi-guide--story .hochi-bubble-leave-to { transform: translateY(8px) scale(0.98); }

.hochi-bubble-enter-active, .hochi-bubble-leave-active { transition: opacity 300ms ease, transform 300ms ease; }
.hochi-bubble-enter-from, .hochi-bubble-leave-to { opacity: 0; transform: translateY(10px); }

.hochi-guide--inline {
  --character-width: 180px;
  position: relative;
  z-index: auto;
  right: auto;
  bottom: auto;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  max-width: 1040px;
  margin-inline: auto;
}
.hochi-guide--inline .hochi-guide__character { flex: 0 0 var(--character-width); width: var(--character-width); transform-origin: center; }
.hochi-guide--inline .hochi-guide__bubble { position: relative; right: auto; bottom: auto; width: min(100%, 760px); max-width: none; min-width: 0; flex: 1; }
.hochi-guide--inline .hochi-guide__bubble::after { right: auto; left: -7px; bottom: 30%; transform: rotate(135deg); }
.hochi-guide__story-content { display: grid; }
.hochi-guide__story-content > p { grid-area: 1 / 1; white-space: pre-line; }
.hochi-guide__story-measure { visibility: hidden; pointer-events: none; user-select: none; }
.hochi-story-enter-active, .hochi-story-leave-active { transition: opacity 160ms ease, transform 160ms ease; }
.hochi-story-enter-from { opacity: 0; transform: translateY(4px); }
.hochi-story-leave-to { opacity: 0; transform: translateY(-4px); }

@keyframes hochi-arrive {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1000px) {
  .hochi-guide { --character-width: min(135px, 30svh); }
}

@media (max-width: 680px) {
  .hochi-guide { --character-width: min(110px, 25svh); }
  .hochi-guide__bubble { right: 0; max-width: calc(100vw - 24px); padding: 14px 20px; font-size: 18px; }
  .hochi-guide--story .hochi-guide__bubble,
  .hochi-guide--detailed .hochi-guide__bubble { width: 330px; padding: 16px 20px; font-size: 14px; }
  .hochi-guide--inline { --character-width: 110px; flex-direction: column; gap: 14px; }
  .hochi-guide--inline .hochi-guide__character { flex: none; align-self: flex-start; margin-left: 12px; }
  .hochi-guide--inline .hochi-guide__bubble { flex: none; width: 100%; }
  .hochi-guide--inline .hochi-guide__bubble::after { top: auto; bottom: -7px; left: 42px; transform: rotate(45deg); }
}

@media (prefers-reduced-motion: reduce) {
  .hochi-guide { animation: none; }
  .hochi-guide__character, .hochi-bubble-enter-active, .hochi-bubble-leave-active { transition: none; }
  .hochi-bubble-enter-from, .hochi-bubble-leave-to { transform: none; }
  .hochi-guide--story .hochi-bubble-enter-from, .hochi-guide--story .hochi-bubble-leave-to { transform: none; }
  .hochi-story-enter-active, .hochi-story-leave-active { transition: none; }
  .hochi-story-enter-from, .hochi-story-leave-to { transform: none; }
}
</style>
