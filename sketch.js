var spaceJet, planets, fuelCan
var asteroidsGroup, meteroidsGroup
var planet1,planet2,planet3,planet4,planet5,planet6
var score = 0
var gameState = "play"
var distance = 0
var bullet

function preload (){
  spaceJet_img = loadImage("images/space jet.png")
  ufo_img = loadImage("images/ufo.png")
  asteroids_img = loadImage("images/asteroid.png")
  meteroids_img = loadImage("images/meteroid.png")
  fuel_can_img = loadImage("images/fuel can.png") 
  planet1_img = loadImage("images/planet 1.png")
  planet2_img = loadImage("images/planet 2.png")
  planet3_img = loadImage("images/planet 3.png")
  planet4_img = loadImage("images/planet 4.png")
  planet5_img = loadImage("images/planet 5.png")
  planet6_img = loadImage("images/planet 6.png")
  explosion_img = loadImage("images/explosion.png")
  gameOver_img = loadImage("images/gameover.jpg")
  restart_img = loadImage("images/restart.jpg")
  bullet_img = loadImage("images/bullet.png")

sound1 = loadSound("sounds/explosion1.mp3")
sound2 = loadSound("sounds/pick.mp3")
sound3 = loadSound("sounds/blast.mp3")
}

function setup() {
  createCanvas(1270,600);

gameOver = createSprite(600,150)
gameOver.addImage("gameover",gameOver_img)
restart = createSprite(600,500)
restart.scale = 0.5
restart.addImage("restart",restart_img)

spaceJet = createSprite(685, 550, 200, 200);
  spaceJet.addImage("space",spaceJet_img)
  spaceJet.addImage("explore",explosion_img)
  spaceJet.scale = 0.6
  spaceJet.debug = false
  spaceJet.setCollider("rectangle",0,0,400,200)


asteroidsGroup = new Group()
meteroidsGroup = new Group()
fuelsGroup = new Group()
ufoGroup = new Group()
}

function draw() {
  background(rgb(18,1,26));  
  if(gameState==="play"){

   // spaceJet.x = bullet.x
   // spaceJet.y = bullet.y   

    gameOver.visible = false
    restart.visible = false 

  if(keyDown("space")){  
    spawnBullet()  
    }

  if(keyDown("left_arrow")){
    spaceJet.x = spaceJet.x-20
   // bullet.x = bullet.x-20
  }

  if(keyDown("right_arrow")){
    spaceJet.x = spaceJet.x+20
   // bullet.x = bullet.x+20
  }

  if(keyDown("up_arrow")){
    spaceJet.y = spaceJet.y-20
    //bullet.y = bullet.y-20
  }

  if(keyDown("down_arrow")){
    spaceJet.y = spaceJet.y+20
   // bullet.y = bullet.y+20
  }
   
distance = distance+Math.round(getFrameRate()/50)
  

if(fuelsGroup.isTouching(spaceJet)){
  score = score+5
  fuelsGroup.destroyEach() 
  sound2.play()
  // spaceJet.destroy()
}
if(asteroidsGroup.isTouching(spaceJet)){
  sound1.play()
  spaceJet.changeImage("explore",explosion_img)
  asteroidsGroup.destroyEach()
  gameState = "end"
  // spaceJet.destroy()
}

if(meteroidsGroup.isTouching(spaceJet)){
  sound3.play()
  spaceJet.changeImage("explore",explosion_img)
  meteroidsGroup.destroyEach()
  gameState = "end"
// spaceJet.destroy()
}

if(ufoGroup.isTouching(spaceJet || bullet)){
  sound3.play()
  spaceJet.changeImage("explore",explosion_img)
  ufoGroup.destroyEach()
}
  
  drawSprites();
  fill("lightgreen")
textSize(25)
text("SCORE:- "+score,displayWidth/2+440,displayHeight-700)
  fill("lightblue")
textSize(25)
text("DISTANCE:-"+distance,displayWidth/2+420,displayHeight-675)
  spawnAsteroids()
  spawnUfo()
  spawnMeteroids()
  spawnFuel()
  spawnPlanets()
}
drawSprites()
if(gameState === "end"){
  gameOver.visible = true
  restart.visible = true
  asteroidsGroup.destroyEach()
  meteroidsGroup.destroyEach()
  fuelsGroup.destroyEach()
  spaceJet.velocityY = 0
  spaceJet.velocityX = 0
  spaceJet.visible = false
  restart.visible = true
  gameOver.visible = true
  if(mousePressedOver(restart)){
    reset()
  }



  fill("lightblue")
  textSize(35)
  text("CLICK ON RESET ICON TO RESET THE GAME",displayWidth-1050 ,displayHeight-300)
}
 }
function reset(){
  gameState = "play"
  gameOver.visible = false
  restart.visible = false
  spaceJet.visible = true
  spaceJet.x = 685
  spaceJet.y = 550
  score = 0
  distance = 0

  spaceJet.changeImage("space",spaceJet_img)

  asteroidsGroup.destroyEach()
  meteroidsGroup.destroyEach()
  fuelsGroup.destroyEach()
}

function spawnBullet(){
  bullet = createSprite(695, 450, 10, 10);
bullet.addImage(bullet_img)
bullet.scale = 0.3
bullet.velocityY = -11
bullet.x = spaceJet.x
bullet.y = spaceJet.y
//bullet.depth = spaceJet.depth
//spaceJet.depth+=1
return bullet
}

function spawnAsteroids(){
  if(frameCount%250===0){
var asteroids = createSprite(Math.round(random(20,1300),50,50))
asteroids.addImage(asteroids_img)
asteroids.velocityY = 15
asteroids.scale = 0.3
asteroidsGroup.add(asteroids)
}
 }
function spawnMeteroids(){
  if(frameCount%330===0){
    var meteroids = createSprite(Math.round(random(20,1300),20,20))
    meteroids.addImage(meteroids_img)
    meteroids.velocityY = 10
    meteroids.scale = 0.3
    meteroidsGroup.add(meteroids)
}
  }

  function spawnFuel(){
    if(frameCount%200===0){
      fuelCan = createSprite(Math.round(random(25,1200),40,40));
        fuelCan.addImage(fuel_can_img)
        fuelCan.scale = 0.5
        fuelCan.velocityY = 10
      fuelsGroup.add(fuelCan)
      fuelCan.debug = false
      fuelCan.setCollider("rectangle",0,0,200,200)
  }
    }

    function spawnUfo(){
      if(frameCount%200===0){
        ufo = createSprite(Math.round(random(25,1200),40,40));
        ufo.addImage(ufo_img)
        ufo.scale = 0.3
          ufo.velocityY = 10
        ufoGroup.add(ufo)
        ufo.debug = true
        ufo.setCollider("rectangle",0,0,200,200)
    }
  
      }

    function spawnPlanets(){
      if(frameCount%80===0){
        planets = createSprite(Math.round(random(25,1200),40,40));
        var rand = Math.round(random(1,6))
        switch(rand){
          case 1: planets.addImage(planet1_img)
          break

          case 2: planets.addImage(planet2_img)
          break

          case 3: planets.addImage(planet3_img)
          break

          case 4: planets.addImage(planet4_img)
          break

          case 5: planets.addImage(planet5_img)
          break

          case 6: planets.addImage(planet6_img)
          break

         // case 7: planets.addImage(ufo_img)
        //  break

          default: break
        }
          planets.scale = 0.8
          planets.velocityY = 2

          spaceJet.depth = planets.depth
          spaceJet.depth+=1

          gameOver.depth = planets.depth
          gameOver.depth+=1

          restart.depth = planets.depth
          restart.depth+=1
    }
      }
    

  
