<template>
  <section class="unity-page">
    <div class="unity-hero">
      <p class="eyebrow">Game Design Project</p>
      <h1>Hunting Rabbit</h1>
      <p class="subtitle">Unity 2D</p>

      <div class="hero-tools" aria-label="Tools">
        <span>Unity 2D</span>
        <span>C#</span>
        <span>2D Animation</span>
        <span>Game Mod</span>
      </div>

      <div class="vignette-links">
        <a
          href="https://hochi0427.itch.io/snakebunny"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-solid fa-gamepad" />
          Play on itch.io
        </a>
        <a
          class="github-link"
          href="https://github.com/hochi0427/SnakeVSBunny"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Game Mod on GitHub"
        >
          <i class="fa-brands fa-github" />
        </a>
      </div>
    </div>

    <div class="unity-section">
      <h2>Overview</h2>
      <p>
        This project is a two-player Unity game built around an asymmetric
        competition between a snake and a rabbit. Instead of giving both players
        the same role, the game explores how different movement styles, point
        values, and danger conditions create different strategies and player
        experiences. The rabbit earns high-value rewards but faces higher
        survival risk, while the snake grows over time and becomes more
        threatening as the round continues.
      </p>
    </div>

    <div class="unity-section">
      <h2>Core Features</h2>
      <ul>
        <li>Asymmetric two-player competition</li>
        <li>Different scoring values for snake and rabbit</li>
        <li>Growth mechanic for the snake</li>
        <li>Collision-based win and lose conditions</li>
        <li>Simple competitive party-game structure</li>
      </ul>
    </div>

    <div class="unity-section">
      <h2>Design Intention</h2>
      <p>
        The goal of this project was to explore competitive interaction by modifying the traditional Snake gameplay through role differences instead of mirrored gameplay. I wanted each player to have a distinct play style and a different relationship to risk, reward, and movement. This created a more playful tension, since the rabbit needed to move carefully to survive, while the snake could gradually become more dangerous as the match continued.
      </p>
    </div>

    <div class="unity-section">
      <h2>What I Learned</h2>
      <p>
        Through this project, I practiced balancing player roles, designing
        readable competitive rules, and implementing gameplay systems in Unity.
        It also helped me think more carefully about how scoring, movement
        constraints, and collision rules can shape the pace of a game.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "GameMod",
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
