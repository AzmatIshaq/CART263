/**
Typewriter

Pippin Barr's typewriter effect code. I changed some of the details.

Represents a "typewriter" that gradually types out the
provided string on the canvas.
*/

class Typewriter {

  /**
  Takes a string, position, dimensions, and rate and
  creates the required properties to drive a typewriter.
  */
  constructor(string, x, y, w, h, rate) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.string = string;
    this.currentCharacter = 0;
    this.rate = rate;
  }

  /**
  Works out the current amount of the string to display,
  displays it, and increments the counter
  */
  update() {
    // What is the current amount of string to display?
    let currentString = this.string.substring(0, this.currentCharacter);

    // Display it
    push();
    textFont(`Courier`);
    textSize(12);
    text(currentString, this.x, this.y, this.w, this.h);
    pop();

    // Increase the current character so that we'll see
    // the next part of the string
    this.currentCharacter += this.rate;
  }
}
