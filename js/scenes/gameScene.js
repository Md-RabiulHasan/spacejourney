let gameScene = new Phaser.Scene('Game');


gameScene.init = function(){
	this.playerSpeed = 5;
	this.enemiesSpeed = 10;



	this.isTerminating = false;



	//this.enemyMinY = 25;
	//this.enemyMaxY = 350;

	//this.start = false;
}

gameScene.create = function(){

	this.gameW = this.sys.game.config.width;
	this.gameH = this.sys.game.config.height;



		this.levelData = [
		{
			enemySpeed:2,
			target:5
		},
	
		{
			enemySpeed:2,
			target:10
		},
	
		{
			enemySpeed:3,
			target:15
		},

		{
			enemySpeed:4,
			target:20
		},

		{
			enemySpeed:5,
			target:30
		},
	
	]

	this.rightDown=false;
	this.leftDown=false;
	this.goup=false;
	this.bg = false;

	this.canShoot = true;

	this.cursorKeys = this.input.keyboard.createCursorKeys();
	this.spaceBar = this.input.keyboard.addKey('SPACE');


	this.bg = this.add.sprite(this.gameW/2, this.gameH/2, 'background').setInteractive();
	this.bg.setScale(2.2);

	this.player = this.add.sprite(this.gameW/2, this.gameH-50, 'player');
	//this.player.setScale(0.1);
	//this.player.depth(2);

/*	this.rightArrow = this.add.sprite(this.gameW-50, this.gameH-50, 'rightArrow').setInteractive();
	this.rightArrow.setScale(0.7)

	this.leftArrow = this.add.sprite(50, this.gameH-50, 'leftArrow').setInteractive();
	this.leftArrow.setScale(0.7)*/

	//this.rightArrow.on('pointerdown', this.move, this );

	//this.leftArrow.on('pointerdown',   goLeft, this);

	//OLD CODE FOR TOUCH CONTROLS WITH ARROWS
	
/*	this.rightArrow.on('pointerdown',  this.goRight, this);
	this.rightArrow.on('pointerup',  this.stopRight, this);
	this.rightArrow.on('pointerout', this.stopRight, this);

	this.leftArrow.on('pointerdown',  this.goLeft, this);
	this.leftArrow.on('pointerup',  this.stopLeft, this);
	this.leftArrow.on('pointerout', this.stopLeft, this);

	this.bg.on('pointerdown',  this.upGo, this);
	this.bg.on('pointerup',  this.stopGo, this);*/





	this.backgroundSound = this.sound.add('backAudio');
	this.shootingSound = this.sound.add('shootingAudio');

	this.levelNum = 0;
	this.score = 0;
	//[] = array
	//{} = object for holding lots of information


	var showScore = this.score;

	var showLevel = this.levelNum+1;

	var showTarget = this.levelData[this.levelNum].target;
	//let result = this.score.setText('score ' + this.score);


	this.levelText = this.add.text(50,30,'Level '+showLevel,{
		font: '28px Open Sans',
		fill: '#ffffff'
	}).setScrollFactor(0);
	this.levelText.depth=3;

	this.levelScore = this.add.text(500,30,'Score '+showScore,{
		font: '28px Open Sans',
		fill: '#ffffff'
	}).setScrollFactor(0);

	this.targetScore = this.add.text(900,30,'Target '+showTarget,{
		font: '28px Open Sans',
		fill: '#ffffff'
	}).setScrollFactor(0);

	//this.nextLevelText = this.add.text(this.gameW/2, this.gameH/2,'Level '+showLevel).setScrollFactor(0);
	this.nextLevel();
	//this.enemySpeed = [2, 4, 6]
	var musicConfig = {
		loop: true
	}
	this.backgroundSound.play(musicConfig);

	

	this.bullet = this.add.group();


	//this.enemy = this.add.sprite(50,50, 'enemy')



	this.lastLevel=this.levelData.length;

	this.enemies = this.add.group();
	var interval = Phaser.Math.Between(500, 1500);
	var timer = this.time.addEvent({
    delay: interval,               
    callback: this.makeEnemy,
    //args: [],
    callbackScope: this,
    loop: true
	});



	//this.bullet = this.add.group();
	//var interval = Phaser.Math.Between(500, 1500);




};



gameScene.nextLevel = function(){

	var showLevel = this.levelNum+1;
	//this.levelText.setText('Level '+showLevel);
	this.nextLevelText = this.add.text(this.gameW/2 , -50,'Level '+showLevel,{
		font: '24px Open Sans',
		fill: '#ffffff'
	});
	this.nextLevelText.setOrigin(0.5)
	this.nextLevelText.setScale(2)
	//var marker = this.add.image(100, 100, 'arrow').setAlpha(0.3);
    //var text = this.nextLevelText;
	
    var tween = this.tweens.add({
        targets: this.nextLevelText,
        y: this.gameH/2,
        ease: 'Power1',
        duration: 3000,
        yoyo: true,
        repeat: 0,
    })
};








gameScene.makeEnemy = function(){
		//console.log('makeEnemy');
		var x = Phaser.Math.Between(50, this.gameW-50);
		this.enemies.create(x, -50, 'enemy')
		this.enemyfall();

		//this.start = true;





		/*for (var i = 0; i < 100; i++) {
				var y = i*100 + 50;
				
			}*/


		

}




gameScene.enemyfall = function(){
	//console.log('enemyfall');
	let enemies = this.enemies.getChildren();
	
}



	gameScene.upGo = function(){
		this.shootingSound.play();
		this.bullet.create(this.player.x, this.player.y-20, 'shoot')



		//this.goup=true;


	}

	gameScene.stopGo = function(){

		this.goup=false;

	}





	gameScene.goRight = function(){

		this.rightDown=true;


	}

	gameScene.stopRight = function(){

		this.rightDown=false;

	}

	gameScene.goLeft = function(){

		this.leftDown=true;


	}

	gameScene.stopLeft = function(){

		this.leftDown=false;

	}

gameScene.resetShoot = function(){
	this.canShoot=true;
}


gameScene.update = function(){

	let bullets = this.bullet.getChildren();
	let enemies = this.enemies.getChildren();

	let garbagePool = [];


	if (this.isTerminating){return;}

	//new code for touching side of screen to move

	var p = this.input.activePointer;



		if (p.x<this.gameW/2 && p.isDown && p.y>this.gameH/2){
			if(this.player.x > 40){
				console.log('go left');
				this.player.x -= this.playerSpeed;
			}
		}

		if (p.x>this.gameW/2 && p.isDown && p.y>this.gameH/2){
		
			if(this.player.x < this.gameW-40){
				console.log('go right');
				this.player.x += this.playerSpeed;
			}
		}

		//code to shoot when top half of screen touched

		if (p.isDown && p.y<this.gameH/2 && this.canShoot){
			this.canShoot=false;
			this.upGo();
			var timer = this.time.addEvent({
	   				delay: 400,                // ms
	   				callback: this.resetShoot,
	   				//args: [],
	   				callbackScope: this,
	    			loop: false
					});

			}

	// end of new touch code

		
/*
	if(this.goup){
		this.shoot();
	}*/

//console.log('bullets '+bullets.length);
//console.log('enemies '+enemies.length);


	for(let i = 0; i < bullets.length; i++){
		//bullets[i].setScale(0.2);
		bullets[i].y -= 5;

		if (bullets[i].y<0){
			garbagePool.push(bullets[i]);
		}


		for (let e = 0; e<enemies.length; e++){

		let shootRect = bullets[i].getBounds();
		let enemyRect = enemies[e].getBounds();
		
		if (Phaser.Geom.Intersects.RectangleToRectangle(shootRect, enemyRect)){
			this.resultOfScore();

			console.log('sadasda')
			//bullets[i].destroy();
			//enemies[e].destroy();
			garbagePool.push(bullets[i]);
			garbagePool.push(enemies[e]);
			//break;
			
			
		}

		}


	}

	//for keyboard

	if (this.cursorKeys.right.isDown){

		if(this.player.x < this.gameW-40){
			console.log('go right');
			this.player.x += this.playerSpeed;
		}
		
	}

	if (this.cursorKeys.left.isDown){
		if(this.player.x > 40){
			console.log('go left');
			this.player.x -= this.playerSpeed;
		}
	
	}

	if (this.spaceBar.isDown && this.canShoot){
		this.canShoot=false;
		this.upGo();
		var timer = this.time.addEvent({
   				delay: 600,                // ms
   				callback: this.resetShoot,
   				//args: [],
   				callbackScope: this,
    			loop: false
				});

	}


	//for touch OLD DYSTEM WITH ARROWS

/*	if(this.rightDown){
		if(this.player.x < this.gameW-40){
			this.player.x += this.playerSpeed;
		}
	}

	if(this.leftDown){
		if(this.player.x > 40){
			this.player.x -= this.playerSpeed;
		}
	}*/


	
	for(let i = 0; i< enemies.length; i++){
		enemies[i].y += this.levelData[this.levelNum].enemySpeed;
		if (enemies[i].y>this.gameH){
			garbagePool.push(enemies[i]);
		}

		let playerRect = this.player.getBounds();
		let enemyRect = enemies[i].getBounds();
		
		if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)){

			this.gameover = this.add.sprite(this.gameW/2, this.gameH/2, 'gameover');
			
			this.gameover.depth=5;
			this.gameover.setScale(3);

			this.isTerminating = true;
			

			console.log('Game Over!')

				var timer = this.time.addEvent({
   				delay: 2000,                // ms
   				callback: this.gameOver,
   				//args: [],
   				callbackScope: this,
    			loop: false
				});



			//this.gameOver();
			return;
		}
	}

	for(let g = 0; g< garbagePool.length; g++){
		garbagePool[g].destroy();

	}

};


gameScene.resultOfScore = function(){
	this.score++;
	this.levelScore.setText('Score ' + this.score);
	console.log('1');


	if(this.score == this.levelData[this.levelNum].target){



		console.log ('i am inside showscore')

		this.levelNum++

		console.log('leve num '+this.levelNum + '  last'+this.lastLevel)
		

		if (this.levelNum == this.lastLevel){

			this.isTerminating=true;

				var timer = this.time.addEvent({
   				delay: 500,                // ms
   				callback: this.winScene,
   				//args: [],
   				callbackScope: this,
    			loop: false
				});
		//this.scene.launch('winScene')
		//this.scene.pause();
		this.levelNum--;
		

		return;

		}
		this.nextLevel();

		var showLevel = this.levelNum+1;
		var showTarget = this.levelData[this.levelNum].target;
		this.score=0;
		this.levelScore.setText('Score ' + this.score);
		//this.levelText.setText('Level ' + this.showLevel);
		this.levelText.setText('Level '+showLevel);
		this.targetScore.setText('Target '+showTarget);



		


		/*this.showTarget++
		this.targetScore.setText('Target ' + this.showTarget);*/		
		
		//this.winScene();
	}

	

		//***********************************************
		//PROBLEM = WIN MESSAGE FLASHES AND GOES IMMEDIATELY - NEED TO PAUSE
		//***********************************************


	
	
};
/*
# In scene A
this.scene.launch('sceneB')
this.scene.pause();

# Then in sceneB, you can return to sceneA:
button.on('pointerdown', function() {
    this.scene.resume('sceneA');
    this.scene.stop();*/



gameScene.goHome = function(){
	this.scene.start('Home');

}


gameScene.winScene = function(){

	this.win = this.add.sprite(this.gameW/2, this.gameH/2, 'win');
	this.win.depth=5;
	this.win.setScale(3);
	this.player.x = this.gameW/2;
	this.player.y = this.gameH-50;

	//this.isTerminating = false;
	var timer = this.time.addEvent({
   	delay: 2000,                // ms
   	callback: this.goHome,
   	//args: [],
   	callbackScope: this,
    loop: false
	});

	//this.scene.restart();
	
	//this.scene.resume('sceneA');
    //this.scene.stop();

	//this.cameras.main.fade(500);
	//this.scene.restart();
	//return;
	/*this.isTerminating = false;
	this.scene.restart();
	return;*/


};






gameScene.gameOver = function(){


	

	//this.cameras.main.shake(500)

	//this.cameras.main.once('camerashakecomplete', function(camera, effect){
	
	this.player.x = this.gameW/2;
	this.player.y = this.gameH-50;

	this.isTerminating = false;

	//this.cameras.main.fade(500);
	this.scene.restart();
	return;

}




