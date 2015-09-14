enchant();

var game = new Game(320, 320);
game.fps = 30;
game.preload('images/map1.gif', 'images/chara0.gif');
game.onload = gameMain;
game.start();
