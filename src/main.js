import {GAUint8} from './GA.js'

const size = 300

// create template canvas
const canvas = document.createElement('canvas')
canvas.width = canvas.height = size
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
ctx.textBaseline = 'middle'
ctx.textAlign = 'center'
ctx.font = '300px Helvetica'

const render = (entity) => {

  ctx.fillStyle = 'rgba(0,0,255,0.5)'
  ctx.clearRect(0,0,size,size)
  ctx.fillText('A', size/2,size/2)

  ctx.fillStyle = 'rgba(255,0,0,0.5)'

  ctx.beginPath()
  for (let i = 0; i < entity.length; i += 3){

    const x = (entity[i]/255) * size
    const y = (entity[i + 1]/255) * size
    const r = entity[i + 2] / 9

    ctx.moveTo(x,y)
    ctx.ellipse(x, y, r, r, 0, 0, Math.PI*2);
  }
  ctx.fill()

}


const assess = (entity) => {
  render(entity)

  const image = ctx.getImageData(0, 0, size, size)

  let correct = 0
  for (let i = 0; i < image.data.length; i+=4) {
    if(
      // white, good
      image.data[i + 3] == 0 ||
      // red + blue, good
      (image.data[i] && image.data[i + 2])
    ) {
      correct++
    }

  }

  return (correct*4)/image.data.length
}



let count = 0

class circleText extends GAUint8 {

  constructor() {
    super(70 * 3)
  }

  assess (entity) {
    count++
    return assess(entity)
  }

}

const ct = new circleText()
const inter = setInterval(ct.tick.bind(ct), 1)
setTimeout(() => {
  clearInterval(inter)
  console.log(count)
}, 15000)
