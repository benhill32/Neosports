var db;
var dbCreated = false;

<<<<<<< HEAD
document.addEventListener("deviceready", onDeviceReadyresmenu, false);

function onDeviceReadyresmenu() {

    db.transaction(getMenu, errorCBfunc, successCBfunc);
}


=======
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    console.log("LOCALDB - Database ready");
    db.transaction(getMenu, errorCB, successCB);
}
db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
console.log("LOCALDB - Database ready");
db.transaction(getMenu, errorCB, successCB);

function errorCB(err) {
    console.log("Error processing SQL: "+err.message);
    //alert("Error processing SQL loaddata: "+err.code);
}


// Transaction success callback
//
function successCB() {
    //  alert("success!");
}
>>>>>>> origin/master



function getMenu(tx) {
    var sql = "select Distinct DivisionName,DivisionID from MobileApp_Results_Menu Group by DivisionName,DivisionID  order by DivisionOrderID";
<<<<<<< HEAD
    // var sql = "select Distinct DivisionName,DivisionID from MobileApp_Schedule_Menu Group by DivisionName,DivisionID  order by DivisionOrderID";


   // alert(sql);
=======
   // var sql = "select Distinct DivisionName,DivisionID from MobileApp_Schedule_Menu Group by DivisionName,DivisionID  order by DivisionOrderID";


    //alert(sql);
>>>>>>> origin/master
    tx.executeSql(sql, [], getMenu_success);
}


function getMenu_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
<<<<<<< HEAD
  //  alert(len);
=======

>>>>>>> origin/master
    for (var i=0; i<len; i++) {
        var menu = results.rows.item(i);



<<<<<<< HEAD
        $('#mainmenuresultsch').append('<Div class="divmainmenunew" onclick="redirectresults(' + menu.DivisionID + ')" >' +

        '<span >' + menu.DivisionName + '</span></Div>');
    }

    db = null;
}

function redirectresults(ID){

    window.location = "../pages/results.html?id=" + ID;
=======
        $('#mainmenu').append('<Div class="divmain"><a href="results.html?id=' + menu.DivisionID + '">' +

            '<span >' + menu.DivisionName + '</span></a></Div>');
    }

    db = null;
>>>>>>> origin/master
}