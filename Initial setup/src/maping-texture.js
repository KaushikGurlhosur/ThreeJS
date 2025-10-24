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

const geometry = new THREE.BoxGeometry(1, 1, 1);

console.log(geometry.attributes.uv.array);

// Creating UV2 attribute for Ambient Occlusion map
const uv2 = new THREE.BufferAttribute(geometry.attributes.uv.array, 2);
geometry.setAttribute("uv2", uv2);

console.log(geometry.attributes.uv2);

const TorusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

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

// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(TorusKnotGeometry, material);
const plane = new THREE.Mesh(planeGeometry, material);
const sphere = new THREE.Mesh(sphereGeometry, material);
const cylinder = new THREE.Mesh(cylinderGeometry, material);

mesh2.position.x = 1.5;
plane.position.x = -1.5;

cylinder.position.y = -1.5;
sphere.position.y = 1.5;

// initialize the texture

const jaggedAlbedo = textureLoader.load(
  "./textures/jagged-cliff1-ue/jagged-cliff1-albedo.png"
);
const jaggedAo = textureLoader.load(
  "./textures/jagged-cliff1-ue/jagged-cliff1-ao.png"
);
const jaggedHeight = textureLoader.load(
  "./textures/jagged-cliff1-ue/jagged-cliff1-height.png"
);
const jaggedMetallic = textureLoader.load(
  "./textures/jagged-cliff1-ue/jagged-cliff1-metallic.png"
);
const jaggedNormal = textureLoader.load(
  "./textures/jagged-cliff1-ue/jagged-cliff1-normal-dx.png"
);
const jaggedRoughness = textureLoader.load(
  "./textures/jagged-cliff1-ue/jagged-cliff1-roughness.png"
);

material.map = jaggedAlbedo;
material.aoMap = jaggedAo;
material.roughnessMap = jaggedRoughness;
material.roughness = 0.1;

material.normalMap = jaggedNormal;
// material.displacementMap = jaggedHeight;
// material.displacementScale = 0.1;
// material.displacementBias = -0.07;

material.metalnessMap = jaggedMetallic;
material.metalness = 1;

// Creating a group to hold multiple objects
group.add(sphere, cylinder, mesh, mesh2, plane);

scene.add(group);

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
