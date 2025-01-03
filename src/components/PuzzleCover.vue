<template>
  <!-- <transition name="fade" appear> -->
    <div class="puzzle-cover" :style="{ width: puzzleWidth + 'px' }">
      <!-- <transition name="fade" appear> -->
        <div class="puzzle_cover_completed" v-show="synceComplete">
          <h2 class="puzzle_cover_title">Congratulations</h2>
        </div>
      <!-- </transition> -->
      <button
        class="puzzle_cover_play"
        @click="playToggle"
        @animationend="handleAnimationend"
      >
        Play Again
      </button>
    </div>
  <!-- </transition> -->
</template>

<script>
import { ref, watch, defineComponent } from "vue";

export default defineComponent({
  props: {
    complete: {
      type: Boolean,
      required: true,
    },
    puzzleWidth: {
      type: Number,
      required: true,
    },
  },

  setup(props, { emit }) {
    const synceComplete = ref(props.complete);

    //手動觸發
    const playToggle = () => {
      console.log("it works");
      emit("play-change");
    };

    const handleAnimationend = ({ target }) => {
      setTimeout(() => target.removeAttribute("style", 500));
    };
    //監聽complete屬性變化
    watch(
      () => props.complete,
      (newVal) => {
        synceComplete.value = newVal;
      }
    );
    return {
      synceComplete,
      playToggle,
      handleAnimationend,
    };
  },
});
</script>
<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Agu+Display&display=swap'); */
.puzzle-cover {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%; /* Ensure it takes up the full height of the parent */
  z-index: 2; /* Ensure PuzzleCover is above the puzzle grid */
  background-color: rgb(106, 62, 55, 0.6);
  color: white; /* Optional: for text visibility */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 6px;
}

.puzzle_cover_title {
  font-family: "Agu Display", serif;
  font-size: 35px;
  text-shadow: 2px 2px 2px #aaa;
}

.puzzle_cover_play {
  font-size: 22px;
  border-radius: 6px;
  border-color: #6a3e37;
  color: #6a3e37;
  background-color: #cbb9a8;
  border-width: 3px;
  padding: 5px;
  width: 150px;
  font-family: "Agu Display", serif;
  text-shadow: 2px 2px 2px #aaa;
}
</style>
