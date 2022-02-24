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
// let state = `title`;
// let state = `sceneTwo`;
let state = `sceneThree`;

// Variable to create items
let item;

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

// Variable for footsteps sound
let footsteps = undefined;



              /* ~~~~ JSON VARIABLES ~~~~ */

// Variable for JSON dialogue data file

let dialogueData;

// Variable to style dialogue

let dialogueStyle = {
  r2: 90,
  g2: 103,
  b2: 103
}

// Variable to colour answered dialogue
let dialogueAnswered = 192;

                  /* MISC VARIABLES */

// Variable to set designers active state to true
let designerScene1Active = true;

// Variable array to set up star effect in intro
let stars = [];

// Variable for scene one dialogue
let sceneOneDialogue = `sceneOne`;

// Variable to track correct answers
let correctAnswerTracker = 0;

// Variable to display question for scene two
let displayQuestionSceneTwo;

// Variable to add effects to android image

let androidEffect = {
  width: 0.1,
  height: 0.1,
  widthIncrease: 0.3,
  heightIncrease: 0.3
};

/*********************** PRELOAD **********************************************/

/**
Description of preload
*/
function preload() {

      /* Preload sound */

// Preloading sound for correct and incorrect responses
incorrectQuestion = loadSound(`assets/sounds/ask_right_question.mp3`);

// Preloading sound for correct and incorrect responses
correctQuestion = loadSound(`assets/sounds/the_right_question.mp3`);

// Prealoading intro sound music
introMusic = loadSound(`assets/sounds/detective_intro_soundtrack.mp3`)

// Prloading footsteps
footsteps = loadSound(`assets/sounds/mixkit-footsteps-on-heels.wav`)

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
Description of setup
*/
function setup() {

  createCanvas(canvasProperties.w, canvasProperties.h);



  if (annyang) {
    annyang.start();
  }

  setUpScene();

  resetStates();
  // if (annyang) {
  //   // Let's define our first command. First the text we expect, and then the function it should call
  //   let commands = {
  //     // 'testing' is what the user would say. I guess you type it out?
  //     'Designer speak to me': function() {
  //       if (state === `sceneTwo`) {
  //       alert(`Hello detective. Please note, my responses are limited.`);
  //       designerScene1Active = true;
  //         }
  //       },
  //
  //     // 'testing' is what the user would say. I guess you type it out?
  //     'Designer goodbye': function() {
  //       if (designerScene1Active) {
  //       alert(`Goodbye detective.`);
  //       designerScene1Active = false;
  //     }
  //       },
  //
  //     // '*anything': function() {
  //     //   if(designerScene1Active) {
  //     //   incorrectQuestion.play();
  //     //   // Change state to next level of intro
  //     //   // state = `intro phase 1`;
  //     //     }
  //     //   },
  //     //
  //     // 'What *anything': function() {
  //     //   if(designerScene1Active) {
  //     //   incorrectQuestion.play();
  //     //   // Change state to next level of intro
  //     //   // state = `intro phase 1`;
  //     //     }
  //     //   },
  //     //
  //
  //
  // // Questions that don't get a detailed response from Designer
  //     'What can you tell me': function() {
  //       if(designerScene1Active) {
  //         incorrectQuestion.play();
  //         dialogueStyle.r2 = dialogueAnswered;
  //         dialogueStyle.g2 = dialogueAnswered;
  //         dialogueStyle.b2 = dialogueAnswered;
  //           }
  //       },
  //
  //       'What are you hiding': function() {
  //         if(designerScene1Active) {
  //           incorrectQuestion.play();
  //             }
  //         },
  //
  //       'Why did the android malfunction': function() {
  //         if(designerScene1Active) {
  //           incorrectQuestion.play();
  //             }
  //         },
  //
  //   // Questions that get a detailed response from Designer
  //
  //   'Is there a problem with the three laws': function() {
  //     if(designerScene1Active) {
  //       alert(`The three laws are perfect.`);
  //       }
  //     },
  //
  //   'Do robots think': function() {
  //     if(designerScene1Active) {
  //       alert(`Certainly detective... Can you? But that is not the right question.`);
  //       }
  //     },
  //
  //   'Can androids kill': function() {
  //     if(designerScene1Active) {
  //       alert(`Certainly detective... Can you? But that is not the right question.`);
  //       }
  //     },
  //
  //   'Did it malfunction': function() {
  //     if(designerScene1Active) {
  //       alert(`"It" did what "it" was programmed to do.`);
  //       }
  //     },
  //
  //   'Is the android dangerous': function() {
  //     if(designerScene1Active) {
  //       // Add text later
  //       alert(`Can a tool be dangerous? Maybe one that isn't alive`);
  //       }
  //     },
  //
  //   'Is he alive': function() {
  //     if(designerScene1Active) {
  //     introMusic.setVolume(0);
  //     correctQuestion.play();
  //     state = `sceneThree`;
  //       }
  //     },
  //
  //
  //
  //     // 'What revolution?': function() {
  //     //   if(designerScene1Active) {
  //     //   correctQuestion.play();
  //     //   // Change state to next level of intro
  //     //   // state = `intro phase 1`;
  //     //     }
  //     //   },
  //
  //     }
  //
  // // Add our commands to annyang
  // annyang.addCommands(commands);
  //
  // // Start listening. You can call this here, or attach this call to an event, button, etc.
  // annyang.start();
  //
  // } // End of annyang

// Trigger soundtrack
  if (state === `title`) {
    introMusic.loop();

  }

// // Trigger footsteps sound for scene 3
//
//   if (state === `sceneThree`) {
//
//   }

// Stars effect during intro
for (let i = 0; i < 1000; i++) {
		stars[i] = new Star();
	}



} // End of setup()


/*********************** SET UP SCENE *****************************************/

function setUpScene() {

// Dialogue code for annyang in scene two

  // commands only for scene two
  if (state === `sceneTwo`) {


  annyang.removeCommands();


  let commands = {

          };



  // For loop to setup dialogue JSON data so that correct responses get an alert and
  // incorrect responses get an audio response
  for (let i = 0; i < dialogueData[sceneOneDialogue].questions.length; i++) {
    let question = dialogueData[sceneOneDialogue].questions[i];
    commands[question.question] = function () {
      if (question.correct === true) {

      // Alert response from designer character if the correct question is asked.
      alert(question.answer);

      // Tracker to tally correct answers to be able to move to the next scene.
      correctAnswerTracker++
          if (correctAnswerTracker > 2) {
            displayQuestionSceneTwo = true;
          }

    } else if (question.correct === false) {incorrectQuestion.play()}
    };
  }
  annyang.addCommands(commands);

} // End of scene two annyang

// Annyang for Scene Three
  if (state === `sceneThree`) {


  annyang.removeCommands();

} // End of scene three annyang



} // End of setUpScene function

/*********************** DRAW *************************************************/


/**
Draw function to switch between states and alter background color.
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
  if (state === `sceneTwo`) {
    sceneTwoState();
  }
  if (state === `sceneThree`) {
    sceneThreeState();
  }
  if (state === `sceneFour`) {
    sceneFourState();
  }
  if (state === `sceneFive`) {
    sceneFiveState();
  }

} // End of draw()

/* - - - - - - - - - - - USER INTERACTION - - - - - - - - - - - - - - - - - - */

/*********************** KEY PRESSED ******************************************/

function keyPressed() {
  // Make sure to order the if statements correctly to switch states effectively.
  // If the state is sceneOne and the user presses Enter then go to next state
  if (state ===`sceneOne` && key === "Enter") {

    // Lower volume
    introMusic.setVolume(0.3);

    // Trigger responsive voice message
    responsiveVoice.speak("Detective, incoming correspondence", "UK English Male",
      {
        pitch: 0.1,
        rate: 0.97,
      });

    // Delay before changing states
    // Anonymouse function to manage delay elements
    let sceneOneMessage = function () {
      state = `sceneTwo`;
    };
    setTimeout(sceneOneMessage, 3000);


  }

  // If the state is title and the user presses Enter then go to next state
  if (state === `title` && key === "Enter") {
    state = `sceneOne`
  }



}
/*********************** MOUSE PRESSED ****************************************/

// function mousePressed() {
// }

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

/*********************** SCENE ONE STATE ****************************************/

function sceneOneState() {

  // Display rain drops
  dropDisplay();
  // Display scene one text
  textAnimation();

}

/*********************** SCENE TWO STATE ****************************************/

function sceneTwoState() {

// Display the designer image
 push();
 imageMode(CENTER);
 image(designer, width / 2, height / 2, 200 , 200);
 pop();

textAnimation()


}

/*********************** SCENE THREE STATE ****************************************/

function sceneThreeState() {


if (state === `sceneThree`) {


  // Display the designer image
   push();
   imageMode(CENTER);
   image(androidImage, width / 2, height / 2,  androidEffect.width, androidEffect.height);
   pop();

  // Effect to have android incrase in size
   let androidMeeting = function () {

       // Effect for android in scene three
       androidEffect.width += androidEffect.widthIncrease;
       androidEffect.height += androidEffect.heightIncrease;
   }

   // Timer to control when the effect occurs
  setTimeout(androidMeeting, 10000);

  if (androidEffect.width > 200) {
    androidEffect.width = 200;
    androidEffect.height = 200;
    }

}



   // Trigger responsive voice message
   // responsiveVoice.speak("Detective, incoming correspondence", "UK English Male",
   //   {
   //     pitch: 0.1,
   //     rate: 0.97,
   //   });


}

/*********************** SCENE THREE STATE ****************************************/

function sceneFourState() {

  // Display timer
  countdownTimer();

}

/*********************** SCENE THREE STATE ****************************************/

function sceneFiveState() {


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
         text(dialogueData[sceneOneDialogue].intro, width / 3.5, height / 6);
         pop();

        // Dialogue text for scene two
       for (let i = 0; i < dialogueData[sceneOneDialogue].questions.length; i++) {
         let question = dialogueData[sceneOneDialogue].questions[i];
         push();
         fill(255);
         text(question.question + `?`, width / 14, 200 + i * 25);
         pop();
       }

    // Text to display if user has met the conditions
      if (displayQuestionSceneTwo === true) {
        push();
        fill(90, 160, 200);
        textSize(20);
        textAlign(CENTER, CENTER);
        textStyle(NORMAL);
        text(`Are androids alive?`, width / 5.5, height / 1.2);
        pop();
      }

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

/*********************** DIALOGUE ANIMATE *************************************/

// Function to animate dialogue text when a dialogue has been selected by the user
function dialogueAnimate() {
        dialogueStyle.r2 = dialogueAnswered;
        dialogueStyle.g2 = dialogueAnswered;
        dialogueStyle.b2 = dialogueAnswered;
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
