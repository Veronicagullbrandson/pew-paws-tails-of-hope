import Phaser from 'phaser';
import { Room, Client } from "colyseus.js";

export class ServerTestScene extends Phaser.Scene {
    constructor() {
      super('ServerTestScene');
    }

    room: Room;
    client: Client;

    preload() {

    }

    async create() {
        console.log("Joining room...");

        const client = new Client("ws://localhost:2567");
        try {
            this.room = await client.joinOrCreate("my_room");
            console.log("Joined successfully!");
        } catch (e) {
            console.error(e);
        }
    }
}
