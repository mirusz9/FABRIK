const points = Array.from({ length: 5 }).map(() => {
	return { x: 500, y: 500 };
});
const lineLength = 50;

function setup() {
	createCanvas(1000, 1000);
	stroke(255);
	fill(150);
}

function _dist(x1, y1, x2, y2) {
	const dx = x1 - x2;
	const dy = y1 - y2;
	return Math.sqrt(dx * dx + dy * dy);
}

function doFABRIKMagic() {
	const origin = { x: 500, y: 500 };
	const target = { x: mouseX, y: mouseY };
	for (let iter = 0; iter < 100; iter++) {
		const startingFromTarget = iter % 2 == 0;
		points.reverse();

		points[0] = startingFromTarget ? target : origin;

		for (let i = 1; i < points.length; i++) {
			// find direction and distance
			const { x: cx, y: cy } = points[i];
			const { x: px, y: py } = points[i - 1];
			const distance = _dist(cx, cy, px, py);
			const dx = px - cx;
			const dy = py - cy;
			const distRatio = lineLength / distance;
			points[i].x += dx * (1 - distRatio);
			points[i].y += dy * (1 - distRatio);
		}
		const last = points[points.length - 1];
		const distToTarget = _dist(last.x, last.y, target.x, target.y);
		if (!startingFromTarget && distToTarget < 0.01) return;
	}
}

function draw() {
	doFABRIKMagic();

	background(50);
	for (let i = 0; i < points.length - 1; i++) {
		const { x: x1, y: y1 } = points[i];
		const { x: x2, y: y2 } = points[i + 1];
		strokeWeight(2);
		line(x1, y1, x2, y2);
		strokeWeight(0);
		circle(x1, y1, 10);
	}
	const { x, y } = points[points.length - 1];
	circle(x, y, 10);
}
