var db;
var dbCreated = false;
var id = getUrlVars()["id"];

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
    var sql = "select ID,_id,DatetimeStart,HomeName,AwayName,Field,Latitude,Longitude,DivisionID ,DivisionName,HomeClubID,AwayClubID,HomeTeamID,AwayTeamID,HomeScore ,AwayScore ,UpdateDateUTC ,TournamentName,TournamentID ,DatetimeStartSeconds ,DivisionOrderID,ShowToAll,Final from MobileApp_Results where DivisionID = '" + id + "'  order by DatetimeStart DESC";
    //alert(sql);
    tx.executeSql(sql, [], getMenu_success);
}

function getMenu_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
//alert(len);
    for (var i=0; i<len; i++) {
        var menu = results.rows.item(i);

        var menu = results.rows.item(i);
        var res = (menu.DatetimeStart).split("T");
        var split = res[0].split("-");
        var month = split[1];
        var year = split[0];
        var day = split[2];

        var h = res[1].substring(0,2)
        var ampm = h > 12 ? h-12 +'PM' : h +'AM';


        var date2 = new Date(menu.DatetimeStart);
       // alert(date2);
        $('#mainmenu').append('<Div class="mainmenuresult" align="left" >' +
            '<div class="bold size13"  >' + menu.HomeName + ' vs ' + menu.AwayName + '</div>' +
            '<div class="bold size13" >' + menu.HomeScore + ' - ' + menu.AwayScore + '</div>' +
            '<div class="size11"  >' + menu.DivisionName + '</div>' +
            '<div class="size11">' + menu.TournamentName + '</div>' +
            '<div class="size11">' + ampm  + " " + day + '/' + month + '/' + year + '</div>' +
            '</Div>');
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