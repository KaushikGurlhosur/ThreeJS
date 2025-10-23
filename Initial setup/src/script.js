import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the loader
const textureLoader = new THREE.TextureLoader();

// initialize the group
const group = new THREE.Group();

// initialize the geometry

const planeGeometry = new THREE.PlaneGeometry(1, 1);

// initialize the material - USING MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  roughness: 0.2,
  metalness: 0.2,
  reflectivity: 1.0,
  clearcoat: 0.5,
  clearcoatRoughness: 0.1,
  thickness: 2,
});

// initialize the texture
// const textureTest = textureLoader.load(
//   "./textures/jagged-cliff1-ue/jagged-cliff1-albedo.png"
// );
const jaggedTexture = textureLoader.load(
  "./textures/jagged-cliff1-ue/jagged-cliff1-albedo.png"
);

// Repeating Textures
jaggedTexture.repeat.set(100, 100);
// jaggedTexture.wrapS = THREE.RepeatWrapping; // x axis
// jaggedTexture.wrapT = THREE.RepeatWrapping; // y-axis

// Mirrored Repeating Textures
jaggedTexture.wrapS = THREE.MirroredRepeatWrapping; // x axis
jaggedTexture.wrapT = THREE.MirroredRepeatWrapping; // y-axis

material.map = jaggedTexture;

// initialize the mesh

const plane = new THREE.Mesh(planeGeometry, material);

plane.rotation.x = -(Math.PI * 0.5);
plane.scale.set(100, 100);

// Creating a group to hold multiple objects
// group.add(sphere, cylinder, mesh, mesh2, plane);
group.add(plane);

scene.add(group);

// scene.add(mesh);
// scene.add(mesh2);
// scene.add(plane);
// scene.add(sphere, cylinder); // adding multiple objects at once

// initialize the light - using stronger lights for better physical material rendering
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 3);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 50);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 10;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log(scene.children);

// render the scene
const renderloop = () => {
  group.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      // child.rotateY(0.01); // rotate each mesh in the group
    }
  });

  controls.update();
  // mesh.rotateY(0.01); // one way to rotate the geometry
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
