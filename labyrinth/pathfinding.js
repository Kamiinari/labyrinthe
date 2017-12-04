var aStar = {

  init : function (grid,cols,rows,endNode){
    
    for(var   x=0; x < cols; x++) {
        for(var  y=0; y < rows; y++) {
          grid[index(x,y)].f = 0;
          grid[index(x,y)].g = 0;
          grid[index(x,y)].h = 0;
          grid[index(x,y)].debug = "";
          grid[index(x,y)].parent = null;
        } 
      }
  },

  pathfinding : function(grid, cols, rows, endNode, startNode){
    aStar.init(grid, cols, rows, endNode);
    var openList   = [];
    var closedList = [];
    openList.push(startNode);
 
    while(openList.length > 0 ) {
      var lowInd = 0;
      for(var i=0; i<openList.length; i++) {
        if(openList[i].f < openList[lowInd].f) { lowInd = i; }
      }
      var currentNode = openList[lowInd];
 
      if((currentNode.i == endNode.i)&&(currentNode.j == endNode.j)) {
        var curr = currentNode;
        var ret = [];
        while(curr.parent) {
          ret.push(curr);
          curr = curr.parent;
        }
        return ret.reverse();
      }
 
      openList = aStar.removeElement(openList, currentNode);
      closedList.push(currentNode);
      var neighbors = aStar.neighbors(grid, currentNode);
 
      for(var i=0; i<neighbors.length;i++) {
        var neighbor = neighbors[i];
        if(aStar.containsObject(closedList, neighbor)){
          continue;
        }
        var gScore = currentNode.g + 10; // 1 is the distance from a node to it's neighbor
        var gScoreIsBest = false;
 
 
        if(!aStar.containsObject(openList,neighbor)) {
          gScoreIsBest = true;
          neighbor.h = aStar.heuristic(neighbor, endNode);
          openList.push(neighbor);
        }
        else if(gScore < neighbor.g) {
          gScoreIsBest = true;
        }
 
        if(gScoreIsBest) {
          neighbor.parent = currentNode;
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.debug = "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
          if(state == stateCompleteAStar){
              state.action(neighbor);
          }
        }
      }
    }
     return [];
  },
   heuristic: function(pos0, pos1) {
    var d1 = Math.abs (pos1.i - pos0.i);
    var d2 = Math.abs (pos1.j - pos0.j);
    return (d1 + d2)*10;
  },
  
  neighbors: function(grid, node) {
    var pathPos = [];
    var x = node.i;
    var y = node.j;
    if(node.walls[3]==false) {
      pathPos.push(grid[index(x-1,y)]);
    }
    if(node.walls[1]==false ) {
      pathPos.push(grid[index(x+1,y)]);
    }
    if(node.walls[0]==false) {
      pathPos.push(grid[index(x,y-1)]);
    }
    if(node.walls[2]==false) {
      pathPos.push(grid[index(x,y+1)]);
    }
    return pathPos;
  },
  
   containsObject : function(list, obj) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
  },
  
  removeElement : function(array, element) {
    var i = array.indexOf(element);
    if (i >= 0) array.splice(i, 1);
    return array;
}
}