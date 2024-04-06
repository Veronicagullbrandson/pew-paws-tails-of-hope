import Phaser from 'phaser';
import { GridEngine } from 'grid-engine';
import { WelcomeScene } from './scenes/WelcomeScene';
import { StrategyMapScene } from './scenes/StrategyMapScene';
import { CharacterTestScene } from './scenes/CharacterTestScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 640,
  scene: [WelcomeScene, StrategyMapScene, CharacterTestScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
    ],
  },
};

new Phaser.Game(config);
