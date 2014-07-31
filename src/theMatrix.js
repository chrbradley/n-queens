var theMatrix = function (rounds, array) {
  var outcomes = [];
  //create an array of possible solutions
  var plays = array || [ 0, 1];
  //create a subroutine that accepts the number of rounds that have not yet been played
  //and the running list of combos that have been played so far
  var combos = function(roundsToGo, playedSoFar) {
    //base case
    if( roundsToGo === 0 ){
      console.log("ln 10: roundsToGo is 0!");
      console.log("ln 11: This is what will be pushed to outcomes: " + playedSoFar);
      outcomes.push( playedSoFar );
      playedSoFar = [];
      console.log("ln 14: playedSoFar is: "+playedSoFar)
      return;
    }
    //for each solution in plays, create a new playedSoFar array and find all solutions
    //that come from that branch
    for( var i = 0; i < plays.length; i++ ){
      var currentPlay = plays[i];
      console.log("ln 19: Rounds to go: "+roundsToGo);
      console.log("ln 20: The currentPlay is: "+currentPlay);
      console.log("Is currentPlay an array? "+ Array.isArray(currentPlay));
      console.log("Is playedSoFar an array? "+ Array.isArray(playedSoFar));
      if ( Array.isArray(currentPlay) ){
        playedSoFar.push(currentPlay);
        var temp = playedSoFar;
        console.log("ln 27:" +playedSoFar);
        var rtg = roundsToGo-1;
        if ( roundsToGo === 0) {
          playedSoFar = [];
        }
        combos( rtg, temp );
      } else {

        combos( roundsToGo-1, playedSoFar.concat(currentPlay) );
      }
    }
  };
  combos( rounds, [] );
  return outcomes;
};

var rows = theMatrix(2);
var board = theMatrix(2, rows);

//rows ===> [ [0,0], [0,1], [1,0], [1,1] ]
//plays == rows
//line 17
//for thru plays
//plays[i] = [0, 0]

// right now we get [0, 0, 0, 0]
// we want [ [0,0], [0,0] ]

//var a = [0, 0];
//a.push([0,0])