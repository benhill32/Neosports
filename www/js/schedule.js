var db;
var dbCreated = false;
var IDhist = 0;
var id = getUrlVars()["id"];
var clubidtop =0;
var listfollow = 0;
var fliter = 0;
var lat = 0;
var long = 0;
var isadmin = 0;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    console.log("LOCALDB - Database ready");
   //  navigator.geolocation.getCurrentPosition(getgeolocation, onError);
    db.transaction(getfliter, errorCBfunc, successCBfunc);

}
//db.transaction(getfliter, errorCBfunc, successCBfunc);

function getgeolocation(position) {
   // lat = position.coords.latitude;
   // long = position.coords.longitude;


}


function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}

function allowfilter(id){

    if(id==1)
    {

        db.transaction(function(tx) {
            tx.executeSql('Update MobileApp_LastUpdatesec set fliterON =' + id);
            console.log("Update MobileApp_LastUpdatesec");
        });

        $('#btn2').removeClass("btn btn-xs btn-primary active");
        $('#btn2').addClass("btn btn-xs btn-default");
        $('#btn1').removeClass("btn btn-xs btn-default");
        $('#btn1').addClass("btn btn-xs btn-primary active");

    }
    else if(id== 0)
    {
        db.transaction(function(tx) {
            tx.executeSql('Update MobileApp_LastUpdatesec set fliterON =' + 0);
            console.log("Update MobileApp_LastUpdatesec");
        });

        $('#btn1').removeClass("btn btn-xs btn-primary active");
        $('#btn1').addClass("btn btn-xs btn-default");
        $('#btn2').removeClass("btn btn-xs btn-default");
        $('#btn2').addClass("btn btn-xs btn-primary active");
    }
    db.transaction(getfliter, errorCBfunc, successCBfunc);

}




function getfliter(tx) {
    var sql = "select fliterON,isadmin from MobileApp_LastUpdatesec";
    //alert(sql);
    tx.executeSql(sql, [], getfliter_success);
}


function getfliter_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;


    if(len != 0) {
        var menu = results.rows.item(0);
        fliter = menu.fliterON;
        isadmin = menu.isadmin;
    }


    db.transaction(getdatanews, errorCBfunc, successCBfunc);
}




function getdatanews(tx) {
    var sql = "select ID from MobileApp_clubs where Fav = 1";
   // alert(sql);
    tx.executeSql(sql, [], getClubID_success);
}


function getClubID_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
    clubidtop = 0;

    if(len != 0) {
        var menu = results.rows.item(0);
        clubidtop = menu.ID;

    }

    db.transaction(getdata2, errorCBfunc, successCBfunc);
}


function getdata2(tx) {
    var sql = "select ID from MobileApp_clubs where Follow = 1";
    //alert(sql);
    tx.executeSql(sql, [], getdata2_success);
}

function getdata2_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
    listfollow = 0;

    if(len != 0) {
        for (var i=0; i<len; i++) {
            var menu = results.rows.item(i);
            listfollow = listfollow + menu.ID + ",";
        }
    }
    listfollow =  listfollow + clubidtop + ","

    listfollow = listfollow.substr(0, listfollow.length - 1);

   // alert(listfollow);

    db.transaction(getdata, errorCBfunc, successCBfunc);

}


function getdata(tx) {
    var sql = "";
    if(fliter == 0){

        $('#btn1').removeClass("btn btn-xs btn-primary active");
        $('#btn1').addClass("btn btn-xs btn-default");
        $('#btn2').removeClass("btn btn-xs btn-default");
        $('#btn2').addClass("btn btn-xs btn-primary active");
        sql = "select ID,_id,DatetimeStart,HomeName,AwayName,Field,Latitude,Longitude,DivisionID ,DivisionName,HomeClubID,AwayClubID,HomeTeamID,AwayTeamID ,UpdateDateUTC ,TournamentName,TournamentID ,DatetimeStartSeconds ,DivisionOrderID,ShowToAll,Final,Cancel from MobileApp_Schedule where  DivisionID = " + id + " order by DatetimeStart";

    }else{
        $('#btn2').removeClass("btn btn-xs btn-primary active");
        $('#btn2').addClass("btn btn-xs btn-default");
        $('#btn1').removeClass("btn btn-xs btn-default");
        $('#btn1').addClass("btn btn-xs btn-primary active");
        sql = "select ID,_id,DatetimeStart,HomeName,AwayName,Field,Latitude,Longitude,DivisionID ,DivisionName,HomeClubID,AwayClubID,HomeTeamID,AwayTeamID ,UpdateDateUTC ,TournamentName,TournamentID ,DatetimeStartSeconds ,DivisionOrderID,ShowToAll,Final,Cancel from MobileApp_Schedule where (HomeClubID IN (" + listfollow + ") or AwayClubID IN (" + listfollow + ")) and  DivisionID = " + id + " order by DatetimeStart";

    }



   // alert(sql);
    tx.executeSql(sql, [], getMenu_success);
}

function getMenu_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
//alert(len);
    $('#divschedules').empty();

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
        if(isadmin==1) {
            $('#score').show();
            $('#score').empty().append('<Div><hr><a href="scorecard.html?ID=' + menu.ID + '">Score Card</a></div>');
        }
        $('#remind').hide();

    }else {

        $('#score').hide();
        $('#remind').show();

    }

    if(menu.Latitude != "null" || menu.Longitude != "null" ) {
        $('#Directions').show();
        $("#Directions").click(function () {
            window.open("https://www.google.co.nz/maps/dir/Current+Location/" + menu.Latitude + ",+" + menu.Longitude, "_system")
        });
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


