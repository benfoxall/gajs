'use strict';

var size = 500;

// create template canvas
var canvas = document.createElement('canvas');
canvas.width = canvas.height = size;
// canvas.style.border = '1px solid blue'
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.font = '500px Helvetica';
ctx.fillStyle = 'rgba(0,0,255,0.5)';
ctx.clearRect(0, 0, size, size);
ctx.fillText('A', size / 2, size / 2);

// generated individual
var data = new Uint16Array(70 * 3);
for (var i = 0; i < data.length; i++) {
  data[i] = Math.random() * size;
}

ctx.fillStyle = 'rgba(255,0,0,0.5)';

ctx.beginPath();
for (var _i = 0; _i < data.length; _i += 3) {

  var x = data[_i];
  var y = data[_i + 1];
  var r = data[_i + 2] / 12;

  ctx.moveTo(x, y);
  ctx.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
}
ctx.fill();