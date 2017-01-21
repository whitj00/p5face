var setupbool = false;
var loadingscreen = true;
var currentface;
var face = {
  xval: 0,
  yval: 0,
  xwidth: 0,
  xheight: 0
};
function setup(){
  setFrameRate(2);
  camera = createDiv('<video id="video" width="640" height="420" preload autoplay loop muted></video>');
  camera.position(0,0);
  canvas = createCanvas(1000,500);
  canvas.id('canvas');
  canvas.position(0,0);
  facesmile = loadImage("smile.png");
  dogface = loadImage("dogface.png");
  ryanface = loadImage("ryan.png");
  earthface = loadImage("earth.png");
  rottenface = loadImage("rotten.gif");
  currentface = facesmile;
}

function runcamera() {
  if(setupbool == false) {
    setTimeout(runcamera, 3000);
  } else {
    //var video = document.getElementById('video');
    var facetracker = new tracking.ObjectTracker(['face']);
    facetracker.setInitialScale(4);
    facetracker.setStepSize(2);
    facetracker.setEdgesDensity(0.1);
    tracking.track("#video", facetracker, { camera: true });
    facetracker.on('track', function(event) {
      if (event.data.length === 0) {
      } else {
        event.data.forEach(function(facexy) {
          face.xval = facexy.x;
          face.yval = facexy.y;
          face.xheight = facexy.width;
          face.xwidth = facexy.height;
        });
      }
    });
  }
}
function draw(){
  clear();
  fill(0);
  rect(600,0,100,419);
  fill(255);
  textSize(12);
  text("Chose your face", 605,15);
  image(facesmile,625,50,50,50);
  image(rottenface,625,125,50,50);
  image(ryanface,625,200,50,50);
  image(dogface,625,275,50,50);
  image(earthface,625,350,50,50);
  if(face.xval != 0 || face.yval != 0)
    image(currentface,face.xval,face.yval,face.xheight, face.xwidth);
  setupbool = true;
  if(loadingscreen){
    fill(0);
    rect(0,0,700,419);
    if(Math.round(millis())%2 == 0){
      fill(255);
      textSize(48);
      text("Whit's House of Faces",100,100);
      textSize(24);
      text("Click to begin",300,200);
    }
  }
}
function mousePressed() {
  if(loadingscreen){
    clear();
    setFrameRate(60);
    loadingscreen=false;
  }
  else if(mouseX>=625 && mouseX<= 675){
    if(mouseY >= 50 && mouseY <= 100){
      currentface = facesmile;
    }
    else if(mouseY >= 125 && mouseY <= 175){
      currentface = rottenface;
    }
    else if(mouseY >= 200 && mouseY <= 250){
      currentface = ryanface;
    }
    else if(mouseY >= 275 && mouseY <= 325){
      currentface = dogface;
    }
    else if(mouseY >= 350 && mouseY <= 400){
      currentface = earthface;
    }
  }
}
