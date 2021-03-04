// You are NOT going to write Gameplay Code.
// YOU WILL ONLY BE WRITING EVENTS

// What to focus on?
//  - Relations between entities.
//  - Properties on each class
//  - Events
//  - Architecture

// EVENT ANATOMY
//  - Listener/Observer
//  - Emitter
//  - Event name && data.

// WHAT DO WE WANT? - Extreme decoupling
//   - No references from one class into another.
//   - No direct access of properties outside the class.


const EventEmitter = require('events');
const eventManager = new EventEmitter(); // handles communication among entities.
eventManager.on('event name', callbackFunction(data)); // Observer/listener
eventManager.emit('event name', data); // Emitter

const initialLifes = 3;

class GameManager {}
class UI {}
class Actor {}
class Player extends Actor {}
class Enemy extends Actor {}

// UNDERSTANDING ENTITIES
const game = new GameManager(initialLifes); // Manages state of the game.
// LISTENS FOR EVENTS ---> from player
// EMIT EVENTS ---> for UI
// lifes ---> So that game can stop when lifes === 0
// enemies defeated ---> for high score.
// rounds ---> for enemy creation and score calculation.

const player = new Player("Daniel", initialLifes); // actor.
// ONLY EMITS EVENTS ---> For UI & GameManager
// lifes --->  determine if can keep fighting battles.

const view = new UI(); // print to screen events and state of the game.
// ONLY LISTENS FOR EVENTS ---> From GameManager && Player.
// lifes ---> to display in UI
// enemies defeated ---> to display in UI
// rounds ---> to display level

let enemies = []; // Of type actor
// array of enemies for player to fight, used by game maanager.

game.play(() => {
  enemies = game.getEnemies(Enemy);
  view.renderState();
  player.battle(enemies); // state change here, enemies, lifes.
});

