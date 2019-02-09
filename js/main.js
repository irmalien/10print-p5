function setup() {
  scene.canvasWidth = scene.windowWidth-(scene.windowWidth%squareSize);
  scene.canvasHeight = scene.windowHeight-(scene.windowHeight%squareSize);

  scene.canvas = createCanvas(scene.canvasWidth, scene.canvasHeight);
  scene.canvas.class("canvasClass");
  scene.canvas.id("canvasId");
  scene.wrapCanvas("canvasId");

  colorMode(HSL, 360,100,100);
  background(0);
  window.addEventListener('resize', scene.fitCanvasToScreen, false);
  pattern.randomize();
}


function draw() {
  frameRate(scene.speed)
  pattern.draw();
  pattern.moveCol();
  if (x > endCol) {
    pattern.randomize();
    x = beginCol;
    pattern.moveRow();
  }
  if (y > endRow) {
  pattern.randomize();
  scene.download(scene.countDraw, 100, 3)
  scene.pause(1000);
  scene.countDraw++;
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (scene.looping) {
      noLoop()
      scene.looping = false;
    } else {
      loop()
      scene.looping = true;
    }
  }
}


  
