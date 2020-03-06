// our game's configuration
 
let config = {
  type: Phaser.AUTO,
  scale:{
    parent: 'phaser-app',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: 1024,
    height: 576
  },

  scene: [bootScene, loadingScene, homeScene, gameScene]
};

let game = new Phaser.Game(config);

