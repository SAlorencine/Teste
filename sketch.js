var girl, obstacle1, obstacle2, obstacle3, Background;
var gameMode = 0;
var girlImg, obstacle1Img, obstacle2Img, obstacle3Img, backgroundImg, gameOverImg, resetButtonImg, reset;
var obstacleGroup, GameOver;
var ground;
var points = 0;

function preload(){

    girlImg = loadImage("Images/girl.png");
    obstacle1Img = loadImage("Images/bush.png");
    obstacle2Img = loadImage("Images/Rock.png");
    obstacle3Img = loadImage("Images/wood.png");
    backgroundImg = loadImage("Images/background.jpg");
    gameOverImg = loadImage("Images/GameOver.jpg");
    resetButtonImg = loadImage("Images/resetButton.png");
}
function setup(){
    createCanvas(windowWidth, windowHeight);
    Background = createSprite(width/2-200,height/2,1000, windowHeight);
    Background.addImage(backgroundImg);
    Background.scale = 2.8

    girl = createSprite(200, 460, 50, 50);
    girl.addImage(girlImg);
    girl.scale = 0.4;

    ground = createSprite(width/2, 600, width, 5);
    ground.visible = false;

    obstacleGroup = new Group();

    
    GameOver = createSprite(width/2, height/2, 100, 100);
    GameOver.addImage(gameOverImg);
    GameOver.scale = 2.3;

    reset = createSprite(105, 40, 50, 50);
    reset.addImage(resetButtonImg);
    reset.scale = 0.3
}
function draw(){
    background("green");
    spawnObstacle();
    

    if(gameMode === 0){
            Background.velocityX = -6;
            points = points + Math.round(getFrameRate()/60);

        if(keyDown("space") && girl.y >= 460 ){
            girl.velocityY = -12
        }
        girl.velocityY = girl.velocityY + 0.8;
        girl.collide(ground);

        if(girl.isTouching(obstacleGroup)){
            gameMode =1;
        }

        GameOver.visible = false;
        reset.visible = false;
    } else if (gameMode ===1 ){
        GameOver.visible = true;
        reset.visible = true;
        obstacleGroup.destroyEach();

        if(mousePressedOver(reset)){
            restart();
            girl.velocityY = 0;
        }

        Background.velocityX = 0;
    }

    if(Background.x <20){
        Background.x = Background.width/2;
    }



    drawSprites();
    fill("white");
    textSize(30);
    text("Pontos:"+points , 600, 40);
}

function spawnObstacle(){
    if(frameCount % 100 === 0){
        var obstacle = createSprite(width, 560, 50,50);
        obstacle.velocityX = -6;
        
        var rand = Math.round(random(1,3));
        switch(rand){
            case 1: obstacle.addImage(obstacle1Img);
            obstacle.scale = 0.1;
                break;
            case 2: obstacle.addImage(obstacle2Img);
            obstacle.scale = 0.06;
                break;
            case 3: obstacle.addImage(obstacle3Img);
            obstacle.scale = 0.02;
                break;
        }

        obstacle.lifetime = 300;
        obstacleGroup.add(obstacle);
    }
}

function restart(){
    gameMode = 0;
    obstacleGroup.destroyEach();
    points = 0;
    gameOver.visible = false;
    reset.visible = false;
}

