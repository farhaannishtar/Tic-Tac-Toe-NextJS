export default function determineWinner(boardValues) {
  
  console.log('I\'m going to be fine');

  // Horizontal
  if (boardValues[0] === boardValues[1] && boardValues[0] === boardValues[2]) {
    if (boardValues[0] !== '-') {
      return boardValues[0];
    }
  } 
  if (boardValues[3] === boardValues[4] && boardValues[3] === boardValues[5]) {
    if (boardValues[3] !== '-') {
      return boardValues[3];
    }
  }
  if (boardValues[6] === boardValues[7] && boardValues[6] === boardValues[8]) {
    if (boardValues[6] !== '-') {
      return boardValues[6];
    }
  }
  // Vertical
  if (boardValues[0] === boardValues[3] && boardValues[0] === boardValues[6]) {
    if (boardValues[0] !== '-') {
      return boardValues[0];
    }
  }
  if (boardValues[1] === boardValues[4] && boardValues[1] === boardValues[7]) {
    if (boardValues[1] !== '-') {
      return boardValues[1];
    }
  }
  if (boardValues[2] === boardValues[5] && boardValues[2] === boardValues[8]) {
    if (boardValues[2] !== '-') {
      return boardValues[2];
    }
  }
  // Diagnol
  if (boardValues[0] === boardValues[4] && boardValues[0] === boardValues[8]) {
    if (boardValues[0] !== '-') {
      return boardValues[0];
    }
  }
  if (boardValues[2] === boardValues[4] && boardValues[2] === boardValues[6]) {
    if (boardValues[2] !== '-') {
      return boardValues[2];
    }
  }
  if (boardValues.every((element) => element !== '-')) {
    return 'Tie';
  }
  return '';
}