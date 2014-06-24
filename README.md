swish
=====

Three.js basketball game


##ThreeGen Game Engine Documentation

###Entities

#####Create an entity

Default values: collision = 1, velocity = {x: 0, y, gravity, z: 0}
```javascript
var basketball = THREE.Mesh(geometry, material);
var entityID = engine.add(basketball);
```

Add entity with different collision and velocity
```javascript
var basketball = THREE.Mesh(geometry, material);
var avoidCollision = 2;
var velocity = {x: 20, y: engine.gravity, z: 0};
var entityID = engine.add(basketball, avoidCollision, velocity);
```


###Collision
* -1 -> No collision with any objects
*  0 -> Environment, doesn't move
*  1 -> Collide with everything except for 0 or 1
*  2 -> Collide with everything except for 0 or 2
*  ... and so on
*  n -> Collide with everything except for 0 or n

