function newCanvasElement(zIndex) {
	var canvas = document.createElement('canvas');

	canvas.style.position = 'fixed';
	canvas.style.top = '0px';
	canvas.style.left = '0px';
	canvas.style.zIndex = zIndex;

	return canvas;
}

function setCanvasSize(canvas) {
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
}

function draw() {
	// zIndex is set to -1 so the canvas is behind all of the page content
	var zIndex = -1;

	// create, correctly size and append the canvas to the page
	var canvas = newCanvasElement(zIndex);
	setCanvasSize(canvas);
	document.body.appendChild(canvas);

	// resize the canvas on the window onresize event
	window.onresize = function () {
		setCanvasSize(canvas);
	};

	digitalSnow(canvas);
}

function digitalSnow(canvas){
	const particleColor = '#fc7d56';
	const numParticles = 100;
	
	var particles = [];
	for(var i = 0; i < numParticles; i++)
	{
		particles.push({
			x: Math.random()*canvas.width,
			y: Math.random()*canvas.height,
			size: Math.random()*4+1,
			weight: Math.random()*numParticles
		})
	}

	var ctx = canvas.getContext("2d");

	function drawParticles()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		ctx.fillStyle = particleColor;
		ctx.beginPath();
		for(var i = 0; i < numParticles; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.fillRect(p.x, p.y, p.size, p.size);
		}
		ctx.fill();
		updateParticlePosition();
		window.requestAnimationFrame(drawParticles);
	}
	
	function updateParticlePosition()
	{
		for(var i = 0; i < numParticles; i++)
		{
			var p = particles[i];
			p.y += Math.cos(p.weight) + 1 + p.size/2;
			if(p.y > canvas.height)
			{
				particles[i] = {x: Math.random()*canvas.width, y: -1, size: p.size, weight: p.weight};
			}
		}
	}
	
	window.requestAnimationFrame(drawParticles);
}
