<template>
  <section class="vignette-page">
    <div class="vignette-hero">
      <p class="eyebrow">Game Design Project</p>
      <h1>Deadline Simulator</h1>
      <p class="subtitle">Vignette Game</p>

      <div class="hero-tools" aria-label="Tools">
        <span>Vue 3</span>
        <span>Phaser</span>
        <span>JavaScript</span>
        <span>Vite</span>
      </div>

      <div class="vignette-links">
        <a
          href="https://hochi0427.github.io/deadline-vignette/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-solid fa-gamepad" />
          Play
        </a>
        <a
          class="github-link"
          href="https://github.com/hochi0427/deadline-vignette"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Vignette on GitHub"
        >
          <i class="fa-brands fa-github" />
        </a>
      </div>
    </div>

    <div class="vignette-section">
      <h2>Overview</h2>
      <p>
        Vignette is a browser-based typing game built with Vue 3 and Phaser.
        The game is designed to capture the experience of rushing to finish work
        late at night, where time pressure, mental fatigue, and sensory
        distraction gradually affect performance. Rather than focusing only on
        typing speed, the project explores how interactive systems can
        communicate stress and attention loss through mechanics, pacing, and
        visual feedback.
      </p>
    </div>

    <div class="vignette-section">
      <h2>Core Features</h2>
      <ul>
        <li>Time-pressure typing challenge</li>
        <li>Bonus sentence mechanic</li>
        <li>Escalating sensory feedback</li>
        <li>Expressive game feel</li>
      </ul>
    </div>

    <div class="vignette-section">
      <h2>Design Intention</h2>
      <p>
        I created Vignette as an experiment in translating a familiar real-life
        situation into a short interactive experience. Rather than building a
        conventional typing game, I wanted to explore how mechanics and feedback
        could express mental state. The project focuses on how stress, urgency,
        and loss of concentration can be conveyed through interaction design,
        and how a simple system can create a more emotionally specific player
        experience.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Vignette",
};
</script>

<style scoped>
.vignette-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px 80px;
  line-height: 1.8;
}

.vignette-hero {
  padding: 36px;
  margin-bottom: 48px;
  border-radius: 8px;
  background: rgb(234, 215, 196, 0.6);
}

.eyebrow {
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.7;
}

.subtitle {
  max-width: 720px;
  font-size: 18px;
}

.hero-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.hero-tools span {
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.55);
  color: #6a3e37;
  font-size: 14px;
  font-weight: 700;
}

.vignette-links {
  display: flex;
  gap: 16px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.vignette-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid rgb(106, 62, 55, 0.35);
  background: white;
  color: #6a3e37;
}

.vignette-links .github-link {
  width: auto;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 26px;
}

.vignette-section {
  margin-top: 40px;
  padding: 28px;
  border-radius: 8px;
  background: rgba(234, 215, 196, 0.35);
}

@media (max-width: 720px) {
  .vignette-hero,
  .vignette-section {
    padding: 22px;
  }
}
</style>
