<template>
  <div class="home">
    <div class="home-layout">
      <aside class="profile-panel">
        <img
          class="profile-image"
          :src="'/hochi-s-portfolio/images/Hochi.jpg'"
          alt="Hochi Kao"
        />
        <h1 class="profile-name">Hochi Kao</h1>
        <p>
          NYU Games for Learning student with a background in software
          development, educational technology, and game design.
        </p>

        <div class="profile-section">
          <h2><i class="fa-solid fa-graduation-cap" /> Education</h2>
          <b>New York University</b>
          <p class="degree">M.S. in Games for Learning</p>
          <b>Fu Jen Catholic University</b>
          <p class="degree">B.B.A. in Information Management</p>
        </div>

        <div class="profile-section">
          <h2><i class="fa-solid fa-code" /> Skills</h2>
          <b>Programming :</b><p>JavaScript, HTML/CSS, SQL, Java</p>
          <b>Frameworks &amp; Tools:</b><p>Vue 3, Unity, GitHub, Visual Studio Code</p>
        </div>

        <div class="profile-section">
          <h2><i class="fa-solid fa-address-card" /> Contact</h2>
          <div class="contact-list">
            <div class="contact-item">
              <a href="mailto:hk4591@nyu.edu" aria-label="Email Hochi Kao">
                <i class="fa-solid fa-envelope" />
              </a>
              <span>hk4591@nyu.edu</span>
            </div>
            <div class="contact-item">
              <a href="tel:+16504765307" aria-label="Call Hochi Kao">
                <i class="fa-solid fa-phone" />
              </a>
              <span>(650) 476-5307</span>
            </div>
          </div>
        </div>
      </aside>

      <section class="featured-projects">
        <h1>Featured Projects</h1>

        <div class="projects">
          <router-link
            v-for="project in featuredProjects"
            :key="project.key"
            class="project-card"
            :to="getProjectRoute(project)"
          >
            <img
              class="project-image"
              :src="`/hochi-s-portfolio/images/${project.image}`"
              :alt="project.name"
            />
            <div class="project-card-content">
              <h2>{{ project.name }}</h2>
              <p>{{ project.subLabel }}</p>
            </div>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import sourceData from "../data.json";
export default {
  data() {
    return {
      projects: sourceData.projects.filter(
        (project) =>
          !["venology", "2d-unity-game", "3d-unity-game"].includes(project.slug)
      ),
      unityProjects: [
        {
          key: "2d-unity-game",
          name: "Hunting Rabbit",
          slug: "2d-unity-game",
          image: "Unity2DLogo.png",
          subLabel: "Unity 2D",
          routeName: "GameMod",
        },
        {
          key: "3d-unity-game",
          name: "Weight Game",
          slug: "3d-unity-game",
          image: "Unity3DLogo.png",
          subLabel: "Unity 3D",
          routeName: "WeightGame",
        },
      ],
    };
  },
  computed: {
    featuredProjects() {
      return this.sortMusleepLast([
        ...this.projects.map((project) => ({
          ...project,
          key: project.id,
        })),
        ...this.unityProjects,
      ]);
    },
  },
  methods: {
    getProjectRoute(project) {
      if (project.routeName) {
        return { name: project.routeName };
      }

      if (project.slug === "vignette") {
        return { name: "Vignette" };
      }

      return {
        name: "project",
        params: { id: project.id, slug: project.slug },
      };
    },
    sortMusleepLast(projects) {
      return [...projects].sort((current, next) => {
        if (current.slug === "musleep") return 1;
        if (next.slug === "musleep") return -1;
        return 0;
      });
    },
  },
};
</script>

<style scoped>
.home-layout {
  display: grid;
  grid-template-columns: minmax(260px, 0.9fr) minmax(0, 1.5fr);
  gap: 32px;
  align-items: start;
}

.university {
  font-weight: 600;
  font-size: small;
}
.degree{
  color: #6a3e37;
  opacity: 0.9;
  font-size: smaller;
}

.profile-panel,
.project-card {
  border-radius: 8px;
  background: rgb(234, 215, 196, 0.6);
  box-shadow: 0 0 10px rgba(106, 62, 55, 0.12);
}

.profile-panel {
  padding: 24px;
  line-height: 1.7;
}

.profile-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  border: 3px solid white;
  display: block;
  margin: 0 auto 18px;
}

.profile-name {
  text-align: center;
}

.profile-panel h1,
.featured-projects h1 {
  margin-top: 0;
}

.tagline {
  font-weight: 600;
}

.profile-section {
  margin-top: 22px;
}

.profile-section h2 {
  font-size: 1rem;
  margin-bottom: 8px;
}

.profile-section h2 i {
  margin-right: 6px;
}

.profile-section p {
  margin: 6px 0;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #6a3e37;
  font-size: 14px;
  line-height: 1.4;
}

.contact-item a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid rgb(106, 62, 55, 0.22);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.45);
  color: #6a3e37;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.contact-item a:hover {
  background: rgba(255, 255, 255, 0.75);
  transform: translateY(-2px);
}

.contact-item i {
  font-size: 17px;
}

.contact-item span {
  min-width: 0;
  overflow-wrap: anywhere;
}

.featured-projects {
  min-width: 0;
}

.projects {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.project-card {
  color: #6a3e37;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(106, 62, 55, 0.18);
}


.project-image,
.project-placeholder {
  width: 100%;
  aspect-ratio: 4 / 3;
}

.project-image {
  display: block;
  object-fit: cover;
  background: rgb(106, 62, 55, 0.12);
}

.project-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(rgba(106, 62, 55, 0.22), rgba(106, 62, 55, 0.22)),
    rgb(234, 215, 196);
  color: #6a3e37;
  font-size: 1.5rem;
  font-weight: 700;
}

.project-card-content {
  padding: 18px;
}

.project-card-content h2 {
  margin: 0 0 8px;
}

.project-card-content p {
  margin: 0;
  color: #6a3e37;
  opacity: 0.78;
  line-height: 1.6;
}

@media (max-width: 760px) {
  .home-layout,
  .projects {
    grid-template-columns: 1fr;
  }
}
</style>
