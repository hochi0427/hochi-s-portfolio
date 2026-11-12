<template>
  <article
    class="world-island"
    :class="[
      `world-island--${islandKey}`,
      {
        'world-island--interactive': interactive,
        'world-island--highlighted': highlighted,
        'world-island--muted': muted,
      },
    ]"
    :style="islandStyle"
    :tabindex="interactive ? 0 : undefined"
    :role="interactive ? 'link' : undefined"
    :aria-label="interactive ? `Explore ${name}` : undefined"
    @click="$emit('select', islandKey)"
    @keydown.enter.prevent="$emit('select', islandKey)"
    @keydown.space.prevent="$emit('select', islandKey)"
    @mouseenter="$emit('hover', islandKey)"
    @mouseleave="$emit('hover', null)"
    @focus="$emit('hover', islandKey)"
    @blur="$emit('hover', null)"
  >
    <img class="world-island__art" :src="image" :alt="`${name} island`" />
    <div v-if="!highlighted" class="world-island__label">
      <span class="world-island__eyebrow">{{ name }}</span>
      <span class="world-island__subtitle">{{ subtitle }}</span>
    </div>
  </article>
</template>

<script>
export default {
  name: "Island",
  props: {
    name: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: String, required: true },
    position: { type: Object, required: true },
    islandKey: { type: String, required: true },
    interactive: { type: Boolean, default: true },
    highlighted: { type: Boolean, default: false },
    muted: { type: Boolean, default: false },
  },
  emits: ["select", "hover"],
  computed: {
    islandStyle() {
      return {
        left: this.position.left,
        top: this.position.top,
        width: this.size,
        zIndex: this.position.zIndex || 1,
      };
    },
  },
};
</script>

<style scoped>
.world-island {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 14px 12px rgba(42, 83, 89, 0.1));
  transition:
    filter 300ms ease,
    opacity 300ms ease,
    transform 300ms ease;
  will-change: filter, opacity, transform;
}

.world-island--interactive {
  cursor: pointer;
}

.world-island--interactive:hover {
  z-index: 5 !important;
  transform: translate(-50%, -50%) scale(1.04);
  filter: drop-shadow(0 20px 15px rgba(32, 74, 82, 0.2));
}

.world-island--highlighted {
  transform: translate(-50%, -50%) scale(1.04);
}

.world-island--highlighted {
  z-index: 6 !important;
  filter: drop-shadow(0 20px 15px rgba(45, 57, 55, 0.22));
}

.world-island--muted {
  opacity: 0.88;
}

.world-island__art {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
}

.world-island__label {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: clamp(-14px, -1.5vw, -7px);
  color: #403d36;
  text-align: center;
}

.world-island__eyebrow {
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(0.76rem, 1vw, 0.88rem);
  font-weight: 600;
  letter-spacing: 0.11em;
  line-height: 1.2;
  text-transform: uppercase;
}

.world-island__subtitle {
  color: #647779;
  font-size: clamp(0.68rem, 0.82vw, 0.76rem);
  line-height: 1.3;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .world-island {
    position: relative;
    top: auto !important;
    left: auto !important;
    width: min(100%, var(--mobile-island-width, 18rem)) !important;
    margin: 0 auto;
    transform: none;
  }

  .world-island--interactive:hover {
    transform: scale(1.025);
  }

  .world-island--highlighted {
    transform: scale(1.025);
  }

  .world-island__label {
    margin-top: -10px;
  }

  .world-island__eyebrow {
    font-size: 0.76rem;
  }

  .world-island__subtitle {
    font-size: 0.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .world-island,
  .world-island__art,
  .world-island__label {
    transition-duration: 0.01ms;
  }
}
</style>