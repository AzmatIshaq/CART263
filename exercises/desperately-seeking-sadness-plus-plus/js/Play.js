/**
The play scene that drives the overall game. Creates sprites representing
the avatar, the thumbs down, and the thumbs ups. Adds keyboard controls
for the avatar. Adds collisions and overlaps to handle physics and thumbs
down collection.
*/

let burn = false;


class Play extends Phaser.Scene {

  /**
  Just sets the scene's key name
  */
  constructor() {
    super({
      key: `play`
    });
  }

  /**
  Does the lion's share of the work creating sprites and configuring them,
  as well as setting physics handlers and listening to the arrow keys.
  */
  create() {
    // Create the avatar and make it collide with the "walls"
  if (burn) {
    this.avatar = this.physics.add.sprite(0, 400, `fire-emoji`);
  } else {
    this.avatar = this.physics.add.sprite(0, 400, `avatar`);

  }
    this.avatar.setCollideWorldBounds(true);

    // Create a sadness emoji in a random position
    this.sadness = this.physics.add.sprite(0, 0, `thumbs-down`);



    // Note how we can use RandomRectangle() here if we put the object we want
    // to reposition randomly in an array!
    Phaser.Actions.RandomRectangle([this.sadness], this.physics.world.bounds);

    // Create a group of hapiness emojis with some basic
    // physics configuration
    this.happiness = this.physics.add.group({
      // Image key to use
      key: `thumbs-up`,
      // How many
      quantity: 10,
      // Collide with the "walls"
      collideWorldBounds: true,
      // How much to they bounce when they hit something?
      bounceX: 0.5,
      bounceY: 0.5,
      // How quickly do they slow down while moving?
      dragX: 50,
      dragY: 50
    });


    // Physics for fire
    this.fireEmoji = this.physics.add.group({
      // Image key to use
      key: `fire-emoji`,
      // How many
      quantity: 1,
      width: 0.1,
          // Collide with the "walls"
      collideWorldBounds: true,
      // How much to they bounce when they hit something?
      bounceX: 0.5,
      bounceY: 0.5,
      // How quickly do they slow down while moving?
      dragX: 50,
      dragY: 50,
      setScale: { x: 0.1, y: 0.1}

    });

    // fireEmoji.setScale(0.5);





    // Position all the members of the group randomly within a rectangle the same
    // dimensions and position as the world's bounds (e.g. the canvas)

    // Contain all the thumbs up inside a ring of fire
    const rect = new Phaser.Geom.Rectangle(360, 250, 100, 50);
    Phaser.Actions.RandomRectangle(this.happiness.getChildren(), rect);

    // Listen for when the avatar overlaps the thumbs up and handle it,
    // remembering to set "this" so that we can use "this" in the method it calls
    this.physics.add.overlap(this.avatar, this.sadness, this.getSad, null, this);

    // Add colliders between the avatar and the happiness, and the happiness and itself
    // so that we get lots of fun bouncy physics for free!
    this.physics.add.collider(this.avatar, this.happiness);
    this.physics.add.collider(this.happiness, this.happiness);

    // Light the emoji on fire when he collides with the fire
    this.physics.add.collider(this.avatar, this.fire);

    // Handle the overlap between the vatar and the fireEmoji
    this.physics.add.overlap(this.avatar, this.fireEmoji, this.getHappy, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();


    // Text styling
    let style = {
      fontFamily: 'Arial',
      fontSize: 64,
      color: '#ffffff',
    };

    // Game description
    let gameDescription = `Fire Emoji!`;
    //  Pass in a basic style object with the constructor
    this.add.text(250, 10, gameDescription, style);


    // Group to manage spinning fire

    this.fire = this.add.group();

       for (let i = 0; i < 32; i++)
       {
           this.fire.create(i * 32, i * 2, 'fire').setScale(0.1);
       }


  } // End of create

  /**
  Called when the avatar overlaps the sadness, moves the sadness to a new random position.
  */
  getSad(avatar, sadness) {
    // Note how we can use RandomRectangle() again here if we put the object we want
    // to reposition randomly in an array!
    Phaser.Actions.RandomRectangle([sadness], this.physics.world.bounds);
  }

// Called when user overlaps fire emoji
  getHappy(avatar, fireEmoji) {
    // Note how we can use RandomRectangle() again here if we put the object we want
    // to reposition randomly in an array!
    Phaser.Actions.RandomRectangle([fireEmoji], this.physics.world.bounds);
    // Audio on collision
    let boopSound = this.sound.add('boop');
    boopSound.play();

  }

  /**
  Listens for user input
  */
  update() {
    this.handleInput();

    Phaser.Actions.RotateAroundDistance(this.fire.getChildren(), { x: 400, y: 300 }, 0.02, 200);
  }

  /**
  Moves the avatar based on the arrow keys for rotation and thrust
  */
  handleInput() {
    // If either left or right is pressed, rotate appropriately
    if (this.cursors.left.isDown) {
      this.avatar.setAngularVelocity(-150);
    }
    else if (this.cursors.right.isDown) {
      this.avatar.setAngularVelocity(150);
    }
    // Otherwise stop rotating
    else {
      this.avatar.setAngularVelocity(0);
    }

    // If the up key is pressed, accelerate in the current rotation direction
    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.avatar.rotation, 200, this.avatar.body.acceleration);
    }
    // Otherwise, zero the acceleration
    else {
      this.avatar.setAcceleration(0);
    }
  }
}
