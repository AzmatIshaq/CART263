/**
Code Taker Plus Plus by Azmat Ishaq
Based on code by Pippin Barr:
  "The user can uncover secret letters in the poem by mousing over them. Once found
  they can drag the letters in the correct order to the answer area to find the name of an amazing instrument (the theremin) and receive congratulations."

I altered it to words instead of letters. The words also now have to be discovered by hovering over them. A dialogue modal was also added at the beginning. There are also hints and encouragement which utilize alerts and Jquery dialogue boxes.

  -Azmat

Uses:
jQuery
https://jquery.com
jQuery UI:
https://jqueryui.com
*/

"use strict";

// The secret answer we're looking for:
//  This eaten breakfast was delicious

// Separate sentences as variables in order to trigger alerts if  the user is on the wrong track
let secret1 = `This`;
let secret2 = `This eaten`;
let secret3 = `This eaten breakfast`;
let secret4 = `This eaten breakfast was`;
let secret5 = `This eaten breakfast was delicious`;

// Set the puzzle to active so effects can happen
let puzzleActive = true;

// Dialog box to instruct the user on what they should do
$(`#instructions_dialogue`).dialog({
  modal: true,
  resizable: false
});

// Turn the dialog div into an actual dialog
$(`#solved-dialog`).dialog({
  modal: true,
  // Don't open it right away
  autoOpen: false,
  // Add a button to close it
  buttons: {
    "I agree": function() {
      $(this).dialog(`close`);
    }
  }
});

// When the user mouses over secret words, highligh them
$(`.secret`).on(`mouseover`, function(event) {
  $(this).addClass(`found`, 500);
});

// Let the user drag secret words via a clone helper
if (puzzleActive) {
  $(`.secret`).draggable({
    helper: `clone`
  });
}


// When the user drops a word on the answer...
$(`#answer`).droppable({
  drop: function(event, ui) {
    // Get the word in the dragged element
    let word = ui.draggable.text();
    // Add it to the answer box
    $(this).append(word);
    // Disable dragging for this word
    ui.draggable.draggable(`disable`);
    // Remove the highlighting of this word
    ui.draggable.removeClass(`found`, 500);
    // Disable mouseovers on this word
    ui.draggable.off(`mouseover`);
    // Check if they got the right word
    if ($(`#answer`).text() === secret1
        || $(`#answer`).text() === secret2
        || $(`#answer`).text() === secret3
        || $(`#answer`).text() === secret4) {
          // Show encouraging dialogue
        $(`#keep-going`).dialog(`open`);
    } else if ($(`#answer`).text() != secret5 && puzzleActive === true) { // Otherwise tell user to start over
      alert(`WRONG! Start over please.`)
    }
    // If the final sentence is discovered, show the winning text
    if ($(`#answer`).text() === secret5){
      // If they did, display the dialog!
      $(`#solved-dialog`).dialog(`open`);
      // Reveal the entire poem
      document.body.style.backgroundColor = "#03a9f4";
      // Turn off the puzzle to stop effects
      puzzleActive = false;
    }
    // Add a space between the words
    $(this).append(` `);
  }
});



  // Jquery dialoge box to confirm correct answers for user
  $(`#keep-going`).dialog({
    modal: true,
    // Don't open it right away
    autoOpen: false,
    // Add an encouraging button to close it
    buttons: {
      "Keep Going!": function() {
        $(this).dialog(`close`);
      }
    }
  });

// Trigger hint button when it is clicked
  $(`#button-hint`).on(`click`, function(event) {
    if ($(`#answer`).text() === ``) {
        alert(secret1);
    }
    // Added empty space to secret string to account for word spacing
    if ($(`#answer`).text() === secret1 + ` `) {
        alert(secret2);
    }
    if ($(`#answer`).text() === secret2 + ` `) {
        alert(secret3);
    }
    if ($(`#answer`).text() === secret3 + ` `) {
        alert(secret4);
    }
    if ($(`#answer`).text() === secret4 + ` `) {
        alert(`No more hints!`);
    }
});
