export class Particles {

	settings = {
		radius: 2.5,
		quantity: 100,
		color: '#ffffff'
	}


	constructor(selector = '.particles', settings = {}) {
		this.settings = { ...this.settings, ...settings }
		this.selector = selector;
		this.refresh();
	}

	refresh(){
		this.canvasList = document.querySelectorAll(this.selector);
		this.create()
	}

	create() {

		this.canvasList.forEach(canvas => {

			const dots = {
				num: canvas.dataset.quantity ? parseInt(canvas.dataset.quantity) : this.settings.quantity,
				distance: 200,
				d_radius: 200,
				velocity: -.9,
				array: []
			}


			const ctx = canvas.getContext('2d'),
				clr = this.hexToRgbA(canvas.dataset.color ?? this.settings.color),
				width = window.innerWidth,
				height = window.innerHeight

			canvas.width = width
			canvas.height = height
			ctx.fillStyle = clr

			function createDots(ctx) {

				ctx.clearRect(0, 0, width, height)
				for (let i = 0; i < dots.num; i++) {
					dots.array.push(new Dot(dots.velocity, canvas.dataset.radius ? parseFloat(canvas.dataset.radius) : this.settings.radius, width, height))
					dots.array[i].create(ctx)
					dots.array[i].animate()
				}

			}

			setInterval(() => createDots.call(this, ctx), 1000 / 60)
			console.log(dots);


		})
	}

	hexToRgbA(hex) {
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
			let c = hex.substring(1).split('')
			if (c.length == 3) { c = [c[0], c[0], c[1], c[1], c[2], c[2]] }
			c = `0x${c.join('')}`
			return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')}, 1`
		} throw new Error('Bad Hex')
	}

}

export class Dot {
	constructor(velocity, radius, width, height) {

		this.x = Math.random() * width
		this.y = Math.random() * height
		this.vx = velocity + Math.random()
		this.vy = velocity + Math.random()
		this.radius = Math.random() * radius

	}

	create(ctx) {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		ctx.fill()
	}

	animate() {
		if (this.x < 0 || this.x > this.width) {
			this.vx = - this.vx
		}
		if (this.y < 0 || this.y > this.height) {
			this.vy = - this.vy
		}
		this.x += this.vx
		this.y += this.vy
	}
}

export default Particles