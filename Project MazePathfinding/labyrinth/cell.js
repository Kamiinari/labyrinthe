function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkNeighbors = function() {
    var neighbors = [];

    var top    = grid[index(i, j -1)];
    var right  = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left   = grid[index(i-1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }


  }
  this.highlight = function() {
    var x = this.i*mazeDimension;
    var y = this.j*mazeDimension;
    noStroke();
    fill(0, 0, 150, 100);
    rect(x, y, mazeDimension, mazeDimension);

  }
  
    this.highlightAstar = function() {
    var x = this.i*mazeDimension;
    var y = this.j*mazeDimension;
        stroke(255);
    if (this.walls[0]) {
      line(x , y    , x + mazeDimension, y);
    }
    if (this.walls[1]) {
      line(x + mazeDimension, y, x + mazeDimension, y + mazeDimension);
    }
    if (this.walls[2]) {
      line(x + mazeDimension, y + mazeDimension, x, y + mazeDimension);
    }
    if (this.walls[3]) {
      line(x, y + mazeDimension, x, y);
    }
    noStroke();
    fill(0, 0, 200, 100);
    rect(x, y, mazeDimension, mazeDimension);

  }
  
    this.highlightStartEnd = function() {
    var x = this.i*mazeDimension;
    var y = this.j*mazeDimension;
    noStroke();
    fill(0, 255, 0, 255);
    rect(x, y, mazeDimension, mazeDimension);

  }


  this.show = function() {
    var x = this.i*mazeDimension;
    var y = this.j*mazeDimension;
    stroke(255);
    if (this.walls[0]) {
      line(x , y    , x + mazeDimension, y);
    }
    if (this.walls[1]) {
      line(x + mazeDimension, y, x + mazeDimension, y + mazeDimension);
    }
    if (this.walls[2]) {
      line(x + mazeDimension, y + mazeDimension, x, y + mazeDimension);
    }
    if (this.walls[3]) {
      line(x, y + mazeDimension, x, y);
    }

    if (this.visited) {
      noStroke();
      fill(250, 0, 0, 100);
      rect(x, y, mazeDimension, mazeDimension);
    }
  }
}