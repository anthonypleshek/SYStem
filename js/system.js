var system = null;
var userCreatureLocs = [];
var creatureNumber = 5;

function initialize() {
  system = new terra.Terrarium(50, 50, {
    id: "system",
    trails: 0.9,
    periodic: true,
    background: [22, 22, 22]
  });

  terra.registerCreature({
    type: 'plant',
    color: [0, 120, 0],
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
    color: [0, 255, 255],
    maxEnergy: 50,
    initialEnergy: 10,
    size: 20
  });

  system.grid = system.makeGridWithDistribution([['plant', 50]]);
  system.animate(1);
  system.canvas.addEventListener('mousemove', function(event) {
    var coords = relativeCoords(system.canvas, event);

    //Highlight cell hovered over in grid
    var ctx = system.canvas.getContext("2d");
    ctx.rect(system.cellSize*Math.round(coords.x/system.cellSize),system.cellSize*Math.round(coords.y/system.cellSize),system.cellSize,system.cellSize);
    ctx.fillStyle="red";
    ctx.fill();
  });

  system.canvas.addEventListener('click', function(event) {
    var coords = relativeCoords(system.canvas, event);
    var creatureLoc = {};
    creatureLoc.x = Math.round(coords.x/system.cellSize);
    creatureLoc.y = Math.round(coords.y/system.cellSize);

    userCreatureLocs.push(creatureLoc);
  });
}

function drawUserOptions() {
  //Clear canvas
  system.canvas.getContext("2d").clearRect(0, 0, system.canvas.width, system.canvas.height);

  for(loc in creatureLocs) {
    
  }
}

function start() {
  system.grid = system.makeGridWithDistribution([['plant', 50], ['brute', 5], ['bully', 5]]);
  system.animate();
}
