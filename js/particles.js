export class Particles {

	settings = {
		radius: 2.5,
		quantity: 100,
		color: '#ffffff'
	}

	particles = []


	constructor(selector = '.particles', settings = {}) {
		this.settings = { ...this.settings, ...settings }
		this.selector = selector;
		this.refresh();
	}

	refresh() {
		this.particles = [];
		this.canvasList = document.querySelectorAll(this.selector);
		this.create()
		this.animate()
	}

	create() {

		this.canvasList.forEach((canvas, idx) => {

			const clr = this.hexToRgbA(canvas.dataset.color ?? this.settings.color),
				width = window.innerWidth,
				height = window.innerHeight

			this.particles[idx] = {
				num: canvas.dataset.quantity ? parseInt(canvas.dataset.quantity) : this.settings.quantity,
				velocity: -.9,
				ctx: canvas.getContext('2d'),
				array: [],
				width,
				height
			}

			canvas.width = width
			canvas.height = height
			this.particles[idx].ctx.fillStyle = clr

			for (let i = 0; i < this.particles[idx].num; i++) {
				this.particles[idx].array.push(new Dot(this.particles[idx].velocity, canvas.dataset.radius ? parseFloat(canvas.dataset.radius) : this.settings.radius, width, height));
			}
		})
	}


	animate() {
		setInterval(() => this.particles.forEach(partical => {
			partical.ctx.clearRect(0, 0, partical.width, partical.height);

			partical.array.forEach(dot => {
				dot.animate();
				dot.render(partical.ctx);
			})
		}), 1000 / 60);
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

		this.width = width
		this.height	= height
		this.x = Math.random() * width
		this.y = Math.random() * height
		this.vx = velocity + Math.random()
		this.vy = velocity + Math.random()
		this.radius = Math.random() * radius

	}

	render(ctx) {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		ctx.fill()
	}

	animate() {
		if (this.x <= 0 || this.x >= this.width) {
			this.vx *= -1
		}
		if (this.y <= 0 || this.y >= this.height) {
			this.vy *= -1
		}
		this.x += this.vx
		this.y += this.vy

	}
}

export default Particles