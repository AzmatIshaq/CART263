/**
ProgressBar class
 */

class ProgressBar {

 constructor() {
   // Position and dimensions and fill colour of progress bar
  this.width = 99;
  this.height = 18.5;
  this.x = width / 23.7;
  this.y = height / 1.066;
  // Colour of progressbar
  this.progressBarFill = {
      r: 25,
      g: 161,
      b: 200,
      a: 255,
    };

  // progress bar name
  this.name = "progressBar";

  // Width of box outline of progress bar
  this.outlineWidth = 100;
  this.outlineHeight = 20;
  // Position of box outline of progress bar
  this.outlineX = width / 10;
  this.outlineY = height / 1.04;
  // progress box outline Color
  this.outlineStroke = 255;


  // Position for "progress" text above healtbar
  this.progressTextX = width / 10;
  this.progressTextY = height / 1.1;
  this.progressTextSize = 18;
  this.progressTextFill = 255;

  // Maximum progress value
  this.progressMax = 99;

  // Minimum progress value
  this.progressMin = 0;

  }



  display() {
    if (scene === `sceneThree` && state === `sceneThreeEscape`) {
    // Player progress text

     push();
     fill(this.progressTextFill);
     textAlign(CENTER, CENTER);
     textSize(this.progressTextSize);
     text('FENCE', this.progressTextX, this.progressTextY);
     pop();

     // Outline for progress bar

     push();
     stroke(this.outlineStroke);
     noFill();
     rectMode(CENTER);
     rect(this.outlineX, this.outlineY, this.outlineWidth, this.outlineHeight);
     pop();

     // progress bar retangle
  if (this.width > this.progressMin) {
     push();
     noStroke();
     fill(this.progressBarFill.r, this.progressBarFill.g, this.progressBarFill.b, this.progressBarFill.a);
     rectMode();
     rect(this.x, this.y, this.width, this.height);
     pop();
      }
    }
  }
 }
