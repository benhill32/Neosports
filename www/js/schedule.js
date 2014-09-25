var db;
var dbCreated = false;
var IDhist = 0;
var id = getUrlVars()["id"];

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    console.log("LOCALDB - Database ready");
    db.transaction(getMenu, errorCBfunc, successCBfunc);
}
db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
console.log("LOCALDB - Database ready");
db.transaction(getdata, errorCBfunc, successCBfunc);


function getdata(tx) {
    var sql = "select ID,_id,DatetimeStart,HomeName,AwayName,Field,Latitude,Longitude,DivisionID ,DivisionName,HomeClubID,AwayClubID,HomeTeamID,AwayTeamID ,UpdateDateUTC ,TournamentName,TournamentID ,DatetimeStartSeconds ,DivisionOrderID,ShowToAll,Final,Cancel from MobileApp_Schedule where DivisionID = " + id + " order by DatetimeStart";
    //alert(sql);
    tx.executeSql(sql, [], getMenu_success);
}

function getMenu_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
//alert(len);


    for (var i=0; i<len; i++) {
        var menu = results.rows.item(i);
        var res = (menu.DatetimeStart).split("T");
        var split = res[0].split("-");
        var month = split[1];
        var year = split[0];
        var day = split[2];

        var h = res[1].substring(0,2)


        var ampm = h > 12 ? h-12 +'PM' : h +'AM';

        if(menu.Cancel== 0) {
            $('#divschedules').append('<Div class="mainmenuresult" align="left" >' +
                '<div class="bold size13"  >' + menu.HomeName + ' vs ' + menu.AwayName  +
                '<img height="20px" src="../img/schedule.png" onclick="loadinfo(' + menu.ID + ')" align="right" data-toggle="modal" data-target="#basicModal">' +

                '</div>' +
                '<div class="size11">' + ampm + '  ' + day + '/' +  month + '/' + year + '</div>' +
                '<div class="size11">' + menu.TournamentName +
                '<div class="size11">' + menu.Field + '</div>' +
                '</Div>');
        }else{
            $('#divschedules').append('<Div class="mainmenuresultcancel" align="left" >' +
                '<div class="bold size13"  >' + menu.HomeName + ' vs ' + menu.AwayName + '</div>' +
                '<div class="size11">' + ampm + '  ' + day + '/' + month + '/' + year + '</div>' +
                '<div class="size11">' + menu.TournamentName + ' ' + ' Cancelled ' + '</div>' +
                '<div class="size11">' + menu.Field + '</div>' +
                '</Div>');

        }
    }
}

function loadinfo(ID) {
    IDhist = ID;

    db.transaction(loadinfo_success1, errorCBfunc, successCBfunc);

}

function loadinfo_success1(tx) {

    var sql = "select ID,_id,DatetimeStart,HomeName,AwayName,Field,Latitude,Longitude,DivisionID ,DivisionName,HomeClubID,AwayClubID,HomeTeamID,AwayTeamID ,UpdateDateUTC ,TournamentName,TournamentID ,DatetimeStartSeconds ,DivisionOrderID,ShowToAll,Final,Cancel from MobileApp_Schedule where ID =" + IDhist;

     // alert(sql);
    tx.executeSql(sql, [], loadinfo_success2);
}


function loadinfo_success2(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
    var menu = results.rows.item(0);
    var res = (menu.DatetimeStart).split("T");
    var split = res[0].split("-");
    var month = split[1];
    var year = split[0];
    var day = split[2];

    var h = res[1].substring(0, 2)
    var d = new Date();

   // alert(("0" + (d.getMonth()+1)).slice(-2));

    if (day == d.getDate() && month == ("0" + (d.getMonth()+1)).slice(-2) && year == d.getFullYear()){

        $('#score').show();
        $('#score').empty().append('<Div><hr><a href="scorecard.html?ID=' + menu.ID + '">Score Card</a></div>');

        $('#Directions').show();
        $('#remind').hide();

    }else{

        $('#score').hide();
        $('#Directions').show();
        $('#remind').show();

    }
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


