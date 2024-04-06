import Phaser from 'phaser';
import { GridEngine } from 'grid-engine';

export class StrategyMapScene extends Phaser.Scene {
    private gridEngine!: GridEngine;

    constructor() {
      super('StrategyMapScene');
    }

    preload() {
        this.load.image("tiles", "assets/tiles/punyworld-overworld-tileset.png");
        this.load.tilemapTiledJSON("map", "maps/TestTilemap2.json");
        
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("Tileset", "tiles");
        const floor = map.createLayer('Floor', tileset, 0, 0);
        const wall = map.createLayer('Collision', tileset, 0, 0);
        const gridEngineConfig = {
          characters: [
            //{
            //  id: "player",
            //  sprite: playerSprite,
            //  walkingAnimationMapping: 6,
            //  startPosition: { x: 3, y: 3 },
            //},
          ],
        };
        this.gridEngine.create(map, gridEngineConfig);
    }
}
