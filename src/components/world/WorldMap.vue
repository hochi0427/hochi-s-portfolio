<template>
  <main
    class="world-map"
    tabindex="-1"
    aria-label="Hochi Kao's portfolio world map"
  >
    <ExploreMenu
      :inert="introVisible"
      :github-href="githubHref"
      :islands="islands"
      @select-island="navigateToIsland"
      @hover-island="setHoveredIsland"
    />

    <section
      ref="sea"
      :inert="introVisible"
      class="world-map__sea"
      aria-label="Explore five areas of Hochi Kao's journey"
      @pointermove="followPointer"
      @pointerleave="clearPointerTarget"
    >
      <div ref="map" class="world-map__map" @load.capture="measureNavigation">
        <img class="ocean-detail ocean-detail--wave-one" :src="ocean.waveOne" alt="" />
        <img class="ocean-detail ocean-detail--wave-two" :src="ocean.waveTwo" alt="" />
        <img class="ocean-detail ocean-detail--rocks" :src="ocean.rocks" alt="" />
        <img class="ocean-detail ocean-detail--small-island" :src="ocean.smallIsland" alt="" />
        <img class="ocean-detail ocean-detail--fish" :src="ocean.fish" alt="" />
        <img class="ocean-detail ocean-detail--buoy" :src="ocean.buoy" alt="" />
        <img class="ocean-detail ocean-detail--cloud" :src="ocean.cloud" alt="" />

        <template v-for="island in islands" :key="island.islandKey">
          <Island
            v-bind="island"
            :highlighted="activeIsland === island.islandKey"
            :muted="Boolean(activeIsland && activeIsland !== island.islandKey)"
            @select="navigateToIsland"
            @hover="setHoveredIsland"
          />
        </template>

        <RouterLink class="world-map__start" :to="{ name: 'GamePlay' }">
          Start Exploring Here <span aria-hidden="true">→</span>
        </RouterLink>

        <Boat
          ref="boatRef"
          :boat-image="boatImage"
          :wake-image="wakeImage"
          :visible="!introVisible"
          :position="keyboardEnabled ? boatPosition : null"
        />
      </div>

      <Transition name="island-preview">
        <aside
          ref="preview"
          v-if="previewIslandData"
          class="island-preview"
          :class="[
            `island-preview--${previewSide}`,
            { 'island-preview--education': previewIslandData.islandKey === 'education' },
          ]"
          :style="previewStyle"
          aria-live="polite"
          :aria-labelledby="`island-preview-title-${previewIslandData.islandKey}`"
        >
          <span class="island-preview__eyebrow">A place to explore</span>
          <h2 :id="`island-preview-title-${previewIslandData.islandKey}`">
            {{ previewIslandData.name }}
          </h2>
          <p>{{ previewIslandData.description }}</p>
        </aside>
      </Transition>
    </section>

    <IntroOverlay v-if="introVisible" @complete="finishIntro" />
  </main>
</template>

<script>
import { useRouter } from "vue-router";
import { createWorldAssets, WORLD_HOME } from "../../data/world.js";
import Boat from "./Boat.vue";
import ExploreMenu from "./ExploreMenu.vue";
import IntroOverlay from "./IntroOverlay.vue";
import Island from "./Island.vue";
import { moveBoatWithCollisions, recoverBoatPosition } from "./boatNavigation.js";

const HOME_ORDER = ["game", "education", "technology", "career", "learning"];
const HOME_POSITIONS = {
  game: { left: "43%", top: "47%" },
  career: { left: "19%", top: "24%" },
  education: { left: "79%", top: "30%" },
  technology: { left: "24%", top: "82%" },
  learning: { left: "76%", top: "77%" },
};

const INTRO_SESSION_KEY = "hochi:world-intro-started";
let introStartedInMemory = false;

function shouldShowIntro() {
  if (introStartedInMemory) return false;
  introStartedInMemory = true;
  try {
    if (window.sessionStorage.getItem(INTRO_SESSION_KEY) === "true") return false;
    // Mark the first start before rendering, including interrupted introductions.
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
  } catch {
    // The in-memory flag still prevents replay on navigation when storage is blocked.
  }
  return true;
}

const ARROW_KEYS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
const BOAT_SPEED = 220;

export default {
  name: "WorldMap",
  components: { Boat, ExploreMenu, IntroOverlay, Island },
  setup() {
    return { router: useRouter() };
  },
  data() {
    const assets = createWorldAssets(import.meta.env.BASE_URL);
    return {
      ...assets,
      // Homepage composition only; shared island data also serves destination pages.
      islands: assets.islands
        .sort((a, b) => HOME_ORDER.indexOf(a.islandKey) - HOME_ORDER.indexOf(b.islandKey))
        .map((island) => ({
          ...island,
          ...(island.islandKey === "game" ? { size: "var(--game-island-size)" } : {}),
          position: { ...island.position, ...HOME_POSITIONS[island.islandKey] },
        })),
      githubHref: "https://github.com/hochi0427",
      hoveredIsland: null,
      nearbyIsland: null,
      keyboardEnabled: false,
      boatPosition: { x: WORLD_HOME.x, y: WORLD_HOME.y },
      boatVelocity: { x: 0, y: 0 },
      pointerTarget: null,
      pointerBlockedTime: 0,
      heldKeys: new Set(),
      movementFrame: null,
      lastFrameTime: null,
      navigationGeometry: null,
      introVisible: shouldShowIntro(),
      previewSide: "right",
      previewPosition: { left: 0, top: 0 },
    };
  },
  computed: {
    activeIsland() {
      return this.hoveredIsland || this.nearbyIsland;
    },
    previewIslandData() {
      return this.islands.find((island) => island.islandKey === this.activeIsland) || null;
    },
    previewStyle() {
      return {
        left: `${this.previewPosition.left}px`,
        top: `${this.previewPosition.top}px`,
      };
    },
  },
  watch: {
    activeIsland(key) {
      if (key) this.$nextTick(() => this.positionPreview(key));
    },
  },
  mounted() {
    this.keyboardMedia = window.matchMedia("(min-width: 641px) and (hover: hover) and (pointer: fine)");
    this.keyboardMedia.addEventListener("change", this.updateKeyboardSupport);
    this.updateKeyboardSupport();
    this.mapObserver = new ResizeObserver(this.measureNavigation);
    this.mapObserver.observe(this.$refs.map);
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("blur", this.stopMovement);
    window.addEventListener("focusin", this.handleFocusChange);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  },
  beforeUnmount() {
    this.stopMovement();
    this.mapObserver?.disconnect();
    this.keyboardMedia?.removeEventListener("change", this.updateKeyboardSupport);
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("blur", this.stopMovement);
    window.removeEventListener("focusin", this.handleFocusChange);
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
  },
  methods: {
    updateKeyboardSupport() {
      this.keyboardEnabled = this.keyboardMedia.matches;
      this.stopMovement();
      if (!this.keyboardEnabled) this.nearbyIsland = null;
      this.$nextTick(this.measureNavigation);
    },
    isTypingTarget(target) {
      return target instanceof Element && Boolean(target.closest(
        'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]'
      ));
    },
    handleFocusChange(event) {
      if (this.isTypingTarget(event.target)) this.stopMovement();
    },
    handleVisibilityChange() {
      if (document.hidden) this.stopMovement();
    },
    followPointer(event) {
      if (event.pointerType !== "mouse" || !this.keyboardEnabled || this.introVisible
        || this.heldKeys.size || this.isTypingTarget(document.activeElement)) return;
      if (!this.navigationGeometry) this.measureNavigation();
      const geometry = this.navigationGeometry;
      if (!geometry) return;
      const rect = this.$refs.map.getBoundingClientRect();
      this.pointerTarget = {
        x: Math.max(geometry.minX, Math.min(geometry.maxX, (event.clientX - rect.left) / rect.width * geometry.width)) / geometry.width,
        y: Math.max(geometry.minY, Math.min(geometry.maxY, (event.clientY - rect.top) / rect.height * geometry.height)) / geometry.height,
      };
      this.pointerBlockedTime = 0;
      if (this.movementFrame === null) this.movementFrame = requestAnimationFrame(this.moveBoat);
    },
    clearPointerTarget() {
      this.pointerTarget = null;
      this.pointerBlockedTime = 0;
    },
    handleKeyDown(event) {
      if (!this.keyboardEnabled || this.introVisible || event.defaultPrevented
        || event.isComposing || event.altKey || event.ctrlKey || event.metaKey
        || this.isTypingTarget(event.target)) return;
      if (ARROW_KEYS.has(event.key)) {
        event.preventDefault();
        this.clearPointerTarget();
        this.hoveredIsland = null;
        this.heldKeys.add(event.key);
        if (this.movementFrame === null) {
          this.measureNavigation();
          this.movementFrame = requestAnimationFrame(this.moveBoat);
        }
      } else if (event.code === "Space") {
        // Preserve native activation for links, buttons, and keyboard-focused islands.
        if (event.target instanceof Element && event.target.closest('button, a, [role="link"], [role="button"]')) return;
        event.preventDefault();
        if (!event.repeat && this.activeIsland) this.navigateToIsland(this.activeIsland);
      }
    },
    handleKeyUp(event) {
      this.heldKeys.delete(event.key);
    },
    stopMovement() {
      if (this.movementFrame !== null) cancelAnimationFrame(this.movementFrame);
      this.movementFrame = null;
      this.lastFrameTime = null;
      this.heldKeys.clear();
      this.clearPointerTarget();
      this.boatVelocity = { x: 0, y: 0 };
      this.$refs.boatRef?.stopMotion();
    },
    measureNavigation() {
      if (!this.keyboardEnabled) return;
      const map = this.$refs.map;
      const boat = this.$refs.boatRef?.$el;
      if (!map?.clientWidth || !map.clientHeight || !boat) return;
      const marginX = Math.min(map.clientWidth / 2, boat.offsetWidth / 2 + 6);
      const marginY = Math.min(map.clientHeight / 2, boat.offsetHeight / 2 + 6);
      const hullRadius = boat.offsetWidth * 0.22;
      const obstacles = [];
      this.navigationGeometry = {
        width: map.clientWidth,
        height: map.clientHeight,
        minX: marginX,
        maxX: map.clientWidth - marginX,
        minY: marginY,
        maxY: map.clientHeight - marginY,
        obstacles,
        islands: this.islands.map((island) => {
          const element = map.querySelector(`.world-island--${island.islandKey}`);
          const art = element.querySelector(".world-island__art");
          if (art.offsetHeight) {
            // Use the low, broad island base, excluding buildings, labels, and previews.
            obstacles.push({
              x: element.offsetLeft,
              y: element.offsetTop + art.offsetHeight * 0.16 - boat.offsetHeight * 0.15,
              rx: art.offsetWidth * 0.43 + hullRadius,
              ry: art.offsetHeight * 0.22 + hullRadius,
            });
          }
          return {
            key: island.islandKey,
            x: element.offsetLeft,
            y: element.offsetTop,
            radius: element.offsetWidth * 0.48 + 28,
          };
        }),
      };
      this.clampBoat();
      this.updateNearbyIsland();
      if (this.activeIsland) this.$nextTick(() => this.positionPreview(this.activeIsland));
    },
    clampBoat() {
      const geometry = this.navigationGeometry;
      const previous = { x: this.boatPosition.x * geometry.width, y: this.boatPosition.y * geometry.height };
      const safe = recoverBoatPosition(previous, geometry);
      if (Math.hypot(safe.x - previous.x, safe.y - previous.y) > 0.5) {
        this.boatVelocity = { x: 0, y: 0 };
        this.$refs.boatRef?.stopMotion();
      }
      this.boatPosition = {
        x: safe.x / geometry.width,
        y: safe.y / geometry.height,
      };
    },
    moveBoat(timestamp) {
      if (!this.keyboardEnabled || this.introVisible || !this.navigationGeometry) {
        this.stopMovement();
        return;
      }
      const elapsed = this.lastFrameTime === null ? 1 / 60 : Math.min((timestamp - this.lastFrameTime) / 1000, 0.05);
      this.lastFrameTime = timestamp;
      const geometry = this.navigationGeometry;
      const previous = { x: this.boatPosition.x * geometry.width, y: this.boatPosition.y * geometry.height };
      let dx = Number(this.heldKeys.has("ArrowRight")) - Number(this.heldKeys.has("ArrowLeft"));
      let dy = Number(this.heldKeys.has("ArrowDown")) - Number(this.heldKeys.has("ArrowUp"));
      let targetSpeed = BOAT_SPEED;
      let facingX = dx;
      let facingY = dy;
      if (this.pointerTarget && !this.heldKeys.size) {
        dx = this.pointerTarget.x * geometry.width - previous.x;
        dy = this.pointerTarget.y * geometry.height - previous.y;
        const remaining = Math.hypot(dx, dy);
        if (remaining < 4) {
          this.clearPointerTarget();
          this.boatVelocity = { x: 0, y: 0 };
          dx = 0;
          dy = 0;
        } else {
          targetSpeed = Math.min(BOAT_SPEED, remaining * 5);
          // Quantize the cursor bearing to the eight existing sprite directions.
          const angle = Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) * Math.PI / 4;
          facingX = Math.round(Math.cos(angle));
          facingY = Math.round(Math.sin(angle));
        }
      }
      const distance = Math.hypot(dx, dy) || 1;
      const hasInput = dx !== 0 || dy !== 0;
      const blend = 1 - Math.exp(-(hasInput ? 12 : 18) * elapsed);
      this.boatVelocity.x += (dx / distance * targetSpeed - this.boatVelocity.x) * blend;
      this.boatVelocity.y += (dy / distance * targetSpeed - this.boatVelocity.y) * blend;
      if (!hasInput && Math.hypot(this.boatVelocity.x, this.boatVelocity.y) < 2) this.boatVelocity = { x: 0, y: 0 };
      const next = moveBoatWithCollisions(previous, {
        x: this.boatVelocity.x * elapsed,
        y: this.boatVelocity.y * elapsed,
      }, geometry, this.boatVelocity);
      this.boatPosition = {
        x: next.x / geometry.width,
        y: next.y / geometry.height,
      };
      this.$refs.boatRef?.setMovement({
        x: (next.x - previous.x) / elapsed,
        y: (next.y - previous.y) / elapsed,
        facingX,
        facingY,
      });
      // Stop pursuing an unreachable cursor instead of animating against a shoreline forever.
      if (this.pointerTarget) {
        const speed = Math.hypot(next.x - previous.x, next.y - previous.y) / elapsed;
        this.pointerBlockedTime = speed < 8 ? this.pointerBlockedTime + elapsed : 0;
        if (this.pointerBlockedTime > 0.35) this.clearPointerTarget();
      }
      this.updateNearbyIsland();
      if (this.pointerTarget || this.heldKeys.size || Math.hypot(this.boatVelocity.x, this.boatVelocity.y) > 0) {
        this.movementFrame = requestAnimationFrame(this.moveBoat);
      } else this.stopMovement();
    },
    updateNearbyIsland() {
      const geometry = this.navigationGeometry;
      let nearest = null;
      let nearestDistance = Infinity;
      for (const island of geometry.islands) {
        const distance = Math.hypot(this.boatPosition.x * geometry.width - island.x, this.boatPosition.y * geometry.height - island.y);
        if (distance <= island.radius && distance < nearestDistance) {
          nearest = island.key;
          nearestDistance = distance;
        }
      }
      this.nearbyIsland = nearest;
    },
    finishIntro() {
      const introHadFocus = document.activeElement?.closest(".world-intro");
      this.introVisible = false;
      if (introHadFocus) this.$nextTick(() => this.$el.focus({ preventScroll: true }));
    },
    navigateToIsland(key) {
      const routes = {
        game: { name: "GamePlay" },
        learning: { name: "ResearchTransition" },
        technology: { name: "Musleep" },
        career: { name: "WorkExperience" },
        education: { name: "Education" },
      };
      const route = routes[key];
      if (route) {
        this.stopMovement();
        this.router.push(route);
      }
    },
    setHoveredIsland(key) {
      this.hoveredIsland = key;
    },
    positionPreview(key) {
      if (window.matchMedia("(max-width: 640px)").matches) return;
      const island = this.$refs.map?.querySelector(`.world-island--${key}`);
      const sea = this.$refs.sea;
      const preview = this.$refs.preview;
      if (!island || !sea || !preview) return;

      const seaRect = sea.getBoundingClientRect();
      const islandRect = island.getBoundingClientRect();
      const previewRect = preview.getBoundingClientRect();
      const previewWidth = previewRect.width;
      const previewHeight = previewRect.height;
      const gap = 8;
      const availableRight = window.innerWidth - islandRect.right;
      const availableLeft = islandRect.left;
      let left;
      let top;

      if (availableRight >= previewWidth + gap + 16) {
        this.previewSide = "right";
        left = islandRect.right - seaRect.left + gap;
        top = islandRect.top - seaRect.top + islandRect.height / 2;
      } else if (availableLeft >= previewWidth + gap + 16) {
        this.previewSide = "left";
        left = islandRect.left - seaRect.left - previewWidth - gap;
        top = islandRect.top - seaRect.top + islandRect.height / 2;
      } else {
        const roomAbove = islandRect.top;
        const roomBelow = window.innerHeight - islandRect.bottom;
        this.previewSide = roomAbove >= previewHeight + gap || roomAbove > roomBelow
          ? "above"
          : "below";
        left = islandRect.left - seaRect.left + (islandRect.width - previewWidth) / 2;
        top = this.previewSide === "above"
          ? islandRect.top - seaRect.top - gap - previewHeight / 2
          : islandRect.bottom - seaRect.top + gap + previewHeight / 2;
      }

      const leftLimit = Math.max(12, sea.clientWidth - previewWidth - 12);
      left = Math.min(Math.max(12, left), leftLimit);
      const topLimit = Math.max(previewHeight / 2 + 12, sea.clientHeight - previewHeight / 2 - 12);
      top = Math.min(Math.max(12, top), topLimit);
      this.previewPosition = { left, top };
    },
  },
};
</script>

<style scoped>
.world-map {
  --sea-ink: #31565d;
  --game-island-size: clamp(14rem, 29.2vw, 24.8rem);
  position: relative;
  isolation: isolate;
  display: flex;
  width: 100%;
  min-height: 100svh;
  flex-direction: column;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 49% 44%, rgba(255, 255, 255, 0.48), transparent 55%),
    linear-gradient(145deg, #dcecea 0%, #d0e4e3 48%, #c6dedd 100%);
  color: var(--sea-ink);
}

.world-map__sea {
  position: relative;
  flex: 1;
  min-height: 760px;
}

.world-map__map {
  position: absolute;
  inset: 0;
  width: min(100%, 1440px);
  margin: 0 auto;
  transform-origin: center center;
  will-change: transform;
}

.ocean-detail {
  position: absolute;
  display: block;
  height: auto;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

.ocean-detail--wave-one {
  top: 16%;
  left: 72%;
  width: clamp(4rem, 7vw, 6.5rem);
  opacity: 0.78;
}

.ocean-detail--wave-two {
  top: 59%;
  left: 9%;
  width: clamp(4rem, 6vw, 5.5rem);
  opacity: 0.7;
}

.ocean-detail--rocks {
  top: 20%;
  left: 10%;
  width: clamp(3.5rem, 6vw, 5rem);
  opacity: 0.8;
}

.ocean-detail--small-island {
  top: 68%;
  left: 86%;
  width: clamp(4rem, 7vw, 6rem);
  opacity: 0.9;
}

.ocean-detail--fish {
  top: 79%;
  left: 16%;
  width: clamp(3.5rem, 5vw, 4.5rem);
  opacity: 0.72;
}

.ocean-detail--buoy {
  top: 31%;
  left: 90%;
  width: clamp(2.5rem, 4vw, 3.5rem);
  opacity: 0.82;
}

.ocean-detail--cloud {
  top: 7%;
  left: 80%;
  width: clamp(4rem, 7vw, 6rem);
  opacity: 0.42;
}

.island-preview {
  position: absolute;
  z-index: 12;
  box-sizing: border-box;
  width: min(260px, calc(100vw - 32px));
  padding: 14px 14px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 8px 28px rgba(50, 65, 60, 0.06);
  color: #403d36;
  pointer-events: none;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transform: translateY(-50%);
  transition: opacity 180ms ease, translate 180ms ease;
}

.island-preview--left {
  text-align: right;
}

.island-preview--education {
  text-align: left;
}

.island-preview--above,
.island-preview--below {
  transform: translate(-50%, -50%);
  text-align: center;
}

.island-preview__eyebrow {
  color: #78796e;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.island-preview h2 {
  margin: 0.2rem 0 0.2rem;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.08rem, 1.25vw, 1.2rem);
  font-weight: 500;
  line-height: 1.2;
  overflow-wrap: anywhere;
}

.island-preview p {
  margin: 0;
  color: #66695f;
  font-size: 0.82rem;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

.island-preview-enter-from,
.island-preview-leave-to {
  opacity: 0;
  translate: 0 6px;
}

.island-preview-enter-active,
.island-preview-leave-active {
  transition: opacity 180ms ease, translate 180ms ease;
}

/* Anchor the hint in the water below the artwork and its two-line label. */
.world-map__start {
  position: absolute;
  z-index: 4;
  left: 43%;
  top: calc(47% + var(--game-island-size) / 3 + 2rem);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 36px;
  padding: 0.25rem 0.5rem;
  color: var(--sea-ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 0.78rem;
  letter-spacing: 0.025em;
  text-decoration: none;
  white-space: nowrap;
  transform: translateX(-50%);
}

.world-map__start span { transition: transform 220ms ease; }
.world-map__start:hover span { transform: translateX(4px); }
.world-map__start:focus-visible { outline: 2px solid #52818b; outline-offset: 3px; border-radius: 4px; }

@media (min-width: 641px) and (max-width: 1000px) {
  .world-map { --game-island-size: clamp(17rem, 34vw, 21rem); }
  .world-map__sea { min-height: 860px; }
  .world-map__map :deep(.world-island--career) { left: 26% !important; top: 19% !important; width: 11rem !important; }
  .world-map__map :deep(.world-island--education) { left: 79% !important; top: 27% !important; width: 9rem !important; }
  .world-map__map :deep(.world-island--technology) { left: 23% !important; top: 80% !important; width: 12rem !important; }
  .world-map__map :deep(.world-island--learning) { left: 75% !important; top: 75% !important; width: 14rem !important; }
}

@media (max-width: 640px) {
  .world-map { min-height: 100svh; overflow: hidden; }
  .world-map__sea { min-height: auto; padding: 1.5rem 1.25rem 2.5rem; }
  .world-map__map {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    align-items: stretch;
  }

  .world-map__map :deep(.world-island) { flex: none; margin: 0; }
  .world-map__map :deep(.world-island:not(.world-island--game)) {
    width: min(calc(100% - 1.5rem), var(--mobile-island-width)) !important;
  }
  .world-map__map :deep(.world-island__label) { max-width: 100%; padding-inline: 0.25rem; }
  .world-map__map :deep(.world-island__subtitle) { white-space: normal; }
  .world-map__map :deep(.world-island--game) { --mobile-island-width: 22.5rem; order: 0; align-self: flex-start; }
  .world-map__start {
    position: relative;
    left: auto;
    top: auto;
    order: 1;
    align-self: flex-start;
    margin: -1.75rem 0 0 1rem;
    min-height: 44px;
    transform: none;
  }
  .world-map__map :deep(.world-island--education) { --mobile-island-width: 14rem; order: 2; align-self: flex-end; }
  .world-map__map :deep(.world-island--technology) { --mobile-island-width: 17rem; order: 3; align-self: flex-start; }
  .world-map__map :deep(.world-island--career) { --mobile-island-width: 16rem; order: 4; align-self: flex-end; }
  .world-map__map :deep(.world-island--learning) { --mobile-island-width: 18rem; order: 5; align-self: flex-start; }
  .world-map__map :deep(.world-boat) { order: 6; }

  .ocean-detail { max-width: 3.5rem; opacity: 0.5; }
  .ocean-detail--wave-one { top: 26%; left: 4%; }
  .ocean-detail--wave-two { top: 62%; left: 2%; }
  .ocean-detail--rocks { top: 40%; left: 78%; }
  .ocean-detail--small-island { top: 88%; left: 78%; }
  .ocean-detail--fish { top: 75%; left: 7%; }
  .ocean-detail--buoy { top: 53%; left: 83%; }
  .ocean-detail--cloud { top: 10%; left: 85%; }
  .island-preview { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .world-map__start span,
  .island-preview,
  .island-preview-enter-active,
  .island-preview-leave-active {
    transition-duration: 0.01ms;
  }
}
</style>
