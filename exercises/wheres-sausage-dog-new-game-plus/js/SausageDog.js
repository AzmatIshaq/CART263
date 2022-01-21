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
    // Set found state to false for Sausage dog
    this.found = false;
    // Rotation speed for when Sausage dog is found and spins
    this.rotationSpeed = 0.25;
    // Velocity for Sausage dog
    this.vx = 2;
    this.vy = 0;

  } // End of constructor

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
      // Start rotating Sausage dog
      this.angle += this.rotationSpeed;
      // Stop moving Sausage dog when it is found
      this.vx = 0;
      // Stretching effect of Sausage Dog when you click on it
      this.imageWidth += 15;
    }

    // If the timer is lower than 10 seconds sausage dog starts moving really fast
    if (timer.countdown < 10) {
      this.vx = 30;
    }
  } // End of move function

  // mousePressed()
  // Checks if this sausage dog was clicked and remembers it was found if so
  mousePressed() {
    if (!this.found && this.overlap(mouseX, mouseY)) {
      this.found = true;
      // Play barking sound when Sausage dog is clicked on
      barkSFX.play();
      // Added a delay before the ending win state shows up
      setTimeout(function() {
        state = `endWin`
      }, 3000)
    }
  } // End of mousPressed function
} // End of Animal class
