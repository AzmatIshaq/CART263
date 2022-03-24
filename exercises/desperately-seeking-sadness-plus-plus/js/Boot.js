/**
A Phaser scene to handle preloading assets before switching to the
play scene.
*/

class Boot extends Phaser.Scene {

  /**
  Just sets the scene's key name
  */
  constructor() {
    super({
      key: `boot`
    });
  }

  /**
  Loads the image assets then switches to the play scene on completion.
  */
  preload() {
    // Load images
    this.load.image(`avatar`, `assets/images/avatar.png`);
    this.load.image(`thumbs-down`, `assets/images/thumbs-down.png`);
    this.load.image(`thumbs-up`, `assets/images/thumbs-up.png`);
    this.load.image(`fire-emoji`, `assets/images/fire-smile.png`);
    this.load.image(`fire`, `assets/images/fire.png`);
    this.load.audio(`boop`, `assets/sounds/boop.wav`);
    // Switch to the play scene on complete
    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
  }



  create() {
    // Text styling
    let style = {
      fontFamily: 'Arial',
      fontSize: 64,
      color: '#ffffff',
    };

    // Loading text for boot scene
    let loadingText = `Loading...`;
    //  Pass in a basic style object with the constructor
    this.add.text(250, 10, loadingText, style);

  }

  update() {

  }

}
