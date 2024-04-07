import { Entity } from "./Entity";
import { Taunt } from "./Taunt";

import { Projectile } from "./Projectile";
import { Scene } from "phaser";
export class Player extends Entity {
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private keyShift: Phaser.Input.Keyboard.Key; // running
  private keyUp: Phaser.Input.Keyboard.Key;
  private keyDown: Phaser.Input.Keyboard.Key;
  private keyLeft: Phaser.Input.Keyboard.Key;
  private keyRight: Phaser.Input.Keyboard.Key;
  private launchTimer: integer;
  public projectiles: Array<Projectile>;
  private lastPosition: Phaser.Math.Vector2;
  public health: integer; // värde för hälsa
  private tauntTimer: Phaser.Time.TimerEvent;
  private currentTaunt: Taunt | null = null;
  public isDead: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'cat');
    this.projectiles = [];
    this.keyW = this.scene.input.keyboard.addKey('W');
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyS = this.scene.input.keyboard.addKey('S');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.keyShift = this.scene.input.keyboard.addKey('Shift');
    this.keyUp = this.scene.input.keyboard.addKey('Up');
    this.keyDown = this.scene.input.keyboard.addKey('Down');
    this.keyLeft = this.scene.input.keyboard.addKey('Left');
    this.keyRight = this.scene.input.keyboard.addKey('Right');

    this.getBody().setSize(28, 16);
    this.getBody().setOffset(0, 16);

    this.initAnimation();
    this.launchTimer = 0;
    this.initTauntTimer();
    this.getBody().setCollideWorldBounds(true);
    this.health = 9;
    this.isDead = false;
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
    // Add the following line to start the 'EnzoDownRun' animation immediately
    this.anims.play('EnzoDownRun', true);
  }

  private initTauntTimer(): void {
    this.tauntTimer = this.scene.time.addEvent({
      delay: Phaser.Math.Between(8000, 10000), // Random delay between 5 to 10 seconds
      callback: this.launchTaunt,
      callbackScope: this,
      loop: true
    });
    this.launchTaunt();
  }

  private launchTaunt(): void {
    if (this.currentTaunt) {
      this.currentTaunt.destroy(); // Ensure to remove any existing taunt before creating a new one
    }
    this.currentTaunt = new Taunt(this.scene, this.x, this.y);
    this.currentTaunt.displayAt(this.x, this.y);
  }

  update(): void {
    if (this.isDead) {
      return;
    }

    let speed: number = 110;
    for (let i = 0; i < this.projectiles.length; i++) {
      if (this.projectiles[i] !== undefined) {
        this.projectiles[i].update();
      }
    }
    if (this.launchTimer > 0) {
      this.launchTimer--;
    }
    if (this.keyShift?.isDown) {
      speed = 160;
    
    }
    this.getBody().setVelocity(0);

    if (this.keyW?.isDown) {
      this.body.velocity.y = -speed;
      this.anims.play('EnzoUpRun', true);
    }
    if (this.keyA?.isDown) {
      this.body.velocity.x = -speed;
      this.anims.play('EnzoLeftRun', true);
    }
    if (this.keyS?.isDown) {
      this.body.velocity.y = speed;
      this.anims.play('EnzoDownRun', true);
    }
    if (this.keyD?.isDown) {
      this.body.velocity.x = speed;
      this.anims.play('EnzoRightRun', true);
    }
    if (this.keyUp?.isDown && this.launchTimer == 0) {
      this.scene.sound.play('bananljud');
      this.launchTimer = 30;
      this.projectiles.push(new Projectile(this.scene, this.x, this.y, 0+this.body.velocity.x,-1000+this.body.velocity.y))
      console.log()
    }

    if (this.keyDown?.isDown && this.launchTimer == 0){
      this.scene.sound.play('bananljud');
      this.launchTimer = 30;
      this.projectiles.push(new Projectile(this.scene, this.x, this.y,0+this.body.velocity.x,1000+this.body.velocity.y))
    }

    if (this.keyRight?.isDown && this.launchTimer == 0) {
      this.scene.sound.play('bananljud');
      this.launchTimer = 30;
      this.projectiles.push(new Projectile(this.scene, this.x, this.y, 1000+this.body.velocity.x, 0+this.body.velocity.y))
    }

    if (this.keyLeft?.isDown && this.launchTimer == 0) {
      this.scene.sound.play('bananljud');
      this.launchTimer = 30;
      this.projectiles.push(new Projectile(this.scene, this.x, this.y, -1000+this.body.velocity.x, 0+this.body.velocity.y))
    }


    const currentPos = new Phaser.Math.Vector2(this.x, this.y);
    if (this.lastPosition) {
      const diff = currentPos.clone().subtract(this.lastPosition);
      if (diff.length() == 0) {
        this.anims.stop();
      }
    }
    this.lastPosition = new Phaser.Math.Vector2(this.x, this.y);

    if (this.currentTaunt) {
      this.currentTaunt.setPosition(this.x, this.y);
    }
  }

  destroy(): void {
    if (this.currentTaunt) {
      this.currentTaunt.destroy();
    }
    if (this.tauntTimer) {
      this.tauntTimer.remove();
    }
    super.destroy();
  }
  // Metod för att spelaren tar skada
  public PlayertakeDamage(damage: integer): void {
    if (this.isDead) {
      return;
    }
    this.health -= damage;
    if (this.health <= 0) {
        this.die();
    }
  }
     // Metod för att hantera död
     private die(): void {
      // Exempel på att ta bort fienden från spelet
      this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 'ENZO DIED', { fontSize: '32px', color: '#FFF' }).setOrigin(0.5);
      this.destroy(); //Ta bort spelaren
      this.isDead = true;
      
 }
} 

