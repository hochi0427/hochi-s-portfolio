<template>
  <main class="education-page">
    <div class="education-ocean" aria-hidden="true">
      <img class="education-decoration education-decoration--cloud" :src="ocean.cloud" alt="" />
      <img class="education-decoration education-decoration--wave" :src="ocean.waveOne" alt="" />
      <img class="education-decoration education-decoration--island" :src="ocean.smallIsland" alt="" />
      <img class="education-decoration education-decoration--wave-distant" :src="ocean.waveTwo" alt="" />
    </div>
    <RouterLink class="education-back" :to="{ name: 'Home' }">
      <span aria-hidden="true">←</span> Back to World Map
    </RouterLink>

    <div class="education-content">
      <header class="education-header">
        <p class="education-kicker">A short academic journey</p>
        <h1>Education</h1>
        <p class="education-intro">A brief look at my academic journey.</p>
      </header>

      <div class="education-columns">
        <section class="education-entry education-entry--graduate" aria-labelledby="graduate-title">
          <p class="education-entry__category"><span>01</span> Graduate</p>
          <h2 id="graduate-title">Games for Learning</h2>
          <p class="education-entry__degree">Master of Science</p>
          <div class="education-entry__institution">
            <p>New York University</p>
            <p class="education-entry__date">Sep 2025 – Present</p>
          </div>
          <p class="education-entry__description">
            Focused on game design, educational technology, game-based learning, and the design of interactive learning experiences.
          </p>
        </section>

        <section class="education-entry education-entry--undergraduate" aria-labelledby="undergraduate-title">
          <p class="education-entry__category"><span>02</span> Undergraduate</p>
          <h2 id="undergraduate-title">Information Management</h2>
          <p class="education-entry__degree">Bachelor of Business Administration</p>
          <div class="education-entry__institution">
            <p>Fu Jen Catholic University</p>
            <p class="education-entry__date">Sep 2018 – Jun 2022</p>
          </div>
          <h3 class="education-recognition-heading">
            <i class="fa-solid fa-award" aria-hidden="true" />
            <span>Selected Recognition</span>
          </h3>
          <ul class="education-recognition">
            <li>
              <span class="education-recognition__number">01</span>
              <span class="education-recognition__copy">
                <strong>First Place</strong>
                <span>Information System Project</span>
              </span>
            </li>
            <li>
              <span class="education-recognition__number">02</span>
              <span class="education-recognition__copy">
                <strong>Third Place</strong>
                <span>Web Programming Competition</span>
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <HochiGuide :messages="educationStory" />
  </main>
</template>

<script>
import HochiGuide from "../components/common/HochiGuide.vue";
import { createWorldAssets } from "../data/world.js";

export default {
  name: "Education",
  components: { HochiGuide },
  data() {
    return {
      ocean: createWorldAssets(import.meta.env.BASE_URL).ocean,
      educationStory: [
        "Hi, I'm Hochi! My journey started in software engineering, where I discovered my passion for building things with technology.",
        "Along the way, I fell in love with games! I became fascinated by how games could spark curiosity, connect people, and create meaningful experiences.",
        "That's what brought me to NYU's Games for Learning program. Now, I'm exploring how to combine technology, creativity, and learning to design games that truly matter!",
      ],
    };
  },
};
</script>

<style scoped>
.education-page {
  position: fixed;
  z-index: 5;
  inset: 0;
  min-height: 100svh;
  overflow-y: auto;
  isolation: isolate;
  background:
    radial-gradient(ellipse at 49% 44%, rgba(255, 255, 255, 0.48), transparent 55%),
    linear-gradient(145deg, #dcecea 0%, #d0e4e3 48%, #c6dedd 100%);
  color: #31565d;
}

.education-ocean { position: fixed; z-index: -1; inset: 0; overflow: hidden; pointer-events: none; }
.education-decoration { position: absolute; display: block; height: auto; pointer-events: none; user-select: none; }
.education-decoration--cloud { top: 24px; right: 26px; width: 130px; opacity: 0.4; }
.education-decoration--wave { bottom: 26px; left: 20px; width: 120px; opacity: 0.22; }
.education-decoration--island { top: 40%; right: 18px; width: 55px; opacity: 0.25; }
.education-decoration--wave-distant { bottom: 18px; right: 390px; width: 85px; opacity: 0.14; }

.education-back {
  position: absolute;
  top: clamp(1.25rem, 4vh, 2.75rem);
  left: clamp(1.25rem, 5vw, 5rem);
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: #31565d;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: opacity 180ms ease;
}

.education-back:hover {
  opacity: 0.65;
}

.education-back span {
  font-size: 1rem;
}

.education-content {
  position: relative;
  width: min(calc(100% - 4rem), 1100px);
  margin-inline: auto;
  padding: clamp(6rem, 15vh, 8.5rem) 0 3.5rem;
  text-align: left;
}

@media (max-width: 1100px) {
  .education-decoration--island { display: none; }
  .education-decoration--wave-distant { display: none; }
}

.education-header {
  margin-bottom: clamp(2rem, 5vh, 3rem);
}

.education-kicker,
.education-entry__category {
  margin: 0;
  color: #608087;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.17em;
  text-transform: uppercase;
}

.education-header h1 {
  margin: 0.65rem 0 0.35rem;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 500;
  line-height: 1.1;
  text-transform: uppercase;
}

.education-intro {
  margin: 0;
  color: #5d7c83;
  font-size: 0.95rem;
  line-height: 1.5;
}

.education-columns {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(2rem, 5vw, 4rem);
}

.education-columns::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: rgba(49, 86, 93, 0.2);
}

.education-entry {
  min-width: 0;
}

.education-entry--graduate,
.education-entry--undergraduate {
  padding: 0;
}

.education-entry__category span {
  margin-right: 0.6rem;
  color: #83a1a6;
  font-variant-numeric: tabular-nums;
}

.education-entry h2 {
  margin: 1.35rem 0 0.6rem;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.8rem, 3.1vw, 2.5rem);
  font-weight: 500;
  line-height: 1.12;
  text-wrap: balance;
}

.education-entry__degree {
  margin: 0;
  color: #4d7078;
  font-size: 0.94rem;
  font-weight: 500;
  line-height: 1.45;
}

.education-entry__institution {
  margin-top: 1.2rem;
  color: #4d7078;
  font-size: 0.86rem;
  line-height: 1.4;
}

.education-entry__institution > p:first-child {
  margin: 0;
}

.education-entry__date {
  margin: 0.25rem 0 1.25rem;
  color: #6c8c93;
  font-size: 0.8rem;
  letter-spacing: 0.025em;
}

.education-entry__description {
  max-width: 27rem;
  margin: 0;
  color: #4d7078;
  font-size: 0.9rem;
  line-height: 1.7;
}

.education-entry h3 {
  margin: 1.35rem 0 0.8rem;
  color: #608087;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.education-recognition-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.education-recognition-heading i {
  color: #52818b;
  font-size: 0.82rem;
  letter-spacing: 0;
}

.education-recognition {
  display: grid;
  gap: 0.7rem;
  margin: 0;
  padding: 0;
  color: #4d7078;
  font-size: 0.8rem;
  line-height: 1.55;
  list-style: none;
}

.education-recognition li {
  display: grid;
  grid-template-columns: 1.55rem minmax(0, 1fr);
  gap: 0.55rem;
}

.education-recognition__number {
  padding-top: 0.08rem;
  color: #83a1a6;
  font-size: 0.68rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
}

.education-recognition__copy {
  display: grid;
  gap: 0.05rem;
}

.education-recognition__copy strong {
  color: #31565d;
  font-size: 0.82rem;
  font-weight: 500;
}

@media (max-width: 680px) {
  .education-content {
    width: min(calc(100% - 2.5rem), 480px);
    padding-top: 6.5rem;
    padding-bottom: 230px;
  }

  .education-header {
    margin-bottom: 2rem;
  }

  .education-columns {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }

  .education-columns::before {
    display: none;
  }

  .education-entry--graduate,
  .education-entry--undergraduate {
    padding: 0;
  }
  .education-decoration--cloud { top: 20px; right: 12px; width: 70px; opacity: 0.25; }
  .education-decoration--wave { left: 8px; bottom: 12px; width: 70px; opacity: 0.12; }
  .education-decoration--island { display: none; }

  .education-entry--undergraduate {
    padding-top: 1.75rem;
    border-top: 1px solid rgba(49, 86, 93, 0.2);
    border-left: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .education-back {
    transition-duration: 0.01ms;
  }
}
</style>
