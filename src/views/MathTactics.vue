<template>
  <section class="math-tactics-page">
    <div class="math-tactics-hero">
      <p class="eyebrow">Game-Based Learning Project</p>
      <h1>Math Tactics</h1>
      <p class="subtitle">A real-time multiplayer math game that helps upper elementary students build arithmetic fluency and number sense through timed expression-building challenges.</p>

      <div class="hero-tools" aria-label="Tools">
        <span>Vue 3</span>
        <span>JavaScript</span>
        <span>Render</span>
        <span>GitHub</span>
      </div>

      <div class="vignette-links">
        <a
          href="https://mathtactics.onrender.com/host"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-solid fa-gamepad" />
          Play
        </a>
        <a
          class="github-link"
          href="https://github.com/hochi0427/MathTactics"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View MathTactics on GitHub"
        >
          <i class="fa-brands fa-github" />
        </a>
      </div>
    </div>

    <div class="math-tactics-section">
      <h2>Overview</h2>
      <p>
       Math Tactics is a real-time multiplayer mathematics game designed for upper elementary students. In each round, players use four given numbers to create a mathematical expression that gets as close as possible to a target number. The game combines timed problem-solving, progressive difficulty, leaderboard feedback, and classroom-based interaction to support arithmetic fluency and flexible number sense.
      </p>
    </div>

    <div class="math-tactics-section">
      <h2>Learning Goal</h2>
      <p>
        The game is designed around repeated practice, immediate feedback, and progressive challenge. Early rounds focus on addition, subtraction, and multiplication; later rounds introduce division and decimal numbers to gradually increase complexity. This structure helps students practice basic operations while encouraging them to revise strategies across rounds.
      </p>
    </div>

    <div class="math-tactics-section">
      <h2>My Role</h2>
      <ul>
        <li>Game Design</li>
        <li>Learning Experience Design</li>
        <li>Frontend Development</li>
        <li>Multiplayer Interaction Design</li>
        <li>UI/UX Iteration</li>
      </ul>
    </div>

    <div class="math-tactics-section">
      <h2>Core Features</h2>
      <ul>
        <li>Real-time multiplayer classroom play</li>
        <li>Host and player interfaces</li>
        <li>Timed target-number expression challenges</li>
        <li>Progressive difficulty across 10 rounds</li>
        <li>Leaderboard and score feedback</li>
        <li>Tutorial level for onboarding</li>
        <li>Final performance summary with formulas, round scores, and rank</li>
      </ul>
    </div>

    <div class="math-tactics-section">
      <h2>Design Intention</h2>
      <p>
        I designed Math Tactics to make arithmetic practice more interactive, social, and strategic. Instead of solving isolated worksheet problems, students work within a shared game environment where they can test different expressions, respond under time pressure, and compare their strategies through a leaderboard. The goal is to support both calculation fluency and flexible mathematical thinking.
      </p>
    </div>

    <div class="math-tactics-section">
      <h2>What I Learned</h2>
      <p>
        Through this project, I practiced designing a game-based learning system that connects mechanics, motivation, and assessment. I also learned how details such as tutorial flow, scoring rules, leaderboard feedback, and host-player synchronization can directly shape the learning experience.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "MathTactics",
};
</script>

<style scoped>
.math-tactics-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px 80px;
  line-height: 1.8;
  color: #6a3e37;
}

.math-tactics-hero {
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

.math-tactics-section {
  margin-top: 40px;
  padding: 28px;
  border-radius: 8px;
  background: rgba(234, 215, 196, 0.35);
}

@media (max-width: 720px) {
  .math-tactics-hero,
  .math-tactics-section {
    padding: 22px;
  }
}
</style>
