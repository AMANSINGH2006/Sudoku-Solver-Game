var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}

var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

function SudokuSolver(board, i, j, n) {
    // Base Case: If we have reached the end of the board, the puzzle is solved
    if (i === n) {
        FillBoard(board); // Update the board visually
        return true;
    }

    // Move to the next row if we are at the end of a column
    if (j === n) {
        return SudokuSolver(board, i + 1, 0, n);
    }

    // Skip cells that are already filled
    if (board[i][j] !== 0) {
        return SudokuSolver(board, i, j + 1, n);
    }

    // Try placing numbers 1 to 9 in the current cell
    for (let num = 1; num <= 9; num++) {
        if (isValid(board, i, j, num, n)) {
            board[i][j] = num; // Place the number

            // Recur for the next cell
            if (SudokuSolver(board, i, j + 1, n)) {
                return true;
            }

            // Backtrack: Undo the move
            board[i][j] = 0;
        }
    }

    // If no number can be placed, return false
    return false;
}

// Helper function to check if placing a number is valid
function isValid(board, row, col, num, n) {
    // Check the row and column
    for (let x = 0; x < n; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }

    // Check the 3x3 subgrid
    let subgridRowStart = Math.floor(row / 3) * 3;
    let subgridColStart = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[subgridRowStart + r][subgridColStart + c] === num) {
                return false;
            }
        }
    }
    return true; // Placement is valid
}
