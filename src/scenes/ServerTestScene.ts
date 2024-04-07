import Phaser from 'phaser';
import { Room, Client } from "colyseus.js";
import { Player } from './../entities/Player';

export class ServerTestScene extends Phaser.Scene {
    private players: Array<Player>;
    client: Client;
    room: Room;

    inputPayload = {
        left: false,
        right: false,
        up: false,
        down: false,
    };

    constructor() {
      super('ServerTestScene');
      this.players = [];
    }

    preload() {
        this.load.image("tiles", "assets/tiles/punyworld-overworld-tileset.png");
        this.load.tilemapTiledJSON("map", "maps/TestTilemap2.json");
        this.load.image('cat', 'assets/tiles/grass.png');
        this.load.spritesheet('runSprite', 'assets/sprites/7 walk.png', { frameWidth: 16, frameHeight: 16 });
 
    }

    async create() {

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        await this.connect();

        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("Tileset", "tiles");
        const floor = map.createLayer('Floor', tileset, 0, 0);
        const collision = map.createLayer('Collision', tileset, 0, 0);
        collision.setCollisionByExclusion(-1, true);

        this.room.state.players.onAdd((player, sessionId) => {
            const entity = new Player(this, player.x, player.y);
            this.physics.add.collider(entity, collision);
            this.players[sessionId] = entity;

            // listening for server updates
            player.onChange(() => {
                console.log("Fisk")
                entity.x = player.x;
                entity.y = player.y;
            });

            });
            this.room.state.players.onRemove((player, sessionId) => {
            const entity = this.players[sessionId];
            if (entity) {
                entity.destroy();
                delete this.players[sessionId]
            }
        });
    }
    async connect() {
        console.log("Joining room...");

        const client = new Client("ws://10.0.0.38:2567");
        try {
            this.room = await client.joinOrCreate("my_room");
            console.log("Joined successfully!");
        } catch (e) {
            console.error(e);
        }
    }

    update(): void {

        if (!this.room) {
            return;
        }

        for(let i = 0;i < this.players.length; i++) {
            this.players[i].update();
        }
        this.inputPayload.left = this.cursorKeys.left.isDown;
        this.inputPayload.right = this.cursorKeys.right.isDown;
        this.inputPayload.up = this.cursorKeys.up.isDown;
        this.inputPayload.down = this.cursorKeys.down.isDown;
        this.room.send(0, this.inputPayload);
    }
}
