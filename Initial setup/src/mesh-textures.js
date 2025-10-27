import * as THREE from "three";
import { Pane } from "tweakpane";

// initialize the scene
const scene = new THREE.Scene();

// initialize the loader
const textureLoader = new THREE.TextureLoader();

// initialize the pane
const pane = new Pane();

// initialize the geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);
const uv2 = new THREE.BufferAttribute(geometry.attributes.uv.array, 2);
geometry.setAttribute("uv2", uv2);

// load the grass textures
const grassAlbedo = textureLoader.load(
  "./textures/grassy-meadow1-bl/grassy-meadow1_albedo.png"
);
const grassAo = textureLoader.load(
  "./textures/grassy-meadow1-bl/grassy-meadow1_ao.png"
);
const grassHeight = textureLoader.load(
  "./textures/grassy-meadow1-bl/grassy-meadow1_height.png"
);
const grassMetallic = textureLoader.load(
  "./textures/grassy-meadow1-bl/grassy-meadow1_metallic.png"
);
const grassNormal = textureLoader.load(
  "./textures/grassy-meadow1-bl/grassy-meadow1_normal-ogl.png"
);
const grassRoughness = textureLoader.load(
  "./textures/grassy-meadow1-bl/grassy-meadow1_roughness.png"
);

// Load the Ground Wood Chips textures
const groundWoodAlbedo = textureLoader.load(
  "./textures/GroundWoodChips001/GroundWoodChips001_COL_8K.jpg"
);
const groundWoodAo = textureLoader.load(
  "./textures/GroundWoodChips001/GroundWoodChips001_AO_8K.jpg"
);
const groundWoodHeight = textureLoader.load(
  "./textures/GroundWoodChips001/GroundWoodChips001_DISP_8K.jpg"
);
const groundWoodNormal = textureLoader.load(
  "./textures/GroundWoodChips001/GroundWoodChips001_NRM_8K.jpg"
);
const groundWoodRoughness = textureLoader.load(
  "./textures/GroundWoodChips001/GroundWoodChips001_GLOSS_8K.jpg"
);
const groundWoodReflection = textureLoader.load(
  "./textures/GroundWoodChips001/GroundWoodChips001_REFL_8K.jpg"
);

// load rocky textures

const rockyAlbedo = textureLoader.load(
  "./textures/rocky-rugged-terrain-bl/rocky-rugged-terrain_1_albedo.png"
);
const rockyAo = textureLoader.load(
  "./textures/rocky-rugged-terrain-bl/rocky-rugged-terrain_1_ao.png"
);
const rockyHeight = textureLoader.load(
  "./textures/rocky-rugged-terrain-bl/rocky-rugged-terrain_1_height.png"
);
const rockyMetallic = textureLoader.load(
  "./textures/rocky-rugged-terrain-bl/rocky-rugged-terrain_1_metallic.png"
);
const rockyNormal = textureLoader.load(
  "./textures/rocky-rugged-terrain-bl/rocky-rugged-terrain_1_normal-ogl.png"
);
const rockyRoughness = textureLoader.load(
  "./textures/rocky-rugged-terrain-bl/rocky-rugged-terrain_1_roughness.png"
);

// grass material pane
const grassPane = pane.addFolder({ title: "Grass Material", expanded: true });

const grassMaterial = new THREE.MeshPhongMaterial({
  map: grassAlbedo,
  aoMap: grassAo,
  displacementMap: grassHeight,
  displacementScale: 0.1,
  normalMap: grassNormal,
  metalnessMap: grassMetallic,
  roughnessMap: grassRoughness,
});

grassPane.addBinding(grassMaterial, "metalness", {
  min: 0,
  max: 1,
  step: 0.01,
});
grassPane.addBinding(grassMaterial, "roughness", {
  min: 0,
  max: 1,
  step: 0.01,
});
grassPane.addBinding(grassMaterial, "displacementScale", {
  min: 0,
  max: 1,
  step: 0.01,
});
grassPane.addBinding(grassMaterial, "aoMapIntensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
