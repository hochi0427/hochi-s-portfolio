<template>
  <header class="explore-menu">
    <div class="explore-menu__tools">
    <div
      class="explore-menu__explore"
      @pointerenter="openForPointer"
      @pointerleave="scheduleClose"
      @pointerdown="markPointerActivation"
      @pointerup="clearPointerActivation"
      @focusin="handleFocusIn"
      @focusout="handleFocusOut"
      @keydown.esc.prevent="closeAndReturnFocus"
    >
      <button
        ref="trigger"
        class="explore-menu__side explore-menu__trigger"
        type="button"
        aria-haspopup="true"
        :aria-expanded="isOpen"
        @click="toggleMenu"
      >
        Explore <span class="explore-menu__caret" aria-hidden="true">⌄</span>
      </button>

      <Transition name="explore-dropdown">
        <nav v-if="isOpen" class="explore-dropdown" aria-label="Explore the portfolio">
          <div class="explore-dropdown__paths">
            <button
              v-for="(path, index) in explorationPaths"
              :key="path.islandKey"
              class="explore-dropdown__item explore-dropdown__path"
              :style="{ '--item-index': index }"
              type="button"
              @mouseenter="$emit('hover-island', path.islandKey)"
              @mouseleave="$emit('hover-island', null)"
              @focus="$emit('hover-island', path.islandKey)"
              @blur="$emit('hover-island', null)"
              @click="selectIsland(path.islandKey)"
            >
              <span>{{ path.name }} <span aria-hidden="true">→</span></span>
              <small>{{ path.description }}</small>
            </button>
          </div>
          <div class="explore-dropdown__divider" />
          <div class="explore-dropdown__islands">
            <button
              v-for="(island, index) in menuIslands"
              :key="island.islandKey"
              class="explore-dropdown__item"
              :style="{ '--item-index': index + 2 }"
              type="button"
              @mouseenter="$emit('hover-island', island.islandKey)"
              @mouseleave="$emit('hover-island', null)"
              @focus="$emit('hover-island', island.islandKey)"
              @blur="$emit('hover-island', null)"
              @click="selectIsland(island.islandKey)"
            >
              {{ island.name }}
            </button>
          </div>
          <div class="explore-dropdown__divider" />
          <a
            class="explore-dropdown__item"
            :style="{ '--item-index': islands.length + 3 }"
            :href="linkedinHref"
            target="_blank"
            rel="noopener noreferrer"
            @click="closeMenu"
          >
            <i class="fa-brands fa-linkedin" aria-hidden="true"></i> LinkedIn
          </a>
          <a
            class="explore-dropdown__item"
            :style="{ '--item-index': islands.length + 4 }"
            :href="githubHref"
            target="_blank"
            rel="noopener noreferrer"
            @click="closeMenu"
          >
            <i class="fa-brands fa-github" aria-hidden="true"></i> GitHub
          </a>
        </nav>
      </Transition>
    </div>
      <div
        class="map-controls"
        @mouseenter="showControls = true; closeMenu()"
        @mouseleave="showControls = false"
        @focusin="showControls = true; closeMenu()"
        @focusout="showControls = false"
        @keydown.esc.stop.prevent="showControls = false"
      >
        <button
          class="map-controls__trigger"
          type="button"
          aria-label="Map controls"
          :aria-describedby="showControls ? 'map-controls-help' : undefined"
          @click="showControls = true"
        >
          <i class="fa-regular fa-map" aria-hidden="true"></i>
        </button>
        <div v-if="showControls" id="map-controls-help" class="map-controls__tooltip" role="tooltip">
          <p>How to Explore</p>
          <dl>
            <div><dt><kbd>↑ ↓ ← →</kbd></dt><dd>Move your boat</dd></div>
            <div><dt><kbd>SPACE</kbd></dt><dd>Explore an island</dd></div>
            <div><dt>Mouse</dt><dd>Click an island directly</dd></div>
          </dl>
        </div>
      </div>
    </div>
    <span class="explore-menu__name">HOCHI KAO</span>
    <div class="explore-menu__socials">
    <a
      class="explore-menu__social-link"
      :href="githubHref"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hochi's GitHub profile (opens in a new tab)"
      title="GitHub"
    >
      <i class="fa-brands fa-github" aria-hidden="true"></i>
    </a>
    <a
      class="explore-menu__social-link"
      :href="linkedinHref"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hochi's LinkedIn profile (opens in a new tab)"
      title="LinkedIn"
    >
      <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
    </a>
    </div>
  </header>
</template>

<script>
export default {
  name: "ExploreMenu",
  props: {
    githubHref: { type: String, default: "https://github.com/hochi0427" },
    linkedinHref: { type: String, default: "https://www.linkedin.com/in/hochi-kao-518030363/" },
    islands: { type: Array, required: true },
  },
  emits: ["select-island", "hover-island"],
  data() {
    return {
      explorationPaths: [
        { name: "Explore My Work", islandKey: "game", description: "Games, systems & interaction" },
        { name: "Follow My Journey", islandKey: "education", description: "From software to games & learning design" },
      ],
      isOpen: false,
      showControls: false,
      isMobile: false,
      closeTimer: null,
      mediaQuery: null,
      ignoreNextFocus: false,
      pointerFocusTimer: null,
      suppressFocusOpen: false,
    };
  },
  computed: {
    menuIslands() {
      const islands = [...this.islands];
      const learning = islands.findIndex((island) => island.islandKey === "learning");
      const career = islands.findIndex((island) => island.islandKey === "career");
      if (learning !== -1 && career !== -1) {
        [islands[learning], islands[career]] = [islands[career], islands[learning]];
      }
      return islands;
    },
  },
  mounted() {
    this.mediaQuery = window.matchMedia("(max-width: 640px)");
    this.isMobile = this.mediaQuery.matches;
    this.mediaQuery.addEventListener("change", this.updateViewport);
  },
  beforeUnmount() {
    clearTimeout(this.closeTimer);
    clearTimeout(this.pointerFocusTimer);
    this.mediaQuery?.removeEventListener("change", this.updateViewport);
  },
  methods: {
    updateViewport(event) {
      this.isMobile = event.matches;
      if (this.isMobile) this.closeMenu();
    },
    openMenu() {
      clearTimeout(this.closeTimer);
      this.isOpen = true;
    },
    markPointerActivation() {
      this.ignoreNextFocus = true;
      clearTimeout(this.pointerFocusTimer);
      this.pointerFocusTimer = setTimeout(() => {
        this.ignoreNextFocus = false;
      }, 500);
    },
    clearPointerActivation() {
      this.ignoreNextFocus = false;
      clearTimeout(this.pointerFocusTimer);
    },
    handleFocusIn() {
      if (this.suppressFocusOpen) {
        this.suppressFocusOpen = false;
        return;
      }
      if (this.ignoreNextFocus) {
        return;
      }
      this.openMenu();
    },
    openForPointer(event) {
      if (!this.isMobile && event.pointerType !== "touch") this.openMenu();
    },
    toggleMenu() {
      if (this.isMobile) this.isOpen = !this.isOpen;
      else this.openMenu();
      clearTimeout(this.closeTimer);
    },
    scheduleClose() {
      clearTimeout(this.closeTimer);
      this.closeTimer = setTimeout(() => {
        if (this.$el.contains(document.activeElement)) return;
        this.closeMenu();
      }, 180);
    },
    handleFocusOut(event) {
      if (!event.currentTarget.contains(event.relatedTarget)) this.scheduleClose();
    },
    closeMenu() {
      clearTimeout(this.closeTimer);
      this.isOpen = false;
      this.$emit("hover-island", null);
    },
    closeAndReturnFocus() {
      this.closeMenu();
      this.suppressFocusOpen = true;
      this.$refs.trigger?.focus();
    },
    selectIsland(key) {
      this.$emit("select-island", key);
      this.closeMenu();
    },
  },
};
</script>

<style scoped>
.explore-menu {
  position: absolute;
  z-index: 10;
  top: clamp(1.25rem, 4vh, 2.75rem);
  left: clamp(1.25rem, 5vw, 5rem);
  right: clamp(1.25rem, 5vw, 5rem);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  color: #32545a;
}

.explore-menu__side {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.06em;
}

.explore-menu__tools { display: flex; align-items: center; gap: 12px; justify-self: start; min-width: 0; }
.map-controls { position: relative; }
.map-controls__trigger { display: grid; place-items: center; width: 32px; height: 32px; padding: 0; border: 0; border-radius: 4px; background: transparent; color: inherit; font-size: 17px; cursor: pointer; }
.map-controls__trigger:hover { background: rgba(255, 255, 255, 0.3); }
.map-controls__trigger:focus-visible { outline: 2px solid #52818b; outline-offset: 3px; }
.map-controls__tooltip { position: absolute; top: 100%; left: -8px; z-index: 15; box-sizing: border-box; width: 280px; max-width: calc(100vw - 40px); padding: 16px; border: 1px solid rgba(255, 255, 255, 0.6); border-radius: 12px; background: rgba(255, 255, 255, 0.85); box-shadow: 0 8px 24px rgba(42, 83, 89, 0.12); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #32545a; }
.map-controls__tooltip > p { margin: 0 0 12px; font-size: 10px; font-weight: 600; text-transform: uppercase; }
.map-controls__tooltip dl { display: grid; gap: 10px; margin: 0; font-size: 12px; line-height: 1.5; }
.map-controls__tooltip dl > div { display: grid; grid-template-columns: 78px minmax(0, 1fr); gap: 8px; }
.map-controls__tooltip dt { font-weight: 500; }
.map-controls__tooltip dd { margin: 0; }
.map-controls__tooltip kbd { padding: 0; background: transparent; color: inherit; font: inherit; }

.explore-menu__explore {
  position: relative;
  justify-self: start;
}

.explore-menu__trigger {
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-family: inherit;
  cursor: pointer;
}

.explore-menu__caret {
  margin-left: 0.25rem;
  font-size: 0.9em;
}

.explore-dropdown {
  position: absolute;
  top: calc(100% + 0.75rem);
  left: 0;
  display: flex;
  width: max-content;
  min-width: 14.5rem;
  flex-direction: column;
  gap: 0.06rem;
  max-height: calc(100svh - 6rem);
  max-width: calc(100vw - 2.5rem);
  overflow-y: auto;
  padding: 0.75rem 1rem;
  border-radius: 0 12px 12px 0;
  background: rgba(239, 247, 245, 0.94);
  box-shadow: 0 8px 24px rgba(42, 83, 89, 0.08);
  border-left: 1px solid rgba(75, 66, 55, 0.24);
}

.explore-dropdown__paths { display: grid; gap: 0.35rem; }
.explore-dropdown__path > span { font-family: Georgia, "Times New Roman", serif; font-weight: 600; }
.explore-dropdown__path small { display: block; max-width: 15rem; margin-top: 0.25rem; color: #526b6c; font-size: 0.7rem; line-height: 1.45; }

.explore-dropdown__islands {
  display: grid;
  gap: 0.12rem;
}

.explore-dropdown__item {
  display: block;
  width: 100%;
  padding: 0.36rem 0;
  border: 0;
  background: transparent;
  color: #403d36;
  font: inherit;
  font-size: 0.84rem;
  font-weight: 500;
  line-height: 1.3;
  text-align: left;
  text-decoration: none;
  opacity: 0.64;
  transform: translateX(0);
  cursor: pointer;
  animation: explore-item-in 190ms ease both;
  animation-delay: calc(var(--item-index, 0) * 16ms);
  transition: opacity 180ms ease, transform 180ms ease, color 180ms ease;
}

.explore-dropdown__item:hover,
.explore-dropdown__item:focus-visible {
  outline: none;
  opacity: 1;
  transform: translateX(4px);
  color: #765342;
}

.explore-dropdown__divider {
  height: 1px;
  margin: 0.45rem 0;
  background: rgba(93, 81, 65, 0.16);
}

@keyframes explore-item-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 0.64;
    transform: translateY(0);
  }
}

.explore-dropdown-enter-active,
.explore-dropdown-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
  transform-origin: top left;
}

.explore-dropdown-enter-from,
.explore-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.explore-menu__name {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.22em;
}

.explore-menu__socials { display: flex; align-items: center; gap: 8px; justify-self: end; }

.explore-menu__social-link {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  justify-self: end;
  color: inherit;
  font-size: 21px;
  text-decoration: none;
  transition: opacity 250ms ease;
}

.explore-menu__social-link:hover {
  opacity: 0.65;
}

.explore-menu__social-link:focus-visible {
  outline: 2px solid #52818b;
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .explore-dropdown__item { min-height: 44px; }
  .map-controls { display: none; }
  .explore-menu {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    padding: 1.2rem 1.25rem 0;
  }

  .explore-menu__side,
  .explore-menu__name {
    font-size: 0.7rem;
  }

  .explore-dropdown {
    top: calc(100% + 0.55rem);
    min-width: min(14.5rem, calc(100vw - 2.5rem));
  }
}

@media (prefers-reduced-motion: reduce) {
  .explore-dropdown-enter-active,
  .explore-dropdown-leave-active,
  .explore-dropdown__item {
    transition-duration: 0.01ms;
    animation-duration: 0.01ms;
    animation-delay: 0ms;
  }
}

@media (hover: none), (pointer: coarse) {
  .map-controls { display: none; }
}
</style>
