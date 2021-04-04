var level = "first";
var score =50
function preload() {
  bgImage1 = loadImage("assets/bg1.png");
  bgImage2 = loadImage("assets/bg2.png");


   //PLAYER BACK
   player_pause = loadImage("assets/bg2.png");
   //PLAYER BACK ANIMATION
   playerB = loadAnimation("assets/b1.png", "assets/b2.png", "assets/b3.png", "assets/b4.png");
   //PLAYER FRONT ANIMATION
   playerF = loadAnimation("assets/f1.png", "assets/f2.png", "assets/f3.png", "assets/f4.png");
   //PLAYER RIGHT ANIMATION 
   playerR = loadAnimation("assets/r1.png", "assets/r2.png", "assets/r3.png", "assets/r4.png");
   //PLAYER LEFT ANIMATION
   playerL = loadAnimation("assets/l1.png", "assets/l2.png", "assets/l3.png", "assets/l4.png");
   
    //PIKACHU
  pika = loadImage("assets/Pikachu-running back.png");
  pikaF = loadImage("assets/Pikachu-running front.png");

  //BALL
  pokeball = loadImage("assets/pokeball.png");
  pokeballm = loadImage("assets/pokeballm.png");

    //OPPONENT 1
  o1BackImage = loadImage("assets/opponent 1 back.png");
  o1FrontImage = loadImage("assets/opponent 1 front.png");
}
function setup() {
  createCanvas(1200,800);
  player = createSprite(400,400, 0, 0);
  player.scale = 0.9
  player.addAnimation("front", playerF);
  player.addAnimation("left", playerL);
  player.addAnimation("right", playerR);
  player.addAnimation("back", playerB);
  player.addImage("pause", player_pause);
  player.frameDelay = 7;
 //Create egdes
 edges = createEdgeSprites()

  o1 = createSprite(500,500, 20, 20);
  o1.addImage("backO1", o1BackImage);
  o1.setCollider("rectangle", 0, 0, 100, 100);
  o1.addImage("pauseO1", o1FrontImage);
 //create stone
 stone1 = createSprite(180, 580, 330, 30)
 stone1.visible = false
 stone2 = createSprite(1059, 652, 800, 30)
 stone2.visible = false
  pikachu = createSprite(1100, 750, 50, 40);
  pikachu.addImage("back",pika);
  pikachu.scale=2


  pikachu01 = createSprite(300, 600);
  pikachu01.addImage("front",pikaF);
  pikachu01.scale=1.5
  pikachu01.velocityX=3;
  pikachu01.visible= false;

  fireGroup = new Group()
  obstaclesGroup=new Group()
  
}
function draw() {
background(0)
text(mouseX + ","+ mouseY,10,10)

if (level === "first") {
    
    
  pikachu.visible= false;
  image(bgImage1, -320, 0, 2000, 800)
  textSize(25)
  stroke("blue")
  text("Press Right Arrow To Move Right, Press Left Arrow To Move Left , Press Up Arrow To Jump,Press D To Sprint Left,Press A To Sprite Right",93,53)
  text("x:" + mouseX + ", y:" + mouseY, 10, 20)

  playerControl();

 
  if (player.isTouching(o1)) {
    level = "second"
  }
} else if (level === "second") {
  image(bgImage2, -140, 0, 1480, 800)
  player.destroy();
  stone1.destroy();
  stone2.destroy();
  o1.destroy()
  pikachu01.visible= true;
  pikachu.visible= true;
  pikachu01.setCollider("rectangle",0,0,30,30);
  pikachu.x = mouseX
  text("x:" + mouseX + ", y:" + mouseY, 10, 20)
  spawnObstacles()
  
  text("SCORE:"+score,500,500);

  wall1=createSprite(400,600,20,100);
  wall2=createSprite(830,600,20,100);
  pikachu01.bounceOff(wall1);
  pikachu01.bounceOff(wall2);
  if (keyWentDown("space")) {
    createFire()
  }
  console.log("score"+score)
  if(fireGroup.isTouching(pikachu01)){
    obstaclesGroup.destroyEach()
    score =score -5 ;
  }

  if(score<=0){
    level="third"
    
  }

} else if (level === "third") {
 // image(bgImage3, -140, 0, 1480, 800)
  console.log("working")
}


drawSprites();



}

function playerControl() {

  if (keyDown(LEFT_ARROW)) {
    player.changeAnimation("left", playerL)
    player.x -= 3;
  }

  if (keyDown(RIGHT_ARROW)) {
    player.changeAnimation("right", playerR)
    player.x += 3;
  }

  if (keyDown(UP_ARROW)) {
    player.changeAnimation("back", playerB)
    player.y -= 3;
  }

  if (keyDown(DOWN_ARROW)) {
    player.changeAnimation("front", playerF)
    player.y += 3;
  }

}

function spawnObstacles() {
  var randomFrame=Math.round(random(40,120));
  if (frameCount % randomFrame === 0) {
    var obstacle = createSprite(pikachu01.x, pikachu01.y, 10, 40);
    obstacle.addImage(pokeball);
    //obstacle.debug = true;
    obstacle.velocityY = 6

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.02;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
  obstaclesGroup.lifetime=200;

}


function createFire() {
  fire = createSprite(pikachu.x, pikachu.y, 5, 10)
  fire.addImage(pokeballm);
  fire.velocityY = -6;
  fire.scale=0.2;
  fire.x = pikachu.x;
  fire.lifetime = 100;
  fire.shapeColor = "red"
  fireGroup.add(fire);
  fireGroup.lifetime=200;
}