import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Creating a scene
const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });

// Creating a Mesh - which accepts a Geometry and a Material
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Adding Mesh to the Scene
scene.add(cubeMesh);

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

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true, // smooths edges of geometry
});
renderer.setSize(window.innerWidth, window.innerHeight);

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

controls.autoRotate = true;
controls.autoRotateSpeed = 5; // To increase the autoRotateSpeed - by default its 2

// This fun renders based on devices refresh rate - 60fps / 120fps or more
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
