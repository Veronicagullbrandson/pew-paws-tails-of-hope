import Phaser from 'phaser';
import { WelcomeScene } from './scenes/WelcomeScene';
import { StrategyMapScene } from './scenes/StrategyMapScene';
import { ServerTestScene } from './scenes/ServerTestScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 640,
  scene: [WelcomeScene, StrategyMapScene, ServerTestScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

new Phaser.Game(config);
