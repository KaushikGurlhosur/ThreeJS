import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// initialize the loader
const textureLoader = new THREE.TextureLoader();

// adding textures
const sunTexture = textureLoader.load("./textures/2k_sun.jpg");

const mercuryTexture = textureLoader.load("./textures/2k_mercury.jpg");

const marsTexture = textureLoader.load("./textures/2k_mars.jpg");

const venusTexture = textureLoader.load("./textures/2k_venus_surface.jpg");

const earthTexture = textureLoader.load("./textures/2k_earth_daymap.jpg");

const moonTexture = textureLoader.load("./textures/2k_moon.jpg");

// initialize the group
const group = new THREE.Group();

// initialize the geometry

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// initialize the material - USING MeshPhysicalMaterial
const sunMaterial = new THREE.MeshPhysicalMaterial({
  map: sunTexture,
  roughness: 0.4,
  metalness: 0.2,
  emissiveMap: sunTexture,
  emissiveIntensity: 1.5,
  emissive: "#fb923c",
});
const mercuryMaterial = new THREE.MeshPhysicalMaterial({
  map: mercuryTexture,
  roughness: 0.4,
  metalness: 0.2,
  emissiveMap: mercuryTexture,
  emissiveIntensity: 1.5,
  emissive: "gray",
});
const marsMaterial = new THREE.MeshPhysicalMaterial({
  map: marsTexture,
  roughness: 0.4,
  metalness: 0.2,
  emissiveMap: marsTexture,
  emissiveIntensity: 1.5,
  emissive: "brown",
});
const venusMaterial = new THREE.MeshPhysicalMaterial({
  map: venusTexture,
  roughness: 0.4,
  metalness: 0.2,
  emissiveMap: venusTexture,
  emissiveIntensity: 1.5,
  emissive: "#f87171",
});
const earthMaterial = new THREE.MeshPhysicalMaterial({
  map: earthTexture,
  roughness: 0.4,
  metalness: 0.2,
  emissiveMap: earthTexture,
  emissiveIntensity: 1.5,
  emissive: "cyan",
});

const moonMaterial = new THREE.MeshPhysicalMaterial({
  map: moonTexture,
  roughness: 0.4,
  metalness: 0.2,
  emissiveMap: moonTexture,
  emissiveIntensity: 2,
  emissive: "white",
});

// initialize the mesh

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);

// scale the sun
sun.scale.setScalar(5);

scene.add(sun);

const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
];

const createPlanet = (planet) => {
  // initialize the planet mesh
  const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);

  // set the scale and position
  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;

  return planetMesh;
};

const createMoon = (moon) => {
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;
  return moonMesh;
};

const planetMeshes = planets.map((planet) => {
  const planetMesh = createPlanet(planet);
  // add it to our scene
  scene.add(planetMesh);

  // add moons if any
  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  });

  return planetMesh;
});

// // Earth material
// const earthMaterial = new THREE.MeshPhysicalMaterial({
//   color: "blue",
// });

// // initialize the earth mesh
// const earth = new THREE.Mesh(sphereGeometry, earthMaterial);

// // position earth
// earth.position.x = 10;

// scene.add(earth);

// // Moon material
// const moonMaterial = new THREE.MeshPhysicalMaterial({
//   color: "grey",
// });

// // initialize the moon mesh
// const moon = new THREE.Mesh(sphereGeometry, moonMaterial);

// // scale the moon
// moon.scale.setScalar(0.3);

// // position moon
// moon.position.x = 2;

// // Local space for the moon - make the moon a child of the earth
// earth.add(moon);

// initialize the light - using stronger lights for better physical material rendering
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 3);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 50);
pointLight.position.set(0, 5, 0);
// scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  900
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
  planetMeshes.forEach((planet, index) => {
    // planet.rotateY(planets[index].speed);
    planet.rotation.y += planets[index].speed;

    planet.position.x = Math.sin(planet.rotation.y) * planets[index].distance;
    planet.position.z = Math.cos(planet.rotation.y) * planets[index].distance;
  });

  controls.update();
  // mesh.rotateY(0.01); // one way to rotate the geometry
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
