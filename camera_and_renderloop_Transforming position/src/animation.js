import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Creating a scene
const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// const cubeMaterial = new THREE.MeshBasicMaterial({ color: "white" }); // no lighting effect on MeshNasicMaterial

const cubeMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  metalness: 0.4, // how metallic it looks (0 = matte, 1 = mirror-like)
  roughness: 0.1, // lower = shinier surface
  // wireframe: true,
});

// Creating a Mesh - which accepts a Geometry and a Material
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Adding Mesh to the Scene
scene.add(cubeMesh);

cubeMesh.rotation.reorder("YXZ"); // The order of rotation.

// Defining rotation
cubeMesh.rotation.y = THREE.MathUtils.degToRad(90);
cubeMesh.rotation.x = THREE.MathUtils.degToRad(40);

// // Adding it to the cubemesh
// const axesHelper = new THREE.AxesHelper(2);
// cubeMesh.add(axesHelper);

// _____________________________

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  50, //fov
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // anything closer than this can't be seen
  30 // anything farther than this can't be seen
);

// position the camera
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");

const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

// 💡 Add a directional light for the glossy highlight

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(3, 3, 5);
scene.add(light);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true, // smooths edges of geometry // Software solution for staircase like edges
});

// // For antialias - hardware solution
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(window.devicePixelRatio);

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// controls.autoRotate = true;
controls.autoRotateSpeed = 5; // To increase the autoRotateSpeed - by default its 2

// Resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 🔑 recalculate projection
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// initialize the clock
const clock = new THREE.Clock();
let previousTime = 0;

// This fun renders based on devices refresh rate - 60fps / 120fps or more
const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;

  previousTime = currentTime;

  // cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20;

  // Animating using sin
  cubeMesh.scale.x = Math.sin(currentTime) + 1;

  controls.update();
  light.position.copy(camera.position); // 🧭 same position as camera
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
