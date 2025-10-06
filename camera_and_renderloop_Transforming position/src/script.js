import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Creating a scene
const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// const cubeMaterial = new THREE.MeshBasicMaterial({ color: "white" }); // no lighting effect on MeshNasicMaterial

const cubeMaterial = new THREE.MeshStandardMaterial({
  color: "red",
  metalness: 0.4, // how metallic it looks (0 = matte, 1 = mirror-like)
  roughness: 0.1, // lower = shinier surface
});

// Creating a Mesh - which accepts a Geometry and a Material
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Creating a group mesh
// _____________________________
const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh2.position.x = -2;
const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh3.position.x = 2;

const group = new THREE.Group();
group.add(cubeMesh);
group.add(cubeMesh2);
group.add(cubeMesh3);

// group.scale.y = 2; // Applies to all the cubemesh in the group

scene.add(group);
// _____________________________

// // Adding Mesh to the Scene
// scene.add(cubeMesh);

// _____________________________
// Transforming scale
cubeMesh.scale.set(2, 2, 1); // X, Y, Z
// _____________________________

// _____________________________
// // Trasforming position
// cubeMesh.position.x = 1;
// cubeMesh.position.z = -1;
// cubeMesh.position.y = 1;

// 3D Axis
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// _____________________________

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  50, //fov
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // anything closer than this can't be seen
  30 // anything farther than this can't be seen
);

// const aspectRatio = window.innerWidth / window.innerHeight;

// // initialize the OrthographicCamera camera
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   200
// );

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

console.log(window.devicePixelRatio);

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

controls.autoRotate = true;
controls.autoRotateSpeed = 5; // To increase the autoRotateSpeed - by default its 2

// Resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// This fun renders based on devices refresh rate - 60fps / 120fps or more
const renderloop = () => {
  controls.update();
  light.position.copy(camera.position); // 🧭 same position as camera
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
