<template>
  <section class="demonstrates">
    <h1>{{ demonstrate.title }}</h1>
    <!-- 只有當 demonstrate.image 存在時，才顯示圖片 -->
    <img
      v-if="demonstrate.image"
      :src="`/hochi-s-portfolio/images/${demonstrate.image}`"
      :alt="demonstrate.name"
    />
    <p v-html="formattedDescription"></p>

    <!-- 只有Background Information 才顯示 -->
    <div
      class="background_information"
      v-if="demonstrate.name === 'Background Information'"
    >
      <!-- Musleep -->
      <div v-if="project.id === 1">
        <SystemBg />
      </div>
      <!-- Venology -->
      <div v-if="project.id === 2">
        <SystemBgVenology />
      </div>
    </div>
    <!-- 只有Personal Music 才顯示 -->
    <div class="personal_music" v-if="demonstrate.name === 'Personal Music'">
      <button @click="show('tab1')" :class="{ active: tab === 'tab1' }">
        Music Tag Analysis
      </button>
      <button @click="show('tab2')" :class="{ active: tab === 'tab2' }">
        User Collaborative Filtering
      </button>
      <div style="border: 3px solid #6a3e37">
        <MusicTags v-if="tab === 'tab1'" />
        <UsersCF v-if="tab === 'tab2'" />
      </div>
    </div>
    <!-- 只有System Display 才顯示 -->
    <div class="system_display" v-if="demonstrate.name === 'System Display'">
      <!-- Musleep -->
      <div v-if="project.id === 1">
        <SystemDisplay />
      </div>
      <!-- Venology -->
      <div v-if="project.id === 2">
        <SystemDisplayVenology />
      </div>
    </div>
  </section>
</template>

<script>
import sourceData from "@/data.json";
import SystemBg from "@/components/SystemBg.vue";
import SystemBgVenology from "@/components/SystemBgVenology.vue";
import MusicTags from "@/components/MusicTags.vue";
import UsersCF from "@/components/UsersCF.vue";
import SystemDisplay from "@/components/SystemDisplay.vue";
import SystemDisplayVenology from "@/components/SystemDisplayVenology.vue";

export default {
  components: {
    SystemBg,
    SystemBgVenology,
    MusicTags,
    UsersCF,
    SystemDisplay,
    SystemDisplayVenology
  },

  props: {
    id: { type: Number, required: true },
    demonstrateSlug: { type: String, required: true },
  },

  computed: {
    project() {
      return sourceData.projects.find((project) => project.id === this.id);
    },
    demonstrate() {
      return this.project.demonstrates.find(
        (demonstrate) => demonstrate.slug === this.demonstrateSlug
      );
    },
    // 將 \n 換成 <br> 標籤
    formattedDescription() {
      return this.demonstrate.description.replace(/\n/g, "<br>");
    },
  },

  data() {
    return {
      //Personal Music Scroll Page
      currentPage: 1,
      //Tabs
      tab: "tab1",
    };
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },

    show(index) {
      this.tab = index;
    },
  },
};
</script>

<style>
.demonstrates img {
  width: 100%;
  height: auto;
}
.demonstrates p {
  font-size: 18px;
}

.personal_music {
  justify-items: center;
}

.demonstrates button {
  background: #ead7c4;
  color: #6a3e37;
  border: 3px solid #6a3e37;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom: none;
  font-size: 20px;
  width: 300px;
  padding: 5px;
  margin-left: 10px;
  margin-right: 10px;
}

.demonstrates button:hover,
button.active {
  background-color: #6a3e37;
  color: #fff;
}
</style>
