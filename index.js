(function() {
	const canvas = document.createElement("canvas")
	const context = canvas.getContext("2d")

	document.body.appendChild(canvas)
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	const padding = 10
	const backgrounds = ["red", "blue", "yellow", "green", "orange"]
	var colorIndex = 0
	var block

	var image = new Image()
	image.onload = function() {
		block = {
			x: window.innerWidth / 2 - 75,
			y: window.innerHeight / 2 - 75,
			width: 150,
			height: 150,
			xDir: -2.5,
			yDir: 2.5
		}

		init()
	}
	// image.src = "https://assets.codepen.io/277/qr-transparent.png?format=auto"
	image.src = "dvd_logo.png"

	function init() {
		draw()
		update()
	}

	function draw() {
		context.fillStyle = backgrounds[colorIndex]
		context.strokeStyle = 'white';

		
		context.fillRect(block.x, block.y, block.width, block.height)
		context.strokeRect(block.x, block.y, block.width, block.height)
		context.drawImage(image, block.x + padding, block.y + padding, block.width - padding * 2, block.height - padding * 2)
	}

	function update() {
		// context.clearRect(0, 0, canvas.width, canvas.height);

		block.x = block.x + block.xDir
		block.y = block.y + block.yDir

		var changed = false

		if (block.x <= 0) {
			block.xDir = block.xDir * -1
			changed = true
		}

		if (block.y + block.height >= canvas.height) {
			block.yDir = block.yDir * -1
			changed = true
		}

		if (block.y <= 0) {
			block.yDir *= -1
			block.y = 0
			changed = true
		}

		if (block.x + block.width >= canvas.width) {
			block.xDir *= -1
			changed = true
		}

		if (changed === true) {
			colorIndex++
			if (colorIndex > backgrounds.length - 1) {
				colorIndex = 0
			}
		}

		draw()
		window.requestAnimationFrame(update)
	}
})()