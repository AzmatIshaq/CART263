"use strict";

/*****************
Slamina New Game Plus
By Azmat Ishaq

Starting code is based on Pippin Barr's: Activity - Slamina!

Originally a guessing game in which the page pronounces the name of an animal
backwards and the user has to figure out what it was and say the
name forwards.

In Slamina New Game Plus I added a character animation. I also responsive voice elements.
******************/

// An array of animal names from
// https://github.com/dariusk/corpora/blob/master/data/animals/common.json
const animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];

const QUESTION_DELAY = 2000; // in milliseconds

// Variable to set initial state

let state = `title`;

// The current answer to display (we use it initially to display the click instruction)
let currentAnswer = `Click to begin.`;
// The current animal name the user is trying to guess
let currentAnimal = ``;

// Happy and sad images variables for character animation
let imgHappy = undefined;
let imgSad = undefined;

// Variable to set size of character image
  let imageProperties = {
    x: 0,
    y: 0,
    w: 300,
    h: 300,
    // angle properties to manipulate image width
    angleW: 0.1,
    angleIncreaseW: 0.15,
    // angle properties to manipulate image height
    angleH: 0.1,
    angleIncreaseH: 0.15,
    // properties to reset the image width, height, and angle
    reset: 300,
    angleReset: 0.1,
  };

// Variable to set the state of the character emotion
let happyState = true;

// Scorekeeper variable to keep track of score
let scoreKeeper = 0;

// Variables for pitch for responsive voice
// Setting for low pitch
let pitchLow = 0.1;
// Setting for high pitch
let pitchHigh = 2;


                                /* END OF VARIABLES */


/*************************************************************************************************/

/** Preloading happy and sad images to display for right and wrong answers
*/

function preload() {

  imgHappy = loadImage('assets/images/happy_birthday.png'); // Load the happy image

  imgSad = loadImage('assets/images/sad_birthday.png'); // Load the sad image

}

/*************************************************************************************************/

/**
Create a canvas
Set up annyang with the guessing command
Set text defaults
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  imageProperties.x = width / 2;
  imageProperties.y = height / 5;

  // Is annyang available?
  if (annyang) {
    // Create the guessing command
    let commands = {
      'It is *animal': guessAnimal,
      'back off' () {
          happyState = true;
          responsiveVoice.speak("Oh fiddle sticks!", "UK English Male", {pitch: pitchHigh} );
          imageProperties.w = imageProperties.reset;
          imageProperties.h = imageProperties.reset;
          imageProperties.y = height / 5;
      },
    };

    // Setup annyang and start
    annyang.addCommands(commands);
    annyang.start();
  }

  // Text defaults
  textSize(102);
  textStyle(BOLD);
  textAlign(CENTER);

  // Setting default image mode
  imageMode(CENTER);
}

/*************************************************************************************************/

/**
Display the current answer.
 */
function draw() {
  background(0);

 // Alternate between game states
 if (state === `title`) {
   titleState();
 }
 if (state === `animation`) {
   animationState();
 }
}

/*************************************************************************************************/

/**
Display the current answer in red if incorrect and green if correct
(Displays nothing if no guess entered yet)
*/
function displayAnswer() {

  if (currentAnswer === currentAnimal) {
    fill(0, 255, 0);
  }
  else {
    fill(255, 0, 0);
  }
  text(currentAnswer, width / 2, height / 2);
}

/*************************************************************************************************/

/**
Reverse the animal name and say it with ResponsiveVoice
*/
function sayAnimalBackwards(animal) {
  let reverseAnimal = reverseString(animal);
  responsiveVoice.speak(reverseAnimal);
}

/*************************************************************************************************/

/**
Reverses the provided string
*/
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split('');
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join('');
  // Return the result
  return result;
}

/*************************************************************************************************/

/**
Called by annyang when the user make a guess.
animal parameter contains the guess as a string.
Sets the answer text to the guess.
*/
function guessAnimal(animal) {
  // Convert the guess to lowercase to match the answer format
  currentAnswer = animal.toLowerCase();

  if (currentAnswer === currentAnimal) {
    // Change character animation state to happy
      happyState = true;
    // Responsive voice reacts to user when they are correct
      responsiveVoice.speak("Well done!", "UK English Male", {pitch: pitchHigh} );
    // Character animates when user is correct
      imageProperties.w = abs(sin(imageProperties.angle)) * imageProperties.w;
    // Increase the score
    scoreKeeper++
  }
  else {
      // Responsive voice reacts to user when they are incorrect
       responsiveVoice.speak("That is wrong!", "UK English Male", {pitch: pitchLow} );
       // Change character animation state to sad
       happyState = false;
  }
}



/*************************************************************************************************/

/**
Reset the answer text, get a new random animal, say its name
*/
function nextQuestion() {
  currentAnswer = ``;
  currentAnimal = random(animals);
  sayAnimalBackwards(currentAnimal);
}

/*************************************************************************************************/

/**
When the user clicks, go to the next question
*/
function mousePressed() {
  nextQuestion();


  // Go from title state to animation state by pressing mouse
  if (state === `title`) {
    state = `animation`;
  }

  // Reset the image properties
  imageProperties.w = imageProperties.reset;
  imageProperties.h = imageProperties.reset;
  imageProperties.angleW = imageProperties.angleReset;
  imageProperties.angleH = imageProperties.angleReset;
  imageProperties.y = height / 5;
}

/*************************************************************************************************/

/**
function to display character and reaction
*/

function characterAnimation() {
  // If the happy state is true or false then the character will change their expression
  if (happyState) {
    // Display the happy character image
    image(imgHappy, imageProperties.x, imageProperties.y, imageProperties.w, imageProperties.h);
  }  else {
    // Display the sad character image
    image(imgSad, imageProperties.x, imageProperties.y, imageProperties.w, imageProperties.h);
  }

  // If the user guesses an answer correctly then the character will grow and shrink
  if (currentAnswer === currentAnimal && happyState) {

    // Character grows and shrinks when user is correct
    imageProperties.angleW = imageProperties.angleW + imageProperties.angleIncreaseW;
    imageProperties.angleH = imageProperties.angleH + imageProperties.angleIncreaseH;
    imageProperties.w = abs(sin(imageProperties.angleW)) * imageProperties.reset;
    imageProperties.h = abs(sin(imageProperties.angleH)) * imageProperties.reset;

}
  // If the user guesses an answer incorrectly then the character will spin
  if (currentAnswer != currentAnimal && happyState === false) {

    imageProperties.w += 1
    imageProperties.h += 1

  }

  // If the user guesses an answer incorrectly then the character will spin
  if (currentAnswer != currentAnimal && happyState === false) {

    imageProperties.w += 1
    imageProperties.h += 1
    imageProperties.y += 1

  }
}

/*************************************************************************************************/

function textAnimation () {
  // Text to display score
  push();
  fill(255);
  textSize(55);
  textAlign(CENTER, CENTER);
  text(`Score` + `:` + ` ` + scoreKeeper, width / 10, height / 1.5);
  pop();

}

/*************************************************************************************************/

// Title state of the game
function titleState() {

  // Display end winning text
  push();
  fill(255, 255, 255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(`Click mouse to continue`, width / 2, height / 2);
  pop();
}

/*************************************************************************************************/

function animationState() {
  // This function displays the user's answer
  displayAnswer();

  // This function animates the game character
  characterAnimation();

  // This function displays some of the game text
   textAnimation();

}

                                                /*  END */
