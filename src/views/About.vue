<template>
  <section class="About">
    <h1 id="Title" class="about-title"></h1>

    <div
      ref="introSection"
      class="preface-container reveal-block fade-only"
      :class="{ 'is-visible': visibleSections.intro }"
    >
      <p>
        Hi, I'm <b>Hochi Kao</b>, currently pursuing an <b>M.S. in Games for
        Learning</b> at <b>New York University</b>. With a background in
        <b>Information Management</b> and software development, I am
        particularly interested in <b>educational technology</b>,
        <b>game design</b>, and <b>interactive learning experiences</b>. This
        portfolio highlights selected projects that reflect my work across web
        development, game-based learning, and user-centered design.
      </p>
      <h4>
        <a
          href="https://github.com/hochi0427/hochi-s-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          ><i class="fa-brands fa-github" /> View the source code for this
          portfolio on GitHub.</a
        >
      </h4>
    </div>

    <div ref="workSection" class="about-section">
      <h1 ref="workTitle" class="section-title section-title-collapsible">
        <i
          v-if="!visibleSections.work"
          class="fa-solid fa-angles-down section-cue-icon"
        />
        <span>WORK EXPERIENCE</span>
        <i
          v-if="!visibleSections.work"
          class="fa-solid fa-angles-down section-cue-icon"
        />
      </h1>

      <transition name="work-left">
        <div v-if="visibleSections.work" class="work-experience-1">
          <div class="work-content">
            <h3>
              <i class="fa-solid fa-briefcase" />&nbsp; Fu Chen Industrial Co.,
              Ltd.
            </h3>
            <p class="duration">Sept 2022 - Present</p>
            <p class="position">
              <b>Engineer, Department of Information Technology</b>
            </p>
            <ul class="details-list">
              <li>
                Updated legacy internal tools by converting DB Tools workflows
                into web-based systems.
              </li>
              <li>
                Set up and maintained local development environments with
                <b>WampServer</b>.
              </li>
              <li>
                Built and maintained frontend interfaces using <b>HTML</b>,
                <b>CSS</b>, <b>jQuery</b>, and <b>JavaScript</b>.
              </li>
              <li>
                Supported backend data operations and database maintenance with
                <b>MySQL</b> and <b>phpMyAdmin</b>.
              </li>
            </ul>
          </div>
        </div>
      </transition>

      <transition name="work-right">
        <div v-if="visibleSections.work" class="work-experience-2">
          <h3><i class="fa-solid fa-briefcase" />&nbsp; CTBC Bank</h3>
          <p class="duration">Feb 2022 - June 2022</p>
          <p class="position">
            <b>Intern, Department of Testing and Development</b>
          </p>
          <p class="project-title">Bulletin Board System</p>
          <ul class="details-list">
            <li>
              Supported development and testing tasks for internal systems in
              <b>Eclipse</b> using <b>MVC</b> architecture and the
              <b>Spring Framework</b>.
            </li>
            <li>
              Implemented interface features with <b>JSP</b>, <b>CSS</b>, and
              <b>JavaScript</b>.
            </li>
            <li>
              Assisted backend development and database operations with
              <b>Java</b>, <b>MySQL</b>, and <b>DBeaver</b>.
            </li>
          </ul>

          <p class="project-title">
            Process Automation - Monthly Accounting Report
          </p>
          <ul class="details-list">
            <li>
              Developed an automation workflow with <b>Nice RPA</b> and
              <b>JavaScript</b> to generate and send monthly accounting reports.
            </li>
          </ul>
        </div>
      </transition>
    </div>

    <div ref="educationSection" class="about-section">
      <h1 ref="educationTitle" class="section-title section-title-collapsible">
        <i
          v-if="!visibleSections.education"
          class="fa-solid fa-angles-down section-cue-icon"
        />
        <span>EDUCATION</span>
        <i
          v-if="!visibleSections.education"
          class="fa-solid fa-angles-down section-cue-icon"
        />
      </h1>

      <transition name="education-shell">
        <div v-if="visibleSections.education" class="education-container">
          <div class="inner education-inner">
            <h3>
              <i class="fa-solid fa-graduation-cap" /> New York University
            </h3>
            <p class="duration">Sep 2025 - Present</p>
            <p class="position"><b>Master of Science in Games for Learning</b></p>
            <p class="details">
              Focused on educational technology, game-based learning, and the
              design of interactive learning experiences.
            </p>

            <h3 class="education-item">
              <i class="fa-solid fa-graduation-cap" /> Fu Jen Catholic University
            </h3>
            <p class="duration">Sep 2018 - June 2022</p>
            <p class="position">
              <b>Bachelor of Business Administration in Information Management</b>
            </p>
            <ul class="details-list">
              <li>Third Place, Web Programming Competition</li>
              <li>
                Certificate of Merit, Outstanding Performance in Information
                System Project
              </li>
              <li>Certificate of Participation, Workforce Development Agency</li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import TypeIt from "typeit";

export default {
  data() {
    return {
      visibleSections: {
        intro: false,
        work: false,
        education: false,
      },
      sectionObserver: null,
      topCollapseOffset: 20,
    };
  },
  mounted() {
    this.visibleSections.intro = true;

    new TypeIt("#Title", {
      strings: "Welcome to my personal portfolio",
      speed: 60,
      afterComplete: (instance) => {
        instance.destroy();
      },
    }).go();

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || window.scrollY <= this.topCollapseOffset) {
            return;
          }

          const sectionName = entry.target.dataset.section;
          if (sectionName) {
            this.openVisibleSection(`${sectionName}Title`, sectionName);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.22,
      }
    );

    this.observeSection("workTitle", "work");
    this.observeSection("educationTitle", "education");
    window.addEventListener("scroll", this.handleTopCollapse, {
      passive: true,
    });
  },
  beforeUnmount() {
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }

    window.removeEventListener("scroll", this.handleTopCollapse);
  },
  methods: {
    observeSection(refName, sectionName) {
      const section = this.$refs[refName];
      if (!section) return;

      section.dataset.section = sectionName;
      this.sectionObserver.observe(section);
    },
    handleTopCollapse() {
      if (window.scrollY > this.topCollapseOffset) {
        this.openVisibleSection("workTitle", "work");
        this.openVisibleSection("educationTitle", "education");
        return;
      }

      this.visibleSections.work = false;
      this.visibleSections.education = false;
    },
    openVisibleSection(refName, sectionName) {
      const sectionTitle = this.$refs[refName];
      if (!sectionTitle || this.visibleSections[sectionName]) return;

      const rect = sectionTitle.getBoundingClientRect();
      const triggerRatio = sectionName === "education" ? 0.65 : 0.75;
      const triggerPoint = window.innerHeight * triggerRatio;
      const nearPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 24;
      const titleIsVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      if (
        (rect.top <= triggerPoint && rect.bottom >= 0) ||
        (sectionName === "education" && nearPageBottom && titleIsVisible)
      ) {
        this.visibleSections[sectionName] = true;
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap");

.About {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  min-height: 100vh;
  padding-bottom: 72px;
}

.About h1 {
  justify-self: center;
  text-shadow: 0 0 3px #aaa;
}

.about-title {
  min-height: 44px;
  margin-bottom: 24px;
}

.about-section {
  scroll-margin-top: 80px;
  margin-top: 96px;
}

.section-title {
  margin: 0 10px 32px;
  text-align: center;
}

.section-title-collapsible {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.section-cue-icon {
  font-size: 0.9em;
}

.duration {
  text-align: right;
  font-size: 12px;
  margin-top: -27px;
}

.position {
  margin-top: -10px;
  font-size: 15px;
}

.details {
  margin-top: -10px;
  font-size: 15px;
  line-height: 1.8;
}

.preface-container {
  background: rgb(234, 215, 196, 0.6);
  border-radius: 8px;
  padding: 28px 36px;
  margin: 10px;
  line-height: 1.8;
}

.preface-container.reveal-block {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.55s ease,
    transform 0.55s ease;
}

.preface-container.reveal-block.is-visible {
  opacity: 1;
  transform: none;
}

.work-left-enter-active,
.work-left-leave-active,
.work-right-enter-active,
.work-right-leave-active {
  transition:
    opacity 0.72s ease,
    transform 0.72s cubic-bezier(0.22, 1, 0.36, 1);
}

.work-left-enter-from,
.work-left-leave-to {
  opacity: 0;
  transform: translateX(-48px);
}

.work-right-enter-from,
.work-right-leave-to {
  opacity: 0;
  transform: translateX(48px);
}

.education-shell-enter-active,
.education-shell-leave-active {
  transition: opacity 0.6s ease;
}

.education-shell-enter-from,
.education-shell-leave-to {
  opacity: 0;
}

.education-shell-enter-active .education-inner,
.education-shell-leave-active .education-inner {
  transition:
    opacity 0.72s ease,
    transform 0.72s cubic-bezier(0.22, 1, 0.36, 1);
}

.education-shell-enter-from .education-inner,
.education-shell-leave-to .education-inner {
  opacity: 0;
  transform: translateX(42px);
}

.work-experience-1 {
  width: 70%;
  height: auto;
  background: rgb(106, 62, 55, 0.6);
  color: #fff;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 26px 30px;
  margin: 10px;
}

.work-experience-2 {
  justify-self: right;
  width: 70%;
  height: auto;
  background: rgb(234, 215, 196, 0.6);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 26px 30px;
  margin: 24px 10px 10px;
}

.education-container {
  background: rgb(106, 62, 55, 0.6);
  color: #fff;
  border-radius: 8px;
  padding: 28px 36px;
  margin: 10px;
}

.details-list {
  margin: 12px 0 0 0;
  padding-left: 20px;
  font-size: 15px;
  line-height: 1.8;
}

.details-list li {
  margin-bottom: 12px;
}

.project-title {
  margin-top: 20px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 700;
}

.education-item {
  margin-top: 32px;
}

@media (prefers-reduced-motion: reduce) {
  .preface-container.reveal-block,
  .work-left-enter-active,
  .work-left-leave-active,
  .work-right-enter-active,
  .work-right-leave-active,
  .education-shell-enter-active,
  .education-shell-leave-active,
  .education-shell-enter-active .education-inner,
  .education-shell-leave-active .education-inner {
    animation: none;
    transition: none;
  }
}

@media (max-width: 720px) {
  .preface-container,
  .education-container,
  .work-experience-1,
  .work-experience-2 {
    width: auto;
    border-radius: 8px;
    padding: 20px;
  }

  .duration {
    text-align: left;
    margin-top: 0;
  }
}
</style>
