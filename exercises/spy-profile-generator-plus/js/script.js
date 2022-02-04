/**
Spy profile Generator Plus!
Azmat Ishaq

Originally "Asks the user for their name and generates a spy profile for them! Uses
JSON data to create the profile. Generates a password and requires that
password to view the profile when the program is loaded again." - Pipping Barr

I added

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


// The spy profile data while the program is running
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,

  sidekick: `**REDACTED**`,
  nemesis: `**REDACTED**`,



  password: `**REDACTED**`
};

// Variables to store JSON data for generating the profile
let tarotData;
let objectsData;
let instrumentsData;
let celebrityData;
let vegetablesData;

// Reactive voice variable
let greeting;

// Text fade effect
let fadeOut = true;
let startTextAlpha = 0;

// Variable to make bomb diffuse sentence

let bombDiffuseSentence;

// Timer for bomb

// Timer variable for countdown timer
let timer = {
  countdown: 30,
  x: 40,
  y: 40,
  textFont: 60
}

// Variable for typewriter text
let text1 = `Hello`;

let lastCharacter;


/*********************** PRELOAD **********************************************/

/**
Description of preload
*/
function preload() {

  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
  objectsData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  instrumentsData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
  celebrityData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/celebrities.json`);
  vegetablesData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/foods/vegetables.json`);
}


/*********************** SETUP ************************************************/

/**
Description of setup
*/
function setup() {

  createCanvas(canvasProperties.w, canvasProperties.h);

  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));
    if (data !== null) {
      let password = prompt(`Agent! What is your password?!`)
        if (password === data.password) {
            setupSpyProfile(data);

        }
    }
    else {
        genereateSpyProfile();
    }

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

// function keyPressed() {
// }

/*********************** MOUSE PRESSED ****************************************/

function mousePressed() {
  let greeting = `Hello Agent ${spyProfile.name}`;
  if (spyProfile.name !== `**REDACTED**`) {
  responsiveVoice.speak(greeting, "UK English Male", {pitch: 1, rate: 1});
  } else {
  responsiveVoice.speak(`DENIED`, "UK English Male", {pitch: 0.8, rate: 1});
    }

  if (state === `title` && spyProfile.name !== `**REDACTED**`) {
    state = `animation`;
  }
}

/* - - - - - - - - - - - STATES - - - - - - - - - - - - - - - - - - - - - - - */

/*********************** ANIMATION STATE **************************************/

function animationState() {

let bombDiffuseSentence = ``

  push();
  textSize(32);
  textFont(`Courier, Monospace`);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  fill(255);
  text(`DEFUSE THE BOMB!`, width / 2, height / 6);
  pop();

  push();
  textSize(32);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  fill(255);
  text(`The secret code to diffuse the bomb is`, width / 2, height / 2);
  text(`${spyProfile.alias} and the ${spyProfile.alias}`, width / 2, height / 1.8);
  text(text1.substring(0, lastCharacter), width / 2, height / 2.3);
  pop();

  lastCharacter += 0.1;

  countdownTimer();
}

/*********************** TITLE STATE ******************************************/

function titleState() {



  let profile = `** SPY PROFILE: DO NOT DISTRIBUTE! **

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
Sidekick: ${spyProfile.sidekick}
Nemesis: ${spyProfile.nemesis}
Password: ${spyProfile.password}`;

  push();
  textSize(32);
  textFont(`Courier, Monospace`);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  fill(255);
  text(profile, width / 2, height / 2);
  pop();



  // Display end winning text
  push();
  fill(255, 255, 255, startTextAlpha);
  textSize(33);
  textAlign(CENTER, CENTER);
  text(`Click For Objective`, width / 2, height / 7);
  pop();

// Fade effect for text
if (startTextAlpha >= 256 || startTextAlpha <= 0) {
  fadeOut = !fadeOut;
}
if (fadeOut) {
  startTextAlpha -= 3
} else {
  startTextAlpha += 4
}
}





/*********************** RESET STATES *****************************************/

function resetStates() {

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
  spyProfile.nemesis = random(celebrityData.vegetables);

  // Generate a password from a random keyword for a random tarot card
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);
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

  spyProfile.password = data.password;
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
  if (frameCount % 60 == 0 && timer.countdown > 0) {
    timer.countdown--;
  }

  // Game over text when countdown reaches 0
  if (timer.countdown == 0) {
    state = `endLose`
  }
}
