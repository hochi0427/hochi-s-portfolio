<template>
  <div class="puzzle_game">
      <h1>N-Puzzle</h1>
      <p>Move{{ move > 1 ? "s" : "" }}：{{ move }}</p>
    <div class="puzzle_wrapper">
      <div
        id="puzzle"
        v-if="grids && grids.length"
        :style="{ width: `${col * 100}px`, height: `${col * 100}px` }"
      >
        <PuzzleCover
          v-if="win"
          :complete="complete"
          :puzzleWidth="puzzleWidth"
          @play-change="playToggle"
        />
        <template v-for="(row, i) in grids">
          <Tile
            v-for="(item, j) in row"
            :tile="item"
            :position="{ x: i, y: j }"
            :col="col"
            :key="item.label"
            @move="moveHandler(i, j)"
          ></Tile>
        </template>
      </div>
    </div>
    <div class="button_container">
      <button @click="col = 3">3 × 3</button>
      <button @click="col = 4">4 × 4</button>
      <button @click="init">Reset</button>
    </div>
  </div>
</template>

<script>
// 將所有函數和邏輯定義移到頂部，確保它們在 Vue 組件初始化之前定義

// 隨機排列數組
Array.prototype.shuffle = function (array) {
  for (let i = this.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
};

// 獲取拼圖的數字
const getTiles = function (total) {
  let tiles = [];
  while (tiles.length < total) {
    tiles.push(tiles.length + 1);
  }
  return tiles;
};

// 檢查拼圖是否可解
const checkResolvable = function (ary, col) {
  let count = 0;
  let space = 0;
  ary = ary.filter((item, index) => {
    if (item === ary.length) space = (index % col) + 1;
    return item != ary.length;
  });
  ary.forEach((item, index, ary) => {
    let j = index + 1;
    while (j < ary.length) {
      if (item > ary[j]) count++;
      j++;
    }
  });
  return col % 2 ? count % 2 === 0 : (count % 2) + (space % 2) === 0;
};

// 獲取拼圖的格子
const getGrids = function (col) {
  let tiles = getTiles(col * col); // 一維陣列
  let resolvable = false;
  while (!resolvable) {
    tiles.shuffle();
    resolvable = checkResolvable(tiles, col);
  }
  let grids = [];
  while (grids.length < col) {
    let row = [];
    while (row.length < col) {
      row.push({
        label: tiles[grids.length * col + row.length],
      });
    }
    grids.push(row);
  }
  return grids;
};

import Tile from "@/components/Tile.vue";
import PuzzleCover from "@/components/PuzzleCover.vue";

export default {
  components: {
    Tile,
    PuzzleCover,
  },

  data() {
    return {
      col: 3,
      move: 0,
      grids: [],
      play: false,
    };
  },
  computed: {
    total() {
      return this.col * this.col;
    },
    //判斷拼圖是否完成
    win() {
      if (this.grids.length !== this.col) return false;
      for (let i = 0; i < this.col; i++) {
        for (let j = 0; j < this.col; j++) {
          if (this.grids[i][j].label != i * this.col + j + 1) {
            return false;
          }
        }
      }
      return true;
    },
    puzzleWidth() {
      //計算寬度
      return this.col * 100 + (this.col - 1);
    },
  },
  methods: {
    init() {
      this.grids = getGrids(this.col);
      this.move = 0;
    },

    playToggle() {
      if (this.win) {
        // 當拼圖完成時觸發遊戲重置
        this.init(); // 重新初始化遊戲
        this.play = true; // 開始遊戲
        console.log("Game is now playing");
      }
    },

    moveHandler(x, y) {
      let target = this.grids[x][y];
      let switchTarget = null; // space
      if (x - 1 >= 0 && this.grids[x - 1][y].label === this.total) {
        switchTarget = this.grids[x - 1][y];
      } else if (
        x + 1 < this.col &&
        this.grids[x + 1][y].label === this.total
      ) {
        switchTarget = this.grids[x + 1][y];
      } else if (y - 1 >= 0 && this.grids[x][y - 1].label === this.total) {
        switchTarget = this.grids[x][y - 1];
      } else if (
        y + 1 < this.col &&
        this.grids[x][y + 1].label === this.total
      ) {
        switchTarget = this.grids[x][y + 1];
      }
      if (switchTarget) {
        switchTarget.label = target.label;
        target.label = this.total;
        this.move++;
      }
    },
  },
  watch: {
    col: {
      immediate: true,
      handler() {
        this.init();
      },
    },
    //win時更改complete的狀態
    win(newVal) {
      if (newVal) {
        this.complete = true;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Agu+Display&display=swap");
.puzzle_game  {
  font-family: "Agu Display", serif;
  text-shadow: 2px 2px 2px #aaa;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.puzzle_game h1{
  margin: -10px;
}
.puzzle_wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

#puzzle {
  position: relative;
  z-index: 1;
  margin: 0 auto;
  border: #6a3e37;
}
.puzzle_game .button_container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  font-family: "Agu Display", serif;
}
.puzzle_game button {
  border-radius: 6px;
  border-color: #6a3e37;
  color: #6a3e37;
  background-color: #cbb9a8;
  padding: 5px;
  width: 80px;
  margin: 5px;
}
</style>
