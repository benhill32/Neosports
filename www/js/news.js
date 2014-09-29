var db;
var clubidtop= 0;
var IDNews = 0;
var IDhist = 0;
var IDcon = 0;
var spon= 1;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    console.log("LOCALDB - Database ready");
    db.transaction(getMenu, errorCBfunc, successCBfunc);
}

db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
console.log("LOCALDB - Database ready");
db.transaction(getdatanews, errorCBfunc, successCBfunc);



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
        db.transaction(getdata2, errorCBfunc, successCBfunc);
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


    var count = 0;

    for (var i=0; i<len; i++) {
        var menu = results.rows.item(i);
        var imgg = "";


        if(count !=3) {
            if (menu.URL != "") {

                if ((menu.Body).length <= 200){

                    $('#newsmain').append('<a href="' + menu.URL + '" target="_blank"><Div class=" bs-callout bs-callout-info" align="left"   >' +
                        '<div class="bold size13"   ><img src="../img/infohttp.png" style="padding-right: 10px" height="20" align="left">' + menu.Body +

                        '</div>' +
                        '<div class="size11">' + menu.Body + '</div>' +
                        '</Div></a>');


                }else{
                    $('#newsmain').append('<a href="' + menu.URL + '" target="_blank"><Div class=" bs-callout bs-callout-info" align="left"   >' +
                        '<div class="bold size13"   ><img src="../img/infohttp.png" style="padding-right: 10px" height="20" align="left">' + menu.Body +

                        '</div>' +
                        '<div class="size11">' + menu.Body.substring(0, 200) +
                        '  <a href="#" data-toggle="modal" class="size11" data-target="#basicModal" onclick="loadnewfeed(' + menu.ID + ')"  >Read More</a></div>' +
                        '</Div></a>');
                }

            } else {

                if ((menu.Body).length <= 200) {


                    $('#newsmain').append('<Div class=" bs-callout bs-callout-success" align="left"  >' +
                        '<div class="bold size13"   ><img src="../img/info.png" style="padding-right: 10px" height="20" align="left">' + menu.Title +

                        '</div>' +
                        '<div class="size11">' + menu.Body + '</div>' +
                        '</Div>');

                }else{

                    $('#newsmain').append('<Div class=" bs-callout bs-callout-success" align="left"  >' +
                        '<div class="bold size13"   ><img src="../img/info.png" style="padding-right: 10px" height="20" align="left">' + menu.Title +

                        '</div>' +
                        '<div class="size11">' + menu.Body.substring(0, 200) +
                        '  <a href="#" data-toggle="modal" class="size11" data-target="#basicModal"  class="size11" onclick="loadnewfeed(' + menu.ID + ')"  >Read More</a></div>' +
                        '</Div>');

                }

            }
        }else{

            $('#newsmain').append('<Div id="spondiv' + spon + '"></div>');


            db.transaction(getsponsors, errorCBfunc, successCBfunc);
            count = 0;

        }

        count++;
    }

}

function redirectplayer(ID){

    window.open(ID);
}

function getsponsors(tx) {
    var sql = "select ID ,Datetime,Club,Name,Website,Image,UserID,OrderBy,Base64,CreatedateUTC,UpdatedateUTC ,DeletedateUTC ,UpdatedateUTCBase64   from Mobilesponsorsclub where Club=" + clubidtop + " and OrderBy =" + spon;
  //  alert(sql);
    tx.executeSql(sql, [], getsponsors_success);
}

function getsponsors_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
    if(len != 0) {
        var menu = results.rows.item(0);

        if (menu.Base64 != "null") {
            imgg = '<img src="data:image/png;base64,' + menu.Base64 + '" >';
        }

        //alert('#spondiv'+ spon);

        $('#spondiv' + spon).append('<Div  align="left"  >' +

            '<a href="http://' + menu.Website + '" target="_blank">' + imgg + '</a></div>');

        spon++;
    }
}

function loadnewfeed(ID) {
    IDNews = ID;
    db.transaction(loadnewfeed2, errorCBfunc, successCBfunc);
}






function loadnewfeed2(tx) {

    var sql = "select Title,Body from MobilevwApp_News_v_2 where ID=" + IDNews;
     // alert(sql);
    tx.executeSql(sql, [], loadnewfeed_success);
}

function loadnewfeed_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
//alert(len);

    var menu = results.rows.item(0);




    $('#newtitle').empty();
    $('#newtitle').append( '<div>' + menu.Title + '</div>');

    $('#modelnews').empty();
    $('#modelnews').append( '<div>' + menu.Body + '</div>');


}


