var bird, bird_image;
var background, background_image;
var ground,ground_image;
var pipe1,pRpipe_image;
var pipe2,Lpipe_image;
var pipe1Group, pipe2Group;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, r;

function preload(){
bird_image=loadImage("bird.png");
Background_image=loadImage("Background.png");
ground_image=loadImage("ground.png");
Rpipe_image=loadImage("Rpipe.png");
Lpipe_image=loadImage("Lpipe.png");
r=loadImage("restart.png");
}

function setup() {
createCanvas(288,512);
Background = createSprite(144,256,10,10);
Background.addImage(Background_image);
ground=createSprite(144,470,288,112);
ground.addImage(ground_image);
bird = createSprite(25,256,10,10)
bird.addImage(bird_image);
pipe1Group = new Group();
pipe2Group = new Group();
score = 0;
restart = createSprite(144,256,10,10);
restart.addImage(r);
restart.visible=false;
restart.scale = 1;
}

function draw() {
  background(180);
  
  if(gameState === PLAY){
  pipe_move();

if (keyDown("space")){
  bird.y = bird.y - 15;
  }
  else{
  bird.velocityY = 5;
  }
 
  ground.velocityX = -1;

if(ground.x < 137){
  ground.x = ground.width/2;
  }

  if (bird.isTouching(pipe1Group) || bird.isTouching(pipe2Group)){
    gameState = END;
  }
  if(bird.isTouching(ground)){
    gameState = END;
  }
  
if(frameCount % 75 === 0){
score++;
}
}
else if(gameState === END)  {
  ground.velocityX = 0;
bird.visible = false;
bird.x=25;
bird.y=256;
pipe1Group.setVelocityXEach(0);
pipe2Group.setVelocityXEach(0);
pipe1Group.setLifetimeEach(-1);
pipe2Group.setLifetimeEach(-1);
restart.visible=true;
}
  
if(mousePressedOver(restart)){
  reset();
}

drawSprites();

textSize(30);
text("Score:" + score,175,500);
}

function pipe_move(){
if (frameCount % 75 === 0 ){
  pipe1 = createSprite(144,0,10,100);
  pipe1.addImage(Rpipe_image);
  pipe1.y = random(0,50);
  pipe1.velocityX = -2;
  pipe1Group.add(pipe1);
  pipe1Group.setLifetimeEach(144);
 
  pipe2 = createSprite(144,512,10,100);
  pipe2.addImage(Lpipe_image);
  pipe2.y = random(462,512);
  pipe2.velocityX = -2;
  pipe2Group.add(pipe2);
  pipe2Group.setLifetimeEach(144);

}

}

function reset(){
  gameState = PLAY;
  pipe1Group.destroyEach();
  pipe2Group.destroyEach();
  score = 0;
  bird.visible=true;
  restart.visible=false
}