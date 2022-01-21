// SausageDog
// An extension of the Animal class
// Adds the idea of being found when clicked
// and spinning when found

class SausageDog extends Animal {
  // constructor(x,y,image)
  // Calls the super constructor
  // Adds properties for being found and for a rotation speed
  constructor(x, y, image) {
    super(x, y, image);

    this.found = false;
    this.rotationSpeed = 0.25;
    this.vx = 2;
    this.vy = 0;
  }

  // update()
  // Calls the super update() and changes angle if found (to rotate!)
  update() {
    super.update();

    // Reset found status to false;
    if (state === `endWin`) {
      this.found = false;
    }
  }

// Movement function to handle all the object movement code
  move() {
    super.move();
    if (this.found) {
      this.angle += this.rotationSpeed;
    }

    // If the timer is lower than 10 seconds sausage dog starts running really fast
    if (timer.countdown < 10) {
     this.vx = 30;

   }
  }

  // mousePressed()
  // Checks if this sausage dog was clicked and remembers it was found if so
  mousePressed() {
    if (!this.found && this.overlap(mouseX, mouseY)) {
      this.found = true;

      // Added a delay before the ending win state shows up
      setTimeout( function() {
        state = `endWin`
      },3000 )
    }


  }


}
