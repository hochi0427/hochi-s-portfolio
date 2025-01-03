<template>
  <Navigation />
  <div class="container">
    <!-- 使用 v-slot 獲取路由組件，並將其包裹在 transition 中 -->
    <router-view v-slot="{ Component }">
      <transition :name="transitionName" mode="out-in">
        <!-- 渲染當前的組件並應用過渡效果 -->
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
export default {
  components: { Navigation },
  computed: {
    transitionName() {
      return this.$route.name === "About" || this.$route.name === "Home" || this.$route.name === "project" || this.$route.name === "PuzzleGame"
        ? "fade"
        : "";
    },
  },
};
</script>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
