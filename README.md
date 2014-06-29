swish
=====

Three.js basketball game

##Progress
Development progress has stopped for now. More to come in upcomming years.


##ThreeGen Game Engine Documentation

###Entities

#####Create an entity

Default values: collision = 0, velocity.y = -10
```javascript
var basketball = THREE.Mesh(geometry, material);
var entityID = engine.add(basketball);
```

Add entity with different collision and velocity
```javascript
var basketball = THREE.Mesh(geometry, material);
var options = {collision: 1, vX: 20, vY: 0};
var entityID = engine.add(basketball, options);
```


###Collision
* -1 -> No collision with any objects
*  0 -> Environment, doesn't move
*  1 -> Collide with everything except for 0 or 1
*  2 -> Collide with everything except for 0 or 2
*  ... and so on
*  n -> Collide with everything except for 0 or n

