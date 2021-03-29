const gameBoard = (function(){
    `use strict`;

    let gameBoardArray = [
                            ``, ``, ``,
                            ``, ``, ``,
                            ``, ``, ``
                        ];

    function gameStart(){
        let divs = document.querySelectorAll(`.gridItem`);
        divs.forEach(div => div.addEventListener(`click`, fillGrid));
    }

    function addMark(mark, position){
        if(!isCellFilled(position)){
            gameBoardArray[position] = `${mark}`;
            return true;
        }else{
            return false;
        }
    }

    function isCellFilled(position){
        if(gameBoardArray[position] !== ``) return true;
        return false;
    }

    function fillGrid(){
        let that = this;
        gameFlow.playerClick(that.id, that);
    }

    function horizontalWin(mark){
        if(gameBoardArray.slice(0, 3).every(isEqual.bind(mark, mark))) return true;
        if(gameBoardArray.slice(3, 6).every(isEqual.bind(mark, mark))) return true;
        if(gameBoardArray.slice(6, 9).every(isEqual.bind(mark, mark))) return true;
        return false;
    }

    function verticalWin(mark){
        let firstVertical = [gameBoardArray[0], gameBoardArray[3], gameBoardArray[6]];
        let secondVertical = [gameBoardArray[1], gameBoardArray[4], gameBoardArray[7]];
        let thirdVertical = [gameBoardArray[2], gameBoardArray[5], gameBoardArray[8]];
        if(firstVertical.every(isEqual.bind(mark, mark))) return true;
        if(secondVertical.every(isEqual.bind(mark, mark))) return true;
        if(thirdVertical.every(isEqual.bind(mark, mark))) return true;
        return false;
    }

    function diagonalWin(mark){
        let leftDiagonal = [gameBoardArray[0], gameBoardArray[4], gameBoardArray[8]];
        let rightDiagonal = [gameBoardArray[2], gameBoardArray[4], gameBoardArray[6]];
        if(leftDiagonal.every(isEqual.bind(mark, mark))) return true;
        if(rightDiagonal.every(isEqual.bind(mark, mark))) return true;
        return false;
    }

    function isEqual(value, mark){
        return value === mark;
    }

    function checkWin(mark){
        if(horizontalWin(mark) || verticalWin(mark) || diagonalWin(mark)){
            return true;
        }
        return false;
    }

    function cleanArray(){
        gameBoardArray.fill(``);
    }

    return {addMark, fillGrid, gameStart, checkWin, cleanArray, gameBoardArray};
    
})();

const playerFactory = (mark) => {
    let turn = false;

    const addMark = (position) => {
        return gameBoard.addMark(mark, position);
    };

    const setTurn = (turnState) => {turn = turnState;}

    const getMark = () => {return mark;}

    return {addMark, setTurn, getMark};
}

const playerX = playerFactory(`X`);
const playerO = playerFactory(`O`);

const gameFlow = (function(){
    const playerArray = [playerX, playerO];
    let currentPlayer = 0;

    const startBtn = document.getElementById(`startGame`);
    startBtn.addEventListener(`click`, gameStart);

    function playerClick(position, div){
        if(playerArray[currentPlayer].addMark(position)) {
            div.textContent = playerArray[currentPlayer].getMark();
            checkWinner();
        }
    }

    function checkWinner(){
        if(gameBoard.checkWin(playerArray[currentPlayer].getMark())){
            alert(`${playerArray[currentPlayer].getMark()}'s player won!`);
        }else{
            currentPlayer = changeTurn();
        }
    }

    function changeTurn(){
        if(currentPlayer === 0) return 1;
        return 0;
    }

    function gameStart(){
        currentPlayer = 0;
        if(startBtn.textContent === `Restart`){
            let divs = document.querySelectorAll(`.gridItem`);
            divs.forEach(div => div.textContent = ``);
            gameBoard.cleanArray();
        }else{
            startBtn.textContent = `Restart`;
            gameBoard.gameStart();
        }
    }

    function activePlayer(){
        return playerArray[currentPlayer];
    }

    return {gameStart, playerClick, activePlayer};
})();