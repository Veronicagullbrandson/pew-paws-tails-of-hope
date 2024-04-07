import { Entity } from "./Entity";
import Phaser from 'phaser';

const catTaunts = [
  "Enzo's courage outshines your darkness!",
  "Isolde will climb over every obstacle you set!",
  "Mercedes' mind is stronger than your shadow!",
  "Tessa is shy but you are ugly!",
  "Mäster's wisdom is great than your stupidity!",
  "Hope shines brighter in Kisa, no room for your gloom!",
  "You're just a hiss in the wind, shadow cat!",
  "Claws out, hearts strong, we stand against you!",
  "Mercedes growls, and even the shadows retreat!",
  "Tessa might be shy, but her courage is mighty!",
  "Enzo's calm is the storm you fear, villain!",
  "Isolde's spirit climbs higher than your despair!",
  "Mäster's tale will be the end of yours!",
  "We're the purr that echoes hope, the scratch you fear!",
  "Kisa's heart beats stronger than your darkness!",
  "A true cat lands on its feet, you'll only fall!",
  "Our whiskers twitch at the sight of your weakness!",
  "Paws together, we stand; divided, you fall!",
  "You're just a ball of yarn in our paws!",
  "Enzo's roar silences your shadows!",
  "Isolde's agility outmaneuvers your tricks!",
  "Mercedes' defiance is your undoing!",
  "Tessa's silence is louder than your chaos!",
  "Mäster's paw is mightier than your sword!",
  "Your night will end, our dawn is eternal!",
  "We're the meow in the dark, the light you can't extinguish!",
  "Our fur bristles with courage, not fear!",
  "Kisa's spirit is our shield, your end!",
  "Pew pew, mothercatter!",
  "Go home, cats of darkness!",
  "I'm going to steal your energy!",
  "Take this banana piece, you evil cat",
  "Climb out of this, Isolde's on the rise!",
  "Mercedes purrs, you tremble!",
  "Tessa may be shy, but she's fierce!",
  "Mäster's wisdom outshines your darkness!",
  "King Enzo reigns supreme!",
  "Fear the claw of justice!",
  "Darkness, meet your catnap!",
  "You're not fit to lick my paws!",
  "This fortress stands against your nine lives!",
  "Our courage is our catnip!",
  "Whiskers forward, we stand united!",
  "Tail high, fear low!",
  "Paws of power, at the ready!",
  "Your evil is no match for our fur-titude!",
  "We're purr-suing victory!",
  "You'll regret crossing our path!",
  "Kisa's spirit is our shield!",
  "Feel the scratch of righteousness!",
  "Isolde climbs higher than your darkness!",
  "Mercedes' glare outshines your gloom!",
  "Tessa's silence drowns your doom!",
  "Mäster's age holds more wisdom than your years of darkness!",
  "Enzo's bravery lights the darkest nights!",
  "You're just a bad fur day!",
  "We're the purr-fect storm!",
  "Your darkness is just a hairball to us!",
  "Kisa's heart beats stronger than your shadow!",
  "You're a few whiskers short of a full fur!",
  "Our paws will purr-vail!",
  "Try to outclimb Isolde; you'll fail!",
  "Mercedes' strength outmuscles your malice!",
  "Tessa's heart is bigger than your darkness!",
  "Mäster teaches lessons you'll never forget!",
  "Enzo's roar silences your shadows!",
  "You're not the cat's meow around here!",
  "Purr-haps you should rethink your strategy!",
  "We have nine lives of resilience!",
  "Our tails never tuck in fear!",
  "Your evil is declawed by our courage!",
  "Kisa's light blinds your darkness!",
  "You're about to be cat-astrophically defeated!",
  "Our unity is the ultimate catnip!",
  "We stand fur-m against your shadows!",
  "Isolde's agility outpaces your despair!",
  "Mercedes' will is iron-clad!",
  "Tessa's spirit is unbreakable!",
  "Mäster's strategy outsmarts your chaos!",
  "Enzo's heart outshines your darkness!",
  "We're the cat's pajamas; you're just pajamas!",
  "This town's too small for both of us!",
  "Our claws are sharper than your wit!",
  "We're fur-ocious in the face of evil!",
  "You can't handle our cat-itude!",
  "Kisa's charm is our secret weapon!",
  "Our purrs echo louder than your cries!",
  "You're about to be out-catted!",
  "Isolde's passion climbs above your shadows!",
  "Mercedes' power steers us through darkness!",
  "Tessa's whisper is the wind beneath our paws!",
  "Mäster's tales teach more than just wisdom!",
  "Enzo's kingdom is not for the taking!",
  "You've met your meow-tch!",
  "Our meowsic drowns out your gloom!",
  "We're not kitten around here!",
  "Your end is nye; our tails don't lie!",
  "We've got the purr-severance to outlast you!",
  "You'll find no scaredy-cats here!",
  "We're the cat-alysts of your defeat!",
  "Isolde's resilience outclimbs your reach!",
  "Mercedes drives us past your darkness!",
  "Tessa's courage is the spark of hope!",
  "Mäster's lore lights our path!",
  "Enzo's valor is the beacon in the night!",
  "This cat-tle is already won!",
  "Our spirit is un-cat-chable!",
  "You're on the wrong side of the litter box!",
  "We're fur-midable opponents!",
  "Our cat-walk is the march of victory!",
  "You'll feel the bite of our resolve!",
  "We have the purr-spective to defeat you!",
  "Our tails tell tales of triumph!"
];

export class Taunt extends Entity {
  bubble: Phaser.GameObjects.Graphics | null = null; // Add property to hold the speech bubble
  textObject: Phaser.GameObjects.Text | null = null; // Add property to hold the text object
  bubbleTotalHeight: number = 0; // Add property to hold the total height of the speech bubble including the arrow

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, ""); // Assuming "" is a placeholder for the texture key
    this.setOrigin(0.5, 1);
    scene.add.existing(this);
    this.setVisible(false); 
      
    // Automatically destroy the taunt and the speech bubble after a certain time
    scene.time.delayedCall(3000, () => {
      if (this.bubble) {
        this.bubble.destroy(); // Destroy the speech bubble graphics
        this.bubble = null;
      }
      if (this.textObject) { // Check if the text object exists
        this.textObject.destroy(); // Destroy the text object
        this.textObject = null;
      }
      this.destroy();
    });
  }

  displayAt(x: number, y: number): void {
    this.createSpeechBubble(x, y - 50, 200, 50, catTaunts[Phaser.Math.Between(0, catTaunts.length - 1)]);
  }

  createSpeechBubble (x, y, width, height, quote)
  {
      const bubbleWidth = width;
      const bubbleHeight = height;
      const bubblePadding = 10;
      const arrowHeight = bubbleHeight / 4;

      const bubble = this.scene.add.graphics({ x: x, y: y - bubbleHeight - arrowHeight });

      //  Bubble shadow
      bubble.fillStyle(0x222222, 0.5);
      bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

      //  Bubble color
      bubble.fillStyle(0xffffff, 1);

      //  Bubble outline line style
      bubble.lineStyle(4, 0x565656, 1);

      //  Bubble shape and outline
      bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
      bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

      //  Calculate arrow coordinates
      const point1X = Math.floor(bubbleWidth / 7);
      const point1Y = bubbleHeight;
      const point2X = Math.floor((bubbleWidth / 7) * 2);
      const point2Y = bubbleHeight;
      const point3X = Math.floor(bubbleWidth / 7);
      const point3Y = Math.floor(bubbleHeight + arrowHeight);

      //  Bubble arrow shadow
      bubble.lineStyle(4, 0x222222, 0.5);
      bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

      //  Bubble arrow fill
      bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
      bubble.lineStyle(2, 0x565656, 1);
      bubble.lineBetween(point2X, point2Y, point3X, point3Y);
      bubble.lineBetween(point1X, point1Y, point3X, point3Y);

      const content = this.scene.add.text(0, 0, quote, { fontFamily: '"Press Start 2P"', fontSize: 10, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });

      const b = content.getBounds();

      content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2) + arrowHeight / 2);

      this.bubble = bubble; // Save the created graphics object
      this.textObject = content; // Save the created text object
      this.bubbleTotalHeight = bubbleHeight + arrowHeight; // Store the total height of the bubble including the arrow
  }

    setPosition(x: number, y: number): this {
    super.setPosition(x, y); // Set the position of the text base class
    if (this.bubble) {
      this.bubble.x = x;
      this.bubble.y = y - this.bubbleTotalHeight - this.bubbleTotalHeight / 4;
    }
    if (this.textObject) {
      const b = this.textObject.getBounds();
      this.textObject.setPosition(x - (b.width / 2) + 100, y - 10- (b.height / 2) - this.bubbleTotalHeight + (this.bubbleTotalHeight / 4)); // Adjust text object anchor to its creation point
    }
    return this; // Return this for chaining
  }
}
