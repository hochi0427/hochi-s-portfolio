<template>
  <section ref="overlay" class="world-intro" :data-phase="phase" role="dialog" aria-modal="true" :aria-labelledby="headingId" tabindex="-1" @keydown.tab.prevent="focusButton">
    <div ref="backdrop" class="world-intro__backdrop" aria-hidden="true"></div>
    <svg class="cloud-definitions" aria-hidden="true" focusable="false">
      <defs>
        <g :id="cloudId">
          <path class="cloud-bank__body" d="M-30-30H850C920 35 875 115 794 138C900 175 894 267 798 294C887 330 873 423 785 444C901 491 887 582 799 608C898 655 879 746 783 769C882 819 869 905 805 927C867 961 865 1000 830 1040H-30Z" />
          <path class="cloud-bank__fold cloud-bank__fold--blue" d="M-20 60C74 10 164 58 178 122C220 62 315 70 342 138C407 77 504 105 518 165C597 116 678 160 690 226C734 207 786 232 809 266C717 270 666 295 638 330C525 277 449 310 406 361C296 312 209 351 185 409C106 369 37 393-20 441Z" />
          <path class="cloud-bank__fold cloud-bank__fold--light" d="M-20 385C79 328 174 378 184 443C247 392 325 408 354 475C426 423 512 455 530 521C595 476 680 500 694 566C740 544 790 560 819 600C730 595 667 629 634 670C543 630 449 664 427 717C337 657 239 686 209 751C132 714 47 744-20 799Z" />
          <path class="cloud-bank__fold cloud-bank__fold--blue" d="M-20 792C73 725 159 766 177 831C244 771 335 805 353 868C433 819 515 845 542 911C609 866 692 895 712 953C759 939 807 961 833 1009L840 1040H-20Z" />
          <path class="cloud-bank__contour" d="M-15 308C64 249 147 266 185 310M226 607C294 547 385 571 406 626M477 84C556 36 647 71 658 125M526 802C598 749 674 774 697 824" />
        </g>
      </defs>
    </svg>

    <div class="cloudscape" aria-hidden="true">
      <div v-for="bank in banks" :key="bank.id" :ref="element => { cloudBanks[bank.id] = element; }" class="cloud-bank" :class="[`cloud-bank--${bank.side}`, `cloud-bank--${bank.depth}`]">
        <svg class="cloud-bank__art" viewBox="0 0 900 1000" preserveAspectRatio="none" focusable="false"><use :href="`#${cloudId}`" /></svg>
        <img class="cloud-bank__small cloud-bank__small--top" :src="cloudAsset" alt="" draggable="false" />
        <img class="cloud-bank__small cloud-bank__small--bottom" :src="cloudAsset" alt="" draggable="false" />
      </div>
    </div>

    <div ref="copy" class="world-intro__copy">
      <h1 :id="headingId"><span>Life is a Journey.</span><span>Knowledge is an Endless Ocean.</span></h1>
      <p>Every island holds a story, and every discovery begins a new adventure.</p>
      <button ref="beginButton" class="world-intro__begin" type="button" :disabled="started" @click="beginExploring">Begin Exploring <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, useId } from "vue";
import { gsap } from "gsap";

const emit = defineEmits(["complete"]);
const headingId = useId();
const cloudId = useId();
const cloudAsset = `${import.meta.env.BASE_URL}world/ocean/cloud.webp`;
const overlay = ref(null);
const copy = ref(null);
const backdrop = ref(null);
const beginButton = ref(null);
const started = ref(false);
const phase = ref("introduction");
const cloudBanks = {};
const banks = [
  { id: "back-left", side: "left", depth: "back" },
  { id: "back-right", side: "right", depth: "back" },
  { id: "front-left", side: "left", depth: "front" },
  { id: "front-right", side: "right", depth: "front" },
];
let autoTimer, assetTimer, entrance, exit, motionMedia;
let assetsReady = Promise.resolve();
let disposed = false;
let completed = false;

function focusButton() {
  if (!started.value) beginButton.value?.focus({ preventScroll: true });
  else overlay.value?.focus({ preventScroll: true });
}
function complete() {
  if (disposed || completed) return;
  completed = true;
  emit("complete");
}
function fadeOnly() {
  exit?.kill();
  exit = gsap.to(overlay.value, { opacity: 0, duration: .35, onComplete: complete });
}
async function revealMap() {
  await assetsReady;
  if (disposed || completed) return;
  phase.value = "clouds";
  if (motionMedia.matches) { fadeOnly(); return; }
  exit = gsap.timeline({ onComplete: complete });
  exit.to(backdrop.value, { opacity: 0, duration: .45 }, 0);
  for (const bank of banks) {
    const foreground = bank.depth === "front";
    exit.to(cloudBanks[bank.id], {
      xPercent: bank.side === "left" ? -112 : 112,
      opacity: 0,
      duration: foreground ? 1.65 : 2.1,
      ease: "power2.inOut",
    }, foreground ? 0 : .12);
  }
}
function beginExploring() {
  if (started.value || disposed) return;
  started.value = true;
  phase.value = "text-exit";
  window.clearTimeout(autoTimer);
  entrance?.kill();
  // Finish fading the words before allowing any cloud layer to move.
  exit = gsap.to(copy.value, { opacity: 0, duration: motionMedia.matches ? .2 : .55, onComplete: revealMap });
}
function motionChanged() {
  if (started.value && phase.value === "clouds") fadeOnly();
  else if (!started.value && motionMedia.matches) {
    entrance?.kill();
    gsap.set(copy.value, { opacity: 1, y: 0 });
  }
}
onMounted(() => {
  motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionMedia.addEventListener("change", motionChanged);
  // The map is already mounted; decode its images while the introduction plays.
  const images = [...(overlay.value.closest(".world-map")?.querySelectorAll(".world-map__map img") || [])];
  assetsReady = Promise.race([
    Promise.all(images.map(image => image.decode().catch(() => {}))),
    new Promise(resolve => { assetTimer = window.setTimeout(resolve, 5000); }),
  ]).then(() => window.clearTimeout(assetTimer));
  overlay.value.focus({ preventScroll: true });
  entrance = gsap.fromTo(copy.value, { opacity: 0, y: motionMedia.matches ? 0 : 12 }, {
    opacity: 1, y: 0, duration: motionMedia.matches ? .3 : 1, ease: "power2.out",
    onComplete: () => { if (!started.value) phase.value = "reading"; },
  });
  autoTimer = window.setTimeout(beginExploring, 5000);
});
onBeforeUnmount(() => {
  disposed = true;
  window.clearTimeout(autoTimer);
  window.clearTimeout(assetTimer);
  entrance?.kill();
  exit?.kill();
  motionMedia?.removeEventListener("change", motionChanged);
});
</script>

<style scoped>
.world-intro { position: fixed; z-index: 30; inset: 0; display: grid; place-items: center; overflow: hidden; isolation: isolate; color: #31565d; font-family: Arial, Helvetica, sans-serif; outline: none; }
.world-intro *, .world-intro *::before, .world-intro *::after { box-sizing: border-box; letter-spacing: 0; }
.world-intro__backdrop { position: absolute; inset: 0; background: #dfedef; }
.cloud-definitions { position: absolute; width: 0; height: 0; overflow: hidden; }
.cloudscape { position: absolute; inset: 0; pointer-events: none; }
.cloud-bank { position: absolute; top: -5%; width: 67%; height: 110%; will-change: transform, opacity; }
.cloud-bank--left { left: -2%; }
.cloud-bank--right { right: -2%; }
.cloud-bank--back { --cloud-color: #dcebed; --cloud-blue: #c7dee4; --cloud-light: #e8f2f2; }
.cloud-bank--front { --cloud-color: #f2f4ed; --cloud-blue: #e4edf0; --cloud-light: #fbf8ee; }
.cloud-bank--front.cloud-bank--left { left: -7%; }
.cloud-bank--front.cloud-bank--right { right: -7%; }
.cloud-bank__art { display: block; width: 100%; height: 100%; overflow: visible; filter: drop-shadow(12px 4px 16px #789da71a); }
.cloud-bank--right .cloud-bank__art { transform: scaleX(-1); }
.cloud-bank__body { fill: var(--cloud-color); }
.cloud-bank__fold--blue { fill: var(--cloud-blue); }
.cloud-bank__fold--light { fill: var(--cloud-light); }
.cloud-bank__contour { fill: none; stroke: #ffffff80; stroke-width: 2; }
.cloud-bank__small { position: absolute; width: 200px; height: auto; opacity: .65; }
.cloud-bank__small--top { top: 10%; left: 16%; }
.cloud-bank__small--bottom { bottom: 9%; left: 40%; width: 260px; opacity: .5; }
.cloud-bank--right .cloud-bank__small--top { top: 6%; left: 48%; }
.cloud-bank--right .cloud-bank__small--bottom { bottom: 17%; left: 18%; }
.cloud-bank--back .cloud-bank__small { opacity: .25; }
.world-intro__copy { position: relative; z-index: 1; width: min(100% - 64px, 1100px); padding-block: 40px; text-align: center; opacity: 0; }
.world-intro__copy h1 { margin: 0; color: #31565d; font: 400 52px/1.25 Georgia, 'Times New Roman', serif; text-wrap: balance; }
.world-intro__copy h1 span { display: block; }
.world-intro__copy h1 span + span { margin-top: 8px; }
.world-intro__copy p { max-width: 560px; margin: 28px auto 32px; color: #53737a; font-size: 15px; line-height: 1.8; text-wrap: balance; }
.world-intro__begin { display: inline-flex; align-items: center; justify-content: center; gap: 14px; min-height: 48px; padding: 14px 24px; border: 1px solid #abc4c8; border-radius: 8px; background: #ffffffc9; box-shadow: inset 0 1px 0 #fff, 0 4px 0 #b9cdd080, 0 10px 22px #587c8514; color: #31565d; font: 600 13px/1.5 monospace; cursor: pointer; transition: background-color 180ms ease, box-shadow 180ms ease; }
.world-intro__begin:hover { background: #fff; box-shadow: inset 0 1px 0 #fff, 0 4px 0 #adc3c780, 0 12px 26px #587c8524; }
.world-intro__begin:focus-visible { outline: 2px solid #467989; outline-offset: 5px; }
.world-intro__begin:disabled { cursor: default; }
@media (max-width: 900px) { .world-intro__copy h1 { font-size: 42px; } .cloud-bank__small { width: 160px; } .cloud-bank__small--bottom { width: 200px; } }
@media (max-width: 600px) { .world-intro__copy { width: calc(100% - 40px); } .world-intro__copy h1 { font-size: 32px; line-height: 1.3; } .world-intro__copy p { max-width: 310px; margin-block: 24px 28px; font-size: 14px; } .cloud-bank { width: 75%; } .cloud-bank--front.cloud-bank--left { left: -10%; } .cloud-bank--front.cloud-bank--right { right: -10%; } .cloud-bank__small { width: 130px; } .cloud-bank__small--bottom { width: 160px; } }
@media (max-height: 460px) { .world-intro__copy { padding-block: 20px; } .world-intro__copy h1 { font-size: 30px; } .world-intro__copy p { margin-block: 16px 20px; font-size: 13px; } }
@media (prefers-reduced-motion: reduce) { .cloud-bank { will-change: auto; } .world-intro__begin { transition: none; } }
</style>
