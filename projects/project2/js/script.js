/**
Project 2
Azmat Ishaq

This is a template. You must fill in the title,
author, and this description to match your project!

Color Palette:

1: #0D0D0D     (13, 13, 13)
2: #262626     (38, 38, 38)
3: #A6826D     (166, 130, 109)
4: #BF895A     (191, 137, 90)
5: #D99A4E     (217, 154, 78)
6: #F2D5A0     (242, 213, 160)
7: #1e90ff     (30, 144, 255)

Characters:

image(wardenCharImg, 620, 10, 150, 150);
image(smokeyCharImg, 620, 10, 150, 150);


*/

"use strict";

// Color Palette with rgb properties
let colorPalette = {

// #0D0D0D     (13, 13, 13)
  r1: 13,
  g1: 13,
  b1: 13,

// #262626     (38, 38, 38)
  r2: 38,
  g2: 38,
  b2: 38,

// #A6826D     (166, 130, 109)
  r3: 166,
  g3: 130,
  b3: 109,

// #BF895A     (191, 137, 90)
  r4: 191,
  g4: 137,
  b4: 90,

// #D99A4E     (217, 154, 78)
  r5: 217,
  g5: 154,
  b5: 78,

// #F2D5A0     (242, 213, 160)
  r6: 242,
  g6: 213,
  b6: 160,

// #1e90ff     (30, 144, 255)
  r7: 30,
  g7: 144,
  b7: 255,
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


// Misc image variables
let inventoryImg;

// Variables to navigate venues
let venue;

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
  size:  40
};

// Chess item properties

let chess = {
  x: 2.5,
  y: 2.7,
  xInventory: 2,
  yInventory: 2,
  width: 20,
  height: 20,
  size:  20
};

// Smokes item properties
let smokes = {
  x: 2,
  y: 1.5,
  xInventory: 2,
  yInventory: 2,
  width: 30,
  height: 30,
  size:  30
};

// Swiss army knife item properties

let swissArmyKnife = {
  x: 2,
  y: 1.75,
  xInventory: 2,
  yInventory: 2,
  width: 30,
  height: 30,
  size:  30
};

// states
// let state = `title`;
// let state = ``;
// let state = `sceneOnePrelude`;
let state = `sceneOneCafeteria`;
// let state = `sceneOneWarden`;
// let state = `sceneTwoCafeteria`;
// let state = `sceneTwoCell`;
// let state = `sceneTwoRec`;
let scene = `sceneOne`;
// let scene = `sceneTwo`;

// Inventory variables
// Tracks if inventory interface is open
let inventoryActive = true;
// Limites access to display inventory based on scene
let inventoryDisplay = false;

// Variable to manage item class
let items;

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
}

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
}

// Variable to manage JSON for the npc dialogue that is active
let activeNpcDialog;
// Variable to manage JSON for player dialogue that is active
let activePlayerDialog;
// Variable to manage active character image
let activeCharImg;

// Variables to activate trade moments
let tradeActive = true;

// Variables to verify trade completion between scenes

let tradesCompleteSceneOne = false;
let tradesCompleteSceneOneCafeteria = false;

let tradesCompleteSceneTwo = false;
let tradesCompleteSceneTwoCafeteria = false;
let tradesCompleteSceneTwoRec = false;

let tradesCompleteSceneThree = false;

// Variables to manage item collection
let ramenCollected = false;
let gumCollected = false;
let smokesCollected = false;
let chessCollected = false;
let smokesTraded = false;
let swissArmyKnifeTraded = false;

// Variables to register trades
let ramenTraded = false;
let gumTraded = false;
let chessTraded = false;

let escape = false;

/**
Preload game images and audio
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
  chessImg = loadImage(`assets/images/chess-knight.png`)

  // Preload misc images
  noEscapeImg = loadImage(`assets/images/player-no-escape.jpg`);

  // Preload JSON game text
  //
  gameTextData = loadJSON(`assets/data/game-text.JSON`);
}


/* - - - - - - - - - - - SETUP & DRAW- - - - - - - - - - - - - - - - - - - -  */

/**
Function to setup the canvas and trade events.
*/
function setup() {
  let canvas = createCanvas(850, 400);
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

  // items = new Items();
}

/**
To display and run the scene events and animations.
*/
function draw() {
  background(0);

  // if (state === `sceneOne`) {
  //     sceneOne();
  //   }
  //
  // if (state === `sceneTwo`) {
  //     sceneTwo();
  //   }
  //
  // if (state === `sceneThree`) {
  //     sceneThree();
  //   }

    // Animation effects
    animation();

    // Inventory management
    inventory();

    // Navigate prison
    navigatePrison();

} // End of draw


/* - - - - - - - - - - - TRADING - - - - - - - - - - - - - - - - - - - - - -  */

// Function to manage trades
function makeTrade(event, ui) {

  // Succesful trades for Scene One Cafeteria
  if (state === `sceneOneCafeteria` && tradeActive === true) {
    if (ui.draggable.attr(`id`) === `ramen-player`) {


     $("#smokey-trade-1").dialog({
         modal: true,
         close: function(event, ui) {}
     });

     $("#smokey-trade-1").on( "dialogclose", function(event, ui) {

     });

      // Register completed trade
      tradesCompleteSceneOneCafeteria = true;

      // Register item trade
      ramenTraded = true;
      gumCollected = true;

      // Successful trade!
      // Add something cool to the player's inventory
      // Display a message(s) from the cellmate

      // $("#gum-player").removeClass("hidden-item");
      // $("#gum-player").addClass("active-item");
      // $("#gum-trader").removeClass("active-item");
      // $("#gum-trader").addClass("hidden-item");

      $("#gum-trader").hide();
      $("#gum-player").show();
      $(".my-items").draggable("disable");
    }
    else {
      // Unsuccessful trade!
      alert(`Trade rejected! Hey fool, how about something I actually need?`);
    }
  }

// Manage trade for sceneTwoCafeteria
if (state === `sceneTwoCafeteria`) {

    if (ui.draggable.attr(`id`) === `smokes-player`) {
      // Register completed trade
      tradesCompleteSceneTwoCafeteria = true;
      smokesTraded = true;
      // Successful trade!
      // Add something cool to the player's inventory
      // Display a message(s) from the cellmate
      alert(`Trade accepted!`);

      // Disable items draggability
      $(".my-items").draggable("disable");

    }
    else {
      // Unsuccessful trade!
      alert(`Trade rejected! Hey fool, how about something I actually need?`);

      $("#gum-player").draggable({
         revert: true
        });
      // Unsuccessful trade!
      // Say something generic about how this isn't the object
      // Maybe give the player a hint about what they need
    }
  }

// Manage trade for sceneTwoRec
  if (state === `sceneTwoRec`) {
    // Hide former trade

    if (ui.draggable.attr(`id`) === `chess-player` && !swissArmyKnifeTraded) {
      // Register completed trade

      // Successful trade!
      // Add something cool to the player's inventory
      // Display a message(s) from the cellmate

      // $("#devon-trade-1").dialog({
      //     modal: true,
      //     close: function(event, ui) {}
      // });
      chessTraded = true;
      $("#chess-trader").show();
      $("#chess-player").hide();

        alert(`Trade accepted!`);
        // Disable draggability
        // $(".my-items").draggable("disable");
    } else if  (ui.draggable.attr(`id`) === `chess-player` && swissArmyKnifeTraded === true) {
      tradesCompleteSceneTwo = true;
      // Unsuccessful trade!
      alert(`Trade Accepted. Aight, this works`);
      // Unsuccessful trade!
      // Say something generic about how this isn't the object
      // Maybe give the player a hint about what they need
    } else {
        alert(`Trade rejected!`);
    }

    if (ui.draggable.attr(`id`) === `swiss-knife-player`) {
      // Register completed trade

      // Successful trade!
      // Add something cool to the player's inventory
      // Display a message(s) from the cellmate

      // $("#devon-trade-1").dialog({
      //     modal: true,
      //     close: function(event, ui) {}
      // });
      swissArmyKnifeTraded = true;
      $("#chess-trader").show();
      $("#chess-player").hide();

        alert(`Trade accepted! Hey fool, how am I supposed to play chess with this? I'll take it but this deal aint finished.`);
        // Disable draggability
        // $(".my-items").draggable("disable");
    }
    else {
      // Unsuccessful trade!
      alert(`Trade rejected! Hey fool, how am I supposed to play chess with this?`);
      // Unsuccessful trade!
      // Say something generic about how this isn't the object
      // Maybe give the player a hint about what they need
    }
  }

if (ui.draggable.attr(`id`) === `gum-player`) {
  $("#gum-player").draggable({
     revert: true
    });
  }
} // End of makeTrade function

/* - - - - - - - - - - - STATES - - - - - - - - - - - - - - - - - - - - - -  */

function titleState() {
  image(prisonBgImg, 0, 0, 550, 400);
}

// Function to manage trades for each scene
function sceneOne() {
}

/* - - - - - - - - - - - ANIMIATION  - - - - - - - - - - - - - - - - - - - -  */

function animation() {

// Animation for sceneOne Trades
if (scene === `sceneOne`) {

  if (state === `sceneOnePrelude`) {
    push();
    image(holePreludeImg, bgDisplay.x, bgDisplay.y, bgDisplay.width, bgDisplay.height);
    pop();

    // Display game prelude text
    push();
    fill(colorPalette.r3, colorPalette.g3, colorPalette.b3);
    textSize(16);
    text(gameTextData.sceneOne.prelude, width / 1.45, height / 9.5, 250, 350 );
    pop();
  }

  // Animation for sceneOne
  if (state === `sceneOneCafeteria`) {

    // Scene Venue image
    sceneVenue(cafeteriaBgImg);

    // Ramen trade event
    if (ramenCollected === false ) {

    // Starting player dialogue
    activePlayerDialog = gameTextData.sceneOne.cafeteria[0].player
    // Display player dialog text
    playerDialogText(activePlayerDialog);

    // Ramen Img
    // items.display(ramenImg, width / ramen.x, height / ramen.y, ramen.width, ramen.height);

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

  if (state === `sceneOneWarden`) {
    // Hide past trade
    $("#ramen-player").hide();

      // Display scene venue
      sceneVenue(wardenBgImg);
      // Display inmate image
      activeCharImg = wardenCharImg;
      // Display scene character
      characterDisplay(activeCharImg);

    if (smokesCollected === false) {
        // Smokes Img
        push();
        imageMode(CENTER);
        image(smokesImg, width / smokes.x, height / smokes.y, smokes.width, smokes.height)
        pop();

        // Display inmate dialogue
        activeNpcDialog = gameTextData.sceneOne.wardensOffice[0].warden;
        // Display dialogue
        dialogText(activeNpcDialog);
      }

      if (smokesCollected === true) {
        activeNpcDialog = gameTextData.sceneOne.wardensOffice[1].warden;
        // Display dialogue
        dialogText(activeNpcDialog);
      }
    }
} // End of Scene One


if (scene === `sceneTwo`) {
    if (state === `sceneTwoCell`) {
      // Display scene venue
      sceneVenue(cellBgImg);
      // Display inmate dialogue
      activePlayerDialog = gameTextData.sceneOne.cell[0].player;
      // Display dialogue
      playerDialogText(activePlayerDialog);

      // Display swiss army knife in cell
      push();
      imageMode(CENTER);
      image(swissArmyImg, width / swissArmyKnife.x, height / swissArmyKnife.y, swissArmyKnife.width, swissArmyKnife.height)
      pop();
    }

    // Scene one Hall animation
    if (state === `sceneTwoCafeteria`) {
      // Display scene venue
      sceneVenue(cafeteriaBgImg);
      // Select inmate image
      activeCharImg = smokeyCharImg;
      // Display scene character
      characterDisplay(activeCharImg);
    if(!tradesCompleteSceneTwoCafeteria) {
      // Select scene dialogue
      activeNpcDialog = gameTextData.sceneTwo.cafeteria[0].inmateSmokey;
    }

    if(tradesCompleteSceneTwoCafeteria) {
      // Select scene dialogue
      activeNpcDialog = gameTextData.sceneTwo.cafeteria[1].inmateSmokey;
      }

      // Display dialogue
      dialogText(activeNpcDialog);
    }

    // Scene one Hall animation
    if (state === `sceneTwoRec`) {
      // Display scene venue
      sceneVenue(recBgImg);
      // Select inmate image
      activeCharImg = devonCharImg;
      // Display scene character
      characterDisplay(activeCharImg);
    if (!chessTraded) {
      // Select scene dialogue
      activeNpcDialog = gameTextData.sceneTwo.recYard[0].devon;
    }

    if (chessTraded && !swissArmyKnifeTraded) {
      // Select scene dialogue
      activeNpcDialog = gameTextData.sceneTwo.recYard[1].devon;
    }

    if (chessTraded && swissArmyKnifeTraded)
      {
        // Select scene dialogue
        activeNpcDialog = gameTextData.sceneTwo.recYard[2].devon;
      }

      // Display dialogue
      dialogText(activeNpcDialog);
    }

    // Scene one Hall animation
    if (state === `sceneTwoHall`) {
      // Display scene venue
      sceneVenue(hallBgImg);
      // Select inmate image
      // activeCharImg = wardenCharImg;
      // Display scene character
      // characterDisplay(activeCharImg);
      // Select scene dialogue
      activePlayerDialog = gameTextData.sceneTwo.hall.player;
      // Display dialogue
      playerDialogText(activePlayerDialog);
    }

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

} // End of animation function

// Mouseclicked events

function mouseClicked() {

  // if item && itemcollected = false <- set this up

  if (state === `sceneOneCafeteria` && ramenCollected === false) {

    if (dist(mouseX, mouseY, width / ramen.x, height / ramen.y) <= ramen.size / 2) {
      // alert(`hello`);
      ramenCollected = true;
      // Display ramen in inventory
      $(`#ramen-player`).removeClass("hidden-item")
      $(`#ramen-player`).addClass("active-item")
    }
  }

  if (state === `sceneTwoCell`) {

  if(!smokesTraded) {
    if (dist(mouseX, mouseY, width / swissArmyKnife.x, height / swissArmyKnife.y) <= swissArmyKnife.size / 2) {
      alert(`I don't need this just yet`);
      }
    } else if (dist(mouseX, mouseY, width / swissArmyKnife.x, height / swissArmyKnife.y) <= swissArmyKnife.size / 2) {
      $(`#swiss-knife-player`).addClass("active-item")
    }
  }

// Manage mouseclick for smokes
  if (state === `sceneOneWarden` && smokesCollected === false) {
    if (dist(mouseX, mouseY, width / smokes.x, height / smokes.y) <= smokes.size / 2) {
      // alert(`hello`);
      smokesCollected = true;
      tradesCompleteSceneOne = true;
      // $( `#ramen` ).switchClass( "hidden-item", "active-item");
      $(`#smokes-player`).removeClass("hidden-item")
      $(`#smokes-player`).addClass("active-item")
    }
  }

  if (state === `sceneTwoCommon` && chessCollected === false) {

    if (dist(mouseX, mouseY, width / chess.x, height / chess.y) <= chess.size / 2) {
      // alert(`hello`);
      chessCollected = true;
      // tradesCompleteSceneTwo = true;

      $(`#chess-player`).addClass("active-item")
    }
  }
} // End of mouseClicked function

// Function to manage inventory absed on game state
function inventory() {

// Manage inventory for sceneOneWarden
if(state === `sceneOneWarden`) {

  $(".my-items").draggable("enable");

  $(".my-items").draggable({
     containment: "#trade-screen-1"
    });
}

// Manage inventory for sceneTwoCafeteria
if(state === `sceneTwoCafeteria`) {

  // Allow dragability if deal is not complete
  if (!tradesCompleteSceneTwoCafeteria) {
  $(".my-items").draggable("enable");
  }

  $(".my-items").draggable({
     containment: "#trade-container"
    });
  }

// Manage inventory for sceneTwoRec
if(state === `sceneTwoRec`) {

  // Hide former trade
  $("#smokes-player").hide();
  // Show traders wire cutters
  $("#wire-cutters-trader").show();
  // Enable dragability
  $(".my-items").draggable("enable");
  // Limit trade to trade container
  $(".my-items").draggable({
     containment: "#trade-container"
    });


    if(chessTraded) {

    }

  } else {
      $("#wire-cutters-trader").hide();
  }

// Manage inventory for sceneTwoCommon
if(state === `sceneTwoCommon`) {

  $(".my-items").draggable({
     containment: "#trade-screen-1"
    });
  }


  // if (inventoryActive === true && inventoryDisplay === true) {
  //
  //     // Inventory interface
  //     push();
  //     rectMode(CENTER);
  //     noStroke();
  //     fill(colorPalette.r3, colorPalette.g3, colorPalette.b3, inventoryGui.alpha);
  //     rect(width / inventoryGui.x, height / inventoryGui.y, inventoryGui.width, inventoryGui.height);
  //     pop();
  //
  //   // Items to display in inventory
  //   if (ramenCollected === true && ramenTraded === false) {
  //     push();
  //     imageMode(CENTER);
  //     image(ramenImg, width / ramen.xInventory, height / ramen.yInventory, ramen.width, ramen.height)
  //     pop();
  //     }

      // if (gumCollected === true && gumTraded === false) {
      //   push();
      //   imageMode(CENTER);
      //   image(gumImg, width / gum.xInventory, height /gum.yInventory, gum.width, gum.height)
      //   pop();
      //   }


}

// Keypressed to manage inventory and trigger game events
function keyPressed() {

  //Key press to get out of prelude state
  if (state === `sceneOnePrelude` && keyCode === ENTER) {
    state = `sceneOneCafeteria`;
  }

  // Display inventory
  if (inventoryActive && keyCode === 73 && inventoryDisplay === false) {
    inventoryDisplay = true;
  } else {
    inventoryDisplay = false;
  }
}

// Function manage displaying venues
function sceneVenue(venueBgImg, venueText) {

  // Scene venue image
  image(venueBgImg, bgDisplay.x, bgDisplay.y, bgDisplay.width, bgDisplay.height);

  push();
  fill(255);
  textSize(12);
  text(venueText, 645, 200);
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
if(!escape) {
  $(`#escape-attempt`).on(`click`, function() {
     $("#escape-fail-alert").dialog({
         modal: true
     });
  });
} else {
  scene = `finalScene`;
  state = `escapeScene`;
}

// Navigation for scene one
if (scene === `sceneOne`) {

  // Trigger scene change
  if (tradesCompleteSceneOneCafeteria) {
    $(`#warden`).on(`click`, function() {
      state = `sceneOneWarden`;
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

  if(state === `sceneTwoCell` && !tradesCompleteSceneTwoCafeteria)
    $(`#cafeteria`).on(`click`, function() {
        state = `sceneTwoCafeteria`;
    });

  if(state === `sceneTwoCafeteria` && tradesCompleteSceneTwoCafeteria) {
    $(`#recreation-yard`).on(`click`, function() {
        state = `sceneTwoRec`;
        // Reset gum to no reversion
        $("#gum-player").draggable({
           revert: false
          });
    });
  }

  if(state === `sceneTwoRec` || state === `sceneTwoHall` || state === `sceneTwoCommon`) {
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
  }
}



  // if (scene === `sceneOne` || scene === `sceneTwo` || scene === `sceneThree`) {
  //   $(`#cell`).on(`click`, function() {
  //     sceneVenue(cellBgImg, `Nothing seems to be happening right now`);
  //   });

  // $(`#cell`).on(`click`, function() {
  //   state = `sceneOneCell`
  // });
  // }


}
