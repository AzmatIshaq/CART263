/**
Project 2 -
Azmat Ishaq

This program simulates a prison escape game which involves interactive trading. It operates based on states which are refered to as scenes. The user alternates between scenes and states with game event triggers or the navigation bar. JQuery is used to manage the interactive trading elements and a p.5 canvas displays the games visual animations and handles other minor mouseclick and keypress events. The dialogue is stored in a JSON document and displays based on the game state or triggers. Separate functions are used to handle the game trades, navigation, inventory, and venues.

See README for more details.

*/

"use strict";

// Canvas properties variable
let canvasSize = {
  width: 850,
  height: 400
};

// Color with rgb properties variable
let colorPalette = {
  // #A6826D     (166, 130, 109)
  r3: 166,
  g3: 130,
  b3: 109,
};

// Venue image variables
let cafeteriaBgImg;
let prisonBgImg;
let hallBgImg;
let cellBgImg;
let holePreludeImg;
let wardenBgImg;
let recBgImg;
let commonBgImg;
let fenceBgImg;
let fenceCutBgImg;

// Dialog box images
let noEscapeImg;

// Character image variables
let wardenCharImg;
let smokeyCharImg;
let guardCharImg;
let duaneCharImg;
let devonCharImg;

// Items image variables
let ramenImg;
let gumImg;
let swissArmyImg;
let smokesImg;
let chessImg;
let wireCuttersImg;

// Misc image variables
let inventoryImg;
let towerImg;
let victoryImg;

// Variable to track fence strength
let fenceStrength;
// Variable for the sound of the fence
let fenceSound;

// Ending music
let endingWinMusic;
// Tension music;
let tensionMusic;
// Game music
let gameMusic;

// Speaker voice
let speakInterval;


/* Item variables and properties */

// Inventory Gui properties
let inventoryGui = {
  x: 2,
  y: 2,
  width: 650,
  height: 360,
  alpha: 210,
};

// Ramen item properties
let ramen = {
  x: 5,
  y: 1.5,
  xInventory: 2,
  yInventory: 2,
  width: 40,
  height: 40,
  size: 40
};

// Chess item properties
let chess = {
  x: 2.5,
  y: 2.7,
  xInventory: 2,
  yInventory: 2,
  width: 20,
  height: 20,
  size: 20
};

// Smokes item properties
let smokes = {
  x: 2,
  y: 1.5,
  xInventory: 2,
  yInventory: 2,
  width: 30,
  height: 30,
  size: 30
};

// Swiss army knife item properties
let swissArmyKnife = {
  x: 2,
  y: 1.75,
  xInventory: 2,
  yInventory: 2,
  width: 30,
  height: 30,
  size: 30
};

// Wire cutters properties
let wireCutters = {
  width: 140,
  height: 140
};

// Title text properties
// Variable to style title text displayed
let titleText = {
  fill: 255,
  r: 80,
  g: 180,
  b: 255,
  alpha: 20,
  alpha2: 0,
  size: 30,
  size2: 22,
  x1: 2,
  y1: 3,
  x2: 2.6,
  y2: 1.2,
  stroke: 1,
  strokeWeight: 4
};

// Fade effect for text

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


// states
// let state = `title`;
// let state = ``;
let state = `sceneOnePrelude`;
// let state = `sceneOneCafeteria`;
// let state = `sceneOneWarden`;
// let state = `sceneTwoCafeteria`;
// let state = `sceneTwoCell`;
// let state = `sceneTwoRec`;
// let state = `sceneThreeCell`;
// let state = `sceneThreeEscape`;
let scene = `sceneOne`;
// let scene = `sceneTwo`;
// let scene = `sceneThree`;

// Variable to manage item class
let items;

// Variable To track if wire cutters are equipped
let wireCuttersEquipped = false;

// Variable to track if lights are out
let lightsAreOut = false;

// Variable for JSON data
let gameTextData;

// Variable to manage display dialogue properties
let dialogDisplay = {
  size: 16,
  playerX: 580,
  playerY: 50,
  playerWidth: 260,
  playerHeight: 350,
  npcX: 1.45,
  npcY: 2,
  npcWidth: 250,
  npcHeight: 350
};

// Variable to manage display character properties
let charDisplay = {
  x: 620,
  y: 10,
  width: 150,
  height: 150
}

// Variable to manage background images
let bgDisplay = {
  x: 0,
  y: 0,
  width: 550,
  height: 400
};

// Timer variable for countdown timer
let timer = {
  countdown: 15,
  x: 40,
  y: 40,
  textFont: 60
};

// Variable to manage venue text
let venueText = {
  dialog: 0,
  x: 850 / 1.45,
  y: 400 / 1.25,
  size: 16
};

// Variable to manage JSON for the npc dialogue that is active
let activeNpcDialog;
// Variable to manage JSON for player dialogue that is active
let activePlayerDialog;
// Variable to manage active character image
let activeCharImg;

// Variables to verify trade completion between scenes

let tradesCompleteSceneOne = false;
let tradesCompleteSceneOneCafeteria = false;
let tradesCompleteSceneTwo = false;
let tradesCompleteSceneTwoCafeteria = false;
let tradesCompleteSceneTwoRec = false;
let tradesCompleteSceneThree = false;

let allTradesComplete = false;

// Variables to manage item collection
let ramenCollected = false;
let gumCollected = false;
let smokesCollected = false;
let chessCollected = false;
let swissArmyKnifeCollected = false;

// Variables to register trades
let ramenTraded = false;
let gumTraded = false;
let chessTraded = false;
let smokesTraded = false;
let swissArmyKnifeTraded = false;

let escape = false;

/**
Function to preload game images, audio, and JSON data.
*/
function preload() {

  // Preload venue images
  cafeteriaBgImg = loadImage('assets/images/cafeteria-edited.jpg');
  prisonBgImg = loadImage('assets/images/prison_main.png');
  hallBgImg = loadImage('assets/images/prison-hall-edited-3.jpg');
  cellBgImg = loadImage('assets/images/prison-cell.jpg');
  holePreludeImg = loadImage('assets/images/hole_1_filter_night.jpg');
  wardenBgImg = loadImage(`assets/images/warden-office-night.jpg`)
  recBgImg = loadImage(`assets/images/rec-area-2-b.jpg`)
  commonBgImg = loadImage(`assets/images/common-area-edited.jpg`)
  fenceBgImg = loadImage(`assets/images/fence-2.jpg`)
  fenceCutBgImg = loadImage(`assets/images/open-fence-2.jpg`)

  // Preload character images
  wardenCharImg = loadImage('assets/images/warden_night.jpg');
  smokeyCharImg = loadImage('assets/images/smokey_inmate_night.jpg');
  guardCharImg = loadImage('assets/images/guard_1.png');
  duaneCharImg = loadImage('assets/images/cellmate-duane.jpg');
  devonCharImg = loadImage(`assets/images/inmate-trader-bures.jpg`)

  // Preload item images
  ramenImg = loadImage('assets/images/ramen2.png');
  gumImg = loadImage('assets/images/bubble_gum.png');
  swissArmyImg = loadImage('assets/images/swiss_army.png');
  smokesImg = loadImage(`assets/images/cigarettes.png`);
  chessImg = loadImage(`assets/images/chess-knight.png`);
  wireCuttersImg = loadImage(`assets/images/wire-cutters.png`);

  // Preload misc images
  noEscapeImg = loadImage(`assets/images/player-no-escape.jpg`);
  towerImg = loadImage(`assets/images/guard-tower-2.jpg`);
  victoryImg = loadImage(`assets/images/victory-escape-2.jpg`);

  // Preload sound

  // Fence snapping sound
  fenceSound = loadSound(`assets/sounds/fence-snap.wav`);
  // Prelude music
  gameMusic = loadSound(`assets/sounds/prelude-music.mp3`);
  // Ending win music
  endingWinMusic = loadSound(`assets/sounds/win-music.mp3`);
  // Ending win music
  tensionMusic = loadSound(`assets/sounds/tension-music.wav`);

  // Preload JSON game text
  gameTextData = loadJSON(`assets/data/game-text.JSON`);

} // End of preload function


/* - - - - - - - - - - - SETUP & DRAW- - - - - - - - - - - - - - - - - - - -  */

/**
Function to setup the canvas to embed it within divs. Also to initialize user audio, setup trade events, and to reload game on click events.
*/
function setup() {
  let canvas = createCanvas(canvasSize.width, canvasSize.height);
  canvas.parent(`#game-canvas`);

  // Setup trade
  // jQuery
  // Make the trade items draggable and droppable in traders inventory.
  $(".my-items").draggable({
    containment: "#trade-container"
  });

  $(`#trade-screen-2`).droppable({
    drop: makeTrade
  });

  // Setup progressBar variable
  fenceStrength = new ProgressBar();

  // Initialize audio
  userStartAudio();

  // Click events to restart the game if you lose
  // Jquery button event to restart the game
    $("#restart-game-a").on(`click`, function() {
      $("#lose-a").dialog('close');
      location.reload();
    });

    $("#restart-game-b").on(`click`, function() {
      $('#lose-b').dialog('close');
      location.reload();
    });
}

/**
Draw function to display and manage navigation, inventory, and animations.
*/
function draw() {
  background(0);

  // Animation effects for scenes
  animation();

  // Inventory management
  inventory();

  // Navigate prison with navbar
  navigatePrison();

} // End of draw


/* - - - - - - - - - - - TRADING - - - - - - - - - - - - - - - - - - - - - -  */

// Code contribution from Pippin Barr
// Function to manage trades
function makeTrade(event, ui) {

  // Succesful trades for Scene One Cafeteria
  if (state === `sceneOneCafeteria`) {
    if (ui.draggable.attr(`id`) === `ramen-player`) {

      // Pop up jquery dialog after trade event
      $("#smokey-trade-1").dialog({
        modal: true,
        close: function(event, ui) {}
      });

      // Register completed trade
      tradesCompleteSceneOneCafeteria = true;

      // Register item trade
      ramenTraded = true;
      gumCollected = true;

      // Display traded items in correct inventory
      $("#gum-trader").hide();
      $("#gum-player").show();
      $("#ramen-trader").show();
      $("#ramen-player").hide();

      // Disable items draggability
      $(".my-items").draggable("disable");
    } else {

      // Unsuccessful trade alert
      alert(`Trade rejected! Hey fool, how about something I actually need?`);
    }
  }

  // Manage trade for sceneTwoCafeteria
  if (state === `sceneTwoCafeteria`) {
    // Event for specific trade item interaction
    if (ui.draggable.attr(`id`) === `smokes-player`) {
      // Register completed trade
      tradesCompleteSceneTwoCafeteria = true;
      smokesTraded = true;

      // Accept trade dialog
      $("#trade-accepted").dialog({
        modal: true,
        close: function(event, ui) {}
      });

      // Disable items draggability
      $(".my-items").draggable("disable");

    } else {
      // Pop up jquery dialog after trade event
      $("#smokey-trade-rejected").dialog({
        modal: true,
        close: function(event, ui) {}
      });

      // Revert gum position
      $("#gum-player").draggable({
        revert: true,
      });
    }
  }

  // Manage trade for sceneTwoRec
  if (state === `sceneTwoRec`) {

    // If chess piece is traded but swiss knife isn't
    if (ui.draggable.attr(`id`) === `chess-player` && !swissArmyKnifeTraded) {

      // Register completed trade
      chessTraded = true;
      $("#chess-trader").show();
      $("#chess-player").hide();

      // Accept trade dialog
      $("#trade-accepted").dialog({
        modal: true,
        close: function(event, ui) {}
      });

      // If swiss army knife is already traded
    } else if (ui.draggable.attr(`id`) === `chess-player` && swissArmyKnifeTraded) {
      // Register the trades
      chessTraded = true;
      tradesCompleteSceneTwo = true;

      // Display traded events correctly
      $("#chess-trader").show();
      $("#chess-player").hide();
      $("#wire-cutters-player").show();
      $("#wire-cutters-trader").hide();

      // Accept trade dialog
      $("#trade-accepted").dialog({
        modal: true,
        close: function(event, ui) {}
      });
      // If chess piece hasn't been traded
    } else if (ui.draggable.attr(`id`) === `swiss-knife-player` && !chessTraded) {

      // Show the trade dialog
      $("#devon-trade-1").dialog({
        modal: true,
        close: function(event, ui) {}
      });

      // Register completed trade
      swissArmyKnifeTraded = true;
      // Display traded events correctly
      $("#swiss-knife-trader").show();
      $("#swiss-knife-player").hide();

      // If chess piece is  alreadytraded
    } else if (ui.draggable.attr(`id`) === `swiss-knife-player` && chessTraded) {
      // Register completed trade
      swissArmyKnifeTraded = true;
      tradesCompleteSceneTwo = true;
      // Display traded events correctly
      $("#swiss-knife-trader").show();
      $("#swiss-knife-player").hide();
      $("#wire-cutters-player").show();
      $("#wire-cutters-trader").hide();

      // Accept trade dialog
      $("#trade-accepted").dialog({
        modal: true,
        close: function(event, ui) {}
      });

      // If trading other events
    } else {
      if (chessTraded) {
        // Trade rejected alert
        $("#trade-rejected").dialog({
          modal: true,
          close: function(event, ui) {}
        });
        } else {
        // Reject trade dialog
        $("#devon-trade-reject-gum").dialog({
          modal: true,
          close: function(event, ui) {}
        });
      }
    }
  }

  // If user trades gum make it revert to original position
  if (ui.draggable.attr(`id`) === `gum-player`) {
    $("#gum-player").draggable({
      revert: true
    });
  }
} // End of makeTrade function

/* - - - - - - - - - - - STATES - - - - - - - - - - - - - - - - - - - - - -  */

// Function to manage fading text during prelude scene.
function preludeText() {

  // Styling for prelude title text
  push();
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  textSize(titleText.size2);
  strokeWeight(titleText.strokeWeight);
  stroke(titleText.stroke);
  fill(titleText.r, titleText.g, titleText.b, titleText.alpha2);
  text(`Press ENTER to Continue`, width / titleText.x2, height / titleText.y2);
  pop();

  // Fade effect for title text
  if (titleText.alpha2 <= fadeOut.lowerLimit) {
    fadeOut.rate = fadeOut.increaseRate;
  }

  if (titleText.alpha2 >= fadeOut.upperLimit) {
    fadeOut.rate = -fadeOut.decreaseRate;
  }

  titleText.alpha2 += fadeOut.rate;
}


/* - - - - - - - - - - - ANIMIATION  - - - - - - - - - - - - - - - - - - - -  */

// Function to manage animations based on scene states.
function animation() {

  // Animations for sceneOne
  if (scene === `sceneOne`) {
    // Animations for Prelude state
    if (state === `sceneOnePrelude`) {

      // Prelude background image
      push();
      image(holePreludeImg, bgDisplay.x, bgDisplay.y, bgDisplay.width, bgDisplay.height);
      pop();

      // Display game prelude text
      push();
      fill(colorPalette.r3, colorPalette.g3, colorPalette.b3);
      textSize(16);
      text(gameTextData.sceneOne.prelude, width / 1.45, height / 9.5, 250, 350);
      pop();

      // Display prelude fading text
      preludeText();
    }

    // Animation for sceneOne
    if (state === `sceneOneCafeteria`) {

      // Scene Venue image
      sceneVenue(cafeteriaBgImg);

      // Ramen trade event
      if (ramenCollected === false) {

        // Starting player dialogue
        activePlayerDialog = gameTextData.sceneOne.cafeteria[0].player
        // Display player dialog text
        playerDialogText(activePlayerDialog);

        // Display ramen
        push();
        imageMode(CENTER);
        image(ramenImg, width / ramen.x, height / ramen.y, ramen.width, ramen.height)
        pop();
      }

      // Scene Trade
      if (ramenCollected && !tradesCompleteSceneOneCafeteria) {

        // Show traders items
        $("#gum-trader").show();

        // Choose character image
        activeCharImg = smokeyCharImg;
        // Display inmate dialogue
        activeNpcDialog = gameTextData.sceneOne.cafeteria[1].inmateSmokey;
        // Display dialogue
        dialogText(activeNpcDialog);
        // Display scene character
        characterDisplay(activeCharImg);
      }

      if (ramenCollected && tradesCompleteSceneOneCafeteria) {

        // Choose character dialogue
        activeNpcDialog = gameTextData.sceneOne.cafeteria[2].guard;
        // Display dialogue
        dialogText(activeNpcDialog);
        // Choose character image
        activeCharImg = guardCharImg;
        // Display scene character
        characterDisplay(activeCharImg);
      }
    }
    // Animations for warden state
    if (state === `sceneOneWarden`) {
      // Hide past trade
      $("#ramen-player").hide();

      // Display scene venue
      sceneVenue(wardenBgImg);
      // Display inmate image
      activeCharImg = wardenCharImg;
      // Display scene character
      characterDisplay(activeCharImg);
      // Dependent animation event
      if (smokesCollected === false) {
        // Display smokes image
        push();
        imageMode(CENTER);
        image(smokesImg, width / smokes.x, height / smokes.y, smokes.width, smokes.height)
        pop();

        // Display inmate dialogue
        activeNpcDialog = gameTextData.sceneOne.wardensOffice[0].warden;
        // Display dialogue
        dialogText(activeNpcDialog);
      }
      // Dependent animation event
      if (smokesCollected === true) {
        activeNpcDialog = gameTextData.sceneOne.wardensOffice[1].warden;
        // Display dialogue
        dialogText(activeNpcDialog);
      }
    }
  } // End of Scene One

  // Scene two animations
  if (scene === `sceneTwo`) {
    // Animations for sceneTwoCell state
    if (state === `sceneTwoCell`) {
      // Display scene venue
      sceneVenue(cellBgImg);
      // Display inmate dialogue
      activePlayerDialog = gameTextData.sceneOne.cell[0].player;
      // Display dialogue
      playerDialogText(activePlayerDialog);
      // Dependent animation event
      if (!swissArmyKnifeCollected) {
        // Display swiss army knife in cell
        push();
        imageMode(CENTER);
        image(swissArmyImg, width / swissArmyKnife.x, height / swissArmyKnife.y, swissArmyKnife.width, swissArmyKnife.height)
        pop();
      }
    }
    // Animations for sceneTwoCellB state
    if (state === `sceneTwoCellB`) {
      // Display scene venue
      sceneVenue(cellBgImg);
      // Dependent animation event
      if (!swissArmyKnifeCollected) {
        // Display swiss army knife in cell
        push();
        imageMode(CENTER);
        image(swissArmyImg, width / swissArmyKnife.x, height / swissArmyKnife.y, swissArmyKnife.width, swissArmyKnife.height)
        pop();
      }
    }

    // Animations for sceneTwoCafeteria states
    if (state === `sceneTwoCafeteria`) {
      // Display scene venue
      sceneVenue(cafeteriaBgImg);
      // Select inmate image
      activeCharImg = smokeyCharImg;
      // Display scene character
      characterDisplay(activeCharImg);
      // Dependent animation events
      if (!tradesCompleteSceneTwoCafeteria) {
        // Select scene dialogue
        activeNpcDialog = gameTextData.sceneTwo.cafeteria[0].inmateSmokey;
      }

      if (tradesCompleteSceneTwoCafeteria) {
        // Select scene dialogue
        activeNpcDialog = gameTextData.sceneTwo.cafeteria[1].inmateSmokey;
      }

      // Display dialogue
      dialogText(activeNpcDialog);
    }

    // Animation for sceneTwoRec
    if (state === `sceneTwoRec`) {
      // Display scene venue
      sceneVenue(recBgImg);
      // Select inmate image
      activeCharImg = devonCharImg;
      // Display scene character
      characterDisplay(activeCharImg);
      // Dependent animation event
      if (!chessTraded) {
        // Select scene dialogue
        activeNpcDialog = gameTextData.sceneTwo.recYard[0].devon;
      }
      // Dependent animation event
      if (chessTraded && !swissArmyKnifeTraded) {
        // Select scene dialogue
        activeNpcDialog = gameTextData.sceneTwo.recYard[1].devon;
      }
      // Dependent animation event
      if (chessTraded && swissArmyKnifeTraded) {
        // Select scene dialogue
        activeNpcDialog = gameTextData.sceneTwo.recYard[2].devon;
      }

      // Display dialogue
      dialogText(activeNpcDialog);
    }

    // Animation for sceneTwoHall state
    if (state === `sceneTwoHall`) {
      // Display scene venue
      sceneVenue(hallBgImg);
      // Player dialoge
      activePlayerDialog = gameTextData.sceneTwo.hall.player;
      // Display dialogue
      playerDialogText(activePlayerDialog);
    }

    //Animation for sceneTwoCommon state
    if (state === `sceneTwoCommon`) {

      // Display scene venue
      sceneVenue(commonBgImg);
      // Select inmate image
      activeCharImg = duaneCharImg;
      // Display scene character
      characterDisplay(activeCharImg);
      // Display chess piece if it isn't collected
      if (chessCollected === false) {
        // Chess piece image
        push();
        imageMode(CENTER);
        image(chessImg, width / chess.x, height / chess.y, chess.width, chess.height)
        pop();

        // Select scene dialogue
        activeNpcDialog = gameTextData.sceneTwo.commonArea[0].duane;
        // Display dialogue
        dialogText(activeNpcDialog);
      } else {
        // Select scene dialogue
        activeNpcDialog = gameTextData.sceneTwo.commonArea[1].duane;
        // Display dialogue
        dialogText(activeNpcDialog);
      }
    }
  } // End of Scene Two


// Animations for sceneThree
  if (scene === `sceneThree`) {
    // Animation for sceneThreeCell
    if (state === `sceneThreeCell`) {
      // Display scene venue
      sceneVenue(cellBgImg);
      // Dialog before timer is low
      if (timer.countdown > 10) {
        // Display inmate dialogue
        activePlayerDialog = gameTextData.sceneThree.cell[0].player;
        // Display dialogue
        playerDialogText(activePlayerDialog);
      } else if (timer.countdown <= 10) {

        // Overlay to give darkness effect
        push();
        rectMode(CENTER);
        fill(0, 0, 0, 225);
        noStroke();
        rect(width / 2, height / 2, width, height)
        pop();

        // Animation dialog
        playerDialogText(activePlayerDialog);
        // Time the light dimming event
        let lightsOutDelayDialog = function() {
          // Display dialog
          activePlayerDialog = gameTextData.sceneThree.cell[1].player;
        };
        // Dependent animation event for lights
        if (lightsAreOut === false) {
          setTimeout(lightsOutDelayDialog, 1000);
          lightsAreOut = true;
        }
      }

      // Start countdown timer
      countdownTimer();

    }

    // Animation for sceneThreeLose_A state
    if (state === `sceneThreeLose_A`) {

      //add jquery dialog event here
      $("#lose-a").dialog({
        modal: true,
        close: function(event, ui) {},
        open: function() {
          $(".ui-dialog-titlebar-close").hide();
        },
        resizable: false
      });
    }

    // Unfinished Jquery button event to restart scene 3 escape sequence.
    // $("#restart-scene-3").on(`click`, function() {
    //
    //   $("#lose-a").dialog('close');
    //
    //   // Reset all the scene 3 elements
    //   lightsAreOut = false;
    //   escape = false;
    //   wireCuttersEquipped = false;
    //   fenceStrength.width = 99;
    //   timer.countdown = 15;
    //   scene = `sceneThree`;
    //   state = `sceneThreeCell`;
    // });

    // Animation for sceneThree Escape
    if (state === `sceneThreeEscape`) {
      // Change player dialog position
      dialogDisplay.playerY = height / 2;

      // Trigger events if fence strength drops bellow 0
      if (fenceStrength.width > 0) {
        // Display scene venue
        sceneVenue(fenceBgImg);
        // Display inmate dialogue
        activePlayerDialog = gameTextData.sceneThree.fence[0].player;
        // Display dialogue
        playerDialogText(activePlayerDialog);
      } else if (fenceStrength.width < 0) {
        // Display venue text
        venueText.dialog = gameTextData.sceneThree.userDirection.fenceCut;

        // Display scene venue
        sceneVenue(fenceCutBgImg, venueText.dialog);
        // Display inmate dialogue
        activePlayerDialog = gameTextData.sceneThree.fence[1].player;
        // Display dialogue
        playerDialogText(activePlayerDialog);
      }


      // Select guard tower image
      activeCharImg = towerImg;
      // Display scene tower
      characterDisplay(activeCharImg);

      // Display equipped wirecutters
      if (wireCuttersEquipped) {
        // Hide cursor
        noCursor();
        // Display wire cutters on p5 canvas at mouse location
        push();
        imageMode(CENTER);
        image(wireCuttersImg, mouseX, mouseY, wireCutters.width, wireCutters.height)
        pop();
      }

      // Run countdown timer
      countdownTimer();
      // Health bar animation
      fenceStrength.display();
      // Animation if state is sceneThreeLose_B
    } else if (state === `sceneThreeLose_B`) {

      // Stop responsive voice
      clearInterval(speakInterval);

      // Add jquery dialog event here
      $("#lose-b").dialog({
        modal: true,
        close: function(event, ui) {},
        open: function() {
          $(".ui-dialog-titlebar-close").hide();
        },
        resizable: false
      });
    }

    // Unfinished - Jquery button event to restart scene 3 escape sequence.
    // $("#restart-scene-3-b").on(`click`, function() {
    //   $('#lose-b').dialog('close');
    //
    //   // Reset all the scene 3 elements
    //   lightsAreOut = false;
    //   escape = false;
    //   wireCuttersEquipped = false;
    //   fenceStrength.width = 99;
    //   timer.countdown = 15;
    //   scene = `sceneThree`;
    //   state = `sceneThreeCell`;
    // });

  } // End of sceneThree

  // Animation events for scene four and scene four win state
  if (scene === `sceneFour` && state === `sceneFourWin`) {
    // Clear responsive voice from repeating
    clearInterval(speakInterval);

    // Display victory image
    push();
    imageMode(CENTER);
    image(victoryImg, width / 2, height / 2, width, height);
    pop();
  }
} // End of animation function

// Function to handle mouseclick events
function mouseClicked() {

  // Manage mouseclick for scene one cafeteria
  if (state === `sceneOneCafeteria` && ramenCollected === false) {
    // Track mouse in relation to ramen
    if (dist(mouseX, mouseY, width / ramen.x, height / ramen.y) <= ramen.size / 2) {
      // Register the event
      ramenCollected = true;
      // Display ramen in inventory
      $(`#ramen-player`).removeClass("hidden-item")
      $(`#ramen-player`).addClass("active-item")
    }
  }

  // Manage mouseclick for sceneTwoCell
  if (state === `sceneTwoCell`) {

    // If smokes haven't been traded allow interaction with swiss army knife
    if (!smokesTraded) {
      if (dist(mouseX, mouseY, width / swissArmyKnife.x, height / swissArmyKnife.y) <= swissArmyKnife.size / 2) {
        // Dialog for mousecick event
        $("#self-swiss").dialog({
          modal: true,
          close: function(event, ui) {}
        });
      }
    }
  }

  // Manage mouseclick for sceneTwoCellB
  if (state === `sceneTwoCellB`) {
    // Track mouse in relation to swiss knife
    if (dist(mouseX, mouseY, width / swissArmyKnife.x, height / swissArmyKnife.y) <= swissArmyKnife.size / 2) {
      // Display knife in inventory
      $(`#swiss-knife-player`).addClass("active-item")
      swissArmyKnifeCollected = true;
    }
  }

  // Manage mouseclick for smokes interaction
  if (state === `sceneOneWarden` && smokesCollected === false) {
      // Track mouse in relation to smokes
    if (dist(mouseX, mouseY, width / smokes.x, height / smokes.y) <= smokes.size / 2) {

      // Register the event with booleans
      smokesCollected = true;
      tradesCompleteSceneOne = true;
      // Update inventory
      $(`#smokes-player`).removeClass("hidden-item")
      $(`#smokes-player`).addClass("active-item")
    }
  }

  // Use mouseclicked to collect chess piece
  if (state === `sceneTwoCommon` && chessCollected === false) {
    // Track mouse in relation to chess piece
    if (dist(mouseX, mouseY, width / chess.x, height / chess.y) <= chess.size / 2) {
      chessCollected = true;
      // Update inventory
      $(`#chess-player`).addClass("active-item")
    }
  }

  // Track mouseclick when it is over fence area
  if (state === `sceneThreeEscape` && wireCuttersEquipped) {
      // Track mouse in relation to fence background image
    if (mouseX > bgDisplay.x && mouseX < bgDisplay.x + bgDisplay.width && mouseY > bgDisplay.y && mouseY < bgDisplay.y + bgDisplay.height) {
      // Update fence progress bar and initiate relevant audio
      fenceStrength.width -= 5;
      fenceSound.setVolume(0.6);
      fenceSound.play();
    }
  }
} // End of mouseClicked function

// Function to manage inventory bassed on game state
function inventory() {

  // Manage inventory for sceneOneWarden
  if (state === `sceneOneWarden`) {
    // Allow items to be dragged
    $(".my-items").draggable("enable");
    // Limite items draggability to trade screen
    $(".my-items").draggable({
      containment: "#trade-screen-1"
    });
  }

  // Manage inventory for sceneTwoCafeteria
  if (state === `sceneTwoCafeteria`) {


    // Allow dragability if scene two cafeteria deal is not complete
    if (!tradesCompleteSceneTwoCafeteria) {
      $(".my-items").draggable("enable");
    }
    // Contain items to trade screen
    $(".my-items").draggable({
      containment: "#trade-container"
    });
  }

  // Manage inventory for sceneTwoRec
  if (state === `sceneTwoRec`) {

    // Hide former trade
    $("#smokes-player").hide();
    // Enable dragability
    $(".my-items").draggable("enable");
    // Limit trade to trade container
    $(".my-items").draggable({
      containment: "#trade-container"
    });

    // If trades aren't complete for scene two display the cutters
    if (!tradesCompleteSceneTwo) {
      // Show traders wire cutters
      $("#wire-cutters-trader").show();
    } else {
      $("#wire-cutters-trader").hide();
    }


    // Show knife only at rec yard
    if (swissArmyKnifeTraded) {
      // Show traders wire cutters
      $("#swiss-knife-trader").show();
    } else {
      $("#swiss-knife-trader").hide();
    }

    // Update inventory if chess item is traded
    if (chessTraded) {
      $("#chess-trader").show();
    } else {
      $("#chess-trader").hide();
    }
  }

  // Manage inventory for sceneTwoCommon
  if (state === `sceneTwoCommon` || state === `sceneTwoCellB`) {
    // Make items draggable
    $(".my-items").draggable({
      containment: "#trade-screen-1"
    });

    // Update trade inventory
    $("#wire-cutters-trader").hide();
    $("#swiss-knife-trader").hide();
    $("#chess-trader").hide();
  }

  // Invetory for states sceneTwohall and sceneTwoCellB
  if (state === `sceneTwoHall` || state === `sceneTwoCellB`) {
    // Update trade inventory
    $("#wire-cutters-trader").hide();
    $("#swiss-knife-trader").hide();
    $("#chess-trader").hide();
  }

  // Inventory for sceneThree
  if (scene === `sceneThree`) {
    // Update trade inventory
    $("#chess-trader").hide();
    $("#swiss-knife-trader").hide();
    // Update inventory based on dependent variable
    if (!wireCuttersEquipped) {
      // Continue to show inventory item if it isn't equipped
      $("#wire-cutters-player").show();
    }

    // Update trade inventory
    $("#gum-player").show();
    // Contain items from being traded
    $(".my-items").draggable({
      containment: "#trade-screen-1"
    });
  }

  // Inventory events for sceneThreeEscape
  if (state === `sceneThreeEscape`) {
    // Remove dragability from cutters to improve click detection
    $(`#wire-cutters-player`).draggable("disable");

    $(`#wire-cutters-player`).on(`click`, function() {
      // Wire cutters become equipped
      wireCuttersEquipped = true;
      // Hide wire cutters from inventory
      $(`#wire-cutters-player`).hide();
    });
  }

} // End of Inventory

// Keypressed function to manage inventory and trigger game events
function keyPressed() {

  // Key press to enter new state and trigger game music
  if (state === `sceneOnePrelude` && keyCode === ENTER) {
    state = `sceneOneCafeteria`;
    gameMusic.setVolume(0.2);
    gameMusic.loop();
  }

  // Key press for scene three escape state
  if (state === `sceneThreeEscape` && fenceStrength.width < 0 && keyCode === 27) {

    // Stop tension music
    tensionMusic.stop();
    // Start win music
    endingWinMusic.setVolume(0.5);
    endingWinMusic.play();
    // Update to new scene and state
    scene = `sceneFour`
    state = `sceneFourWin`;

  }
} // End of keyPressed function

// Function to manage displaying venues
function sceneVenue(venueBgImg, venueTextDialog) {

  // Scene venue image
  image(venueBgImg, bgDisplay.x, bgDisplay.y, bgDisplay.width, bgDisplay.height);

  // Text to display in venue
  push();
  fill(255);
  textSize(venueText.size);
  text(venueTextDialog, venueText.x, venueText.y);
  pop();

}

// Function to manage displaying character images
function characterDisplay(character) {
  // To display scene character
  push();
  image(character, charDisplay.x, charDisplay.y, charDisplay.width, charDisplay.height);
  pop();
}

// Function to manage npc dialog
function dialogText(dialog) {
  push();
  fill(255);
  textSize(dialogDisplay.size);
  text(activeNpcDialog, width / dialogDisplay.npcX, height / dialogDisplay.npcY, dialogDisplay.npcWidth, dialogDisplay.npcHeight);
  pop();
}

// Function to manage player dialog
function playerDialogText(playerDialog) {
  // Player dialog text
  push();
  fill(colorPalette.r3, colorPalette.g3, colorPalette.b3);
  textSize(dialogDisplay.size);
  text(playerDialog, dialogDisplay.playerX, dialogDisplay.playerY, dialogDisplay.playerWidth, dialogDisplay.playerHeight);
  pop();
}

// Function to manage prison navigation based on game state
function navigatePrison() {

  // Reset button associations
  $(`.button-nav`).off(`click`);

  // Escape button
  if (!escape) {
    $(`#escape-attempt`).on(`click`, function() {
      $("#escape-fail-alert").dialog({
        modal: true,
        open: function() {
          $(".ui-dialog-titlebar-close").show();
        }
      });


    }); // If state is scene three show start escape dialog
  } else if (scene === `sceneThree` && state === `sceneThreeCell` && escape) {
    $(`#escape-attempt`).on(`click`, function() {
      $("#escape-start").dialog({
        modal: true,
        open: function() {
          $(".ui-dialog-titlebar-close").show();
        },
      });
      // Set the state to SceneThreeEscape
      state = `sceneThreeEscape`;
      //  Reset the countdown
      timer.countdown = 20;

      // Start the responsive voice automated prison message
      speakInterval = setInterval(function() {
          responsiveVoice.speak("Inmates! Return to your cells. The prison is in lockdown", "UK English Male", {
            pitch: 1,
            rate: 1,
          });

        },
        5000
      );
    });


  }

  // Navigation for scene one
  if (scene === `sceneOne`) {

    // Trigger scene change
    if (tradesCompleteSceneOneCafeteria) {
      $(`#warden`).on(`click`, function() {
        state = `sceneOneWarden`;
        $("#ramen-trader").hide();
      });
    }

    // Trigger scene change
    if (state === `sceneOneWarden` && tradesCompleteSceneOne) {
      $(`#cell`).on(`click`, function() {
        state = `sceneTwoCell`;
        scene = `sceneTwo`;
      });
    }
  }

  // Navigation for scene two
  if (scene === `sceneTwo`) {
    if (state === `sceneTwoCell` && !tradesCompleteSceneTwoCafeteria && !smokesTraded) {
      $(`#cafeteria`).on(`click`, function() {
        state = `sceneTwoCafeteria`;
      });
    }
    if (state === `sceneTwoCafeteria` && tradesCompleteSceneTwoCafeteria) {
      $(`#recreation-yard`).on(`click`, function() {
        state = `sceneTwoRec`;
        // Reset gum to no reversion
        $("#gum-player").draggable({
          revert: false
        });
      });
    }

    if (state === `sceneTwoRec` || state === `sceneTwoHall` || state === `sceneTwoCommon` || state === `sceneTwoCellB`) {
      $(`#common-area`).on(`click`, function() {
        state = `sceneTwoCommon`;
        // Make gum tradable again
        $("#gum-player").draggable({
          revert: false
        });
      });

      $(`#recreation-yard`).on(`click`, function() {
        state = `sceneTwoRec`;
      });

      $(`#hall`).on(`click`, function() {
        state = `sceneTwoHall`;
      });

      $(`#cell`).on(`click`, function() {
        state = `sceneTwoCellB`;
      });
    }

    if (tradesCompleteSceneTwo) {
      $(`#cell`).on(`click`, function() {
        // Stop regular game music
        gameMusic.stop();
        // Start tension music
        tensionMusic.loop();
        // Change scene and state
        scene = `sceneThree`;
        state = `sceneThreeCell`;

      });
    }
  }

  // Manage navigation for scene three
  if (scene === `sceneThree`) {
    // All trades are complete
    allTradesComplete = true;
    if (lightsAreOut) {
      //allow user to attempt escape
      escape = true;
    }
  }
} // End of Navigate Prison


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

  if (state === `sceneThreeCell`) {
    // Game over text when countdown reaches 0
    if (timer.countdown == 0) {
      state = `sceneThreeLose_A`
    }
  }

  if (state === `sceneThreeEscape`) {
    // Game over text when countdown reaches 0
    if (timer.countdown == 0) {
      state = `sceneThreeLose_B`
    }
  }
}
