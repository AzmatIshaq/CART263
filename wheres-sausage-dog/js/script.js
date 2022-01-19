/**
Where's Sausage Dog?
Azmat Ishaq


*/

"use strict";

const NUM_ANIMAL_IMAGES = 10;

const NUM_ANIMALS = 100;

let animalImages = [];

let animals = [];

/**
Description of preload
*/
function preload() {

for(let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`)
      animalImages.push(animalImage);
  }

} // End of Preload


/**
Description of setup
*/
function setup() {
  createCanvas (1000,1000);

  // Create the animals
  for(let i = 0; i < NUM_ANIMALS; i++) {
      let x = random(0, width);
      let y = random(0, height);
      let animalImage = random(animalImages);
      let animal = new Animal(x, y, animalImage);

      animals.push(animal);
  }


} // End of setup


/**
Description of draw()
*/
function draw() {
  background(0);

  for(let i = 0; i < animals.length; i ++) {
    animals[i].update();
  }

} // End of draw
