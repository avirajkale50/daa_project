export default function solvePuzzle(board) {
  const N = board.length;
  const results = [];
  const animations = [];
  let isAnimationNeeded = true;
  let exploredPath = [];

  function saveAnimation(row, col, isPlacing = false, isSolution = false) {
    const temp = JSON.parse(JSON.stringify(board));
    temp[row][col].isActive = true;
    
    // Add position to explored path
    if (!exploredPath.some(pos => pos.row === row && pos.col === col)) {
      exploredPath.push({
        row,
        col,
        isSolution
      });
    }

    animations.push({
      board: temp,
      state: {
        row: row,
        col: col,
        action: isPlacing ? 'place' : 'check'
      },
      exploredPath: [...exploredPath]
    });
  }

  function isSafe(row, col) {
    let i, j;

    for (i = 0; i < col; i++) 
      if (board[row][i].hasQueen) return false;

    for (i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
      if (board[i][j].hasQueen) return false;

    for (i = row + 1, j = col - 1; j >= 0 && i < N; i++, j--)
      if (board[i][j].hasQueen) return false;

    return true;
  }

  function placeQueen(col) {
    if (col >= N) {
      const solutionBoard = JSON.parse(JSON.stringify(board));
      results.push(solutionBoard);
      if (isAnimationNeeded) {
        // Mark the current path as solution path
        exploredPath = exploredPath.map(pos => ({...pos, isSolution: true}));
        animations.push({
          board: JSON.parse(JSON.stringify(board)),
          state: { row: N - 1, col: N - 1, action: 'solution' },
          exploredPath: [...exploredPath]
        });
        isAnimationNeeded = false;
      }
      return true;
    }

    let res = false;
    for (let i = 0; i < N; i++) {
      if (isAnimationNeeded) {
        saveAnimation(i, col, false);
      }

      if (isSafe(i, col)) {
        board[i][col].hasQueen = true;
        
        if (isAnimationNeeded) {
          saveAnimation(i, col, true);
        }

        res = placeQueen(col + 1);

        board[i][col].hasQueen = false;
        
        if (isAnimationNeeded && !res) {
          // Remove this position from explored path when backtracking
          exploredPath = exploredPath.filter(
            pos => !(pos.row === i && pos.col === col)
          );
          saveAnimation(i, col, false);
        }
      }
    }

    return res;
  }

  placeQueen(0);
  return { results, animations };
}