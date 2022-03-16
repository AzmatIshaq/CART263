/**
Code Taker
Pippin Barr
The user can uncover secret letters in the poem by mousing over them. Once found
they can drag the letters in the correct order to the answer area to find the
name of an amazing instrument (the theremin) and receive congratulations.
Uses:
jQuery
https://jquery.com
jQuery UI:
https://jqueryui.com
*/

"use strict";

// The secret answer we're looking for (including capitalization)
let secret = `Theremin`;

// Turn the dialog div into an actual dialog
$(`#solved-dialog`).dialog({
  // Don't open it right away
  autoOpen: false,
  // Add a condescending button to close it
  buttons: {
    "I know": function() {
      $(this).dialog(`close`);
    }
  }
});

// When the user mouses over secret letters, highlight them
$(`.secret`).on(`mouseover`, function(event) {
  $(this).addClass(`found`, 500);
});

// Let the user drag secret letters via a clone helper
$(`.secret`).draggable({
  helper: `clone`
});

// When the user drops a letter on the answer...
$(`#answer`).droppable({
  drop: function(event, ui) {
    // Get the letter in the dragged element
    let letter = ui.draggable.text();
    // Add it to the answer box
    $(this).append(letter);
    // Disable dragging for this letter
    ui.draggable.draggable(`disable`);
    // Remove the highlighting of this letter
    ui.draggable.removeClass(`found`, 500);
    // Disable mouseovers on this letter
    ui.draggable.off(`mouseover`);
    // Check if they got the answer right yet...
    if ($(`#answer`).text() === secret) {
      // If they did, display the dialog!
      $(`#solved-dialog`).dialog(`open`);
    }
  }
});

/* MY TEMPLATE #4caf50 */

// /* - - - - - - - - - - - VARIABLES - - - - - - - - - - - - - - - - - - - - -  */
//
// // Variable to style canvas
// let canvasProperties = {
// // Set canvas width and height
//   w: 850,
//   h: 550,
// };
//
// // Variable to style the background
//
// let bg = {
//   r: 0,
//   g: 0,
//   b: 0,
// };
//
// // Variable to set starting state to `title`
//
// let state = `title`;
//
//
// /*********************** PRELOAD **********************************************/
//
// /**
// Description of preload
// */
// function preload() {
//
// }
//
//
// /*********************** SETUP ************************************************/
//
// /**
// Description of setup
// */
// function setup() {
//
//   createCanvas(canvasProperties.w, canvasProperties.h);
//
// }
//
//
// /*********************** DRAW *************************************************/
//
//
// /**
// Description of draw
// */
// function draw() {
//   background(bg.r, bg.g, bg.b);
//
//     // Alternate between game states
//   if (state === `title`) {
//     titleState();
//   }
//   if (state === `animation`) {
//     animationState();
//   }
//
// } // End of draw()
//
// /* - - - - - - - - - - - USER INTERACTION - - - - - - - - - - - - - - - - - - */
//
// /*********************** KEY PRESSED ******************************************/
//
// // function keyPressed() {
// // }
//
// /*********************** MOUSE PRESSED ****************************************/
//
// // function mousePressed() {
// // }
//
// /* - - - - - - - - - - - STATES - - - - - - - - - - - - - - - - - - - - - - - */
//
// /*********************** ANIMATION STATE **************************************/
//
// function animationState() {
//
// }
//
// /*********************** TITLE STATE ******************************************/
//
// function titleState() {
//
// }
//
// /*********************** RESET STATES *****************************************/
//
// function resetStates() {
//
// }
