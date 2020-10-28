var trex, trex_running, invisibleGround, cloudsGroup, cloudImage, gameOver, restart, restartImg;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, PLAY, END, gameState;
var gameOverImg, score, bg;

function preload() {
  trex_running = loadImage("../trex.png");
  cloudImage = loadImage("../cloud.png");
  obstacle1 = loadImage("../obstacle1.png");
  obstacle2 = loadImage("../obstacle2.png");
  obstacle3 = loadImage("../obstacle3.png");
  obstacle4 = loadImage("../obstacle4.png");
  obstacle5 = loadImage("../obstacle5.png");
  obstacle6 = loadImage("../obstacle6.png");
  gameOverImg = loadImage("../gameOver.png");
  restartImg = loadImage("../restart.png");
  bg = loadImage("../bg.png");
}

function setup() {
  var canvas = createCanvas(600, 200);

  camera.position.x = 50;

  trex = createSprite(50, 180, 20, 50);
  trex.addImage(trex_running);
  trex.scale = 0.5;
  trex.velocityX = 5;

  invisibleGround = createSprite(200, 195, 20, 10);
  invisibleGround.visible = false;

  gameOver = createSprite(300, 100, 400, 10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(300, 125, 400, 10);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
  PLAY = 1;
  END = 0;
  gameState = PLAY;
}

function draw() {
  background(bg);

  camera.position.x = trex.x;
  camera.position.y = height / 2;

  gameOver.position.x = trex.x + 50;
  gameOver.position.y = trex.y - 80;

  restart.position.x = trex.x + 10;
  restart.position.y = trex.y - 50;


  invisibleGround.x = camera.position.x;

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);

    if (keyDown("space") && trex.y > 152.5) {
      trex.velocityY = -15;
    }

    trex.velocityY = trex.velocityY + 0.9

    spawnClouds();
    spawnObstacles();

    if (trex.isTouching(obstaclesGroup)) {
      gameState = END;
    }
  }
  else if (gameState === END) {

    trex.velocityX = 0;
    trex.velocityY = 0;


    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);

    trex.addImage(trex_running);

    gameOver.visible = true;
  }

  trex.collide(invisibleGround);

  drawSprites();

  fill("white");

  text("Score: " + score, camera.position.x, camera.position.y - 50);
}

function spawnClouds() {
  if (frameCount % 50 === 0) {
    var cloud = createSprite(camera.position.x + 500, 0, 40, 10);
    cloud.y = Math.round(random(15, 85));
    cloud.addImage(cloudImage);
    cloud.scale = 0.08;
    cloud.lifetime = 200;

    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    cloudsGroup.add(cloud);
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(camera.position.x + 500, 175, 10, 40);

    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1); break;
      case 2: obstacle.addImage(obstacle2); break;
      case 3: obstacle.addImage(obstacle3); break;
      case 4: obstacle.addImage(obstacle4); break;
      case 5: obstacle.addImage(obstacle5); break;
      case 6: obstacle.addImage(obstacle6); break;
      default: break;
    }

    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}