import { Client, Room } from "colyseum.js";

export class ServerScene extends Phaser.Scene {
    client = new Client("ws://localhost:2567");
    room: Room;

    async create() {
        console.log("Joining room...");

        try {
            this.room = await client.joinOrCreate("my_room");
            console.log("Joined successfully!");
        } catch (e) {
            console.error(e);
        }
    }
}
