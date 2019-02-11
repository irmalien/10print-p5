const SQUARE = 256;

class Square {
  constructor(){
    this.patternSize = SQUARE;

    this.xPos = 0;
    this.yPos = 0;
    this.beginRow = 0;
    this.beginCol = 0;
    this.endCol = scene.canvasWidth;
    this.endRow = scene.canvasHeight;
    
    this.nextColumn = this.patternSize;
    this.nextRow = this.patternSize;
    
    this.patternIsMirrored = false
    this.patternMirrorChance = .5;
    
    this.lineIsFilled = false;
    this.lineInterval = this.patternSize/2;
    
    this.color = [360, 80, 80];
    this.colorFromJson = false;
    this.white = [0, 100, 100];
    this.black = [0, 0, 0];

    //Randimization mode
    this.randLoop = false;
    this.randPosition = true;
    this.randPatternScaling = true;
    this.randColor = true;
    this.randMirroring = false;

  };

  draw(){
    this.patternIsMirrored = coinFlip(true, false, this.patternMirrorChance);
    this.drawPattern();
  };

  drawPattern(){
    let drawPosition = 0;
    const drawIncrement = 1;

    for(let i=0; i<this.patternSize; i++){
      //line is either filled or transparent
      let dist = i/this.lineInterval;
      if(dist%1 === 0){this.lineIsFilled = !this.lineIsFilled;};
      this.lineIsFilled ? stroke(this.color[0],this.color[1],this.color[2]) : stroke(0, 0);

      if(!this.patternIsMirrored){
        line(this.xPos+this.patternSize-drawPosition , this.yPos, this.xPos+this.patternSize, this.yPos+drawPosition);
        line(this.xPos , this.yPos+drawPosition, this.xPos+this.patternSize-drawPosition, this.yPos+this.patternSize); 
      }
      else {
        line(this.xPos , this.yPos+drawPosition, this.xPos+drawPosition, this.yPos);
        line(this.xPos+drawPosition , this.yPos+this.patternSize, this.xPos+this.patternSize, this.yPos+drawPosition);
      }
      drawPosition=drawPosition+drawIncrement
    }
  };


  move(){
    this.moveCol();
    if (this.xPos > this.endCol) {
      if(this.randLoop){
        this.randomize();
      }

      this.xPos = this.beginCol;
      this.moveRow();
    }
    if (this.yPos > this.endRow) {
      this.randomize();
      this.xPos = this.beginCol;
      this.yPos = this.beginRow;
      scene.pause(750);
    }
  }

  moveCol(){
    this.xPos = this.xPos+this.nextColumn;
  };
  moveRow(){
    this.yPos = this.yPos+this.nextRow;
  };


  randomize(){
    this.randomizePatternScaling(this.randPatternScaling);
    this.randomizePosition(this.randPosition);
    this.randomizeColor(this.randColor);
    this.randomizeMirroring(false);

    let randomChance = random(1)
    if (randomChance<0.2){
      this.micro();
    }
    else if (randomChance<0.4){
      this.small();
    }
    else if (randomChance<0.6){
      this.normal();
    }
    else if (randomChance<0.8){
      this.large();
    }
    else {
      this.extraLarge()
    };
  }
  randomizePatternScaling(randomize=true){
    if(randomize){
      this.patternSize = coinFlip(SQUARE, this.patternSize*coinFlip(.5, 2, 0.2), .3)
    }
    else{
      this.patternSize = SQUARE;
    }
  };
  randomizePosition(randomize=true){
    if(randomize){
      this.beginCol = coinFlip(0, width/2, .95);
      this.beginRow = coinFlip(0, height/2, .95);
      this.endCol = coinFlip(scene.canvasWidth, width/2, .95);
      this.endRow = coinFlip(scene.canvasHeight, width/2, .95);
      this.nextColumn = this.patternSize*coinFlip(1, 2, .9);
      this.nextRow = this.patternSize*coinFlip(1, 2, .9);
    }
    else{
      this.beginCol = 0;
      this.beginRow = 0;
      this.endCol = scene.canvasWidth;
      this.endRow = scene.canvasHeight;
      this.nextColumn = this.patternSize;
      this.nextRow = this.patternSize;
    }
  };
  randomizeColor(randomize=true){
    if (randomize){
      if(this.colorFromJson){
        this.randomcolor = selectColor();
      }
      else{
        this.randomcolor = [random(0,360), 80, 80];
      }
      if (this.color == this.black){
        this.color = coinFlip(coinFlip(this.black, this.white, 0.05), this.randomcolor)
        console.log(this.color," is new black")
      }
      else if (this.color == this.white){
        this.color = coinFlip(coinFlip(this.black, this.white, 0.95), this.randomcolor)
        console.log(this.color," is new white")
      }
      this.color = coinFlip(coinFlip(this.black, this.white), this.randomcolor)
    }
  };
  randomizeMirroring(randomize=true){
    if (randomize){
      this.patternMirrorChance = coinFlip(.5, coinFlip(0, 1), .9);
    }
    else{
      this.patternMirrorChance = 0.5
    }
  };

  micro(){
    this.lineInterval = this.patternSize/coinFlip(32, 64)
    this.nextColumn = this.patternSize*coinFlip(1, 2, .25)
    this.nextRow = this.patternSize*coinFlip(1, 2, .25)
  };
  small(){
    this.lineInterval = this.patternSize/8
    this.nextColumn = this.patternSize*coinFlip(1, 2, .5)
    this.nextRow = this.patternSize*coinFlip(1, 2, .5)
  };
  normal(){
    // console.log("normal")
    this.lineInterval = this.patternSize/4
  }
  large(){
    // console.log("large")
    this.patternSize = coinFlip(SQUARE, coinFlip(SQUARE*4, SQUARE*8));
    this.nextColumn = this.patternSize;
    this.nextRow = this.patternSize;
    this.lineInterval = this.patternSize/coinFlip(2, 4);
  };
  extraLarge(){
    // console.log("extra")
    this.patternSize = coinFlip(SQUARE, coinFlip(SQUARE*8, SQUARE*16));
    this.lineInterval = this.patternSize/2;
  };

  changeMode(){
    this.randLoop = coinFlip(true, false);
    this.randPosition = coinFlip(true, false);
    this.randPatternScaling = coinFlip(true, false);
    this.randColor = true;
    this.randMirroring = coinFlip(true, false);
    console.log(this.randLoop,this.randPosition,this.randPatternScaling,this.randPatternScaling,this.randColor,this.randColor,this.randMirroring)
  }

  newColor(){
    this.colorFromJson = true;
    this.color = selectColor();
  }
}