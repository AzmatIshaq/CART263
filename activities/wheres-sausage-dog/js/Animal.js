// Animal class

class Animal {

  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;

    this.angle = 0;
  } // End of contructor


  update() {
    this.display();
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }




} // End of Animal class
