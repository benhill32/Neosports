db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
console.log("LOCALDB - Database ready");


function loadindexmessage()
{

    db.transaction(gethasclub, errorCB, successCB);
}




function gethasclub(tx) {
    var sql = "select hasclub,hasclubdate from MobileApp_LastUpdatesec";
    //  alert(sql);
    tx.executeSql(sql, [], gethasclub_success);
}


function gethasclub_success(tx, results) {

    var len = results.rows.length;
    var menu = results.rows.item(0);

    var hasclub = menu.hasclub;
    var hasclubdate =menu.hasclubdate;




    var da4 = new Date();
    var na4 = da4.getTime();

    var dif = na4-hasclubdate;



    if(hasclub == 0 && dif > "600000"){
            $('#basicModal').modal('show');

    }

}

function hadclubfunction(){

    db.transaction(function(tx) {
        tx.executeSql('Update MobileApp_LastUpdatesec set hasclub = 1');
        console.log("Update MobileApp_LastUpdatesec");
    });
}


function hadclubchecklater(){
    var daa = new Date();
    var naa = daa.getTime();

    db.transaction(function(tx) {
        tx.executeSql('Update MobileApp_LastUpdatesec set hasclub = 0, hasclubdate = "' + naa + '"');
        console.log("Update MobileApp_LastUpdatesec");
    });
}

function choosefacteam(ID){

    clearfavteam();

    addfavteam(ID);

    var daaa = new Date();
    var naaa = daaa.getTime();

    db.transaction(function(tx) {
        tx.executeSql('Update MobileApp_LastUpdatesec set hasclub = 1, hasclubdate = "' + naaa + '"');
        console.log("Update MobileApp_LastUpdatesec");
    });

}


function showclubsfun(){


    $('#basicModalteams').modal('show');

    db.transaction(getclubsfav, errorCB, successCB);
}

function errorCB(err) {
    console.log("Error processing SQL: "+err.message);
    //alert("Error processing SQL loaddata: "+err.code);
}



// Transaction success callback
//
function successCB() {
    //  alert("success!");
}

function getclubsfav(tx) {
    var sql = "select ID,_id ,name,UpdateDateUTC ,Base64,History,Contacts,UpdateSecondsUTC,Color from MobileApp_clubs order by name";
    //alert(sql);
    tx.executeSql(sql, [], getclubsfav_success);
}


function getclubsfav_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
//alert(len);
    for (var i=0; i<len; i++) {
        var menu = results.rows.item(i);
        var imgg = "";


        $('#clubfav').append('<Div class="modal-body"  data-dismiss="modal" align="left" style="border-bottom: 1px solid #e5e5e5;" onclick="choosefacteam('+ menu.ID + ')"  >' +
            '<div class="bold size13"   >' + menu.name  +
            '</div>' +
            '</Div>');
    }

}