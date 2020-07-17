let img
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(10)
  img = loadImage('https://tinyurl.com/y7994l59')
}

window.addEventListener("resize", setup);

function getPosition(initialPosition, initialVelocity, acceleration, timeElapsed) {
  var circleX = initialPosition["x"] + initialVelocity["vx"] * timeElapsed + 1/2 * acceleration["ax"] * timeElapsed ** 2
  var circleY = initialPosition["y"] + initialVelocity["vy"] * timeElapsed + 1/2 * acceleration["ay"] *  timeElapsed ** 2
  // circle(initialPosition["x"] + initialVelocity["vx"] * timeElapsed + 1/2 * acceleration["ax"] * timeElapsed ** 2, initialPosition["y"] + initialVelocity["vy"] * timeElapsed + 1/2 * acceleration["ay"] *  timeElapsed ** 2, 50)
  return [circleX, circleY]
  }
    
  

let circleX = 0
let circleY = 0
let trejectory = [[]]
let startVelX = 50
let startVelY = -50
let accelerations = [{ax: 0, ay: 9.8}]
let velocities = [{vx: startVelX, vy: startVelY}]
let notYet = true
let startX = 0
let startY = 600
let circleDiameters = [50]
let circleMass = [(circleDiameters[0]/2)**2 * 3.14]
let maxBalls = 20

function timeFunction(){
  timeElasped += 0.1
  let totalX = 0
  let totalY = 0
  for (let i = 0; i < velocities.length; i++){
    circlePos = getPosition({x: startX, y: startY}, {vx: velocities[i].vx, vy: velocities[i].vy}, {ax:accelerations[0].ax, ay: accelerations[0].ay}, timeElasped)
    circleX = circlePos[0]
    circleY = circlePos[1]
    trejectory[i].push({x: circleX, y: circleY})
    drawTrejectory(trejectory[i])
    circle(circleX, circleY, circleDiameters[i])
    totalX += circleMass[i] * velocities[i].vx
    totalY += circleMass[i] * velocities[i].vy
  
  
  }
  // print("X Total " + totalX)
  // print("Y Total " + totalY)
  if (Math.floor(timeElasped*10)/10 === 5 && notYet){
   let curMass = circleMass[0]
   circleDiameters.shift()
   let energyY = velocities[0].vy * circleMass[0]
   let energyX = velocities[0].vx * circleMass[0]
   circleMass.shift()
   velocities.shift()
   accelerations.shift()
    
   let numberOfShells = Math.floor(Math.random() * maxBalls) + 1
   let currentMassOfShells = 0
   let currentXVel = 0
   let currentYVel = 0
   let currentEnergyY = 0
   let currentEnergyX = 0
   for (let i = 0; i < numberOfShells - 1; i++){
    accelerations.push({ax: 0, ay: 9.8})
    trejectory.push([{x: circleX, y: circleY}])
    
    let currentCircleMass = Math.floor(Math.random() * (curMass - currentMassOfShells - numberOfShells + i)) + 1  
    circleMass.push(currentCircleMass)
    currentMassOfShells += currentCircleMass
     
    circleDiameters.push(Math.sqrt(currentCircleMass/3.14)*2)
    
    let Xmultiplier = 20
    let Ymultiplier = 20 
    if (Math.random() > 0.5){
      Xmultiplier = -20
    }
    if (Math.random() > 0.5){
      Ymultiplier = -20
    }
    let xVel = startVelX + Math.floor(Math.random() * Xmultiplier) + 1
    let yVel = startVelY + Math.floor(Math.random() * Ymultiplier) + 1
    currentXVel += xVel
    currentYVel += yVel
    velocities.push({vx: xVel, vy: yVel}) 
    
    currentEnergyY += yVel * currentCircleMass
    currentEnergyX += xVel * currentCircleMass
    
   }
   currentCircleMass = curMass - currentMassOfShells
   circleMass.push(currentCircleMass)
   
   circleDiameters.push(Math.sqrt(currentCircleMass/3.14)*2)
   
   let xVel = 0
   let yvel = 0
   trejectory.push([{x: circleX, y: circleY}])
   
   accelerations.push({ax: 0, ay: 9.8})
   velocities.push({vx: (energyX - currentEnergyX)/currentCircleMass, vy: (energyY - currentEnergyY)/currentCircleMass})
    
    
    
   
     
   // velocities.push({vx: startVelX + 20, vy: startVelY + 20}) 
   // velocities.push({vx: startVelX + 20, vy: startVelY - 20}) 
   // velocities.push({vx: startVelX - 20, vy: startVelY - 20}) 
   // velocities.push({vx: startVelX - 20, vy: startVelY + 20})

   timeElasped = 0
   
   notYet = false
   startX = circleX
   startY = circleY
   // circleDiameter = 25
   
  }
  

  
  



}

// function sleep(milliseconds) {
//   var start = new Date().getTime();
//   for (var i = 0; i < 1e7; i++) {
//     if ((new Date().getTime() - start) > milliseconds){
//       break;
//     }
//   }
// }

function drawTrejectory(lst){
  for (var i = 0; i < lst.length - 1; i++) {
    // for (var j = 0; j < lst[i].length - 1; j++){
    stroke(255, 0, 0);
    line(lst[i].x, lst[i].y, lst[i + 1].x, lst[i + 1].y)
    // }
}
}

var timeElasped = 0
function draw() {
  fill("red")
  background("white");
  timeFunction() 
}