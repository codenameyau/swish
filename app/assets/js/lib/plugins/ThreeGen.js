/*-------JSHint Directives-------*/
/* global THREE                  */
/* exported THREEGEN             */
/*-------------------------------*/
'use strict';

// Global variables
var delta;

// Function Constructor
function GameEngine(scene) {

 /**************************
  * GameEngine: Properties *
  **************************/
  this.entities = {};
  this.gravity  = -10;
  this.entityCount = 0;
  this.scene = scene;
  this.clock = new THREE.Clock();

 /*******************************
  * GameEngine: Private Methods *
  *******************************/

}

/******************************
 * GameEngine: Public Methods *
 ******************************/
GameEngine.prototype.update = function() {

  // Clock delta
  delta = this.clock.getDelta();

  // Update entity positions
  for (var item in this.entities) {
    var entity = this.entities[item];

    // Update positions of movable objects
    if (entity.collision > 0) {

      // Object is falling -> update position
      if (entity.mesh.position.y > 0) {
        entity.mesh.position.x += entity.velocity.x;
        entity.mesh.position.y += entity.velocity.y;
        entity.mesh.position.z += entity.velocity.z;
      }

      // Object hits ground -> delete
      else {
        this.destroy(item);
        continue;
      }

      // Increase acceleration
      entity.velocity.x += entity.acceleration.x * delta;
      entity.velocity.y += entity.acceleration.y * delta;
      entity.velocity.z += entity.acceleration.z * delta;

    }
  }

};


// Add an object that interacts with world
GameEngine.prototype.add = function(object, options) {
  // Check default arguments
  var setCollision = this.hasProperty(options, 'collision', 1);
  var maxBounce = this.hasProperty(options, 'maxBounce', 5);
  var bounciness = this.hasProperty(options, 'bounciness', 0);

  // Default velocity (x,y,z)
  var vX = this.hasProperty(options, 'vX', 0);
  var vY = this.hasProperty(options, 'vY', 0);
  var vZ = this.hasProperty(options, 'vZ', 0);

  // Default acceleration (x,y,z)
  var aX = this.hasProperty(options, 'aX', 0);
  var aY = this.hasProperty(options, 'aY', this.gravity);
  var aZ = this.hasProperty(options, 'aZ', 0);

  // Create entity with incremental ID
  var objectID = this.entityCount;
  this.entityCount += 1;

  // Define entity properties
  this.entities[objectID] = {
    velocity : new THREE.Vector3(vX, vY, vZ),
    acceleration : new THREE.Vector3(aX, aY, aZ),
    collision : setCollision,
    maxBounce : maxBounce,
    bounciness : bounciness,
    bounces : 0,
    mesh : object,
  };

  // Returns entity id
  this.scene.add(object);
  return objectID;
};


// Include an object which does not interact with world
GameEngine.prototype.include = function(object) {
  var options = {
    collision: 0,
    bounciness: 0,
    vX: 0,
    vY: 0,
    vZ: 0,
    aX: 0,
    aY: 0,
    aZ: 0
  };
  this.add(object, options);
};


// Destroy entity from world
GameEngine.prototype.destroy = function(objectID) {
  var entity = this.entities[objectID];
  this.scene.remove(entity.mesh);
  delete this.entities[objectID];
};

/*******************************
 * GameEngine: Private Methods *
 *******************************/

// Checks that object has property, otherwise return default value
GameEngine.prototype.hasProperty = function(object, property, value) {
  if (object && typeof object[property] !== 'undefined') {
    value = object[property];
  }
  return value;
};


// Export: THREEGEN
var THREEGEN = {

  // Export: GameEngine
  GameEngine : GameEngine,

};
