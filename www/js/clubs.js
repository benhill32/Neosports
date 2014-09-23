var db;


var IDhist = 0;
var IDcon = 0;
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



// Transaction success callback
//
function successCB() {
    //  alert("success!");
}

function getdata(tx) {
    var sql = "select ID,_id ,name,UpdateDateUTC ,Base64,History,Contacts,UpdateSecondsUTC,Color from MobileApp_clubs order by name";
    //alert(sql);
    tx.executeSql(sql, [], getMenu_success);
}

function getMenu_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
//alert(len);
    for (var i=0; i<len; i++) {
        var menu = results.rows.item(i);
        var imgg = "";
            if(menu.Base64 != "null"){
                imgg = '<img src="data:image/png;base64,' + menu.Base64 + '"  align="right" height="20">';
            }

            $('#mainmenu').append('<Div class="mainmenuresult" align="left"  >' +
                '<div class="bold size13"   >' + imgg + menu.name  +
                '<img src="../img/info.png" height="20" align="right" data-toggle="modal" data-target="#basicModalContact" onclick="loadcontacts(' + menu.ID + ')">' +
                '<img src="../img/team.png" onclick="redirectplayer(' + menu.ID + ')"    align="right" height="20">' +
                '</div>' +
                '<div class="size11">' + menu.History.substring(0,200) + '....<a href="#" ' +
                'data-toggle="modal" class="size11" data-target="#basicModal" onclick="loadhistory(' + menu.ID + ')"  >Read More</a></div>' +
                '</Div>');
    }

}

function redirectplayer(ID){

window.location = "../pages/clubteams.html?ID=" + ID
}

function loadhistory(ID){
    IDhist = ID;
  //  db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    db.transaction(gethistory, errorCB, successCB);

}

function gethistory(tx) {

    var sql = "select History from MobileApp_clubs where ID=" + IDhist;
  //  alert(sql);
    tx.executeSql(sql, [], gethistory_success);
}

function gethistory_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
//alert(len);

        var menu = results.rows.item(0);
        $('#modelhistory').empty();
        $('#modelhistory').append( '<div>' + menu.History + '</div>');
}


function loadcontacts(ID){
    IDcon = ID;
   // db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    db.transaction(getcontacts, errorCB, successCB);

}

function getcontacts(tx) {

    var sql = "select Contacts from MobileApp_clubs where ID=" + IDcon;
    //  alert(sql);
    tx.executeSql(sql, [], getcontacts_success);
}

function getcontacts_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
//alert(len);

    var menu = results.rows.item(0);
    $('#modelcontact').empty();
    $('#modelcontact').append( '<div>' + menu.Contacts + '</div>');

}