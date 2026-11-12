<template>
  <div
    class="world-boat"
    :class="{ 'world-boat--revealed': visible }"
    :style="position ? { left: `${position.x * 100}%`, top: `${position.y * 100}%` } : undefined"
    :aria-hidden="!visible"
    aria-label="A boat exploring the islands"
    role="img"
  >
    <div ref="group" class="boat-group">
      <div ref="floating" class="boat-floating">
        <div ref="wakeAnchor" class="boat-wake-anchor">
          <img ref="wake" class="world-boat__wake" :src="wakeImage" alt="" />
        </div>
        <div class="boat-sprites">
          <img
            v-for="sprite in sprites"
            :key="sprite.direction"
            class="world-boat__vessel"
            :class="{ 'world-boat__vessel--active': facing === sprite.direction }"
            :src="sprite.image"
            width="480"
            height="480"
            alt=""
            decoding="async"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { boatDirection } from "./boatNavigation.js";

const WAKE_ART_ANGLE = 150;
const shortestAngle = (angle) => ((angle + 180) % 360 + 360) % 360 - 180;

export default {
  name: "Boat",
  props: {
    boatImage: { type: String, required: true },
    wakeImage: { type: String, required: true },
    visible: { type: Boolean, default: true },
    position: { type: Object, default: null },
  },
  data() {
    return {
      facing: "SW",
      sprites: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"].map((direction) => ({
        direction,
        image: `${import.meta.env.BASE_URL}world/boat/boat_${direction}.png`,
      })),
    };
  },
  watch: {
    visible(visible) {
      if (visible) this.startAnimation();
      else this.pauseAnimation();
    },
  },
  mounted() {
    this.motion = {
      wakeAngle: 180,
      targetWakeAngle: 180,
      moving: false,
      speed: 0,
      wake: 0,
      phase: 0,
      lastTime: null,
      frame: null,
    };
    this.motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.motionMedia.addEventListener("change", this.handleMotionPreference);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    this.renderPose();
    this.startAnimation();
  },
  beforeUnmount() {
    this.pauseAnimation();
    this.motionMedia?.removeEventListener("change", this.handleMotionPreference);
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    gsap.killTweensOf(this.$refs.group);
  },
  methods: {
    setMovement({ x, y, facingX = x, facingY = y }) {
      if (!this.motion) return;
      const motion = this.motion;
      const distance = Math.hypot(x, y);
      motion.moving = distance > 0.5;
      motion.speed = distance;
      const direction = boatDirection(facingX, facingY);
      if (direction) this.facing = direction;
      if (motion.moving) {
        motion.targetWakeAngle = Math.atan2(y, x) * 180 / Math.PI + 180 - WAKE_ART_ANGLE;
      }
      this.startAnimation();
    },
    stopMotion() {
      if (!this.motion) return;
      this.motion.moving = false;
      this.motion.speed = 0;
      this.startAnimation();
    },
    startAnimation() {
      if (!this.motion || !this.visible || document.hidden || this.motion.frame !== null) return;
      this.motion.frame = requestAnimationFrame(this.animate);
    },
    pauseAnimation() {
      if (!this.motion) return;
      if (this.motion.frame !== null) cancelAnimationFrame(this.motion.frame);
      this.motion.frame = null;
      this.motion.lastTime = null;
    },
    handleVisibilityChange() {
      if (document.hidden) this.pauseAnimation();
      else this.startAnimation();
    },
    handleMotionPreference() {
      this.startAnimation();
    },
    animate(timestamp) {
      const motion = this.motion;
      motion.frame = null;
      const elapsed = motion.lastTime === null ? 1 / 60 : Math.min((timestamp - motion.lastTime) / 1000, 0.05);
      motion.lastTime = timestamp;
      if (this.motionMedia.matches) {
        motion.wakeAngle = motion.targetWakeAngle;
        motion.wake = motion.moving ? 0.8 : 0;
      } else {
        motion.wakeAngle += shortestAngle(motion.targetWakeAngle - motion.wakeAngle) * (1 - Math.exp(-12 * elapsed));
        const wakeTarget = motion.moving ? 0.8 * Math.min(1, motion.speed / 180) : 0;
        motion.wake += (wakeTarget - motion.wake) * (1 - Math.exp(-(motion.moving ? 6 : 2.5) * elapsed));
        motion.phase += elapsed * Math.PI * 2 / 4.8;
      }
      this.renderPose();
      if (!this.motionMedia.matches) this.startAnimation();
      else motion.lastTime = null;
    },
    renderPose() {
      const motion = this.motion;
      const bob = this.motionMedia.matches ? 0 : Math.sin(motion.phase) * (motion.moving ? 1.5 : 2);
      this.$refs.floating.style.transform = `translateY(${bob}px)`;
      this.$refs.wake.style.opacity = motion.wake;
      const trailAngle = (motion.wakeAngle + WAKE_ART_ANGLE) * Math.PI / 180;
      this.$refs.wakeAnchor.style.left = `${50 + Math.cos(trailAngle) * 18}%`;
      this.$refs.wakeAnchor.style.top = `${56 + Math.sin(trailAngle) * 23}%`;
      this.$refs.wakeAnchor.style.transform = `rotate(${motion.wakeAngle}deg)`;
    },
    moveTo({ x = 0, y = 0 }, duration = 1.35) {
      const group = this.$refs.group;
      let previousX = Number(gsap.getProperty(group, "x")) || 0;
      let previousY = Number(gsap.getProperty(group, "y")) || 0;
      let previousTime = performance.now();
      if (this.motionMedia.matches) {
        this.setMovement({ x: x - previousX, y: y - previousY });
        gsap.set(group, { x, y });
        this.stopMotion();
        return;
      }
      return gsap.to(group, {
        x,
        y,
        duration,
        ease: "power2.inOut",
        overwrite: true,
        onUpdate: () => {
          const nextX = Number(gsap.getProperty(group, "x")) || 0;
          const nextY = Number(gsap.getProperty(group, "y")) || 0;
          const now = performance.now();
          const elapsed = Math.max((now - previousTime) / 1000, 0.001);
          this.setMovement({ x: (nextX - previousX) / elapsed, y: (nextY - previousY) / elapsed });
          previousX = nextX;
          previousY = nextY;
          previousTime = now;
        },
        onComplete: this.stopMotion,
      });
    },
    resetMovement(duration = 1.1) {
      return this.moveTo({ x: 0, y: 0 }, duration);
    },
  },
};
</script>

<style scoped>
.world-boat {
  position: absolute;
  z-index: 8;
  top: 51%;
  left: 52%;
  width: clamp(5rem, 9vw, 8rem);
  aspect-ratio: 1;
  overflow: visible;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 900ms ease;
}

.world-boat--revealed {
  opacity: 1;
}

.boat-group,
.boat-floating,
.boat-sprites {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.boat-floating { z-index: 1; }
.boat-sprites { z-index: 1; }
.boat-wake-anchor { position: absolute; z-index: 0; top: 35%; left: 64%; width: 70%; transform-origin: 0 0; }

.world-boat__wake,
.world-boat__vessel {
  position: absolute;
  display: block;
  height: auto;
  user-select: none;
  -webkit-user-drag: none;
}

.world-boat__wake {
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transform-origin: 98% 10%;
  transform: translate(-98%, -10%);
}

.world-boat__vessel {
  z-index: 2;
  inset: 0;
  width: 100%;
  height: 100%;
  max-height: none;
  object-fit: contain;
  object-position: center;
  opacity: 0;
  transition: opacity 120ms ease;
}

.world-boat__vessel--active { opacity: 1; }

@media (max-width: 640px) {
  .world-boat {
    position: relative;
    top: auto;
    left: auto;
    width: 5rem;
    margin: 0.5rem auto 1rem;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .world-boat__vessel { transition: none; }
  .world-boat {
    transition-duration: 0.01ms;
  }
}
</style>
