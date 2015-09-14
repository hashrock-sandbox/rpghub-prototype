var mapImage = 'images/map1.gif';
var charaImage = 'images/chara0.gif';

function createUser(image){
    var player = new Group();
    
    player.x = 6 * 16 - 8;
    player.y = 10 * 16;
    
    var sprite = new Sprite(32, 32);
    sprite.image = image;
    
    var label = new Label();
    //座標
    label.x = 5;
    label.y = 5;
    //文字の色
    label.color = 'red';
    //フォント
    label.font = '14px "Arial"';
    //文字の設定
    label.text = 'test';
    
    player.addChild(sprite);
    player.addChild(label);
    
    return player;
}
var tile = 0;


function createPlayer(image){
    var player = new Sprite(32, 32);
    player.x = 6 * 16 - 8;
    player.y = 10 * 16;
    player.image = image;

    player.isMoving = false;
    player.direction = 0;
    player.walk = 1;
    player.addEventListener('enterframe', function () {
        this.frame = this.direction * 3 + this.walk;
        if (this.isMoving) {
            this.moveBy(this.vx, this.vy);

            if (!(game.frame % 3)) {
                this.walk++;
                this.walk %= 3;
            }
            if ((this.vx && (this.x - 8) % 16 == 0) || (this.vy && this.y % 16 == 0)) {
                this.isMoving = false;
                this.walk = 1;
            }
        } else {
            this.vx = this.vy = 0;
            if (game.input.left) {
                this.direction = 1;
                this.vx = -4;
            } else if (game.input.right) {
                this.direction = 2;
                this.vx = 4;
            } else if (game.input.up) {
                this.direction = 3;
                this.vy = -4;
            } else if (game.input.down) {
                this.direction = 0;
                this.vy = 4;
            }
            if (this.vx || this.vy) {
                //移動先のヒットテスト
                var tvx = (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0);
                var tvy = (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0);
                var x = this.x + tvx + 16;
                var y = this.y + tvy + 16;
                if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
                    this.isMoving = true;
                    arguments.callee.call(this);
                }
            }


            if (game.input.a) {
                tile = Math.floor(Math.random() * 462);
            }
        }
    });
    
    return player;
}

var map;

function gameMain() {
    map  = new Map(16, 16);
    map.image = game.assets[mapImage];

    map.loadData(mapA);
    map.collisionData = createCollision(mapA);

    var image = new Surface(96, 128);
    image.draw(game.assets[charaImage], 0, 0, 96, 128, 0, 0, 96, 128);

    var player = createPlayer(image);

    function setTileAt(x, y, tile) {
        var mx = x / map.tileWidth | 0;
        var my = y / map.tileHeight | 0;
        mapA[my][mx] = tile;
        map.loadData(mapA);
        map.collisionData = createCollision(mapA);
    }

    var stage = new Group();
    stage.addChild(map);
    stage.addChild(player);
    
    
    var user = createUser(image);
    stage.addChild(user);
    
    game.rootScene.addChild(stage);

    var drawTileEvent = function (event) {
        var x = event.x - stage.x;
        var y = event.y - stage.y;
        setTileAt(x, y, tile);
    }

    var touched = false;

    game.rootScene.addEventListener('touchstart', function (event) {
        touched = true;
        drawTileEvent(event);
    });
    game.rootScene.addEventListener('touchmove', function (event) {
        if (touched) {
            drawTileEvent(event);
        }
    });
    game.rootScene.addEventListener('touchend', function (event) {
        touched = false;
    });


    game.rootScene.addEventListener('enterframe', function (e) {
        var x = Math.min((game.width - 16) / 2 - player.x, 0);
        var y = Math.min((game.height - 16) / 2 - player.y, 0);
        x = Math.max(game.width, x + map.width) - map.width;
        y = Math.max(game.height, y + map.height) - map.height;
        stage.x = x;
        stage.y = y;
    });
    game.rootScene.addEventListener('mousedown', function (e) {
        console.log(e.button);
        if (e.button === 2) {
            return false;
        }
        // e.button: マウスのボタン(0, 1, 2)
    });

    game.rootScene.addEventListener('mousewheel', function (e) {
        // e.wheelDelta: マウスホイールの移動量
    });
}
