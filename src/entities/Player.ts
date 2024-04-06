import { Entity } from "./Entity";
export class Player extends Entity {
    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;
    private keySpace: Phaser.Input.Keyboard.Key;
    private keyShift: Phaser.Input.Keyboard.Key;
    private launchTimer: integer;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'cat');
        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');
        this.keyShift = this.scene.input.keyboard.addKey('Shift');
        this.keySpace = this.scene.input.keyboard.addKey('Space'); 
        this.getBody().setSize(16, 16);
        this.getBody().setOffset(0, 0);
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
      let speed:number = 110;
     if(this.launchTimer>0) {
      this.launchTimer--;
    }
    if (this.keyShift?.isDown){
      speed = 160;
    }
      this.anims.play('catA',true)
      this.getBody().setVelocity(0);
      if (this.keyW?.isDown) {
        this.body.velocity.y = -speed;
      }
      if (this.keyA?.isDown) {
        this.body.velocity.x = -speed;
        this.checkFlip();
        this.getBody().setOffset(16, 0);
      }
      if (this.keyS?.isDown) {
        this.body.velocity.y = speed;
      }
      if (this.keyD?.isDown) {
        this.body.velocity.x = speed;
        this.checkFlip();
        this.getBody().setOffset(0, 0);
      }
      if (this.keySpace?.isDown && this.launchTimer == 0){
        this.scene.sound.play('bananljud');
        this.launchTimer=30;
      }
    
    
    }
  
}
