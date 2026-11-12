<template>
  <main class="math-tactics-page">
    <div class="console-content">
      <RouterLink class="back-link" :to="{ name: 'GamePlay' }"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to Game &amp; Play</RouterLink>
      <header class="project-header">
        <div><h1>Math Tactics</h1><p class="subtitle">Four numbers. A target. More than one way to think.</p></div>
        <div class="project-links">
          <a class="device-button play-button" :href="demoPages.host.url" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-gamepad" aria-hidden="true"></i> Play Math Tactics <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
          <a class="device-button" href="https://github.com/hochi0427/MathTactics" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github" aria-hidden="true"></i> Code on GitHub</a>
        </div>
      </header>

      <div class="console-grid">
        <section class="console-module overview" aria-labelledby="overview-title">
          <div class="module-label"><h2 id="overview-title">Game Overview</h2><i class="fa-solid fa-map section-icon" aria-hidden="true"></i></div>
          <div class="overview-content">
            <img class="game-art" :src="`${base}images/MathTacticsLogo.png`" alt="Math Tactics illustrated game cover" />
            <div><h3>Arithmetic meets classroom play.</h3><p>A real-time multiplayer mathematics game for upper elementary students. Build expressions from four given numbers and get as close as possible to a target number.</p></div>
          </div>
          <div class="role-summary"><h3>My Role</h3><p>Game design, learning experience design, frontend development, multiplayer interaction design, and UI/UX iteration.</p></div>
        </section>
        <section class="console-module learning" aria-labelledby="learning-title">
          <div class="module-label"><h2 id="learning-title">Learning Goals</h2><i class="fa-solid fa-anchor section-icon" aria-hidden="true"></i></div>
          <h3>Fluency through flexible thinking.</h3>
          <ul class="learning-list"><li><span>01</span><div><h4>Practice core operations</h4><p>Build fluency through repeated arithmetic challenges.</p></div></li><li><span>02</span><div><h4>Explore different strategies</h4><p>Test expressions, compare approaches, and revise across rounds.</p></div></li><li><span>03</span><div><h4>Grow with the challenge</h4><p>Move from addition, subtraction, and multiplication to division and decimals.</p></div></li></ul>
        </section>
        <section class="console-module how-it-works" aria-labelledby="how-title">
          <div class="module-label"><h2 id="how-title">How It Works</h2><i class="fa-solid fa-compass section-icon" aria-hidden="true"></i></div>
          <ol class="steps"><li><strong>Host &amp; join</strong><span>Separate host and player interfaces support classroom play.</span></li><li><strong>Build an expression</strong><span>Use four given numbers to approach the target before time runs out.</span></li><li><strong>Reflect &amp; repeat</strong><span>Review score feedback and compare strategies across rounds.</span></li></ol>
        </section>
        <section class="console-module mechanics" aria-labelledby="mechanics-title">
          <div class="module-label"><h2 id="mechanics-title">Game Mechanics</h2><i class="fa-solid fa-binoculars section-icon" aria-hidden="true"></i></div>
          <div class="mechanics-grid"><div><h3>Timed challenges</h3><p>Target-number puzzles encourage strategic expression building under time pressure.</p></div><div><h3>Progressive difficulty</h3><p>A tutorial introduces the game before ten increasingly complex rounds.</p></div><div><h3>Shared feedback</h3><p>A leaderboard makes scores and rank visible during classroom play.</p></div><div><h3>Final reflection</h3><p>A performance summary brings together formulas, round scores, and rank.</p></div></div>
        </section>
        <section class="console-module technology" aria-labelledby="technology-title">
          <div class="module-label"><h2 id="technology-title">Technology</h2><svg class="section-icon sextant-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 3v17a17 17 0 0 0 14.7-8.5L6 3Zm0 13a13 13 0 0 0 11.2-6.5M3 9h18M3 7v4M21 7v4M10 15l1.5 2.6M14 12l2.6 1.5" /><circle cx="6" cy="3" r="1.5" /></svg></div>
          <ul class="technology-list"><li><i class="fa-brands fa-vuejs" aria-hidden="true"></i> Vue 3</li><li><i class="fa-brands fa-js" aria-hidden="true"></i> JavaScript</li><li><i class="fa-solid fa-server" aria-hidden="true"></i> Render</li><li><i class="fa-brands fa-github" aria-hidden="true"></i> GitHub Pages</li></ul>
          <div class="vent" aria-hidden="true"></div>
        </section>
      </div>

      <section class="demo-console" aria-labelledby="demo-title">
        <div class="demo-toolbar">
          <div><p class="eyebrow">Live connection</p><h2 id="demo-title"><i class="fa-solid fa-sailboat section-icon" aria-hidden="true"></i> Live Demo</h2></div>
          <div class="demo-tabs" role="tablist" aria-label="Demo interface">
            <button v-for="(page, key) in demoPages" :id="`tab-${key}`" :key="key" :ref="element => { tabButtons[key] = element; }" type="button" role="tab" :aria-selected="activeDemo === key" :aria-controls="`panel-${key}`" :tabindex="activeDemo === key ? 0 : -1" @click="selectDemo(key)" @keydown="handleTabKey($event, key)">{{ page.label }}</button>
          </div>
        </div>
        <div class="demo-bezel">
          <div v-for="(page, key) in demoPages" :id="`panel-${key}`" :key="key" v-show="activeDemo === key" class="demo-panel" role="tabpanel" :aria-labelledby="`tab-${key}`">
            <iframe v-if="visited[key]" :src="page.url" :title="`Math Tactics ${page.label.toLowerCase()} live demo`" allow="fullscreen" allowfullscreen></iframe>
          </div>
        </div>
        <div class="demo-footer"><p>If the embed is unavailable, open the game in a separate window.</p><div><a class="device-button" :href="demoPages.host.url" target="_blank" rel="noopener noreferrer">Open Host <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a><a class="device-button" :href="demoPages.join.url" target="_blank" rel="noopener noreferrer">Open Join <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></div></div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";

const base = import.meta.env.BASE_URL;
const demoPages = {
  host: { label: "HOST", url: "https://mathtactics.onrender.com/host" },
  join: { label: "JOIN", url: "https://mathtactics.onrender.com/join" },
};
const activeDemo = ref("host");
const visited = ref({ host: true, join: false });
const tabButtons = {};

function selectDemo(key) {
  visited.value[key] = true;
  activeDemo.value = key;
}
function handleTabKey(event, key) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const next = event.key === "Home" ? "host" : event.key === "End" ? "join" : key === "host" ? "join" : "host";
  selectDemo(next);
  tabButtons[next]?.focus();
}
</script>

<style scoped>
.math-tactics-page { position: fixed; z-index: 5; inset: 0; overflow-y: auto; overflow-x: hidden; background: #deeeed; color: #254c60; font-family: Arial, Helvetica, sans-serif; letter-spacing: 0; }
.math-tactics-page *, .math-tactics-page *::before, .math-tactics-page *::after { box-sizing: border-box; letter-spacing: 0; }
.console-content { width: min(1520px, calc(100% - 80px)); margin-inline: auto; padding: 30px 0 64px; }
a { color: inherit; text-decoration: none; }
.back-link { display: inline-flex; align-items: center; gap: 10px; font-size: 12px; color: #31565d; transition: opacity 180ms ease; }
.back-link:hover { opacity: .65; }
.project-header { display: flex; align-items: end; justify-content: space-between; gap: 32px; padding: 42px 0 32px; }
.eyebrow { margin: 0 0 10px; color: #638080; font: 11px/1.4 monospace; text-transform: uppercase; }
h1 { margin: 0; font: 500 58px/1.1 Georgia, 'Times New Roman', serif; }
.subtitle { margin: 12px 0 0; font-size: 16px; line-height: 1.5; }
.project-links { display: flex; flex-wrap: wrap; gap: 12px; }
.device-button { display: inline-flex; justify-content: center; align-items: center; gap: 10px; min-height: 48px; padding: 12px 18px; border: 1px solid #b9bfaf; border-radius: 6px; background: #f2eedf; box-shadow: inset 0 1px 0 #fff, 0 4px 0 #b8bfae, 0 7px 12px #31545c14; font: 600 13px/1.4 monospace; transition: transform 180ms ease, box-shadow 180ms ease; }
.play-button { background: #65715a; border-color: #53634d; color: #fffdf3; box-shadow: inset 0 1px 0 #ffffff30, 0 4px 0 #46553e, 0 7px 12px #31545c14; }
.device-button:hover { transform: translateY(-2px); }
.console-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 20px; align-items: stretch; }
.console-module { min-width: 0; padding: 24px; border: 1px solid #d2d0be; border-radius: 8px; background: #eee9d9; box-shadow: inset 1px 1px 0 #fff9, 0 5px 0 #bbc3b4, 0 12px 20px #31545c14; animation: panel-arrive 550ms ease both; transition: transform 200ms ease, box-shadow 200ms ease; }
.console-module:hover { transform: translateY(-3px); box-shadow: inset 1px 1px 0 #fff9, 0 7px 0 #bbc3b4, 0 16px 24px #31545c1c; }
.module-label { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 22px; }
.module-label h2 { margin: 0; font: 600 12px/1.4 monospace; text-transform: uppercase; }
.section-icon { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 20px; width: 20px; height: 20px; color: #7c8874; font-size: 16px; }
.overview .section-icon { color: #a9c38f; }
.overview { grid-column: span 7; background: #204854; border-color: #173a43; color: #edf1e6; box-shadow: inset 0 1px 0 #ffffff30, 0 5px 0 #173741, 0 12px 20px #31545c20; }
.overview:hover { box-shadow: inset 0 1px 0 #ffffff30, 0 7px 0 #173741, 0 16px 24px #31545c28; }
.overview-content { display: grid; grid-template-columns: 132px minmax(0, 1fr); gap: 24px; align-items: start; }
.game-art { display: block; width: 132px; height: 132px; object-fit: contain; border-radius: 3px; }
h3 { margin: 0 0 12px; font: 600 23px/1.25 monospace; }
p { margin: 0; font-size: 14px; line-height: 1.65; }
.overview p { color: #d0dfda; }
.role-summary { padding-top: 20px; margin-top: 24px; border-top: 1px solid #729a9e66; }
.role-summary h3 { margin-bottom: 8px; color: #eee5b9; font: 600 13px/1.5 monospace; }
.role-summary p { font-size: 13px; }
.sextant-icon { fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.learning { grid-column: span 5; background: #d6dfcd; }
.learning > h3 { font-size: 18px; line-height: 1.4; white-space: nowrap; }
@media (min-width: 1101px) and (max-width: 1250px) { .learning > h3 { font-size: 17px; } }
.learning-list { display: grid; gap: 16px; list-style: none; padding: 8px 0 0; margin: 0; }
.learning-list li { display: grid; grid-template-columns: 26px minmax(0, 1fr); gap: 12px; }
.learning-list li > span { font: 12px/1.8 monospace; color: #6b795e; }
h4 { margin: 0 0 4px; font-size: 14px; }
.learning-list p { font-size: 13px; }
.how-it-works { grid-column: span 4; }
.steps { display: grid; gap: 18px; padding: 0; margin: 0; list-style: none; counter-reset: step; }
.steps li { position: relative; padding-left: 34px; counter-increment: step; }
.steps li::before { content: counter(step); position: absolute; left: 0; top: 0; color: #947854; font: 20px/1.2 monospace; }
.steps strong { display: block; margin-bottom: 5px; font-size: 14px; }
.steps span { display: block; font-size: 13px; line-height: 1.6; }
.mechanics { grid-column: span 5; background: #e3e7da; }
.mechanics-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; }
.mechanics h3 { font: 600 14px/1.4 Arial, Helvetica, sans-serif; margin-bottom: 7px; }
.mechanics p { font-size: 13px; }
.technology { grid-column: span 3; display: flex; flex-direction: column; background: #d9d1bc; }
.technology-list { display: grid; gap: 16px; margin: 0 0 30px; padding: 0; list-style: none; font: 15px/1.4 monospace; }
.technology-list i { width: 22px; margin-right: 8px; color: #57674c; }
.vent { width: 100%; height: 22px; margin-top: auto; background: repeating-linear-gradient(90deg, #9b9f8b 0 3px, transparent 3px 9px); border-radius: 3px; opacity: .5; }
.demo-console { margin-top: 32px; padding: 24px; border: 2px solid #d2d0be; border-radius: 8px; background: #eee9d9; box-shadow: inset 2px 2px 0 #fff9, 0 7px 0 #bbc3b4, 0 18px 30px #31545c20; }
.demo-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-bottom: 20px; }
.demo-toolbar .eyebrow { margin-bottom: 5px; }
.demo-toolbar h2 { margin: 0; font: 600 24px/1.2 monospace; }
.demo-toolbar h2 .section-icon { margin-right: 6px; vertical-align: middle; }
.demo-tabs { display: flex; padding: 4px; gap: 4px; border: 1px solid #afb9aa; border-radius: 6px; background: #cbd2c3; }
.demo-tabs button { min-width: 92px; padding: 12px 20px; border: 1px solid transparent; border-radius: 3px; background: transparent; color: #52695e; font: 600 13px/1.2 monospace; cursor: pointer; }
.demo-tabs button[aria-selected='true'] { border-color: #1b3c46; background: #204854; color: #f4f0dd; box-shadow: inset 0 1px 0 #ffffff22, 0 2px 3px #31545c22; }
.demo-bezel { padding: 10px; border: 1px solid #aab7a9; border-radius: 8px; background: #b9c5ba; box-shadow: inset 2px 2px 6px #566c6840; }
.demo-panel { height: max(640px, 76svh); overflow: hidden; border-radius: 4px; background: #204854; }
.demo-panel iframe { display: block; width: 100%; height: 100%; border: 0; background: #fff; }
.demo-footer { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 14px; margin-top: 18px; }
.demo-footer p { font-size: 12px; color: #61756c; }
.demo-footer > div { display: flex; flex-wrap: wrap; gap: 12px; }
a:focus-visible, button:focus-visible { outline: 3px solid #38859a; outline-offset: 4px; }
@keyframes panel-arrive { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 1100px) { .console-content { width: calc(100% - 48px); } .project-header { align-items: start; flex-direction: column; gap: 24px; } .overview, .learning { grid-column: span 6; } .overview-content { grid-template-columns: minmax(0, 1fr); gap: 18px; } .game-art { width: 100px; height: 100px; } .how-it-works, .mechanics { grid-column: span 6; } .technology { grid-column: 1 / -1; } .technology-list { display: flex; flex-wrap: wrap; gap: 24px; margin-bottom: 24px; } }
@media (max-width: 1100px) { .learning > h3 { font-size: 20px; white-space: normal; } }
@media (max-width: 680px) { .console-content { width: calc(100% - 32px); padding-top: 24px; } .project-header { padding: 32px 0 24px; } h1 { font-size: 42px; } .subtitle { font-size: 15px; } .project-links { width: 100%; } .device-button { flex: 1 1 200px; } .console-grid { grid-template-columns: minmax(0, 1fr); gap: 18px; } .console-module { grid-column: 1; padding: 20px; } .overview-content { grid-template-columns: minmax(0, 1fr); } .mechanics-grid { gap: 20px 16px; } .demo-console { padding: 14px; margin-top: 24px; } .demo-toolbar { align-items: start; flex-direction: column; gap: 16px; } .demo-tabs { width: 100%; } .demo-tabs button { flex: 1; min-width: 0; } .demo-bezel { padding: 5px; } .demo-panel { height: max(640px, 80svh); } .demo-footer { align-items: start; } }
@media (prefers-reduced-motion: reduce) { .console-module { animation: none; } .console-module, .device-button, .back-link { transition: none; } .console-module:hover, .device-button:hover { transform: none; } }
</style>
