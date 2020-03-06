// create a new scene
let loadingScene = new Phaser.Scene('Loading');


loadingScene.preload = function() {
	console.log('dfs')
	let text = this.add.text(this.sys.game.config.width/2, 100, 'Space journey', {
  		font: '40px Arial',
  		fill: '#ffffff'
  	});

	text.setOrigin(0.5)
	text.depth = (1);
	//let text = this.add.test(this.sys.game.config.width/2, 100, 'Space');
	let logo = this.add.sprite(this.sys.game.config.width/2, 255, 'logo');

	let bgBar = this.add.graphics();

	let barW = 150;
	let barH = 30;




	bgBar.setPosition(this.sys.game.config.width/2 - barW/2, this.sys.game.config.height/2 - barH/2 + 100)
	bgBar.fillStyle(0xF5F5F5, 1);
	bgBar.fillRect(0,0, barW, barH)


	let progressBar = this.add.graphics();
	progressBar.setPosition(this.sys.game.config.width/2 - barW/2, this.sys.game.config.height/2 - barH/2 + 100)

	this.load.on('progress', function(value){
		progressBar.clear();

		progressBar.fillStyle(0x9AD98D, 1);


		progressBar.fillRect(0,0, value * barW, barH);

	}, this);


    this.load.image('player','assets/images/player.png');
    this.load.image('enemy','assets/images/enemy.png');
    this.load.image('background','assets/images/background.png');
    this.load.image('rightArrow','assets/images/rightArrow.png');
    //this.load.image('goal','assets/goal.png');
	this.load.image('leftArrow','assets/images/leftArrow.png');
	this.load.image('gameover','assets/images/gameover.png');
	this.load.image('shoot','assets/images/shoot.png');
	this.load.image('win','assets/images/win.png');
	this.load.image('line','assets/images/line.png');
	this.load.image('playBtn','assets/images/playBtn.png');
	this.load.image('hand','assets/images/hand.png');

 	this.load.audio('backAudio', 'assets/music/background.mp3');
	this.load.audio('shootingAudio', 'assets/music/shoot.mp3');

	//this.load.audio('houseAudio', 'assets/audio/house.mp3');
	//this.load.audio('cowAudio', 'assets/audio/cow.mp3');
	//this.load.audio('correct', 'assets/audio/correct.mp3');
	//this.load.audio('wrong', 'assets/audio/wrong.mp3');
    //console.log('preload')

/*  for(let i = 0; i < 100; i++) {
  	this.load.image('test' + i, 'assets/images/logo.png')
  	this.load.text('test' + i, 'Space')
  }*/


};

loadingScene.create = function(){




 	this.scene.start('Home')
}

