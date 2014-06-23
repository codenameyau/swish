/*-------JSHint Directives-------*/
/* global THREE, Stats, dat      */
/*-------------------------------*/
'use strict';


/*******************
 * Manage Settings *
 *******************/

var CAMERA = {
  fov : 40,
  near : 1,
  far : 2000,
  zoomX : 0,
  zoomY : 800,
  zoomZ : 0,
};

var CONTROLS = {
  enabled : true,
  userPan : true,
  userPanSpeed : 1,
  minDistance : 10.0,
  maxDistance : 1100.0,
  maxPolarAngle : (Math.PI/180) * 90,
};

var RENDERER = {
  antialias : false,
};

var PATHS = {
  texture : 'assets/img/texture/',
  environment : 'assets/img/environment/',
};

/********************
 * Global Variables *
 ********************/

// Built-in
var scene, camera, renderer;

// Plugins
var controls, stats, gui;

// Scene objects
var crate;


/********************
 * Helper Functions *
 ********************/

function degToRad(degrees) {
  return Math.PI/180 * degrees;
}

function basicFloor(width, length, material) {
  width  = width  || 50;
  length = length || 20;
  var floorPlane = new THREE.PlaneGeometry(width, length);
  var floorMesh = new THREE.Mesh(floorPlane, material);
  return floorMesh;
}

function basicCrate(size) {
  size = size || 5;
  var textureImage = 'assets/img/texture/crate-small.jpg';
  var geometry = new THREE.BoxGeometry( size, size, size );
  var crateTexture = new THREE.ImageUtils.loadTexture( textureImage );
  var crateMaterial = new THREE.MeshLambertMaterial({ map: crateTexture });
  var crate = new THREE.Mesh( geometry, crateMaterial );
  return crate;
}


/***********************
 * Rendering Functions *
 ***********************/

function renderScene() {
  renderer.render( scene, camera );
}

function updateScene() {
  stats.update();
  controls.update();
}

function animateScene() {
  window.requestAnimationFrame( animateScene );
  renderScene();
  updateScene();
}

function resizeWindow() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function addToDOM(object) {
  var container = document.getElementById('canvas-body');
  container.appendChild(object);
}


/************************
 * Scene Initialization *
 ************************/

function initializeScene() {

  /*************************
   * Initialize Essentials *
   *************************/

  // Scene and window resize listener
  scene = new THREE.Scene();
  var canvasWidth  = window.innerWidth;
  var canvasHeight = window.innerHeight;
  window.addEventListener('resize', resizeWindow, false);

  // Camera and set initial view
  var aspectRatio  = canvasWidth/canvasHeight;
  camera = new THREE.PerspectiveCamera( CAMERA.fov, aspectRatio, CAMERA.near, CAMERA.far );
  camera.position.set( CAMERA.zoomX, CAMERA.zoomY, CAMERA.zoomZ );
  camera.lookAt(scene.position);
  scene.add(camera);

  // Add WebGL renderer to DOM
  renderer = new THREE.WebGLRenderer(RENDERER);
  renderer.setSize(canvasWidth, canvasHeight);
  addToDOM(renderer.domElement);


  /**********************
   * Initialize Plugins *
   **********************/

  // OrbitControls using mouse
  controls = new THREE.OrbitControls(camera);
  for (var key in CONTROLS) { controls[key] = CONTROLS[key]; }
  controls.addEventListener('change', renderScene);

  // Stats fps/ms box
  stats = new Stats();
  stats.setMode(0); // 0 -> fps, 1 -> ms
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  addToDOM(stats.domElement);

  // Dat gui (top right controls)
  gui = new dat.GUI( {height: 5 * 32 - 1} );


  /***************
   * Custom Code *
   ***************/

  // Example: light sources
  var lightAmbient = new THREE.AmbientLight(0x666666);
  var lightSource = new THREE.PointLight(0x888888);
  lightSource.position.set(0, 50, 80);
  scene.add(lightAmbient);
  scene.add(lightSource);

  // Example: basic floor grid
  var texturePath = PATHS.environment + 'basketball-court.png';
  var textureImage = new THREE.ImageUtils.loadTexture( texturePath );
  var floorMaterial = new THREE.MeshLambertMaterial({ map: textureImage });
  var floorCourt = basicFloor(1040, 600, floorMaterial);
  floorCourt.rotation.x = degToRad(-90);
  scene.add(floorCourt);

  // Example: crate with texture
  var crateSize = 10;
  crate = basicCrate(crateSize);
  crate.position.set(0, crateSize/2, 0);
  scene.add(crate);

}


/**********************
 * Render and Animate *
 **********************/

initializeScene();
animateScene();
