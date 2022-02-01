class Items {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.size = 100;
    this.imageProperties = {
      x:0,
      y:0,
      w: 100,
      h: 100,
    };
    this.angle = 0;
  } // End of constructor

// Function to display item
  display() {
    image(this.image, this.imageProperties.x, this.imageProperties.y, this.imageProperties.w, this.imageProperties.y);
  }


} // End of Items class
