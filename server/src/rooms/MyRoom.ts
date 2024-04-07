import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 12;

  onCreate (options: any) {
    this.setState(new MyRoomState());

    this.onMessage(0, (client, input) => {
      const player = this.state.players.get(client.sessionId);
      const velocity = 2;

      if (input.left) {
        player.x -= velocity;

      } else if (input.right) {
        player.x += velocity;
      }

      if (input.up) {
        player.y -= velocity;

      } else if (input.down) {
        player.y += velocity;
      }

    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    const mapWidth = 800;
    const mapHeight = 640;

    // create Player instance
    const player = new Player();

    // place Player at a random position
    player.x = (Math.random() * mapWidth);
    player.y = (Math.random() * mapHeight);

    console.log("-------")
    console.log(player.x)
    console.log(player.y)
    console.log("-------")

    // place player in the map of players by its sessionId
    // (client.sessionId is unique per connection!)
    this.state.players.set(client.sessionId, player);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");

    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
