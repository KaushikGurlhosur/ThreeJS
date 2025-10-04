import * as THREE from "three";

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
  75,
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // anything closer than this can't be seen
  30 // anything farther than this can't be seen
);

// position the camera
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
