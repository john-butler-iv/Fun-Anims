let AX, AY, BX, BY, CX, CY;

let POINTS_PER_SIDE = 10;
let LINES_TO_SHOW = 2 * POINTS_PER_SIDE;
let lines;
let currIndex = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	setScale();
	frameRate(POINTS_PER_SIDE);
}

function draw() {
	background(theme.background);

	// sublines
	strokeWeight(1);
	stroke(theme.lightStroke);
	for (let i = 0; i < LINES_TO_SHOW; i++){
		let index = (i + currIndex) % lines.length;
		line(lines[index].x1, lines[index].y1, lines[index].x2, lines[index].y2);
	}
	currIndex = (currIndex + 1) % lines.length;

	// outline
	strokeWeight(5);
	stroke(theme.stroke);
	line(AX, AY, BX, BY);
	line(BX, BY, CX, CY);
	line(CX, CY, AX, AY);
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	setScale();
}

function mouseWheel(event) {
	let progress = currIndex / lines.length;

	POINTS_PER_SIDE -= event.delta / 100;
	if (POINTS_PER_SIDE < 2) POINTS_PER_SIDE = 2;
	LINES_TO_SHOW = 2 * POINTS_PER_SIDE;
	lines = computeLines(AX, AY, BX, BY, CX, CY, POINTS_PER_SIDE);
	frameRate(POINTS_PER_SIDE);

	currIndex = Math.round(progress * lines.length);
}

function setScale() {
	let center_x = windowWidth / 2;
	let center_y = windowHeight / 2;
	let boundingSize = min(windowHeight,windowHeight) * 0.75;

	AX = center_x;
	AY = center_y - boundingSize / 2 ;

	BX = center_x - boundingSize / 2;
	BY = center_y + boundingSize / 2;
	
	CX = center_x + boundingSize / 2;
	CY = center_y + boundingSize / 2;

	lines = computeLines(AX, AY, BX, BY, CX, BY, POINTS_PER_SIDE);
}


function computeLines(x1, y1, x2, y2, x3,y3, pointsPerSide){
	let pts1 = computePoints(x1, y1, x2, y2, pointsPerSide);
	let pts2 = computePoints(x2, y2, x3, y3, pointsPerSide);
	let pts3 = computePoints(x3, y3, x1, y1, pointsPerSide);

	let lines = computeLinesCore(pts1, pts2);
	lines = lines.concat(computeLinesCore(pts2, pts3));
	lines = lines.concat(computeLinesCore(pts3, pts1));

	return lines;
}

function computePoints(x1, y1, x2, y2, points) {
	let pts = [];
	for (let i = 1; i <= points; i++){
		pts.push({
			x: lerp(x1, x2, i / (points+1)),
			y: lerp(y1, y2, i / (points+1))
		});
	}
	return pts;
}

function computeLinesCore(pts1, pts2) {
	let lines = [];
	for (let i = 0; i < pts1.length; i++){
		lines.push({
			x1: pts1[i].x,
			y1: pts1[i].y,
			x2: pts2[i].x,
			y2: pts2[i].y
		});
	}
	return lines;
}