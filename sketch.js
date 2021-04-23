 
// to create variables..
     var BGround, BGroundIMG; 
     var monkey ,  ground, monkey_running;
     var banana ,bananaImage, obstacle, obstacleImage;
     var FoodGroup, obstacleGroup;
     var score,ground;
     var gameState,time;
     var PLAY=1;
     var END=0;

// to load images and animation...
 function preload(){
      BGroundIMG=loadImage("forest.png");
      monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
      bananaImage = loadImage("banana.png"); 
      obstacleImage = loadImage("obstacle.png");
    
 }

// starting of function setup...
 function setup() { 
 
     createCanvas(500,500);
  
// to create background..
     BGround=createSprite(250,200,600,500);
     BGround.addImage("BG", BGroundIMG);
     BGround.scale=1.5;
   
//to create the monkey(player).. 
     monkey=createSprite(150,300,20,20);
     monkey.addAnimation("running",monkey_running);
     monkey.scale=0.15;
   
// to create the invisible ground on which the monkey will      be be running.
     ground=createSprite(250,470,900,10);
     ground.visible=false;

// to declare food and obstacle group..
     FoodGroup=new Group();
     obstacleGroup=new Group();
   
// to create boundary or skin for the monkey.. 
//to set outer boundary of monkey..
     monkey.setCollider("circle",0,0,300);
   
// for displaying score.
     score=0;
   
// to set gamestates.
     gameState=PLAY;
    
// SURVIVAL TIME.
     time=0;  
 
   }
// end of function setup..

// start of function draw...
 function draw() { 

   
// to make moving ground...
      if(gameState===PLAY){ 
         ground.velocityX=-4;
         BGround.velocityX=-4;
       }
    
// to make infinite ground with background...  
      if(ground.x===50){
         ground.x=250;
       } 

      if(BGround.x===50) {
         BGround.x=250;
       }
    
// to create gravity..
      monkey.velocityY=monkey.velocityY+0.8;

// to make monkey move on invisible ground.
      monkey.collide(ground);
   
// to help monkey jump using space bar.. 
      if(keyDown("space")&&monkey.y>=400){
         monkey.velocityY=-14;
       }
 
// to call function bananas and obstacles..
      bananas();
      obstacles();

// to get time..
      time=time+Math.round(getFrameRate()/60);
   
// AI of the game..
      if(monkey.isTouching(obstacleGroup)){
         gameState=END; 
       }
 
// AI of getting score on touching bananas.   
      if(monkey.isTouching(FoodGroup)){
         score=score+1; 
         FoodGroup.destroyEach();
       }
   
    
// to write AI to restart the game..
      if(gameState===END && keyDown("r")){
        gameState=PLAY; 
        obstacleGroup.destroyEach();
        FoodGroup.destroyEach();
        monkey.visible=true; 
        score=0;
        time=0;
       }
   
  
   
// to call all the sprites made..
      drawSprites();
  
// to display score on screen so that the player can          read it. 

      textSize(23);
      fill("white")
      text("Bananas: "+score,250,70);

   
// to write end function of the game..
       if(gameState===END){
     
// to help the user to restart the game with the help of      "r" button.

         textSize(20);
         fill("white");

//so that the player gets instruction to press r              button to restart.
         text("Press R to restart",180,200);

// to stop monkey from moving..
         monkey.velocityY=0;

         monkey.visible=false;
     
// to stop the ground and the background.
         ground.velocityX=0;
         BGround.velocityX=0;
         obstacleGroup.setVelocityXEach(0);
         
// to vanish them
         obstacleGroup.destroyEach();
     
         FoodGroup.setVelocityXEach(0);
         FoodGroup.destroyEach();
     
//  to give them lifetime..
         obstacleGroup.setLifetimeEach(-1); 
         FoodGroup.setLifetimeEach(-1);
       }
   
 }

// start of function bananas..
 function bananas() {
// to randomly spawn obstacle,set their velocity and set their lifetime...
      if(frameCount%80===0){
        banana=createSprite(600,300,20,20); 
        banana.addImage(bananaImage);
        banana.scale=0.1;
    
//to increase the velocity of monkey with increase in time.
        banana.velocityX=-5-time/80;
        banana.x=600;
        
//to spawn bananas randomly ..
        banana.y=Math.round(random(250,300));
        banana.lifetime=140;
        FoodGroup.add(banana);

  }
   
// end of function bananas..
   
}

// start of function obstacles..
  function obstacles(){ 
    
//  to randomly spawn food,set their velocity and set their     lifetime...
      if(frameCount%150===0){
          obstacle=createSprite(600,450,20,20); 
          obstacle.addImage(obstacleImage); 
          obstacle.scale=0.15;
    //to increase the velocity of monkey with increase in time.
          obstacle.velocityX=-5-time/80; 
          obstacle.lifetime=140;
          obstacleGroup.add(obstacle); 
       }
    
  }
  
  
  






