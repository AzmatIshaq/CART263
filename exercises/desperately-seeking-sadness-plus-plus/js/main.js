/**
Desperately Seeking Sadness Plus Plus

by Azmat Ishaq

Original game by Pipping Barr:
    "An emoji in search of sadness. The player controls a neutral face emoji
      that they can fly like a spaceship using the arrow keys. They're amongst
      a sea of thumbs up emojis which get in their way (physically) while they try
      to find the single thumbs down emoji to collect it. Rinse and repeat!"

  I added a ring of fire which changes the avatar if it touches it. I also added a water drop that
  can be collected which would change the avatar back to normal and increase health. The water also triggers a sound effect.
  I also added a health bar which is negatively affected by the fire and the thumbs down. I also included the ability to push
  the thumbs up on the water in order to increase health.

  If the user can increase their health to 3000 they win the game.

*/

"use strict";

// Standard configuration for the game
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: `arcade`
  },
  scene: [Boot, Play]
};

let game = new Phaser.Game(config);
