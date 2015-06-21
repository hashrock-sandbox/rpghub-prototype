var renderer = PIXI.autoDetectRenderer(160, 160, { antialias: true });
document.querySelector(".container").appendChild(renderer.view)

renderer.view.oncontextmenu = function (e) {
    e.preventDefault();
	console.log([e.offsetX, e.offsetY]);
};

var gridSize = 160 / 16;
var penColor = 0x000000;
function drawGrid(ctx) {

	for (var i = 0; i < 16; i++) {
		for (var j = 0; j < 16; j++) {
			var fill = (i % 2 === 0 && j % 2 === 0 || i % 2 === 1 && j % 2 === 1) ? 0xEEEEEE : 0xCCCCCC;
			ctx.beginFill(fill);
			ctx.drawRect(i * gridSize, j * gridSize, gridSize, gridSize);
			ctx.endFill();
		}
	}
}

var stage = new PIXI.Container();
stage.interactive = true;
var ctx = new PIXI.Graphics();
drawGrid(ctx);
stage.addChild(ctx);

var setPixel = function (ctx, pointM) {
	ctx.beginFill(penColor);
	ctx.drawRect(pointM.x * gridSize, pointM.y * gridSize, gridSize, gridSize);
	ctx.endFill();
}

var mouseEvent = function (iData) {
	var point = iData.data.getLocalPosition(iData.target);
	var pointM = {
		x: Math.floor(point.x / gridSize),
		y: Math.floor(point.y / gridSize)
	}
	setPixel(ctx, pointM);
}

var mousedown = false;

stage.mousedown = function (iData) {
	mouseEvent(iData);
	mousedown = true;
}

stage.mousemove = function (iData) {
	if (mousedown) {
		mouseEvent(iData);
	}
}

stage.mouseup = function () {
	mousedown = false;
}

animate();

function animate() {
	renderer.render(stage);
	requestAnimationFrame(animate);
}

$("#colorpicker").spectrum({
    color: penColor,
	showButtons: false,
    flat: true,
	move: function (color) {
		penColor = parseInt(color.toHex(), 16);
	}
});