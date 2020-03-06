// create a new scene
let homeScene = new Phaser.Scene('Home');

homeScene.create = function() {
 	let bg = this.add.sprite(0, 0, 'background').setInteractive();
  	bg.setOrigin(0, 0);
  	bg.setScale(2.2);

  	let gameW = this.sys.game.config.width;
  	let gameH = this.sys.game.config.height;

/*  	let text = this.add.text(gameW/2, gameH/2, 'Play', {
  		font: '40px Arial',
  		fill: '#ffffff'
  	});*/

  	this.instruction = this.add.sprite(gameW/2, gameH/2+180, 'line');
  	this.instruction.setScale(1.5);
  	this.playBtn = this.add.sprite(gameW/2, gameH/2+45, 'playBtn').setInteractive();
  	this.playBtn.setScale(0.7)

  	this.ship = this.add.sprite(gameW/2, 200, 'player');
  	this.ship.setScale(1.5);
  	this.ship.depth=2;

  	this.hand = this.add.sprite(gameW/2, gameH/2 +45, 'hand');
  	this.hand.setScale(0.3);

  	this.handMoveLeft();



	// text.setOrigin(0.5)
	// text.depth = (1);

	// let textBg = this.add.graphics();  
	// textBg.fillStyle(0x000000, 0.8);
	// textBg.fillRect(gameW/2 - text.width/2 - 10, gameH/2 - text.height/2 -10, text.width + 20, text.height + 20);
	

	this.playBtn.on('pointerdown', function(){
		this.scene.start('Game')
	}, this);
};

homeScene.handMoveLeft = function(){



	   var tween = this.tweens.add({
        targets: this.hand,
        x: 250,
        y: 500,
        ease: 'Power1',
        duration: 2000,
        repeat: 0,
        context:this,
        onComplete: this.shipMoveLeft.bind(this)

    });
}

homeScene.shipMoveLeft = function(){

	   var tween = this.tweens.add({
        targets: this.ship,
        x: 250,
        y: 200,
        ease: 'Power1',
        duration: 2000,
        repeat: 0,
        context: this,
        onComplete: this.handMoveRight.bind(this)
    });
}

homeScene.handMoveRight = function(){



	   var tween = this.tweens.add({
        targets: this.hand,
        x: 850,
        y: 500,
        ease: 'Power1',
        duration: 2000,
        repeat: 0,
        context:this,
        onComplete: this.shipMoveRight.bind(this)

    });
}

homeScene.shipMoveRight = function(){

	   var tween = this.tweens.add({
        targets: this.ship,
        x: 750,
        y: 200,
        ease: 'Power1',
        duration: 2000,
        repeat: 0,
        context: this,
        onComplete: this.handMoveUp.bind(this)
    });
}

homeScene.handMoveUp = function(){

	this.shipMoveBack();

	   var tween = this.tweens.add({
        targets: this.hand,
        x: 850,
        y: 200,
        ease: 'Power1',
        duration: 2000,
        repeat: 0,
        context: this,
        //onComplete: handMoveRight.bind(this)
    });
}

homeScene.shipMoveBack = function(){

	   var tween = this.tweens.add({
        targets: this.ship,
        x: this.sys.game.config.width/2,
        y: 200,
        ease: 'Power1',
        duration: 2000,
        repeat: 0,
        context: this,
        onComplete: this.shoot.bind(this)
    });
}

homeScene.shoot = function(){

	this.bullet = this.add.sprite(this.sys.game.config.width/2, this.ship.y, 'shoot');
	this.bullet.depth=1;

	   var tween = this.tweens.add({
        targets: this.bullet,
        y: -100,
        ease: 'Power1',
        duration: 700,
        repeat: 3,
        context: this,
        //onComplete: this.shoot.bind(this)
    });
}


