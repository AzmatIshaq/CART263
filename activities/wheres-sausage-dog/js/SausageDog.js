// Sausage Dog Class

class SausageDog extends Animal {
  constructor (x, y, image) {
    super(x, y, image);
    this.found = false;
    this.rotationSpeed = 0.25;

  } // End of constructor

  // This overrides the Animals update
  update() {
    super.update();

    if (this.found) {
      this.angle += this.rotationSpeed;
    }
  }


  mousePressed() {
    if (mouseX > this.x - this.image.width / 2 &&
        mouseX < this.x + this.image.width / 2 &&
        mouseY > this.y - this.image.width / 2 &&
        mouseY < this.y + this.image.width / 2) {
      this.found = true;
    }
  }

} // End of SausageDog class
