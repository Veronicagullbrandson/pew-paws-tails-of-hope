import { Entity } from "./Entity";
export class Enemy extends Entity {
    private speed: integer;
    private direction: integer; //int between 0 and 3, 0 -> up, 1 -> right osv
    private counter: integer;
    private health: integer; // värde för liv
    private lastPosition: Phaser.Math.Vector2;
    public isDead: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'cat');
        this.getBody().setSize(28, 32);
        this.getBody().setOffset(0, 0);
        this.initAnimation();
        this.speed = 60;
        this.direction = Math.floor(Math.random() * 4);
        this.counter = 1;
        this.health = 1; // Sätt health till 1 för Enemy
        this.getBody().setCollideWorldBounds(true);
        this.isDead = false;
    }
    private initAnimation(): void {
      this.scene.anims.create({
        key: 'EnemyDownRun',
        frames: this.scene.anims.generateFrameNumbers('runSpriteEnemy', { start: 0, end: 3 }), // Assuming 4 frames for the idle animation
        frameRate: 5,
        repeat: -1 // Loop forever
      });
      this.scene.anims.create({
        key: 'EnemyUpRun',
        frames: this.scene.anims.generateFrameNumbers('runSpriteEnemy', { start: 4, end: 7 }), // Assuming 4 frames for the idle animation
        frameRate: 5,
        repeat: -1 // Loop forever
      });
      this.scene.anims.create({
        key: 'EnemyRightRun',
        frames: this.scene.anims.generateFrameNumbers('runSpriteEnemy', { start: 8, end: 11 }), // Assuming 4 frames for the idle animation
        frameRate: 5,
        repeat: -1 // Loop forever
      });
      this.scene.anims.create({
      key: 'EnemyLeftRun',
      frames: this.scene.anims.generateFrameNumbers('runSpriteEnemy', { start: 12, end: 15 }), // Assuming 4 frames for the idle animation
      frameRate: 5,
      repeat: -1 // Loop forever
    });
    // Add the following line to start the 'EnzoDownRun' animation immediately
      this.anims.play('EnemyDownRun', true);
    }

    update(): void {
      if (this.isDead) {
        return;
      }

      const projectiles = this.scene.player.projectiles;
      let hit = false;
      breakme: for (let i = 0; i < projectiles.length; i++) {
        this.scene.physics.add.overlap(this, projectiles[i], () =>
        {
            this.takeDamage(1);
            console.log("Hit");
            hit = true;
            projectiles[i].destroy();
        });
      this.counter--;
      if (this.counter == 0) {
        this.direction = Math.floor(Math.random() * 4);
        this.counter = 80;
      }
      this.getBody().setVelocity(0);
      this.lastPosition = new Phaser.Math.Vector2(this.x, this.y);
      if (this.direction == 0) {
        this.body.velocity.y = -this.speed;
        this.anims.play('EnemyUpRun', true);
      }
      if (this.direction == 3) {
        this.body.velocity.x = -this.speed;
        this.anims.play('EnemyLeftRun', true);
      }
      if (this.direction == 2) {
        this.body.velocity.y = this.speed;
        this.anims.play('EnemyDownRun', true);
      }
      if (this.direction == 1) {
        this.body.velocity.x = this.speed;
        this.anims.play('EnemyRightRun', true);
      }

      if (Math.floor(Math.random() * 400) == 0) {
        if (Math.floor(Math.random() * 2) == 0) {
          this.scene.sound.play('enemySound1');
        } else {
          this.scene.sound.play('enemySound2');
        }
      }
    
      const currentPos = new Phaser.Math.Vector2(this.x, this.y);
      
      if (this.lastPosition) {
        const diff = currentPos.clone().subtract(this.lastPosition);
        if (diff.length() == 0) {
          this.anims.stop();
        }
      }
    }
    // Metod för att ta skada
    public EnemytakeDamage(damage: integer): void {
      this.health -= damage;
      if (this.health <= 0) {
          this.die();
      }
    }

    // Metod för att hantera död
    private die(): void {
        this.scene.sound.play('EnemyDead');
        this.destroy(); // Exempel på att ta bort fienden från spelet
        this.isDead = true;
    }
}
