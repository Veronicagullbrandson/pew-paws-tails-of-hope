import Phaser from 'phaser';
import { Player } from './../entities/Player';

export class StrategyMapScene extends Phaser.Scene {
    private player: Player

    constructor() {
      super('StrategyMapScene');
    }

    preload() {
        this.load.image("tiles", "assets/tiles/punyworld-overworld-tileset.png");
        this.load.tilemapTiledJSON("map", "maps/TestTilemap2.json");
        this.load.image('cat', 'assets/tiles/grass.png');
        this.load.spritesheet('runSprite', 'assets/sprites/7 walk.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("Tileset", "tiles");
        const floor = map.createLayer('Floor', tileset, 0, 0);
        const wall = map.createLayer('Collision', tileset, 0, 0);
        this.player = new Player(this, 100, 200);
    }

    update(): void {
        this.player.update();
    }
}
