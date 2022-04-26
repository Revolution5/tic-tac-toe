const gameBoard = (function() {
    const gameBoardArray = ["","","","","","","","",""];
    let totalTurns = 0;
    return {gameBoardArray, totalTurns};
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


function handler(e) {
    let clicked = e.target.id; //id == square0, square1, etc
    let number = clicked[6];
    //uses the number in the id as the array index
    if(gameBoard.gameBoardArray[number] == "") {
        if(gameBoard.totalTurns % 2 == 0){
           gameBoard.gameBoardArray[number] = playerOne.mark;
           gameBoard.totalTurns++; 
        }
        else if(gameBoard.totalTurns %2 == 1){
            gameBoard.gameBoardArray[number] = playerTwo.mark; 
            gameBoard.totalTurns++; 
        }
        displayController.displayBoard();   
     }
}

let squares = Array.from(document.querySelectorAll(".game-container > div"));
squares.forEach(square => {
    square.removeEventListener("click", handler);
    square.addEventListener("click", handler), {once:true};
})