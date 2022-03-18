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

// The secret answers we're looking for (including capitalization)
//  This eaten breakfast was delicious

// Separated the sentence into variable in order to trigger the alter if
// the user is on the wrong track
let secret1 = `This`;
let secret2 = `This eaten`;
let secret3 = `This eaten breakfast`;
let secret4 = `This eaten breakfast was`;
let secret5 = `This eaten breakfast was delicious`;

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
    "I agree": function() {
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
      // Check if they got the answer right...
      if ($(`#answer`).text() === secret1 || $(`#answer`).text() === secret2 || $(`#answer`).text() === secret3 || $(`#answer`).text() === secret4) {
          $(`#keep-going`).dialog(`open`);
            // alert(`Keep going!`)
      } else if ($(`#answer`).text() != secret5) {
        alert(`WRONG! Start over please.`)
      }

      if ($(`#answer`).text() === secret5){
        // If they did, display the dialog!
        $(`#solved-dialog`).dialog(`open`);
      }
      // Add a space between the words
      $(this).append(` `);
    }
  });

  // Turn the dialog div into an actual dialog
  $(`#keep-going`).dialog({
    modal: true,
    // Don't open it right away
    autoOpen: false,
    // Add a condescending button to close it
    buttons: {
      "Keep Going!": function() {
        $(this).dialog(`close`);
      }
    }
  });


//  Hint button
  $(`#button-hint`).on(`click`, function(event) {
    if ($(`#answer`).text() === ``){
      alert(`The _`);
    } else if ((`#answer`).text() === secret1){

    }
});
