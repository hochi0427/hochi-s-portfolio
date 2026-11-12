<template>
  <main class="research-transition">
    <div class="research-ocean" aria-hidden="true">
      <img class="research-cloud" :src="`${base}world/ocean/cloud.webp`" alt="" />
      <img class="research-wave" :src="`${base}world/ocean/wave-02.webp`" alt="" />
    </div>
    <RouterLink class="research-back" :to="{ name: 'Home' }" @click="cancelTransition"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to the World</RouterLink>

    <section class="research-content" aria-labelledby="research-title">
      <div class="notebook" aria-hidden="true"><span class="notebook-pages"></span><span class="notebook-spine"></span><span class="notebook-turn"></span></div>
      <p class="research-kicker">CURRENT RESEARCH · WORK IN PROGRESS</p>
      <h1 id="research-title">Exploring Collaborative Problem Solving Through Cooperative Games</h1>
      <p class="research-description">An ongoing capstone research project exploring how cooperative gameplay can support collaborative problem-solving skills.</p>

      <div class="journal-loading">
        <p role="status">Entering Research Journal…</p>
        <div class="journal-progress" role="progressbar" aria-label="Entering Research Journal" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="Math.round(progress)">
          <span :style="{ width: `${progress}%` }"></span>
        </div>
      </div>
      <a class="enter-journal" :href="journalUrl" @click.prevent="enterJournal">Enter Now <span aria-hidden="true">→</span></a>
    </section>
  </main>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const base = import.meta.env.BASE_URL;
const journalUrl = "https://hochi0427.github.io/capstone-thesis/";
const duration = 3000;
const progress = ref(0);
let redirectTimer;
let progressTimer;
let leaving = false;

function clearTimers() {
  window.clearTimeout(redirectTimer);
  window.clearInterval(progressTimer);
}
function cancelTransition() {
  leaving = true;
  clearTimers();
}
function enterJournal() {
  if (leaving) return;
  leaving = true;
  progress.value = 100;
  clearTimers();
  // Replace the interstitial so browser Back does not trigger another redirect.
  window.location.replace(journalUrl);
}
onMounted(() => {
  const started = performance.now();
  progressTimer = window.setInterval(() => {
    progress.value = Math.min(100, (performance.now() - started) / duration * 100);
  }, 50);
  redirectTimer = window.setTimeout(enterJournal, duration);
});
onBeforeUnmount(cancelTransition);
</script>

<style scoped>
.research-transition { position: fixed; z-index: 5; inset: 0; display: grid; align-items: center; min-width: 0; overflow: auto; isolation: isolate; padding: 110px 28px 70px; background: #deeeed; color: #254c60; font-family: Arial, Helvetica, sans-serif; letter-spacing: 0; }
.research-transition *, .research-transition *::before, .research-transition *::after { box-sizing: border-box; letter-spacing: 0; }
.research-ocean { position: fixed; z-index: -1; inset: 0; overflow: hidden; pointer-events: none; }
.research-ocean img { position: absolute; height: auto; opacity: .28; }
.research-cloud { top: 25px; right: 30px; width: 135px; }
.research-wave { bottom: 30px; left: 24px; width: 140px; }
.research-back { position: absolute; top: 30px; left: max(28px, calc((100% - 1280px) / 2)); display: inline-flex; align-items: center; gap: 9px; color: #31565d; text-decoration: none; font-size: 12px; transition: opacity 180ms ease; }
.research-back:hover { opacity: .65; }
.research-content { width: min(100%, 760px); margin-inline: auto; text-align: center; }
.research-kicker { margin: 30px 0 18px; color: #648591; font-size: 10px; line-height: 1.6; font-weight: 600; }
h1 { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 38px; line-height: 1.25; font-weight: 500; text-wrap: balance; overflow-wrap: anywhere; }
.research-description { max-width: 570px; margin: 22px auto 0; color: #60818c; font-size: 14px; line-height: 1.8; text-wrap: pretty; }
.notebook { position: relative; width: 116px; height: 82px; margin-inline: auto; border: 1px solid #6f939b; border-radius: 5px; background: #83aab1; box-shadow: 0 5px 0 #b3cdd0, 0 12px 20px #31545c12; transform: rotate(-6deg); perspective: 600px; }
.notebook-pages { position: absolute; inset: 6px; border-radius: 2px; background: #fbfdfb; box-shadow: 0 2px 0 #d4e1e2; }
.notebook-pages::after, .notebook-turn::after { content: ""; position: absolute; inset: 15px 7px 8px; background: repeating-linear-gradient(transparent 0 7px, #b7d0d580 7px 8px); }
.notebook-spine { position: absolute; top: 6px; bottom: 6px; left: 50%; width: 1px; background: #adc7cd; }
.notebook-turn { position: absolute; top: 6px; bottom: 6px; left: 50%; right: 6px; border: 1px solid #dce8e8; border-radius: 0 2px 2px 0; background: #f6fbfa; transform-origin: left center; backface-visibility: hidden; animation: journal-page-turn 1700ms ease-in-out infinite; }
@keyframes journal-page-turn { 0%, 15% { transform: rotateY(0); } 80%, 100% { transform: rotateY(-155deg); } }
.journal-loading { width: min(100%, 280px); margin: 34px auto 24px; }
.journal-loading p { margin: 0 0 12px; color: #698b96; font-size: 11px; }
.journal-progress { height: 3px; overflow: hidden; border-radius: 2px; background: #bfd7d9; }
.journal-progress span { display: block; height: 100%; border-radius: inherit; background: #4d8797; }
.enter-journal { display: inline-flex; align-items: center; gap: 14px; padding: 11px 18px; border: 1px solid #a4c6cd; border-radius: 5px; color: #315f71; background: #f5fbfa; box-shadow: 0 3px 0 #bed5d7; font-size: 12px; text-decoration: none; transition: background-color 180ms ease; }
.enter-journal:hover { background: #fff; }
a:focus-visible { outline: 3px solid #4688a0; outline-offset: 5px; }
@media (max-width: 600px) {
  .research-transition { padding: 100px 24px 55px; }
  .research-back { top: 25px; left: 24px; }
  h1 { font-size: 29px; }
  .research-kicker { font-size: 9px; margin-top: 26px; }
  .research-description { font-size: 13px; }
  .research-cloud { width: 90px; right: 10px; opacity: .18; }
  .research-wave { width: 90px; left: 12px; opacity: .2; }
}
@media (prefers-reduced-motion: reduce) {
  .notebook-turn { animation: none; }
  .research-back, .enter-journal { transition: none; }
}
</style>
