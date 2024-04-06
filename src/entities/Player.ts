import { Entity } from "./Entity";
export class Player extends Entity {
    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;
    private keySpace: Phaser.Input.Keyboard.Key;
    private launchTimer: integer;





















    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'cat');
        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');
        this.keySpace = this.scene.input.keyboard.addKey('Space'); 
        this.getBody().setSize(30, 30);
        this.getBody().setOffset(8, 0);
        this.initAnimation();
        this.launchTimer = 0;
    }
    private initAnimation(): void {
      this.scene.anims.create({
        key: 'catA',
        frames: this.scene.anims.generateFrameNumbers('runSprite', { start: 0, end: 8 }), // Assuming 4 frames for the idle animation
        frameRate: 3,
        repeat: -1 // Loop forever
      });
    }
    update(): void {
     if(this.launchTimer>0) {
      this.launchTimer--;
    }
      this.anims.play('catA',true)
      this.getBody().setVelocity(0);
      if (this.keyW?.isDown) {
        this.body.velocity.y = -110;
      }
      if (this.keyA?.isDown) {
        this.body.velocity.x = -110;
        this.checkFlip();
        this.getBody().setOffset(48, 15);
      }
      if (this.keyS?.isDown) {
        this.body.velocity.y = 110;
      }
      if (this.keyD?.isDown) {
        this.body.velocity.x = 110;
        this.checkFlip();
        this.getBody().setOffset(15, 15);
      }
      if (this.keySpace?.isDown && this.launchTimer == 0){
        this.scene.sound.play('bananljud');
        this.launchTimer=30;
      }
    
    
    }
  
}
