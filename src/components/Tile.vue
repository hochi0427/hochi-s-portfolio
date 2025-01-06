<template>
  <div
    class="tile"
    :class="{ space, ok }"
    @click="clickHandler"
    :style="ok ? { backgroundColor: '#6a3e37', color: '#cbb9a8' } : {}"
  >
    {{ !space ? this.tile.label : "" }}
  </div>
</template>

<script>
export default {
  props: ["tile", "col", "position"],
  computed: {
    space() {
      // console.log('tile.label:', this.tile.label, 'col * col:', this.col * this.col);
      return this.tile.label === this.col * this.col;
    },
    ok() {
      // console.log('tile.label:', this.tile.label, 'position:', this.position, 'expected value:', this.position.x * this.col + this.position.y + 1);
      return (
        this.tile.label === this.position.x * this.col + this.position.y + 1
      );
    },
  },
  methods: {
    clickHandler() {
      if (!this.space) {
        this.$emit("move");
      }
    },
  },
};
</script>

<style>
.tile {
  float: left;
  box-sizing: border-box;
  border: 2px solid;
  width: 96px;
  height: 96px;
  margin: 2px;
  color: #6a3e37;
  background-color: #ead7c4;
  font-size: 30px;
  line-height: 96px;
  text-align: center;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
}
.tile .space {
  background-color: #ffffff;
  cursor: auto;
  border: #6a3e37;
}
.tile .ok {
  background-color: #6a3e37;
  color: #ead7c4;
}
</style>
