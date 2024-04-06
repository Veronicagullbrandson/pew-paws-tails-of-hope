import Phaser from 'phaser';
import { GridEngine } from 'grid-engine';

export class StrategyMapScene extends Phaser.Scene {

    constructor() {
      super('StrategyMapScene');
    }

    preload() {
      this.load.image('grass', 'assets/tiles/grass.png');
    }

    create() {
        this.add.image(100, 100, 'grass');
    }
}