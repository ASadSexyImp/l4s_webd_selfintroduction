function setup() {
  createCanvas(windowWidth, windowHeight + 100);
  colorMode(HSB, 245, 130, 95);
  frameRate(30);
  noFill();
}

function draw() {
  background(0);
  strokeWeight(1);
  var isSine = true;
  for (var baseH = -50; baseH <= height + 50; baseH += 100) {
    stroke(random(360), 100, 100);
    beginShape(TRIANGLE_STRIP);
    var dir = 1;
    var sincos = isSine ? sin : cos;
    for (var w = 0; w <= width; w += 20) {
      var h =
        baseH +
        sincos(w * 0.01 + map(sincos(frameCount * 0.1), -1, 1, -PI, PI)) *
          50 *
          dir;
      vertex(w, h);
      dir *= -1;
    }
    endShape();
    isSine = !isSine;
  }
}
