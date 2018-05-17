socket.on('addUserNameToList', function (data, idToNotShow) {


    console.log("asdasdasd");

    openDialog = {};
    openDialog.dialog = document.getElementById('load_dialog');
    openDialog.content = openDialog.dialog.getElementsByClassName('inner')[0];
    openDialog.selectElement = openDialog.content.getElementsByTagName('select')[0];
    openDialog.selectElement.innerHTML = '';

    for (var i = 0; i < data.length; i++) {

        if (data[i].id != idToNotShow) {

            var option = document.createElement('option');
            option.setAttribute('value', data[i].nickname);

            if (data[i].isOpenForGame == true) {

                option.innerHTML = data[i].nickname + "      -openForPlay";
            } else {
                option.innerHTML = data[i].nickname;
            }

            openDialog.selectElement.appendChild(option);
        }

    }

    var inputLogin = document.getElementById('submit');
    inputLogin.style.display = 'none';
});

socket.on('userExsist', function (nick) {

    alert(nick + " already exist, try again")
});


function sendToServer(nick) {

    socket.emit('addUserNick',
        nick
    );

}

function sendRequestToPlay(nickName) {
    var dialog = document.getElementsByTagName('option');
    if (dialog.length > 0) {
        socket.emit('sendNickToPlayWith',
            nickName
        );
    } else {

        alert("no players in the current game..please wait");
    }





};