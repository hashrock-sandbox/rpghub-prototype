enchant();

var game = new Game(320, 320);
game.fps = 30;
game.preload('map1.gif', 'chara0.gif');
game.onload = gameMain;
game.start();
