import { Game } from './game';
import { BroadTest } from './broadtest';
import { Setup } from './setup';
import Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
  width: 360,
  height: 720,
  type: Phaser.AUTO,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  // scene: [Setup, Game],
  scene: [Setup],

  backgroundColor: 0x222222
};

new Phaser.Game(config);