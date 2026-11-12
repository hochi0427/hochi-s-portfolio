<template>
  <div ref="stage" class="controller-stage" :class="{ 'is-ready': ready }" @pointermove="movePointer" @pointerleave="leavePointer" @click="clickModel">
    <canvas ref="canvas" aria-hidden="true"></canvas>
    <p v-if="!ready && !error" class="controller-status" role="status">Connecting controller…</p>
    <p v-if="error" class="controller-status" role="status">3D preview unavailable. Project keys are still available below.</p>
    <div class="controller-keys" :class="{ 'controller-keys--fallback': error }" role="group" aria-label="Controller project keys">
      <button v-for="(key, index) in keyPositions" :key="index" class="accessible-key" :class="{ 'is-reserved': index >= projects.length }"
        :id="`${keyId}-${index}`"
        :style="ready ? { left: `${key.x}px`, top: `${key.y}px` } : undefined"
        type="button" :disabled="!ready && !error"
        :inert="tutorialKey !== null && index !== tutorialKey"
        :aria-label="index < projects.length ? `Select ${projects[index].title}` : `Key ${index + 1}, reserved for future navigation`"
        :aria-pressed="index < projects.length ? selected === index : undefined"
        @focus="focusKey(index)" @blur="focusKey(null)" @click.stop="pressKey(index)"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, useId } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { gsap } from "gsap";

const props = defineProps({ projects: { type: Array, required: true }, selected: { type: Number, default: 0 }, guideKey: { type: Number, default: null }, tutorialKey: { type: Number, default: null } });
const emit = defineEmits(["select", "cable-anchor", "key-anchor"]);
const keyId = useId();
const stage = ref(null);
const canvas = ref(null);
const ready = ref(false);
const error = ref(false);
const keyPositions = ref(Array.from({ length: 9 }, () => ({ x: 0, y: 0 })));
const keys = [];
const hitMeshes = [];
const animations = new Set();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const projected = new THREE.Vector3();
const cablePoint = new THREE.Vector3();
const keyCorner = new THREE.Vector3();
let lastKeyAnchor = "";
let lastCableAnchor = { x: null, y: null };
const targetRotation = { x: 0, y: 0 };
let renderer, scene, camera, rig, model, observer, motionMedia;
let frame = null;
let lastTime = null;
let hovered = null;
let focused = null;
let disposed = false;

function render() {
  if (!renderer || !camera || disposed) return;
  scene.updateMatrixWorld(true);
  keyPositions.value = keys.length ? keys.map((key) => {
    projected.copy(key.userData.center);
    key.localToWorld(projected).project(camera);
    return { x: (projected.x + 1) * stage.value.clientWidth / 2, y: (1 - projected.y) * stage.value.clientHeight / 2 };
  }) : keyPositions.value;
  renderer.render(scene, camera);
  const guideKey = keys[props.guideKey];
  if (guideKey) {
    const center = keyPositions.value[props.guideKey];
    const bounds = guideKey.geometry.boundingBox;
    let radius = 0;
    // Project the actual keycap bounds through the same camera as its hit target.
    for (let corner = 0; corner < 8; corner++) {
      keyCorner.set(corner & 1 ? bounds.max.x : bounds.min.x, corner & 2 ? bounds.max.y : bounds.min.y, corner & 4 ? bounds.max.z : bounds.min.z);
      guideKey.localToWorld(keyCorner).project(camera);
      const x = (keyCorner.x + 1) * stage.value.clientWidth / 2;
      const y = (1 - keyCorner.y) * stage.value.clientHeight / 2;
      radius = Math.max(radius, Math.hypot(x - center.x, y - center.y));
    }
    reportKeyAnchor({ index: props.guideKey, x: center.x, y: center.y, radius });
  }
  if (model) {
    cablePoint.set(0, 2.3, 1.1);
    model.localToWorld(cablePoint).project(camera);
    const anchor = {
      x: Math.round((cablePoint.x + 1) * stage.value.clientWidth * 2) / 4,
      y: Math.round((1 - cablePoint.y) * stage.value.clientHeight * 2) / 4,
    };
    if (anchor.x !== lastCableAnchor.x || anchor.y !== lastCableAnchor.y) {
      lastCableAnchor = anchor;
      emit("cable-anchor", anchor);
    }
  }
}
function animate(timestamp) {
  frame = null;
  if (disposed || document.hidden) return;
  const dt = lastTime === null ? 1 / 60 : Math.min((timestamp - lastTime) / 1000, .05);
  lastTime = timestamp;
  const blend = motionMedia.matches ? 1 : 1 - Math.exp(-7 * dt);
  rig.rotation.x += (targetRotation.x - rig.rotation.x) * blend;
  rig.rotation.y += (targetRotation.y - rig.rotation.y) * blend;
  render();
  if (!motionMedia.matches) frame = requestAnimationFrame(animate);
}
function requestRender() {
  if (frame === null && !disposed && !document.hidden) frame = requestAnimationFrame(animate);
}
function resize() {
  if (!renderer || !stage.value.clientWidth || !stage.value.clientHeight) return;
  const width = stage.value.clientWidth;
  const height = stage.value.clientHeight;
  camera.aspect = width / height;
  // Fit the same bounding sphere on narrow and wide screens without cropping.
  const vertical = THREE.MathUtils.degToRad(camera.fov / 2);
  const horizontal = Math.atan(Math.tan(vertical) * camera.aspect);
  const distance = 3.05 / Math.sin(Math.min(vertical, horizontal));
  camera.position.set(.4, .82, 1).normalize().multiplyScalar(distance);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  requestRender();
}
function tweenDepth(key, depth, duration = .16) {
  gsap.killTweensOf(key.position);
  gsap.to(key.position, { z: key.userData.restZ - depth, duration: motionMedia?.matches ? 0 : duration, ease: "power2.out", onUpdate: requestRender });
}
function setHover(index) {
  if (hovered === index) return;
  const previous = hovered;
  hovered = index;
  if (previous !== null && !keys[previous]?.userData.pressing) tweenDepth(keys[previous], focused === previous ? .055 : 0);
  if (index !== null && !keys[index]?.userData.pressing) tweenDepth(keys[index], .055);
  stage.value.style.cursor = index !== null ? "pointer" : "default";
}
function pick(event) {
  if (!ready.value) return null;
  const rect = canvas.value.getBoundingClientRect();
  pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(hitMeshes, false)[0]?.object;
  return hit && keys.includes(hit) ? keys.indexOf(hit) : null;
}
function movePointer(event) {
  if (!ready.value) return;
  if (event.pointerType === "mouse" && !motionMedia.matches) {
    const rect = stage.value.getBoundingClientRect();
    targetRotation.y = ((event.clientX - rect.left) / rect.width - .5) * .18;
    targetRotation.x = ((event.clientY - rect.top) / rect.height - .5) * .1;
  }
  setHover(pick(event));
  requestRender();
}
function leavePointer() {
  targetRotation.x = 0;
  targetRotation.y = 0;
  setHover(null);
  requestRender();
}
function clickModel(event) {
  const index = pick(event);
  if (index !== null) pressKey(index);
}
function focusKey(index) {
  const previous = focused;
  focused = index;
  if (previous !== null && keys[previous] && !keys[previous].userData.pressing) tweenDepth(keys[previous], hovered === previous ? .055 : 0);
  if (index !== null && keys[index] && !keys[index].userData.pressing) tweenDepth(keys[index], .055);
}
function pressKey(index) {
  if (props.tutorialKey !== null && index !== props.tutorialKey) return;
  if (index < props.projects.length) emit("select", index);
  const key = keys[index];
  if (!key) return;
  const old = key.userData.pressAnimation;
  if (old) { old.kill(); animations.delete(old); }
  gsap.killTweensOf(key.position);
  key.userData.pressing = true;
  const timeline = gsap.timeline({ onUpdate: requestRender, onComplete: () => {
    key.userData.pressing = false;
    key.userData.pressAnimation = null;
    animations.delete(timeline);
    tweenDepth(key, hovered === index || focused === index ? .055 : 0);
  } });
  key.userData.pressAnimation = timeline;
  animations.add(timeline);
  timeline.to(key.position, { z: key.userData.restZ - .16, duration: motionMedia.matches ? 0 : .1, ease: "power2.in" })
    .to(key.position, { z: key.userData.restZ, duration: motionMedia.matches ? 0 : .3, ease: "back.out(1.6)" });
}
function visibilityChanged() {
  if (frame !== null) cancelAnimationFrame(frame);
  frame = null;
  lastTime = null;
  requestRender();
}
function motionChanged() {
  targetRotation.x = 0;
  targetRotation.y = 0;
  requestRender();
}
function disposeModel(root) {
  const geometries = new Set();
  const materials = new Set();
  const textures = new Set();
  root?.traverse((node) => {
    if (node.geometry) geometries.add(node.geometry);
    for (const material of Array.isArray(node.material) ? node.material : node.material ? [node.material] : []) {
      materials.add(material);
      for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
    }
  });
  geometries.forEach((geometry) => geometry.dispose());
  textures.forEach((texture) => { texture.source?.data?.close?.(); texture.dispose(); });
  materials.forEach((material) => material.dispose());
}
function reportKeyAnchor(anchor) {
  const bounds = stage.value.getBoundingClientRect();
  const signature = [anchor.index, anchor.x, anchor.y, anchor.radius, bounds.left, bounds.top].map(value => Math.round(value * 4) / 4).join(",");
  if (signature === lastKeyAnchor) return;
  lastKeyAnchor = signature;
  emit("key-anchor", anchor);
}
function reportFallbackAnchor() {
  const button = stage.value?.querySelectorAll(".accessible-key")[props.guideKey];
  if (!button) return;
  const bounds = button.getBoundingClientRect();
  const parent = stage.value.getBoundingClientRect();
  reportKeyAnchor({ index: props.guideKey, x: bounds.left - parent.left + bounds.width / 2, y: bounds.top - parent.top + bounds.height / 2, radius: Math.hypot(bounds.width, bounds.height) / 2 });
}
onMounted(async () => {
  motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionMedia.addEventListener("change", motionChanged);
  document.addEventListener("visibilitychange", visibilityChanged);
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
    rig = new THREE.Group();
    scene.add(rig, new THREE.HemisphereLight(0xf2fcff, 0x789398, 2.4));
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(-3, 8, 5);
    scene.add(light);
    const rim = new THREE.DirectionalLight(0xaddfe9, 2);
    rim.position.set(4, 3, -4);
    scene.add(rim);
    observer = new ResizeObserver(resize);
    observer.observe(stage.value);
    resize();
    const gltf = await new GLTFLoader().loadAsync(`${import.meta.env.BASE_URL}models/controller.glb`);
    if (disposed) { disposeModel(gltf.scene); return; }
    model = gltf.scene;
    const colors = ["#73785B", "#B39A70", "#AE8B76", "#9A7566", "#775C5E", "#94977B", "#537479", "#F6F0E5", "#F6F0E5"];
    const originalMaterials = new Set();
    model.traverse((node) => {
      if (!node.isMesh) return;
      const match = /^Key_(\d\d)$/.exec(node.name);
      if (/_Icon$/.test(node.name)) { node.visible = false; return; }
      for (const material of Array.isArray(node.material) ? node.material : [node.material]) originalMaterials.add(material);
      node.material = new THREE.MeshStandardMaterial({ color: match ? colors[Number(match[1]) - 1] : node.name.startsWith("Foot") ? 0x54727c : 0xb9c5ba, roughness: .6, metalness: .02 });
      hitMeshes.push(node);
      if (match) {
        node.geometry.computeBoundingBox();
        node.userData.center = node.geometry.boundingBox.getCenter(new THREE.Vector3());
        node.userData.restZ = node.position.z;
        keys[Number(match[1]) - 1] = node;
      }
    });
    // The source GLB is Z-up; key presses stay along its local Z axis.
    model.rotation.x = -Math.PI / 2;
    model.updateMatrixWorld(true);
    const center = new THREE.Box3().setFromObject(model).getCenter(new THREE.Vector3());
    model.position.sub(center);
    rig.add(model);
    originalMaterials.forEach((material) => {
      if (!material) return;
      // Shared default materials are no longer used; icon materials remain for cleanup.
      if (!model.getObjectsByProperty("material", material).length) material.dispose();
    });
    ready.value = true;
    resize();
  } catch (cause) {
    if (!disposed) {
      error.value = true;
      console.error("Controller could not load:", cause);
      await nextTick();
      if (disposed) return;
      observer?.disconnect();
      observer = new ResizeObserver(reportFallbackAnchor);
      observer.observe(stage.value);
      reportFallbackAnchor();
    }
  }
});
onBeforeUnmount(() => {
  disposed = true;
  if (frame !== null) cancelAnimationFrame(frame);
  observer?.disconnect();
  motionMedia?.removeEventListener("change", motionChanged);
  document.removeEventListener("visibilitychange", visibilityChanged);
  animations.forEach((animation) => animation.kill());
  keys.forEach((key) => gsap.killTweensOf(key.position));
  disposeModel(model);
  renderer?.dispose();
});
</script>

<style scoped>
.controller-stage { position: relative; width: 100%; height: 100%; min-height: 440px; }
canvas { display: block; width: 100%; height: 100%; }
.controller-status { position: absolute; inset: 40% 20px auto; color: #547780; font-size: 13px; text-align: center; line-height: 1.6; }
.controller-keys { position: absolute; inset: 0; pointer-events: none; }
.accessible-key { position: absolute; width: 54px; height: 44px; padding: 0; border: 0; border-radius: 6px; background: transparent; transform: translate(-50%, -50%); opacity: 0; pointer-events: auto; cursor: pointer; }
.accessible-key:focus-visible { opacity: 1; outline: 3px solid #225a75; outline-offset: 6px; background: #ffffff33; }
.controller-keys--fallback { position: relative; display: grid; grid-template-columns: repeat(3, 52px); justify-content: center; gap: 14px; padding-top: 240px; }
.controller-keys--fallback .accessible-key { position: static; transform: none; opacity: 1; background: #9fbfc5; box-shadow: 0 4px 0 #73979e; }
.controller-keys--fallback .is-reserved { background: #d4d8d1; }
@media (max-width: 760px) { .controller-stage { min-height: 360px; } }
</style>
