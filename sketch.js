var tower, towerImg, player,platform,princess;
var gamestate=0, play,e, flag=0;
var restart;

function preload(){

  towerImg = loadImage("images/tower.jpg");
  princess = loadAnimation("download1.jpg","download.png")
}

function setup() {
  createCanvas(500,500);
  tower = createSprite(250,250,50,50);
  tower.visible=false;
  player = createSprite(50,50,50,50);
  player.addAnimation('p',princess);
  player.visible=false;
  e = createEdgeSprites();
  slab = new Group();
  player.shapeColor="white";
  tower.addImage(towerImg);
  tower.y = tower.height/2;
  tower.velocityY = -3;
  tower.scale=5.5;
  platform = createSprite(50,70,70,10);
  platform.shapeColor = "green";
  platform.visible=false;
  play=createButton("Start");
  play.size(200,30);
  play.position(150,250);
  restart=createButton("Restart");
  restart.size(200,30);
  restart.position(150,250);
  
}

function draw() {
  background(0);
  if (gamestate===0){
      background("grey");
      play.show();
      textSize(50);
      fill(0);
      text("Tower Escape",100,100);
      restart.hide();
      play.mousePressed(()=>{
        gamestate=1;
      })
    }
  if(gamestate===1){
    tower.visible=true;
    player.visible=true;
    platform.visible=true;

      play.hide();
      if (keyDown("space")){
      player.velocityY=-7
    }
    if(keyDown("left")){
      player.x=player.x-5;
    }
    if(keyDown("right")){
      player.x=player.x+5;
    }

    player.velocityY = player.velocityY+0.8;
    player.collide(slab);
    player.collide(platform);
    if(tower.y<0){
      tower.y=tower.height/2
    }
  hurdles();
    if(player.isTouching(e)){
      gamestate=2;
      flag=1;
    }
}
  if(gamestate===2){
    if(flag===1){
      textSize(30);
  text("You Lost!!!",150,200);
  platform.visible=false;
  restart.show();
  player.visible=false;
 restart.mousePressed(()=>{
   gamestate=0;
 })
  }
}


  drawSprites();
}

function hurdles(){
   if(frameCount%40===0){
  var r = Math.round(random(50,450));
  fill("white");
var block = createSprite(r,505,100,10);
block.velocityY = -3;
block.shapeColor="white";
slab.add(block);
   }
}