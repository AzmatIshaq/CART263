/**
Title of Project
Author Name

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

*/

"use strict";

let colorPalette = {
  r1: 13,
  g1: 13,
  b1: 13,

  r2: 38,
  g2: 38,
  b2: 38,

  r3: 166,
  g3: 130,
  b3: 109,

  r4: 191,
  g4: 137,
  b4: 90,

  r5: 217,
  g5: 154,
  b5: 78,

  r6: 242,
  g6: 213,
  b6: 160,

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

// Character image variables

let wardenCharImg;

// Items image variables

let ramenImg;
let gumImg;
let swissArmyImg;

// Misc image variables

let inventoryImg;

// Inventory Gui properties

let inventoryGui = {
  x: 2,
  y: 2,
  width: 650,
  height: 360,
  alpha: 210,
};

// Item position

let ramen = {
  x: 5,
  y: 2,
  xInventory: 2,
  yInventory: 2,
  width: 50,
  height: 50,
  size:  50
};

// states
// let state = `title`;
// let state = ``;
let state = `sceneOnePrelude`;
// let state = `sceneOneCafeteria`;

// Inventory variables
// Tracks if inventory interface is open
let inventoryActive = true;
// Limites access to display inventory based on scene
let inventoryDisplay = false;

// Variable for JSON data

let gameTextData;

// Variables to activate trade moments

let tradeActive = true;

// Variables to verify trade completion between scenes

let tradesCompleteSceneOne = false;
let tradesCompleteSceneTwo = false;
let tradesCompleteSceneThree = false;

// Variables to manage item collection
let ramenCollected = false;
let gumCollected = true;

// Variable to register ramen trade

let ramenTraded = false;

/**
Description of preload
*/
function preload() {

  // Preload venue images
  cafeteriaBgImg = loadImage('assets/images/prison-cafeteria.png');
  prisonBgImg = loadImage('assets/images/prison_main.png');
  hallBgImg = loadImage('assets/images/prison-hall.jpg');
  cellBgImg = loadImage('assets/images/prison-cell-scene.jpg');
  holePreludeImg = loadImage('assets/images/hole_1_filter_night.jpg');

  // Preload character images
  wardenCharImg = loadImage('assets/images/warden.png');

  // Preload item images
  ramenImg = loadImage('assets/images/ramen2.png');
  gumImg = loadImage('assets/images/bubble_gum.png');
  swissArmyImg = loadImage('assets/images/swiss_army.png');

  // Preload inventory images
  // inventoryImg = loadImage(`assets/images/`)

  // Preload JSON game text
  //
  gameTextData = loadJSON(`assets/data/game-text.JSON`);
}


/* - - - - - - - - - - - SETUP & DRAW- - - - - - - - - - - - - - - - - - - -  */

/**
To setup the canvas and other game events.
*/
function setup() {
  let canvas = createCanvas(850, 400);
  canvas.parent(`#game-canvas`);

  // jQuery
  // Make the trade items draggable.
  $(".my-items").draggable({
     containment: "#trade-container"
    });

  $(`#trade-screen-2`).droppable({
    drop: makeTrade
  });


}


/**
To display and run the scene events and animations.
*/
function draw() {
  background(0);

  if (state === `sceneOne`) {
      sceneOne();
    }

  if (state === `sceneTwo`) {
      sceneTwo();
    }

  if (state === `sceneThree`) {
      sceneThree();
    }

    // Animation effects
    animation();

    // Inventory management
    inventory();

} // End of draw


/* - - - - - - - - - - - TRADING - - - - - - - - - - - - - - - - - - - - - -  */

// Function to manage trades

function makeTrade(event, ui) {

  // Succesful trades for Scene One Cafeteria
  if (state === `sceneOneCafeteria`) {
    if (ui.draggable.attr(`id`) === `ramen`) {
      alert(`Successful trade! Alright Teddy, you got a deal.`);

      // Register completed trade
      tradesCompleteSceneOne = true;

      // Register item trade
      ramenTraded = true;
      gumCollected = true;

      // Successful trade!
      // Add something cool to the player's inventory
      // Display a message(s) from the cellmate
      $("#gum-player").removeClass("hidden-item");
      $("#gum-player").addClass("active-item");
      $("#gum-trader").removeClass("active-item");
      $("#gum-trader").addClass("hidden-item");
      // $("#gum-trader").hide();
      // $("#gum-player").show();
      $(".my-items").draggable("disable");
    }
    else {
      // Unsuccessful trade!
      alert(`Trade rejected! Hey fool, how about something I actually need?`);
    }
  }
  else if (state === `dining`) {
    if (ui.draggable.attr(`id`) === `spork`) {
      // Successful trade!
      // Add something cool to the player's inventory
      // Display a message(s) from the cellmate
    }
    else {
      // Unsuccessful trade!
      // Say something generic about how this isn't the object
      // Maybe give the player a hint about what they need
    }
  }
}


/* - - - - - - - - - - - STATES - - - - - - - - - - - - - - - - - - - - - -  */

function titleState() {
  image(prisonBgImg, 0, 0, 550, 400);
}

// Function to manage trades for each scene
function sceneOne() {

  if (tradeActive === true && state === `sceneOneCafeteria`) {
      // Will utilize this for scene switching and event triggering as well

      $(`#go-to-dining`).on(`click`, function() {
        state = `dining`;
      });

      if (tradesCompleteSceneOne) {
        state = `sceneTwo`;
      }
  }


  // Scene One - Hall

      if (state === `sceneOneHall`) {
          image(hallBgImg, 0, 0, 550, 400);

          image(wardenCharImg, 620, 10, 150, 150);

          push();
          fill(255);
          textSize(12);
          text(gameTextData.sceneOne.hall, 645, 200);
          pop();
        }

  // Scene One Cell

      if (state === `sceneOneCell`) {
        image(cellBgImg, 0, 0, 550, 400);
      }
}


function sceneTwo() {

}

function animation() {

  if (state === `sceneOnePrelude`) {
    push();
    image(holePreludeImg, 0, 0, width / 1.54, height)
    pop();

    push();
    fill(colorPalette.r3, colorPalette.g3, colorPalette.b3);
    textSize(18);
    text(gameTextData.sceneOne.prelude, width / 1.45, height / 9.5, 250, 350 );
    pop();
  }


  // Animation for sceneOne
  if (state === `sceneOneCafeteria`) {

    // Scene Venue image
    image(cafeteriaBgImg, 0, 0, 550, 400);

    // If the ramen hasn't been collected don't display it
    if (ramenCollected === false ) {
    // Ramen Img
    push();
    imageMode(CENTER);
    image(ramenImg, width / ramen.x, height / ramen.y, ramen.width, ramen.height)
    pop();
    }

    // Scene Dialogue
    push();
    fill(255);
    textSize(12);
    text(gameTextData.sceneOne.cafeteria, 580, 40);
    pop();
  }

  if (state === `sceneOneHall`) {

    //  Scene Venue
    image(hallBgImg, 0, 0, 550, 400);

    // Scene Characters
    push();
    imageMode(CENTER);
    image(wardenCharImg, 620, 10, 150, 150);
    pop();

    // Scen Dialogue
    push();
    fill(255);
    textSize(12);
    text(gameTextData.sceneOne.hall, 645, 200);
    pop();
  }

  // Animation for scene two

}


// Mouseclicked events

function mouseClicked() {

  if (state === `sceneOneCafeteria` && ramenCollected === false) {

    if (dist(mouseX, mouseY, width / ramen.x, height / ramen.y) <= ramen.size / 2) {
      // alert(`hello`);
      ramenCollected = true;
      // $( `#ramen` ).switchClass( "hidden-item", "active-item");
      $(`#ramen`).removeClass("hidden-item")
      $(`#ramen`).addClass("active-item")
    }
  }
}

function inventory() {

  if (inventoryActive === true && inventoryDisplay === true) {

      // Inventory interface
      push();
      rectMode(CENTER);
      noStroke();
      fill(colorPalette.r3, colorPalette.g3, colorPalette.b3, inventoryGui.alpha);
      rect(width / inventoryGui.x, height / inventoryGui.y, inventoryGui.width, inventoryGui.height);
      pop();

    // Items to display in inventory
    if (ramenCollected === true && ramenTraded === false) {
      push();
      imageMode(CENTER);
      image(ramenImg, width / ramen.xInventory, height / ramen.yInventory, ramen.width, ramen.height)
      pop();
      }
    }
}

function keyPressed() {

  // Display inventory
  if (state === `sceneOneCafeteria` && keyCode === 73 && inventoryDisplay === false) {
    inventoryDisplay = true;
  } else {
    inventoryDisplay = false;
  }
}


// Function to manage scene completions
function sceneComplete() {

  if (tradesCompleteSceneOne) {

  }

}
