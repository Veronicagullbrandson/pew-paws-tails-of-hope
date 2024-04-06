import Phaser from 'phaser';
import { GridEngine } from 'grid-engine';

export class StrategyMapScene extends Phaser.Scene {

    constructor() {
      super('StrategyMapScene');
    }

    preload() {
      this.load.image('grass', 'assets/tiles/grass.png');
      this.load.spritesheet('idleSprite', 'assets/sprites/7 idle.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        this.add.image(100, 100, 'grass');
        // Create an animation from the loaded sprite sheet
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idleSprite', { start: 0, end: 6 }), // Assuming 4 frames for the idle animation
            frameRate: 3,
            repeat: -1 // Loop forever
        });

        // Display the sprite and play the animation
        const sprite = this.add.sprite(200, 200, 'idleSprite').play('idle');
    }
}