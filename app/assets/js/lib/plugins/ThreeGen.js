/*-------JSHint Directives-------*/
/* global THREE                  */
/* exported THREEGEN             */
/*-------------------------------*/
'use strict';


// Function Constructor
function GameEngine() {

 /**************************
  * GameEngine: Properties *
  **************************/
  this.entities = {};
  this.gravity  = -10;
  this.entityCount = 0;

 /*******************************
  * GameEngine: Private Methods *
  *******************************/

}

/******************************
 * GameEngine: Public Methods *
 ******************************/
GameEngine.prototype.update = function() {

  // Update entity positions
  for (var item in this.entities) {
    var entity = this.entities[item];
    if (entity.mesh.position.y > 0) {
      entity.mesh.position.y += entity.velocity.y;
    }
  }

};


GameEngine.prototype.add = function(object, options) {
  // Check default arguments
  var setCollision = this.hasProperty(options, 'collision', 0);
  var velX = this.hasProperty(options, 'velX', 0);
  var velY = this.hasProperty(options, 'velY', this.gravity);
  var velZ = this.hasProperty(options, 'velZ', 0);

  // Create entity with incremental ID
  var objectID = this.entityCount;
  this.entityCount += 1;

  // Define entity properties
  this.entities[objectID] = {
    velocity : new THREE.Vector3(velX, velY, velZ),
    collision : setCollision,
    mesh : object,
  };

  // Returns entity id
  return objectID;
};


GameEngine.prototype.addStatic = function(object) {
  var options = {collision: 0, velX: 0, velY: 0, velZ: 0};
  this.add(object, options);
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
