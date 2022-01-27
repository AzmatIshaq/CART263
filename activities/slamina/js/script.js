/**
Slamina
by Azmat Ishaq
Based on Pippin Barrs code

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

const animals =
   [
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

let currentAnimal = ``;

// Variable to display answer on screen
let currentAnswer = ``;


                        /* END OF VARIABLES */

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {

  createCanvas(650, 450);

  if(annyang) {
    let commands = {
      'I think it is *animal': guessAnimal
    };
    annyang.addCommands(commands);
    annyang.start();

    // Screen text

    textSize(30);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);


  }
}


/**
Description of draw()
*/
function draw() {
  background(0);

  if (currentAnswer === currentAnimal) {
    fill(0, 255, 0);
  } else {
      fill(255, 0, 0);
    }

    // Screen text
    text(currentAnswer, width / 2, height / 2);


}


// mousePressed function

function mousePressed() {
  currentAnimal = random(animals);
  let reverseAnimal = reverseString(currentAnimal);
  responsiveVoice.speak(reverseAnimal);
} // End of mousePressed function

// Function to process user input for animal guess
function guessAnimal(animal) {
  currentAnswer = animal;
  console.log(currentAnswer)
}


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
