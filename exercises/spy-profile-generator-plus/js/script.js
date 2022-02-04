/**
Spy profile Generator Plus!
Azmat Ishaq

Originally "Asks the user for their name and generates a spy profile for them! Uses
JSON data to create the profile. Generates a password and requires that
password to view the profile when the program is loaded again." - Pipping Barr

I added additional JSON profile information. I also added user interaction to move
to animation as well as keyboard input. The user now has to defuse a bomb in the
animation state by inputing information. 

JSON Library:
Darius Kazemi's corpora project:
https://github.com/dariusk/corpora/
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

// Variable to set starting state to `title`
let state = `title`;
// let state = `animation`;

// The spy profile data while the program is running
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,

  sidekick: `**REDACTED**`,
  nemesis: `**REDACTED**`,

  password: `**REDACTED**`,
  code1: ``,
  code2: ``,
};


// Variables to store JSON data for generating the profile
let tarotData;
let objectsData;
let instrumentsData;
let celebrityData;
let vegetablesData;
// Variables for secret code
let artIsmsData;
let bodyPartsData;


// Reactive voice variable
let greeting;

// Text fade effect
let fadeOut = true;
let startTextAlpha = 0;

// Bomb pulsing effect

let bombPulse = true;

// Variable to load bomb image

let imgBomb;

// Variable to set bomb image values
let bombImage = {
  width: 100,
  height: 100
};

// Bomb defuse initial state
let bombDefused = false;

// Timer variable for bomb timer
let timer = {
  countdown: 20,
  x: 40,
  y: 40,
  textFont: 60
}

//set the biggest the diameter can be
// set initial values
let maxDiameter;
let theta;


let secretCodeAnswer;

// Variable for current code
let currentCode;

/*********************** PRELOAD **********************************************/

/**
Preloading data from dariusk JSON library
Also preloading some images
*/
function preload() {
  // JSON libraries for agent profile
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
  objectsData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  instrumentsData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
  celebrityData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/celebrities.json`);
  vegetablesData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/foods/vegetables.json`);

  // JSON libraries for secret code
  artIsmsData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/art/isms.json`)
  bodyPartsData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/bodyParts.json`)

  // Preloading bomb image
  imgBomb = loadImage(`../assets/images/bomb.png`)
}


/*********************** SETUP ************************************************/

/**
Description of setup
*/
function setup() {

  createCanvas(canvasProperties.w, canvasProperties.h);

// data variable to setup JSON for spy profile
  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));
  // If there is no data already then generate a new profile
  // Otherwise ask for a password
    if (data !== null) {
      let password = prompt(`Agent! What is your password?!`)
        if (password === data.password) {
            setupSpyProfile(data);

        }
    }
    else {
        genereateSpyProfile();
    }

    // Set up pulsing variables
    maxDiameter = 30;
    theta = 0;

  } // End of setup

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


function keyPressed() {

if(state === `animation` && key === `Enter`) {
  let secretCodeAnswer = prompt(`What is the secret code?`)
    // Stop bomb if user guesses correct code
    if (secretCodeAnswer === `${spyProfile.code1} is my favourite ${spyProfile.code2}`) {
      responsiveVoice.speak(`Well done`, "UK English Male", {pitch: 1, rate: 1});
      // setTimeout(state = `title`, 30000000);

      // Stop pulsing bomb
      maxDiameter = 0;
      theta = 0;
      // Change bomb state
      bombDefused = true;

    }
  }
}

/*********************** MOUSE PRESSED ****************************************/

function mousePressed() {
  let greeting = `Hello Agent ${spyProfile.name}. Here is your first mission`;
  if (state === `title` && spyProfile.name !== `**REDACTED**`) {
  responsiveVoice.speak(greeting, "UK English Male", {pitch: 1, rate: 1});
} else if (state === `title`) {
  responsiveVoice.speak(`DENIED`, "UK English Male", {pitch: 0.8, rate: 1});
    }

  if (state === `title` && spyProfile.name !== `**REDACTED**`) {
    state = `animation`;
  }

  if (state === `animation` && bombDefused === true) {
    state = `title`;
  }
}

/* - - - - - - - - - - - STATES - - - - - - - - - - - - - - - - - - - - - - - */

/*********************** ANIMATION STATE **************************************/

function animationState() {

  // Tutorial text on next action for user
  push();
  textSize(32);
  textFont(`Courier, Monospace`);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  fill(255);
  text(`DEFUSE THE BOMB!`, width / 2, height / 6);
  pop();

  // Tutorial text on next action for user
  push();
  textSize(28);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  fill(255);
  text(`Press Enter to type the secret code and defuse the bomb:`, width / 2, height / 2);
  text(`${spyProfile.code1} is my favourite ${spyProfile.code2}`, width / 2, height / 1.8);
  pop();

  // Variable to set diameter of bomb image
  let diam = 120 + sin(theta) * maxDiameter ;

  // Display the bomb image
  push();
  imageMode(CENTER);
  // Display the bomb image
  image(imgBomb, 170, 135, diam, diam)
  pop();

  // make theta keep getting bigger
  // you can play with this number to change the speed
   theta += .2;

// Text to guide user back to title screen after completing mission
if (bombDefused === true && state === `animation`) {

  push();
  fill(255, 255, 255, startTextAlpha);
  textSize(33);
  textAlign(CENTER, CENTER);
  text(`Click to go back to Agent Profile`, width / 2, height / 10);
  pop();
}

  // Apply fade on text during title state
  fadeEffect();

  // Display countdown timer
  countdownTimer();

} // End of animationState

/*********************** TITLE STATE ******************************************/

function titleState() {
  // A variable to hold all the strings that will be displayed for the agent's
  // profile
  let profile = `** SPY PROFILE: DO NOT DISTRIBUTE! **

  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret Weapon: ${spyProfile.secretWeapon}
  Sidekick: ${spyProfile.sidekick}
  Nemesis: ${spyProfile.nemesis}
  Password: ${spyProfile.password}`;

  // Display profile text
  push();
  textSize(32);
  textFont(`Courier, Monospace`);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  fill(255);
  text(profile, width / 2, height / 2);
  pop();

  // Display text to guide user to objective
  push();
  fill(255, 255, 255, startTextAlpha);
  textSize(33);
  textAlign(CENTER, CENTER);
  text(`Click For Objective`, width / 2, height / 7);
  pop();

  //Apply fade on text during title state
  fadeEffect();

  // reset the timer
  timer.countdown = 20;
  // reset bomb state
  bombDefused = false;
  // reset bomb animation
  // Set up pulsing variables
  maxDiameter = 30;
  theta = 0;
}

/* - - - - - - - - - - - MISC - - - - - - - - - - - - - - - - - - - - - - - - */

/*********************** GENERATE SPY PROFILE *********************************/

function genereateSpyProfile() {
  spyProfile.name = prompt (`Agent! What is your name?`);
  // Generate an alias from a random instrument
  spyProfile.alias = `The ${random(instrumentsData.instruments)}`;
  // Generate a secret weapon from a random object
  spyProfile.secretWeapon = random(objectsData.objects);
  // Generate a random celebrity as a sidekick
  spyProfile.sidekick = random(celebrityData.celebrities);
  // Generate a random vegetable as nemesis
  spyProfile.nemesis =  `The ${random(vegetablesData.vegetables)}`;
  // Generate a password from a random keyword for a random tarot card
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);
  // Generate a random art ism as part of a secret code
  spyProfile.code1 = random(artIsmsData.isms);
  // Generate a random body part as part of a secret code
  spyProfile.code2 = random(bodyPartsData.bodyParts);

  // Save the resulting profile to local storage
  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

/*********************** SETUP SPY PROFILE ************************************/

/**
Assigns across the profile properties from the data to the current profile
*/
function setupSpyProfile(data) {
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.sidekick = data.sidekick;
  spyProfile.nemesis = data.nemesis;
  spyProfile.password = data.password;
  spyProfile.code1 = data.code1;
  spyProfile.code2 = data.code2;
}


/*********************** GENERATE SECRET CODE *********************************/

function generateSecretCode(data2) {
  // Generate a random celebrity as a sidekick
  secretCode.code1 = random(artIsmsData.isms);

  // Generate a random vegetable as nemesis
  secretCode.code2 =  random(bodyPartsData.bodyParts);

  localStorage.setItem(`secret-code-data`, JSON.stringify(secretCode));
}


/*********************** COUNTDOWN TIMER **************************************/
// Function to set up a countdown timer

function countdownTimer() {

  // Give the countdown Timer a background

  push();
  fill(0);
  rectMode(CENTER);
  rect(timer.x, timer.y, 90, 70);
  pop();


  // To display the countdown text
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(timer.textFont);
  text(timer.countdown, timer.x, timer.y);
  pop();

  // Logic to make the countdown timer operate based on famecount.
  if (frameCount % 60 == 0 && timer.countdown > 0 && bombDefused === false) {
    timer.countdown--;
  }

  // Game over text when countdown reaches 0
  if (timer.countdown === 0) {
    responsiveVoice.speak(`You are lucky this was only a test, Agent. I reset the timer so you can try again.`, "UK English Male", {pitch: 1, rate: 0.9});
    timer.countdown = 20;

  }
} // End of countdown Timer

/*********************** FADE EFFECT ******************************************/

function fadeEffect() {
  // Fade effect for text
  if (startTextAlpha >= 256 || startTextAlpha <= 0) {
    fadeOut = !fadeOut;
  }
  if (fadeOut) {
    startTextAlpha -= 3;
  } else {
    startTextAlpha += 4;
  }
}
