import { Entity } from "./Entity";
export class Projectile extends Entity {
   

    constructor(scene: Phaser.Scene, x: number, y: number, xV: number, yV: number) {
        super(scene, x, y, 'projectile');
       
        this.getBody().setSize(30, 30);
        this.getBody().setOffset(8, 0);
        this.initAnimation();
        this.body.velocity.x = xV;
        this.body.velocity.y = yV;
    }
    private initAnimation(): void {
      this.scene.anims.create({
        key: 'projectileA',
        frames: this.scene.anims.generateFrameNumbers('projectileSprite', { start: 0, end: 14}), // Assuming 4 frames for the idle animation
        frameRate: 6,
        repeat: -1 // Loop forever
      });
    }
    
    update(): void {
     
      this.anims.play('projectileA',true)
     
    }
  
}
