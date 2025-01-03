<template>
  <section>
    <h1>Welcome to my personal portfolio</h1>
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
        >. Musleep was awarded the distinction of "Outstanding" in departmental
        evaluations, and Venology achieved an impressive score of 93 out of 100,
        demonstrating my skills in software development and user experience
        design.<br /><br />
        Additionally, I have made a
        <router-link to="/puzzlegame"
          ><i
            class="fa-solid fa-arrow-up-right-from-square"
          />&nbsp;&nbsp;N-puzzle game</router-link
        >, further practicing and showcasing my front-end development skills.
        These projects have not only deepened my understanding of modern web
        technologies but also strengthened my ability to solve complex problems,
        keeping me competitive in the ever-evolving tech field.
      </p>
    </div>
  </section>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
.preface-container {
  background: rgb(203, 185, 168, 0.6);
  border-radius: 8px;
  padding: 8px;
  margin: 10px;
}
.preface-container p{
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
}
</style>
