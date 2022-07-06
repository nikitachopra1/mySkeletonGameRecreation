var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var climberGroup, invisibleGroup, doorGroup, gameState

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300)
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.5;
  climberGroup = new Group()
  doorGroup = new Group()
  invisibleGroup = new Group()
}

function draw() {
  
  if (gameState == "play"){
    background(200);
    if(tower.y > 400){
      tower.y = 300
    }
    if (climberGroup.isTouching(ghost)){
      ghost.velocityY =0
    }
    if (invisibleGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy()
      gameState = "end";
      
    }
      if(keyDown("left")){
        ghost.x = ghost.x - 3;
      }
      if(keyDown("right")){
        ghost.x = ghost.x + 3;
      }
      if(keyDown("up")){
        ghost.velocityY =-9;
      }
      ghost.velocityY = ghost.velocityY + 0.6
    
  
    if(gameState == "end"){
      background(0);
      doorGroup.destroyEach();
      climberGroup.destroyEach();
      invisibleGroup.destroyEach();
      tower.destroy()
      fill("yellow")
      text("GAME OVER",300,300)
    }
    createObstacles()
  }

  
    drawSprites()
}
function createObstacles(){
  if (frameCount%250==0){
    var door = createSprite(Math.round(random(100,500)),0);
    door.addImage("door",doorImg);
    door.velocityY = 1
    var climber = createSprite(door.x,door.y+50);
    climber.addImage("climber",climberImg);
    climber.velocityY = door.velocityY;
    var invisibleBlock = createSprite(climber.x,climber.y+5,climber.width,2)
    invisibleBlock.shapeColor = "green";
    invisibleBlock.velocityY = door.velocityY
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    ghost.lifetime = 600;
    door.lifetime = 600;
    climber.lifetime = 600;
    climberGroup.add(climber);
    doorGroup.add(door);
    invisibleGroup.add(invisibleBlock);
  }

}
