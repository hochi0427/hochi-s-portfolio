<template>
  <main class="hunting-rabbit-page">
    <div class="console-content">
      <RouterLink class="back-link" :to="{ name: 'GamePlay' }"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to Game &amp; Play</RouterLink>

      <header class="project-header">
        <div>
          <h1>Hunting Rabbit</h1>
          <p class="subtitle">Two players. Different roles. A shared competition.</p>
        </div>
        <div class="project-links">
          <a class="device-button" href="https://github.com/hochi0427/SnakeVSBunny" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github" aria-hidden="true"></i> Code on GitHub <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
        </div>
      </header>

      <div class="console-grid">
        <section class="console-module overview" aria-labelledby="overview-title">
          <div class="module-label"><h2 id="overview-title">Game Overview</h2><i class="fa-solid fa-map section-icon" aria-hidden="true"></i></div>
          <h3>One game. Two ways to play.</h3>
          <p>An asymmetric two-player Unity 2D game featuring a snake and a rabbit. Different movement styles, scoring values, and danger conditions give each player a distinct strategy.</p>
          <p class="design-note">A twist on traditional Snake gameplay: competition built around role differences, rather than mirrored abilities.</p>
        </section>

        <section class="console-module preview-module" aria-labelledby="preview-title">
          <div class="module-label"><h2 id="preview-title">Game Preview</h2><i class="fa-solid fa-sailboat section-icon" aria-hidden="true"></i></div>
          <figure>
            <div class="preview-bezel">
              <div ref="gamePlayer" class="game-player">
                <div ref="gameViewport" class="game-viewport">
                  <iframe v-if="gameScale > 0" class="game-frame" :style="{ transform: `scale(${gameScale}) translate(-1px, -1px)` }" :height="gameFrameHeight" width="962" src="https://itch.io/embed-upload/16667294?color=204854" title="Play Hunting Rabbit: Bunny WASD, Snake arrow keys, Space to start" tabindex="0" allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>
                </div>
              </div>
            </div>
            <figcaption>
              <div class="game-control-guide" aria-label="Game controls"><span>Bunny: <kbd>WASD</kbd></span><span>Snake: <kbd>Arrow Keys</kbd></span><span>Start: <kbd>Space</kbd></span></div>
              <div class="player-actions"><button type="button" aria-label="Enter game fullscreen" title="Fullscreen" @click="enterFullscreen"><i class="fa-solid fa-expand" aria-hidden="true"></i></button></div>
              <p v-if="fullscreenError" class="fullscreen-error" role="status">Fullscreen is unavailable in this browser.</p>
            </figcaption>
          </figure>
        </section>

        <section class="console-module gameplay" aria-labelledby="gameplay-title">
          <div class="module-label"><h2 id="gameplay-title">Gameplay</h2><i class="fa-solid fa-compass section-icon" aria-hidden="true"></i></div>
          <div class="player-role">
            <div class="role-heading"><h3>The Rabbit</h3><span class="controls" aria-label="Rabbit controls: W A S D"><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span></div>
            <p>Earn high-value rewards while facing greater survival risk. Careful movement balances reward with staying alive.</p>
          </div>
          <div class="player-role">
            <div class="role-heading"><h3>The Snake</h3><span class="controls" aria-label="Snake controls: arrow keys"><kbd><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></kbd><kbd><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></kbd><kbd><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></kbd><kbd><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></kbd></span></div>
            <p>Grow over time and become more threatening as the round continues. Movement and positioning shape the pressure on the rabbit.</p>
          </div>
        </section>

        <section class="console-module mechanics" aria-labelledby="mechanics-title">
          <div class="module-label"><h2 id="mechanics-title">Game Mechanics</h2><i class="fa-solid fa-binoculars section-icon" aria-hidden="true"></i></div>
          <div class="mechanics-grid">
            <div><h3>Asymmetric gameplay</h3><p>Distinct roles and scoring values create different relationships to risk and reward.</p></div>
            <div><h3>Player movement</h3><p>Separate controls and movement styles let both players compete in the same game.</p></div>
            <div><h3>Snake growth</h3><p>The snake grows as play continues, changing the pace and danger of the match.</p></div>
            <div><h3>Collision &amp; interaction</h3><p>Collision-based win and lose conditions turn positioning into competitive decisions.</p></div>
          </div>
        </section>

        <section class="console-module technology" aria-labelledby="technology-title">
          <div class="module-label"><h2 id="technology-title">Technology</h2><svg class="section-icon sextant-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 3v17a17 17 0 0 0 14.7-8.5L6 3Zm0 13a13 13 0 0 0 11.2-6.5M3 9h18M3 7v4M21 7v4M10 15l1.5 2.6M14 12l2.6 1.5" /><circle cx="6" cy="3" r="1.5" /></svg></div>
          <ul class="technology-list"><li><i class="fa-brands fa-unity" aria-hidden="true"></i> Unity</li><li><span class="code-symbol" aria-hidden="true">C#</span> C#</li><li><i class="fa-solid fa-layer-group" aria-hidden="true"></i> 2D Game Development</li><li><i class="fa-solid fa-film" aria-hidden="true"></i> 2D Animation</li></ul>
          <div class="vent" aria-hidden="true"></div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const gamePlayer = ref(null);
const gameViewport = ref(null);
const gameScale = ref(0);
const gameFrameHeight = ref(663);
const fullscreenError = ref(false);
let playerObserver;

onMounted(() => {
  // itch.io's supported wrapper adds 21px; Unity adds 42px on desktop.
  // Only the full 960 x 600 canvas is visible inside our clipped viewport.
  gameFrameHeight.value = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 621 : 663;
  playerObserver = new ResizeObserver(() => {
    gameScale.value = gameViewport.value.clientWidth / 960;
  });
  playerObserver.observe(gameViewport.value);
});
onBeforeUnmount(() => playerObserver?.disconnect());

async function enterFullscreen() {
  fullscreenError.value = false;
  try {
    await gamePlayer.value.requestFullscreen();
    gameViewport.value.querySelector('iframe')?.focus();
  } catch {
    fullscreenError.value = true;
  }
}
</script>

<style scoped>
.hunting-rabbit-page { position: fixed; z-index: 5; inset: 0; overflow-y: auto; overflow-x: hidden; background: #deeeed; color: #254c60; font-family: Arial, Helvetica, sans-serif; letter-spacing: 0; }
.hunting-rabbit-page *, .hunting-rabbit-page *::before, .hunting-rabbit-page *::after { box-sizing: border-box; letter-spacing: 0; }
.console-content { width: min(1520px, calc(100% - 80px)); margin-inline: auto; padding: 30px 0 64px; }
a { color: inherit; text-decoration: none; }
.back-link { display: inline-flex; align-items: center; gap: 10px; font-size: 12px; color: #31565d; transition: opacity 180ms ease; }
.back-link:hover { opacity: .65; }
.project-header { display: flex; align-items: end; justify-content: space-between; gap: 32px; padding: 42px 0 32px; }
h1 { margin: 0; font: 500 58px/1.1 Georgia, 'Times New Roman', serif; }
.subtitle { margin: 12px 0 0; font-size: 16px; line-height: 1.5; }
.project-links { display: flex; flex-wrap: wrap; gap: 12px; }
.device-button { display: inline-flex; justify-content: center; align-items: center; gap: 10px; min-height: 48px; padding: 12px 18px; border: 1px solid #b9bfaf; border-radius: 6px; background: #f2eedf; box-shadow: inset 0 1px 0 #fff, 0 4px 0 #b8bfae, 0 7px 12px #31545c14; font: 600 13px/1.4 monospace; transition: transform 180ms ease, box-shadow 180ms ease; }
.device-button:hover { transform: translateY(-2px); }
.console-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 20px; align-items: stretch; }
.console-module { min-width: 0; padding: 24px; border: 1px solid #d2d0be; border-radius: 8px; background: #eee9d9; box-shadow: inset 1px 1px 0 #fff9, 0 5px 0 #bbc3b4, 0 12px 20px #31545c14; animation: panel-arrive 550ms ease both; transition: transform 200ms ease, box-shadow 200ms ease; }
.console-module:hover { transform: translateY(-3px); box-shadow: inset 1px 1px 0 #fff9, 0 7px 0 #bbc3b4, 0 16px 24px #31545c1c; }
.module-label { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 22px; }
.module-label h2 { margin: 0; font: 600 12px/1.4 monospace; text-transform: uppercase; }
.section-icon { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 20px; width: 20px; height: 20px; color: #7c8874; font-size: 16px; }
.sextant-icon { fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
h3 { margin: 0 0 12px; font: 600 23px/1.25 monospace; }
p { margin: 0; font-size: 14px; line-height: 1.65; }
.overview { grid-column: 1 / span 5; grid-row: 1; background: #204854; border-color: #173a43; color: #edf1e6; box-shadow: inset 0 1px 0 #ffffff30, 0 5px 0 #173741, 0 12px 20px #31545c20; }
.overview:hover { box-shadow: inset 0 1px 0 #ffffff30, 0 7px 0 #173741, 0 16px 24px #31545c28; }
.overview .section-icon { color: #a9c38f; }
.overview p { color: #d0dfda; }
.overview .design-note { margin-top: 18px; padding-top: 18px; border-top: 1px solid #729a9e66; color: #b5ceca; font-size: 13px; }
.preview-module { grid-column: 6 / -1; grid-row: 1 / 3; display: flex; flex-direction: column; }
figure { display: flex; flex-direction: column; flex: 1; margin: 0; min-width: 0; }
.preview-bezel { display: grid; place-items: center; flex: 1; padding: 10px; min-height: 0; border: 1px solid #aab7a9; border-radius: 8px; background: #b9c5ba; box-shadow: inset 2px 2px 6px #566c6840; }
.game-player { width: 100%; background: #204854; border-radius: 4px; overflow: hidden; }
.game-viewport { position: relative; width: 100%; aspect-ratio: 960 / 600; overflow: hidden; }
.game-frame { position: absolute; top: 0; left: 0; display: block; width: 962px; max-width: none; border: 0; transform-origin: top left; background: #204854; }
.game-player:fullscreen { display: grid; place-items: center; width: 100%; height: 100%; border-radius: 0; background: #102d35; }
.game-player:fullscreen .game-viewport { width: min(100vw, 160dvh); }
figcaption { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding-top: 16px; color: #61756c; font: 11px/1.5 monospace; }
.game-control-guide { display: flex; flex-wrap: wrap; gap: 8px 14px; }
.game-control-guide > span { display: inline-flex; align-items: center; gap: 5px; }
.game-control-guide kbd { width: auto; min-width: 23px; padding-inline: 5px; }
.player-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-left: auto; }
.player-actions button { display: grid; place-items: center; width: 32px; height: 32px; padding: 0; border: 1px solid #a7b39d; border-radius: 4px; background: #edf0e4; color: #52644e; cursor: pointer; }
.fullscreen-error { flex-basis: 100%; font-size: 12px; }
.gameplay { grid-column: 1 / span 5; grid-row: 2; background: #d6dfcd; }
.player-role + .player-role { margin-top: 20px; padding-top: 20px; border-top: 1px solid #aebda4; }
.role-heading { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
.role-heading h3 { font-size: 18px; margin: 0; }
.player-role p { font-size: 13px; }
.controls { display: inline-flex; gap: 4px; }
kbd { display: inline-grid; place-items: center; width: 23px; height: 24px; border: 1px solid #a7b39d; border-radius: 3px; color: #52644e; background: #edf0e4; box-shadow: 0 2px 0 #b2bca7; font: 11px/1 monospace; }
kbd i { font-size: 10px; }
.mechanics { grid-column: 1 / span 8; background: #e3e7da; }
.mechanics-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; }
.mechanics h3 { margin-bottom: 7px; font: 600 14px/1.4 Arial, Helvetica, sans-serif; }
.mechanics p { font-size: 13px; }
.technology { grid-column: 9 / -1; display: flex; flex-direction: column; background: #d9d1bc; }
.technology-list { display: grid; gap: 16px; margin: 0 0 30px; padding: 0; list-style: none; font: 15px/1.4 monospace; }
.technology-list li { display: flex; align-items: baseline; gap: 10px; }
.technology-list i, .code-symbol { flex: 0 0 22px; width: 22px; color: #57674c; }
.code-symbol { font-size: 12px; font-weight: 600; }
.vent { width: 100%; height: 22px; margin-top: auto; border-radius: 3px; opacity: .5; background: repeating-linear-gradient(90deg, #9b9f8b 0 3px, transparent 3px 9px); }
a:focus-visible, button:focus-visible, .game-frame:focus-visible { outline: 3px solid #38859a; outline-offset: 4px; }
@keyframes panel-arrive { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 1100px) { .console-content { width: calc(100% - 48px); } .project-header { flex-direction: column; align-items: start; gap: 24px; } .overview, .gameplay { grid-column: 1 / span 6; } .preview-module { grid-column: 7 / -1; } .mechanics { grid-column: 1 / span 7; } .technology { grid-column: 8 / -1; } }
@media (max-width: 680px) { .console-content { width: calc(100% - 32px); padding-top: 24px; } .project-header { padding: 32px 0 24px; } h1 { font-size: 42px; } .subtitle { font-size: 15px; } .project-links { width: 100%; } .device-button { flex: 1 1 180px; } .console-grid { grid-template-columns: minmax(0, 1fr); gap: 18px; } .console-module { grid-column: 1; grid-row: auto; padding: 20px; } .preview-bezel { padding: 5px; } .mechanics-grid { gap: 20px 16px; } }
@media (max-width: 380px) { h1 { font-size: 36px; } .mechanics-grid { grid-template-columns: minmax(0, 1fr); } }
@media (prefers-reduced-motion: reduce) { .console-module { animation: none; } .console-module, .device-button, .back-link { transition: none; } .console-module:hover, .device-button:hover { transform: none; } }
</style>
