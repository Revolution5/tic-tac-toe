const gameBoard = (function() {
    const gameBoardArray = ["","","","","","","","",""];
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
    
    function resetBoard() {
        gameBoardArray = ["","","","","","","","",""];
    }

    function activateBoard() {
        squares.forEach(square => {
            square.addEventListener("click", clickHandler);
        })
    }
    
    const container = document.querySelector(".global-container");
    const winnerText = document.createElement("h1");
    let winner = false;

    function checkForWin() {
        for(let i = 0; i < winConditions.length; i++){
            if (gameBoardArray[winConditions[i][0]] == "X" && 
                gameBoardArray[winConditions[i][1]] == "X" && 
                gameBoardArray[winConditions[i][2]] == "X") {
                    winner = true;
                    winnerText.textContent = "X wins!";
                    container.prepend(winnerText);
                    squares.forEach(square => {
                        square.removeEventListener("click", clickHandler);
                    })
            }
            else if(gameBoardArray[winConditions[i][0]] == "O" && 
                    gameBoardArray[winConditions[i][1]] == "O" && 
                    gameBoardArray[winConditions[i][2]] == "O") {
                        winner = true;
                        winnerText.textContent = "O wins!";
                        container.prepend(winnerText);
                        squares.forEach(square => {
                            square.removeEventListener("click", clickHandler);
                        })
            }
            else if(gameBoardArray.every((element) => element.length > 0) && winner == false) {
                winnerText.textContent = "Its a tie!";
                container.prepend(winnerText);
                squares.forEach(square => {
                    square.removeEventListener("click", clickHandler);
                }) 
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

    return {gameBoardArray, activateBoard, resetBoard};
})();

const displayController = (function() {
    function displayBoard() {
        for(let i = 0; i < gameBoard.gameBoardArray.length; i++) {
            //converts the iterator to a string for the square selector
            //ex: i = 0 will select square0
            document.querySelector("#square" + i.toString()).textContent = gameBoard.gameBoardArray[i];
        }
    }
    return {displayBoard}
})();

const Player = (name, mark) => {
    return {name, mark};
}

const playerOne = Player("Damon", "X");
const playerTwo = Player("Sara", "O");

gameBoard.activateBoard();