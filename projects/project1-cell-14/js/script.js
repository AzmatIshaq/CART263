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
  alertColour: 0,
  main: 30,
};

// Variable to style title text displayed
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

// Variable for intro Text typewriter effect string
let sceneOneText = `
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

// Variable to style scene two text
let sceneTwoText = {
  fill: 255,
  size: 30,
  size2: 22,
  x1: 2,
  y1: 3,
  x2: 2,
  y2: 1.2,
  headerSize: 23,
  headerFill: 255,
  headerX: 3.5,
  headerY: 7,
  directionsSize: 23,
  directionsFill: 255,
  directionsX: 3.5,
  directionsY: 5,
  dialogueX: 14,
  dialogueY: 140,
  dialogueSpacing: 25,
  finalQuestion: {
    r: 90,
    g: 160,
    b: 255,
    size: 20,
    x: 5.5,
    y: 1.2,
  },
};


// Variable to style scene three text
let sceneThreeText = {
  fill: {
    r:255,
    g: 255,
    b: 255
  },
    size: 12,
    x: 14,
    y: 200,
    spacing: 25,
  headerSize: 23,
  headerFill: {
    r: 255,
    g: 20,
    b: 20
  },
  headerX: 3.5,
  headerY: 7,
  dialogueX: 14,
  dialogueY: 140,
  dialogueSpacing: 25,
  finalQuestion: {
    r: 90,
    g: 160,
    b: 255,
    size: 20,
    x: 4,
    y: 1.1,
    x2: 4,
    y2: 1.2,
    spacing: 25
  },
  trigger: 100
};

// Variable for credits in scene four
let sceneFourCredits = {
  r: 90,
  g: 160,
  b: 200,
  size: 16,
  x: 2,
  y: 500,
  y2: 800,
  vy: 0.3,
  limit: -2000,
  spacing: 100,
  spacing2: 200,
};

// Variable to manage text for audio activation state
let audioActivation = {
  fill: 255,
  x: 2,
  y: 2
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
let state = `activateAudio`;
// let state = `title`;
// let state = `sceneTwo`;
// let state = `sceneThree`;
// let state = `sceneFour`;


// Variable for intro text
let openingText = undefined;



/* ~~~~ IMAGE VARIABLES ~~~~ */

// Variable for designer character image
let designer = undefined;

// Variable for android character image
let androidImage = undefined;

/* ~~~~ SOUND VARIABLES ~~~~ */

// Variables for intro sound response for incorrect and correct questions
let incorrectQuestion = undefined;
let correctQuestion = undefined;

// Variable for soundtrack
let introMusic = undefined;

// Variable for alarm sound in scene 3
let alarmSound = undefined;
let alarmSoundVolume = 0.1;

/* ~~~~ JSON VARIABLES ~~~~ */

// Variable for JSON dialogue data file
let dialogueData;

// Variables for JSON scene dialogue
let sceneTwoDialogue = `sceneTwo`;
let sceneThreeDialogue = `sceneThree`;

/* MISC VARIABLES */

// Variable array to set up star effect in intro
let stars = [];

// Variable to pick amount of stars for intro
let starsEffects = {
  size1: 0.25,
  size2: 3,
  amount: 1000,
  pulseRate: 0.1,
  scaleProperty: 2
}

// Variable to set rain drops effects properties
let dropEffects = {
  amount: 200,
  r: 50,
  g: 50,
  b: 255,
  x1: 2,
  y1: 0,
  w1: 5,
  w2: 10,
  h1: 5,
  h2: 10,
  speed1: 5,
  speed2: 10,
  gravity: 1.05,
  gravityReset: 0,
  reset: 0,
  amount: 200
};

// Variable to set typerwriter effects properties
let typewriter = {
  x: 25,
  y: 25,
  w: 550,
  h: 550,
  rate: 0.28
};

// Variable to track correct answers
let correctAnswerTracker1 = 0;
let correctAnswerTracker1Trigger = 5;
let correctAnswerTracker2 = 0;
let correctAnswerTracker2Trigger = 5;

// Variables to display questions for scene changes
let displayFinalQuestionSceneTwo;
let displayFinalQuestionSceneThree;
let displayExtraQuestionSceneThree;

// Variable for android voice effects

let androidVoiceEffects = {
  pitch: 0.4,
  rate: 0.9
};

// Variable to add effects to android image
let androidEffect = {
  x: 2,
  y: 2,
  width: 0.1,
  width2: 0.2,
  width3: 0.1,
  width4: 0.1,
  height: 0.1,
  height4: 0.1,
  widthIncrease: 0.4,
  heightIncrease: 0.4,
  shrink: false,
  size: 200
};

// Toggle the android effect
let androidEffectActive = true;

// Array to manage the android army in scene 3
let androidArmy = [];

// Amount of androids in android army
let androidArmyAmount = 10;

// Android army effect
let androidArmyEffect = {
  x: 100,
  x2: 500,
  y: 2,
  width: 0.1,
  height: 0.1,
  widthIncrease: 0.1,
  heightIncrease: 0.1,
  active: true,
  size: 200
};

// Ending sequence active tracker
let endingSequenceActive = false;

// Variable to toggle end credits
let credits = true;

// Variable for fade effect into scene 3
let fadeSquare = {
  fill: 0,
  x: 2,
  y: 2,
  width: 750,
  height: 450,
  alpha: 245,
  alphaDecrease: 1,
  active: true,
  limit: 0,
};

// Variable for detective alerts
let alertMessage = {
  pitch: 0.9,
  rate: 0.75,
};

// Set timeout delays
let delayAmount = {
  finalScene: 9000,
  endingSequence: 4000,
  sceneFourMusic: 2000,
  sceneOneMessage: 4000,
  androidMeeting: 2000
};

// Variable to set intro music volume
let introMusicVolume = 0.3;

// Variable for designer image properties
let designerImage = {
  x: 2,
  y: 2,
  w: 200,
  h: 200
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



  if (annyang) {
    annyang.start();
  }

  // Setup scene interactions
  setUpScene();

  // Setup effects for intro and scene one
  setupIntroEffects();

  // Initialize audio
  userStartAudio();

  // Trigger soundtrack and provide program info to user
  if (state === `activateAudio`) {
      alert(`Please use Google Chrome. Other browsers may not load the content correctly. Also be sure to allow Microphone and Audio access to get the full experience.`);
      playMusic();
    }


  // Stars effect during intro
  for (let i = 0; i < starsEffects.amount; i++) {
    stars[i] = new Star();
  }

  // For loop to set up android army amount and position
  for (let i = 0; i < androidArmyAmount; i++) {
    androidArmy.push({
      x: random(androidArmyEffect.x, androidArmyEffect.x2),
      y: height / androidArmyEffect.y
    })
  }


} // End of setup()


/*********************** SET UP SCENE *****************************************/

// Function to set up the scene's annyang dialogue, user interactions, and game audio
function setUpScene() {

  // Dialogue code for annyang in scene two

  // Commands only for scene two
  if (state === `sceneTwo`) {

    // Clear previous commands
    annyang.removeCommands();
    // Start with empty command properties
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
          if (correctAnswerTracker1 === correctAnswerTracker1Trigger) {
            displayFinalQuestionSceneTwo = true;

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
            pitch: androidVoiceEffects.pitch,
            rate: androidVoiceEffects.rate,
          });

          // Tracker to tally correct answers to be able to move to the next scene.
          correctAnswerTracker2++
          if (correctAnswerTracker2 === correctAnswerTracker2Trigger) {
            // Display the secret question
            displayExtraQuestionSceneThree = true;

            let extraSceneQuestion = dialogueData.sceneThree.extraQuestion;

            commands[extraSceneQuestion.question] = function() {
              if (extraSceneQuestion.triggerFinalQuestion === true) {
                // Display the secret question
                displayFinalQuestionSceneThree = true;
                // Responsive voice triggers
                responsiveVoice.speak(extraSceneQuestion.answer, "UK English Male", {
                  pitch: androidVoiceEffects.pitch,
                  rate: androidVoiceEffects.rate,
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
                  pitch: androidVoiceEffects.pitch,
                  rate: androidVoiceEffects.rate,
                });

                // Delay before initiating ending sequence
                // Anonymouse function to manage delay elements
                let endingSequenceDelay = function() {
                  alarmSound.setVolume(alarmSoundVolume);
                  alarmSound.loop();
                  // Trigger responsive voice message
                  responsiveVoice.speak(dialogueData.sceneThree.automatedMessage, "UK English Female", {
                    pitch: alertMessage.pitch,
                    rate: alertMessage.rate,
                  });

                  //Final state switch to scene four blank screen
                  let finalScene = function() {
                    state = `sceneFour`
                    setUpScene();
                    alarmSound.stop();
                  };

                  // Timer to control when the effect occurs
                  setTimeout(finalScene, delayAmount.finalScene);

                };
                // Delay the scene change
                setTimeout(endingSequenceDelay, delayAmount.endingSequence);
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
      pitch: androidVoiceEffects.pitch,
      rate: androidVoiceEffects.rate,
    });
  } // End of scene three setup


  // Start the intro music again in scene four
  if (state === `sceneFour`) {
    let sceneFourMusic = function() {
      playMusic();
    };
    // Delay the start of the music
    setTimeout(sceneFourMusic, delayAmount.sceneFourMusic);
  }

} // End of setUpScene function

/*********************** DRAW *************************************************/

/**
Draw function to switch between states and set background color.
*/
function draw() {
  background(bg.main);

  // Alternate between game states
  if (state === `activateAudio`) {
    activateAudioState();
  }
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
  //start in audio activation state to make sure intro music plays correctly
  if (state === `activateAudio` && key === "i") {
    state = `title`;
  }

  // If the state is sceneOne and the user presses Enter then go to next state
  if (state === `sceneOne` && key === "Enter") {
    // Lower volume
    introMusic.setVolume(introMusicVolume);
    // Trigger responsive voice message
    responsiveVoice.speak(dialogueData.sceneOne.automatedMessage, "UK English Female", {
      pitch: alertMessage.pitch,
      rate: alertMessage.rate,
    });
    // Delay before changing states
    // Anonymouse function to manage delay elements
    let sceneOneMessage = function() {
      state = `sceneTwo`;
      setUpScene();
    };
    setTimeout(sceneOneMessage, delayAmount.sceneOneMessage);
  }

  // If the state is title and the user presses Enter then go to next state
  if (state === `title` && key === "Enter") {
    state = `sceneOne`
  }
}


function activateAudioState() {
  textAnimation();
  // Set background to black
    bg.main = bg.alertColour;
}

/*********************** TITLE STATE ******************************************/

// Function to manage title state elements that will be in draw()
function titleState() {
  // Set background to black
    bg.main = bg.titleColour;

  // Stars effect
  for (var i = 0; i < stars.length; i++) {
    stars[i].draw();
  }

  // Display scene one text
  textAnimation();

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
  image(designer, width / designerImage.x, height / designerImage.y, designerImage.w, designerImage.h);
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
  image(androidImage, width /  androidEffect.x, height / androidEffect.y, androidEffect.width, androidEffect.height);
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
  setTimeout(androidMeeting, delayAmount.androidMeeting);

  // Limit the size of the image
  if (androidEffect.width > androidEffect.size) {
    androidEffectActive = false;
    androidEffect.width = androidEffect.size;
  }

  // Trigger to display multiple androids
  if (endingSequenceActive) {

    // Display the android army
    for (let i = 0; i < androidArmyAmount; i++) {

      image(androidImage, androidArmy[i].x, androidArmy[i].y, androidArmyEffect.width, androidArmyEffect.height);
    }

    if (androidEffect.width < androidEffect.width2) {
      // Make the android army grow
      androidArmyEffect.width += androidArmyEffect.widthIncrease;
      androidArmyEffect.height += androidArmyEffect.heightIncrease;
    }
  }

  // Stop android army from growing
  if (androidArmyEffect.width > androidArmyEffect.size) {
    androidArmyEffect.width = androidArmyEffect.size;
    androidArmyEffect.height = androidArmyEffect.size;
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
  if (androidEffect.width < androidEffect.width3) {
    androidEffect.shrink = false;
    androidEffect.width = androidEffect.width4;
    androidEffect.height = androidEffect.height4;
  }
} // End of scene three state

/*********************** SCENE FOUR STATE *************************************/

// Function to manage scene four state elements that will be in draw()
function sceneFourState() {

  // Code to run ending credits
  if (credits === true) {
    textAnimation();
  }
  // stop credits scrolling when text no longer in view
  if (sceneFourCredits.y < sceneFourCredits.limit) {
    sceneFourCredits.y = sceneFourCredits.y2;
    credits = false;
  }
}

/*********************** SETUP INTRO EFFECTS **********************************/

function setupIntroEffects() {

  // Set up rain effect
  for (let i = 0; i < dropEffects.amount; i++) {
    drop[i] = new Drop();
  }

  // Set up typewriter class
  openingText = new Typewriter(sceneOneText, typewriter.x, typewriter.y, typewriter.w, typewriter.h, typewriter.rate);
}

/* - - - - - - - - - - - TEXT - - - - - - - - - - - - - - - - - - - - - - - - */

/*********************** TEXT ANIMATION ***************************************/

// Function to handle all of the text animation
function textAnimation() {

  // Display audio activation state
if (state === `activateAudio`) {
    push();
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    textSize(titleText.size2);
    fill(audioActivation.fill);
    text(`Press i to initiate program`, width / audioActivation.x, height / audioActivation.y);
    pop();
  }


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
    fill(sceneTwoText.headerFill);
    textSize(sceneTwoText.headerSize);
    text(dialogueData[sceneTwoDialogue].intro, width / sceneTwoText.headerX, height / sceneTwoText.headerY);
    pop();

    // User direction text for scene two
    push();
    fill(sceneTwoText.directionsFill);
    textSize(sceneTwoText.directionsSize);
    text(dialogueData[sceneTwoDialogue].userDirection, width / sceneTwoText.directionsX, height / sceneTwoText.directionsY);
    pop();

    // Dialogue text for scene two
    for (let i = 0; i < dialogueData[sceneTwoDialogue].questions.length; i++) {
      let question = dialogueData[sceneTwoDialogue].questions[i];
      push();
      fill(sceneTwoText.fill);
      text(question.question + `?`, width / sceneTwoText.dialogueX, sceneTwoText.dialogueY + i * sceneTwoText.dialogueSpacing);
      pop();
    }

    // Text to display if user has met the conditions
    if (displayFinalQuestionSceneTwo === true) {
      push();
      fill(sceneTwoText.finalQuestion.r, sceneTwoText.finalQuestion.g, sceneTwoText.finalQuestion.b);
      textSize(sceneTwoText.finalQuestion.size);
      textAlign(CENTER, CENTER);
      textStyle(NORMAL);
      text(dialogueData.sceneTwo.finalQuestion.question + `?`, width / sceneTwoText.finalQuestion.x, height / sceneTwoText.finalQuestion.y);
      pop();
    }
  }

  // Text to display if it is scene three
  if (state === `sceneThree`) {

    // Header text for scene three
    push();
    fill(sceneThreeText.headerFill.r, sceneThreeText.headerFill.g, sceneThreeText.headerFill.b);
    textSize(sceneThreeText.headerSize);
    text(dialogueData[sceneThreeDialogue].intro, width / sceneThreeText.headerX, height / sceneThreeText.headerY);
    pop();

    // Dialogue text for scene two
    for (let i = 0; i < dialogueData[sceneThreeDialogue].questions.length; i++) {
      let question = dialogueData[sceneThreeDialogue].questions[i];

      // Display more dialogue if ending sequence is active
      if (androidEffect.width > sceneThreeText.trigger && endingSequenceActive === false) {
        push();
        fill(sceneThreeText.fill.r, sceneThreeText.fill.g, sceneThreeText.fill.b);
        textSize(sceneThreeText.size);
        text(question.question + `?`, width /sceneThreeText.x, sceneThreeText.y + i * sceneThreeText.spacing);
        pop();
      }
    }

    // Text to display if user has met the conditions
    if (displayExtraQuestionSceneThree === true && endingSequenceActive === false) {
      push();
      fill(sceneThreeText.finalQuestion.r,sceneThreeText.finalQuestion.g,sceneThreeText.finalQuestion.b);
      textSize(sceneThreeText.finalQuestion.size);
      // textAlign(CENTER, CENTER);
      textStyle(NORMAL);
      text(dialogueData.sceneThree.extraQuestion.question + `?`, width / sceneThreeText.finalQuestion.x2, height / sceneThreeText.finalQuestion.y2);
      pop();
    }

    // Text to display if user has met the conditions
    if (displayFinalQuestionSceneThree === true) {
      push();
      fill(sceneThreeText.finalQuestion.r,sceneThreeText.finalQuestion.g,sceneThreeText.finalQuestion.b);
      textSize(sceneThreeText.finalQuestion.size);
      // textAlign(CENTER, CENTER);
      textStyle(NORMAL);
      text(dialogueData.sceneThree.finalQuestion.question + `?`, width / sceneThreeText.finalQuestion.x, height / sceneThreeText.finalQuestion.y);
      pop();
    }
  }

  // Text to display if it is scene four
  if (state === `sceneFour`) {
    // Make credits scroll upwards.
    sceneFourCredits.y -= sceneFourCredits.vy;

    push();
    fill(sceneFourCredits.r, sceneFourCredits.g, sceneFourCredits.b);
    textSize(sceneFourCredits.size);
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    text(`Made by Azmat Ishaq`, width / sceneFourCredits.x, sceneFourCredits.y);
    text(`Code contributions by Pippin Barr`, width / sceneFourCredits.x, sceneFourCredits.y + sceneFourCredits.spacing);
    text(`See README for more information`, width / sceneFourCredits.x, sceneFourCredits.y + sceneFourCredits.spacing2);
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

// Function for fading effect for scene switching
function fadeSceneEffect() {

  // Effect to have scene fade in
  push();
  fill(fadeSquare.fill, fadeSquare.fill, fadeSquare.fill, fadeSquare.alpha);
  rectMode(CENTER);
  rect(width / fadeSquare.x, height / fadeSquare.y, fadeSquare.width, fadeSquare.height);
  pop();

  // Stop the effect
  if (state === `sceneThree` && fadeSquare.active === true) {
    fadeSquare.alpha -= fadeSquare.alphaDecrease
    if (fadeSquare.alpha < fadeSquare.limit) {
      fadeSquare.active = false;
      fadeSquare.alpha = fadeSquare.limit;
    }
  }
};


/*********************** DROP *************************************************/

// Function to simulate rain effect

// Effect by kelsierose94 see README for more details
// I adjusted some of the values to modify the effect

function Drop() {
  // Setting random position for rain drops
  this.x = random(dropEffects.x1, width);
  this.y = random(dropEffects.y1, -height);

  // Using anonymous function to display rain drop
  this.show = function() {
    noStroke();
    fill(dropEffects.r, dropEffects.g, dropEffects.b);
    ellipse(this.x, this.y, random(dropEffects.w1, dropEffects.w2), random(dropEffects.h1, dropEffects.h2));
  }

  // Using anonymous function to manage rain physics
  this.update = function() {
    this.speed = random(dropEffects.speed1, dropEffects.speed2);
    this.gravity = dropEffects.gravity;
    this.y = this.y + this.speed * this.gravity;

    // Resetting the raindrops to fall continuously
    if (this.y > height) {
      this.y = random(dropEffects.reset, -height);
      this.gravity = dropEffects.gravityReset;
    }
  }
} // End of Drop function

/*********************** DROP DISPLAY *****************************************/

// Function to display rain drop effect in scene one
function dropDisplay() {
  // Rain effect

  for (var i = 0; i < dropEffects.amount; i++) {
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
    this.size = random(starsEffects.size1, starsEffects.size2);
    this.t = random(TAU);
  }

  draw() {
    this.t += starsEffects.pulseRate;
    let scale = this.size + sin(this.t) * starsEffects.scaleProperty;
    noStroke();
    ellipse(this.x, this.y, scale, scale);
  }
}

/*  END */
