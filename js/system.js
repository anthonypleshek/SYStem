var system = null;
var creatureLocs = [];
var creatureNumber = 5;
var creatureColor = [0,255,255];
var plantColor = [0,120,0];

function initialize() {
  system = new terra.Terrarium(40, 40, {
    cellSize: 10,
    id: "system",
    trails: 0.2,
    periodic: false,
    background: [22, 22, 22],
    insertAfter: document.getElementById('grid')
  });

  terra.registerCreature({
    type: 'plant',
    color: plantColor,
    size: 10,
    initialEnergy: 5,
    maxEnergy: 20,
    wait: function() {
      // photosynthesis :)
      this.energy += 1;
    },
    move: false,
    reproduceLv: 0.65
  });

  terra.registerCreature({
    type: 'creature',
    color: creatureColor,
    maxEnergy: 50,
    initialEnergy: 10,
    size: 20
  });

  terra.registerCreature({
    type: 'creature1',
    color: creatureColor,
    maxEnergy: 70,
    initialEnergy: 20,
    size: 12
  });

  terra.registerCreature({
    type: 'creature2',
    color: creatureColor,
    maxEnergy: 20,
    initialEnergy: 7,
    size: 25
  });

  terra.registerCreature({
    type: 'creature3',
    color: creatureColor,
    maxEnergy: 50,
    initialEnergy: 8,
    size: 25
  });

  terra.registerCreature({
    type: 'creature4',
    color: creatureColor,
    maxEnergy: 100,
    initialEnergy: 20,
    size: 20
  });

  system.grid = system.makeGridWithDistribution([['plant', 50]]);
  updateCreatureCounter();

  system.draw();

  system.canvas.addEventListener('click', selectCreatureLocations);
}

function updateCreatureCounter(){
  document.getElementById('creatureCounter').innerHTML = getRemainingCreatures();
}

function getRemainingCreatures(){
  return creatureNumber - creatureLocs.length;
}

function updatePrompt(message){
  document.getElementById('prompter').innerHTML = message;
}

function hideStartButton(){
  document.getElementById('startbtn').style.visibility = "hidden";
}

function displayStartButton(){
  document.getElementById('startbtn').style.visibility = "visible";
}


function selectCreatureLocations(event) {
  if(getRemainingCreatures() > 0){
    var coords = relativeCoords(system.canvas, event);
    var creatureLoc = {};
    creatureLoc.x = Math.floor(coords.x/system.cellSize);
    creatureLoc.y = Math.floor(coords.y/system.cellSize);

    creatureLocs.push(creatureLoc);
    updateCreatureCounter();

    drawUserOptions();
  }
  else{
    updatePrompt("Start the game already!")
    displayStartButton();
  }
}

function drawUserOptions() {

  var ctx = system.canvas.getContext("2d");

  for(idx in creatureLocs) {
    var loc = creatureLocs[idx];
    ctx.rect(system.cellSize*loc.x,system.cellSize*loc.y,system.cellSize,system.cellSize);
    ctx.fillStyle="rgb("+creatureColor[0]+","+creatureColor[1]+","+creatureColor[2]+")";
    ctx.fill();
  }
}

function reset() {
  location.reload();
  }

function start() {
  system.canvas.removeEventListener('click', selectCreatureLocations);

  var grid = system.grid;
  for(row in system.grid) {
    for(col in system.grid[row]) {
      var val = system.grid[row][col];
      if(val != false) {
        val = 'plant';
      }
      grid[row][col] = val;
    }
  }

  for(idx in creatureLocs) {
    var loc = creatureLocs[idx];
    grid[loc.y][loc.x] = 'creature1';
  }

  //Clear creatureLocs
  creatureLocs = [];

  system.grid = system.makeGrid(grid);

  system.animate(300);
}
