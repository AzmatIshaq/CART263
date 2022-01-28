"use strict";

/*****************
Slamina New Game Plus
By Azmat Ishaq

Starting code is based on Pippin Barr's: Activity - Slamina!

Originally "a guessing game in which the page pronounces the name of an animal
backwards and the user has to figure out what it was and say the
name forwards." - Pippin Barr

In Slamina New Game Plus I added some more features to the code such as
character animation, audio voice responses, a scorekeeper, background color
changing, game states, etc.

Note: there is a scorekeeper but no win state. There is a lose state if
the character gets too close to the player.

- Azmat Ishaq

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
  w: 200,
  h: 200,
  vx: 0,
  vy: 1,
  sizeIncrease: 1,
  setupX: 2,
  setupY: 5.5,
  // angle properties to manipulate image width
  angleW: 0.1,
  angleIncreaseW: 0.15,
  // angle properties to manipulate image height
  angleH: 0.1,
  angleIncreaseH: 0.15,
  // properties to reset the image width, height, and angle
  reset: 200,
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

// Level variable
let level = 0;

// background colour variable
let bg = {
  r: 0,
  g: 0,
  b: 0,
  // property for background color increase
  increase: 25,
  increaseALot: 65,
};

// Variable to style user answers when displayed as text
let answerText = {
  correctR: 0,
  correctG: 255,
  correctB: 0,
  wrongR: 255,
  wrongG: 0,
  wrongB: 0,
  x: 2,
  y: 2,
};

// Variable to style score when displayed as text
let scoreText = {
  fill: 255,
  size: 35,
  x: 10,
  y: 1.5
};

// Variable to style tutorial text displayed during animation state
let tutorialText = {
  fill: 255,
  size: 20,
  x1: 2,
  x2: 2,
  x3: 2,
  y1: 1.3,
  y2: 1.2,
  y3: 1.1,
};

// Variable to style text displayed during title state
let titleText = {
  fill: 255,
  size: 20,
  x1: 2,
  x2: 2,
  x3: 2,
  x4: 2,
  x5: 2,
  x6: 2,
  y1: 5,
  y2: 4,
  y3: 2,
  y4: 1.7,
  y5: 1.5,
  y6: 1.3,
}

// Variable to style text displayed during end state
let endText = {
  fill: 255,
  size: 20,
  x1: 2,
  x2: 2,
  y1: 2,
  y2: 1.7,
}


/* END OF VARIABLES */


/*************************************************************************************************/

/**
Preloading happy and sad images to display for right and wrong answers
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

  // Setting up image position
  imageProperties.x = width / imageProperties.setupX;
  imageProperties.y = height / imageProperties.setupY;

  // Is annyang available?
  if (annyang) {
    // Create the guessing command
    let commands = {
      // Voice command to guess an animal
      'It is *animal': guessAnimal,
      // Voice command to reset character to original position
      'back off'() {
        // Change happy state to true if it isn't
        happyState = true;
        responsiveVoice.speak("Oh fiddle sticks!", "UK English Male", {
          pitch: pitchHigh
        });
        imageProperties.w = imageProperties.reset;
        imageProperties.h = imageProperties.reset;
        imageProperties.y = height / imageProperties.setupY;
      },
      // Voice command to add more red to background color
      'add red'() {
        alert(`Ok Boss!`);
        bg.r += bg.increase;

      },
      // Voice command to add a lot more red to background color
      'add a lot of red'() {
        alert(`Ok Boss!`);
        bg.r += bg.increaseALot;

      },
      // Voice command to add more green to background color
      'add green'() {
        bg.g += bg.increase;
        alert(`Ok Boss!`);

      },
      // Voice command to add a lot more green to background color
      'add a lot of green'() {
        alert(`Ok Boss!`);
        bg.r += bg.increaseALot;

      },
      // Voice command to add more blue to background color
      'add blue'() {
        bg.b += bg.increase;
        alert(`Ok Boss!`);

      },
      // Voice command to add a lot more blue to background color
      'add a lot of blue'() {
        bg.b += bg.increaseALot;
        alert(`Ok Boss!`);

      },
    };

    // Setup annyang and start
    annyang.addCommands(commands);
    annyang.start();
  }

  // Text defaults
  textSize(50);
  textStyle(BOLD);
  textAlign(CENTER);

  // Setting default image mode
  imageMode(CENTER);

  // Prevent background rgb from being more than 255
  if (bg.r > 255) {
    bg.r = 255;
  }

  if (bg.g > 255) {
    bg.g = 255;
  }

  if (bg.b > 255) {
    bg.b = 255;
  }


}
/*************************************************************************************************/

/**
Display the current answer and animate the character. Also display the score and other text.
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

  if (state === `endLose`)
    endLoseState();
}

/*************************************************************************************************/

/**
Display the current answer in red if incorrect and green if correct
(Displays nothing if no guess entered yet)
*/
function displayAnswer() {

  if (currentAnswer === currentAnimal) {
    fill(answerText.correctR, answerText.correctG, answerText.correctB);
  } else {
    fill(answerText.wrongR, answerText.wrongG, answerText.wrongB);
  }
  text(currentAnswer, width / answerText.x, height / answerText.y);
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
    responsiveVoice.speak("Well done!", "UK English Male", {
      pitch: pitchHigh
    });
    // Character animates when user is correct
    imageProperties.w = abs(sin(imageProperties.angle)) * imageProperties.w;

    if (scoreKeeper === level) {
      // Increase the score
      scoreKeeper++;
    }
  } else {
    // Responsive voice reacts to user when they are incorrect
    responsiveVoice.speak("That is wrong!", "UK English Male", {
      pitch: pitchLow
    });
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

  // Reset the character position
  imageProperties.w = imageProperties.reset;
  imageProperties.h = imageProperties.reset;
  imageProperties.y = height / imageProperties.setupY;
}

/*************************************************************************************************/

/**
When the user clicks, go to the next question
*/
function mousePressed() {
  if (state === `animation`) {
    nextQuestion();
    // If the scorekeeper is more than the level only then will the level number increase
    if (scoreKeeper > level) {
      level++;
    }
  }


  // Go from title state to animation state by pressing mouse
  if (state === `title`) {
    state = `animation`;
  }

  // Reset the image properties
  imageProperties.w = imageProperties.reset;
  imageProperties.h = imageProperties.reset;
  imageProperties.angleW = imageProperties.angleReset;
  imageProperties.angleH = imageProperties.angleReset;
  imageProperties.y = height / imageProperties.setupY;
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
  } else {
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

  // If the user guesses an answer incorrectly then the character will appear to move towards the user
  if (currentAnswer != currentAnimal && happyState === false) {
    // Character movement
    imageProperties.w += imageProperties.sizeIncrease;
    imageProperties.h += imageProperties.sizeIncrease;
    imageProperties.y += imageProperties.vy;
    // Losing condition if character gets too close
    if (imageProperties.y > height) {
      state = `endLose`;
    }
  }
}

/*************************************************************************************************/


function textAnimation() {
  // Text to display score
  push();
  fill(scoreText.fill);
  textSize(scoreText.size);
  textAlign(CENTER, CENTER);
  text(`Score` + `:` + ` ` + scoreKeeper, width / scoreText.x, height / scoreText.y);
  pop();

  // Text on how to play that is displayed during animation state
  push();
  fill(tutorialText.fill);
  textSize(tutorialText.size);
  textAlign(CENTER, CENTER);
  text(`Try to guess which animal the AI is saying backwards. Say "It is [animal]"`, width / tutorialText.x1, height / tutorialText.y1);
  text(`Click the mouse to try a different animal`, width / tutorialText.x2, height / tutorialText.y2);
  text(`Say "Back off" if the character gets too close to you`, width / tutorialText.x3, height / tutorialText.y3);
  pop();

}

/*************************************************************************************************/

// Title state of the game
function titleState() {


  // Display title text
  push();
  fill(titleText.fill);
  textSize(titleText.size);
  textAlign(CENTER, CENTER);
  text(`Welcome to Slamina New Game Plus!`, width / titleText.x1, height / titleText.y1);
  textStyle(NORMAL);
  textSize(17);
  text(`Click the mouse to start playing`, width / titleText.x2, height / titleText.y2);
  pop();

  // Display end winning text
  push();
  fill(titleText.fill);
  textSize(titleText.size);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  text(`But first try changing the background color`, width / titleText.x3, height / titleText.y3);
  text(`Say "Add Red" for more red`, width / titleText.x4, height / titleText.y4);
  text(`Say "Add A Lot of Red" for a lot of red`, width / titleText.x5, height / titleText.y5);
  text(`This works for Green and Blue also...`, width / titleText.x6, height / titleText.y6);
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

// Function to load the end lose state elements
function endLoseState() {

  // Display end winning text
  push();
  fill(endText.fill);
  textSize(endText.size);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  text(`He Got Too Close!`, width / endText.x1, height / endText.y1);
  text(`Refresh the Page to Try Again`, width / endText.x2, height / endText.y2);
  pop();
}


/*  END */
