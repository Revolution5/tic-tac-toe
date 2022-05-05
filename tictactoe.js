const gameBoard = (function() {
    let gameBoardArray = ["","","","","","","","",""];
    let totalTurns = 0;
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    let squares = Array.from(document.querySelectorAll(".game-container > div"));

    const container = document.querySelector(".content");
    const winnerText = document.createElement("h1");
    const resetButton = document.createElement("button");
    resetButton.classList.add("reset-button");
    resetButton.textContent = "New Round";
    let winner = false;

    function resetBoard() {
        for(let i = 0; i < gameBoardArray.length; i++) {
            gameBoardArray[i] = "";
        }
        totalTurns = 0;
        winnerText.textContent = ""
        winner = false;
        container.removeChild(resetButton);
    }

    function activateBoard() {
        squares.forEach(square => {
            square.addEventListener("click", clickHandler);
        })
    }
    
    function checkForWin() {
        for(let i = 0; i < winConditions.length; i++){
            //if the squares in the current row/column are "X"
            if (gameBoardArray[winConditions[i][0]] == playerOne.mark && 
                gameBoardArray[winConditions[i][1]] == playerOne.mark && 
                gameBoardArray[winConditions[i][2]] == playerOne.mark) {
                    winner = true;
                    winnerText.textContent = playerOne.name + " wins!";
                    container.prepend(winnerText);
                    squares.forEach(square => {
                        square.removeEventListener("click", clickHandler);
                    })
                    container.appendChild(resetButton);
            }
            //if the squares in the current row/column are "O"
            else if(gameBoardArray[winConditions[i][0]] == playerTwo.mark && 
                    gameBoardArray[winConditions[i][1]] == playerTwo.mark && 
                    gameBoardArray[winConditions[i][2]] == playerTwo.mark) {
                        winner = true;
                        winnerText.textContent = playerTwo.name + " wins!";
                        container.prepend(winnerText);
                        squares.forEach(square => {
                            square.removeEventListener("click", clickHandler);
                        })
                        container.appendChild(resetButton);
            }
            //if every square is full but no rows match
            else if(gameBoardArray.every((element) => element.length > 0) && winner == false) {
                winnerText.textContent = "It's a tie!";
                container.prepend(winnerText);
                squares.forEach(square => {
                    square.removeEventListener("click", clickHandler);
                })
                container.appendChild(resetButton); 
            }
        }
    }

    function clickHandler(e) {
        let clicked = e.target.id; //id == square0, square1, etc
        let number = clicked[6];
        //uses the number in the id as the array index
        if(gameBoardArray[number] == "") {
            if(totalTurns % 2 == 0){
                gameBoardArray[number] = playerOne.mark;
                totalTurns++; 
                checkForWin();
            }
            else if(totalTurns % 2 == 1){
                gameBoardArray[number] = playerTwo.mark;
                totalTurns++; 
                checkForWin();
            }
            displayController.displayBoard();   
        }
    }

    return {gameBoardArray, activateBoard, resetButton, resetBoard};
})();

const displayController = (function() {
    function displayBoard() {
        let gameContainer = document.querySelector(".game-container");
        gameContainer.style.display = "grid";
        for(let i = 0; i < gameBoard.gameBoardArray.length; i++) {
            //converts the iterator to a string for the square selector
            //ex: i = 0 will select square0
            document.querySelector("#square" + i.toString()).textContent = gameBoard.gameBoardArray[i];
        }
    }

    gameBoard.resetButton.addEventListener("click", function(e) {
        gameBoard.resetBoard();
        displayBoard();
        gameBoard.activateBoard();
    })

    return {displayBoard}
})();

const Player = (name, mark) => {
    return {name, mark};
}


// let playerOneName = prompt("Enter name for Player One (X)");
// let playerTwoName = prompt("Enter name for Player Two (O)");
const playerOne = Player("A", "X");
const playerTwo = Player("B", "O");

displayController.displayBoard();
gameBoard.activateBoard();