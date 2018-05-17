class Game {

    constructor(canvasID, size = 10, board, imgSea, imgShip, imgBomb, imgBombyour, imgEnemy) {
        this.size = size;
        this.board = board
        this.yourShips = [];
        this.enemyShips = [];

        this.stateOfship = {
            "alive": " ",
            "hitedEmpty": "0",
            "hitedDestroy": "x"
        }

        this.canvas = document.getElementById(canvasID);
        if (!this.canvas.getContext) {
            throw Error('no canvas');
        }
        this.ctx = this.canvas.getContext('2d');

        this.screenWidth = this.canvas.width = window.innerWidth;
        this.screenHeight = this.canvas.height = window.innerHeight;

        this.HitClick();

        this.rectWidth = 50;
        this.rectHight = 50;
        this.imgSea = imgSea;
        this.imgShip = imgShip;
        this.imgbomb = imgBomb
        this.imgBombyour = imgBombyour;
        this.imgEnemy = imgEnemy;
    }

    onDraw(x, y, DrowSomting) {

        var tileX = 0;
        var tileY = 0;
        var xCoordinate = x;
        var yCoordinate = y

        while (tileY < this.board.length) {
            // Begin drawing a new column
            tileX = 0;
            xCoordinate = x;
            while (tileX < this.board[tileY].length) {

                if (xCoordinate + this.rectWidth >= 0 && yCoordinate + this.rectHight >= 0) {

                    if (this.board[tileY][tileX] == 1 && DrowSomting) {
                        this.ctx.drawImage(this.imgShip, xCoordinate, yCoordinate, this.rectWidth, this.rectHight);
                    }

                    if (this.board[tileY][tileX] == 0 || !DrowSomting) {
                        this.ctx.drawImage(this.imgSea, xCoordinate, yCoordinate, this.rectWidth, this.rectHight);
                    }

                    let newCell = new Ship(xCoordinate, yCoordinate, this.rectWidth, this.rectHight, [tileX, tileY]);

                    if (DrowSomting)
                        this.yourShips.push(newCell);
                    else
                        this.enemyShips.push(newCell);

                }

                // Move to the next tile on the X axis
                tileX++;
                xCoordinate += this.rectWidth;
            }
            // Move to the next tile on the Y axis
            tileY++;
            yCoordinate += this.rectHight;
        }
    }
    cleardialog() {

        var dialog = document.getElementById('load_dialog');
        dialog.style.display = 'none';

    }


    HitClick() {

        var self = this;
        this.canvas.addEventListener('click', function (e) {
            self.onClick(e);
        }, false);

    }


    onClick(e) {

        for (var i = 0; i < this.enemyShips.length; i++) {
            if (this.enemyShips[i].isInCell(e.offsetX, e.offsetY)) {
                var state = this.enemyShips[i].getState();
                var cordinateToHit = this.enemyShips[i].getCordinate();
                SendCordinate(cordinateToHit);
                break;

            }
        }



    }
    isHit(hit, cord) {

        for (var i = 0; i < this.enemyShips.length; i++) {

            var cordx = this.enemyShips[i].getCordinate()
            var that = this.enemyShips[i];
            if (cord[0] == cordx[0] && cord[1] == cordx[1]) {

                var ctx = this.ctx;
                if (hit) {
                    ctx.drawImage(this.imgbomb, this.enemyShips[i].xLocation, this.enemyShips[i].yLocation, 50, 50);
                } else {
                    this.enemyShips[i].drawX(this.ctx);
                }
            }
        }
    }


    hitYourbord(cord) {

        for (var i = 0; i < this.yourShips.length; i++) {

            var cordx = this.yourShips[i].getCordinate();

            if (cord[0] == cordx[0] && cord[1] == cordx[1]) {
                this.ctx.drawImage(this.imgBombyour, this.yourShips[i].xLocation, this.yourShips[i].yLocation, 50, 50);
            }

        }

    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    }
    hitCurrent(cord) {

        for (var i = 0; i < this.yourShips.length; i++) {

            var cordx = this.yourShips[i].getCordinate();

            if (cord[0] == cordx[0] && cord[1] == cordx[1]) {
                this.yourShips[i].drawX(this.ctx);
            }

        }
    }

    drawPlayerNickTurn(turn) {
        this.ctx.clearRect(this.screenWidth / 2 - 100, this.screenHeight / 2 - 300, 200, 300);
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(turn, this.screenWidth / 2, this.screenHeight / 2 - 200);

    }

}



class Ship {
    constructor(x, y, w, h, cord) {
        this.xLocation = x;
        this.yLocation = y;
        this.widthCell = w;
        this.heightCell = h;
        this.cordinate = cord;
    }



    isInCell(x, y) {

        if (x > this.xLocation && x < (this.xLocation + this.widthCell) && y > this.yLocation && y < (this.yLocation + this.heightCell)) {
            return true;
        } else {
            return false;
        }

    } // returns true/false (does nothing)
    getCordinate() {
        return this.cordinate;
    }
    setState(state) {
        this.state = state;

    } // can be ' ', 'x', 'o'

    getState() {
        return this.state;
    }
    getPosition() {
        return this.position;
    }
    drawX(ctx) {

        var offset = this.widthCell / 5;
        ctx.beginPath();
        ctx.moveTo(this.xLocation + offset, (this.yLocation) + offset);
        ctx.lineTo(this.xLocation + this.widthCell - offset, (this.yLocation) + this.widthCell - offset);
        ctx.moveTo(this.xLocation + offset, (this.yLocation) + this.widthCell - offset);
        ctx.lineTo(this.xLocation + this.widthCell - offset, (this.yLocation) + offset);
        ctx.stroke();
    }

}