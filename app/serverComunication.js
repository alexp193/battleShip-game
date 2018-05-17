var game = require("./gameManager");

var Games = [];
var clients = [];

var connection = function (io) {
    var NewGame;

    io.on('connection', function (socket) {

       console.log((new Date().toISOString()) + ' ID ' + socket.id + ' connected.');

        socket.on('disconnect', function () { //disconnect 
            console.log(socket.id + ' disconnected');
            for (var i = 0; i < clients.length; i++) {
                if (clients[i].id == socket.id) {
                    clients.splice(i, 1);
                    break;
                }

            }
            for (var i = 0; i < clients.length; i++) { //update clients list
                io.to(clients[i].id).emit('addUserNameToList', clients, clients[i].id);
            }

        });

        function isClient(nick) {
            for (var i = 0; i < clients.length; i++) {
                if (clients[i].nickname == nick && clients[i].isOpenForGame == true) {
                    return clients[i].id;
                }
            }
            return false;
        }

        socket.on('sendNickToPlayWith', (data) => { ////////////////////get id of spesific user

            var idToplay = isClient(data);

            console.log("socket id :  " + socket.id, "id to play with : " + idToplay);

            if (idToplay) {

                var boards = game.getBoards();
                var random = Math.floor((Math.random() * 2) + 1);

                if (random == 1) {
                    NewGame = new game.PlayersInGame(socket.id, idToplay, boards);
                    Games.push(NewGame);

                } else {
                    NewGame = new game.PlayersInGame(idToplay, socket.id, boards);
                    Games.push(NewGame);
                }

                players = NewGame.getplayers();

                io.to(players[0].id).emit('getPLayerBoard', players[0].board);
                io.to(players[1].id).emit('getPLayerBoard', players[1].board);


                io.to(players[0].id).emit('yourTurn', " your turn! : ");
                io.to(players[1].id).emit('OpponentTurn', "wait for player!!");

                io.to(players[0].id).emit('clearOptionToChoose'); //dont show option to choose
                io.to(players[1].id).emit('clearOptionToChoose');

                NewGame.setcurrentTurn(players[0].id);
                NewGame.setOpennentTurn(players[1].id);

                for (var i = 0; i < clients.length; i++) { //update clients list

                    if ((clients[i].id == players[0].id) || (clients[i].id == players[1].id)) {
                        clients[i].isOpenForGame = false;
                    }
                }

                for (var i = 0; i < clients.length; i++) { //update clients list
                    io.to(clients[i].id).emit('addUserNameToList', clients, clients[i].id);
                }

            } else {
                socket.emit("isPlaying");
            }

        });




        //////////////////////////////////////////////////////////////////////////////////////////////////////


        socket.on('addUserNick', (data) => {

            if (isUser(data)) {
                var obj = {};
                obj.nickname = data;
                obj.id = socket.id;
                obj.isOpenForGame = true;
                clients.push(obj);

                for (var i = 0; i < clients.length; i++) {

                    if (clients[i].id != socket.id) {
                        io.to(clients[i].id).emit('addUserNameToList', clients, clients[i].id);
                    } else {
                        io.to(clients[i].id).emit('addUserNameToList', clients, clients[i].id);
                    }
                }

            } else {
                io.to(socket.id).emit('userExsist', data);
            }

        });

        socket.on('SendCordToHit', (cord) => {
            var NewGame = GetcurrentGame(socket.id);

            var OponnetnTurnId = NewGame.getOpennentTurnId();

            var currentId = NewGame.getcurrentTurnId();

            console.log(" Oponent id : " + OponnetnTurnId, "current id : " + currentId);


            if (NewGame.checkIfIsYourTurn(socket.id)) {

                if (NewGame.checkIfHit(cord, socket.id)) {

                    io.to(currentId).emit('IfHit', true, cord);
                    io.to(OponnetnTurnId).emit('hitYourBord', cord); ///HitYour board

                    NewGame.incriseScore(OponnetnTurnId);

                    if (NewGame.checkIfWin(OponnetnTurnId)) {
                        io.to(socket.id).emit('Winner', "you are the winner");
                        io.to(OponnetnTurnId).emit('Winner', "you are the looser");

                        deleteGame(socket.id);

                        for (var i = 0; i < clients.length; i++) { //update clients list
                            if (clients[i].id == socket.id || clients[i].id == OponnetnTurnId) {
                                clients[i].isOpenForGame = true;
                            }
                        }

                        for (var i = 0; i < clients.length; i++) { //update clients list
                            io.to(clients[i].id).emit('addUserNameToList', clients, clients[i].id);
                        }

                        io.to(socket.id).emit('returnToloby'); ///return to the loby
                        io.to(OponnetnTurnId).emit('returnToloby');

                    } else {
                        io.to(currentId).emit('yourTurn', " your turn! : "); //say to other player to play/wait
                        io.to(OponnetnTurnId).emit('OpponentTurn', "wait for player!!");
                    }


                } else {

                    socket.emit("IfHit", false, cord);
                    io.to(OponnetnTurnId).emit('yourTurn', " your turn! : "); //say to other player to play/wait
                    io.to(currentId).emit('OpponentTurn', "wait for player!!");
                    NewGame.setcurrentTurn(OponnetnTurnId);
                    NewGame.setOpennentTurn(currentId);

                    io.to(OponnetnTurnId).emit('hitCurrent', cord);
                }

            } else {
                socket.emit("NotYourTurn");
            }
        });


        function deleteGame(id) {

            for (var i = 0; i < Games.length; i++) {
                if (Games[i].player1 == id || Games[i].player2 == id) {
                    Games.splice(i, 1);
                    break;
                }
            }
        }

        function GetcurrentGame(id) {

            for (var i = 0; i < Games.length; i++) {

                if (Games[i].player1 == id || Games[i].player2 == id) {
                    return Games[i];
                }

            }

        }

        function isUser(nick) {
            for (var i = 0; i < clients.length; i++) {
                if (clients[i].nickname == nick)
                    return false;
            }
            return true;

        }

    });



}

module.exports = connection;