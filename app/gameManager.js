var connect = require("./serverComunication");


class PlayersInGame {

    constructor(id1, id2, boards) {
        this.player1 = id1;
        this.player2 = id2;
        this.currentTurnId = id1;
        this.OpponnentTurnId = id2;
        this.boards = boards;
        this.gameInit();
    }


    gameInit() {

        this.objOfPlayers = [{
            id: this.player1,
            board: this.boards["firstPlayerBord"],
            life: 3
        }, {
            id: this.player2,
            board: this.boards["secondPlayerBord"],
            life: 3
        }];

    }
    getplayers() {
        return this.objOfPlayers;
    }

    checkIfWin(id) {

        for (var i in this.objOfPlayers) {

            if (this.objOfPlayers[i].id == id) {
                if (this.objOfPlayers[i].life === 0)
                    return true;
                else return false;
            }
        }

    }

    checkIfHit(cordinateToHit, YourId) {

        var x = cordinateToHit[1];
        var y = cordinateToHit[0];

        for (var i in this.objOfPlayers) {

            if (this.objOfPlayers[i].id != YourId) {
                //  this.setOpennentTurn(this.objOfPlayers[i].id);

                var targetBoard = this.objOfPlayers[i].board;

                if (targetBoard[x][y] === 1) {
                    return true;
                } else {
                    return false;
                }

            }
        }

    }

    incriseScore(id) {
        for (var i in this.objOfPlayers) {

            if (this.objOfPlayers[i].id == id) {
                this.objOfPlayers[i].life--;
            }

        }
    }
    checkIfIsYourTurn(id) {
        if (this.getcurrentTurnId() === id) {
            console.log(true);
            return true
        } else {
            console.log(false);
            return false
        }
    }

    setOpennentTurn(id) {
        this.OpponnentTurnId = id;
    }
    getOpennentTurnId() {
        return this.OpponnentTurnId;

    }

    getcurrentTurnId() {
        return this.currentTurnId;
    }

    setcurrentTurn(id) {
        this.currentTurnId = id;
    }

}


var firstPlayerBord;
var secondPlayerBord;
var newboard;


function getBoards() {

    firstPlayerBord = [ ///board from the server
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    secondPlayerBord = [ ///board from the server
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

    board1 = CreateRandomBoard(ships, firstPlayerBord);
    board2 = CreateRandomBoard(ships, secondPlayerBord);

    function CreateRandomBoard(ships, board) {


        for (var i = 0; i < ships.length; i++) {

            var rowlim = collim = 9;
            var v = rand(0, 2)
            if (v) rowlim = (10 - ships[i])
            else collim = (10 - ships[i])

            var rowlim = rand(0, rowlim + 1)
            var collim = rand(0, collim + 1)


            if (scan(rowlim, collim, v, ships[i], board)) {
                draw(rowlim, collim, v, ships[i], board);
            } else {
                i--; //dont continue to the next ship;
            }

        }

        function scan(r, c, v, len, board) {
            if (v) { // colm draw
                r--
                for (var i = 0; i <= len + 1; i++) {
                    if (r + i < 0) { // Array range check
                        continue;
                    }
                    if (r + i > 9) {
                        break;
                    }
                    if (board[r + i][c] == 1) { //next cell
                        return false;
                    }
                    if ((c - 1 >= 0) && (board[r + i][c - 1] == 1)) {
                        return false;
                    }
                    if ((c + 1 < 10) && (board[r + i][c + 1] == 1)) {
                        return false;
                    }
                }
            } else { //row draw
                c--
                for (var i = 0; i <= len + 1; i++) {
                    if (c + i < 0) {
                        continue;
                    }
                    if (c + i > 9) {
                        break;
                    }
                    if (board[r][c + i] == 1) {
                        return false;
                    }
                    if ((r - 1 >= 0) && (board[r - 1][c + i] == 1)) {
                        return false;
                    }
                    if ((r + 1 < 10) && (board[r + 1][c + i] == 1)) {
                        return false;
                    }
                }
            }
            return true
        }

        function draw(r, c, v, len, board) {
            for (var i = 0; i < len; i++) {

                if (v) board[r + i][c] = 1
                else board[r][c + i] = 1
            }

        }

        function rand(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        return board;

    }


    return {
        firstPlayerBord: board1,
        secondPlayerBord: board2
    }
}


module.exports = {
    getBoards: getBoards,
    PlayersInGame: PlayersInGame
};