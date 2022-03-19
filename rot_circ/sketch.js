const TOTAL_CIRCLES = 4;
let X1,Y1,X2,Y2;
let activePoint=1;
let theta = 0;
let otherOff = 0;
let increment = ANGLE.SLOW;

function setup() {
	createCanvas(windowWidth, windowHeight);
	setScale();
	theta = 0;
	noFill();
	frameRate(120);
}

function draw() {
	background(theme.background);

	let baseAngle = atan((Y2 - Y1) / (X2 - X1));

	colorMode(HSL,255);
	strokeWeight(5);
	for (let i = 0; i < TOTAL_CIRCLES; i++) {
		let offTheta = (baseAngle + theta + i * PI / TOTAL_CIRCLES) % PI;
		stroke(lerp(0, 255, (offTheta / PI + otherOff) % 1), 255, 255/2);
		drawCircle(offTheta, X1, Y1, X2, Y2);
	}


	colorMode(RGB);
	strokeWeight(10);
	stroke(theme.stroke);
	point(X1, Y1);
	point(X2, Y2);
	otherOff = otherOff + 0.02;
	theta = (theta + increment) % TWO_PI;
}


function drawCircle(theta, x1, y1, x2, y2) {
	let m1 = tan(theta);
	let cx = findCenterX(x1, y1, m1, x2, y2);
	let cy = findCenterY(x1, y1,m1, x2,y2, cx);

	circle(cx, cy, 2*dist(x1, y1, cx, cy));
}


function findCenterX(x1, y1, m1, x2, y2) {
	if (y1 == y2)
		return 0.5 * (m1 * (y1 - y2) + (x1 + x2));
	
	let x3 = (x1 + x2) * 0.5;
	let y3 = (y1 + y2) * 0.5;
	let m3 = (x1 - x2) / (y2 - y1);

	return (y3 - y1 + x1 * m1 - x3 * m3) / (m1 - m3);
}
function findCenterY(x1, y1, m1, x2,y2, x) {
	//if (m1 == Infinity || m1 == - Infinity) return y1;
	return m1 * (x - x1) + y1;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	setScale();
}

function setScale() {
	if(activePoint == 1){
		X2 = windowWidth / 2;
		Y2 = windowHeight / 2;
	} else {
		X1 = windowWidth / 2;
		Y1 = windowHeight / 2;
	}
}

function mouseWheel(event) {
	increment -= event.delta * 0.0001;
}

function mouseMoved() {
	if (activePoint == 1) {
		X1 = mouseX;
		Y1 = mouseY;
	} else {
		X2 = mouseX;
		Y2 = mouseY;
	}
}

function mouseClicked(event) {
	activePoint = activePoint == 1 ? 0 : 1;
}