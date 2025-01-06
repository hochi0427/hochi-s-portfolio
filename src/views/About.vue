<template>
    <section class="About">
      <!-- preface -->
      <h1></h1>
      <h1 id="Title"></h1>
      <div class="preface-container">
        <p>
          This website was developed using <b>Vue3</b> and showcases two major
          projects from my academic career: my graduation project
          <router-link to="/project/1/musleep"
            ><i
              class="fa-solid fa-arrow-up-right-from-square"
            />&nbsp;&nbsp;Musleep</router-link
          >
          and my midterm project
          <router-link to="/project/2/venology"
            ><i class="fa-solid fa-arrow-up-right-from-square"></i
            >&nbsp;&nbsp;Venology</router-link
          >. Musleep was awarded the distinction of "Outstanding" in
          departmental evaluations, and Venology achieved an impressive score of
          93 out of 100, demonstrating my skills in software development and
          user experience design.<br /><br />
          Additionally, I have made a
          <router-link to="/puzzlegame"
            ><i
              class="fa-solid fa-arrow-up-right-from-square"
            />&nbsp;&nbsp;N-puzzle game</router-link
          >, further practicing and showcasing my front-end development skills.
          These projects have not only deepened my understanding of modern web
          technologies but also strengthened my ability to solve complex
          problems, keeping me competitive in the ever-evolving tech field.
        </p>
        <h4>
          <a
            href="https://github.com/hochi0427/hochi-s-portfolio"
            target="_blank"
            ><i class="fa-brands fa-github" /> Welcome to visit my GitHub page
            to explore the source code of my personal portfolio, which was
            developed using Vue3.</a
          >
        </h4>
      </div>
      <!-- Work Experience -->
      <h1 style="margin-top: 50px">
        <transition name="slide-up"
          ><i
            v-if="!showElement && showArrows"
            class="fa-solid fa-angles-down" /></transition
        >&nbsp; WORK EXPERIENCE &nbsp;<transition name="slide-up"
          ><i v-if="!showElement && showArrows" class="fa-solid fa-angles-down"
        /></transition>
      </h1>
      <transition name="slide-fade-left">
        <div v-if="showElement && isLeft" class="work-experience-1">
          <div class="work-content">
            <h3>
              <i class="fa-solid fa-briefcase" />&nbsp; Fu Chen Industrial Co.,
              Ltd.
            </h3>
            <p class="duration">Sept 2022 - Present</p>
            <p class="position">
              <b>Engineer, Department of Information Technology</b>
            </p>
            <p class="details">
              ◇ Updated internal systems by transforming old DB Tools into
              web-based systems.<br /><br />
              ◇ Set up local development environments with
              <b>WampServer</b>.<br /><br />
              ◇ Developed the frontend using <b>HTML</b>, <b>CSS3</b>,
              <b>JQuery</b>, <b>JavaScript</b>, focusing on responsive design
              and user-friendly interfaces.<br /><br />
              ◇ Engineered the backend with <b>MySQL</b>, utilizing
              <b>phpMyAdmin</b> for efficient database management and
              maintenance.
            </p>
          </div>
        </div>
      </transition>
      <transition name="slide-fade-right">
        <div v-if="showElement && isRight" class="work-experience-2">
          <h3><i class="fa-solid fa-briefcase" />&nbsp; CTBC Bank</h3>
          <p class="duration">Feb 2022 - June 2022</p>
          <p class="position">
            <b>Intern, Department of Testing and Development</b>
          </p>
          <i class="fa-solid fa-caret-right" />&nbsp;
          <b>Bulletin Board System</b>
          <p class="details">
            ◆ Developed using Eclipse with
            <b>Model-View-Controller (MVC)</b> architecture and
            <b>Spring Framework</b>.<br /><br />
            ◆ Frontend Implementation：Utilized <b>JSP</b>, <b>CSS</b>,
            <b>JavaScript</b> to create dynamic user interfaces.<br /><br />
            ◆ Backend Development：Built with <b>Java</b> and <b>MySQL</b>,
            employing <b>DBeaver</b> for efficient database management, ensuring
            smooth data operations and maintenance.
          </p>
          <i class="fa-solid fa-caret-right" />&nbsp;
          <b>Process Automation - Monthly Accounting Report Developed</b>
          <p class="details">
            ◆ Developed using <b>Nice RPA</b> with <b>JavaScript</b>：Automated
            the process of generating and sending monthly accounting reports,
            significantly improving workflow effeciency.
          </p>
        </div>
      </transition>
      <!-- Education -->
      <h1 style="margin-top: 50px">
        <transition name="slide-up"
          ><i
            v-if="!showElement && showArrows"
            class="fa-solid fa-angles-down" /></transition
        >&nbsp; EDUCATION &nbsp;<transition name="slide-up"
          ><i v-if="!showElement && showArrows" class="fa-solid fa-angles-down"
        /></transition>
      </h1>
      <transition :duration="550" name="nested">
        <div v-if="showEducation" class="education-container outer">
          <div class="inner">
            <h3>
              <i class="fa-solid fa-graduation-cap" /> Fu Jen Catholic
              University
            </h3>
            <p class="duration">Sep 2018 - June 2022</p>
            <p class="position">
              <b
                >Bachelor of Business Administration in Information
                Management</b
              >
            </p>
            <p class="details">
              <i class="fa-solid fa-medal" /> Fu Jen Catholic University
              Department of Information Management - Web Programming <br />
              <b style="margin-left: 20px">Third Place </b><br /><br />
              <i class="fa-solid fa-medal" /> Fu Jen Catholic University,
              Department of Information Management <br />
              <b style="margin-left: 20px"
                >Certificate of Merit, Outstanding performance in Information
                System project </b
              ><br /><br />
              <i class="fa-solid fa-medal" /> Workforce Development Agency
              <br />
              <b style="margin-left: 20px">Certificate of Participation</b>
            </p>
          </div>
        </div>
      </transition>
    </section>
</template>
<script>
import TypeIt from "typeit";
export default {
  data() {
    return {
      showElement: false,
      isLeft: true,
      isRight: false,
      showArrows: false,
      showEducation: false,
    };
  },
  mounted() {
    //標題打字效果
    new TypeIt("#Title", {
      strings: "Welcome to my personal portfolio",
      speed: 60,
      afterComplete: function (instance) {
        instance.destroy();
      },
    }).go();

    //中標箭頭效果
    setTimeout(() => {
      this.showArrows = true;
    }, 3000);

    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    //組件銷毀前移除事件監聽
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollPosition = window.scrollY;
      console.log("Current scroll position:", scrollPosition);

      // 當滾動位置到點時顯示
      if (scrollPosition > 200) {
        this.showElement = true;
        this.isLeft = true;
        this.isRight = true;
        // console.log("show it");
      } else {
        this.showElement = false;
      }

      if (scrollPosition > 780) {
        this.showEducation = true;
      } else {
        this.showEducation = false;
      }
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap");
/* 隱藏滾動條 */

.About {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  min-height: 1600px;
}
.About h1 {
  justify-self: center;
  text-shadow: 0 0 3px #aaa;
}

.duration {
  justify-self: right;
  font-size: 12px;
  margin-top: -27px;
}

.position {
  margin-top: -10px;
  font-size: 15px;
}

.details {
  padding: 12px;
  margin-top: -10px;
  font-size: 15px;
}

.preface-container {
  background: rgb(234, 215, 196, 0.6);
  border-radius: 8px;
  padding: 8px;
  margin: 10px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.8s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

/* transition */
/* right */
.slide-fade-right-enter-active {
  transition: all 0.7s ease-out;
}

.slide-fade-right-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-right-enter-from,
.slide-fade-right-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
/* left */
.slide-fade-left-enter-active {
  transition: all 0.7s ease-out;
}

.slide-fade-left-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-left-enter-from,
.slide-fade-left-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}

.work-experience-1 {
  width: 70%;
  height: auto;
  background: rgb(106, 62, 55, 0.6);
  color: #fff;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 8px;
  margin: 10px;
}
.work-experience-2 {
  justify-self: right;
  width: 70%;
  height: autox;
  background: rgb(234, 215, 196, 0.6);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 8px;
  margin: 10px;
}
.education-container {
  background: rgb(106, 62, 55, 0.6);
  color: #fff;
  border-radius: 8px;
  padding: 8px;
  margin: 10px;
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0.001;
}
</style>
