import Phaser from 'phaser';
import { Player } from './../entities/Player';
import { Enemy } from './../entities/Enemy';

export class StrategyMapScene extends Phaser.Scene {
    private player: Player;
    private enemy: Enemy;
    private healthBar: Phaser.GameObjects.Graphics;
    private enemies: Array<Enemy>;
    private collision: Tilemap;

    constructor() {
      super('StrategyMapScene');
      this.enemies = [];
    }

    preload() {
        this.load.image("tiles", "assets/tiles/punyworld-overworld-tileset.png");
        this.load.tilemapTiledJSON("map", "maps/TestTilemap2.json");
        this.load.image('cat', 'assets/tiles/grass.png');
        this.load.image('projectile', 'assets/tiles/grass.png');
        this.load.spritesheet('runSprite', 'assets/sprites/Enzo walk.png', { frameWidth: 28, frameHeight: 32 });
        this.load.spritesheet('runSpriteEnemy', 'assets/sprites/purple_walk.png', { frameWidth: 28, frameHeight: 32 });
        //this.load.spritesheet('runSprite', 'assets/sprites/7 walk.png', { frameWidth: 16, frameHeight: 16 });
        this.load.audio('bananljud', 'assets/audio/bananljud.mp3');
        this.load.audio('EnemyDead', 'assets/audio/Enemy-dead.mp3');
        this.load.audio('enemySound1', 'assets/audio/enemy-sound1.mp3');
        this.load.audio('enemySound2', 'assets/audio/enemy-sound2.mp3');
        this.load.spritesheet('projectileSprite', 'assets/sprites/bollElla.png', { frameWidth: 16, frameHeight: 16 });
        this.load.audio('backgroundMusic', 'assets/audio/background map.mp3');
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("Tileset", "tiles");
        const floor = map.createLayer('Floor', tileset, 0, 0);
        this.collision = map.createLayer('Collision', tileset, 0, 0);
        this.collision.setCollisionByExclusion([-1], true);

        this.player = new Player(this, 300, 300);
        this.enemies.push(new Enemy(this, 400, 300));
        this.physics.add.collider(this.player, this.collision);
        this.physics.add.collider(this.enemies[0], this.collision);

        // Lägg till en timer som skadar fienden efter 5 sekunder
        this.time.addEvent({
            delay: 5000, // 5000 ms = 5 sekunder
            callback: () => {
                this.enemies[0].takeDamage(1); // Skadar fienden med 10 poäng
            },
            callbackScope: this,
            loop: false // Om du vill att detta ska upprepas, sätt loop till true
        });

        //this.time.addEvent({
        //    delay: 10000, // 5000 ms = 5 sekunder
        //    callback: () => {
        //        this.player.PlayertakeDamage(1); // Skadar spelaren med 1 poäng
        //    },
        //    callbackScope: this,
        //    loop: true // Om du vill att detta ska upprepas, sätt loop till true
        //});
        this.healthBar = this.add.graphics();
        

        // Spela upp bakgrundsmusiken med 25% volym
        
        this.sound.play('backgroundMusic', { volume: 0.25, loop: true });

    }
updateHealthBar() {
    this.healthBar.clear();
    this.healthBar.fillStyle(0xff0000,1);
    this.healthBar.fillRect(20,20,20*this.player.health, 20)
}
    update(): void {
        if (Math.floor(Math.random() * 400) == 0) {
            this.enemies.push(new Enemy(this, 400, 300));
            this.physics.add.collider(this.enemies[this.enemies.length - 1], this.collision);
        }
        this.player.update();
        this.updateHealthBar();

        if(this.player && !this.player.isDead) {
        for (let i = 0; i < this.enemies.length; i++) {
          if(this.enemies[i].body != undefined) {
            this.enemies[i].update();
          }
        }
    }
}
