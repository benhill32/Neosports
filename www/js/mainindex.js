db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
console.log("LOCALDB - Database ready");
db.transaction(gethasclub, errorCB, successCB);

function gethasclub(tx) {
    var sql = "select hasclub,hasclubdate from MobileApp_LastUpdatesec";
    //   alert(sql);
    tx.executeSql(sql, [], gethasclub_success);
}


function gethasclub_success(tx, results) {

    var len = results.rows.length;
    var menu = results.rows.item(0);

    var hasclub = menu.hasclub;
    var hasclubdate =menu.hasclubdate;

    var da = new Date();
    var na = d.getTime();

    var dif = na-hasclubdate;

//alert(na-hasclubdate);

    if(hasclub == 0 && dif < "603600000"){
            $('#basicModal').modal('show');

    }
}

function hadclubfunction(){

    db.transaction(function(tx) {
        tx.executeSql('Update MobileApp_LastUpdatesec set hasclub = 1');
        console.log("Cleared Fav Team");
    });
}


function hadclubchecklater(){
    var da = new Date();
    var na = d.getTime();

    db.transaction(function(tx) {
        tx.executeSql('Update MobileApp_LastUpdatesec set hasclub = 0, hasclubdate = "' + na + '"');
        console.log("Cleared Fav Team");
    });
}
