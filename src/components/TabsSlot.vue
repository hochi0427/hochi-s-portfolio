<template>
  <div class="tabs">
    <div class="tab-titles">
      <div 
        v-for="(tab, index) in tabs" 
        :key="index" 
        class="tab-title" 
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab.name }}
      </div>
    </div>

    <div class="tab-content">
      <slot :activeTab="activeTab"></slot>  <!-- 插槽，將 activeTab 傳遞給子組件 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      tabs: [
        { name: 'Tab 1' },
        { name: 'Tab 2' },
        { name: 'Tab 3' }
      ]
    };
  }
};
</script>

<style scoped>
.tabs {
  display: flex;
  flex-direction: column;
}

.tab-titles {
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid #ccc;
}

.tab-title {
  padding: 10px 20px;
  cursor: pointer;
}

.tab-title.active {
  background-color: #007bff;
  color: white;
}

.tab-content {
  padding: 20px;
}
</style>
