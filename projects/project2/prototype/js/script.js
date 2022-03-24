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

// states
// let state = `title`;

let state = `sceneOneCafeteria`;

/**
Description of preload
*/
function preload() {

  // Preload the cafeteria image
  cafeteriaImg = loadImage('../assets/images/prison-cafeteria.png');
  // Preload the prison image
  prisonImg = loadImage('../assets/images/prison_main.png');

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
    }

  if (state === `title`) {
      image(prisonImg, 0, 0, 550, 400);
    }

}

// JQuery
// Make the trade items draggable.
$(".items").draggable({

  });


// Function to manage trading
function makeTrade(event, ui) {

  if (state = `sceneOneCafteria`) {

  }


} // End of draw


function keyPressed() {

  // Switch from title to scene one.
  if (state === `title` && keyCode === ENTER) {
    state = `sceneOneCafeteria`;
  }
}
