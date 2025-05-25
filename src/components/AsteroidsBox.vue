<template>
<aside class="fixed top-0 left-0 w-full h-full z-100 bg-black" ref="canvasWrapper">
  <canvas ref="canvas"></canvas>
</aside>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as tf from '@tensorflow/tfjs'
import useAnimationFrame from './utils/useAnimationFrame';
const canvas = ref<HTMLCanvasElement>()
const canvasWrapper = ref<HTMLElement>()
const context = ref<CanvasRenderingContext2D|null>()
const BEST_SCORE = ref<number>(0)
watch(BEST_SCORE, (a) => {
  console.log(a)
})
// const bestbrain = ref<NeuralNetwork>()
let GAMES = new Set<GAME>()
const LAST_GAMES = new Set<GAME>()
let GENERATING:boolean = false
const POPULATION = 50
const RESPAWN_TIME = 2000
const COLLISION_TIME = 2000
const LEARNING_RATE = 0.001
const MAX_BULLETS = 5
const MAX_LVL = 5
const TIME_TO_LIVE = 15
const ASTEROIDS_PER_LVL = 2
const ASTEROIDS_SPAWNSIZE = 3
const ELITISM = 4
const MUTATION_RATE = 0.2
const MUTATION_STRENGTH = 0.25
const SAFEZONE = 80
const FPS = 60
const fpsInterval = 1000/FPS
const SCENE_SIZE = {
  x: canvas.value?.height||0,
  y: canvas.value?.height||0
}
const COLOR = {primary:'black',secondary:'white'}
const COLORS = [
  {primary:'black',secondary:'white'},
  {primary:'black',secondary:'green'},
  {primary:'black',secondary:'red'},
  {primary:'black',secondary:'blue'},
  {primary:'black',secondary:'purple'},
  {primary:'black',secondary:'pink'},
  {primary:'black',secondary:'gray'},
  {primary:'black',secondary:'orange'},
]

class GAME {
  id:number
  ship: SHIP
  score: number
  lvl: number
  asteroids: Set<ASTEROID>
  constructor(id:number,brain?:NeuralNetwork) {
    this.ship = new SHIP(this,brain)
    this.asteroids = new Set()
    this.score = 0
    this.id = id
    this.lvl = 0
    this.lvlup()
  }
  scoreup(score:number) {
    this.score = this.score + score
    // console.log(this.score)
    BEST_SCORE.value = Math.max(BEST_SCORE.value,this.score)
  }
  lvlup() {
    if(MAX_LVL>0) this.lvl = Math.min(this.lvl+1,MAX_LVL)
    else this.lvl++
    for(let i = 0; i < this.lvl*ASTEROIDS_PER_LVL; i++) this.asteroids.add(new ASTEROID(ASTEROIDS_SPAWNSIZE,this))
  }
  collision() {
    this.asteroids.forEach(asteroid => {
        if(this.ship.collision) if(collision(this.ship.x, this.ship.y, this.ship.size, asteroid.x, asteroid.y, asteroid.size)) {
          // this.score-=10000
          if(this.score>0) this.score*=0.1
          this.ship.death()
        }
        this.ship.bullets.forEach(bullet => {
            if(collision(asteroid.x,asteroid.y,asteroid.size,bullet.x,bullet.y,bullet.size)) {
                asteroid.death()
                bullet.death()
            }
        })
    })
  }
}

class SHIP {
  x: number
  y: number
  a: number
  size: number
  game: GAME
  speed: {move:number, rotate:number}
  accel:{move:number,rotate:number}
  friction:{move:number,rotate:number}
  keyState: {
    ArrowUp?:boolean;
    ArrowLeft?:boolean;
    ArrowRight?:boolean;
  }
  velocity: {x: number;y: number;a: number}
  timeout?: number
  lives: number
  alive: boolean
  collision: boolean
  bullets: Set<BULLET>
  timeInactive: number = 0
  killcount: number = 0
  brain: NeuralNetwork
  constructor(game:GAME,brain?:NeuralNetwork) {
    if(TIME_TO_LIVE>0) setTimeout(() => {
      this.death()
    }, TIME_TO_LIVE*1000)
    this.game = game
    this.brain = brain||new NeuralNetwork(12, 36, 3)
    this.bullets = new Set()
    this.lives = 0
    this.alive = true
    this.collision = true
    this.keyState = {}
    this.x = Math.floor(SCENE_SIZE.x/2)
    this.y = Math.floor(SCENE_SIZE.y/2)
    this.a = 90
    this.size = 10
    this.velocity = {
      x: 0,
      y: 0,
      a: 0
    }
    this.accel = {
      move: 0.03, //useless for now
      rotate:  0.08
    }
    this.friction = {
      move: 0.97,
      rotate: 0.92
    }
    this.speed = {
      move:  0.2,
      rotate: 3
    }
  }
  move() {
    this.a += this.velocity.a
    this.x += this.velocity.x
    this.y += this.velocity.y
    if(!this.velocity.x&&!this.velocity.y) {
      this.timeInactive++
      if(this.timeInactive > 30) this.death()
    } else {
      this.timeInactive = 0
      this.game.scoreup(1)
    }
    wraparound(this, this.size)
  }
  controls() {
    if(this.keyState.ArrowUp) {
        this.velocity.x -= this.speed.move * Math.cos(deg2rad(this.a))
        this.velocity.y -= this.speed.move * Math.sin(deg2rad(this.a))
    }
    // if(!this.keyState.ArrowUp) this.speed.move *= this.friction.move
    if(this.keyState.ArrowLeft && this.velocity.a > -this.speed.rotate) this.velocity.a -= this.speed.rotate * this.accel.rotate
    if(this.keyState.ArrowRight && this.velocity.a < this.speed.rotate) this.velocity.a += this.speed.rotate * this.accel.rotate
    if(!this.keyState.ArrowLeft && !this.keyState.ArrowRight) this.velocity.a *= this.friction.rotate
    if(this.a > 360) this.a = this.velocity.a
    if(this.a < 0) this.a = 360 - this.velocity.a
    this.velocity.x *= this.velocity.x>0.001?this.friction.move:0
    this.velocity.y *= this.velocity.y>0.001?this.friction.move:0
  }
  shoot() {
      if(!this.alive || this.bullets.size >= MAX_BULLETS) return
      const a = this.a
      const x = this.x - this.size * Math.cos(deg2rad(a))
      const y = this.y - this.size * Math.sin(deg2rad(a))
      this.bullets.add(new BULLET(this.game, x, y, a))
  }
  death() {
    if(this.timeout) clearTimeout(this.timeout)
    this.alive = false
    this.collision = false
    if(this.lives===0) {
      LAST_GAMES.add(this.game)
      GAMES.delete(this.game)
    } else {
      if(this.lives>0) this.lives--
      this.timeout = setTimeout(() => {
        this.x = SCENE_SIZE.x/2
        this.y = SCENE_SIZE.y/2
        this.a = 90
        this.velocity = {x: 0, y: 0, a: 0}
        this.alive = true
        this.timeout = setTimeout(() => {
          this.collision = true
        }, COLLISION_TIME)
      }, RESPAWN_TIME)
    }
  }
  async think() {
    const x:number = this.x / SCENE_SIZE.x
    const y:number = this.y / SCENE_SIZE.y
    const a:number = this.a / 360
    const bullets:number = this.bullets.size / MAX_BULLETS
    const vX:number = this.velocity.x / this.speed.move
    const vY:number = this.velocity.y / this.speed.move
    const vA:number = this.velocity.a / this.speed.rotate
    let aX:number = 0
    let aY:number = 0
    let aA:number = 0
    let aS:number = 0
    let aL:number = 0
    let nearDist:number
    this.game.asteroids.forEach(asteroid => {
      const dist = distance(x, y, asteroid.x / SCENE_SIZE.x, asteroid.y / SCENE_SIZE.y)
      if (!nearDist || dist < nearDist) {
          aX = asteroid.x / SCENE_SIZE.x
          aY = asteroid.y / SCENE_SIZE.y
          aA = asteroid.a / 360
          aL = asteroid.level / ASTEROIDS_SPAWNSIZE
          aS = asteroid.speed / asteroid.maxspeed
          nearDist = dist
      }
    })
    const inputs = [x, y, a, bullets, vX, vY, vA, aX, aY, aA, aS, aL]
    const output = await this.brain.predict(inputs)
    if(output[0]>0.25) this.shoot()
    if(output[1]<0.3) {
      this.keyState.ArrowLeft = true
      this.keyState.ArrowRight = false
    } else if (output[1]<0.6) {
      this.keyState.ArrowLeft = false
      this.keyState.ArrowRight = true
    } else {
      this.keyState.ArrowLeft = false
      this.keyState.ArrowRight = false
    }
    if(output[2]>0.5) {
      this.keyState.ArrowUp = true
    } else this.keyState.ArrowUp = false
  }

  draw() {
    const ctx = context.value
    if(!ctx) return console.error('Context is not found (SHIP DRAW FUNCTION)')
    if(!this.alive) return
    const x = this.x
    const y = this.y
    const a = deg2rad(this.a)
    const l = this.size
    const angles = [
      deg2rad(180),
      deg2rad(-60),
      deg2rad(80),
      deg2rad(60),
    ]
    ctx.strokeStyle = COLORS[Math.min(COLORS.length-1,this.game.id)].secondary
    ctx.beginPath()
    ctx.lineTo(Math.floor(x + l * Math.cos(a + angles[0])), Math.floor(y + l * Math.sin(a + angles[0])))
    ctx.lineTo(Math.floor(x + l * Math.cos(a + angles[1])), Math.floor(y + l * Math.sin(a + angles[1])))
    ctx.lineTo(Math.floor(x + l/this.size * Math.cos(a + angles[2])), Math.floor(y + l/this.size * Math.sin(a + angles[2])))
    ctx.lineTo(Math.floor(x + l * Math.cos(a + angles[3])), Math.floor(y + l * Math.sin(a + angles[3])))
    ctx.closePath()
    ctx.stroke()
  }
}

class BULLET {
  speed: number;
  size: number;
  maxdist: number;
  outset: number;
  x: number;
  y: number;
  a: number;
  traveled: number;
  game: GAME;
  constructor(game:GAME, x:number, y:number, a:number) {
    this.speed = 7
    this.size = 2
    this.maxdist = 100
    this.outset = 5
    this.x = x - this.outset * Math.cos(deg2rad(a))
    this.y = y - this.outset * Math.sin(deg2rad(a))
    this.a = a
    this.traveled = 0
    this.game = game
  }
  move() {
    this.x -= this.speed * Math.cos(deg2rad(this.a))
    this.y -= this.speed * Math.sin(deg2rad(this.a))
    this.traveled += this.speed
    if(this.traveled>this.maxdist) this.death()
    wraparound(this, this.size)
  }
  death() {
    this.game.ship.bullets.delete(this)
  }
  draw() {
    const ctx = context.value
    if(!ctx) return console.error('Context is not found (BULLET DRAW FUNCTION)')
    ctx.strokeRect(this.x - this.size/2, this.y - this.size, this.size, this.size)
  }
}

class ASTEROID {
  size: number;
  angles: number;
  level: number;
  x: number;
  y: number;
  a: number;
  maxspeed: number;
  speed: number;
  angle: number[];
  length: number[];
  game: GAME;
  constructor(level:number, game:GAME, x?:number, y?:number, a?:number){
    this.size = 10 * level
    this.angles = 10
    this.level = level || random(3)
    this.x = x || randgap(0, game.ship.x - SAFEZONE, game.ship.x + SAFEZONE, SCENE_SIZE.x) || random(SCENE_SIZE.x)
    this.y = y || randgap(0, game.ship.y - SAFEZONE, game.ship.y + SAFEZONE, SCENE_SIZE.y) || random(SCENE_SIZE.y)
    this.a = a || Math.random() * 360
    this.maxspeed = 2
    this.speed = Math.random() * this.maxspeed + 0.3
    this.angle = []
    this.length = []
    this.game = game
    }
    draw(){
        const ctx = context.value
        if(!ctx) return console.error('Context is not found (ASTEROID DRAW FUNCTION)')
        if (this.angle.length < 1) {
            for (let i = 0; i < this.angles; i++) {
            this.angle.push(deg2rad(360/this.angles * i))
            if(this.length[i-1]) this.length.push(random(this.size * 0.2) + this.length[i-1] * 0.9)
            else this.length.push(this.size)
        }}
        ctx.beginPath()
        for (let i = 0; i <= this.angle.length; i++) {
            ctx.lineTo(Math.floor(this.x + this.length[i] * Math.cos(this.a + this.angle[i])), Math.floor(this.y + this.length[i] * Math.sin(this.a + this.angle[i])))
        }
        ctx.closePath()
        ctx.stroke()
    }
    move(){
        this.x -= this.speed * Math.cos(deg2rad(this.a))
        this.y -= this.speed * Math.sin(deg2rad(this.a))
        wraparound(this, this.size)
    }
    death() {
        this.game.asteroids.delete(this)
        this.game.scoreup(Math.round(10/this.level)*10)
        this.game.ship.killcount++
        if(this.level > 1) {
            this.game.asteroids.add(new ASTEROID(this.level-1,this.game,this.x,this.y))
            this.game.asteroids.add(new ASTEROID(this.level-1,this.game,this.x,this.y))
        } else if(this.game.asteroids.size===0) this.game.lvlup()

    }
}

class NeuralNetwork {
  input_nodes: number;
  hidden_nodes: number;
  output_nodes: number;
  model: tf.Sequential;
  fitness: number = 0
  constructor(input_nodes:number, hidden_nodes:number, output_nodes:number) {
    this.input_nodes = input_nodes
    this.hidden_nodes = hidden_nodes
    this.output_nodes = output_nodes
    this.model = this.init()
  }
  init() {
    const model = tf.sequential()
    // input->hidden
    model.add(tf.layers.dense({
      inputShape: [this.input_nodes],
      units: this.hidden_nodes,
      activation: 'relu'
    }))
    // hidden->output
    model.add(tf.layers.dense({
      units: this.output_nodes,
      activation: 'softmax'
    }))
    return model
  }
  compile() {
    this.model.compile({
      optimizer: tf.train.adam(LEARNING_RATE),
      loss: 'categoricalCrossentropy'
    })
  }
  async predict(user_input:number[]) {
    const inputs = tf.tensor2d(user_input, [1, this.input_nodes])
    let output = this.model.predict(inputs)
    if(Array.isArray(output)) output = output[0]
    const outputData = await output.data()
    inputs.dispose()
    output.dispose()
    return outputData
  }
  concatFloat32Arrays(arrays: (Float32Array<ArrayBufferLike> | Int32Array<ArrayBufferLike> | Uint8Array<ArrayBufferLike>)[]) {
    const total = arrays.reduce((acc,arr) => acc+arr.length, 0)
    const result = new Float32Array(total)
    let offset = 0
    for(const arr of arrays) {
      result.set(arr, offset)
      offset+=arr.length
    }
    return result
  }
  async get_weights() {
    const weights: (Float32Array<ArrayBufferLike> | Int32Array<ArrayBufferLike> | Uint8Array<ArrayBufferLike>)[] = []
    const modelWeights = this.model.getWeights()
    for (const tensor of modelWeights) {
      weights.push(await tensor.data())
      // tensor.dispose()
    }
    return this.concatFloat32Arrays(weights)
  }
  set_weights(flatWeights: Float32Array) {
    const modelWeights = this.model.getWeights()
    const newWeights: tf.Tensor[] = []
    let offset = 0
    for (const tensor of modelWeights) {
      const shape = tensor.shape
      const size = shape.reduce((a,b) => a*b)
      const values = flatWeights.slice(offset, offset+size)
      offset+=size
      newWeights.push(tf.tensor(values,shape))
    }
    this.model.setWeights(newWeights)
    // tf.dispose(newWeights)
  }
  async mutate(mutationRate: number, mutationStrength: number) {
    const weights = await this.get_weights()
    for (let i = 0; i<weights.length; i++) {
      if(Math.random() < mutationRate) {
        weights[i] += (Math.random()*2-1)*mutationStrength
      }
    }
    this.set_weights(weights)
  }
  clone() {
    const clone = new NeuralNetwork(this.input_nodes,this.hidden_nodes,this.output_nodes)
    this.get_weights().then(weights => {
      clone.set_weights(weights)
    })
    clone.fitness = this.fitness
    return clone
  }
  async crossover(parentB:NeuralNetwork,crossoverRate:number=0.5) {
    const child = new NeuralNetwork(
      this.input_nodes,
      this.input_nodes,
      this.output_nodes
    )
    const weightsA = await this.get_weights()
    const weightsB = await parentB.get_weights()
    const childWeights = new Float32Array(weightsA.length)
    for (let i = 0; i<weightsA.length; i++) {
      childWeights[i] = Math.random() < crossoverRate ? weightsA[i] : weightsB[i]
    }
    child.set_weights(childWeights)
    return child
  }
  dispose() {
    this.model.dispose()
  }
  async save() {
    await this.model.save('localstorage://ship-brain')
  }
  async load() {
    if(!(await tf.io.listModels())["localstorage://ship-brain"]) return
    const model = await tf.loadLayersModel('localstorage://ship-brain') as tf.Sequential
    if(!model) return
    this.model = model
    const inputShape = model.layers[0].batchInputShape
    const hiddenLayer = model.layers[1]
    this.input_nodes = inputShape[1] || 0
    // @ts-expect-error because this trash doesnt work otherwise
    this.hidden_nodes = model.layers[0].units || 0
    // @ts-expect-error because this trash doesnt work otherwise
    this.output_nodes = hiddenLayer.units || 0
  }
}

async function runGen() {
  if(!LAST_GAMES.size) return
  GENERATING = true
  const brains:NeuralNetwork[] = []
  const nextGen = new Set<GAME>()
  for (const game of LAST_GAMES) {
    game.ship.brain.fitness = evaluateFitness(game)
    brains.push(game.ship.brain)
  }
  brains.sort((a,b) => b.fitness-a.fitness)
  for(let i = 0; i < ELITISM; i++) {
    nextGen.add(new GAME(nextGen.size, brains[i].clone()))
  }
  while(nextGen.size < POPULATION) {
    const parentA = selectParent(brains)
    const parentB = selectParent(brains)
    const child = await parentA.crossover(parentB)
    await child.mutate(MUTATION_RATE, MUTATION_STRENGTH)
    child.compile()
    nextGen.add(new GAME(nextGen.size, child))
  }
  // for(const n of brains) {
  //   n.dispose()
  // }
  GAMES.clear()
  GAMES = nextGen
  // localStorage.setItem('brain', brains[0].toString())
  // console.log(brains[0].model.save('localstorage://ship-brain'))
  await brains[0].save()
  // await brains[0].load()
  GENERATING = false
}
function selectParent(population: NeuralNetwork[]) {
  const tournamentSize = 5
  const candidates = []
  for (let i = 0; i < tournamentSize; i++) {
    candidates.push(population[Math.floor(Math.random()*population.length)])
  }
  candidates.sort((a,b) => b.fitness-a.fitness)
  return candidates[0].clone()
}
function evaluateFitness(game: GAME) {
  return game.score*game.ship.killcount
}





const animate = async () => {
  utils()
  if(GAMES.size) {
    GAMES.forEach(game => {
      game.ship.think()
      game.ship.controls()
      game.ship.move()
      game.ship.draw()
      game.ship.bullets.forEach(bullet => {
        bullet.move()
        bullet.draw()
      })
      game.asteroids.forEach(asteroid => {
        asteroid.move()
        asteroid.draw()
      })
      game.collision()
    })
  } else if (!GENERATING){
    await runGen()
  }
}
const init = async () => {
  if(!canvas.value) return alert('Canvas is not found')
  if(!context.value) return alert('Context for canvas is not found')
  utils()
  for(let i = 0; i < POPULATION; i++) {
    const game = new GAME(i)
    await game.ship.brain.load()
    GAMES.add(game)
  }
}

const utils = () => {
  if(!canvas.value||!context.value) return
  const canv = canvas.value
  const ctx = context.value
  if(canvasWrapper.value) {
    canv.width = canvasWrapper.value.clientWidth
    canv.height = canvasWrapper.value.clientHeight
  }
  SCENE_SIZE.x = canvas.value.clientWidth
  SCENE_SIZE.y = canvas.value.clientHeight
  ctx.font = '21px Arial'
  ctx.fillStyle = COLOR.primary
  ctx.strokeStyle = COLOR.secondary
  context.value.clearRect(0,0,SCENE_SIZE.x,SCENE_SIZE.y)
}

const deg2rad = (deg:number) => {
  return deg * Math.PI/180
}

function wraparound(obj:{x:number,y:number}, size:number) {
  if(!size) size = 0
  if(obj.x > SCENE_SIZE.x + size) obj.x = 0 - size
  if(obj.x < 0 - size) obj.x = SCENE_SIZE.x + size
  if(obj.y > SCENE_SIZE.y + size) obj.y = 0 - size
  if(obj.y < 0 - size) obj.y = SCENE_SIZE.y + size
}
function distance(x1:number, y1:number, x2:number, y2:number) {
  x1 = Math.abs(x1 - 250)
  x2 = Math.abs(x2 - 250)
  y1 = Math.abs(y1 - 250)
  y2 = Math.abs(y2 - 250)
  const difX = Math.abs(x1-x2)
  const difY = Math.abs(y1-y2)
  const dist = Math.sqrt(difX ** 2 + difY ** 2)
  return dist
}

onMounted(() => {
  context.value = canvas.value?.getContext('2d')
  // document.body.addEventListener('keydown', keyHandler)
  // document.body.addEventListener('keyup', keyHandler)
  init()
})
onBeforeUnmount(() => {
  // document.body.removeEventListener('keydown', keyHandler)
  // document.body.removeEventListener('keyup', keyHandler)
})

// function keyHandler(e:KeyboardEvent) {
//   GAMES.forEach(game => {
//     if(e.code === 'ArrowDown' && e.type === 'keydown') game.ship.shoot()
//     if(e.code==='ArrowUp'||e.code==='ArrowLeft'||e.code==='ArrowRight') game.ship.keyState[e.code] = e.type === 'keydown'
//   })
// }
function random(int:number){
  return Math.floor(Math.random() * int) + 1
}
function randgap(min1:number, max1:number, min2:number, max2:number) {
    const dif1 = max1 - min1 + 1
    const dif2 = max2 - min2 + 1
    const total = dif1+dif2
    const gap = min2-max1 - 1
    let rand = Math.floor(Math.random() * total + min1)
    if(rand > max1 && rand < min2) rand += gap
    return rand
}
function collision(p1x:number, p1y:number, r1:number, p2x:number, p2y:number, r2:number) {
  const a = r1 + r2;
  const x = p1x - p2x;
  const y = p1y - p2y;

  if (a > Math.sqrt((x * x) + (y * y))) {
      return true;
  } else {
      return false;
  }
}
useAnimationFrame(animate, fpsInterval)
</script>
