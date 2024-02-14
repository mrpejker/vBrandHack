import './style.css';
import Phaser from 'phaser';

//Defining scene size
const sizes={
    width:500,
    height:500,
}; 

// Initial speed of the falling items
const speedDown = 200;

const gameStartDiv = document.querySelector("#gameStartDiv");
const gameStartBtn = document.querySelector("#gameStartBtn")
const gameEndDiv = document.querySelector("#gameEndDiv")
const gameWinLoseSpan = document.querySelector("#gameWinLoseSpan")
const gameEndScoreSpan = document.querySelector("#gameEndScoreSpan")

//Main Game Scene
class GameScene extends Phaser.Scene{
    constructor(){
        super("scene-game");// scene id
        this.player;
        this.cursor;// keyboard input
        this.target;// falling object
        this.points = 0;//score
        this.playerSpeed = speedDown+50;
        this.fallSpeed = speedDown;
        this.textScore;
        this.textTime;
        this.timedEvent;
        this.remainingTime;
        this.coinMusic;
        this.bgMusic;
        this.emitter;
        this.prizetype;
    }

    //preload assets before the game starts
    preload(){
        this.load.image("bg","/assets/squarebg.png");
        this.load.image("bs", "/assets/basket.png");
        this.load.image("fal", "/assets/bottle.png");
        this.load.audio("coin", "/assets/coin.mp3");
        this.load.audio("bgM", "/assets/red.mp3");
        this.load.image("mon", "/assets/coin.png");
    }

    //set up of the game objects once the game starts
    create() {

        this.scene.pause("scene-game");

        //background image and position 
        let bg = this.add.image(0, 0, "bg").setOrigin(0,0);

        // Scale the image to fit the size of the game scene
        const scaleX = this.cameras.main.width / bg.width;
        const scaleY = this.cameras.main.height / bg.height;
        const scale = Math.min(scaleX, scaleY); // Use Math.min to fit the image entirely without cropping
        bg.setScale(scale).setScrollFactor(0);

        //Music setup
        this.coinMusic = this.sound.add("coin");
        this.bgMusic = this.sound.add("bgM");
        this.bgMusic.play();

        //player setup
        this.player = this.physics.add
            .image(0, sizes.height-67, "bs")
            .setOrigin(0,0).setScale(0.15);
        this.player.setImmovable(true);
        this.player.body.allowGravity = false; 
        this.player.setCollideWorldBounds(true);
        //adjust player collision body for more precise collisions
        this.player.setSize(this.player.width-this.player.width/4,this.player.height- this.player.height/2)
        .setOffset(this.player.width/10, this.player.height-this.player.height/2);       

        //target (falling objecr) setup
        this.target = this.physics.add
            .image(0, 0, "fal")
            .setOrigin(0,0).setScale(0.03);
        this.target.body.setGravityY(this.fallSpeed);
        this.target.setMaxVelocity(0, this.fallSpeed);// set maximum falling velocity 
        this.target.setX(this.getRandomX());//randomize initial position

        //Detecting collision
        this.physics.add.overlap(this.target, this.player, this.targetHit, null, this);

        //Setting up keyboard
        this.cursor = this.input.keyboard.createCursorKeys();

        //score and timer
        this.textScore = this.add.text(sizes.width - 120, 10, "Points:0", {
            font: "20px Arial",
            fill: "#B5FFEB",
        });
        this.textTime = this.add.text(10, 10, "Time left: 00 sec", {
            font: "20px Arial",
            fill: "#B5FFEB",
        });

        //set up max time
        this.timedEvent = this.time.delayedCall(30000,this.gameOver, [], this); 

        //
        this.emitter = this.add.particles(0,0,"mon", {
            speed: { min: -100, max: 100 },
            gravityY: speedDown-200,
            scale:0.03,
            duration:70,
            emitting:false,
        });
        this.emitter.startFollow(this.player, 1 , 1, true);
    }

    update(){
        //update timers
        this.remainingTime = this.timedEvent.getRemainingSeconds();
        this.textTime.setText(`Time left: ${Math.round(this.remainingTime).toString()}`);

        //reset target position when it falls & increase speed
        if (this.target.y >= sizes.height) {
            this.target.setY(0);
            this.target.setX(this.getRandomX())
            this.increaseFallSpeed();
        };

        //player movement input
        const {left, right} = this.cursor;

        if (left.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
        } else if (right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
        } else {
            this.player.setVelocityX(0);
        };
    }

    // randomizer
    getRandomX() {
        return Phaser.Math.Between(0, sizes.width - this.target.displayWidth);
    }

    //Collision with target
    targetHit(){
        this.coinMusic.play();//music dzzin
        this.emitter.start();//emits poins
        this.target.setY(0);
        this.target.setX(this.getRandomX());
        this.points++;
        this.textScore.setText(`Score: ${this.points}`);
        this.increaseFallSpeed();

    }

    gameOver(){
        this.sys.game.destroy(true)
        if (this.points >= 25){
            gameEndScoreSpan.textContent = this.points
            gameWinLoseSpan.textContent = "You won a prize!"
            this.prizetype = 1
        } else if (this.points >= 10){
            gameEndScoreSpan.textContent = this.points
            gameWinLoseSpan.textContent = "You won a prize!"
            this.prizetype = 2
        } else{
            gameEndScoreSpan.textContent = this.points
            gameWinLoseSpan.textContent = "Sorry, you lost( Try again!"
            this.prizetype = 0
        }
        gameEndDiv.style.display = "flex"
    }

    increaseFallSpeed() {
        this.fallSpeed += 15; // Increment the fall speed.
        // Adjust the max velocity to allow for the new increased speed.
        this.target.setMaxVelocity(0, this.fallSpeed + 100); // +100 gives room for acceleration.
    }
};

const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    canvas: gameCanvas,
    physics:{
        default: "arcade",
        arcade:{
            gravity:{ y:speedDown},
            debug: false,// true if need to see movement patterns highlighted
        },
    },
    scene: [GameScene],
};

const game = new Phaser.Game(config);

gameStartBtn.addEventListener("click", () =>{
    gameStartDiv.style.display = "none"
    game.scene.resume("scene-game")
})