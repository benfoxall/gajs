const size = 500


// create template canvas
const canvas = document.createElement('canvas')
canvas.width = canvas.height = size
// canvas.style.border = '1px solid blue'
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
ctx.textBaseline = 'middle'
ctx.textAlign = 'center'
ctx.font = '500px Helvetica'
ctx.fillStyle = 'rgba(0,0,255,0.5)'
ctx.clearRect(0,0,size,size)
ctx.fillText('A', size/2,size/2)


// generated individual
const data = new Uint16Array(70 * 3)
for (var i = 0; i < data.length; i++) {
  data[i] = Math.random() * size
}

ctx.fillStyle = 'rgba(255,0,0,0.5)'

ctx.beginPath()
for (let i = 0; i < data.length; i += 3){

  const x = data[i]
  const y = data[i + 1]
  const r = data[i + 2] / 12

  ctx.moveTo(x,y)
  ctx.ellipse(x, y, r, r, 0, 0, Math.PI*2);
}
ctx.fill()
