var cols, rows;
var mazeDimension = 25;
var grid;
var stack;
var state;
var pathFinder ;
var allNodePath;
var current;
var startNode;
var endNode;
var command = new command;


function setup() {
  createCanvas(400, 400);
  cols = floor(width/mazeDimension);
  rows = floor(height/mazeDimension);
  frameRate(100);
  grid = [];
  stack = [];
  pathFinder = [];
  allNodePath = [];
  for (var   j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  startNode=grid[0];
  endNode = grid[grid.length-1];
  
  current = grid[0];

}

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    stack.push(current);

    removeWalls(current, next);

    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
      if(stack.length == 0){
       startNode.highlightStartEnd();
       endNode.highlightStartEnd();
       pathFinder = aStar.pathfinding(grid, cols, rows, endNode, startNode);
       startNode.highlightAstar();
       if(state == stateAstar)
       state.action();
     }
     verifKeyCode(key);
}

function verifKeyCode(val) {
    if(val == "1"){
      command.switchState('astar');
    }
    else if (val == "2"){
      command.switchState('astarComplete');
    }
    else if(val == "r"){
      command.switchState('reset');
    }
    else if(val == " ")
      command.switchState('default');
    
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}


function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}