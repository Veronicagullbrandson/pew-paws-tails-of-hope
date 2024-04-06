import Phaser from 'phaser';

export class WelcomeScene extends Phaser.Scene {
  constructor() {
    super('WelcomeScene');
  }

  preload() {
    // Load any assets needed for the welcome screen
    this.load.image('background', 'assets/welcome/screen.png');
    this.load.image('startButton', 'assets/welcome/start.png');
    this.load.audio('backgroundMusic', 'assets/audio/All Gifts Are Mine Full Song.mp3');
  }

  create() {
    // Create the welcome screen
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background').setDisplaySize(400, 400);
    const startButton = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 240, 'startButton').setInteractive().setDisplaySize(160, 40);

    startButton.on('pointerover', () => {
      startButton.y -= 2; // Move the button up by 2 pixels
    });

    startButton.on('pointerout', () => {
      startButton.y += 2; // Move the button back down by 2 pixels when the pointer is no longer over it
    });

    startButton.on('pointerdown', () => {
      this.scene.start('StrategyMapScene');
    });
    this.sound.play('backgroundMusic', { loop: true });
  }
}