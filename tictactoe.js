const gameBoard = (function() {
    const gameBoardArray = ["","","","","","","","",""];

    let squares = Array.from(document.querySelectorAll(".game-container > div"));
    squares.forEach(square => {
        square.addEventListener("click", function(e) {
            let clicked = e.target.id; //id == square0, square1, etc
            let number = Number(clicked.charAt(clicked.length - 1));
            //uses the number in the id as the array index
            if(gameBoardArray[number] == "") {
                gameBoardArray[number] = "X"; //should be current players player.mark
                displayController.displayBoard();   
            } 
        })
    })
    return {gameBoardArray};
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