import { Entity } from "./Entity";
export class Player extends Entity {
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private keySpace: Phaser.Input.Keyboard.Key;
  private keyShift: Phaser.Input.Keyboard.Key; // running
  private launchTimer: integer;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'cat');
    this.keyW = this.scene.input.keyboard.addKey('W');
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyS = this.scene.input.keyboard.addKey('S');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.keyShift = this.scene.input.keyboard.addKey('Shift');
    this.keySpace = this.scene.input.keyboard.addKey('Space');
    this.getBody().setSize(28, 32);
    this.getBody().setOffset(8, 0);
    this.initAnimation();
    this.launchTimer = 0;
  }
  private initAnimation(): void {
    this.scene.anims.create({
      key: 'EnzoDownRun',
      frames: this.scene.anims.generateFrameNumbers('runSprite', { start: 0, end: 3 }), // Assuming 4 frames for the idle animation
      frameRate: 5,
      repeat: -1 // Loop forever
    });
    this.scene.anims.create({
      key: 'EnzoUpRun',
      frames: this.scene.anims.generateFrameNumbers('runSprite', { start: 4, end: 7 }), // Assuming 4 frames for the idle animation
      frameRate: 5,
      repeat: -1 // Loop forever
    });
    this.scene.anims.create({
      key: 'EnzoRightRun',
      frames: this.scene.anims.generateFrameNumbers('runSprite', { start: 8, end: 11 }), // Assuming 4 frames for the idle animation
      frameRate: 5,
      repeat: -1 // Loop forever
    });
    this.scene.anims.create({
      key: 'EnzoLeftRun',
      frames: this.scene.anims.generateFrameNumbers('runSprite', { start: 12, end: 15 }), // Assuming 4 frames for the idle animation
      frameRate: 5,
      repeat: -1 // Loop forever
    });
  }

  update(): void {
    let speed: number = 110;
    if (this.launchTimer > 0) {
      this.launchTimer--;
    }
    if (this.keyShift?.isDown) {
      speed = 160;
    }
    this.getBody().setVelocity(0);
    if (this.keyW?.isDown) {
      this.body.velocity.y = -speed;
      this.anims.play('EnzoUpRun', true)
    }
    if (this.keyA?.isDown) {
      this.body.velocity.x = -speed;
      this.anims.play('EnzoLeftRun', true)
    }
    if (this.keyS?.isDown) {
      this.body.velocity.y = speed;
      this.anims.play('EnzoDownRun', true)
    }
    if (this.keyD?.isDown) {
      this.body.velocity.x = speed;
      this.anims.play('EnzoRightRun', true)
    }
    if (this.keySpace?.isDown && this.launchTimer == 0) {
      this.scene.sound.play('bananljud');
      this.launchTimer = 30;
    }


  }

}
