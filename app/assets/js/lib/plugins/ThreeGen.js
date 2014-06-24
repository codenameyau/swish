/* exported THREEGEN */
'use strict';


// Function Constructor
function GameEngine() {

 /**************************
  * GameEngine: Properties *
  **************************/
  var engine  = {};
  engine.gravity = -10;

 /*****************************
  * GameEngine: Public Methods *
  *****************************/

  // Updates object property
  engine.update = function() {

  };

  // Adds object to world
  engine.add = function(object) {
    console.log(object);
  };

  return engine;
}


var THREEGEN = {

  // Properties
  gravity : -9.8,
  GameEngine : GameEngine,

};

