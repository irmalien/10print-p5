function mousePressed() {
  selectPalette(false, false, 5);
  for(i = objArr.length-1; i >= 0; i-- ){
    objArr[i].changeMode();
    objArr[i].newColor();
  }
}
  
// }
// function mouseReleased() {
//   for(i = objArr.length-1; i >= 0; i-- ){
//     objArr[i].pressed = false;
//     objArr[i].released = true;
//   }
// }

function keyPressed() {
  if (keyCode === 32) {
    if (scene.looping) {
      noLoop()
      scene.looping = false;
      console.log("paused");
    } else {
      loop()
      scene.looping = true;
      console.log("played");
    }
    console.log("space:pause/play");
  }
  else if (keyCode === TAB) {
    toggleMenu();
    console.log("tab:menu");
  }
  // else if (keyCode === LEFT_ARROW) {
  //   if(scene.fps>1)
  //   scene.fps--
  //   console.log(scene.fps,"left:Slower");
  // } 
  // else if (keyCode === RIGHT_ARROW) {
  //   if(scene.fps<60)
  //   scene.fps++

  //   console.log(scene.fps,"right:faster");
  // }

  // else if (keyCode === UP_ARROW) {
  //   if(quantity<=25){quantity=quantity+1}
  //   else {quantity=floor(quantity*1.1)}    
  //   // console.log("up:add");
  // } 
  // else if (keyCode === DOWN_ARROW) {
  //   if(quantity<=25){quantity=quantity-1}
  //   else {quantity=floor(quantity*0.1)} 
  //   // console.log("down:remove");
  // }

  else if (keyCode === 77) {
    for(i = objArr.length-1; i >= 0; i-- ){
      objArr[i].changeMode();
    }
    console.log("m:mode");
  }
  else if (keyCode === 67) {
    selectPalette(false, false, 5);
    for(i = objArr.length-1; i >= 0; i-- ){
      objArr[i].newColor();
    }
    console.log("c:color");
  }


  else if (keyCode === 68) {
    saveCanvas(scene.titleShort, 'png')
    // console.log("d:download");
  }
}