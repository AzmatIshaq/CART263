/**
Project 1 - Night at The Movies - CELL 14
Azmat Ishaq

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";


/* - - - - - - - - - - - VARIABLES - - - - - - - - - - - - - - - - - - - - -  */

// Variable to style canvas
let canvasProperties = {
// Set canvas width and height
  w: 850,
  h: 550,
};

// Variable to style the background
let bg = {
  r: 0,
  g: 0,
  b: 0,
};

// Variable to style title text displayed during title state
let titleText = {
  fill: 255,
  r: 255,
  g: 255,
  b: 20,
  alpha: 20,
  alpha2: 50,
  size: 20,
  size2: 17,
  x1: 2,
  x2: 2,
  y1: 3,
  y2: 2.3,
};

// Variable for fade effect
let fadeOut = {
  // Limit for how high the alpha fade effect will go
  upperLimit: 256,
  upperLimit2: 0,
  // Limit for how low the alpha fade effect will go
  lowerLimit: 40,
  lowerLimit2: 0,
  // Rate at which fade increases
  increaseRate: 2.5,
  increaseRate2: 0,
  // Rate at which fade decreases
  decreaseRate: 5,
  decreaseRate2: 0,
  rate: 0,
  rate2: 0,
}

// Timer variable for countdown timer
let timer = {
  countdown: 30,
  x: 40,
  y: 40,
  textFont: 60,
  fill: 255,
  fillRect: 0,
  rectX: 40,
  rectY: 40,
  rectW: 90,
  rectH: 70,
  frameCount: 60,
  reset: 40,
};

// Array variable for rain effect
let drop = [];

// Variable to set starting state to `title`
let state = `title`;

// Variable to create items
let item;

// Image variables
let imageRamen = undefined;

// Variable for intro text
let introText = undefined;

// Variable for intro Text string
let string = `
All work and no play makes me a dullard.
All work and no play makess Me a dullard,
Aall work and no play makes me a sdullard.,
All work and NO play makes me a dullard.
All work and no play makes me a dullard.`;




/*********************** PRELOAD **********************************************/

/**
Description of preload
*/
function preload() {

// Preload ramen noodles image
imageRamen = loadImage(`assets/images/ramen_pixelated.png`);

}


/*********************** SETUP ************************************************/

/**
Description of setup
*/
function setup() {

  createCanvas(canvasProperties.w, canvasProperties.h);

  resetStates();

  introText = new Typewriter(string, 25, 25, 350, 200, 0.1);

}


/*********************** DRAW *************************************************/


/**
Description of draw
*/
function draw() {
  background(bg.r, bg.g, bg.b);

    // Alternate between game states
  if (state === `title`) {
    titleState();
  }
  if (state === `animation`) {
    animationState();
  }

} // End of draw()

/* - - - - - - - - - - - USER INTERACTION - - - - - - - - - - - - - - - - - - */

/*********************** KEY PRESSED ******************************************/

function keyPressed() {
  // If the state is title and the user presses Enter then go to animation state
  if (state === `title` && key === "Enter") {
    state = `animation`;
  }
}
/*********************** MOUSE PRESSED ****************************************/

// function mousePressed() {
// }

/* - - - - - - - - - - - STATES - - - - - - - - - - - - - - - - - - - - - - - */

/*********************** ANIMATION STATE **************************************/

function animationState() {
  // Display timer
  countdownTimer();
  // Display rain drops
  dropDisplay();

}

/*********************** TITLE STATE ******************************************/

function titleState() {
  textAnimation();
}

/*********************** RESET STATES *****************************************/

function resetStates() {
  // Setup fade so rate is at 0
  titleText.alpha2 = 0;

  // Set up rain effect
  for (var i = 0; i < 200; i++) {
    drop[i] = new Drop();
  }

  // Set up items
  createItem();

}

/* - - - - - - - - - - - TEXT - - - - - - - - - - - - - - - - - - - - - - - - */

/*********************** TEXT ANIMATION ***************************************/

function textAnimation() {
    // Display title text if in title state
    if (state === `title`) {
      push();
      fill(titleText.r, titleText.g, titleText.b);
      textSize(titleText.size);
      textAlign(CENTER, CENTER);
      text(`Welcome to ...!`, width / titleText.x1, height / titleText.y1);
      textStyle(NORMAL);
      textSize(titleText.size2);
      fill(titleText.r, titleText.g, titleText.b, titleText.alpha2);
      text(`Press ENTER to start`, width / titleText.x2, height / titleText.y2);
      pop();


      // Fade effect for title text
      if (titleText.alpha2 <= fadeOut.lowerLimit) {
        fadeOut.rate = fadeOut.increaseRate;
      }

      if (titleText.alpha2 >= fadeOut.upperLimit) {
        fadeOut.rate =- fadeOut.decreaseRate;
      }

      titleText.alpha2 += fadeOut.rate;

  } // End of title text
}


/* - - - - - - - - - - - MISC - - - - - - - - - - - - - - - - - - - - - - - - */

/*********************** COUNTDOWN TIMER **************************************/

// Function to set up a countdown timer
function countdownTimer() {

  // Give the countdown Timer a background
  push();
  fill(timer.fillRect);
  rectMode(CENTER);
  rect(timer.x, timer.y, timer.rectW, timer.rectH);
  pop();

  // To display the countdown text
  push();
  fill(timer.fill);
  textAlign(CENTER, CENTER);
  textSize(timer.textFont);
  text(timer.countdown, timer.x, timer.y);
  pop();

  // Logic to make the countdown timer operate based on famecount.
  if (frameCount % timer.frameCount == 0 && timer.countdown > 0) {
    timer.countdown--;
  }
  // Game over text when countdown reaches 0
  if (timer.countdown == 0) {
    timer.countdown = timer.reset;
  }
}

/*********************** CREATE ITEM ******************************************/

// Create item
// Creates an item at a random position
function createItem() {
  let x = random(0, width);
  let y = random(0, height);
  item = new Items(x, y);
}

/*********************** UPDATE ITEM*******************************************/

// Function to manage changes to Item class
function updateItem() {
  item.display();
}



/*********************** DROP *************************************************/

// Function to simulate rain effect based on p5 sample code, see README for more information
// I adjusted some of the values to improve the rain effect

function Drop() {
  // Setting random position for rain drops
  this.x = random(0, width);
  this.y = random(0, -height);

  // Using anonymous function to display rain drop
  this.show = function() {
    noStroke();
    fill(50, 50, 255);
    ellipse(this.x, this.y, random(5, 10), random(5, 10));
  }

  // Using anonymous function to manage rain physics
  this.update = function() {
    this.speed = random(5, 10);
    this.gravity = 1.05;
    this.y = this.y + this.speed * this.gravity;

    // Resetting the raindrops to fall continuously
    if (this.y > height) {
      this.y = random(0, -height);
      this.gravity = 0;
    }
  }
} // End of Drop function

/*********************** DROP DISPLAY **************************************/

function dropDisplay() {
  // Rain effect

  for (var i = 0; i < 200; i++) {
    drop[i].show();
    drop[i].update();
  }
 }

/*********************** TYPEWRITER **************************************/


/*  END */
