var socket = io.connect();


function initConnections(imgSea, imgShip, imgbomb, imgBombyour, imgEnemy, screenW) {

  var canvas;

  socket.on('getPLayerBoard', function (data) {

    divOfCanvas = document.getElementById("canvas");
    divOfCanvas.removeChild(divOfCanvas.childNodes[0]);

    var newCanvas = document.createElement("canvas");
    newCanvas.setAttribute("id", "CanvasBattle");
    divOfCanvas.appendChild(newCanvas);

    canvas = new Game('CanvasBattle', 10, data, imgSea, imgShip, imgbomb, imgBombyour, imgEnemy);
    canvas.onDraw(0, 0, true);
    canvas.onDraw(screenW - 500, 0, false);
  });



  socket.on('IfHit', function (hit, cord) {

    canvas.isHit(hit, cord);

  });

  socket.on('yourTurn', function (nick) {

    canvas.drawPlayerNickTurn(nick);

  });

  socket.on('OpponentTurn', function (nick) {

    canvas.drawPlayerNickTurn(nick);

  });

  socket.on('Winner', function (nick) {

    alert(nick);

  });

  socket.on('returnLoby', function (nick) {

    alert(nick);

  });


  socket.on('NotYourTurn', function () {

    alert("NO YOUR TURN !!! PLEASE WAIT");

  });

  socket.on('hitYourBord', function (cord) {

    canvas.hitYourbord(cord);
  });

  socket.on('hitCurrent', function (cord) {

    canvas.hitCurrent(cord);

  });

  socket.on('clearOptionToChoose', function (cord) {

    canvas.cleardialog();

  });

  socket.on('isPlaying', function () {

    alert('IS PLAYER IS PLATING NOW');

  });

  socket.on('returnToloby', function () {

    var dialog = document.getElementById('load_dialog');
    dialog.style.display = 'block';
    canvas.clearCanvas();

  });

}


function SendCordinate(cord) {

  socket.emit('SendCordToHit',
    cord
  );

}