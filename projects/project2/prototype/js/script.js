/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let prisonCafeteria;

/**
Description of preload
*/
function preload() {

  // Preload the cafeteria image
  prisonCafeteria = loadImage('../assets/images/prison-cafeteria.png');

}


/**
Description of setup
*/
function setup() {
  let canvas = createCanvas(550, 400);
  canvas.parent(`#game-canvas`);

}


/**
Description of draw()
*/
function draw() {
  background(0);
  image(prisonCafeteria, 0, 0, 550, 400);
}


// JQuery

$(`#items`).draggable({

  });
