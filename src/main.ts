import Phaser from 'phaser';
import { WelcomeScene } from './scenes/WelcomeScene';
import { StrategyMapScene } from './scenes/StrategyMapScene';
import { CharacterTestScene } from './scenes/CharacterTestScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [WelcomeScene, StrategyMapScene, CharacterTestScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  }
};

new Phaser.Game(config);