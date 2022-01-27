"use strict";

/*****************
Slamina New Game Plus
By Azmat Ishaq

Starting Code based on Pippin Barr's: Activity - Slamina!

Originally a guessing game in which the page pronounces the name of an animal
backwards and the user has to figure out what it was and say the
name forwards.

In Slamina New Game Plus there are added game states
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

// The current answer to display (we use it initially to display the click instruction)
let currentAnswer = `Click to begin.`;
// The current animal name the user is trying to guess
let currentAnimal = ``;


// Happy and sad images variable

let imgHappy = undefined;
let imgSad = undefined;

// Variable to set the state of the character emotion
let happyState = true;


                                /* END OF VARIABLES */
/*************************************************************************************************/

/** Preloading happy and sad images to display for right and wrong answers
*/

function preload() {


  imgHappy = loadImage('assets/images/happy_birthday.png'); // Load the happy image

  imgSad = loadImage('assets/images/sad_birthday.png'); // Load the sad image

}

/**
Create a canvas
Set up annyang with the guessing command
Set text defaults
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Is annyang available?
  if (annyang) {
    // Create the guessing command
    let commands = {
      'It is *animal': guessAnimal
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

  displayAnswer();

  characterAnimation()
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


    responsiveVoice.speak("Well done!", "UK English Male", {pitch: 2} );
    happyState = true;


  }
  else {
         responsiveVoice.speak("Wrong!", "UK English Male", {pitch: 2} );
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
}

/*************************************************************************************************/

/**
function to display character and reaction
*/

function characterAnimation() {

  if (happyState) {
    // Displays the happy image at its actual size at a specific position
    image(imgHappy, width / 2, height / 5, 300, 300);
  }  else {
    // Displays the sad image at its actual size at a specific position
    image(imgSad, width / 2, height / 5, 300, 300);
  }

}
