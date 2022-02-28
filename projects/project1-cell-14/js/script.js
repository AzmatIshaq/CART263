/**
Project 1 - Night at The Movies - CELL 14
Azmat Ishaq

This program creatively simulates parts of the movie I-Robot.
It operates based on scenes which are alternated between using states.
The dialogue and user interaction occurs by utilizing annyang and responsive voice.
Furthermore, JSON is used to store the dialogue data. Events are often triggered
using setTimeout.

*/

"use strict";

/* - - - - - - - - - - - VARIABLES - - - - - - - - - - - - - - - - - - - - -  */


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
  alpha2: 0,
  size: 30,
  size2: 22,
  x1: 2,
  y1: 3,
  x2: 2,
  y2: 1.2
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


// Array variable for rain effect
let drop = [];

/* #BFFF00
Variable to set starting state */
let state = `title`;
// let state = `sceneTwo`;
// let state = `sceneThree`;
// let state = `sceneFour`;


// Variable for intro text
let openingText = undefined;

// Variable for intro Text string
let string = `
Detective's log, Date 3471.

I have been tasked with the investigation of a
malfunctioning android: C-4478.

It was detected damaging some equipment on board the Starship Endeavour 2.

The android was sent to Cargo Bay 3 to be repaired.

It escaped after injuring a crew member.

The crew stated it got "angry"...

C-4478 now sits in Cell 14 waiting for my
preliminary interrogation.

. . .`;

/* ~~~~ IMAGE VARIABLES ~~~~ */

// Variable for designer character image
let designer;

// Variable for andoird character image
let androidImage = undefined;

/* ~~~~ SOUND VARIABLES ~~~~ */

// Variables for intro sound response for incorrect and correct questions
let incorrectQuestion = undefined;
let correctQuestion = undefined;

// Variable for soundtrack
let introMusic = undefined;

// Variable for alarm sound in scene 3
let alarmSound = undefined;

/* ~~~~ JSON VARIABLES ~~~~ */

// Variable for JSON dialogue data file

let dialogueData;

/* MISC VARIABLES */

// Variable array to set up star effect in intro
let stars = [];

// Variables for JSON scene dialogue
let sceneTwoDialogue = `sceneTwo`;
let sceneThreeDialogue = `sceneThree`;

// Variable to track correct answers
let correctAnswerTracker1 = 0;
let correctAnswerTracker2 = 0;

// Variables to display questions for scene changes
let displayQuestionSceneTwo;
let displayQuestionSceneThree;
let displayExtraQuestionSceneThree;


// Variable to add effects to android image
let androidEffect = {
  width: 0.1,
  height: 0.1,
  widthIncrease: 0.4,
  heightIncrease: 0.4,
  shrink: false
};

// Toggle the android effect
let androidEffectActive = true;

// Array to manage the android army in scene 3
let androidArmy = [];

// Amount of androids in android army
let androidArmyAmount = 10;

// Android army effect
let androidArmyEffect = {
  width: 0.1,
  height: 0.1,
  widthIncrease: 0.1,
  heightIncrease: 0.1,
  active: true
}

// Ending sequence active tracker
let endingSequenceActive = false;

// Ending credits boolean
let credits = true;

// Variable for credits in scene four
let sceneFourCredits = {
  height: 500,
  vy: 0.3
};

// Variable for fade effect into scene 3
let fadeSquare = {
  width: 750,
  height: 450,
  alpha: 245,
  alphaDecrease: 1,
  active: true
};

/*********************** PRELOAD **********************************************/

/**
Preload the sounds, images, and JSON data for the program.
*/
function preload() {

  /* Preload Sound */

  // Preloading sound for correct and incorrect responses
  incorrectQuestion = loadSound(`assets/sounds/ask_right_question.mp3`);

  // Preloading sound for correct and incorrect responses
  correctQuestion = loadSound(`assets/sounds/the_right_question.mp3`);

  // Prealoading intro sound music
  introMusic = loadSound(`assets/sounds/detective_intro_soundtrack.mp3`)

  // Preloading alarm sound
  alarmSound = loadSound(`assets/sounds/facility-alarm-sound.wav`)

  /* Preload JSON */

  // Preloading JSON data for dialogue
  dialogueData = loadJSON(`assets/data/dialogue.JSON`);

  /* Preload Image */

  // Preloading designer image
  designer = loadImage(`assets/images/my_pic_pixelated.png`);
  // Preloading android image
  androidImage = loadImage(`assets/images/irobot.png`)

}


/*********************** SETUP ************************************************/

/**
Function to setup canvas, annyang, title star effect,
*/
function setup() {

  createCanvas(750, 450);

  alert(`Please use Google Chrome. Other browsers may not load the content correctly. Also be sure to allow Microphone and Audio access to get the full experience.`);

  if (annyang) {
    annyang.start();
  }

  // Setup scene interactions
  setUpScene();

  // Setup effects for intro and scene one
  setupIntroEffects();

  // Trigger soundtrack
  if (state === `title`) {
    playMusic();
  }

  // Stars effect during intro
  for (let i = 0; i < 1000; i++) {
    stars[i] = new Star();
  }

  // For loop to set up android army amount and position
  for (let i = 0; i < androidArmyAmount; i++) {
    androidArmy.push({
      x: random(100, 600),
      y: height / 2
    })
  }
} // End of setup()


/*********************** SET UP SCENE *****************************************/

// Function to set up the scene's annyang dialogue and user interactions

function setUpScene() {

  // Dialogue code for annyang in scene two

  // Commands only for scene two
  if (state === `sceneTwo`) {

    // Clear previous commands
    annyang.removeCommands();

    let commands = {};

    // For loop to setup dialogue JSON data so that correct responses get an alert and
    // incorrect responses get an audio response
    for (let i = 0; i < dialogueData[sceneTwoDialogue].questions.length; i++) {
      let question = dialogueData[sceneTwoDialogue].questions[i];
      commands[question.question] = function() {
        if (question.correct === true) {

          // Alert response from designer character if the correct question is asked.
          alert(question.answer);

          // Tracker to tally correct answers to be able to move to the next scene.
          correctAnswerTracker1++
          if (correctAnswerTracker1 === 5) {
            displayQuestionSceneTwo = true;

            //change the scene when the right questions are asked
            let finalSceneQuestion = dialogueData.sceneTwo.finalQuestion;

            // Feed the commands data to annyangs commands array
            commands[finalSceneQuestion.question] = function() {
              if (finalSceneQuestion.sceneChange === true) {
                correctQuestion.play();
                introMusic.stop();

                // Delay before changing states
                // Anonymouse function to manage delay elements
                let sceneChangeDelay = function() {
                  state = `sceneThree`;
                  setUpScene();
                  // Android effect becomes activated
                  androidEffectActive = true;

                };
                // Delay the scene change
                setTimeout(sceneChangeDelay, 6000);
              }
            }
            // Add the new command to annyang commands.
            annyang.addCommands(commands);
          }

        } else if (question.correct === false) {
          incorrectQuestion.play()
        }
      };
    }

    // Add the commands to annyang
    annyang.addCommands(commands);

  } // End of scene two annyang

  // Annyang interactions for Scene Three
  if (state === `sceneThree`) {

    annyang.removeCommands();

    let commands = {};

    // For loop to setup dialogue JSON data so that correct responses get an alert and
    // incorrect responses get an audio response
    for (let i = 0; i < dialogueData[sceneThreeDialogue].questions.length; i++) {
      let question = dialogueData[sceneThreeDialogue].questions[i];
      console.log(dialogueData[sceneThreeDialogue].questions.answer);
      commands[question.question] = function() {
        if (question.correct === true) {
          responsiveVoice.speak(question.answer, "UK English Male", {
            pitch: 0.4,
            rate: 0.9,
          });

          // Tracker to tally correct answers to be able to move to the next scene.
          correctAnswerTracker2++
          if (correctAnswerTracker2 === 5) {
            // Display the secret question
            displayExtraQuestionSceneThree = true;

            let extraSceneQuestion = dialogueData.sceneThree.extraQuestion;

            commands[extraSceneQuestion.question] = function() {
              if (extraSceneQuestion.triggerFinalQuestion === true) {
                // Display the secret question
                displayQuestionSceneThree = true;
                // Responsive voice triggers
                responsiveVoice.speak(extraSceneQuestion.answer, "UK English Male", {
                  pitch: 0.4,
                  rate: 0.9,
                });
              }
            };

            //change the scene when the right question is asked
            let finalSceneQuestion = dialogueData.sceneThree.finalQuestion;

            commands[finalSceneQuestion.question] = function() {
              if (finalSceneQuestion.triggerEnding === true) {
                endingSequenceActive = true;
                annyang.removeCommands();
                responsiveVoice.speak(finalSceneQuestion.answer, "UK English Male", {
                  pitch: 0.4,
                  rate: 0.9,
                });

                // Delay before initiating ending sequence
                // Anonymouse function to manage delay elements
                let endingSequenceDelay = function() {
                  alarmSound.setVolume(0.1);
                  alarmSound.loop();
                  // Trigger responsive voice message
                  responsiveVoice.speak(dialogueData.sceneThree.automatedMessage, "UK English Female", {
                    pitch: 0.9,
                    rate: 0.75,

                  });

                  //Final state switch to scene four blank screen
                  let finalScene = function() {
                    state = `sceneFour`
                    setUpScene();
                    alarmSound.stop();
                  };

                  // Timer to control when the effect occurs
                  setTimeout(finalScene, 9000);

                };
                // Delay the scene change
                setTimeout(endingSequenceDelay, 4000);
              }
            }

            // Add the new command to annyang commands.
            annyang.addCommands(commands);
          }
        }
      };
    }
    // Add the new command to annyang commands.
    annyang.addCommands(commands);

    // Trigger responsive void dialogue for android when it reaches correct size.
    responsiveVoice.speak(dialogueData[sceneThreeDialogue].androidGreeting, "UK English Male", {
      pitch: 0.4,
      rate: 0.9,
    });
  } // End of scene three setup


  // Start the intro music again in scene four
  if (state === `sceneFour`) {
    let sceneFourMusic = function() {
      playMusic();
    };
    // Delay the start of the music
    setTimeout(sceneFourMusic, 2000);
  }

} // End of setUpScene function

/*********************** DRAW *************************************************/

/**
Draw function to switch between states and alter background color.
*/
function draw() {
  background(bg.titleColour);

  // Alternate between game states
  if (state === `title`) {
    titleState();
  }
  if (state === `sceneOne`) {
    sceneOneState();
  }
  if (state === `sceneTwo`) {
    sceneTwoState();
  }
  if (state === `sceneThree`) {
    sceneThreeState();
  }
  if (state === `sceneFour`) {
    sceneFourState();
  }
} // End of draw()

/* - - - - - - - - - - - USER INTERACTION - - - - - - - - - - - - - - - - - - */

/*********************** KEY PRESSED ******************************************/

// KeyPressed function to trigger changes between states
function keyPressed() {

  /* #BFFF00 add keypressed so audio starts correctly*/

  // If the state is sceneOne and the user presses Enter then go to next state
  if (state === `sceneOne` && key === "Enter") {
    // Lower volume
    introMusic.setVolume(0.3);
    // Trigger responsive voice message
    responsiveVoice.speak(dialogueData.sceneOne.automatedMessage, "UK English Female", {
      pitch: 0.9,
      rate: 0.75,
    });
    // Delay before changing states
    // Anonymouse function to manage delay elements
    let sceneOneMessage = function() {
      state = `sceneTwo`;
      setUpScene();
    };
    setTimeout(sceneOneMessage, 4000);
  }

  // If the state is title and the user presses Enter then go to next state
  if (state === `title` && key === "Enter") {
    state = `sceneOne`
  }
}

/*********************** TITLE STATE ******************************************/

// Function to manage title state elements that will be in draw()
function titleState() {

  // Display scene one text
  textAnimation();

  // Stars effect
  for (var i = 0; i < stars.length; i++) {
    stars[i].draw();
  }

} // End of title state

/*********************** SCENE ONE STATE **************************************/

// Function to manage scene one state elements that will be in draw()
function sceneOneState() {

  // Display rain drops
  dropDisplay();
  // Display scene one text
  textAnimation();

}

/*********************** SCENE TWO STATE **************************************/

// Function to manage scene two state elements that will be in draw()
function sceneTwoState() {

  // Display the designer image
  push();
  imageMode(CENTER);
  image(designer, width / 2, height / 2, 200, 200);
  pop();

  // Display scene text
  textAnimation();

}

/*********************** SCENE THREE STATE ************************************/

// Function to manage scene three state elements that will be in draw()
function sceneThreeState() {

  // Display scene text
  textAnimation();

  // Display the android image
  push();
  imageMode(CENTER);
  image(androidImage, width / 2, height / 2, androidEffect.width, androidEffect.height);
  pop();

  // Effect to have scene fade in
  fadeSceneEffect();


  // Effect to have android incrase in size
  let androidMeeting = function() {
    if (androidEffectActive) {
      // Effect for android in scene three
      androidEffect.width += androidEffect.widthIncrease;
      androidEffect.height += androidEffect.heightIncrease;
    }
  }

  // Timer to control when the effect occurs
  setTimeout(androidMeeting, 2000);

  // Limit the size of the image
  if (androidEffect.width > 200) {
    androidEffectActive = false;
    androidEffect.width = 200;
    // androidEffect.height = 200;
  }

  // Trigger to display multiple androids
  if (endingSequenceActive) {

    // Display the android army
    for (let i = 0; i < androidArmyAmount; i++) {
      image(androidImage, androidArmy[i].x, androidArmy[i].y, androidArmyEffect.width, androidArmyEffect.height);

    }

    if (androidEffect.width < 0.2) {
      // Make the android army grow
      androidArmyEffect.width += androidArmyEffect.widthIncrease;
      androidArmyEffect.height += androidArmyEffect.heightIncrease;
    }
  }

  // Stop android army from growing
  if (androidArmyEffect.width > 200) {
    androidArmyEffect.width = 200;
    androidArmyEffect.height = 200;
  }


  // Trigger android shrinking
  if (endingSequenceActive) {
    androidEffect.shrink = true;
    if (androidEffect.shrink) {
      androidEffect.width -= androidEffect.widthIncrease;
      androidEffect.height -= androidEffect.heightIncrease;
    }
  }

  // Stop shrinking
  if (androidEffect.width < 0.1) {
    androidEffect.shrink = false;
    androidEffect.width = 0.1;
    androidEffect.height = 0.1;
  }
} // End of scene three state

/*********************** SCENE FOUR STATE *************************************/

// Function to manage scene four state elements that will be in draw()
function sceneFourState() {

  // Code to run ending credits

  if (credits === true) {
    textAnimation();
  }

  if (sceneFourCredits.height < -2000) {
    sceneFourCredits.height = 650;
    credits = false;
  }

}



/*********************** SETUP INTRO EFFECTS **********************************/

function setupIntroEffects() {

  // Set up rain effect
  for (let i = 0; i < 200; i++) {
    drop[i] = new Drop();
  }

  // Set up typewriter class
  openingText = new Typewriter(string, 25, 25, 550, 550, 0.28);

}

/* - - - - - - - - - - - TEXT - - - - - - - - - - - - - - - - - - - - - - - - */

/*********************** TEXT ANIMATION ***************************************/

// Function to handle all of the text animation
function textAnimation() {

  // Display title text if in title state
  if (state === `title`) {
    push();
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    textSize(titleText.size);
    fill(titleText.r, titleText.g, titleText.b);
    text(`CELL-14`, width / titleText.x1, height / titleText.y1, );
    pop();

    push();
    textAlign(CENTER, CENTER);
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
      fadeOut.rate = -fadeOut.decreaseRate;
    }

    titleText.alpha2 += fadeOut.rate;

  } // End of title text

  // Text to display if it is scene one
  if (state === `sceneOne`) {

    // To display opening text
    openingText.update();

  }

  // Text to display if it is scene two
  if (state === `sceneTwo`) {

    // Header text for scene two
    push();
    fill(255);
    textSize(23);
    text(dialogueData[sceneTwoDialogue].intro, width / 3.5, height / 7);
    pop();

    // User direction text for scene two
    push();
    fill(255);
    textSize(23);
    text(dialogueData[sceneTwoDialogue].userDirection, width / 3.5, height / 5);
    pop();

    // Dialogue text for scene two
    for (let i = 0; i < dialogueData[sceneTwoDialogue].questions.length; i++) {
      let question = dialogueData[sceneTwoDialogue].questions[i];
      push();
      fill(255);
      text(question.question + `?`, width / 14, 140 + i * 25);
      pop();
    }

    // Text to display if user has met the conditions
    if (displayQuestionSceneTwo === true) {
      push();
      fill(90, 160, 200);
      textSize(20);
      textAlign(CENTER, CENTER);
      textStyle(NORMAL);
      text(dialogueData.sceneTwo.finalQuestion.question + `?`, width / 5.5, height / 1.2);
      pop();
    }
  }

  // Text to display if it is scene three
  if (state === `sceneThree`) {

    // Header text for scene three
    push();
    fill(255, 20, 20);
    textSize(23);
    text(dialogueData[sceneThreeDialogue].intro, width / 4, height / 6);
    pop();

    // Dialogue text for scene two
    for (let i = 0; i < dialogueData[sceneThreeDialogue].questions.length; i++) {
      let question = dialogueData[sceneThreeDialogue].questions[i];

      // Display more dialogue if ending sequence is active
      if (androidEffect.width > 100 && endingSequenceActive === false) {
        push();
        fill(255);
        text(question.question + `?`, width / 14, 200 + i * 25);
        pop();
      }
    }

    // Text to display if user has met the conditions
    if (displayExtraQuestionSceneThree === true && endingSequenceActive === false) {
      push();
      fill(90, 160, 200);
      textSize(20);
      // textAlign(CENTER, CENTER);
      textStyle(NORMAL);
      text(dialogueData.sceneThree.extraQuestion.question + `?`, width / 4, height / 1.2);
      pop();
    }

    // Text to display if user has met the conditions
    if (displayQuestionSceneThree === true) {
      push();
      fill(90, 160, 200);
      textSize(20);
      // textAlign(CENTER, CENTER);
      textStyle(NORMAL);
      text(dialogueData.sceneThree.finalQuestion.question + `?`, width / 4, height / 1.1);
      pop();
    }
  }

// Text to display if it is scene four
  if (state === `sceneFour`) {
    // Make credits scroll upwards.
    sceneFourCredits.height -= sceneFourCredits.vy;

    push();
    fill(90, 160, 200);
    textSize(16);
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    text(`Made by Azmat Ishaq`, width / 2, sceneFourCredits.height);
    text(`Code contributions by Pippin Barr`, width / 2, sceneFourCredits.height + 100);
    text(`See README for more information`, width / 2, sceneFourCredits.height + 200);
    pop();

  }
} // End of Text animation function


/* - - - - - - - - - - - MISC - - - - - - - - - - - - - - - - - - - - - - - - */


/*********************** PLAY MUSIC *******************************************/

// Function to play game music
function playMusic() {
  introMusic.loop();
};

/*********************** FADE SCENE EFFECT *******************************************/

// Function for fading effecting for scene switching
function fadeSceneEffect() {

  // Effect to have scene fade in
  push();
  fill(0, 0, 0, fadeSquare.alpha);
  rectMode(CENTER);
  rect(width / 2, height / 2, fadeSquare.width, fadeSquare.height);
  pop();

  // Stop the effect
  if (state === `sceneThree` && fadeSquare.active === true) {
    fadeSquare.alpha -= fadeSquare.alphaDecrease
    if (fadeSquare.alpha < 0) {
      fadeSquare.active = false;
      fadeSquare.alpha = 0;
    }
  }
};


/*********************** DROP *************************************************/

// Function to simulate rain effect based on p5 sample code, see README for more information

// Effect by kelsierose94 see README for more details
// I adjusted some of the values to modify the rain effect

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

// Function for rain drop effect in scene one
function dropDisplay() {
  // Rain effect

  for (var i = 0; i < 200; i++) {
    drop[i].show();
    drop[i].update();
  }
}


/*********************** Class: Star ******************************************/

// Class for star effect in title screen
// Effect by wvnl see README for more details
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
