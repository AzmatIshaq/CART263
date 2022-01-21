// Animal
// A class defining an animal that can be displayed as an image

class Animal {
  // constructor(x, y, image)
  // Stores position and image as properties
  // Creates an angle property for potential rotation
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.vx = random(1, 3);
    this.vy = 0;
    this.size = 100;
    this.image = image;
    this.imageWidth = 0;
    this.imageHeight = 0;
    this.startingPosition = 0;
    this.angle = 0;
    // flip variable to flip animals when clicked

  } // End of constructor

  // update()
  // Calls the display method
  update() {
    this.display();
    this.move();

  }

  // display()
  // Displays this animal's image on the canvas at its position and rotation
  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0, this.imageWidth, this.imageHeight);
    pop();
  }
  // Movement function in order to move the herd of animals
  move() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
    // Reset animals to starting position when they reach the end of the canvas
    if (this.x > width + this.size) {
      this.x = this.startingPosition;
    }
  } // End of move function


  // overlap(x,y)
  // Checks whether the position x,y is inside this animal's image
  // Returns: true if the click was inside the image and false otherwise

  overlap(x, y) {
    // Check if the x is greater than the left side and less that the right side
    // and greater than the top and less than the bottom of the image
    // Uses the width and height properties of the image to track its size
    if (x > this.x - this.image.width / 2 &&
      x < this.x + this.image.width / 2 &&
      y > this.y - this.image.height / 2 &&
      y < this.y + this.image.height) {
      return true;
    } else {
      return false;
    }
  }


  // Mouse pressed function in order to trigger effects with animals
  mousePressed() {

    // Animals rotate effect when they are clicked on
    if (this.overlap(mouseX, mouseY) && state === `animation`) {
      this.angle += 1;
      // Trigger incorrect! sound effect when an animal is clicked
      incorrectSFX.play();
    }
  } // End of mousePressed function

} // End of Animal class
