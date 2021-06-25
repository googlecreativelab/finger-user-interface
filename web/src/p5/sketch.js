/*====================================================================
Copyright 2021 Google LLC
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 
========================================================================*/

let _p5;
let handleGesture;

export default function (p5) {
  _p5 = p5;

  let r = 0;
  let g = 0;
  let b = 0;
  let x;
  let y;
  let d = 0;
  let wave_text = 10;
  let sc = 0;
  let leftSound, rightSound, poke, pluck, twirl;
  let drums = [];
  let gesture;

  const GESTURES = ["left", "right", "poke", "twirl", "pluck"];

  p5.preload = function () {
    leftSound = p5.loadSound("./sounds/left.wav");
    rightSound = p5.loadSound("./sounds/right.wav");
    twirl = p5.loadSound("./sounds/twirl.wav");
    poke = p5.loadSound("./sounds/poke.wav");
    pluck = p5.loadSound("./sounds/pluck.wav");
    drums[0] = p5.loadSound("./sounds/D1.wav");
    drums[1] = p5.loadSound("./sounds/D2.wav");
    drums[2] = p5.loadSound("./sounds/D3.wav");
    drums[3] = p5.loadSound("./sounds/D4.wav");
  };

  p5.setup = function () {
    p5.windowResized();
  };

  p5.draw = function () {
    p5.background(r, g, b, 5);
    p5.noStroke();

    p5.push();
    p5.fill(255, wave_text);
    p5.textSize(20);
    p5.textFont("Roboto+Mono");
    p5.textAlign(p5.CENTER);
    p5.text(" wave your finger ", p5.width * 0.5, p5.height * 0.5);
    p5.pop();
  };

  p5.windowResized = function () {
    const b = p5.canvas.parentElement.getBoundingClientRect();
    p5.resizeCanvas(b.width, b.height);
  };

  //LEFT KEY
  function left_gesture() {
    r = 23;
    g = 114;
    b = 250;
    sc = 255;
    wave_text = 0;

    y = p5.windowHeight / 2;
    p5.push();
    p5.fill(224, 155, 11);
    p5.ellipse(x, y - 300, 300, 300);
    p5.ellipse(x, y, 150);
    p5.ellipse(x, y + 300, 300, 300);
    p5.pop();

    leftSound.play();
    p5.push();
    p5.textSize(16);
    p5.fill(255);
    p5.textFont("Roboto+Mono");
    p5.textAlign(p5.RIGHT);
    p5.text("L E F T", p5.width - 40, 51);
    p5.pop();
  }

  //RIGHT KEY
  function right_gesture() {
    r = 224;
    g = 155;
    b = 11;
    sc = 255;
    wave_text = 0;
    y = p5.windowHeight / 2;

    p5.push();
    p5.fill(195, 184, 245);
    p5.ellipse(x - 300, y, 100, 100);
    p5.ellipse(x - 150, y, 100, 100);
    p5.ellipse(x, y, 100, 100);
    p5.ellipse(x + 150, y, 100, 100);
    p5.ellipse(x + 300, y, 100, 100);
    p5.pop();
    rightSound.play();

    p5.push();
    p5.textSize(16);
    p5.fill(255);
    p5.textFont("Roboto+Mono");
    p5.textAlign(p5.RIGHT);
    p5.text("R I G H T", p5.width - 40, 71);
    p5.pop();
  }

  //DOWN KEY
  function poke_gesture() {
    r = 195;
    g = 184;
    b = 245;
    sc = 255;
    wave_text = 0;
    x = p5.windowWidth / 2;
    p5.push();
    p5.fill(134, 224, 163);
    p5.ellipse(x, y, 600, 600);
    p5.pop();

    p5.push();
    p5.fill(195, 184, 245);
    p5.ellipse(x, y, 500, 500);
    p5.pop();

    p5.push();
    p5.fill(134, 224, 163);
    p5.ellipse(x, y, 400, 400);
    p5.pop();

    p5.push();
    p5.fill(195, 184, 245);
    p5.ellipse(x, y, 300, 300);
    p5.pop();

    p5.push();
    p5.fill(134, 224, 163);
    p5.ellipse(x, y, 200, 200);
    p5.pop();
    poke.play();

    p5.push();
    p5.textSize(16);
    p5.fill(255);
    p5.textFont("Roboto+Mono");
    p5.textAlign(p5.RIGHT);
    p5.text("P O K E", p5.width - 40, 91);
    p5.pop();
  }

  //A KEY
  function twirl_gesture() {
    r = 134;
    g = 224;
    b = 163;
    sc = 255;
    wave_text = 0;

    x = p5.windowWidth / 2;

    p5.push();
    p5.fill(g, b, b);
    p5.ellipse(x, y, 900);
    p5.pop();
    p5.push();
    p5.fill(250, 75, 67);
    p5.ellipse(x - x / 2, y - y / 2, 200, 200);
    p5.ellipse(x - x / 2, y + y / 2, 400, 400);
    p5.ellipse(x + x / 2, y + y / 2, 200, 200);
    p5.ellipse(x + x / 2, y - y / 2, 400, 400);
    p5.pop();

    twirl.play();

    p5.push();
    p5.textSize(16);
    p5.fill(255);
    p5.textFont("Roboto+Mono");
    p5.textAlign(p5.RIGHT);
    p5.text("T W I R L", p5.width - 40, 111);
    p5.pop();
  }
  //UP KEY
  function pluck_gesture() {
    r = 250;
    g = 75;
    b = 67;
    wave_text = 0;
    sc = 255;

    x = p5.windowWidth / 2;
    p5.push();
    p5.fill(23, 114, 250);
    p5.ellipse(x - x / 2, y, 500, 500);
    p5.ellipse(x + x / 2, y, 500, 500);
    p5.pop();

    p5.push();
    p5.fill(r, g, b);
    p5.ellipse(x - x / 2, y - y / 4, 200);
    p5.ellipse(x + x / 2, y + y / 4, 200);
    p5.pop();
    pluck.play();

    if (drums[d].isPlaying()) {
      drums[d].stop();
    }
    d = d + 1;
    if (d > drums.length - 1) {
      d = 0;
    }

    drums[d].loop();

    p5.push();
    p5.textSize(16);
    p5.fill(255);
    p5.textFont("Roboto+Mono");
    p5.textAlign(p5.RIGHT);
    p5.text("P L U C K", p5.width - 40, 131);
    p5.pop();
  }

  //Try application with keyboard
  p5.keyPressed = function () {
    //RIGHT
    if (p5.keyCode == "39") {
      right_gesture();
    }
    //LEFT
    else if (p5.keyCode == "37") {
      left_gesture();
    }

    //UP - PLUCK
    else if (p5.keyCode == "38") {
      pluck_gesture();
    }

    //DOWN -- poke
    else if (p5.keyCode == "40") {
      poke_gesture();
    }

    //A -- TWIRL
    else if (p5.keyCode == "65") {
      twirl_gesture();
    }
  };

  handleGesture = function (index) {
    switch (index) {
      case 0:
        gesture = "left";
        left_gesture();

        break;
      case 1:
        gesture = "right";
        right_gesture();

        break;
      case 2:
        gesture = "poke";
        poke_gesture();
        break;
      case 3:
        gesture = "twirl";
        twirl_gesture();
        break;
      case 4:
        gesture = "pluck";
        pluck_gesture();

        break;
      default:
    }
  };
}

export function triggerGesture(index) {
  if (!_p5) return;
  handleGesture(index);
}

export function userInit() {
  _p5.userStartAudio();
}

export function resizeCanvas() {
  _p5.windowResized();
}
