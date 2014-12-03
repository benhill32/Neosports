var db;
var orientationstand = "";


document.addEventListener("deviceready", onDeviceReadysplashscreen, false);

function onDeviceReadysplashscreen() {
    deviceIDfunc = device.uuid;

    db.transaction(getbackground, errorCBfunc, successCBfunc);
}





function getorientsplash(strorein){
    orientationstand = strorein;
    //  alert(orientationstand);
    db.transaction(getbackground, errorCBfunc, successCBfunc);
}


function getbackground(tx) {
   // alert($('#mainbackground').css('opacity'));

    var sql = "select Base64,URL from Mobilescreenimage order by UpdateDateUTC desc LIMIT 1";
    // alert(sql);
    tx.executeSql(sql, [], getbackground_success);
}

function getbackground_success(tx, results) {

    var len = results.rows.length;
    //alert(len);
    if(len != 0) {
        var menu = results.rows.item(0);
        alert('<img id="screensplashimg" style="max-height:100%;max-width:100%" onclick="URLredirect(\'' + menu.URL + '\')" src="data:image/png;base64,' + menu.Base64 + '">');
        var base64 = menu.Base64;
        var width = $( window ).width() + "px";
        $('#splashscreen').empty();


        $('#splashscreen').append('<img id="screensplashimg" style="max-height:100%;max-width:100%" onclick="URLredirect(\'' + menu.URL + '\')" src="data:image/png;base64,' + menu.Base64 + '">');

    }
}






