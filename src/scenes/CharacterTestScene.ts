
import Phaser from 'phaser';
import { Player } from './../entities/Player';

export class CharacterTestScene extends Phaser.Scene {
    private player: Player
    constructor() {
      super('CharacterTestScene');
    }

    preload() {
      this.load.image('grass', 'assets/tiles/grass.png');
      this.load.image('cat', 'assets/tiles/grass.png');
      this.load.spritesheet('runSprite', 'assets/sprites/Enzo walk.png', { frameWidth: 28, frameHeight: 32 });
      this.load.image('projectile', 'assets/tiles/grass.png');
      this.load.audio('bananljud', 'assets/audio/bananljud.mp3');  
      this.load.spritesheet('projectileSprite', 'assets/sprites/bollElla.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        this.player = new Player(this, 100, 200);
    }

    update(): void {
        this.player.update();
    }
}
