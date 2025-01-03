<template>
  <div class="collapse-container">
    <button class="collapse-toggle" @click="toggleCollapse">
      {{ isCollapsed ? "▼ " + demonstrate.name : "▲ " + demonstrate.name }}
    </button>
    <transition>
      <div class="collapse-content" v-show="!isCollapsed">
        <p v-if="!this.isCollapsed" v-html="formattedDescription"></p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    demonstrate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isCollapsed: true, // 初始為摺疊狀態
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed; // 切換摺疊狀態
    },
  },
  computed: {
    // 將 \n 換成 <br> 標籤
    formattedDescription() {
      return this.demonstrate.description.replace(/\n/g, "<br>");
    },
  },
};
</script>

<style scoped>
.collapse-container {
  /* width: 500px; */
  display: flex;
  margin: 5px auto;
  flex-direction: column;
}

.collapse-toggle {
  border-radius: 6px;
  display: block;
  width: 100%;
  padding: 6px;
  font-size: 16px;
  background-color: #cbb9a8;
  color: #6a3e37;
  border: none;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.collapse-toggle:hover {
  color: white;
  background-color: #6a3e37;
}

.collapse-content {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #e9ecef;
  /* margin-top: 10px; */
  font-size: 14px;
  max-height: 140px; /* 設置最大高度 */
  overflow-y: auto; /* 超出部分顯示垂直滾動條 */
}
/*Motivation 和 Purpose 的動畫*/
.v-enter-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
