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
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const TorusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
// const planeGeometry = new THREE.PlaneGeometry(1, 1);

// const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
// const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
// ✅ High-resolution geometry for displacement
const geometry = new THREE.BoxGeometry(1, 1, 1, 64, 64, 64);
const geometryPlane = new THREE.BoxGeometry(1, 1, 0.01, 64, 64, 64);
const planeGeometry = new THREE.PlaneGeometry(3, 3, 256, 256);
const sphereGeometry = new THREE.SphereGeometry(0.5, 128, 128);

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
const texturePaths = {
  albedo: "./textures/jagged-cliff1-ue/jagged-cliff1-albedo.png",
  ao: "./textures/jagged-cliff1-ue/jagged-cliff1-ao.png",
  normal: "./textures/jagged-cliff1-ue/jagged-cliff1-normal-dx.png",
  metallic: "./textures/jagged-cliff1-ue/jagged-cliff1-normal-dx.png",
  height: "./textures/jagged-cliff1-ue/jagged-cliff1-height.png",
  roughness: "./textures/jagged-cliff1-ue/jagged-cliff1-roughness.png",
};

material.map = textureLoader.load(texturePaths.albedo);
material.aoMap = textureLoader.load(texturePaths.ao);
material.normalMap = textureLoader.load(texturePaths.normal);
material.metalnessMap = textureLoader.load(texturePaths.metallic);
material.roughnessMap = textureLoader.load(texturePaths.roughness);
material.displacementMap = textureLoader.load(texturePaths.height);
material.displacementScale = 0.01; // Controls how much displacement
material.displacementBias = -0.01; // Optional: offsets the displacement

// Add Tweakpane controls for physical material properties
pane.addBinding(material, "roughness", { min: 0, max: 1, step: 0.01 });
pane.addBinding(material, "metalness", { min: 0, max: 1, step: 0.01 });
pane.addBinding(material, "reflectivity", { min: 0, max: 1, step: 0.01 });
pane.addBinding(material, "clearcoat", { min: 0, max: 1, step: 0.01 });
pane.addBinding(material, "clearcoatRoughness", { min: 0, max: 1, step: 0.01 });
pane.addBinding(material, "color", { color: { type: "float" } });

// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);
// const mesh2 = new THREE.Mesh(TorusKnotGeometry, material);
const plane = new THREE.Mesh(geometryPlane, material);
const sphere = new THREE.Mesh(sphereGeometry, material);
// const cylinder = new THREE.Mesh(cylinderGeometry, material);

// mesh2.position.x = 1.5;
plane.position.x = -1.5;

// sphere.position.y = -1.5;
sphere.position.y = 1.5;

// Creating a group to hold multiple objects
// group.add(sphere, cylinder, mesh, mesh2, plane);
group.add(mesh, plane, sphere);

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
camera.position.z = 5;

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
