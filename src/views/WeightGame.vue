<template>
  <section class="unity-page">
    <div class="unity-hero">
      <p class="eyebrow">Game Design Project</p>
      <h1>Weight Game</h1>
      <p class="subtitle">Unity 3D</p>

      <div class="hero-tools" aria-label="Tools">
        <span>Unity 3D</span>
        <span>C#</span>
        <span>First-person Controller</span>
        <span>Physics-based Interaction</span>
      </div>

      <div class="vignette-links">
        <a
          href="https://hochi0427.itch.io/weightgame"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-solid fa-gamepad" />
          Play on itch.io
        </a>
        <a
          class="github-link"
          href="https://github.com/hochi0427/WeightGame"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Weight Game on GitHub"
        >
          <i class="fa-brands fa-github" />
        </a>
      </div>
    </div>

    <div class="unity-section">
      <h2>Overview</h2>
      <p>
        Weight Game is a 3D Unity prototype built around object interaction,
        environmental feedback, and simple puzzle logic. The player navigates a
        first-person space and solves challenges by picking up, moving, and
        placing objects on weight-sensitive platforms. The project focuses on
        how physical interaction can support clear problem solving and spatial
        understanding in a compact game environment.
      </p>
    </div>

    <div class="unity-section">
      <h2>Core Features</h2>
      <ul>
        <li>Weight-triggered puzzle mechanics</li>
        <li>Object pickup and placement interaction</li>
        <li>Environmental response to player actions</li>
        <li>Simple first-person exploration and navigation</li>
        <li>Rule-based puzzle progression</li>
      </ul>
    </div>

    <div class="unity-section">
      <h2>Design Intention</h2>
      <p>
        I designed this project to explore how physical rules can become the
        basis of puzzle interaction. Instead of relying on abstract menus or
        symbolic inputs, the player learns by observing how the environment
        reacts to movement, weight, and placement. I wanted the puzzles to feel
        intuitive, readable, and grounded in direct manipulation.
      </p>
    </div>

    <div class="unity-section">
      <h2>What I Learned</h2>
      <p>
        This project gave me more experience with first-person interaction,
        Unity physics systems, trigger logic, and environmental feedback. It
        also helped me think about how to communicate puzzle rules through
        layout and player experimentation rather than text-heavy instruction.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "WeightGame",
};
</script>

<style scoped>
.unity-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px 80px;
  line-height: 1.8;
  color: #6a3e37;
}

.unity-hero {
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

.unity-section {
  margin-top: 40px;
  padding: 28px;
  border-radius: 8px;
  background: rgba(234, 215, 196, 0.35);
}

@media (max-width: 720px) {
  .unity-hero,
  .unity-section {
    padding: 22px;
  }
}
</style>
