import Phaser from 'phaser';

export class WelcomeScene extends Phaser.Scene {
  constructor() {
    super('WelcomeScene');
  }

  preload() {
    // Load any assets needed for the welcome screen
    this.load.image('background', 'assets/welcome/screen.png');
    this.load.image('startButton', 'assets/welcome/start.png');
    this.load.audio('backgroundMusic', 'assets/audio/background starting sound.mp3');
    this.load.image('grass', 'assets/tiles/grass.png');
  }

  create() {
    // Create the welcome screen
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background').setDisplaySize(400, 400);
    const startButton = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 240, 'startButton').setInteractive().setDisplaySize(160, 40);
    const characterButton = this.add.image(50, 50, 'grass').setInteractive().setDisplaySize(20, 20);


    startButton.on('pointerover', () => {
      startButton.y -= 2; // Move the button up by 2 pixels
    });

    startButton.on('pointerout', () => {
      startButton.y += 2; // Move the button back down by 2 pixels when the pointer is no longer over it
    });

    startButton.on('pointerdown', () => {
      this.scene.start('StrategyMapScene');
    });

    characterButton.on('pointerdown', () => {
      this.scene.start('ServerTestScene');
      this.sound.play('backgroundMusic', { loop: false });
    });
    startButton.on('pointerdown', () => {
      this.sound.stopByKey('backgroundMusic'); // Stop the background music before changing the scene
      this.scene.start('ServerTestScene');
    });

    this.sound.play('backgroundMusic', { loop: true, volume:0.25 });
  }
}
