/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

//Image variables
let cafeteriaImg;
let prisonImg;
let hallImg;
let cellImg;

// states
// let state = `title`;
let state = `sceneOneCafeteria`;

// Variable for JSON data

let gameTextData;



/**
Description of preload
*/
function preload() {

  // Preload images
  cafeteriaImg = loadImage('assets/images/prison-cafeteria.png');
  prisonImg = loadImage('assets/images/prison_main.png');
  hallImg = loadImage('assets/images/prison-hall.jpg');
  cellImg = loadImage('assets/images/prison-cell-scene.jpg');

  // Preload JSON game text
  //
  gameTextData = loadJSON(`assets/data/game-text.JSON`);
}


/**
Description of setup
*/
function setup() {
  let canvas = createCanvas(850, 400);
  canvas.parent(`#game-canvas`);

}


/**
Description of draw()
*/
function draw() {
  background(0);

  if (state === `sceneOneCafeteria`) {
      image(cafeteriaImg, 0, 0, 550, 400);
      push();
      fill(255);
      textSize(12);
      text(gameTextData.sceneOne.cafeteria, 580, 40);
      pop();
    }

  if (state === `sceneOneHall`) {
      image(hallImg, 0, 0, 550, 400);

      push();
      fill(255);
      textSize(12);
      text(gameTextData.sceneOne.hall, 580, 40);
      pop();
    }

  if (state === `sceneOneCell`) {
      image(cellImg, 0, 0, 550, 400);
    }

  if (state === `title`) {
      image(prisonImg, 0, 0, 550, 400);
    }

} // End of draw

// jQuery

// Make the trade items draggable.
$(".items").draggable({

  });

$(`#trade-screen-2`).droppable({
  drop: makeTrade
});


// Will utilize this for scene switching and event triggering as well
// $(`#go-to-dining`).on(`click`, function() {
//   state = `dining`;
// });

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
      // Say something generic about how this isn't the object
      // Maybe give the player a hint about what they need
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


// function keyPressed() {
//
//   // Switch from title to scene one.
//   if (state === `title` && keyCode === ENTER) {
//     state = `sceneOneCafeteria`;
//   }
// }
