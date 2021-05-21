// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

let r = 0;
let g = 0;
let b = 0;
let x;
let y;
let d = 0;
let wave_text = 10;
let sc = 0;
let leftSound, rightSound, poke, pluck, twirl, D1, D2, D3, D4;
let drums = [];
let gesture;

const GESTURES = [
  "left",
  "right",
  "poke",
  "twirl",
  "pluck"
];

function preload() {

  leftSound = loadSound('./sounds/left.wav');
  rightSound = loadSound('./sounds/right.wav');
  twirl = loadSound('./sounds/twirl.wav');
  poke = loadSound('./sounds/poke.wav');
  pluck = loadSound('./sounds/pluck.wav');
  D1 = loadSound('./sounds/D1.wav');
  D2 = loadSound('./sounds/D2.wav');
  D3 = loadSound('./sounds/D3.wav');
  D4 = loadSound('./sounds/D4.wav');

}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-holder");
  drums = [D1,D2,D3,D4];
}

function draw() {
  background(r, g, b, 5);
  noStroke();
  
  push();
  fill(255, wave_text);
  textSize(20);
  textFont('Roboto+Mono');
  text(" wave your finger ", windowWidth / 2 - 20, windowHeight / 2);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


//LEFT KEY
function left_gesture() {
  
  r = 23;
  g = 114;
  b = 250;
  sc = 255;
  wave_text = 0;

  y = windowHeight / 2;
  push();
  fill(224, 155, 11);
  ellipse(x, y - 300, 300, 300);
  ellipse(x, y, 150);
  ellipse(x, y + 300, 300, 300);
  pop();

leftSound.play();
  push();
  textSize(16);
  fill(255);
  textFont('Roboto+Mono');
  text("L E F T", 20, 20);
  pop();
}

//RIGHT KEY 
function right_gesture() {
  r = 224;
  g = 155;
  b = 11;
  sc = 255;
  wave_text = 0;
  y = windowHeight / 2;

  push();
  fill(195, 184, 245);
  ellipse(x - 300, y, 100, 100);
  ellipse(x - 150, y, 100, 100);
  ellipse(x, y, 100, 100);
  ellipse(x + 150, y, 100, 100);
  ellipse(x + 300, y, 100, 100);
  pop();
  rightSound.play();

  push();
  textSize(16);
  fill(255);
  textFont('Roboto+Mono');
  text("R I G H T", 20, 40);
  pop();
}

//DOWN KEY
function poke_gesture() {
  r = 195;
  g = 184;
  b = 245;
  sc = 255;
  wave_text = 0;
  x = windowWidth / 2;
  push();
  fill(134, 224, 163);
  ellipse(x, y, 600, 600);
  pop();

  push();
  fill(195, 184, 245);
  ellipse(x, y, 500, 500);
  pop();

  push();
  fill(134, 224, 163);
  ellipse(x, y, 400, 400);
  pop();

  push();
  fill(195, 184, 245);
  ellipse(x, y, 300, 300);
  pop();

  push();
  fill(134, 224, 163);
  ellipse(x, y, 200, 200);
  pop();
  poke.play();

  push();
  textSize(16);
  fill(255);
  textFont('Roboto+Mono');
  text("P O K E", 20, 60);
  pop();
}

//A KEY
function twirl_gesture() {
  r = 134;
  g = 224;
  b = 163;
  sc = 255;
  wave_text = 0;

  x = windowWidth / 2;

  push();
  fill(g, b, b);
  ellipse(x, y, 900);
  pop();
  push();
  fill(250, 75, 67);
  ellipse(x - x / 2, y - y / 2, 200, 200);
  ellipse(x - x / 2, y + y / 2, 400, 400);
  ellipse(x + x / 2, y + y / 2, 200, 200);
  ellipse(x + x / 2, y - y / 2, 400, 400);
  pop();
  
  twirl.play();
  

  push();
  textSize(16);
  fill(255);
  textFont('Roboto+Mono');
  text("T W I R L", 20, 80);
  pop();

}
//UP KEY
function pluck_gesture() {
  r = 250;
  g = 75;
  b = 67;
  wave_text = 0;
  sc = 255;

  x = windowWidth / 2;
  push();
  fill(23, 114, 250);
  ellipse(x - x / 2, y, 500, 500);
  ellipse(x + x / 2, y, 500, 500);
  pop();

  push();
  fill(r, g, b);
  ellipse(x - x / 2, y - y / 4, 200);
  ellipse(x + x / 2, y + y / 4, 200);
  pop();
  pluck.play();

  if(drums[d].isPlaying()){
      drums[d].stop();
  }
    d = d + 1;
  if (d > drums.length-1) {
    d = 0;
  }
   
  drums[d].loop();

  push();
  textSize(16);
  fill(255);
  textFont('Roboto+Mono');
  text("P L U C K", 20, 100);
  pop();
}

function onInferenceSketch(i) {
  userStartAudio();
  switch (i) {
    case 0:
      gesture = 'left'
      left_gesture();

      break;
    case 1:
      gesture = 'right'
      right_gesture();

      break;
    case 2:
      gesture = 'poke'
      poke_gesture();
      break;
    case 3:
      gesture = 'twirl'
      twirl_gesture();
      break;
    case 4:
      gesture = 'pluck'
      pluck_gesture();

      break;
    default:
    // code block
  }
}




//Try application with keyboard
function keyPressed() {
  //RIGHT
  if (keyCode == '39') {
    right_gesture();
  }
    //LEFT
   else if (keyCode == '37') {
    left_gesture();
  }

  //UP - PLUCK
  else if (keyCode == '38') {
    pluck_gesture();
  }

  //DOWN -- poke
  else if (keyCode == '40') {
    poke_gesture();
  }

  //A -- TWIRL
  else if (keyCode == '65') {
    twirl_gesture();
  }
}

/************************************************************************
// SCRIPT FOR DISPLAY
/************************************************************************/

if(!!navigator.bluetooth){
  document.body.classList.add('not-supported');
}

/************************************************************************
// SCRIPT FOR BUTTONS
/************************************************************************/

// // GO TO PLAY --- ONLY FOR TESTING 
// document.getElementById("go_to_play").addEventListener("click", function(){
//   document.querySelector('.play').scrollIntoView({
//       behavior: "smooth",
//       });
//     }, 100);

// GO TO SKETCH BUTTON
document.getElementById("go_to_sketch").addEventListener("click", function(){
  document.querySelector('#sketch-holder').scrollIntoView({
      behavior: "smooth",
      });
    }, 100);


window.tinyMlExperimentBleInterface.createConnectButton('#connectButtonContainer', {
  model: "FUImodel/model.tflite",
  numClasses: 5,
  threshold: 0.181,
  numSamples: 25,
  captureDelay: 30,
  useMagnetometer: false,
  onConnect() {
    console.log('The BLE is connected!');
  },

  onTransferProgress(progress) {
    console.log(`Loaded ${Math.round(progress * 100)}%)`);
    var bar = document.getElementById("myBar");
    document.getElementById("myProgress").style.visibility = 'visible';
    bar.style.width = Math.round(progress * 100) + "%";
    document.getElementById("myBar").innerHTML = `${Math.round(progress * 100)}%`;  
  },

  onTransferCompleted() {
   
    setTimeout(() => {

      document.querySelector('.play').scrollIntoView({
      behavior: "smooth",
      });
    }, 100); 
   
  },

  onDisconnect() {
    console.log('The BLE is disconnected!');
  },

  onInference(data) {
    onInferenceSketch(data.index);
  }
});
