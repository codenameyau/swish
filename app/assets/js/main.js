/*-------JSHint Directives-------*/
/* global THREE, THREEGEN, Stats */
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
  zoomY : 400,
  zoomZ : 0,
};

var CONTROLS = {
  enabled : true,
  userPan : true,
  userPanSpeed : 4,
  minDistance : 10.0,
  maxDistance : 1100.0,
  maxPolarAngle : (Math.PI/180) * 85,
};

var RENDERER = {
  antialias : false,
};

var PATHS = {
  texture : 'assets/img/texture/',
  environment : 'assets/img/environment/',
};

var COURT = {
  length : 1040,
  width : 600,
};

/********************
 * Global Variables *
 ********************/

// Built-in
var scene, camera, renderer;

// Plugins
var controls, stats, engine;

// Scene objects
var basketball;


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

function basicBasketball(size) {
  size = size || 5;
  var textureImage = PATHS.texture + 'basketball.png';
  var geometry = new THREE.SphereGeometry( size, 64, 64 );
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
  engine.update();
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

  // ThreeGen game engine
  engine = new THREEGEN.GameEngine();

  /***************
   * Custom Code *
   ***************/

  // Example: light sources
  var lightAmbient = new THREE.AmbientLight(0x666666);
  var lightSource = new THREE.DirectionalLight(0xa2a2a2);
  lightSource.position.set(0.5, 1, 0);
  scene.add(lightAmbient);
  scene.add(lightSource);

  // Add Object: floor court
  var texturePath = PATHS.environment + 'basketball-court.png';
  var textureImage = new THREE.ImageUtils.loadTexture( texturePath );
  var floorMaterial = new THREE.MeshLambertMaterial({ map: textureImage });
  var floorCourt = basicFloor(COURT.length, COURT.width, floorMaterial);
  floorCourt.rotation.x = degToRad(-90);
  scene.add(floorCourt);

  // Add Object: basketball
  var ballSize = 10;
  basketball = basicBasketball(ballSize);
  basketball.position.set(0, 100, 0);
  scene.add(basketball);
  engine.add(basketball);

}


/**********************
 * Render and Animate *
 **********************/
initializeScene();
animateScene();
