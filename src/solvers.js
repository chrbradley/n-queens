/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  
  // Set board
  var board = new Board({'n': n});
  // Get Rows
  var rows = board.rows();
  // for every row
  for(var i = 0; i < rows.length; i++){
  // for every square
    for(var j = 0; j < rows[i].length; j++){
      // place a piece
      board.togglePiece(i, j);
      // check for conflictss
      if( board.hasAnyRooksConflicts() ) {
        // if conflict, remove piece
        board.togglePiece(i, j);
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(rows));
  // return board
  return rows;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme

  var theMatrix = function (rounds, array) {
    var outcomes = [];
    //create an array of possible solutions
    var plays = array || [ 0, 1];
    //create a subroutine that accepts the number of rounds that have not yet been played
    //and the running list of combos that have been played so far
    var combos = function(roundsToGo, playedSoFar) {
      //base case
      if( roundsToGo === 0 ){
        outcomes.push( playedSoFar );
        return;
      }
      //for each solution in plays, create a new playedSoFar array and find all solutions
      //that come from that branch
      for( var i = 0; i < plays.length; i++ ){
        var currentPlay = plays[i];
        combos( roundsToGo-1, playedSoFar.concat(currentPlay) );
      }
    };
    combos( rounds, [] );
    return outcomes;
  };
  
  // var rows = recursive call on 0,1
  var rows = theMatrix(n);
  // var uglyBoards = recursuve call on rows
  var uglyBoards = theMatrix(n, rows);
  var master = [];
  // for every uglyBoard
    // create empty cleanBoard array in master
  for (var i = 0; i < uglyBoards.length; i++ ) {
    var bucket = [];
    //********while loop might work for this*******
    var row1 = uglyBoards[i];
    var row2 = row1.splice(2,2); //have to change the splice to take in n
    bucket.push(row1, row2);

    //check to make sure only one rook per row
    var good = true;
    // for each board 
    for ( var j = 0; j < bucket.length; j++ ){
      var count1 = 0;
      var row = bucket[j];
      // check each row
      for (k = 0; k < row.length; k++ ){
        // for the number of pieces
        if( row[k] === 1 ) {
          count1++;
        }
      }
      // if there's just one piece
      if( count1 !== 1){
        good = false;
      }
    }
    // add bucket to master
    if(good){
      master.push(bucket);
    }
      // if none increment counter
  }
    // push slices (rows) of uglyBoards index into cleanBoard  
  console.log(master);
  for(var l = 0; l < master.length; l++){
    var board = new Board(master[l]);
    if( board.hasAnyRooksConflicts() === false ){
      solutionCount++;
    }
  }


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
