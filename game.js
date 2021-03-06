var origBoard;
var player1;
var player2;
var play;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	$.get('/getSessionData', function(results) {
		player1 = results.player1;
		player2 = results.player2;
	});
	play = 1;
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('touchend', turnClick, false);
	}
}

function turnClick(square) {
	if (player2 == "computer"){ // one player mode
		if (typeof origBoard[square.target.id] == 'number') {
			turn(square.target.id, huPlayer);
			if (!checkWin(origBoard, huPlayer) && !checkTie()) {
				turn(bestSpot(), aiPlayer);
			}	
		}
	} 
	if (player2 != "computer") { // two player mode
		if (typeof origBoard[square.target.id] == 'number' && play == 1 ) {
			if (!checkWin(origBoard, huPlayer) && !checkTie() ) {
				turn(square.target.id, huPlayer);
				play++;
			}	
		}
		if (typeof origBoard[square.target.id] == 'number' && play == 2 ) {
			if (!checkWin(origBoard, aiPlayer) && !checkTie()) {
				turn(square.target.id, aiPlayer);
				play--;
			}
		}
	}
}

function turn(squareId, player) {
	checkTie();
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		} else if (emptySquares().length == 0) {
			declareWinner("Tie Game!");
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('touchend', turnClick, false);
	}
	if (player2 == "computer") {
		if (gameWon.player == aiPlayer) {
			$.post("/aiWin");
			$.post("/p1Lose");
		} 
		if (gameWon.player == huPlayer) {
			$.post("/p1win");
			$.post("/aiLose");
		}
	} else {
		//aiPlayer is player 2
		if (gameWon.player == huPlayer) {
			$.post("/p1Win");
			$.post("/p2Lose");
		} 
		if (gameWon.player == aiPlayer) {
			$.post("/p2win");
			$.post("/p1Lose");
		}
	}
	declareWinner(gameWon.player == huPlayer ? "Player One Wins!" : "Player Two Wins!");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('touchend', turnClick, false);
		}
		//$.post("/updateDraw", function(result){
			declareWinner("Tie Game!");
		//});
		return true;
	}
	return false;
}