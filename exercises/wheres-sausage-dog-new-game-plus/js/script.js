"use strict";

/*****************
Where's Sausage Dog New Game Plus!
By Azmat Ishaq
Expanded on original code from Pippin Barr Sausage Dog Activitiy on Github:
https://github.com/pippinbarr/cart263/tree/main/examples/p5js/wheres-sausage-dog

Find the Sausage Dog!
This code displays a bunch of animals on screen. The players needs to find the
Sausage Dog animal in order to win!

The code uses a state system for different stages of the game. For loops and arrays are used to
load and display the objects (animals).

I added multiple effects in the New Game Plus! version such as multiple game states, animal movement, a countdown timer, a background image, and oscillator sound effects.


******************/



// Constant to set the number of animal images
const NUM_ANIMAL_IMAGES = 10;

// Constants for image loading
const ANIMAL_IMAGE_PREFIX = `assets/images/animal`;
const SAUSAGE_DOG_IMAGE = `assets/images/sausage-dog.png`;

// Number of images to display
const NUM_ANIMALS = 100;

// Array of the loaded animal images
let animalImages = [];
// Array of animal objects
let animals = [];
// Loaded sausage dog image
let sausageDogImage;
// Sausage dog object
let sausageDog;


// Add a border to canvas
let canvasBorder = 0.90;

// Set title text values to create fade effect
let startTextAlpha = 255;
let fadeOut = true;

// Timer variable for countdown timer
let timer = {
  countdown: 13,
  x: 60,
  y: 60

}

// Setting the starting state
let state = `title`;

// Variable to position intro and end game text.
let gameText = {
  introWidth1: 2,
  introWidth2: 2,
  introHeight1: 2.8,
  introHeight2: 2,
  endWidth1: 2,
  endWidth2: 2,
  endHeight1: 2.8,
  endHeight2: 2,
};

// Variable to setup oscillator sound

let osc = new p5.Oscillator(300);

// Array variable for rain effect

let drop = [];



// preload()
// Loads all the animal images and the sausage dog image
function preload() {
  // Loop once for each animal image, starting from 0
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    // Load the image with the current number (starting from 0)
    let animalImage = loadImage(`${ANIMAL_IMAGE_PREFIX}${i}.png`);
    // Add the image to the array for use later when randomly selecting
    animalImages.push(animalImage);
  }

  // Load the sausage dog image
  sausageDogImage = loadImage(`${SAUSAGE_DOG_IMAGE}`);
}


// setup()
// Creates all the animal objects and a sausage dog object
function setup() {
  createCanvas(windowWidth * canvasBorder, windowHeight * canvasBorder);

  setupLevel();

}

// createAnimals()
// Creates all the animals at random positions with random animal images
function createAnimals() {
  // Create the correct number of animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    // Create one random animal
    let animal = createRandomAnimal();
    // Add it to the animals array
    animals.push(animal);
  }
}

// createRandomAnimal()
// Create an animal object at a random position with a random image
// then return that created animal
function createRandomAnimal() {
  let x = random(0, width);
  let y = random(0, height);
  let animalImage = random(animalImages);
  let animal = new Animal(x, y, animalImage);
  return animal;
}

// createSausageDog()
// Creates a sausage dog at a random position
function createSausageDog() {
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

// draw()
// Draws the background then updates all animals and the sausage dog
function draw() {
  background(0);

  // If statements to alternate between game states
  if (state === `title`) {
    titleState();
  }
  if (state === `animation`) {
    animationState();
  }

  if (state === `endWin`) {
    endWinState();
  }

  if (state === `endLose`) {
    endLoseState();
  }



} // End of draw function


// mousePressed()
// Automatically called by p5 when the mouse is pressed.
// Call the sausage dog's and animal mousePressed() method so it knows
// the mouse was clicked.

function mousePressed() {
  sausageDog.mousePressed();
  for (let i = 0; i < animals.length; i++) {
    animals[i].mousePressed();
  }
} // End of mousePressed function


// Game states

function titleState() {

  // Display end winning text
  push();
  fill(255,255,255, startTextAlpha);
  textSize(44);
  textAlign(CENTER, CENTER);
  text(`Find Sausage Dog Before the Timer Runs Out!`, width / gameText.introWidth1, height / gameText.introHeight1);
  text(`Press Enter to Start`, width / gameText.introWidth2, height / gameText.introHeight2);
  pop();

  // Fade effect for text
  if (startTextAlpha >= 256 || startTextAlpha <= 0) {
    fadeOut = !fadeOut;
  }
  if (fadeOut) {
    startTextAlpha -= 5
  } else {
    startTextAlpha += 5
  }


  // Sausage dog image
  image(sausageDogImage, width / 2 , height / 1.5);

}

// Animation state function to organize animation functions and code together

function animationState() {

updateAnimals();
updateSausageDog();
countdownTimer();

// Rain effect

for(var i = 0; i < 200; i++) {
drop[i].show();
drop[i].update();
}

} //End of animationState


// updateAnimals()
// Calls the update() method for all animals
function updateAnimals() {
  // Loop through all animals
  for (let i = 0; i < animals.length; i++) {
    // Update the current animal
    animals[i].update();
  }
}

// updateSausageDog()
// Calls the update() method of the sausage dog
function updateSausageDog() {
  sausageDog.update();
}


// Function to load the end win state elements
function endWinState() {

  // Display end winning text
  push();
  fill(255);
  textSize(44);
  textAlign(CENTER, CENTER);
  text(`Congratulations You Found Sausage Dog!`, width / gameText.endWidth1, height / gameText.endHeight1);
  text(`Refresh the Page to Try Again`, width / gameText.endWidth2, height / gameText.endHeight2);
  pop();

}

// Function to load the end lose state elements
function endLoseState() {

  // Display end winning text
  push();
  fill(255);
  textSize(44);
  textAlign(CENTER, CENTER);
  text(`The Timer Ran Out!`, width / gameText.endWidth1, height / gameText.endHeight1);
  text(`Refresh the Page to Try Again`, width / gameText.endWidth2, height / gameText.endHeight2);
  pop();

}


function keyPressed() {

  // Change between states based on keyPressed

  // Go from title state to animation state by pressing enter
  if (state === `title` && key === "Enter") {

    state = `animation`;
    playOscillator();

  }



}

// Level setup function to setup all the necessary elements
function setupLevel() {
  createAnimals();
  createSausageDog();

  // Rain effect setup
  for(var i = 0; i < 200; i++) {
    drop[i] = new Drop();
  }
}


// Function to set up a countdown timer
function countdownTimer() {

  // Give the countdown Timer a background

  push();
  fill(0);
  rectMode(CENTER);
  rect(timer.x, timer.y, 130, 100);
  pop();


  // To display the countdown text
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(100);
  text(timer.countdown, timer.x, timer.y);
  pop();



  // Logic to make the countdown timer operate based on famecount.
  if (frameCount % 60 == 0 && timer.countdown > 0) {
    timer.countdown --;
  }

  // Game over text when countdown reaches 0
  if (timer.countdown == 0) {
    state = `endLose`
  }
}

// Oscillator function to generator sounds for game

// Sound for checkpoint interaction
function playOscillator() {
    osc.start();
    osc.amp(5);

// Starts at 700Hz
    osc.freq(700);

// Ramps to 10Hz over 0.7 seconds
    osc.freq(10, 0.7);
    osc.amp(0, 0.1, 0.7);
  }


// Function to simulate rain effect based on p5 sample code, see README for more information
// I adjusted some of the values to improve the rain effect

function Drop() {
  // Setting random position for rain drops
  this.x = random(0, width);
  this.y = random(0, -height);

  // Using anonymous function to display rain drop
  this.show = function() {
    noStroke();
    fill(255,255,22);
    ellipse(this.x, this.y, random(5, 10), random(5, 10));
  }

  // Using anonymous function to manage rain physics
  this.update = function() {
    this.speed = random(5, 10);
    this.gravity = 1.05;
    this.y = this.y + this.speed*this.gravity;

  // Resetting the raindrops to fall continuously
    if (this.y > height) {
      this.y = random(0, -height);
      this.gravity = 0;
    }
  }
}
