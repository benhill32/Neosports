db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
console.log("LOCALDB - Database ready");

document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
    db.transaction(checkfavteam, errorCBfunc, successCBfunc);
    db.transaction(getsyncdate, errorCBfunc, successCBfunc);
}

function getsyncdate(tx) {
    var sql = "select Datesecs, syncwifi from MobileApp_LastUpdatesec";
   //  alert(sql);
    tx.executeSql(sql, [], getsyncdate_success2);
}

function checkfavteam(tx) {
    var sql = "select Count(Fav) as Count from MobileApp_clubs where Fav =1";
   //   alert(sql);
    tx.executeSql(sql, [], checkfavteam_success);
}

function checkfavteam_success(tx, results) {

    var len = results.rows.length;
    var menu = results.rows.item(0);
 //alert(menu.Count);
    if(menu.Count ==0){

        $('#divclearfav').unbind('click');

        $("#divclearfav").css('color', 'grey');
    }else{

        $("#divclearfav").css('color', '#333');
    }

    var stringapp = device.uuid;

   $("#deviceid").empty();
   $("#deviceid").append(stringapp);

}
function syncnewdata(){
    $('#busy').show();


    $("#settingdeleteall").attr('disabled','disabled');
    $("#settingsync").attr('disabled','disabled');

    db.transaction(onclicksync, errorCBfunc, displayupdatenow);

}

function displayupdatenow(){
    $('#busy').show();
    db.transaction(getsyncdate, errorCBfunc, successCBfunc);

}

function getsyncdate_success2(tx, results) {
    $('#busy').show();
    var len = results.rows.length;

    var menu = results.rows.item(0);
 //   alert(menu.Datesecs);
    var dateme = new Date((menu.Datesecs)*1000);
    var wifi = menu.syncwifi;
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    $('#lastsyncdate').empty();
    if(dateme.getFullYear() != 1970) {
        $('#lastsyncdate').append("Last sync time : " + dateme.getDate() + " " + month[dateme.getMonth()] + " " + dateme.getFullYear() + " " + (dateme.getHours()) + ":" + ("0" + dateme.getMinutes()).slice(-2) + ":" + ("0" + dateme.getSeconds()).slice(-2))
    }
        console.log("Last sync time : " + dateme.getDate() + " " + month[dateme.getMonth()] + " " + dateme.getFullYear() + " " + (dateme.getHours()) + ":" + ("0" + dateme.getMinutes()).slice(-2) + ":" + ("0" + dateme.getSeconds()).slice(-2) );



    if(wifi==1) {

        $('#btn2').addClass("btn btn-xs btn-default");
        $('#btn1').addClass("btn btn-xs btn-primary active");

    }else if(wifi==0) {
        $('#btn1').addClass("btn btn-xs btn-default");
        $('#btn2').addClass("btn btn-xs btn-primary active");

    }


    $('#busy').hide();
    $("#settingdeleteall").removeAttr('disabled');
    $("#settingsync").removeAttr('disabled');

}

function clearfavteam(){

    db.transaction(function(tx) {
        tx.executeSql('Update MobileApp_clubs set Fav = 0');
        console.log("Cleared Fav Team");
    });


    db.transaction(checkfavteam, errorCBfunc, successCBfunc);
}

function cleardata(){

    //$('#maindeleteall').enable
    $("#settingdeleteall").attr('disabled','disabled');

    $("#settingsync").attr('disabled','disabled');



    db.transaction(droptables, errorCBfunc, createtables);
}

function createtables(){
    $('#busy').show();
    db.transaction(createDB, errorCBfunc, loadnewtable);
}





var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};


function chkmobiledata(id){

   if(id=="btn1")
   {

       db.transaction(function(tx) {
           tx.executeSql('Update MobileApp_LastUpdatesec set syncwifi = 1');
           console.log("syncwifi on");
       });

       $('#btn2').removeClass("btn btn-xs btn-primary active");
       $('#btn2').addClass("btn btn-xs btn-default");
       $('#btn1').removeClass("btn btn-xs btn-default");
       $('#btn1').addClass("btn btn-xs btn-primary active");

   }
   else if(id== "btn2")
   {
       db.transaction(function(tx) {
           tx.executeSql('Update MobileApp_LastUpdatesec set syncwifi = 0');
           console.log("syncwifi off");
       });

       $('#btn1').removeClass("btn btn-xs btn-primary active");
       $('#btn1').addClass("btn btn-xs btn-default");
       $('#btn2').removeClass("btn btn-xs btn-default");
       $('#btn2').addClass("btn btn-xs btn-primary active");
   }


}
