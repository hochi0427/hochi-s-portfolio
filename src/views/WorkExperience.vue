<template>
  <main ref="scrollRoot" class="work-page">
    <div class="work-content">
      <div class="career-intro">
      <img class="harbor-decoration harbor-cloud" :src="worldAssets.ocean.cloud" alt="" aria-hidden="true" />
      <RouterLink class="work-back" :to="{ name: 'Home' }">
        <span aria-hidden="true">←</span> Back to World Map
      </RouterLink>
      <header class="work-header">
        <p class="eyebrow">Work Experience</p>
        <h1>Career Harbor</h1>
        <p>A collection of experiences, systems, and challenges that shaped how I work.</p>
      </header>
      </div>

      <div class="career-journey">
        <aside class="career-timeline" tabindex="0" aria-label="Career timeline, most recent first">
          <p class="timeline-caption">Career journey</p>
          <ol tabindex="0" aria-label="Professional chapters, most recent first">
            <li
              v-for="chapter in chapters"
              :key="chapter.id"
              :class="{ 'is-current': activeChapter === chapter.id }"
              :aria-current="activeChapter === chapter.id ? 'step' : undefined"
            >
              <span class="timeline-marker" aria-hidden="true">
                <img class="timeline-island" :src="chapter.island" alt="" />
                <img v-if="activeChapter === chapter.id" class="timeline-boat" :src="worldAssets.boatImage" alt="" />
              </span>
              <span class="timeline-year">{{ chapter.years }}</span>
              <span class="timeline-company">{{ chapter.company }}</span>
            </li>
          </ol>
        </aside>

        <div class="career-chapters">
          <section ref="auriga" data-chapter="auriga" class="experience experience--auriga" aria-labelledby="auriga-title">
            <img class="harbor-decoration harbor-cloud harbor-cloud--distant" :src="worldAssets.ocean.cloud" alt="" aria-hidden="true" />
            <img class="harbor-decoration harbor-wave" :src="worldAssets.ocean.waveTwo" alt="" aria-hidden="true" />
            <header class="experience-header">
              <div class="experience-heading">
                <h2 id="auriga-title">Auriga Interactive Studios</h2>
                <p class="work-location">NY, United States</p>
              </div>
            </header>

            <div class="auriga-grid">
              <div class="primary-column">
                <section class="work-card role-card role-card--auriga" aria-labelledby="auriga-role">
                  <i class="fa-solid fa-briefcase role-icon" aria-hidden="true"></i>
                  <div>
                    <p class="eyebrow">Role</p>
                    <h3 id="auriga-role">Learning Design Intern</h3>
                    <p class="work-department">Auriga Interactive Studios</p>
                  </div>
                </section>

                <section class="work-card primary-card" aria-labelledby="auriga-work-title">
                  <h3 id="auriga-work-title" class="card-title">
                    <i class="fa-solid fa-table-cells-large" aria-hidden="true"></i>
                    What I Worked On
                  </h3>
                  <div class="bom-focus">
                    <h4>Driving Simulator Lesson Design</h4>
                    <p>
                      Designed structured driving lessons for autistic
                      learners, translating learning objectives and user
                      needs into actionable simulator specifications.
                    </p>
                  </div>
                  <section class="auriga-skills" aria-labelledby="auriga-skills-title">
                    <h4 id="auriga-skills-title" class="card-title">
                      <i class="fa-solid fa-compass-drafting" aria-hidden="true"></i>
                      Design Approaches &amp; Skills
                    </h4>
                    <ul>
                      <li v-for="skill in aurigaSkills" :key="skill.name" class="tool-chip">
                        <i :class="skill.icon" aria-hidden="true"></i>
                        <span>{{ skill.name }}</span>
                      </li>
                    </ul>
                  </section>
                </section>
              </div>

              <div class="secondary-column">
                <section class="work-card secondary-card" aria-labelledby="auriga-contributions-title">
                  <h3 id="auriga-contributions-title" class="card-title">
                    <i class="fa-solid fa-list-check" aria-hidden="true"></i>
                    Additional Contributions
                  </h3>
                  <section v-for="group in aurigaContributions" :key="group.id" class="-groupcontribution" :aria-labelledby="group.id">
                    <h4 :id="group.id">{{ group.title }}</h4>
                    <ul class="contribution-list">
                      <li v-for="contribution in group.items" :key="contribution">
                        {{ contribution }}
                      </li>
                    </ul>
                  </section>
                </section>

              </div>
            </div>
          </section>

          <section ref="fuChen" data-chapter="fu-chen" class="experience" aria-labelledby="fu-chen-title">
            <img class="harbor-decoration harbor-wave" :src="worldAssets.ocean.waveOne" alt="" aria-hidden="true" />
            <header class="experience-header">
              <div class="experience-heading">
                <h2 id="fu-chen-title">Fu Chen Industrial Co., Ltd.</h2>
                <p class="work-location">New Taipei City, Taiwan</p>
              </div>
            </header>

            <div class="fu-chen-grid">
              <div class="primary-column">
                <section class="work-card role-card role-card--fu-chen" aria-labelledby="fu-chen-role">
                  <i class="fa-solid fa-briefcase role-icon" aria-hidden="true"></i>
                  <div>
                    <p class="eyebrow">Role</p>
                    <h3 id="fu-chen-role">IT Engineer</h3>
                    <p class="work-department">Department of Information Technology</p>
                  </div>
                </section>

                <section class="work-card primary-card" aria-labelledby="worked-on-title">
                  <h3 id="worked-on-title" class="card-title">
                    <i class="fa-solid fa-table-cells-large" aria-hidden="true"></i>
                    What I Worked On
                  </h3>
                  <div class="erp-focus">
                    <h4>
                      <i class="fa-solid fa-diagram-project" aria-hidden="true"></i>
                      ERP System Development
                    </h4>
                    <p>
                      Developed and maintained an integrated ERP system
                      connecting order management, BOM, inventory,
                      procurement, and production workflows.
                    </p>
                  </div>
                  <div class="erp-contributions">
                    <section aria-labelledby="erp-integration-title">
                      <h5 id="erp-integration-title">
                        <i class="fa-solid fa-arrows-to-circle" aria-hidden="true"></i>
                        System Integration
                      </h5>
                      <p>
                        Connected business modules to streamline order
                        processing, inventory tracking, and production workflows.
                      </p>
                    </section>
                    <section aria-labelledby="erp-logic-title">
                      <h5 id="erp-logic-title">
                        <i class="fa-solid fa-sitemap" aria-hidden="true"></i>
                        Business Logic Design
                      </h5>
                      <p>
                        Implemented multi-level BOM structures and automated
                        order cost calculations.
                      </p>
                    </section>
                  </div>
                </section>

              </div>

              <div class="secondary-column">
                <section class="work-card secondary-card automation-card modernization" aria-labelledby="modernization-title">
                  <h3 id="modernization-title" class="card-title">
                    <i class="fa-solid fa-arrows-rotate" aria-hidden="true"></i>
                    Legacy Modernization
                  </h3>
                  <div class="transformation">
                    <div>
                      <p class="eyebrow">Before</p>
                      <h4>DBTools</h4>
                      <p>Legacy desktop apps</p>
                    </div>
                    <span class="transformation-arrow" aria-hidden="true">→</span>
                    <div class="transformation-after">
                      <p class="eyebrow">After</p>
                      <h4>Web-based Systems</h4>
                      <p>Browser-accessible tools</p>
                    </div>
                  </div>
                  <p class="supporting-copy">
                    Modernized legacy DBTools applications into web-based systems,
                    improving accessibility and maintainability of internal workflows.
                  </p>
                </section>

                <section class="work-card technology" aria-labelledby="technology-title">
                  <h3 id="technology-title" class="card-title">
                    <i class="fa-solid fa-code" aria-hidden="true"></i> Technology
                  </h3>
                  <ul>
                    <li v-for="technology in technologies" :key="technology.name" class="tool-chip">
                      <i v-if="technology.icon" :class="technology.icon" aria-hidden="true"></i>
                      <span v-else class="tool-mark" aria-hidden="true">{{ technology.mark }}</span>
                      <span>{{ technology.name }}</span>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </section>

          <section ref="ctbc" data-chapter="ctbc" class="experience experience--ctbc" aria-labelledby="ctbc-title">
            <img class="harbor-decoration harbor-cloud harbor-cloud--distant" :src="worldAssets.ocean.cloud" alt="" aria-hidden="true" />
            <img class="harbor-decoration harbor-wave" :src="worldAssets.ocean.waveTwo" alt="" aria-hidden="true" />
            <header class="experience-header">
              <div class="experience-heading">
                <h2 id="ctbc-title">CTBC Bank</h2>
                <p class="work-location">Taipei, Taiwan</p>
              </div>
            </header>

            <section class="work-card role-card" aria-labelledby="ctbc-role">
              <i class="fa-solid fa-briefcase role-icon" aria-hidden="true"></i>
              <div>
                <p class="eyebrow">Role</p>
                <h3 id="ctbc-role">IT Engineer Intern</h3>
                <p class="work-department">Department of Testing and Development</p>
              </div>
            </section>

            <div class="ctbc-grid">
              <section class="work-card ctbc-project" aria-labelledby="bulletin-title">
                <p class="eyebrow">Project 01</p>
                <h3 id="bulletin-title" class="card-title">
                  <i class="fa-solid fa-window-maximize" aria-hidden="true"></i>
                  Internal Bulletin Board System
                </h3>
                <p class="ctbc-project__subtitle">Full-Stack Development</p>
                <p class="card-intro">
                  Developed an internal bulletin board system using
                  Spring MVC, JSP, JavaScript, and MySQL, covering
                  interface development, backend functionality,
                  and database operations.
                </p>
                <ul class="ctbc-project-areas">
                  <li><i class="fa-solid fa-display" aria-hidden="true"></i><span>Frontend Development</span></li>
                  <li><i class="fa-solid fa-gears" aria-hidden="true"></i><span>Backend Development</span></li>
                  <li><i class="fa-solid fa-database" aria-hidden="true"></i><span>Database Management</span></li>
                </ul>
              </section>

              <section class="work-card ctbc-project" aria-labelledby="automation-title">
                <p class="eyebrow">Project 02</p>
                <h3 id="automation-title" class="card-title">
                  <i class="fa-solid fa-bolt" aria-hidden="true"></i>
                  Accounting Workflow Automation
                </h3>
                <p class="ctbc-project__subtitle">Process Automation</p>
                <p class="card-intro">
                  Developed an automated workflow for monthly
                  accounting reports, integrating file downloads,
                  Excel VBA data processing, and automated email delivery.
                </p>
                <ol class="ctbc-workflow" aria-label="Accounting workflow">
                  <li><i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i><span>File Download</span></li>
                  <li><i class="fa-solid fa-file-excel" aria-hidden="true"></i><span>Excel VBA Processing</span></li>
                  <li><i class="fa-solid fa-envelope" aria-hidden="true"></i><span>Email Delivery</span></li>
                </ol>
              </section>

              <section class="work-card technology" aria-labelledby="ctbc-technology-title">
                <h3 id="ctbc-technology-title" class="card-title">
                  <i class="fa-solid fa-code" aria-hidden="true"></i> Technology
                </h3>
                <ul>
                  <li v-for="technology in ctbcTechnologies" :key="technology.name" class="tool-chip">
                    <img v-if="technology.image" class="tool-logo" :src="technology.image" alt="" />
                    <i v-else-if="technology.icon" :class="technology.icon" aria-hidden="true"></i>
                    <span v-else class="tool-mark" aria-hidden="true">{{ technology.mark }}</span>
                    <span>{{ technology.name }}</span>
                  </li>
                </ul>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
    <HochiGuide :greeting-text="careerGreeting" />
  </main>
</template>

<script>
import { createWorldAssets } from "../data/world.js";
import HochiGuide from "../components/common/HochiGuide.vue";

export default {
  name: "WorkExperience",
  components: { HochiGuide },
  data() {
    const worldAssets = createWorldAssets(import.meta.env.BASE_URL);
    return {
      worldAssets,
      careerGreeting: "I started my career as a software engineer, building internal systems and translating user needs into technical solutions.\n\nToday, I bring that experience into learning design. At Auriga, I worked on driving simulator lessons for autistic learners, combining learning objectives with clear design specifications to help developers bring those experiences to life.",
      activeChapter: "auriga",
      chapters: [
        { id: "auriga", years: "Jun–Aug 2026", company: "Auriga", island: `${import.meta.env.BASE_URL}world/islands/Auriga-island.png` },
        { id: "fu-chen", years: "2022–2025", company: "Fu Chen", island: `${import.meta.env.BASE_URL}world/islands/little-island.png` },
        { id: "ctbc", years: "Feb–Jun 2022", company: "CTBC Bank", island: worldAssets.ocean.smallIsland },
      ],
      aurigaContributions: [
        {
          id: "auriga-content-design",
          title: "Social Media & Content Design",
          items: [
            "- Content Strategy & Planning",
            "- Social Media Post Design",
            "- Visual Content Design",
          ],
        },
        {
          id: "auriga-crowdfunding",
          title: "Crowdfunding Research & Planning",
          items: [
            "- Crowdfunding Research",
            "- Funding Goal Research",
            "- Kickstarter Campaign Planning",
          ],
        },
      ],
      aurigaSkills: [
        { name: "Instructional Design", icon: "fa-brands fa-readme" },
        { name: "Learning Experience Design", icon: "fa-solid fa-compass" },
        { name: "Scenario-Based Learning", icon: "fa-solid fa-diagram-project" },
        { name: "Learner-Centered Design", icon: "fa-solid fa-user" },
      ],
      technologies: [
        { name: "JavaScript", icon: "fa-brands fa-js" },
        { name: "jQuery", mark: "jQ" },
        { name: "Python", icon: "fa-brands fa-python" },
        { name: "HTML / CSS", icon: "fa-brands fa-html5" },
        { name: "MySQL", icon: "fa-solid fa-database" },
        { name: "phpMyAdmin", mark: "php" },
        { name: "WampServer", icon: "fa-solid fa-server" },
      ],
      ctbcTechnologies: [
        { name: "Java", icon: "fa-brands fa-java" },
        { name: "Spring Framework", mark: "S" },
        { name: "JSP", mark: "JSP" },
        { name: "JavaScript", icon: "fa-brands fa-js" },
        { name: "CSS", icon: "fa-brands fa-css3-alt" },
        { name: "MySQL", icon: "fa-solid fa-database" },
        { name: "DBeaver", image: `${import.meta.env.BASE_URL}images/DBeaverLogo.png` },
        { name: "NICE RPA", icon: "fa-solid fa-gears" },
        { name: "Excel VBA", icon: "fa-solid fa-file-excel" },
      ],
    };
  },
  mounted() {
    // Track the chapter crossing the upper part of this page's own scroll area.
    this.chapterObserver = new IntersectionObserver((entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (current) this.activeChapter = current.target.dataset.chapter;
    }, {
      root: this.$refs.scrollRoot,
      rootMargin: "-15% 0px -70% 0px",
      threshold: 0,
    });
    [this.$refs.auriga, this.$refs.fuChen, this.$refs.ctbc].forEach((section) => {
      this.chapterObserver.observe(section);
    });
  },
  beforeUnmount() {
    this.chapterObserver?.disconnect();
  },
};
</script>

<style scoped>
.work-page {
  position: fixed;
  z-index: 5;
  inset: 0;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  background: #eaf5f7;
  color: #173f63;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0;
  text-align: left;
}
.work-page :deep(*) { box-sizing: border-box; letter-spacing: 0; }
.work-content { position: relative; isolation: isolate; width: min(1240px, calc(100% - 64px)); margin: 0 auto; }
.work-back {
  display: inline-flex;
  gap: 0.55rem;
  align-items: center;
  margin-top: 26px;
  color: #173f63;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: opacity 180ms ease;
}
.work-back:hover { opacity: 0.65; }
.work-back span { font-size: 1rem; }
.work-back:focus-visible { outline: 2px solid #286d9b; outline-offset: 5px; }
.career-intro { position: relative; scroll-snap-align: start; }
.harbor-decoration { position: absolute; z-index: -1; height: auto; pointer-events: none; user-select: none; }
.harbor-cloud { top: 18px; right: 18px; width: 100px; opacity: 0.22; }
.harbor-cloud--distant { top: 30px; right: 0; width: 90px; opacity: 0.16; }
.harbor-wave { bottom: 28px; left: -130px; width: 100px; opacity: 0.12; }
.work-header { padding: 28px 0 24px; }
.eyebrow {
  margin: 0;
  color: #608499;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.5;
  text-transform: uppercase;
}
.work-header h1 {
  margin: 6px 0 8px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.15;
  text-transform: uppercase;
}
.work-header > p:last-child { margin: 0; color: #608092; font-size: 14px; line-height: 1.5; }
.career-journey { display: grid; grid-template-columns: 184px minmax(0, 1fr); gap: 32px; }
.career-timeline { --timeline-gap: clamp(16px, 7svh, 96px); position: sticky; top: 38px; align-self: start; max-height: calc(100svh - 76px); overflow-y: auto; padding-top: 8px; }
.timeline-caption { margin: 0 0 26px; color: #698b9e; font-size: 10px; text-transform: uppercase; }
.career-timeline ol { margin: 0; padding: 0; list-style: none; }
.career-timeline li { position: relative; padding: 0 0 var(--timeline-gap); color: #7391a1; text-align: center; }
.career-timeline li:last-child { padding-bottom: 0; }
.career-timeline li:not(:last-child)::after {
  content: ""; position: absolute; left: 50%; bottom: 4px; height: calc(var(--timeline-gap) - 8px);
  width: 1px; background: #b3ced9;
}
.timeline-marker { position: relative; display: block; width: 112px; height: 86px; margin: 0 auto 8px; }
.timeline-island { display: block; width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 5px 5px rgba(42, 83, 89, 0.12)); }
.timeline-boat { position: absolute; right: -8px; bottom: 6px; width: 60px; height: 40px; object-fit: contain; filter: drop-shadow(0 2px 2px rgba(42, 83, 89, 0.16)); }
.career-timeline li:last-child .timeline-island { width: 96px; margin: 0 auto; }
.timeline-year, .timeline-company, .timeline-status { display: block; }
.timeline-year { font-size: 11px; line-height: 1.5; font-variant-numeric: tabular-nums; }
.timeline-company { margin-top: 5px; font-size: 13px; line-height: 1.4; }
.timeline-status { min-height: 28px; margin-top: 6px; font-size: 9px; line-height: 1.5; }
.is-current .timeline-island { filter: drop-shadow(0 6px 7px rgba(42, 83, 89, 0.22)); }
.is-current .timeline-year, .is-current .timeline-company { color: #245f7b; font-weight: 600; }
.career-chapters { min-width: 0; }
.experience {
  position: relative;
  isolation: isolate;
  min-height: 100svh;
  padding: 30px 0 40px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
.experience--ctbc { border-top: 1px solid #bfd7e0; }
.experience-header {
  display: grid; grid-template-columns: minmax(0, 1fr);
  gap: 0 24px; align-items: end; margin-bottom: 22px;
}
.experience-heading { min-width: 0; }
.experience-heading h2 { margin: 0; font-size: 28px; font-weight: 600; line-height: 1.2; overflow-wrap: anywhere; }
.work-department, .work-location { margin: 0; color: #638397; font-size: 11px; line-height: 1.6; }
.work-location { margin-top: 7px; }
.work-overview { grid-column: 1 / -1; max-width: 690px; margin: 14px 0 0; color: #52768b; font-size: 13px; line-height: 1.6; }
.fu-chen-grid, .auriga-grid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr); gap: 18px; align-items: start; }
.primary-column, .secondary-column, .ctbc-support-column { display: grid; min-width: 0; align-self: start; align-items: start; gap: 12px; }
.work-card {
  min-width: 0;
  padding: 22px;
  border: 1px solid rgba(64, 110, 140, 0.18);
  border-radius: 22px;
  background: #f7fbfd;
  box-shadow: 0 14px 32px rgba(29, 70, 98, 0.10), 0 3px 8px rgba(29, 70, 98, 0.05);
}
.primary-card { padding: 26px; background: #ffffff; box-shadow: 0 16px 36px rgba(29, 70, 98, 0.12), 0 3px 10px rgba(29, 70, 98, 0.05); }
.work-card {
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(64, 110, 140, 0.02));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.65),
    0 4px 0 #ccdee7,
    0 5px 2px rgba(29, 70, 98, 0.07),
    0 7px 10px rgba(29, 70, 98, 0.06),
    0 18px 38px rgba(29, 70, 98, 0.12);
}
.primary-card {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.75),
    0 5px 0 #c4d9e4,
    0 6px 2px rgba(29, 70, 98, 0.08),
    0 8px 12px rgba(29, 70, 98, 0.06),
    0 20px 42px rgba(29, 70, 98, 0.14);
}
.work-card.role-card {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
  padding: 10px 24px;
  background-color: #457297;
  border-color: #356488;
  color: #f6fbff;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    0 4px 0 #244f75,
    0 5px 3px rgba(18, 57, 86, 0.12),
    0 14px 28px rgba(18, 57, 86, 0.20);
}
.role-icon { flex: 0 0 28px; color: #b5d9ed; font-size: 23px; text-align: center; }
.work-card.role-card--fu-chen, .work-card.role-card--auriga { width: 100%; margin-bottom: 0; }
.role-card > div { min-width: 0; }
.role-card .eyebrow { color: #b5d9ed; font-size: 9px; }
.role-card h3 { margin: 3px 0; color: #f6fbff; font-size: 19px; font-weight: 500; line-height: 1.3; }
.role-card .work-department { color: #c5ddeb; }
.fu-chen-grid .work-card, .auriga-grid .work-card { height: auto; align-self: start; padding: 16px 22px; }
.fu-chen-grid .primary-card, .auriga-grid .primary-card { padding: 18px 26px; }
.fu-chen-grid .role-card, .auriga-grid .role-card { padding: 10px 24px; }
.card-title { display: flex; align-items: center; gap: 10px; margin: 0; color: #214e6b; font-size: 15px; font-weight: 600; line-height: 1.4; }
.card-title i { flex: 0 0 20px; color: #377f96; font-size: 16px; text-align: center; }
.primary-card > .card-title { font-size: 19px; }
.primary-card > .card-title i { font-size: 20px; }
.card-intro { margin: 12px 0 0; color: #55778d; font-size: 13px; line-height: 1.65; }
.bom-focus { margin: 14px 0; padding-left: 16px; border-left: 2px solid #79a8bb; }
.bom-focus h4 { margin: 6px 0 10px; color: #214e6b; font-size: 23px; font-weight: 500; line-height: 1.3; }
.bom-focus > p:last-child { margin: 0; color: #54768a; font-size: 13px; line-height: 1.7; }
.erp-focus { margin-top: 16px; }
.erp-focus h4 { display: flex; align-items: baseline; gap: 10px; margin: 0 0 10px; color: #214e6b; font-size: 23px; font-weight: 500; line-height: 1.3; }
.erp-focus h4 i { color: #377f96; font-size: 17px; }
.erp-focus > p { margin: 0; color: #54768a; font-size: 13px; line-height: 1.65; }
.erp-contributions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 16px; padding-top: 14px; border-top: 1px solid #d3e3eb; }
.erp-contributions h5 { display: flex; align-items: baseline; gap: 8px; margin: 0 0 8px; color: #214e6b; font-size: 13px; font-weight: 600; line-height: 1.5; }
.erp-contributions h5 i { color: #377f96; font-size: 13px; }
.erp-contributions p { margin: 0; color: #54768a; font-size: 12px; line-height: 1.65; }
.auriga-skills { margin-top: 16px; padding-top: 14px; border-top: 1px solid #d3e3eb; }
.auriga-skills .card-title { font-size: 14px; }
.auriga-skills .card-title i { font-size: 15px; }
.auriga-skills ul { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); justify-items: start; gap: 8px; margin: 10px 0 0; padding: 0; color: #52788f; font-size: 11px; line-height: 1.5; list-style: none; }
.auriga-skills .tool-chip span { min-width: 0; overflow-wrap: anywhere; }
.contribution-group { margin-top: 16px; }
.contribution-group + .contribution-group { padding-top: 14px; border-top: 1px solid #d3e3eb; }
.contribution-group h4 { margin: 0; color: #214e6b; font-size: 13px; font-weight: 600; line-height: 1.5; }
.contribution-list { display: grid; gap: 8px; margin: 10px 0 0; padding: 0; color: #52788f; font-size: 12px; font-weight: 400; line-height: 1.5; list-style: none; }
.contribution-list li { min-width: 0; overflow-wrap: anywhere; }
.technology { padding: 16px 22px; background-color: #edf6fa; }
.technology .card-title { font-size: 14px; }
.technology .card-title i { font-size: 15px; }
.technology ul { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0 0; padding: 0; color: #52788f; font-size: 11px; line-height: 1.5; list-style: none; }
.tool-chip { display: inline-flex; align-items: center; gap: 7px; max-width: 100%; padding: 8px 10px; border: 1px solid #d0e2ec; border-radius: 8px; background: #ffffff; box-shadow: 0 2px 3px rgba(23, 63, 99, 0.05); }
.tool-chip i, .tool-mark { flex: 0 0 17px; color: #286d9b; font-size: 15px; text-align: center; }
.tool-mark { font-size: 10px; font-weight: 700; }
.tool-logo { flex: 0 0 17px; width: 17px; height: 17px; object-fit: contain; }
.fu-chen-grid .modernization { padding: 28px; }
.transformation { display: grid; grid-template-columns: minmax(0, 0.8fr) 18px minmax(0, 1.2fr); gap: 8px; align-items: start; margin: 12px 0 8px; }
.modernization .transformation h4 { margin: 6px 0; font-size: 18px; font-weight: 500; line-height: 1.4; }
.transformation > div > p:last-child { margin: 0; color: #638397; font-size: 12px; line-height: 1.5; }
.transformation-arrow { align-self: center; color: #377f96; font-size: 18px; line-height: 1; text-align: center; }
.modernization .supporting-copy { margin: 12px 0 0; padding-top: 12px; border-top: 1px solid #b9d5e2; color: #55778d; font-size: 13px; line-height: 1.65; }
.supporting-copy { margin: 14px 0 0; color: #5f8093; font-size: 11px; line-height: 1.65; }
.ctbc-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; align-items: start; }
.ctbc-grid .technology { grid-column: 1 / -1; padding: 16px 22px; }
.ctbc-project { background-color: #ffffff; }
.ctbc-project > .eyebrow { margin-bottom: 10px; }
.ctbc-project .card-title { align-items: baseline; font-size: 19px; font-weight: 600; }
.ctbc-project__subtitle { margin: 8px 0 0; color: #377f96; font-size: 12px; font-weight: 600; line-height: 1.5; }
.ctbc-project-areas, .ctbc-workflow { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin: 20px 0 0; padding: 16px 0 0; border-top: 1px solid #d3e3eb; list-style: none; }
.ctbc-project-areas li, .ctbc-workflow li { min-width: 0; display: flex; flex-direction: column; gap: 8px; color: #52788f; font-size: 11px; line-height: 1.5; }
.ctbc-project-areas i, .ctbc-workflow i { color: #377f96; font-size: 16px; }
.ctbc-workflow li { position: relative; }
.ctbc-workflow li + li::before { content: "→"; position: absolute; top: 0; left: -16px; color: #79a8bb; font-size: 12px; }
.automation-card { padding: 28px; background: #e2f0f6; }
.automation-card h4 { margin: 12px 0 0; font-size: 18px; font-weight: 500; line-height: 1.4; }

@media (min-width: 1001px) and (max-height: 800px) {
  .fu-chen-grid .modernization { padding: 18px; }
  .experience { padding-top: 20px; padding-bottom: 28px; }
  .experience-header { margin-bottom: 16px; }
  .work-card { padding: 18px; }
  .primary-card { padding: 22px; }
  .bom-focus { margin: 12px 0; }
  .secondary-column { gap: 12px; }
  .supporting-copy { margin-top: 10px; }
}

@media (max-width: 1000px) {
  .work-content { width: calc(100% - 40px); }
  .career-journey { grid-template-columns: 144px minmax(0, 1fr); gap: 20px; }
  .experience-header { grid-template-columns: minmax(0, 1fr); }
  .fu-chen-grid, .ctbc-grid, .auriga-grid { grid-template-columns: minmax(0, 1fr); }
  .secondary-column { grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; }
  .auriga-grid .secondary-column { grid-template-columns: minmax(0, 1fr); }
  .harbor-wave { left: -100px; width: 80px; }
}

@media (max-width: 680px) {
  .fu-chen-grid .modernization { padding: 22px; }
  .transformation { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  .transformation-arrow { justify-self: start; transform: rotate(90deg); }
  .erp-contributions { grid-template-columns: minmax(0, 1fr); gap: 14px; }
  .erp-focus h4 { font-size: 22px; }
  .auriga-skills ul { grid-template-columns: minmax(0, 1fr); }
  .work-page { scroll-snap-type: none; }
  .work-content { width: calc(100% - 36px); }
  .work-back { margin-top: 24px; }
  .work-header { padding: 26px 0 8px; }
  .work-header h1 { font-size: 28px; }
  .work-header > p:last-child { font-size: 13px; }
  .career-journey { display: block; }
  .career-timeline { position: relative; top: auto; max-height: none; overflow-y: visible; padding-top: 18px; }
  .timeline-caption { margin-bottom: 14px; }
  .career-timeline ol { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(136px, 1fr); overflow-x: auto; padding-bottom: 8px; }
  .career-timeline li { padding-bottom: 12px; }
  .career-timeline li:not(:last-child)::after { top: 43px; bottom: auto; left: calc(50% + 60px); width: calc(100% - 120px); height: 1px; }
  .timeline-status { min-height: 14px; }
  .experience { min-height: auto; padding: 28px 0 36px; }
  .experience-heading h2 { font-size: 26px; }
  .secondary-column { grid-template-columns: minmax(0, 1fr); }
  .work-card, .primary-card, .automation-card { padding: 22px; border-radius: 20px; }
  .card-title { font-size: 15px; }
  .primary-card > .card-title { font-size: 18px; }
  .bom-focus h4 { font-size: 22px; }
  .supporting-copy { font-size: 12px; }
  .technology { padding: 18px 22px; }
  .fu-chen-grid .primary-card, .auriga-grid .primary-card { padding: 18px 22px; }
  .work-card.role-card { padding: 10px 20px; }
  .harbor-cloud { width: 70px; opacity: 0.12; }
  .harbor-cloud--distant, .harbor-wave { display: none; }
}

@media (max-width: 360px) {
  .ctbc-project-areas, .ctbc-workflow { gap: 12px; }
  .ctbc-workflow li + li::before { left: -12px; }
}

@media (prefers-reduced-motion: reduce) {
  .work-back { transition-duration: 0.01ms; }
  .work-page { scroll-snap-type: y proximity; scroll-behavior: auto; }
}
@media (max-width: 680px) and (prefers-reduced-motion: reduce) {
  .work-page { scroll-snap-type: none; }
}
</style>
