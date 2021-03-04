// You are NOT going to write Gameplay Code.
// Your JOB is to understand the game architecture and...
// ...to link entities toghether via EVENTS
// YOU WILL ONLY BE WRITING EVENTS

// EVENT ANATOMY
//  - Listener/Observer
//  - Emitter
//  - Event name && data.

// Why? - Extreme decoupling
const EventEmitter = require('events');

class UI {
  constructor() {
    this.lifes = -1;
    this.round = -1;
    this.enemies = -1;
  }

  static GRAPHICS = {
    sword : String.fromCodePoint(0x2694), 
    shield : String.fromCodePoint(128737),
    spell : String.fromCodePoint(128293), 
    heart : String.fromCodePoint(9829),
    enemy : String.fromCodePoint(128127)
  }

  renderState() {
    console.log(UI.GRAPHICS.heart, this.lifes, UI.GRAPHICS.enemy, this.enemies ,"Level: " , this.round);
    this.renderLine();
      }

  enemyDefeated() { console.log("Player defeated 1", UI.GRAPHICS.enemy) }
  renderLine() { console.log('-'.repeat(42)) }
  playerLooseLife() { console.log("Player lost 1 ", UI.GRAPHICS.heart) }
  renderWinner(winner) { console.log("The winner is: ", winner.name) } 

  renderWeaponChoice({ actor1, actor2 }) {
    let actor1Str = `${actor1.name}'s' choice ${UI.GRAPHICS[actor1.weapon]}`;
    let actor2Str = `${actor2.name}'s' choice ${UI.GRAPHICS[actor2.weapon]}`; 
    console.log(actor1Str, " ", actor2Str);
  }
}

class Player extends Actor {
  constructor(playerName, lifes) {
    super (playerName);
    this.lifes = lifes;
  }

  fight(actor) {
    let playerWeapon, enemyWeapon, winner;
    do { [playerWeapon, enemyWeapon] = [this.getWeapon(), actor.getWeapon()] }
    while (playerWeapon === enemyWeapon)
    switch (playerWeapon) {
      case "sword": winner = enemyWeapon === "spell" ? this: actor; break;
      case "spell": winner = enemyWeapon === "shield" ? this: actor; break;
      case "shield": winner = enemyWeapon === "sword" ? this: actor; break;
    }
    let actor1 = { name: this.name, weapon: playerWeapon };
    let actor2 = { name: actor.name, weapon: enemyWeapon };

    // how to send battle information?
    //  What is the battle information?

    // What events to emmit?
    if (winner instanceof Enemy) {
      this.lifes--;
    }
    else {}; // ??
  }

  battle(enemies) { enemies.forEach(e => { if (this.lifes > 0) this.fight(e) });
  }
}

class Actor {
  constructor(name) { this.name = name }

  static WEAPONS = ["sword", "shield", "spell"];

  getWeapon() { return Actor.WEAPONS[Math.floor(Math.random() * 3)] }

}

class Enemy extends Actor {
  constructor(name = "Monster") { super(name) }
}

class GameManager {
  constructor(lifes) {
    // One event emit/listen per property
    this.lifes = lifes;
    this.gameOver = false;
    this.round = 1;
    this.enemiesDefeated = 0;
  }

  play(round) {
    while(!this.gameOver) {
      if (this.lifes <= 0) { 
        this.gameOver = true;  
        break;
      }
      
      round(); // callback invocation.
      this.round++; 
    }
  }

  score() { return this.enemiesDefeated * this.round }

  getEnemies(type) {
    let enemies = [];
    for (let i = 0 ; i < this.round ; i++) { enemies.push(new type()) }
    return enemies;
  }
}

const eventManager = new EventEmitter(); // handles communication among entities.

const initialLifes = 3;

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
// battle information ---> feedback to player
// battle result ---> feedback to player

let enemies = []; // Of type actor
// array of enemies for player to fight, used by game maanager.

game.play(() => {
  enemies = game.getEnemies(Enemy);
  view.renderState();
  player.battle(enemies); // state change here, enemies, lifes.
});

