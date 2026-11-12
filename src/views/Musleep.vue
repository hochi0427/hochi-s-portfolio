<template>
  <main class="musleep-page">
    <div class="ocean-decor" aria-hidden="true">
      <img class="cloud" :src="`${base}world/ocean/cloud.webp`" alt="" />
      <img class="wave" :src="`${base}world/ocean/wave-01.webp`" alt="" />
    </div>
    <div v-if="showEntranceBubbles && !reducedMotion" class="entrance-bubbles" aria-hidden="true" @animationend.self="showEntranceBubbles = false">
      <span
        v-for="bubble in entranceBubbles" :key="bubble.id" class="entrance-bubble"
        :style="{ left: bubble.left, '--bubble-size': bubble.size, '--bubble-delay': bubble.delay, '--bubble-duration': bubble.duration, '--bubble-drift': bubble.drift }"
      ></span>
    </div>
    <div class="musleep-content">
      <RouterLink class="back-link" :to="{ name: 'Home' }"><span aria-hidden="true">←</span> Back to World Map</RouterLink>


      <div class="bento-grid">
        <div class="sailing-route-layer" aria-hidden="true">
          <div class="sailing-route sailing-route--one"></div>
          <div class="sailing-route sailing-route--two"></div>
        </div>

        <section class="product-card" aria-labelledby="musleep-title" @pointermove="tiltCard" @pointerleave="resetTilt">
          <div class="product-heading">
            <span class="eyebrow">A connected sleep experience</span>
            <h1 id="musleep-title" class="product-name">Musleep</h1>
            <p class="product-subtitle">A Smart Sleep Companion</p>
            <p class="intro">An app, a robot, and personalized music come together to support daily life and better understand sleep.</p>
          </div>
          <div class="product-cover">
            <img v-if="!failedImages.cover" :src="asset('musleep-cover.png')" alt="Musleep sleep companion product cover" @error="failedImages.cover = true" />
            <div v-else class="image-placeholder"><i class="fa-solid fa-moon" aria-hidden="true"></i><span>Musleep · A Smart Sleep Companion</span></div>
          </div>
          <div class="product-footer">
            <button class="architecture-button" type="button" @click="openDiagram"><i class="fa-solid fa-diagram-project" aria-hidden="true"></i> View Architecture <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></button>
            <span class="navigation-mark" aria-hidden="true">+ N</span>
          </div>
        </section>

        <article v-for="(card, index) in cards" :key="card.id" class="explore-card" :class="`explore-card--${card.id}`" :style="{ '--arrival-delay': `${240 + index * 120}ms` }">
          <div v-if="!card.interactive" class="card-face card-front card-static">
            <span class="card-media"><i :class="card.icon" aria-hidden="true"></i></span>
            <div class="card-copy">
              <h2 class="card-title">{{ card.title }}</h2>
              <p class="card-description">{{ card.description }}</p>
            </div>
          </div>
          <div v-else class="flip-control" @keydown.esc.stop.prevent="returnToOverview(card.id, $event)" @pointermove="tiltCard" @pointerleave="resetTilt">
            <div class="flip-inner" :class="{ 'is-flipped': flipped.includes(card.id) }">
              <button
                class="card-face card-front flip-front" type="button"
                :inert="flipped.includes(card.id)"
                :aria-hidden="flipped.includes(card.id)"
                :aria-expanded="flipped.includes(card.id)"
                :aria-controls="`${card.id}-details`"
                :aria-label="`${card.title}: Explore`"
                :aria-describedby="`${card.id}-overview`"
                @click="toggleCard(card.id, $event)"
              >
                <span class="card-media">
                  <video
                    v-if="card.video && !failedImages[`${card.id}Video`] && !reducedMotion && !flipped.includes(card.id)"
                    :src="asset(card.video)" :poster="asset(card.image)"
                    autoplay muted loop playsinline preload="metadata" aria-hidden="true"
                    @error="failedImages[`${card.id}Video`] = true"
                  ></video>
                  <img v-else-if="card.image && !failedImages[card.id]" :src="asset(card.image)" alt="" @error="failedImages[card.id] = true" />
                  <i v-else :class="card.icon" aria-hidden="true"></i>
                </span>
                <span class="card-copy" :id="`${card.id}-overview`">
                  <span class="card-title">{{ card.title }}</span>
                  <span v-if="card.subtitle" class="card-subtitle">{{ card.subtitle }}</span>
                  <span v-if="card.concepts" class="concept-tags" aria-label="Technical concepts">
                    <span v-for="concept in card.concepts" :key="concept">{{ concept }}</span>
                  </span>
                  <span class="explore-hint">Explore <span aria-hidden="true">→</span></span>
                </span>
              </button>
              <div
                class="card-face card-back" role="button"
                :inert="!flipped.includes(card.id)" :aria-hidden="!flipped.includes(card.id)"
                :tabindex="flipped.includes(card.id) ? 0 : -1"
                :aria-label="`${card.title}: Flip back to overview`"
                :aria-describedby="`${card.id}-details`"
                @click="toggleCard(card.id, $event)" @keydown="handleBackKey(card.id, $event)"
              >
                <div :id="`${card.id}-details`" class="card-copy">
                  <h2 class="card-title">{{ card.backTitle }}</h2>
                  <ul v-if="card.details" class="detail-list">
                    <li v-for="detail in card.details" :key="detail">{{ detail }}</li>
                  </ul>
                  <div v-else class="detail-copy">
                    <p v-for="paragraph in card.paragraphs || [card.detail]" :key="paragraph">{{ paragraph }}</p>
                  </div>
                </div>
                <span class="return-hint" aria-hidden="true">Click to flip back ↺</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <HochiGuide :messages="musleepStory" restart-on-end />

    <dialog ref="diagramDialog" class="diagram-dialog" aria-labelledby="diagram-title" @click="closeOnBackdrop">
      <div class="dialog-heading">
        <div><h2 id="diagram-title">System Architecture</h2><p>How everything connects.</p></div>
        <button class="close-button" type="button" aria-label="Close architecture diagram" title="Close" autofocus @click="diagramDialog.close()"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
      </div>
      <img v-if="!failedImages.architecture" class="architecture-image" :src="asset('architecture.png')" alt="Musleep system architecture diagram" @error="failedImages.architecture = true" />
      <div v-else class="architecture-placeholder"><i class="fa-solid fa-diagram-project" aria-hidden="true"></i><p>The app, KoiBot, and watch share sleep records through Firebase. Python services on AWS EC2 process recommendation data and return personalized playlists.</p></div>
    </dialog>
  </main>
</template>

<script setup>
import { onBeforeUnmount, onMounted, nextTick, ref } from "vue";
import HochiGuide from "../components/common/HochiGuide.vue";

const base = import.meta.env.BASE_URL;
const asset = (filename) => `${base}projects/musleep/${filename}`;
const musleepStory = [
  "Back in college, I had one goal: I wanted to build something that could actually make people’s lives better.\n\nSleep felt like a good place to start. After all, something we do every night can have such a big impact on our lives.",
  "That’s how Musleep began!\n\nIt brought together so many things I’d learned in college—coding, mobile development, smart devices, and even a music recommendation system.\n\nIt was exciting to see all those pieces come together into one project.",
  "And guess what? Our team won first place in our department’s capstone competition!\n\nMore importantly, Musleep taught me something I’ve carried with me ever since: the best technology isn’t just functional. It’s meaningful.",
];
const flipped = ref([]);
const failedImages = ref({});
const diagramDialog = ref(null);
const reducedMotion = ref(true);
const showEntranceBubbles = ref(true);
const entranceBubbles = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: `${5 + (index * 29) % 90}%`,
  size: `${14 + (index * 11) % 36}px`,
  delay: `${(index % 5) * 240}ms`,
  duration: `${6000 + (index % 4) * 400}ms`,
  drift: index % 2 ? "-36px" : "36px",
}));
let motionMedia;
function updateMotionPreference() {
  reducedMotion.value = motionMedia.matches;
}
onMounted(() => {
  motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  updateMotionPreference();
  motionMedia.addEventListener("change", updateMotionPreference);
});
onBeforeUnmount(() => motionMedia?.removeEventListener("change", updateMotionPreference));
const cards = [
  {
    id: "app", interactive: true, title: "Musleep App",
    image: "musleep-app.png", video: "sleepdata.mp4", icon: "fa-brands fa-android",
    backTitle: "Building Healthier Sleep Habits",
    paragraphs: [
      "A consistent sleep schedule is important for better sleep. Musleep allows users to track sleep patterns and daily habits through a sleep diary, including caffeine intake, medication, naps, and exercise.",
      "These records also serve as inputs to the personalized music recommendation algorithm.",
    ],
  },
  {
    id: "koibot", interactive: true, title: "KoiBot Robot",
    image: "koibot.png", icon: "fa-solid fa-robot", backTitle: "Hardware & Interaction",
    details: [
      "Integrates robot functionality through APIs and SDKs.",
      "Supports voice assistant interaction.",
      "Uses audio localization and automatic screen orientation adjustment.",
    ],
  },
  {
    id: "music", interactive: true, title: "Music Recommendation System",
    subtitle: "Algorithm-Driven Recommendations",
    icon: "fa-solid fa-headphones", backTitle: "How the Algorithm Works",
    details: [
      "Collect user and sleep-related data over a Seven-Day Recommendation Cycle.",
      "Standardize user data and calculate Cosine Similarity.",
      "Identify the five most similar users through Collaborative Filtering.",
      "Combine collaborative filtering results with Music Tag Analysis.",
      "Select seven recommended tracks for the next cycle.",
    ],
    concepts: ["Collaborative Filtering", "Cosine Similarity"],
  },
  {
    id: "voice", interactive: false, title: "Voice API",
    icon: "fa-solid fa-microphone-lines",
    description: "Voice commands and hands-free interaction through API/SDK integration.",
  },
  {
    id: "watch", interactive: true, title: "Galaxy Watch Active2", subtitle: "Wearable Sleep Tracking",
    image: "smartwatch.png", icon: "fa-solid fa-clock", backTitle: "Wearable Sleep Tracking",
    details: [
      "Uses triaxial accelerometer data to support sleep-state estimation.",
      "Collects sleep-related data and sleep-efficiency metrics.",
      "Provides additional data inputs for personalized music recommendations.",
    ],
  },
  {
    id: "aws", interactive: false, title: "AWS EC2", icon: "fa-brands fa-aws",
    description: "Cloud-hosted Python services connect and process Musleep system data.",
  },
  {
    id: "firebase", interactive: false, title: "Firebase", icon: "fa-solid fa-database",
    description: "NoSQL database for storing and synchronizing sleep and recommendation data.",
  },
];

// Preserve independent links and controls if a card later includes them.
function isNestedControl(event) {
  const control = event?.target?.closest?.('a, button, input, select, textarea, [contenteditable], [role="button"], video[controls], audio[controls]');
  return Boolean(control && control !== event.currentTarget);
}
function focusFace(article, selector) {
  nextTick(() => article?.querySelector(selector)?.focus({ preventScroll: true }));
}
function toggleCard(id, event) {
  if (event?.defaultPrevented || isNestedControl(event)) return;
  const showingBack = !flipped.value.includes(id);
  flipped.value = showingBack ? [...flipped.value, id] : flipped.value.filter(value => value !== id);
  focusFace(event?.currentTarget.closest(".explore-card"), showingBack ? ".card-back" : ".flip-front");
}
function handleBackKey(id, event) {
  if (event.repeat || isNestedControl(event) || !["Enter", " "].includes(event.key)) return;
  // Prevent Space scrolling the page while activating the card.
  event.preventDefault();
  toggleCard(id, { currentTarget: event.currentTarget, target: event.target });
}
function returnToOverview(id, event) {
  unflip(id);
  focusFace(event.currentTarget.closest(".explore-card"), ".flip-front");
}
function unflip(id) {
  flipped.value = flipped.value.filter((value) => value !== id);
}
function tiltCard(event) {
  if (event.pointerType !== "mouse") return;
  const rect = event.currentTarget.getBoundingClientRect();
  const x = Math.max(-.5, Math.min(.5, (event.clientX - rect.left) / rect.width - .5));
  const y = Math.max(-.5, Math.min(.5, (event.clientY - rect.top) / rect.height - .5));
  event.currentTarget.style.setProperty("--tilt-x", `${-y * 24}deg`);
  event.currentTarget.style.setProperty("--tilt-y", `${x * 24}deg`);
}
function resetTilt(event) {
  event.currentTarget.style.removeProperty("--tilt-x");
  event.currentTarget.style.removeProperty("--tilt-y");
}
function openDiagram() {
  if (!diagramDialog.value.open) diagramDialog.value.showModal();
}
function closeOnBackdrop(event) {
  if (event.target !== diagramDialog.value) return;
  const rect = diagramDialog.value.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) diagramDialog.value.close();
}
</script>

<style scoped>
.musleep-page { position: fixed; inset: 0; z-index: 5; overflow-y: auto; overflow-x: hidden; isolation: isolate; background: #dcefed; color: #214c68; font-family: Arial, Helvetica, sans-serif; letter-spacing: 0; }
.musleep-page *, .musleep-page *::before, .musleep-page *::after { box-sizing: border-box; }
.musleep-content { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 14px; width: min(100% - 64px, 1600px); min-height: 100svh; margin-inline: auto; padding: 20px 0 32px; }
.back-link { align-self: flex-start; display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0; color: #31565d; font-size: 12px; line-height: 20px; text-decoration: none; transition: opacity 180ms ease; }
.back-link:hover { text-decoration: none; opacity: 0.65; }
.ocean-decor { position: fixed; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; }
.ocean-decor img { position: absolute; height: auto; opacity: .3; }
.cloud { top: 0; right: 0; width: 130px; }
.wave { bottom: 0; left: 0; width: 110px; }
.entrance-bubbles { position: fixed; z-index: 0; inset: 0; overflow: hidden; pointer-events: none; animation: bubble-window 9000ms linear both; }
.entrance-bubble { position: absolute; bottom: -60px; width: var(--bubble-size); height: var(--bubble-size); border: 1px solid #ffffffd9; border-radius: 50%; background: transparent; box-shadow: inset 2px 2px 3px #ffffff80, inset -1px -2px 3px #78b5cc40; animation: bubble-rise var(--bubble-duration) linear var(--bubble-delay) both; }
@keyframes bubble-window {
  0%, 85% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes bubble-rise {
  0% { opacity: 0; transform: translate3d(0, 0, 0) scale(.65); }
  15% { opacity: .8; }
  40% { transform: translate3d(calc(var(--bubble-drift) * -.35), -34svh, 0) scale(.85); }
  65% { opacity: .55; }
  75% { transform: translate3d(calc(var(--bubble-drift) * .6), -64svh, 0) scale(1); }
  100% { opacity: 0; transform: translate3d(var(--bubble-drift), -85svh, 0) scale(1.15); }
}
@keyframes card-arrival {
  0% { opacity: 0; translate: 0 100px; scale: .96; rotate: -.8deg; }
  45% { opacity: 1; translate: 4px 24px; scale: .99; rotate: .5deg; }
  82% { opacity: 1; translate: -2px -5px; scale: 1; rotate: -.2deg; }
  100% { opacity: 1; translate: 0 0; scale: 1; rotate: 0deg; }
}
@media (prefers-reduced-motion: no-preference) {
  .product-card, .explore-card { animation: card-arrival 2600ms cubic-bezier(.25,.5,.3,1) var(--arrival-delay, 120ms) backwards; }
}
.bento-grid { position: relative; display: grid; flex: none; height: calc(100svh - 86px); min-height: 540px; grid-template-columns: repeat(6, minmax(0, 1fr)); grid-template-rows: minmax(0, 1.2fr) minmax(0, 1fr) minmax(112px, 0.5fr); gap: 16px; perspective: 1800px; }
.sailing-route-layer { position: absolute; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; }
.sailing-route { position: absolute; z-index: -1; pointer-events: none; border: 1px dashed #88b2c1; border-radius: 40%; }
.sailing-route--one { inset: 10% 6% 16%; transform: rotate(-6deg); }
.sailing-route--two { inset: 22% 12% 3%; transform: rotate(7deg); opacity: .6; }
.product-card, .card-face { border: 1px solid #d8f5fa; border-radius: 8px; box-shadow: 0 2px 0 #fff inset, -1px 0 0 #ffffffb3 inset, 0 0 14px #ffffffb3, 0 0 30px #8ce2ef66, 1px 3px 0 #d6e7ed, 2px 7px 0 #bdd5df, 3px 11px 0 #a6c4d1, 3px 16px 10px #244e6924, 4px 28px 38px #244e6929; }
.product-card { position: relative; grid-column: 3 / 5; grid-row: 1 / 3; display: flex; flex-direction: column; min-width: 0; min-height: 0; padding: 20px; background: #fff; transform-style: preserve-3d; transition: transform 260ms ease, box-shadow 260ms ease; }
.eyebrow { color: #698c9c; font-size: 10px; text-transform: uppercase; }
h1, .product-name { margin: 10px 0 6px; color: #1b4562; font-family: Georgia, 'Times New Roman', serif; font-size: 46px; font-weight: 500; line-height: 1.05; }
.product-subtitle { margin: 0; font-size: 17px; line-height: 1.4; }
.intro { margin: 12px 0 0; color: #638090; font-size: 13px; line-height: 1.65; }
.product-cover { display: flex; flex: 1; min-height: 0; justify-content: center; align-items: center; margin: 12px 0; }
.product-cover > img { display: block; width: 100%; height: 100%; min-height: 0; object-fit: contain; filter: drop-shadow(0 12px 12px #335f6d18); }
.product-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.architecture-button { display: inline-flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px; padding: 9px 0; border: 0; background: transparent; color: #356d8b; font: inherit; font-size: 11px; cursor: pointer; }
.architecture-button:hover { color: #173d56; text-decoration: underline; }
.navigation-mark { color: #8baab6; font-size: 10px; white-space: nowrap; }
.explore-card { min-width: 0; min-height: 0; perspective: 1400px; }
.explore-card--app { grid-area: 1 / 1 / 2 / 3; }
.explore-card--koibot { grid-area: 1 / 5 / 2 / 7; }
.explore-card--voice { grid-area: 3 / 1 / 4 / 3; }
.explore-card--watch { grid-area: 2 / 5 / 3 / 7; }
.explore-card--music { grid-area: 2 / 1 / 3 / 3; }
.explore-card--aws { grid-area: 3 / 3 / 4 / 5; }
.explore-card--firebase { grid-area: 3 / 5 / 4 / 7; }
.flip-control { display: block; width: 100%; height: 100%; padding: 0; border: 0; border-radius: 8px; background: transparent; color: inherit; font: inherit; text-align: left; transform-style: preserve-3d; transition: transform 220ms ease; }
.flip-control, .product-card { transform: translateY(-3px) rotateX(2deg) rotateY(-2deg); }
.flip-inner { position: relative; height: 100%; transform-style: preserve-3d; transition: transform 580ms cubic-bezier(.2,.65,.25,1); }
.flip-inner.is-flipped { transform: rotateY(180deg); }
.card-face { position: relative; grid-area: 1 / 1; display: flex; min-width: 0; min-height: 0; padding: 14px 16px; backface-visibility: hidden; -webkit-backface-visibility: hidden; background: #f7fbfd; transform-style: preserve-3d; transition: box-shadow 260ms ease; }
.card-front::after, .product-card::after { content: ""; position: absolute; inset: 7px; border: 1px solid #ffffffb3; border-radius: 5px; pointer-events: none; transform: translateZ(8px); }
.card-front::before { content: ""; position: absolute; top: 10px; right: 10px; width: 58px; height: 58px; border-radius: 0 6px 0 48px; background: #b9dfe533; border: 1px solid #ffffff80; box-shadow: -9px 9px 0 #b9dfe51a; pointer-events: none; opacity: .55; transform: translateZ(18px); transition: opacity 260ms ease; }
.card-front, .product-card { background-image: linear-gradient(145deg, #ffffff70, transparent 55%, #a9cddc18); }
.card-front { align-items: center; gap: 12px; }
.flip-front { width: 100%; height: 100%; color: inherit; font: inherit; text-align: left; cursor: pointer; }
.flip-inner > .card-face { position: absolute; inset: 0; }
.card-back .card-copy { min-height: 0; overflow-y: auto; overscroll-behavior: contain; }
.card-back:focus-visible { outline: 3px solid #4688aa; outline-offset: 5px; }
.card-copy { display: flex; flex-direction: column; min-width: 0; }
.card-media { display: flex; flex: 0 0 50px; align-items: center; justify-content: center; align-self: stretch; min-height: 0; color: #4b88a2; }
.card-media i { font-size: 34px; }
.card-media .fa-aws { color: #4f7188; font-size: 42px; }
.card-media img, .card-media video { display: block; width: 100%; height: 100%; min-height: 0; object-fit: contain; }
.card-media video { max-height: none; border-radius: 6px; }
.card-media, .card-copy, .product-heading, .product-cover, .product-footer { position: relative; transition: transform 260ms ease; }
.card-media, .product-cover { transform: translateZ(20px); }
.card-copy, .product-heading, .product-footer { transform: translateZ(10px); }
.card-title { display: block; margin: 0 0 6px; font-size: 16px; font-weight: 600; line-height: 1.25; overflow-wrap: anywhere; }
.card-subtitle { display: block; margin: 0; color: #497086; font-size: 12px; font-weight: 600; line-height: 1.5; }
.card-description { display: block; margin: 8px 0 0; color: #536f80; font-size: 12px; line-height: 1.65; overflow-wrap: anywhere; }
.card-static { height: 100%; padding: clamp(16px, 2svh, 24px) 18px; gap: 14px; cursor: default; }
.card-static .card-media { flex: 0 0 28px; }
.card-static .card-media i { font-size: 24px; }
.card-static .card-title { font-size: 15px; margin-bottom: 4px; }
.card-static .card-description { margin: 0; font-size: 13px; line-height: 1.5; }
.card-static::before { display: none; }
.card-static .card-media, .card-static .card-copy { transform: none; }
.concept-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; }
.concept-tags > span { padding: 4px 7px; border: 1px solid #bad4df; border-radius: 4px; background: #ffffff99; color: #356d8b; font-size: 10px; line-height: 1.4; }
.detail-list { display: grid; gap: 5px; margin: 0; padding-left: 16px; color: #dcebf3; font-size: 13px; line-height: 1.45; }
.explore-hint { display: block; margin-top: 10px; color: #5a859b; font-size: 10px; }
.explore-card--app .card-front, .explore-card--koibot .card-front { flex-direction: column; align-items: stretch; padding: 14px 16px; gap: 8px; }
.explore-card--app .card-media, .explore-card--koibot .card-media { flex: 1; width: 100%; min-height: 0; }
.explore-card--app .card-media img, .explore-card--koibot .card-media img { max-height: none; }
.explore-card--koibot .card-front, .explore-card--music .card-front { background: #eaf4fa; }
.explore-card--watch .card-front { background: #edf7f3; }
.explore-card--watch .card-media { flex-basis: 78px; }
.explore-card--firebase .card-front { background: #f6f8fc; }
.card-back { flex-direction: column; justify-content: center; padding: 18px 20px; gap: 12px; cursor: pointer; background: #214e69; border-color: #376580; color: #fff; transform: rotateY(180deg); }
.card-back .card-title { font-size: 17px; }
.card-back .card-copy { flex: 0 1 auto; transform: none; text-align: left; }
.detail-copy { margin: 0; color: #dcebf3; font-size: 13px; line-height: 1.5; }
.detail-copy p { margin: 0; }
.detail-copy p + p { margin-top: 10px; }
.return-hint { display: block; align-self: flex-start; flex: none; color: #b8dbe9; font-size: 11px; line-height: 1.4; }
.image-placeholder { display: flex; flex-direction: column; gap: 16px; align-items: center; justify-content: center; width: 100%; height: 100%; min-height: 120px; border: 1px dashed #b4d0de; color: #7194a5; font-size: 12px; }
.image-placeholder i { font-size: 48px; }
.diagram-dialog { width: min(1100px, calc(100% - 32px)); max-height: calc(100svh - 40px); padding: 24px; border: 1px solid #bad4df; border-radius: 8px; background: #f7fbfd; color: #214c68; box-shadow: 0 28px 100px #173a5266; }
.diagram-dialog::backdrop { background: #173a5280; backdrop-filter: blur(5px); }
.dialog-heading { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
.dialog-heading h2 { margin: 0; font-size: 21px; }
.dialog-heading p { margin: 6px 0 0; color: #698899; font-size: 12px; }
.close-button { display: grid; flex-shrink: 0; place-items: center; width: 36px; height: 36px; padding: 0; border: 1px solid #c6dde6; border-radius: 6px; background: #fff; color: #356c88; cursor: pointer; }
.architecture-image { display: block; width: 100%; height: auto; max-height: calc(100svh - 170px); margin-top: 24px; object-fit: contain; }
.architecture-placeholder { display: grid; place-content: center; gap: 18px; min-height: 300px; margin-top: 24px; border: 1px dashed #adcbd9; text-align: center; color: #6a8d9f; }
.architecture-placeholder i { font-size: 42px; }
button:focus-visible, a:focus-visible { outline: 3px solid #4688aa; outline-offset: 5px; }
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .explore-card:hover, .product-card:hover { z-index: 2; }
  .flip-control:hover, .product-card:hover { transform: translateY(-14px) rotateX(var(--tilt-x, 9deg)) rotateY(var(--tilt-y, -9deg)); }
  .flip-control:hover .card-face, .product-card:hover { box-shadow: 0 2px 0 #fff inset, 0 0 20px #ffffffcc, 0 0 44px #7edfee99, 1px 4px 0 #d6e7ed, 2px 8px 0 #bdd5df, 3px 13px 0 #a6c4d1, 4px 21px 18px #244e6929, 5px 38px 48px #244e6938; }
  .flip-control:hover .card-front::before { opacity: 1; }
  .flip-control:hover .card-media, .product-card:hover .product-cover { transform: translateZ(36px); }
  .flip-control:hover .card-front .card-copy, .product-card:hover .product-heading, .product-card:hover .product-footer { transform: translateZ(22px); }
}
@media (max-width: 1050px) {
  .musleep-content { width: min(100% - 48px, 1000px); height: auto; min-height: 100svh; padding-bottom: 40px; }
  .bento-grid { flex: none; height: auto; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: auto; }
  .product-card { grid-column: 1 / -1; grid-row: auto; min-height: 500px; }
  .product-cover { height: 260px; flex: none; }
  .explore-card { grid-area: auto; min-height: 220px; }
  .bento-grid { min-height: 0; }
  .explore-card--app, .explore-card--koibot { height: 320px; }
  .explore-card--music, .explore-card--watch { height: 240px; }
  .explore-card--voice, .explore-card--aws, .explore-card--firebase { min-height: 0; }
  .card-static { height: auto; min-height: 112px; }
  .card-back { padding-block: 24px; }
  .cloud { opacity: .2; }
}
@media (max-width: 600px) {
  .entrance-bubble:nth-child(n + 7) { display: none; }
  .musleep-content { width: calc(100% - 36px); gap: 24px; padding-top: 22px; }
  .bento-grid { grid-template-columns: minmax(0, 1fr); gap: 22px; }
  .product-card { grid-column: auto; padding: 24px; }
  h1, .product-name { font-size: 42px; }
  .product-cover { height: 250px; }
  .explore-card { min-height: 210px; }
  .explore-card--app, .explore-card--koibot { height: 340px; }
  .card-face { padding: 16px; }
  .card-static { padding: 18px; }
  .card-title { font-size: 16px; }
  .card-media { flex-basis: 44px; }
  .explore-card--music .card-front, .explore-card--watch .card-front { flex-direction: column; align-items: flex-start; }
  .explore-card--music .card-media { flex: none; align-self: flex-start; }
  .explore-card--watch .card-media { flex: none; width: 64px; height: 70px; align-self: flex-start; }
  .diagram-dialog { padding: 20px; }
  .cloud { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .back-link { transition-duration: 0.01ms; }
  .entrance-bubbles { display: none; }
  .flip-control, .product-card { transform: none; }
  .flip-control, .flip-inner, .card-face, .card-front::before, .product-card, .card-media, .card-copy, .product-heading, .product-cover, .product-footer { transition: none; }
}
</style>
