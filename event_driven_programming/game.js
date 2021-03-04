const EventEmitter = require('events');

class UI {
  constructor() {
    this.lifes = -1;
    this.round = -1;
    this.enemies = -1;

    eventManager.on("game over", (score) => { console.log("GAME OVER\nFinal Score: ", score) });
    eventManager.on("new round", () => this.round++ );
    eventManager.on("INIT", (arr) => {
      [this.lifes, this.round, this.enemies] = [...arr];
    });
    eventManager.on("battle", (actors) => {
      this.renderWeaponChoice(actors); 
      this.renderWinner(actors.winner);
      if (actors.winner instanceof Player) {
        this.enemies++;
        this.enemyDefeated();
      } else {
        this.lifes--;
        this.playerLooseLife();
      }
      this.renderLine();
    });
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

class Actor {
  constructor(name) { this.name = name }

  static WEAPONS = ["sword", "shield", "spell"];

  getWeapon() { return Actor.WEAPONS[Math.floor(Math.random() * 3)] }

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

    eventManager.emit("battle", { actor1, actor2, winner });

    if (winner instanceof Enemy) {
      eventManager.emit("life lost");
      this.lifes--;
    }
    else eventManager.emit("enemy defeated");
  }

  battle(enemies) { enemies.forEach(e => { if (this.lifes > 0) this.fight(e) });
  }
}

class Enemy extends Actor {
  constructor(name = "Monster") { super(name) }
}

class GameManager {
  constructor(lifes = 3) {
    this.lifes = lifes;
    this.gameOver = false;
    this.round = 1;
    this.enemiesDefeated = 0;

    eventManager.on("life lost", () => this.lifes--);
    eventManager.on("enemy defeated", () => this.enemiesDefeated++);
  }

  play(round) {
    eventManager.emit("INIT", [this.lifes, this.round, this.enemiesDefeated]);
    while(!this.gameOver) {
      if (this.lifes <= 0) { 
        this.gameOver = true;  
        eventManager.emit("game over", this.score());
        break;
      }
      
      round();
      this.round++; // event round state changes here
      eventManager.emit("new round");
    }
  }

  score() { return this.enemiesDefeated * this.round }

  getEnemies(type) {
    let enemies = [];
    for (let i = 0 ; i < this.round ; i++) { enemies.push(new type()) }
    return enemies;
  }
}

const initialLifes = 3;
const eventManager = new EventEmitter(); // handles communication.
const game = new GameManager(initialLifes); // manages state of the game.
const player = new Player("Daniel", initialLifes); // actor.
const view = new UI(); // render actor events and render game state.
let enemies = []; // actor

game.play(() => {
  enemies = game.getEnemies(Enemy);
  view.renderState();
  player.battle(enemies); // state change here, enemies, lifes.
});

