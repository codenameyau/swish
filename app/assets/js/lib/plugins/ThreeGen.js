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
};



GameEngine.prototype.add = function(object, setVelocity, setCollision) {
  // Check default arguments
  var velX = this.hasProperty(setVelocity, 'x', 0);
  var velY = this.hasProperty(setVelocity, 'y', this.gravity);
  var velZ = this.hasProperty(setVelocity, 'z', 0);
  setCollision = setCollision || 1;

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
