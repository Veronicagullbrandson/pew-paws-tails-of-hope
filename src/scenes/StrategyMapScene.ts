import Phaser from 'phaser';
import { Player } from './../entities/Player';
import { Enemy } from './../entities/Enemy';

export class StrategyMapScene extends Phaser.Scene {
    private player: Player

    constructor() {
      super('StrategyMapScene');
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
        this.load.audio('enemySound1', 'assets/audio/enemy-sound1.mp3');
        this.load.audio('enemySound2', 'assets/audio/enemy-sound2.mp3');
        this.load.spritesheet('projectileSprite', 'assets/sprites/bollElla.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("Tileset", "tiles");
        const floor = map.createLayer('Floor', tileset, 0, 0);
        const collision = map.createLayer('Collision', tileset, 0, 0);
        collision.setCollisionByExclusion([-1], true);

        this.player = new Player(this, 300, 300);
        this.enemy = new Enemy(this, 400, 300);
        this.physics.add.collider(this.player, collision);
        this.physics.add.collider(this.enemy, collision);
    }

    update(): void {
        this.player.update();
        this.enemy.update();
    }
}
