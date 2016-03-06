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

ctx.clearRect(0, 0, size, size);

ctx.fillStyle = 'rgba(0,0,255,0.5)';
ctx.fillText('A', size / 2, size / 2);

// generated individual

ctx.fillStyle = 'rgba(255,0,0,0.5)';

ctx.beginPath();
for (var i = 0; i < 70; i++) {
  var x = Math.random() * size;
  var y = Math.random() * size;
  var r = Math.random() * size / 12;
  ctx.moveTo(x, y);
  ctx.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
}
ctx.fill();