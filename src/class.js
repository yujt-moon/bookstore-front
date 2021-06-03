// helper functions
const PI2 = Math.PI * 2
const random = (min, max) => Math.random() * (max - min + 1) + min | 0

// container
class Birthday {

  constructor(canvas) {
    this.width = 0;
    this.height = 0;

    // create a lovely place to store the firework
    this.fireworks = []
    this.counter = 0
    this.canvas = canvas;
    this.ctx = 0;

    this.resize()
  }

  resize() {
    this.ctx = this.canvas.getContext('2d')
    this.width = this.canvas.width = window.innerWidth
    let center = this.width / 2 | 0
    this.spawnA = center - center / 4 | 0
    this.spawnB = center + center / 4 | 0

    this.height = this.canvas.height = window.innerHeight
    this.spawnC = this.height * .1
    this.spawnD = this.height * .5

  }

  onClick(evt) {
    let x = evt.clientX || evt.touches && evt.touches[0].pageX
    let y = evt.clientY || evt.touches && evt.touches[0].pageY

    let count = random(3,5)
    for(let i = 0; i < count; i++) this.fireworks.push(new Firework(
      random(this.spawnA, this.spawnB),
      this.height,
      x,
      y,
      random(0, 260),
      random(30, 110),
      this))

    this.counter = -1

  }

  update(delta) {
    this.ctx.globalCompositeOperation = 'hard-light'
    this.ctx.fillStyle = `rgba(20,20,20,${ 7 * delta })`
    this.ctx.fillRect(0, 0, this.width, this.height)

    this.ctx.globalCompositeOperation = 'lighter'
    for (let firework of this.fireworks) firework.update(delta)

    // if enough time passed... create new new firework
    this.counter += delta * 3 // each second
    if (this.counter >= 1) {
      this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        random(0, this.width),
        random(this.spawnC, this.spawnD),
        random(0, 360),
        random(30, 110),
        this))
      this.counter = 0
    }

    // remove the dead fireworks
    if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)

  }
}

class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings, birthday) {
    this.dead = false
    this.offsprings = offsprings

    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY

    this.shade = shade
    this.history = []
    this.birthday = birthday;
  }
  update(delta) {
    if (this.dead) return

    let xDiff = this.targetX - this.x
    let yDiff = this.targetY - this.y
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
      this.x += xDiff * 2 * delta
      this.y += yDiff * 2 * delta

      this.history.push({
        x: this.x,
        y: this.y
      })

      if (this.history.length > 20) this.history.shift()

    } else {
      if (this.offsprings && !this.madeChilds) {

        let babies = this.offsprings / 2
        for (let i = 0; i < babies; i++) {
          let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
          let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0

          this.birthday.fireworks.push(new Firework(
            this.x,
            this.y,
            targetX,
            targetY,
            this.shade,
            0,
            this.birthday));

        }

      }
      this.madeChilds = true
      this.history.shift()
    }

    if (this.history.length === 0) this.dead = true
    else if (this.offsprings) {
      for (let i = 0; this.history.length > i; i++) {
        let point = this.history[i]
        this.birthday.ctx.beginPath()
        this.birthday.ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)'
        this.birthday.ctx.arc(point.x, point.y, 1, 0, PI2, false)
        this.birthday.ctx.fill()
      }
    } else {
      this.birthday.ctx.beginPath()
      this.birthday.ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)'
      this.birthday.ctx.arc(this.x, this.y, 1, 0, PI2, false)
      this.birthday.ctx.fill()
    }

  }
}

export {
  Birthday
}
