
var monkey , monkey_running, backgroundforestimage, backgroundforest,ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score, monkeycollided, monkeydead;
var survivalTime = 0;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart,restartimage,gameover,gameoverimage;


function preload()
{
  
  backgroundforestimage = loadImage("forest image.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  monkeycollided = loadAnimation("sprite_1.png");
  
  restartimage = loadImage("restart.png");
  gameoverimage = loadImage("gameover.png")
}



function setup() 
{
  createCanvas(800,575);
  
  Ground = createSprite(400,545,800,70);
  Ground.visible = false;
  
  backgroundforest = createSprite(450,288,50,50);
  backgroundforest.addImage("BG",backgroundforestimage);
  backgroundforest.scale = 2.5;
  
  monkey = createSprite(150,450,50,50);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.addAnimation("monkey",monkeycollided);
  monkey.scale = 0.25;
  monkey.setCollider("rectangle",100,10,100,500,0);
  monkey.debug = false;
  
  restart = createSprite(350,300,40,40);
  restart.addImage("restartgame",restartimage);
  restart.scale = 0.70;
  restart.visible=false;
  
  gameover = createSprite(350,250,50,50);
  gameover.addImage("Gameoverthegame",gameoverimage);
  gameover.scale = 0.2;
  gameover.visible=false;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("pink");
  drawSprites();
  textSize(25);
  fill("yellow");
  stroke("black");
  strokeWeight(3);
  text("survivalTime:"+survivalTime,600,45);
  textSize(25);
  fill("yellow");
  stroke("black");
  strokeWeight(3);
  text("score:"+score,600,75);
  
  if (gameState === PLAY) {
      backgroundforest.velocityX = -5;
      survivalTime=Math.round(frameCount/frameRate());
      bananas();
      obstacles();
  if(backgroundforest.x<0)
    {
      backgroundforest.x = backgroundforest.width/2;
    }
  if (keyDown("space")&& monkey.y>=400)  {
    monkey.velocityY = -14;
  }
   monkey.velocityY = monkey.velocityY + 0.5;
      
      if (FoodGroup.isTouching(monkey)) {
    score = score+1;
    FoodGroup.destroyEach();
  }
      
      if (obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
    }
      else if(gameState === END) {
        backgroundforest.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    score = 0;
    monkey.changeAnimation("monkey",monkeycollided);
    frameCount = 0;
        restart.visible=true;
        gameover.visible=true;
        if (mousePressedOver(restart)) {
          restarts();
        }
      }
  
  monkey.collide(Ground);
  

  
}

function bananas () 
{
  if (frameCount % 95 === 0) 
  {
    banana = createSprite(800,(Math.round(random(155,200))),50,50);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -10;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}


function obstacles () 
{
  if (frameCount % 275 === 0) 
  {
    obstacle = createSprite(800,(Math.round(random(450,500))),50,50);
    obstacle.addImage("obstacles",obstaceImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -10;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}
 function restarts()
{
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  
  monkey.changeAnimation("monkey_running",monkey_running);
}
