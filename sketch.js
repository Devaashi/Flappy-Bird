var PLAY=1;
var END=0;
var gameState=PLAY;

var flappy,flappy_fly,flappy_hurt;

var sky,skyImg;
var ground,groundImg;

var hurtSound;
var flappingSound;

var gameOver,gameOverImg;
var play,playImg,playB;

var pipesGroup;
var pipes1U,pipes2U,pipes3U,pipes4U,pipes5U;
var pipes1D,pipes2D,pipes3D,pipes4D,pipes5D;

var life=6;

function preload(){
  flappy_fly = loadAnimation("flappyUp.png","flappyDown.png");
  flappy_hurt = loadAnimation("hurt.png");
  
  skyImg=loadImage("background1.png");
  groundImg=loadImage("Ground.png");

  hurtSound=loadSound("HitSound.wav");
  flappingSound=loadSound("Wing.wav");

  gameOverImg=loadImage("gameOver.png");
  playImg=loadImage("Play.png");

  pipes1U=loadImage("pipes1-2.png");
  pipes2U=loadImage("pipes2-2.png");
  pipes3U=loadImage("pipes3-2.png");
  pipes4U=loadImage("pipes4-2.png");
  pipes5U=loadImage("pipes5-2.png");
  
  pipes1D=loadImage("pipes1-1.png");
  pipes2D=loadImage("pipes2-1.png");
  pipes3D=loadImage("pipes3-1.png");
  pipes4D=loadImage("pipes4-1.png");
  pipes5D=loadImage("pipes5-1.png");
  
}

function setup() {
  createCanvas(600,550);
  flappy = createSprite(150,200,20,50);
  flappy.addAnimation("running", flappy_fly);
  flappy.addAnimation("hurt",flappy_hurt);
  flappy.scale=0.2;
  
  sky=createSprite(300,50,30,30);
  sky.addImage(skyImg);
  sky.scale=4.6;
  sky.depth=flappy.depth;
  flappy.depth=flappy.depth+1;

  ground=createSprite(300,549,35,35);
  ground.addImage(groundImg);
  ground.scale=1.9;

  gameOver=createSprite(300,190,40,40);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.7;
  gameOver.visible=false;

  play=createSprite(300,262.5,45,45);
  play.addImage(playImg);
  play.scale=0.4;
  play.visible=false

  playB=createSprite(300,262.5,94,52);
  playB.visible=false;

  pipesGroup=createGroup();

  life=6;
}

function draw() {
  background("white");
 
  if(gameState===PLAY){

    if(flappy.isTouching(pipesGroup)){
      flappy.changeAnimation("hurt",flappy_hurt);
      hurtSound.play();
      life=life-1;
      gameState=END
    }
    if(flappy.isTouching(ground)){
      flappy.changeAnimation("hurt",flappy_hurt);
      hurtSound.play();
      life=life-1;
      gameState=END;
    }
    
    if(keyDown("space")&& flappy.y>0) {
        flappy.velocityY = -6;
        flappingSound.play();
    }
    
   sky.velocityX=-10;
  if (sky.x <-80){
    sky.x = sky.width/2;
    }
  
    flappy.velocityY = flappy.velocityY + 0.8;
    
    spawnObstacles();
    
    
  
  }
  else if(gameState===END){
    
    gameOver.visible=true;
    play.visible=true;
    
    pipesGroup.setVelocityXEach(0);
    sky.velocityX=0;
    flappy.velocityY=0; 
    
    if(mousePressedOver(playB)){
      Reset();
    }
    
  }
 
  flappy.collide(ground);
  
  drawSprites();
  
  fill("black");
  textStyle(BOLD);
  textSize(20);
  text("LIVES: "+ life,270,50);
  
}

function Reset(){
  gameOver.visible=false;
  play.visible=false;
  
  pipesGroup.destroyEach();
  
  if(life<1){
    life=6;
  }
    
  flappy.position.x=150;
  flappy.position.y=200;
  flappy.changeAnimation("running", flappy_fly);
  
  gameState=PLAY;
}

function spawnObstacles() {

  if(World.frameCount % 55 === 0){
    var pipe = createSprite(601,355,20,20);
    var pipes=createSprite(601,355,20,20);
    pipe.position.x=pipes.position.x;
   r =Math.round(random(1,5))
    if(r==1){
      pipe.addImage(pipes1U);
      pipes.addImage(pipes1D);
      pipe.position.y=69;
      pipes.position.y=349;
      pipe.scale=1.2
      pipe.setCollider("rectangle",0,0,54,100);
      pipes.setCollider("rectangle",0,0,54,115);
    }else if (r==2){
      pipe.addImage(pipes2U);
      pipes.addImage(pipes2D);
      pipe.position.y=131;
      pipes.position.y=381;
      pipe.scale=1;
      pipes.setCollider("rectangle",0,0,54,54);
      pipe.setCollider("rectangle",0,0,54,238);
    }else if (r==3){
      pipe.addImage(pipes3U);
      pipes.addImage(pipes3D);
      pipe.position.y=39;
      pipes.position.y=294;
      pipe.scale=1;
      pipe.setCollider("rectangle",0,0,54,74);
      pipes.setCollider("rectangle",0,0,54,234);
    }else if (r==4){
      pipe.addImage(pipes4U);
      pipes.addImage(pipes4D);
      pipe.position.y=149;
      pipes.position.y=402;
      pipe.scale=1;
      pipe.setCollider("rectangle",0,0,54,280);
      pipes.setCollider("rectangle",0,0,54,20);
    }else if (r==5){
      pipe.addImage(pipes5U);
      pipes.addImage(pipes5D);
      pipe.position.y=99;
      pipes.position.y=351;
      pipe.scale=1;
      pipe.setCollider("rectangle",0,0,54,180);
      pipes.setCollider("rectangle",0,0,54,120);
    }
  pipe.velocityX= -7;
  pipe.setLifetime= 100;
    
  pipes.velocityX= -7;
  pipes.setLifetime= 100;  
    
  pipe.depth=ground.depth;
  ground.depth=ground.depth+1;  
    
  pipe.depth=flappy.depth;
  flappy.depth=flappy.depth+1;  
    
  pipesGroup.add(pipe);  
  pipesGroup.add(pipes);  
    
  }
}  