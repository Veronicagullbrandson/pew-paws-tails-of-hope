import { Entity } from "./Entity";
export class Enemy extends Entity {
    private speed: integer;
    private direction: integer; //int between 0 and 3, 0 -> up, 1 -> right osv
    private counter: integer;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'cat');
        this.getBody().setSize(16, 16);
        this.getBody().setOffset(0, 0);
        this.initAnimation();
        this.speed = 60;
        this.direction = Math.floor(Math.random() * 4);
        this.counter = 1;
    }
    private initAnimation(): void {
      this.scene.anims.create({
        key: 'catB',
        frames: this.scene.anims.generateFrameNumbers('runSprite', { start: 0, end: 8 }), // Assuming 4 frames for the idle animation
        frameRate: 3,
        repeat: -1 // Loop forever
      });
    }
    update(): void {
      this.counter--;
      if (this.counter == 0) {
      this.direction = Math.floor(Math.random() * 4);
      this.counter = 80;
      }
      this.anims.play('catB',true)
      this.getBody().setVelocity(0);
      if (this.direction == 0) {
        this.body.velocity.y = -this.speed;
      }
      if (this.direction == 3) {
        this.body.velocity.x = -this.speed;
        this.checkFlip();
        this.getBody().setOffset(16, 0);
      }
      if (this.direction == 2) {
        this.body.velocity.y = this.speed;
      }
      if (this.direction == 1) {
        this.body.velocity.x = this.speed;
        this.checkFlip();
        this.getBody().setOffset(0, 0);
      }
    
    }
  
}
