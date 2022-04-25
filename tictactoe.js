const gameBoard = (function() {
    let gameBoardArray = ["","X","","X","O","X","","X",""];
    return {gameBoardArray};
})();

const displayController = (function() {
    function displayBoard() {
        for(let i = 0; i < gameBoard.gameBoardArray.length; i++) {
            //converts the iterator to a string for the square selector
            //ex: i = 0 will select square0
            document.querySelector(".square" + i.toString()).textContent = gameBoard.gameBoardArray[i];
        }
    }
    return {displayBoard}
})();

const Player = (name, mark) => {
    return {name, mark};
}

const playerOne = Player("Damon", "X");
const playerTwo = Player("Sara", "O");

displayController.displayBoard();

//loop thru square divs 
//if the clicked square's text content is empty
//add click event that updates the position in the array corresponding
//with the clicked square with the current players player.mark
//redisplay the board