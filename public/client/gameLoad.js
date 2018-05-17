window.onload = function () {

    document.getElementById('submit').addEventListener('click', function () {
        var username = document.getElementById('user').value;
        sendToServer(username);
    });
    document.getElementById('SendR').addEventListener('click', function () {
        var nickname = document.getElementsByTagName('select')[0].value;
        sendRequestToPlay(nickname);
    });

    var ScreenWidth = window.innerWidth;
    var ScreenHeight = window.innerHeight;

    var imgSea, imgShip, imgbomb, imgBombyour,imgEn;

    var emptyImg = new Image();
    emptyImg.src = 'https://www.colorcombos.com/images/colors/80DAEB.png';
    imgSea = emptyImg;

    var emptyImg = new Image();
    emptyImg.src = 'http://juw526zklx-flywheel.netdna-ssl.com/wp-content/uploads/2016/11/amerigo-vespucci.jpg';
    imgEn = emptyImg;

    var emptyImg = new Image();
    emptyImg.src = 'https://static.independent.co.uk/s3fs-public/styles/article_small/public/thumbnails/image/2017/06/16/23/uss-fitzgerald-us-destroyer-sinking.jpg';
    imgShip = emptyImg;


    var emptyImg = new Image();
    emptyImg.src = 'http://i3.mirror.co.uk/incoming/article6765741.ece/ALTERNATES/s615b/GettyImages-003727-001.jpg';
    imgbomb = emptyImg;


    var emptyImg = new Image();
    emptyImg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_X-k7CnXDRoOsl9pq372OT-nSV8MJsRhB9A-jQeKf86KsdLG3';
    imgBombyour = emptyImg;

    initConnections(imgSea, imgShip, imgbomb, imgBombyour,imgEn, ScreenWidth);

}