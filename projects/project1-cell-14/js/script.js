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
  w: 750,
  h: 450,
};

// Variable to style the background
let bg = {
  r: 0,
  g: 0,
  b: 0,
  titleColour: 30,
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
  size2: 27,
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
  lowerLimit: 20,
  lowerLimit2: 0,
  // Rate at which fade increases
  increaseRate: 1.5,
  increaseRate2: 0,
  // Rate at which fade decreases
  decreaseRate: 2,
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

// Variable for intro text
let openingText = undefined;

// Variable for intro Text string
let string = `
Detective's log, Date 3471.

I have been tasked with the investigation of a
malfunctioning android: C-4478.

It was detected damaging some equipment on board the Startship Endeavour 2.

The android was then sent to Cargo Bay 3 to be
repaired.

It escaped after injuring a crew member.

The crew stated it got "angry"...

C-4478 now sits in Cell 14 waiting for my
preliminary interrogation.

. . .`;


// Variables for intro sound response for incorrect and correct questions

let incorrectQuestion = undefined;

let correctQuestion = undefined;

// Variable for soundtrack

let introMusic = undefined;

// Variable for JSON dialogue data file

let dialogueData;

// Variable to set designers active state to true

let designerScene1Active = false;

// Variable array to set up star effect in intro

let stars = [];

/*********************** PRELOAD **********************************************/

/**
Description of preload
*/
function preload() {

// Preloading sound for correct and incorrect responses
incorrectQuestion = loadSound(`assets/sounds/ask_right_question.mp3`);

// Preloading JSON data for dialogue
dialogueData = loadJSON(`assets/data/dialogue.JSON`);

// Prealoading intro sound music
introMusic = loadSound(`assets/sounds/detective_intro_soundtrack.mp3`)

}


/*********************** SETUP ************************************************/

/**
Description of setup
*/
function setup() {

  createCanvas(canvasProperties.w, canvasProperties.h);

  resetStates();

  if (annyang && state === `sceneTwo`) {
    // Let's define our first command. First the text we expect, and then the function it should call
    let commands = {
      // 'testing' is what the user would say. I guess you type it out?
      'Designer speak to me': function() {
        alert(`Speak detective. But note, my responses are limited.`);
        designerScene1Active = true;
        incorrectQuestion.play();
        },

      // 'testing' is what the user would say. I guess you type it out?
      'Designer goodbye': function() {
        if (designerScene1Active) {
        alert(`Goodbye detective.`);
        designerScene1Active = false;
      }
        },

      'Who *anything': function() {
        if(designerScene1Active) {
        incorrectQuestion.play();
        // Change state to next level of intro
        // state = `intro phase 1`;
          }
        },

      // 'What revolution?': function() {
      //   if(designerScene1Active) {
      //   correctQuestion.play();
      //   // Change state to next level of intro
      //   // state = `intro phase 1`;
      //     }
      //   },

      }

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();

  } // End of annyang

// Trigger soundtrack
  if (state === `title`) {
    introMusic.loop();
  }

// Stars effect during intro
for (let i = 0; i < 1000; i++) {
		stars[i] = new Star();
	}



} // End of setup()

/*********************** DRAW *************************************************/


/**
Description of draw
*/
function draw() {
  background(bg.r, bg.g, bg.b);

// Background effects
  if(state === `title`) {
    bg.r = bg.titleColour;
    bg.g = bg.titleColour;
    bg.b = bg.titleColour;
  }
  // else {
  //   bg.r = 60;
  //   bg.g = 60;
  //   bg.b = 60;
  // }


    // Alternate between game states
  if (state === `title`) {
    titleState();

  }
  if (state === `sceneOne`) {
    sceneOneState();
  }
  if (state === `animation`) {
    animationState();
  }

} // End of draw()

/* - - - - - - - - - - - USER INTERACTION - - - - - - - - - - - - - - - - - - */

/*********************** KEY PRESSED ******************************************/

function keyPressed() {
  // Make sure to order the if statements correctly to switch states effectively.

  // If the state is title and the user presses Enter then go to animation state
  if (state ===`sceneOne` && key === "Enter") {
    state = `sceneTwo`;
  }

  // If the state is title and the user presses Enter then go to animation state
  if (state === `title` && key === "Enter") {
    state = `sceneOne`;
  }



}
/*********************** MOUSE PRESSED ****************************************/

function mousePressed() {
  console.log(state);

}

/* - - - - - - - - - - - STATES - - - - - - - - - - - - - - - - - - - - - - - */

/*********************** ANIMATION STATE **************************************/

// function animationState() {
//
// }



/*********************** TITLE STATE ******************************************/

function titleState() {
  textAnimation();

  // Stars effect
  for (var i = 0; i < stars.length; i++) {
  stars[i].draw();
  }

} // End of title state

/*********************** SCENE 1 STATE ****************************************/

function sceneOneState() {

  // Display timer
  countdownTimer();
  // Display rain drops
  dropDisplay();
  // Display scene one text
  textAnimation();

}

/*********************** SCENE 1 STATE ****************************************/

function sceneTwoState() {

}

/*********************** SCENE 1 STATE ****************************************/

function sceneThreeState() {

}

/*********************** RESET STATES *****************************************/

function resetStates() {
  // Setup fade so rate is at 0
  titleText.alpha2 = 0;

  // Set up rain effect
  for (let i = 0; i < 200; i++) {
    drop[i] = new Drop();
  }

  // Set up items
  createItem();

  // Set up typewriter class
  openingText = new Typewriter(string, 25, 25, 550, 550, 0.18);

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
      // text(`Welcome to ...!`, width / titleText.x1, height / titleText.y1);
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


    if (state === `sceneOne`) {

      // To display opening text
      openingText.update();

      }


    if (state === `sceneTwo`) {
      // JSON in animation state

      // Variable to setup JSON dialogue file
       let dialogue1 = dialogueData.dialogue.scene1[0].type;

       // To display the dialogue
       push();
       fill(255);
       textAlign(CENTER, CENTER);
       textSize(33);
       text(dialogue1, 250, 250);
       pop();

    }


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

/*********************** DROP DISPLAY *****************************************/

function dropDisplay() {
  // Rain effect

  for (var i = 0; i < 200; i++) {
    drop[i].show();
    drop[i].update();
  }
 }


/*********************** Class: Star ******************************************/
 // star class
 class Star {
 	constructor() {
 		this.x = random(width);
 		this.y = random(height);
 		this.size = random(0.25, 3);
 		this.t = random(TAU);
 	}

 	draw() {
 		this.t += 0.1;
 		let scale = this.size + sin(this.t) * 2;
 		noStroke();
 		ellipse(this.x, this.y, scale, scale);
 	}
}

/*  END */
