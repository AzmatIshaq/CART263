/**
Project title
Author

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

// Variable to set starting state to `title`
let state = `title`;


// The spy profile data while the program is running
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`
};

// Variables to store JSON data for generating the profile
let tarotData;
let objectsData;
let instrumentsData;

/*********************** PRELOAD **********************************************/

/**
Description of preload
*/
function preload() {

  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
  objectsData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  instrumentsData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);

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

// function mousePressed() {
// }

/* - - - - - - - - - - - STATES - - - - - - - - - - - - - - - - - - - - - - - */

/*********************** ANIMATION STATE **************************************/

function animationState() {

}

/*********************** TITLE STATE ******************************************/

function titleState() {

  let profile = `** SPY PROFILE: DO NOT DISTRIBUTE! **

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
Password: ${spyProfile.password}`;

  push();
  textSize(32);
  textFont(`Courier, Monospace`);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  fill(255);
  text(profile, width / 2, height / 2);
  pop();
}



/*********************** RESET STATES *****************************************/

function resetStates() {

}

/* - - - - - - - - - - - MISC - - - - - - - - - - - - - - - - - - - - - - - - */

/*********************** GENERATE SPY PROFILE *********************************/

function genereateSpyProfile() {
  spyProfile.name = prompt (`Agent! What is your name?`);
  let instrument = random(instrumentsData.instruments);
  spyProfile.alias =  `The ${instrument}`
  spyProfile.secretWeapon = random(objectsData.objects);
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

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
  spyProfile.password = data.password;
}
