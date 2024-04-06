import Phaser from 'phaser';
import { WelcomeScene } from './scenes/WelcomeScene';
import { StrategyMapScene } from './scenes/StrategyMapScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [WelcomeScene, StrategyMapScene],
};

new Phaser.Game(config);