/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Image variables
let cafeteriaBgImg;
let prisonBgImg;
let hallBgImg;
let cellBgImg;
let wardenCharImg;


// states
// let state = `title`;
// let state = ``;
let state = `sceneOneCafeteria`;

// Variable for JSON data

let gameTextData;

// Variables to manage trades

let tradeActive = false;


/**
Description of preload
*/
function preload() {

  // Preload venue images
  cafeteriaBgImg = loadImage('assets/images/prison-cafeteria.png');
  prisonBgImg = loadImage('assets/images/prison_main.png');
  hallBgImg = loadImage('assets/images/prison-hall.jpg');
  cellBgImg = loadImage('assets/images/prison-cell-scene.jpg');
  wardenCharImg = loadImage('assets/images/warden.png');

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

}


/**
To display and run the scene events and animations.
*/
function draw() {
  background(0);

  if (state === `sceneOne`) {
      sceneOne();
      animation();
    }


  if (state === `sceneOneCell`) {
      sceneTwo();
      animation();
    }

  if (state === `title`) {
      sceneThree();
      animation();
    }

} // End of draw


/* - - - - - - - - - - - TRADING - - - - - - - - - - - - - - - - - - - - - -  */

if (tradeActive === false && state === `sceneOneCafeteria`) {

    // jQuery
    // Make the trade items draggable.
    $(".items").draggable({

      });

    $(`#trade-screen-2`).droppable({
      drop: makeTrade
    });


    // Will utilize this for scene switching and event triggering as well

    $(`#go-to-dining`).on(`click`, function() {
      state = `dining`;
    });

}



// Function to manage trades

function makeTrade(event, ui) {
  if (state === `sceneOneCafeteria`) {
    if (ui.draggable.attr(`id`) === `ramen`) {
      alert(`succesful trade!`);
      state = `sceneOneHall`;
      // Successful trade!
      // Add something cool to the player's inventory
      // Display a message(s) from the cellmate
    }
    else {
      // Unsuccessful trade!
      alert(`Trade rejected! Hey fool how about something I actually need?`);
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

function sceneOne() {

  // Scene One - Cafeteria
    if (state === `sceneOneCafeteria`) {
      image(cafeteriaBgImg, 0, 0, 550, 400);
      push();
      fill(255);
      textSize(12);
      text(gameTextData.sceneOne.cafeteria, 580, 40);
      pop();
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

  if (state === `sceneOneHall`) {
      image(hallBgImg, 0, 0, 550, 400);

      image(wardenCharImg, 620, 10, 150, 150);

      push();
      fill(255);
      textSize(12);
      text(gameTextData.sceneOne.hall, 645, 200);
      pop();
    }
}













// function keyPressed() {
//
//   // Switch from title to scene one.
//   if (state === `title` && keyCode === ENTER) {
//     state = `sceneOneCafeteria`;
//   }
// }
