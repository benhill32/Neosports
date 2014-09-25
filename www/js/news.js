var db;
var clubidtop= 0;

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
db.transaction(getdatanews, errorCB, successCB);

function errorCB(err) {
    console.log("Error processing SQL: "+err.message);
    //alert("Error processing SQL loaddata: "+err.code);
}



// Transaction success callback
//
function successCB() {
    //  alert("success!");
}

function getdatanews(tx) {
    var sql = "select ID from MobileApp_clubs where Fav = 1";
    //alert(sql);
    tx.executeSql(sql, [], getClubID_success);
}







function getClubID_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;


    if(len != 0) {
        var menu = results.rows.item(0);
        clubidtop = menu.ID;
        db.transaction(getdata2, errorCB, successCB);
     }else{

        alert("need fav team");
    }

}

function getdata2(tx) {
    var sql = "select ID,_id,UpdateDateUTC,Title,Body,ClubID,TeamID,Hide,IsAd,Base64,URL,Hint,DisplayDateUTC,DisplaySecondsUTC from MobilevwApp_News_v_2 where ClubID=" + clubidtop + " order by DisplayDateUTC Desc";
    tx.executeSql(sql, [], getnewfeed_success);
}



function getnewfeed_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;


    for (var i=0; i<len; i++) {
        var menu = results.rows.item(i);
        var imgg = "";



        if(menu.URL != "") {

            $('#newsmain').append('<a href="'+ menu.URL +'" target="_blank"><Div class=" bs-callout bs-callout-info" align="left"   >' +
                '<div class="bold size13"   ><img src="../img/infohttp.png" style="padding-right: 10px" height="20" align="left">' + menu.Title  +

                '</div>' +
                '<div class="size11">' + menu.Body + '</div>' +
                '</Div></a>');

        }else{
            $('#newsmain').append('<Div class=" bs-callout bs-callout-success" align="left"  >' +
                '<div class="bold size13"   ><img src="../img/info.png" style="padding-right: 10px" height="20" align="left">' + menu.Title  +

                '</div>' +
                '<div class="size11">' + menu.Body + '</div>' +
                '</Div>');

        }


    }

}

function redirectplayer(ID){

    window.open(ID);
}




