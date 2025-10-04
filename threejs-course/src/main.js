import * as THREE from "three";

// Creating a scene
const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "gray" });

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

// scene.add(camera); // even camera can be added to the scene

// console.log(window.innerWidth, window.innerHeight);
