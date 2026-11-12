<template>
  <main class="game-play-page">
    <div class="ocean-decoration" aria-hidden="true">
      <img class="ocean-cloud" :src="`${base}world/ocean/cloud.webp`" alt="" />
      <img class="ocean-wave" :src="`${base}world/ocean/wave-02.webp`" alt="" />
    </div>
    <div class="game-play-content">
      <RouterLink class="back-link" :inert="tutorialActive" :to="{ name: 'Home' }"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to the World</RouterLink>
      <header class="page-heading" :inert="tutorialActive"><p>Experiments in interaction & play</p><h1>Game &amp; Play</h1></header>
      <div ref="playSpace" class="play-space">
        <svg class="controller-cable" :viewBox="`0 0 ${cableSize.width} ${cableSize.height}`" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path class="cable-edge" :d="cablePath" />
          <path class="cable-surface" :d="cablePath" />
          <path class="cable-highlight" :d="cablePath" />
        </svg>
        <section ref="controllerArea" class="controller-area" aria-label="Interactive game controller">
          <GameController :projects="projects" :selected="selected" :guide-key="tutorialKey" :tutorial-key="tutorialActive ? tutorialKey : null" @select="selectProject" @key-anchor="tutorialAnchor = $event" @cable-anchor="updateCableAnchor" />
          <div class="controller-label"><span><i class="fa-solid fa-circle" aria-hidden="true"></i> Connected</span></div>
        </section>
        <section class="monitor-area" :inert="tutorialActive" aria-label="Selected game project">
          <div ref="monitor" class="monitor" :class="{ 'monitor--off': !poweredOn }">
            <div class="monitor-top"><span>HOCHI / PLAY SYSTEM</span><span>STEREO</span></div>
            <div class="screen-bezel">
              <div id="game-monitor-screen" class="monitor-screen" :class="{ 'is-switching': isSwitching }" role="group" :aria-label="poweredOn ? 'Game project display' : 'Monitor powered off'">
                <span v-if="isSwitching && poweredOn && !reducedMotion" :key="selected" class="crt-channel-scanlines" aria-hidden="true"></span>
                <Transition name="channel" mode="out-in" appear @after-enter="channelEntered">
                  <article :key="selected" :data-project="selected" class="project-screen" :aria-hidden="!poweredOn" :inert="!poweredOn" :aria-live="poweredOn ? 'polite' : 'off'" aria-atomic="true">
                    <div class="screen-status"><span>CH {{ String(selected + 1).padStart(2, '0') }}</span><span>{{ project.category }}</span></div>
                    <div class="game-preview">
                      <div v-if="project.preview === 'rabbit'" class="rabbit-preview">
                        <div class="rabbit-runner">
                          <span class="rabbit-shadow" aria-hidden="true"></span>
                          <svg class="pixel-rabbit" viewBox="0 0 36 36" role="img" aria-label="Pixel-art rabbit hopping forward" focusable="false">
                            <defs><filter id="bunny-sheet-transparency" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  20 0 0 0 -1" /></filter></defs>
                            <g v-for="(frame, index) in bunnyFrames" :key="index" class="rabbit-frame" :style="{ '--frame-delay': `${index * 60}ms` }">
                              <svg :x="Math.round((36 - frame.width) / 2)" :y="36 - frame.height" :width="frame.width" :height="frame.height" :viewBox="`${frame.x} ${frame.y} ${frame.width} ${frame.height}`" overflow="hidden">
                                <image :href="`${base}images/bunnysheet.png`" width="321" height="327" filter="url(#bunny-sheet-transparency)" />
                              </svg>
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div v-else-if="project.preview === 'kingdom'" class="kingdom-preview">
                        <img :src="`${base}images/KingdomDilemmaLogo.png`" alt="Kingdom Dilemma logo" />
                        <span class="prototype-status">Prototype in Development</span>
                      </div>
                      <MutationDogCover v-else-if="project.preview === 'dog'" :paused="!poweredOn" />
                      <img v-else-if="project.image && !failedPreviews[project.title]" :src="`${base}images/${project.image}`" :alt="`${project.title} preview`" :data-project-title="project.title" @error="failedPreviews[$event.target.dataset.projectTitle] = true" />
                      <div v-else class="preview-placeholder"><i :class="project.icon" aria-hidden="true"></i><span>Preview coming soon</span></div>
                    </div>
                    <div class="project-copy">
                      <h2>{{ project.title }}</h2>
                      <p class="project-description"><span aria-hidden="true">{{ typedDescription }}</span><span class="sr-only">{{ project.description }}</span></p>
                      <ul class="technology-tags" aria-label="Project technologies"><li v-for="technology in project.technologies" :key="technology">{{ technology }}</li></ul>
                    </div>
                  </article>
                </Transition>
              </div>
            </div>
            <div class="monitor-controls">
              <div class="monitor-power">
                <button class="power-button" type="button" :aria-label="poweredOn ? 'Turn monitor off' : 'Turn monitor on'" :title="poweredOn ? 'Turn monitor off' : 'Turn monitor on'" :aria-pressed="poweredOn" aria-controls="game-monitor-screen" @click="poweredOn = !poweredOn"><i class="fa-solid fa-power-off" aria-hidden="true"></i></button>
                <span class="power-status" role="status"><span class="power-light" aria-hidden="true"></span><span class="sr-only">{{ poweredOn ? 'Monitor on' : 'Monitor off' }}</span></span>
              </div>
              <div class="frame-action">
                <div v-if="project.route" class="project-action">
                  <span v-if="poweredOn" class="pixel-pointer pixel-pointer--left" aria-hidden="true"><img :src="`${base}images/pixel-point-hand.svg`" alt="" /></span>
                  <RouterLink v-if="poweredOn" class="project-link" :to="project.route">View Project <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></RouterLink>
                  <button v-else class="project-link" type="button" disabled>View Project <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></button>
                  <span v-if="poweredOn" class="pixel-pointer pixel-pointer--right" aria-hidden="true"><img :src="`${base}images/pixel-point-hand.svg`" alt="" /></span>
                </div>
                <span v-else class="coming-soon">Project coming soon</span>
              </div>
              <div class="monitor-hardware" aria-hidden="true"><div class="speaker"></div><div class="monitor-dial"></div></div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <GamePlayGuide ref="compassGuide" :anchor="tutorialAnchor" :controller-element="controllerArea" :target-index="tutorialKey" @tutorial-change="tutorialActive = $event" />
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import GameController from "../components/world/GameController.vue";
import GamePlayGuide from "../components/world/GamePlayGuide.vue";
import MutationDogCover from "../components/projects/MutationDogCover.vue";

const base = import.meta.env.BASE_URL;
// Original side-running frames, with Unity's bottom-left coordinates converted for SVG.
const bunnyFrames = [
  [59, 120, 26, 26], [135, 123, 29, 25], [28, 82, 25, 27],
  [59, 83, 26, 28], [91, 82, 33, 28], [134, 84, 29, 25],
  [179, 84, 26, 25], [210, 84, 27, 22], [243, 84, 28, 19], [275, 84, 28, 19],
].map(([x, y, width, height]) => ({ x, y: 327 - y - height, width, height }));
const selected = ref(0);
const tutorialKey = 1;
const tutorialAnchor = ref(null);
const tutorialActive = ref(false);
const compassGuide = ref(null);
function selectProject(index) {
  selected.value = index;
  compassGuide.value?.completeFromKey(index);
}
const poweredOn = ref(true);
const typedDescription = ref("");
const failedPreviews = ref({});
const isSwitching = ref(false);
const reducedMotion = ref(false);
const playSpace = ref(null);
const controllerArea = ref(null);
const monitor = ref(null);
const cablePath = ref("");
const cableSize = ref({ width: 1, height: 1 });
let cableAnchor = null;
let layoutObserver;
let descriptionTimer;
let motionMedia;

function stopDescriptionTyping() {
  window.clearInterval(descriptionTimer);
  descriptionTimer = null;
}
function startDescriptionTyping() {
  stopDescriptionTyping();
  const description = project.value.description;
  if (reducedMotion.value || !poweredOn.value) {
    typedDescription.value = description;
    return;
  }
  typedDescription.value = "";
  const started = performance.now();
  descriptionTimer = window.setInterval(() => {
    const characters = Math.floor((performance.now() - started) / 24);
    typedDescription.value = description.slice(0, characters);
    if (characters >= description.length) stopDescriptionTyping();
  }, 24);
}
function channelEntered(element) {
  if (Number(element.dataset.project) !== selected.value) return;
  isSwitching.value = false;
  startDescriptionTyping();
}
function updateMotionPreference() {
  reducedMotion.value = motionMedia.matches;
  if (reducedMotion.value) {
    stopDescriptionTyping();
    typedDescription.value = project.value.description;
  }
}

function updateCableAnchor(anchor) {
  cableAnchor = anchor;
  layoutCable();
}
function layoutCable() {
  if (!cableAnchor || !playSpace.value || !monitor.value || !controllerArea.value) return;
  const bounds = playSpace.value.getBoundingClientRect();
  const controller = controllerArea.value.getBoundingClientRect();
  const screen = monitor.value.getBoundingClientRect();
  const start = { x: controller.left - bounds.left + cableAnchor.x, y: controller.top - bounds.top + cableAnchor.y };
  const stacked = screen.top >= controller.bottom;
  const end = { x: screen.left - bounds.left + screen.width * .5, y: screen.top - bounds.top - 6 };
  const rise = Math.min(190, Math.max(110, (end.x - start.x) * .3));
  const first = stacked
    ? { x: bounds.width - 18, y: Math.max(12, start.y - 60) }
    : { x: start.x - 25, y: Math.min(start.y - rise, end.y - rise * .7) };
  const second = stacked
    ? { x: bounds.width - 18, y: end.y - 85 }
    : { x: end.x, y: end.y - rise };
  cableSize.value = { width: Math.max(1, bounds.width), height: Math.max(1, bounds.height) };
  cablePath.value = `M ${start.x} ${start.y} C ${first.x} ${first.y}, ${second.x} ${second.y}, ${end.x} ${end.y}`;
}
onMounted(() => {
  layoutObserver = new ResizeObserver(layoutCable);
  [playSpace.value, controllerArea.value, monitor.value].forEach((element) => layoutObserver.observe(element));
  motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  updateMotionPreference();
  motionMedia.addEventListener("change", updateMotionPreference);
});
onBeforeUnmount(() => {
  layoutObserver?.disconnect();
  stopDescriptionTyping();
  motionMedia?.removeEventListener("change", updateMotionPreference);
});
const projects = [
  { title: "Math Tactics", category: "Multiplayer / Learning", image: "MathTacticsLogo.png", description: "A multiplayer math game for arithmetic practice and classroom play.", technologies: ["Vue 3", "JavaScript", "Render"], route: { name: "MathTactics" } },
  { title: "Pattern Cube Game", category: "Spatial reasoning / Ages 5-8", image: "PatternCubeLogo.png", icon: "fa-solid fa-cubes", description: "A hands-on spatial reasoning activity where children recreate generated patterns with physical cubes.", technologies: ["Vue 3", "JavaScript", "Vite"], route: { name: "PatternCube" } },
  { title: "Hunting Rabbit", category: "Unity / Two-player", preview: "rabbit", icon: "fa-solid fa-gamepad", description: "An asymmetric two-player game of snake versus rabbit.", technologies: ["Unity", "C#"], route: { name: "GameMod" } },
  { title: "Deadline Simulator", category: "Browser / Typing", image: "VignetteLogo.png", description: "A typing game about deadlines, pressure, and fading focus.", technologies: ["Vue 3", "Phaser", "JavaScript", "Vite"], route: { name: "Vignette" } },
  { title: "Mutation Dog", category: "3D / Team Project", preview: "dog", image: "DogMutation.png", description: "Keep an unpredictable, mutating dog out of trouble in a first-person survival game.", technologies: ["Unity", "C#", "Unity NavMesh"], route: { name: "MutationDog" } },
  { title: "Kingdom Dilemma", category: "Narrative Game \u00b7 Educational Game", preview: "kingdom", description: "Every choice has a cost.", technologies: ["Vue 3", "Vite", "JavaScript"], route: { name: "KingdomDilemma" } },
  { title: "Rhythm Grove", category: "Physical Computing / In progress", image: "RhythmGroveLogo.png", icon: "fa-solid fa-drum", description: "A tangible rhythm-based game connecting a physical drum with synchronized visual feedback.", technologies: ["Arduino Nano Every"], route: { name: "RhythmGrove" } },
];
const project = computed(() => projects[selected.value]);
watch(selected, () => {
  stopDescriptionTyping();
  typedDescription.value = "";
  isSwitching.value = true;
}, { flush: "sync" });
watch(poweredOn, () => {
  stopDescriptionTyping();
  if (!isSwitching.value) startDescriptionTyping();
});
</script>

<style scoped>
.game-play-page { position: fixed; z-index: 5; inset: 0; overflow: auto; isolation: isolate; background: #deeeed; color: #254c60; font-family: Arial, Helvetica, sans-serif; letter-spacing: 0; }
.game-play-page *, .game-play-page *::before, .game-play-page *::after { box-sizing: border-box; letter-spacing: 0; }
.game-play-content { width: min(1400px, calc(100% - 80px)); margin: auto; padding: 30px 0 26px; }
.back-link { display: inline-flex; align-items: center; gap: 10px; color: #31565d; font-size: 12px; text-decoration: none; transition: opacity 180ms ease; }
.back-link:hover { opacity: .65; }
.page-heading { margin-top: 32px; }
.page-heading p { margin: 0 0 8px; color: #648591; font-size: 10px; text-transform: uppercase; }
h1 { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 42px; font-weight: 500; }
.play-space { position: relative; isolation: isolate; display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr); align-items: center; gap: 32px; min-height: 570px; }
.controller-cable { position: absolute; z-index: 0; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; filter: drop-shadow(0 3px 2px #31545c24); }
.controller-cable path { fill: none; stroke-linecap: round; stroke-linejoin: round; }
.cable-edge { stroke: #405c63; stroke-width: 11; }
.cable-surface { stroke: #647e81; stroke-width: 8; }
.cable-highlight { stroke: #a5b9b8; stroke-width: 1.5; opacity: .5; transform: translateY(-2px); }
.controller-area { position: relative; z-index: 1; align-self: center; min-width: 0; height: clamp(440px, 60svh, 600px); }
.controller-label { position: absolute; inset: auto 0 0; display: flex; justify-content: space-between; gap: 18px; padding: 0 40px; color: #6f8b92; font-size: 9px; }
.controller-label > span:first-child { display: inline-flex; align-items: center; gap: 7px; }
.controller-label i { color: #5b9e8e; font-size: 5px; }
.monitor-area { position: relative; top: -32px; z-index: 1; min-width: 0; padding: 20px 22px 20px 0; }
.monitor { position: relative; padding: 25px 26px 20px; border: 2px solid #d4d0bd; border-radius: 24px 24px 18px 18px; background: #eee9d9; box-shadow: inset 3px 3px 0 #fff9, inset -3px -3px 0 #c3c6b666, 20px 16px 0 #b7beb0, 18px 28px 35px #335e7029; }
.monitor::before { content: ""; position: absolute; top: -8px; left: 50%; width: 20px; height: 8px; border: 1px solid #3a565e; border-radius: 4px 4px 0 0; background: #5c7376; transform: translateX(-50%); }
.monitor-top { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 15px; color: #7f8c86; font-size: 8px; }
.screen-bezel { padding: 10px; border: 1px solid #abb9b0; border-radius: 20px; background: #b9c5ba; box-shadow: inset 3px 3px 7px #566c6850, 0 1px 0 #fff; }
.monitor-screen { --preview-height: 250px; --project-title-height: 34px; --project-description-height: 46px; position: relative; min-height: calc(var(--preview-height) + var(--project-title-height) + var(--project-description-height) + 163px); overflow: hidden; border-radius: 12px; background: #204854; color: #e8f6ec; box-shadow: inset 0 0 20px #14333b; transition: background-color 280ms ease; }
.monitor-screen::before { content: ""; position: absolute; z-index: 2; inset: 0; pointer-events: none; background: #081c25; opacity: 0; transition: opacity 120ms ease; }
.monitor-screen.is-switching::before { opacity: .3; }
.monitor-screen::after { content: ""; position: absolute; z-index: 1; inset: 0; pointer-events: none; background: repeating-linear-gradient(transparent 0 3px, #0e2e3510 3px 4px); }
.crt-channel-scanlines { position: absolute; z-index: 3; inset: 0; overflow: hidden; pointer-events: none; background: repeating-linear-gradient(transparent 0 3px, #06151c40 3px 5px); animation: crt-scanline-shift 180ms steps(2, end) infinite; }
.crt-channel-scanlines::after { content: ""; position: absolute; top: -25%; left: 0; right: 0; height: 25%; background: linear-gradient(transparent, #d4f4e52b, transparent); animation: crt-channel-sweep 500ms linear both; }
@keyframes crt-scanline-shift { to { background-position: 0 5px; } }
@keyframes crt-channel-sweep { to { transform: translateY(500%); } }
.project-screen { display: grid; grid-template-rows: 25px var(--preview-height) auto; gap: 12px; padding: 18px 22px 22px; transition: opacity 220ms ease, filter 220ms ease; }
.monitor--off .monitor-screen { background: #142a2e; }
.monitor--off .project-screen { opacity: 0; filter: brightness(0); }
.monitor--off .monitor-screen::after { opacity: 0; }
.screen-status { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; min-height: 25px; color: #9dbab8; font-family: monospace; font-size: 9px; }
.game-preview { display: flex; align-items: center; justify-content: center; min-height: 0; }
.game-preview img { display: block; width: 100%; height: 100%; object-fit: contain; }
.kingdom-preview { display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%; height: 100%; min-height: 0; }
.kingdom-preview img { min-height: 0; flex: 1; }
.prototype-status { flex: 0 0 auto; padding: 3px 7px; border: 1px solid #b9b28a66; border-radius: 3px; color: #e3dcb6; font: 10px/1.4 monospace; }
.rabbit-preview { position: relative; width: min(100%, 280px); height: 144px; overflow: hidden; }
.rabbit-runner { position: absolute; inset: 0; animation: rabbit-travel 2800ms linear infinite; }
.game-preview .pixel-rabbit { position: absolute; bottom: 24px; left: 0; width: 96px; height: 96px; image-rendering: pixelated; transform-origin: 50% 90%; animation: rabbit-hop 600ms linear infinite; }
.rabbit-frame { opacity: 0; animation: rabbit-frames 600ms steps(1, end) infinite; animation-delay: var(--frame-delay); }
@keyframes rabbit-frames { 0% { opacity: 1; } 10%, 100% { opacity: 0; } }
.rabbit-shadow { position: absolute; bottom: 21px; left: 15px; width: 66px; height: 6px; background: #112f3880; box-shadow: 6px 0 0 #112f3840, -6px 0 0 #112f3840; animation: rabbit-shadow 600ms linear infinite; }
@keyframes rabbit-travel { from { transform: translateX(-96px); } to { transform: translateX(100%); } }
@keyframes rabbit-hop { 0%, 100% { transform: translateY(0); } 20% { transform: translateY(-6px); } 40%, 50% { transform: translateY(-14px); } 76% { transform: translateY(-5px); } }
@keyframes rabbit-shadow { 0%, 100% { transform: scaleX(1); opacity: .65; } 40%, 50% { transform: scaleX(.6); opacity: .3; } }
.monitor--off .rabbit-runner, .monitor--off .pixel-rabbit, .monitor--off .rabbit-shadow, .monitor--off .rabbit-frame { animation-play-state: paused; }
.preview-placeholder { display: flex; flex-direction: column; gap: 16px; align-items: center; justify-content: center; width: 100%; height: 100%; color: #9ec3c5; }
.preview-placeholder i { font-size: 48px; }
.preview-placeholder span { font-family: monospace; font-size: 10px; }
.project-copy { display: grid; grid-template-rows: var(--project-title-height, 34px) var(--project-description-height, 46px) 58px; gap: 8px; min-width: 0; }
.project-copy h2 { margin: 0; font-family: monospace; font-size: 27px; line-height: 1.2; }
.project-copy p { margin: 0; color: #bed3d1; font-size: 14px; line-height: 1.55; }
.technology-tags { display: flex; align-content: start; align-items: start; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; list-style: none; }
.technology-tags li { max-width: 100%; padding: 4px 8px; border: 1px solid #91bcb74d; border-radius: 3px; color: #c1dbd4; background: #b0d2c50d; font-family: monospace; font-size: 13px; line-height: 1.2; }
@property --project-glow-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
.project-link { position: relative; display: inline-flex; justify-content: center; align-items: center; gap: 12px; min-width: 200px; min-height: 54px; padding: 14px 22px; border: 1px solid #ffffff80; border-radius: 6px; color: #365f63; background: #edf0e6; box-shadow: inset 0 1px 0 #fff, 0 3px 0 #b5c0ae, 0 0 10px #ffffffcc, 0 0 22px #ffffff80; text-decoration: none; font-family: monospace; font-size: 17px; font-weight: 600; line-height: 1.3; transition: background-color 200ms ease, color 200ms ease, box-shadow 200ms ease; }
.project-link::before { content: ""; position: absolute; inset: -3px; padding: 3px; border-radius: 9px; background: conic-gradient(from var(--project-glow-angle), transparent 0deg 230deg, #ffffff55 275deg, #fff 315deg, transparent 360deg); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; animation: project-outline-run 2600ms linear infinite; }
@keyframes project-outline-run { to { --project-glow-angle: 360deg; } }
.project-link:not(:disabled):hover, .project-link:focus-visible { color: #254c60; background: #fff; box-shadow: inset 0 0 16px #fff, 0 3px 0 #bdc8b8, 0 0 14px #fff, 0 0 30px #ffffffcc, 0 0 46px #ffffff80; }
.project-link:disabled { opacity: .45; cursor: not-allowed; box-shadow: inset 0 1px 0 #fff9, 0 3px 0 #b5c0ae; }
.project-link:disabled::before { display: none; }
.coming-soon { color: #6b8275; font-family: monospace; font-size: 10px; }
.monitor-controls { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; gap: 10px; min-height: 48px; margin-top: 14px; color: #86988d; font-size: 7px; }
.monitor-power { display: inline-flex; justify-self: start; align-items: center; gap: 7px; }
.power-button { display: grid; place-items: center; width: 32px; height: 32px; padding: 0; border: 1px solid #a6b3a0; border-radius: 50%; color: #526e61; background: linear-gradient(145deg, #f3f3e7, #cbd5c0); box-shadow: inset 1px 1px 0 #fff, inset -1px -2px 2px #9eaf9580, 0 3px 0 #b1bda9; font-size: 14px; cursor: pointer; transition: transform 120ms ease, box-shadow 120ms ease; }
.power-button:active { transform: translateY(2px); box-shadow: inset 1px 2px 3px #91a08d70, 0 1px 0 #b1bda9; }
.power-status { display: flex; }
.frame-action { display: flex; align-items: center; justify-content: center; min-height: 34px; }
.project-action { position: relative; display: inline-flex; }
.pixel-pointer { position: absolute; top: calc(50% - 13px); width: 32px; height: 26px; pointer-events: none; animation: pixel-point-nudge 1200ms steps(3, end) infinite; }
.pixel-pointer--left { right: calc(100% + 10px); --point-nudge: 6px; }
.pixel-pointer--right { left: calc(100% + 10px); --point-nudge: -6px; }
.pixel-pointer img { display: block; width: 100%; height: 100%; image-rendering: pixelated; }
.pixel-pointer--right img { transform: scaleX(-1); }
@keyframes pixel-point-nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(var(--point-nudge)); } }
.power-light { display: block; width: 6px; height: 6px; border-radius: 50%; background: #6f9f7f; box-shadow: 0 0 5px #6f9f7f50; transition: background-color 180ms ease; }
.monitor--off .power-light { background: #b96860; box-shadow: 0 0 5px #b9686050; }
.monitor-hardware { display: flex; justify-self: end; align-items: center; gap: 10px; }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.speaker { width: 40px; height: 12px; background: repeating-linear-gradient(90deg, #a3b1a2 0 2px, transparent 2px 5px); }
.monitor-dial { width: 23px; height: 23px; border: 1px solid #aebba9; border-radius: 50%; background: #d6dfcd; box-shadow: 2px 2px 0 #b1bda9; }
.ocean-decoration { position: fixed; z-index: -1; inset: 0; pointer-events: none; overflow: hidden; }
.ocean-decoration img { position: absolute; height: auto; opacity: .3; }
.ocean-cloud { width: 120px; right: 20px; top: 20px; }
.ocean-wave { width: 120px; bottom: 16px; left: 10px; }
.channel-enter-active { transition: opacity 300ms ease, filter 300ms ease, transform 300ms ease; }
.channel-leave-active { transition: opacity 180ms ease, filter 180ms ease; }
.channel-enter-from { opacity: 0; filter: brightness(.7); transform: scale(.995); }
.channel-leave-to { opacity: 0; filter: brightness(.5); }
a:focus-visible, button:focus-visible { outline: 3px solid #38859a; outline-offset: 5px; }
@media (max-width: 1000px) { .game-play-content { width: calc(100% - 40px); } .play-space { gap: 10px; } .monitor { padding: 18px 16px 12px; } .project-screen { padding-inline: 16px; } .screen-status { flex-wrap: wrap; } }
@media (max-width: 760px) { .game-play-content { width: calc(100% - 36px); padding-top: 24px; } .page-heading { margin-top: 28px; } h1 { font-size: 34px; } .play-space { grid-template-columns: minmax(0, 1fr); gap: 8px; } .controller-area { height: 360px; } .controller-label { padding-inline: 20px; } .monitor-area { top: 0; width: min(100%, 560px); margin-inline: auto; padding-top: 0; } .monitor-screen, .project-screen { min-height: 390px; } }
@media (max-width: 1100px) { .monitor-controls { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 14px; } .frame-action { grid-column: 1 / -1; grid-row: 1; } .monitor-power { grid-column: 1; grid-row: 2; } .monitor-hardware { grid-column: 2; grid-row: 2; } }
@media (max-width: 1100px) { .monitor-screen { --project-title-height: 66px; --project-description-height: 88px; --preview-height: 210px; } }
@media (max-width: 760px) { .monitor-screen { --preview-height: 200px; } }
@media (max-width: 600px) { .monitor-hardware .speaker { display: none; } .monitor-power { gap: 6px; } .power-button { width: 28px; height: 28px; } .pixel-pointer { top: calc(50% - 8px); width: 20px; height: 16px; } .pixel-pointer--left { right: calc(100% + 3px); --point-nudge: 3px; } .pixel-pointer--right { left: calc(100% + 3px); --point-nudge: -3px; } }
@media (prefers-reduced-motion: reduce) { .channel-enter-active, .channel-leave-active, .back-link, .project-screen, .monitor-screen, .monitor-screen::before, .power-button, .power-light, .project-link { transition: none; } .project-link::before, .pixel-pointer, .rabbit-runner, .game-preview .pixel-rabbit, .rabbit-shadow, .rabbit-frame { animation: none; } .rabbit-runner { transform: translateX(calc(50% - 48px)); } .rabbit-frame:first-of-type { opacity: 1; } }
</style>
