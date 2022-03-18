/**
Code Taker Plus Plus by Azmat Ishaq
Based on code by Pippin Barr:
  "The user can uncover secret letters in the poem by mousing over them. Once found
  they can drag the letters in the correct order to the answer area to find the name of an amazing instrument (the theremin) and receive congratulations."

I altered it to words instead of letters. The words also now have to be discovered by hovering over them. A dialogue modal was also added at the beginning.

  -Azmat

Uses:
jQuery
https://jquery.com
jQuery UI:
https://jqueryui.com
*/

"use strict";

// The secret answer we're looking for (including capitalization)
let secret = `This eaten breakfast was delicious`;

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
  // Add a condescending button to close it
  buttons: {
    "I know": function() {
      $(this).dialog(`close`);
    }
  }
});

// When the user mouses over secret words, highlight them
$(`.secret`).on(`mouseover`, function(event) {
  $(this).addClass(`found`, 500);
});

// Let the user drag secret words via a clone helper
$(`.secret`).draggable({
  helper: `clone`
});

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
    // Check if they got the answer right yet...
    if ($(`#answer`).text() === secret) {
      // If they did, display the dialog!
      $(`#solved-dialog`).dialog(`open`);
    }
    // Add a space between the words
    $(this).append(` `);
  }
});
