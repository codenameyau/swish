/* exported THREEGEN */
'use strict';


// Function Constructor
function GameEngine() {

 /**************************
  * GameEngine: Properties *
  **************************/
  this.gravity  = -10;
  this.entities = {};

 /*******************************
  * GameEngine: Private Methods *
  *******************************/

}

/*****************************
* GameEngine: Public Methods *
******************************/
GameEngine.prototype.update = function() {
};

GameEngine.prototype.add = function(object) {
  var objectID = this.generateID();

};


GameEngine.prototype.generateID = function() {
  // Generates a random base 36 string
  return Math.random().toString(36).substring(2);
};


// Export: THREEGEN
var THREEGEN = {

  // Export: GameEngine
  GameEngine : GameEngine,

};

