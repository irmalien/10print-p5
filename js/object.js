const SQUARE = 512;
let squareSize = SQUARE;

let x = 0;
let y = 0;
let beginRow = 0
let beginCol = 0
let endCol = scene.canvasWidth;
let endRow = scene.canvasHeight;

let nextColumn = squareSize;
let nextRow = squareSize;
let lineSize = squareSize/2;
let mirrorChance = .5;

let color = [360, 80, 80]
const white = [0, 100, 100]
const black = [0, 0, 0]

const pattern = {
  draw(){
    let drawIncrement = 0;
    const mirrorSquare = coinFlip(true, false, mirrorChance);
    // let drawLine = coinFlip(true, false);
    let drawLine = false;
  
    //DRAW SQUARE  
    for(let i=0; i<squareSize; i++){
      let dist = i/lineSize;
      if(dist%1 === 0){
        drawLine = !drawLine;
      };
  
      if(drawLine){
        // var colorIncrease = i
        // if (colorIncrease+color[0] > 360) {
        //   colorIncrease = colorIncrease-360;
        // }
        stroke(color[0],color[1],color[2]);
        // console.log(color[0]+colorIncrease)
      }
      else {
        stroke(0, 0);
      };
  
      safearea = 0;
      if(!mirrorSquare){
        // stroke(color[0]+i,color[1],color[2]);
        line(x+squareSize-drawIncrement , y-safearea, x+squareSize+safearea, y+drawIncrement);
        // stroke(color[0]+i,color[1],color[2]);
        line(x-safearea , y+drawIncrement, x+squareSize-drawIncrement, y+squareSize+safearea); 
      }
      else {
        line(x-safearea , y+drawIncrement, x+drawIncrement, y-safearea);
        line(x+drawIncrement , y+squareSize+safearea, x+squareSize+safearea, y+drawIncrement);
      }
      drawIncrement++
    }
  },
  moveCol(){
    x = x+nextColumn;
  },
  moveRow(){
    y = y+nextRow;
  },
  randomize(){
    beginCol = coinFlip(0, width/2, .95);
    beginRow = coinFlip(0, height/2, .95);
    endCol = coinFlip(scene.canvasWidth, width/2, .95);
    endRow = coinFlip(scene.canvasHeight, width/2, .95);

    x = beginCol
    y = beginRow
    
    // squareSize = coinFlip(SQUARE, squareSize*coinFlip(.5, 2, 0.2), .3)
    squareSize = coinFlip(SQUARE, squareSize*coinFlip(.5, 2, 0.2), .3)
    // scene.speed = (SQUARE*30)/squareSize;

    nextColumn = squareSize*coinFlip(1, 2, .9);
    nextRow = squareSize*coinFlip(1, 2, .9);
    // mirrorChance = coinFlip(.5, coinFlip(0, 1), .9);
    let randomColor = [random(0,360), 80, 80];

    //Randomize Line and Color
    let randomize = random(1)
    if (randomize<0.1){
      lineSize = squareSize/coinFlip(32, 64)
      color = coinFlip(coinFlip(black, white), randomColor)
      nextColumn = squareSize*coinFlip(1, 2, .25)
      nextRow = squareSize*coinFlip(1, 2, .25)
    }
    else if (randomize<0.2){
      lineSize = squareSize/8
      color = coinFlip(black, white)
      nextColumn = squareSize*coinFlip(1, 2, .5)
      nextRow = squareSize*coinFlip(1, 2, .5)
    }
    else if (randomize<0.4){
      lineSize = squareSize/4
      color = coinFlip(black, white)
    }
    else if (randomize<0.7){
      squareSize = coinFlip(SQUARE*4, coinFlip(SQUARE*8, SQUARE*16));
      nextColumn = squareSize;
      nextRow = squareSize;
      lineSize = squareSize/coinFlip(2, 4);
      color = coinFlip(black, white)
      color = coinFlip(color, randomColor, 0.3)
    }
    else {
      lineSize = squareSize/2;
      color = randomColor;
    };
  },
  greyScale(){
    color = [0, 0, random(0,100)];
  },

}