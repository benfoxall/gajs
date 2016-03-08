// async & distributable genetic algorithm

export default class GA {

  constructor() {
    this.population = []
  }

  tick() {
    let entity

    if(this.population.length < 100) {
      entity = this.generate()
    } else {
      entity = this.cross(this.select(),this.select())
      this.population.shift()
    }

    if(Math.random() > 0.98) {
      this.mutate(entity)
    }

    const fitness = this.assess(entity)
    this.population.push({entity, fitness})
  }

  select() {
    // Tournament 2
    const [a,b] = [this._rndInst(),this._rndInst()]
    return a.fitness > b.fitness ? a.entity : b.entity
  }

  _rndInst() {
    const i = Math.floor(Math.random()*this.population.length)
    return this.population[i]
  }

  best() {
    return Math.max.apply(Math, this.population.map( x => x.fitness))
  }

  bestE() {
    const m = this.best()
    return this.population.filter( x => x.fitness == m)[0]
  }

}

export class GAUint8 extends GA {
  constructor(size) {
    super()
    this.size = size
  }

  generate() {
    return new Uint8Array(this.size)
      .fill(0).map( () => Math.random() * 255 )
  }

  cross(mother, father) {
    const len = this.size

    // 2 point cross
    let a = this._rnd()
    let b = this._rnd()
    if (a > b) [a, b] = [b, a]

    const daughter = new Uint8Array(mother)

    daughter.set( father.subarray(a,b), a )

    return daughter
  }

  mutate(entity) {
    const at = this._rnd()
    entity[at] ^= (1 << Math.random() * 8)
  }

  _rnd() {
    return Math.floor(Math.random()*this.size)
  }

}

class T extends GAUint8 {
  constructor() {
    super(21)
  }

  assess(entity) {
    return entity.reduce((a, b) => a + b, 0) / (254 * 100)
  }
}


const test = new T()

for(let i = 0; i < 1000; i++) {
  test.tick()
  console.log(test.best())
}

console.log(test.bestE())
