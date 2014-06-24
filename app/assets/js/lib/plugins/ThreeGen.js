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

/*****************************
* GameEngine: Public Methods *
******************************/
GameEngine.prototype.update = function() {
};



GameEngine.prototype.add = function(object, setCollision, setVelocity) {
  // Adds object to game engine entities
  setCollision = setCollision || 1;
  setVelocity  = setVelocity  || {x: 0, y: 0, z: 0};

  // Create entity with incremental ID
  var objectID = this.entityCount;
  this.entityCount += 1;

  // Define entity properties
  this.entities[objectID] = {
    mesh : object,
    velocity : new THREE.Vector3(setVelocity.x, setVelocity.y, setVelocity.z),
    collision : setCollision,
  };

  console.log(this.entities);

};



// Export: THREEGEN
var THREEGEN = {

  // Export: GameEngine
  GameEngine : GameEngine,

};

