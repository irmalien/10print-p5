let quantity = 1;
const objArr = []

function preload(){
  colorsData = loadJSON("data/palettes.json");
}

function setup() {
  selectPalette(false, false, 5);
  scene.canvasWidth = scene.windowWidth-(scene.windowWidth%SQUARE);
  scene.canvasHeight = scene.windowHeight-(scene.windowHeight%SQUARE);

  scene.canvas = createCanvas(scene.canvasWidth, scene.canvasHeight);
  scene.canvas.class("canvasClass");
  scene.canvas.id("canvasId");
  scene.wrapCanvas("canvasId");

  colorMode(HSL, 360,100,100);
  background(0);
  scene.fitCanvasToScreen();
  window.addEventListener('resize', scene.fitCanvasToScreen, false);

  if(objArr.length<quantity){
    for(let i =0; i<quantity; i++){
      objArr.push(new Square());
      objArr[i].changeMode();
      objArr[i].newColor();
      objArr[i].randomize();
    }
  }
}


function draw() {
  noSmooth();
  frameRate(scene.fps);

  for(let i = objArr.length-1; i >= 0; i-- ){
    objArr[i].draw();
    objArr[i].move();
  }

  // scene.download(scene.countDraw, 100, 3)
  scene.countDraw++;
}


  
