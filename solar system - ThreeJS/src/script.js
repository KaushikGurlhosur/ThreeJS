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

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// initialize the material - USING MeshPhysicalMaterial
const sunMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xfff700,
  roughness: 0.2,
  metalness: 0.2,
  reflectivity: 1.0,
  clearcoat: 0.5,
  clearcoatRoughness: 0.1,
  thickness: 2,
});

// initialize the mesh

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);

// scale the sun
sun.scale.setScalar(5);

scene.add(sun);

// Earth material
const earthMaterial = new THREE.MeshPhysicalMaterial({
  color: "blue",
});

// initialize the earth mesh
const earth = new THREE.Mesh(sphereGeometry, earthMaterial);

// position earth
earth.position.x = 10;

scene.add(earth);

// Moon material
const moonMaterial = new THREE.MeshPhysicalMaterial({
  color: "grey",
});

// initialize the moon mesh
const moon = new THREE.Mesh(sphereGeometry, moonMaterial);

// scale the moon
moon.scale.setScalar(0.3);

// position moon

moon.position.x = 2;

// Local space for the moon - make the moon a child of the earth
earth.add(moon);

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
camera.position.z = 100;
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
