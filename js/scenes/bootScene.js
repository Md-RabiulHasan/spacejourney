// create a new scene
let bootScene = new Phaser.Scene('Boot');


bootScene.preload = function() {
	this.load.image('logo', 'assets/images/logo.png');
	this.load.text('Space')

};

bootScene.create = function(){
	console.log('create')
	this.scene.start('Loading');

};