<template>
  <div ref="stage" class="dog-cover" role="img" aria-label="Mutation Dog 3D model">
    <canvas v-show="ready && !failed" ref="canvas" aria-hidden="true" @webglcontextlost.prevent="fail"></canvas>
    <img v-if="!ready || failed" :src="`${base}images/DogMutation.png`" alt="Mutation Dog cover" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const props = defineProps({ paused: { type: Boolean, default: false } });
const base = import.meta.env.BASE_URL;
const stage = ref(null);
const canvas = ref(null);
const ready = ref(false);
const failed = ref(false);
let renderer, scene, camera, rig, model, observer, motionMedia;
let frame = null;
let disposed = false;
let elapsed = 0;
let lastTime = null;

function disposeModel(root) {
  const geometries = new Set();
  const materials = new Set();
  const textures = new Set();
  root?.traverse((node) => {
    if (node.geometry) geometries.add(node.geometry);
    node.skeleton?.dispose();
    for (const material of Array.isArray(node.material) ? node.material : node.material ? [node.material] : []) {
      materials.add(material);
      for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
    }
  });
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
  textures.forEach((texture) => { texture.source?.data?.close?.(); texture.dispose(); });
}
function stopFrame() {
  if (frame !== null) cancelAnimationFrame(frame);
  frame = null;
  lastTime = null;
}
function render() {
  if (!disposed && !failed.value && renderer && camera) renderer.render(scene, camera);
}
function animate(timestamp) {
  frame = null;
  if (disposed || failed.value || document.hidden || props.paused || motionMedia.matches) return;
  if (lastTime !== null) elapsed += Math.min((timestamp - lastTime) / 1000, .05);
  lastTime = timestamp;
  rig.position.y = Math.sin(elapsed * Math.PI / 3) * .035;
  rig.rotation.y = elapsed * Math.PI / 3;
  render();
  frame = requestAnimationFrame(animate);
}
function updateAnimation() {
  stopFrame();
  if (!ready.value || disposed || failed.value) return;
  if (motionMedia.matches) {
    rig.position.y = 0;
    rig.rotation.y = 0;
  }
  render();
  if (!props.paused && !motionMedia.matches && !document.hidden) frame = requestAnimationFrame(animate);
}
function resize() {
  if (!renderer || disposed || failed.value) return;
  const { clientWidth: width, clientHeight: height } = stage.value;
  if (!width || !height) return;
  camera.aspect = width / height;
  // A padded bounding sphere keeps every extremity visible at any aspect ratio.
  const vertical = THREE.MathUtils.degToRad(camera.fov / 2);
  const horizontal = Math.atan(Math.tan(vertical) * camera.aspect);
  const distance = 1.12 / Math.sin(Math.min(vertical, horizontal));
  camera.position.set(1, .45, -1.5).normalize().multiplyScalar(distance);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  render();
}
function fail() {
  failed.value = true;
  stopFrame();
  observer?.disconnect();
  disposeModel(model);
  model = null;
  renderer?.dispose();
}
watch(() => props.paused, updateAnimation);
onMounted(async () => {
  motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionMedia.addEventListener("change", updateAnimation);
  document.addEventListener("visibilitychange", updateAnimation);
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, 1, .01, 100);
    rig = new THREE.Group();
    scene.add(rig, new THREE.HemisphereLight(0xf2fcff, 0x789398, 2));
    const key = new THREE.DirectionalLight(0xfff4e6, 2.5);
    key.position.set(3, 5, -4);
    const fill = new THREE.DirectionalLight(0xbde3e6, 1.4);
    fill.position.set(-3, 2, 3);
    scene.add(key, fill);
    observer = new ResizeObserver(resize);
    observer.observe(stage.value);
    const gltf = await new GLTFLoader().loadAsync(`${base}models/dog.glb`);
    if (disposed || failed.value) { disposeModel(gltf.scene); return; }
    model = gltf.scene;
    model.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(model, true);
    const sphere = bounds.getBoundingSphere(new THREE.Sphere());
    if (!Number.isFinite(sphere.radius) || sphere.radius <= 0) throw new Error("Empty dog model");
    model.position.sub(sphere.center);
    const normalized = new THREE.Group();
    normalized.add(model);
    normalized.scale.setScalar(1 / sphere.radius);
    rig.add(normalized);
    ready.value = true;
    resize();
    updateAnimation();
  } catch (cause) {
    if (!disposed) { console.warn("Mutation Dog cover unavailable:", cause); fail(); }
  }
});
onBeforeUnmount(() => {
  disposed = true;
  stopFrame();
  observer?.disconnect();
  motionMedia?.removeEventListener("change", updateAnimation);
  document.removeEventListener("visibilitychange", updateAnimation);
  disposeModel(model);
  renderer?.dispose();
});
</script>

<style scoped>
.dog-cover { position: relative; width: 100%; height: 100%; min-height: 0; }
.dog-cover canvas, .dog-cover img { display: block; width: 100%; height: 100%; object-fit: contain; }
</style>
