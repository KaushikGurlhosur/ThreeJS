// import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// // initialize the scene
// const scene = new THREE.Scene();

// // initialize the loader
// const textureLoader = new THREE.TextureLoader();

// // adding textures
// const sunTexture = textureLoader.load("./textures/2k_sun.jpg");

// const mercuryTexture = textureLoader.load("./textures/2k_mercury.jpg");

// const marsTexture = textureLoader.load("./textures/2k_mars.jpg");

// const venusTexture = textureLoader.load("./textures/2k_venus_surface.jpg");

// const earthTexture = textureLoader.load("./textures/2k_earth_daymap.jpg");

// const moonTexture = textureLoader.load("./textures/2k_moon.jpg");

// // initialize the group
// const group = new THREE.Group();

// // initialize the geometry

// const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// // initialize the material - USING MeshPhysicalMaterial
// const sunMaterial = new THREE.MeshStandardMaterial({
//   map: sunTexture,
//   // emissiveMap: sunTexture,
//   // emissive: "orange",
//   // emissiveIntensity: 2,
// });
// // const sunMaterial = new THREE.MeshPhysicalMaterial({
// //   map: sunTexture,
// //   roughness: 0.4,
// //   metalness: 0.2,
// //   emissiveMap: sunTexture,
// //   emissiveIntensity: 1.5,
// //   emissive: "#fb923c",
// // });
// const mercuryMaterial = new THREE.MeshStandardMaterial({
//   map: mercuryTexture,
// });
// // const mercuryMaterial = new THREE.MeshPhysicalMaterial({
// //   map: mercuryTexture,
// //   roughness: 0.4,
// //   metalness: 0.2,
// //   emissiveMap: mercuryTexture,
// //   emissiveIntensity: 1.5,
// //   emissive: "gray",
// // });
// const marsMaterial = new THREE.MeshStandardMaterial({
//   map: marsTexture,
// });
// // const marsMaterial = new THREE.MeshPhysicalMaterial({
// //   map: marsTexture,
// //   roughness: 0.4,
// //   metalness: 0.2,
// //   emissiveMap: marsTexture,
// //   emissiveIntensity: 1.5,
// //   emissive: "brown",
// // });

// const venusMaterial = new THREE.MeshStandardMaterial({
//   map: venusTexture,
// });
// const earthMaterial = new THREE.MeshStandardMaterial({
//   map: earthTexture,
// });

// const moonMaterial = new THREE.MeshStandardMaterial({
//   map: moonTexture,
// });
// // const venusMaterial = new THREE.MeshPhysicalMaterial({
// //   map: venusTexture,
// //   roughness: 0.4,
// //   metalness: 0.2,
// //   emissiveMap: venusTexture,
// //   emissiveIntensity: 1.5,
// //   emissive: "#f87171",
// // });
// // const earthMaterial = new THREE.MeshPhysicalMaterial({
// //   map: earthTexture,
// //   roughness: 0.4,
// //   metalness: 0.2,
// //   emissiveMap: earthTexture,
// //   emissiveIntensity: 1.5,
// //   emissive: "cyan",
// // });

// // const moonMaterial = new THREE.MeshPhysicalMaterial({
// //   map: moonTexture,
// //   roughness: 0.4,
// //   metalness: 0.2,
// //   emissiveMap: moonTexture,
// //   emissiveIntensity: 2,
// //   emissive: "white",
// // });

// // initialize the mesh

// const sun = new THREE.Mesh(sphereGeometry, sunMaterial);

// // scale the sun
// sun.scale.setScalar(5);

// scene.add(sun);

// const planets = [
//   {
//     name: "Mercury",
//     radius: 0.5,
//     distance: 10,
//     speed: 0.01,
//     material: mercuryMaterial,
//     moons: [],
//   },
//   {
//     name: "Venus",
//     radius: 0.8,
//     distance: 15,
//     speed: 0.007,
//     material: venusMaterial,
//     moons: [],
//   },
//   {
//     name: "Earth",
//     radius: 1,
//     distance: 20,
//     speed: 0.005,
//     material: earthMaterial,
//     moons: [
//       {
//         name: "Moon",
//         radius: 0.3,
//         distance: 3,
//         speed: 0.015,
//       },
//     ],
//   },
//   {
//     name: "Mars",
//     radius: 0.7,
//     distance: 25,
//     speed: 0.003,
//     material: marsMaterial,
//     moons: [
//       {
//         name: "Phobos",
//         radius: 0.1,
//         distance: 2,
//         speed: 0.02,
//       },
//       {
//         name: "Deimos",
//         radius: 0.2,
//         distance: 3,
//         speed: 0.015,
//         color: 0xffffff,
//       },
//     ],
//   },
// ];

// const createPlanet = (planet) => {
//   // initialize the planet mesh
//   const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);

//   // set the scale and position
//   planetMesh.scale.setScalar(planet.radius);
//   planetMesh.position.x = planet.distance;

//   return planetMesh;
// };

// const createMoon = (moon) => {
//   const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
//   moonMesh.scale.setScalar(moon.radius);
//   moonMesh.position.x = moon.distance;
//   return moonMesh;
// };

// const planetMeshes = planets.map((planet) => {
//   const planetMesh = createPlanet(planet);
//   // add it to our scene
//   scene.add(planetMesh);

//   // add moons if any
//   planet.moons.forEach((moon) => {
//     const moonMesh = createMoon(moon);
//     planetMesh.add(moonMesh);
//   });

//   return planetMesh;
// });

// // // Earth material
// // const earthMaterial = new THREE.MeshPhysicalMaterial({
// //   color: "blue",
// // });

// // // initialize the earth mesh
// // const earth = new THREE.Mesh(sphereGeometry, earthMaterial);

// // // position earth
// // earth.position.x = 10;

// // scene.add(earth);

// // // Moon material
// // const moonMaterial = new THREE.MeshPhysicalMaterial({
// //   color: "grey",
// // });

// // // initialize the moon mesh
// // const moon = new THREE.Mesh(sphereGeometry, moonMaterial);

// // // scale the moon
// // moon.scale.setScalar(0.3);

// // // position moon
// // moon.position.x = 2;

// // // Local space for the moon - make the moon a child of the earth
// // earth.add(moon);

// // initialize the light - using stronger lights for better physical material rendering
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
// directionalLight.position.set(0, 4, 0);
// // scene.add(directionalLight);

// const pointLight = new THREE.PointLight(0xffffff, 2, 1000);

// scene.add(pointLight);

// // initialize the camera
// const camera = new THREE.PerspectiveCamera(
//   35,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   900
// );
// camera.position.z = 100;
// camera.position.y = 5;

// // initialize the renderer
// const canvas = document.querySelector("canvas.threejs");
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
//   antialias: true,
// });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// // instantiate the controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// window.addEventListener("resize", () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });

// console.log(scene.children);

// // render the scene
// const renderloop = () => {
//   planetMeshes.forEach((planet, index) => {
//     // planet.rotateY(planets[index].speed);
//     planet.rotation.y += planets[index].speed;

//     planet.position.x = Math.sin(planet.rotation.y) * planets[index].distance;
//     planet.position.z = Math.cos(planet.rotation.y) * planets[index].distance;

//     planet.children.forEach((moon, moonIndex) => {
//       moon.rotation.y += planets[index].moons[moonIndex].speed;

//       moon.position.x =
//         Math.sin(moon.rotation.y) * planets[index].moons[moonIndex].distance;
//       moon.position.z =
//         Math.cos(moon.rotation.y) * planets[index].moons[moonIndex].distance;
//     });
//   });

//   controls.update();
//   // mesh.rotateY(0.01); // one way to rotate the geometry
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(renderloop);
// };

// renderloop();

// import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// // initialize the scene
// const scene = new THREE.Scene();

// // initialize the loader
// const textureLoader = new THREE.TextureLoader();

// // adding textures
// const sunTexture = textureLoader.load("./textures/2k_sun.jpg");

// const mercuryTexture = textureLoader.load("./textures/2k_mercury.jpg");

// const marsTexture = textureLoader.load("./textures/2k_mars.jpg");

// const venusTexture = textureLoader.load("./textures/2k_venus_surface.jpg");

// const earthTexture = textureLoader.load("./textures/2k_earth_daymap.jpg");

// const moonTexture = textureLoader.load("./textures/2k_moon.jpg");

// // initialize the group
// const group = new THREE.Group();

// // initialize the geometry

// const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// // initialize the material - USING MeshPhysicalMaterial
// const sunMaterial = new THREE.MeshStandardMaterial({
//   map: sunTexture,
//   emissiveMap: sunTexture,
//   emissive: 0xffcc00,
//   emissiveIntensity: 2,
// });
// // const sunMaterial = new THREE.MeshPhysicalMaterial({
// //   map: sunTexture,
// //   roughness: 0.4,
// //   metalness: 0.2,
// //   emissiveMap: sunTexture,
// //   emissiveIntensity: 1.5,
// //   emissive: "#fb923c",
// // });
// const mercuryMaterial = new THREE.MeshStandardMaterial({
//   map: mercuryTexture,
// });
// // const mercuryMaterial = new THREE.MeshPhysicalMaterial({
// //   map: mercuryTexture,
// //   roughness: 0.4,
// //   metalness: 0.2,
// //   emissiveMap: mercuryTexture,
// //   emissiveIntensity: 1.5,
// //   emissive: "gray",
// // });
// const marsMaterial = new THREE.MeshStandardMaterial({
//   map: marsTexture,
// });
// // const marsMaterial = new THREE.MeshPhysicalMaterial({
// //   map: marsTexture,
// //   roughness: 0.4,
// //   metalness: 0.2,
// //   emissiveMap: marsTexture,
// //   emissiveIntensity: 1.5,
// //   emissive: "brown",
// // });

// const venusMaterial = new THREE.MeshStandardMaterial({
//   map: venusTexture,
// });
// const earthMaterial = new THREE.MeshStandardMaterial({
//   map: earthTexture,
// });

// const moonMaterial = new THREE.MeshStandardMaterial({
//   map: moonTexture,
// });
// // const venusMaterial = new THREE.MeshPhysicalMaterial({
// //   map: venusTexture,
// //   roughness: 0.4,
// //   metalness: 0.2,
// //   emissiveMap: venusTexture,
// //   emissiveIntensity: 1.5,
// //   emissive: "#f87171",
// // });
// // const earthMaterial = new THREE.MeshPhysicalMaterial({
// //   map: earthTexture,
// //   roughness: 0.4,
// //   metalness: 0.2,
// //   emissiveMap: earthTexture,
// //   emissiveIntensity: 1.5,
// //   emissive: "cyan",
// // });

// // const moonMaterial = new THREE.MeshPhysicalMaterial({
// //   map: moonTexture,
// //   roughness: 0.4,
// //   metalness: 0.2,
// //   emissiveMap: moonTexture,
// //   emissiveIntensity: 2,
// //   emissive: "white",
// // });

// // initialize the mesh

// const sun = new THREE.Mesh(sphereGeometry, sunMaterial);

// // scale the sun
// sun.scale.setScalar(5);

// scene.add(sun);

// const planets = [
//   {
//     name: "Mercury",
//     radius: 0.5,
//     distance: 10,
//     speed: 0.01,
//     material: mercuryMaterial,
//     moons: [],
//   },
//   {
//     name: "Venus",
//     radius: 0.8,
//     distance: 15,
//     speed: 0.007,
//     material: venusMaterial,
//     moons: [],
//   },
//   {
//     name: "Earth",
//     radius: 1,
//     distance: 20,
//     speed: 0.005,
//     material: earthMaterial,
//     moons: [
//       {
//         name: "Moon",
//         radius: 0.3,
//         distance: 3,
//         speed: 0.015,
//       },
//     ],
//   },
//   {
//     name: "Mars",
//     radius: 0.7,
//     distance: 25,
//     speed: 0.003,
//     material: marsMaterial,
//     moons: [
//       {
//         name: "Phobos",
//         radius: 0.1,
//         distance: 2,
//         speed: 0.02,
//       },
//       {
//         name: "Deimos",
//         radius: 0.2,
//         distance: 3,
//         speed: 0.015,
//         color: 0xffffff,
//       },
//     ],
//   },
// ];

// const createPlanet = (planet) => {
//   // initialize the planet mesh
//   const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);

//   // set the scale and position
//   planetMesh.scale.setScalar(planet.radius);
//   planetMesh.position.x = planet.distance;

//   return planetMesh;
// };

// const createMoon = (moon) => {
//   const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
//   moonMesh.scale.setScalar(moon.radius);
//   moonMesh.position.x = moon.distance;
//   return moonMesh;
// };

// const planetMeshes = planets.map((planet) => {
//   const planetMesh = createPlanet(planet);
//   // add it to our scene
//   scene.add(planetMesh);

//   // add moons if any
//   planet.moons.forEach((moon) => {
//     const moonMesh = createMoon(moon);
//     planetMesh.add(moonMesh);
//   });

//   return planetMesh;
// });

// // // Earth material
// // const earthMaterial = new THREE.MeshPhysicalMaterial({
// //   color: "blue",
// // });

// // // initialize the earth mesh
// // const earth = new THREE.Mesh(sphereGeometry, earthMaterial);

// // // position earth
// // earth.position.x = 10;

// // scene.add(earth);

// // // Moon material
// // const moonMaterial = new THREE.MeshPhysicalMaterial({
// //   color: "grey",
// // });

// // // initialize the moon mesh
// // const moon = new THREE.Mesh(sphereGeometry, moonMaterial);

// // // scale the moon
// // moon.scale.setScalar(0.3);

// // // position moon
// // moon.position.x = 2;

// // // Local space for the moon - make the moon a child of the earth
// // earth.add(moon);

// // initialize the light - using stronger lights for better physical material rendering
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
// directionalLight.position.set(0, 4, 0);
// // scene.add(directionalLight);

// const pointLight = new THREE.PointLight(0xffffff, 2, 1000);

// scene.add(pointLight);

// // initialize the camera
// const camera = new THREE.PerspectiveCamera(
//   35,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   900
// );
// camera.position.z = 100;
// camera.position.y = 5;

// // initialize the renderer
// const canvas = document.querySelector("canvas.threejs");
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
//   antialias: true,
// });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// // instantiate the controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// window.addEventListener("resize", () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });

// console.log(scene.children);

// // render the scene
// const renderloop = () => {
//   planetMeshes.forEach((planet, index) => {
//     // planet.rotateY(planets[index].speed);
//     planet.rotation.y += planets[index].speed;

//     planet.position.x = Math.sin(planet.rotation.y) * planets[index].distance;
//     planet.position.z = Math.cos(planet.rotation.y) * planets[index].distance;

//     planet.children.forEach((moon, moonIndex) => {
//       moon.rotation.y += planets[index].moons[moonIndex].speed;

//       moon.position.x =
//         Math.sin(moon.rotation.y) * planets[index].moons[moonIndex].distance;
//       moon.position.z =
//         Math.cos(moon.rotation.y) * planets[index].moons[moonIndex].distance;
//     });
//   });

//   controls.update();
//   // mesh.rotateY(0.01); // one way to rotate the geometry
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(renderloop);
// };

// renderloop();

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add textureLoader
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath("/textures/cubeMap/");

// adding textures
const sunTexture = textureLoader.load("/textures/2k_sun.jpg");
sunTexture.colorSpace = THREE.SRGBColorSpace;
const mercuryTexture = textureLoader.load("/textures/2k_mercury.jpg");
mercuryTexture.colorSpace = THREE.SRGBColorSpace;
const venusTexture = textureLoader.load("/textures/2k_venus_surface.jpg");
venusTexture.colorSpace = THREE.SRGBColorSpace;
const earthTexture = textureLoader.load("/textures/2k_earth_daymap.jpg");
earthTexture.colorSpace = THREE.SRGBColorSpace;
const marsTexture = textureLoader.load("/textures/2k_mars.jpg");
marsTexture.colorSpace = THREE.SRGBColorSpace;
const moonTexture = textureLoader.load("/textures/2k_moon.jpg");
moonTexture.colorSpace = THREE.SRGBColorSpace;

const backgroundCubemap = cubeTextureLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);

scene.background = backgroundCubemap;

// add materials
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});

// add stuff here
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
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
  const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);
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
  scene.add(planetMesh);

  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  });
  return planetMesh;
});

console.log(planetMeshes);

// add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1000);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 100;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render loop
const renderloop = () => {
  planetMeshes.forEach((planet, planetIndex) => {
    planet.rotation.y += planets[planetIndex].speed;
    planet.position.x =
      Math.sin(planet.rotation.y) * planets[planetIndex].distance;
    planet.position.z =
      Math.cos(planet.rotation.y) * planets[planetIndex].distance;
    planet.children.forEach((moon, moonIndex) => {
      moon.rotation.y += planets[planetIndex].moons[moonIndex].speed;
      moon.position.x =
        Math.sin(moon.rotation.y) *
        planets[planetIndex].moons[moonIndex].distance;
      moon.position.z =
        Math.cos(moon.rotation.y) *
        planets[planetIndex].moons[moonIndex].distance;
    });
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
