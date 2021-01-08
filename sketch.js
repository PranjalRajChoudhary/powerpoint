var fruit,sword;
var fruit1,fruit2,fruit3,fruit4;
var swordImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monster,monsterImg1,monsterImg2;
var fruitsGroup,enemyGroup;
var score = 0;
var gameOverImg,gameOver;
var chopSound,gameOverSound;

function preload(){
  swordImg = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImg1 = loadAnimation("alien1.png");
  gameOverImg = loadImage("gameover.png");
  chopSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  
  sword = createSprite(windowWidth/2,windowHeight/2,20,20);
  sword.addImage("sword",swordImg);
  sword.scale = 0.8;
  
  fruitsGroup = new Group();
  enemyGroup = new Group();
  
  gameOver = createSprite(width/2,height/2,20,20);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.visible = false;
  
  sword.debug = false;
  sword.setCollider("circle",0,0,70);
}
function draw(){
  background("pink");
  
  var edges = createEdgeSprites();
  sword.collide(edges);
  
  if(gameState === PLAY){
    fruits();
    
    monsters();
    
    sword.x = mouseX;
    sword.y = mouseY;
    
    if(fruitsGroup.isTouching(sword)){
    fruitsGroup.destroyEach();
      score = score + 2;
      chopSound.play();
  }
    if(enemyGroup.isTouching(sword)){
      enemyGroup.destroyEach();
      fruitsGroup.destroyEach();
      gameState = END;
      gameOverSound.play();
    }
  }
  if(gameState === END){
    sword.destroy();
    
    gameOver.visible = true;
    
    fruitsGroup.setVelocityX = 0;
    enemyGroup.setVelocityX = 0;
    
  }
 drawSprites();
  
  fill("yellow");
   text("score : " + score,500,10);
  
}
function fruits(){
  if(frameCount % 100 === 0){
  fruit = createSprite(0,100,20,20);
    
    fruit.scale = 0.2;
    
    fruit.velocityX = 3;
    
    var rando = Math.round(random(100,300));
    
    fruit.y = rando;
    
    var randy = Math.round(random(1,2));
    switch(randy){
      case 1 : fruit.x = 0;
        fruit.velocityX = 2+(Math.round(score / 4));
        break;
        case 2 : fruit.x = windowWidth;
        fruit.velocityX = -(2+(Math.round(score / 4)));
        break;
        default : break;
    }
    
     fruitsGroup.add(fruit);
    
  var rand = Math.round(random(1,4));
    
    fruit.lifetime = Math.round(600 / fruit.velocityX);
    
  switch(rand){
    case 1 : fruit.addImage("fruit1",fruit1);
      break;
      case 2 : fruit.addImage("fruit2",fruit2);
      break;
      case 3 : fruit.addImage("fruit3",fruit3);
      break;
      case 4 : fruit.addImage("fruit4",fruit4);
      break;
      default : break;
  }
}
 
}
function monsters(){
  if(frameCount % 400 === 0){
   monster = createSprite(0,100,20,20)
  
    monster.lifetime = Math.round(600 / monster.velocityX);
    
    monster.addAnimation("monster1",monsterImg1);
    
    var rand = Math.round(random(100,300));
    
    monster.y = rand;
    
    
    var rany = Math.round(random(1,2));
    switch(rany){
      case 1 : monster.x = windowWidth;
        monster.velocityX = -(2 + (Math.round(score /10)));
        break;
        case 2 : monster.x = 0;
        monster.velocityX = 2 + (Math.round(score / 10));
        break;
        default : break;
    }
    
    enemyGroup.add(monster);
  }
}