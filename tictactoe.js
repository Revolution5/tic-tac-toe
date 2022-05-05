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
    let winner = false;

    function resetBoard() {
        for(let i = 0; i < gameBoardArray.length; i++) {
            gameBoardArray[i] = "";
        }
        totalTurns = 0;
        displayController.displayText.textContent = ""
        winner = false;
        displayController.container.removeChild(displayController.newRoundButton);
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
                    displayController.displayText.textContent = playerOne.name + " wins!";
                    squares.forEach(square => {
                        square.removeEventListener("click", clickHandler);
                    })
                    displayController.container.appendChild(displayController.newRoundButton);
            }
            //if the squares in the current row/column are "O"
            else if(gameBoardArray[winConditions[i][0]] == playerTwo.mark && 
                    gameBoardArray[winConditions[i][1]] == playerTwo.mark && 
                    gameBoardArray[winConditions[i][2]] == playerTwo.mark) {
                        winner = true;
                        displayController.displayText.textContent = playerTwo.name + " wins!";
                        squares.forEach(square => {
                            square.removeEventListener("click", clickHandler);
                        })
                        displayController.container.appendChild(displayController.newRoundButton);
            }
            //if every square is full but no rows match
            else if(gameBoardArray.every((element) => element.length > 0) && winner == false) {
                displayController.displayText.textContent = "It's a tie!";
                displayController.container.prepend(displayText);
                squares.forEach(square => {
                    square.removeEventListener("click", clickHandler);
                })
                container.appendChild(displayController.newRoundButton); 
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
                displayController.displayText.textContent = playerTwo.name + "'s turn!";
                checkForWin();
            }
            else if(totalTurns % 2 == 1){
                gameBoardArray[number] = playerTwo.mark;
                totalTurns++; 
                displayController.displayText.textContent = playerOne.name + "'s turn!";
                checkForWin();
            }
            displayController.displayBoard();   
        }
    }

    return {gameBoardArray, activateBoard, resetBoard};
})();

const displayController = (function() {
    const container = document.querySelector(".content");
    const displayText = document.createElement("h1");
    const newRoundButton = document.createElement("button");
    newRoundButton.classList.add("new-round");
    newRoundButton.textContent = "New Round";

    function displayBoard() {
        container.prepend(displayText);
        let gameContainer = document.querySelector(".game-container");
        gameContainer.style.display = "grid";
        for(let i = 0; i < gameBoard.gameBoardArray.length; i++) {
            //converts the iterator to a string for the square selector
            //ex: i = 0 will select square0
            document.querySelector("#square" + i.toString()).textContent = gameBoard.gameBoardArray[i];
        }
    }

    newRoundButton.addEventListener("click", function(e) {
        gameBoard.resetBoard();
        displayBoard();
        gameBoard.activateBoard();
    })

    return {displayBoard, container, displayText, newRoundButton}
})();

class Player {
    constructor(name, mark) {
        this.name = name;
        this.mark = mark;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get mark() {
        return this._mark;
    }

    set mark(mark) {
        this._mark = mark;
    }
}


let playerOneName = prompt("Enter name for Player One (X)");
let playerTwoName = prompt("Enter name for Player Two (O)");
let playerOne = new Player(playerOneName, "X");
let playerTwo = new Player(playerTwoName, "O");

displayController.displayBoard();
gameBoard.activateBoard();