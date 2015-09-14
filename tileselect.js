var canvas_width = 320;
var canvas_height = 512;
var tile_numx = 320 / 16;

var canvas = document.getElementById('mapchip');
var ctx = canvas.getContext('2d');

var hover_tile = 0;

function draw() {
	ctx.strokeStyle = "blue";
	ctx.strokeRect(hover_tile % tile_numx * 16, Math.floor(hover_tile / tile_numx) * 16, 16, 16);

	ctx.strokeStyle = "white";
	ctx.strokeRect(tile % tile_numx * 16, Math.floor(tile / tile_numx) * 16, 16, 16);

}
function clear() {
	ctx.clearRect(0, 0, 500, 500);
}

canvas.addEventListener('mousemove', function (e) {
	clear();
	var x = e.layerX;
	var y = e.layerY;

	var cx = Math.floor(x / 16);
	var cy = Math.floor(y / 16);
	hover_tile = cx + cy * canvas_width / 16;

	draw();
	//ctx.strokeRect()
}, false);

canvas.addEventListener("mouseup", function (e) {
	clear();
	var x = e.layerX;
	var y = e.layerY;
	var cx = Math.floor(x / 16);
	var cy = Math.floor(y / 16);
	tile = cx + cy * canvas_width / 16;
	draw();
}, false);