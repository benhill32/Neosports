var db;
var teamID = getUrlVars()["teamID"];
var favtop  = 0;
var followtop =0;

document.addEventListener("deviceready", onDeviceReady, false);





function onDeviceReady() {
    db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    console.log("LOCALDB - Database ready");
    db.transaction(getMenu, errorCB, successCB);
}
db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
console.log("LOCALDB - Database ready");
db.transaction(getdata, errorCB, successCB);



function errorCB(err) {
    console.log("Error processing SQL: "+err.message);
    //alert("Error processing SQL loaddata: "+err.code);
}

function getdata(tx) {
    var sql = "select ID,_id,ClubID,FullName,Base64,TeamID,UpdateSecondsUTC,UpdateSecondsUTCBase64,UpdateDateUTC,UpdateDateUTCBase64,Position from MobilevwApp_Base_Players where TeamID=" + teamID;
   // alert(sql);
    tx.executeSql(sql, [], getteamplayer_success);
}




function updatefollow(){
    $("#imgfavfollow").attr('onclick','').unbind('click');
    if(favtop == 0 && followtop ==0){
    db.transaction(function(tx) {
        tx.executeSql('Update MobileApp_clubs set Fav = 0,Follow= 1 where ID=' + id);
        console.log("Update INTO MobileApp_clubs");
    });
        favtop = 0;
        followtop = 1;
    }else if(favtop == 1 && followtop ==0){
        db.transaction(function(tx) {
            tx.executeSql('Update MobileApp_clubs set Fav = 0,Follow= 0 where ID=' + id);
            console.log("Update INTO MobileApp_clubs");
        });
        favtop = 0;
        followtop = 0;
    }else if(favtop == 0 && followtop ==1){
        db.transaction(function(tx) {
            tx.executeSql('Update MobileApp_clubs set Fav = 1,Follow= 0 where ID=' + id);
            console.log("Update INTO MobileApp_clubs");
        });
        //force only one fav
        db.transaction(function(tx) {
            tx.executeSql('Update MobileApp_clubs set Fav = 0 where ID != ' + id);
            console.log("Update INTO MobileApp_clubs");
        });

        favtop = 1;
        followtop = 0;
    }

    db.transaction(getimgfav, errorCB, successCB);

}





function getteamplayer_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
//alert(len);
    for (var i=0; i<len; i++) {
        var menu = results.rows.item(i);
        var imgg = "";
        if(menu.Base64 != "null"){
            imgg = '<img src="data:image/png;base64,' + menu.Base64 + '" style="margin-top: -10px;margin-right: 15px;"  align="left" height="40" >';
        }

        $('#teamsdiv').append('<Div class="mainmenuplayers" align="left" onclick="redirectplayer(' + menu.ID + ')" >' +
            '<div class="bold size13"  >' + imgg +  menu.FullName + '</div><div class="size11"  >' + menu.Position + '</div>' +

            '</Div>');


    }

}

function redirectplayer(ID){

    window.location = "../pages/clubteamplayers.html?ClubID=" + id + "&teamID=" + ID;
}

// Transaction success callback
//
function successCB() {
    //  alert("success!");
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}