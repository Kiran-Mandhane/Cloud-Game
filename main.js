// Cloud game with arrays

// Set up canvas and context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// HTML Variables 
let cloudImg = document.getElementById("cloud");
let airplaneImg = document.getElementById("airplane");
let airportImg = document.getElementById("airport");

// Global Variables
let num = false;
let levelScore = 1;

let cloudArray = [];
for (let n = 0; n < 1; n++) {
  let size = Math.random() * 75 + 75
  cloudArray.push
  ({
  sizex: size,
  sizey: size / (5/3),
  x: Math.random() * 800,
  y: Math.random() * 530 - size / (5/3),
  dif: Math.random() * 8 - 4,
  });
}

console.log(cloudArray)

let yAirplane = 540;
let xAirplane = 350;

// Event Listeners
document.addEventListener("keydown", keydownHandler);
document.getElementById("levelUp-btn").addEventListener("click", levelUp);
document.getElementById("levelRestart-btn").addEventListener("click", restartLevel);


// Animation Loop
window.addEventListener("load", animate)

function animate() {
  document.getElementById("score").innerHTML = "Level: " + levelScore;
  // Contain airplane in canvas
  if (xAirplane < 0) {
    xAirplane = 0;
  } else if (xAirplane > 700) {
    xAirplane = 700;
  } else if (yAirplane < 0) {
    yAirplane = 0;
  } else if (yAirplane > 540) {
    yAirplane = 540;
  }
  
  // Background
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  ctx.drawImage(airplaneImg, xAirplane, yAirplane, 100, 60);
  ctx.drawImage(airportImg, 350, 10, 100, 100);

  for (let n = 0; n < cloudArray.length; n++) {
     cloudArray[n].x += cloudArray[n].dif;
    // If cloud goes off left side of canvas, teleport to right side at random height
    if (cloudArray[n].dif > 0) {
      if (cloudArray[n].x > 800) {
        cloudArray[n].x = -cloudArray[n].sizex;
        cloudArray[n].y = Math.random() * 600;
      }
    } else {
      if (cloudArray[n].x < -cloudArray[n].sizex) {
        cloudArray[n].x = 800 + cloudArray[n].sizex;
        cloud2y = Math.random() * 600;
      } 
    }


    // Draw Clouds
    ctx.drawImage(cloudImg, cloudArray[n].x, cloudArray[n].y, cloudArray[n].sizex, cloudArray[n].sizey);

    if ((yAirplane <= cloudArray[n].y + cloudArray[n].sizey && yAirplane >= cloudArray[n].y) && xAirplane + 50 >= cloudArray[n].x && xAirplane + 50 <= cloudArray[n].x + cloudArray[n].sizex / (50 / 41) //top airplane
    || (xAirplane <= cloudArray[n].x + cloudArray[n].sizex && xAirplane >= cloudArray[n].x) && (yAirplane + 35 >= cloudArray[n].y && yAirplane + 35 <= cloudArray[n].y + cloudArray[n].sizey / (25 / 19)) //left airplane
    || (yAirplane + 60 <= cloudArray[n].y + cloudArray[n].sizey && yAirplane + 60 >= cloudArray[n].y) && (xAirplane + 35 >= cloudArray[n].x && xAirplane + 35 <= cloudArray[n].x + cloudArray[n].sizex / (50 / 41)) //bottom airplane
    || (xAirplane + 100 <= cloudArray[n].x + cloudArray[n].sizex && xAirplane + 100 >= cloudArray[n].x) && ((yAirplane + 35 >= cloudArray[n].y && yAirplane + 35 <= cloudArray[n].y + cloudArray[n].sizey / (25 / 16)))) // right airplane 
    {
    gameOver();
    } else if ((yAirplane <= 110 && yAirplane >= 10) && (xAirplane + 50 >= 315 && xAirplane + 50 <= 475)) {
      winLevel();
    }
  }

    if (num === false) {
      window.requestAnimationFrame(animate);
      document.getElementById("levelUp-btn").disabled = true;
      document.getElementById("levelRestart-btn").disabled = true;
      document.getElementById("gameRestart-btn").disabled = true;
  } else if (num === true) {
      window.cancelAnimationFrame(animate);
      document.getElementById("levelRestart-btn").disabled = false;
      document.getElementById("gameRestart-btn").disabled = false;
  }
  
} 


function keydownHandler(event) {
  if (event.code === "ArrowUp") {
    yAirplane -= 10;
  } else if (event.code === "ArrowDown") {
    yAirplane += 10;
  } else if (event.code === "ArrowRight") {
    xAirplane += 10;
  } else if (event.code === "ArrowLeft") {
    xAirplane -= 10;
  }
}

function winLevel() {
  ctx.font = "100px Comic Sans MS";
  ctx.fillStyle = "black";
  ctx.fillText("YOU WON", 150, 350);
  for (let i = 0; i < cloudArray.length + 30; i++) {
    cloudArray.pop();
  }
  num = true;
  document.getElementById("levelUp-btn").disabled = false;
}

function gameOver() {
  // why do i have to put + 30 to make this work??? shouldn't it work after just i < cloudArray.lenth
  for (let i = 0; i < cloudArray.length + 30; i++) {
  cloudArray.pop();
  }
  ctx.font = "100px Comic Sans MS";
  ctx.fillStyle = "black";
  ctx.fillText("Game Over", 170, 320);
  console.log(cloudArray);
  num = true;
  document.getElementById("levelUp-btn").disabled = true;
} 

// Global variables for levelUp function: 
let sizeUp = 5; 
let cloudUp = 2
let difUp = 4;

function restartLevel() {
  num = false;
  yAirplane = 540;
  xAirplane = 350;

  for (let n = 0; n < (cloudUp - 1); n++) {
    let size = Math.random() * 75 + 75 + (sizeUp - 1);
    cloudArray.push
    ({
      sizex: size,
      sizey: size / (5/3),
      x: Math.random() * 800,
      y: Math.random() * 530 - size / (5/3),
      dif: Math.random() * ((difUp - 1) * 2) - (difUp - 1),
    });
  }

  document.getElementById("levelRestart-btn").disabled = true;
  animate();
}

function levelUp() {
  num = false;
  levelScore++;
  yAirplane = 540;
  xAirplane = 350;

  for (let n = 0; n < cloudUp; n++) {
  let size = Math.random() * 75 + 75 + sizeUp;
  cloudArray.push
  ({
  sizex: size,
  sizey: size / (5/3),
  x: Math.random() * 800,
  y: Math.random() * 530 - size / (5/3),
  dif: Math.random() * (difUp * 2) - difUp,
  });
}

  sizeUp += 5;
  cloudUp++;
  difUp++;
  console.log(cloudUp)

  if (sizeUp === 200) {
    sizeUp = 200;
  }

  animate();
}