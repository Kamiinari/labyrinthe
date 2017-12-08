function command() {
  state = stateDefault;
}

command.prototype = {
    switchState: function(name){
      var Fname = '_' + name;
      if(this[Fname])
        this[Fname]();
    },
    _astar : function(){
      state = stateAstar;       
    },
    _reset : function(){
      state = stateDefault;
      setup();
    },
    _astarComplete : function(){
      state = stateCompleteAStar;
    },
    _default : function(){
      state = stateDefault; 
     }
  }