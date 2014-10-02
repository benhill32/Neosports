var db;
var dbCreated = false;

var d = new Date();
//alert(d);
var day = d.getDate();
var month = d.getMonth();
var year = d.getFullYear();
var hours= d.getHours();

var datenow = (day + '' + month+ '' + year);
var milliesecs = d.getTime();
var datenowsec = Math.round((milliesecs/1000));
var golbaltoken= "";
var networkconnection = "";
document.addEventListener("deviceready", onDeviceReadyloaddata, false);

// Cordova is ready
//

function onDeviceReadyloaddata() {

    db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    console.log("LOCALDB - Database ready");

    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = '0';
    states[Connection.ETHERNET] = '2';
    states[Connection.WIFI]     = '2';
    states[Connection.CELL_2G]  = '1';
    states[Connection.CELL_3G]  = '1';
    states[Connection.CELL_4G]  = '1';
    states[Connection.NONE]     = '0';

    networkconnection = states[networkState];




}








function refreshdata(){

    db.transaction(populateDB, errorCBfunc, successCBfunc);
}





function loadnewtable(){
    $('#busy').show();

    var token = randfunc() + randfunc() + randfunc() + randfunc();
    golbaltoken = token;

    blankLastUpdatesec(token);

    db.transaction(populateDB, errorCBfunc, displayupdatenow);

    //registers the device
  //  passdatatoserver();
}





function populateDB1(tx,results) {
        var row = results.rows.item(0);
        //alert(row.Count);
    if(row.Count ==0){
           var token = randfunc() + randfunc() + randfunc() + randfunc();

       blankLastUpdatesec(token);

        db.transaction(populateDB, errorCBfunc, successCBfunc);
    }else{
        var sql = "select Datesecs,datemenus from MobileApp_LastUpdatesec";


        if(row.syncwifi ==1 && networkconnection==2){
            tx.executeSql(sql, [], getchecksync,errorCBfunc);
       //     alert("sync");
        }else if(row.syncwifi ==0){
            tx.executeSql(sql, [], getchecksync,errorCBfunc);
       //     alert("sync");
        }else{
            $('#busy').hide();
           alert("no sync");
        }


    }

}


function populateDB(tx){
    $('#busy').show();
    var sql = "select Count(Datesecs) as Count,syncwifi from MobileApp_LastUpdatesec";
    tx.executeSql(sql, [], populateDB1,errorCBfunc);

}

function passdatatoserver(){

    var deviceid = "dsdsadsadasd";
    var http = new XMLHttpRequest();
    var url = "http://centralfootball.neosportz.com/loaddatafromapp.aspx";
    var params = "?token=" + golbaltoken + "&deviceid=" + deviceid;
    http.open("POST", url + params, true);

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
           // alert(http.responseText);
        }
    }
    http.send();

}

function getchecksync(tx, results) {
    $('#busy').hide();
    var row = results.rows.item(0);



    // only runs while on the index.html page.
    if(document.getElementById("indexdiv")!=null){

        loadindexmessage();
    }

        var datemenus= row.datemenus;
        var datenowsecsync = row.Datesecs;

        var datenow = new Date();
        var timenow = datenow.getTime();

        var dif = (timenow/1000)-(datenowsecsync);





    // forcing sync from new page
    if(document.getElementById("newsmain")!=null){
        dif = 100000000;
    }

    console.log(new Date((row.Datesecs)*1000) + "\n\r" + dif);
  //  alert(new Date((row.Datesecs)*1000) + "\n\r" + datenowsecsync  + "\n\r" + dif);

    if(dif >= "600") {


        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();

        $('#busy').show();
        xmlHttp.open("GET", 'http://centralfootball.neosportz.com/databen.aspx?sec=' + datenowsecsync,false);
        xmlHttp.send();

        var json = xmlHttp.responseText;

        var obj = JSON.parse(json);

        //if(datemenus != datenow) {
        if(datemenus != datemenus) {
            updatemenutables(obj);
        }

        syncmaintables(obj);

        if(document.getElementById("settingsync")!=null){
            db.transaction(getsyncdate, errorCBfunc, successCBfunc);
        }


    }
}

function onclicksyncloaddata(){

    db.transaction(onclicksyncloaddata2, errorCBfunc, successCBfunc)

}

function onclicksyncloaddata2(tx){


    var sql = "select Datesecs,datemenus from MobileApp_LastUpdatesec";
    // alert(sql);


    if(row.syncwifi ==1 && networkconnection==2){
        tx.executeSql(sql, [], onclickresync,errorCBfunc);
      alert("sync");
    }else if(row.syncwifi ==0){
        tx.executeSql(sql, [], onclickresync,errorCBfunc);
        alert("sync");
    }else{
        $('#busy').hide();
        alert("no sync");
    }


}




function onclickresync(tx, results) {
    $('#busy').hide();
    // only runs while on the index.html page.
    if(document.getElementById("indexdiv")!=null){

        loadindexmessage();
    }
    var row = results.rows.item(0);
    var datemenus= row.datemenus;
    var datenowsecsync = row.Datesecs;

    var datenow = new Date();
    var timenow = datenow.getTime();

    var dif = timenow-(datenowsecsync);

        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();

        $('#busy').show();
        xmlHttp.open("GET", 'http://centralfootball.neosportz.com/databen.aspx?sec=' + (datenowsecsync),false);
        xmlHttp.send();

        var json = xmlHttp.responseText;

        var obj = JSON.parse(json);
        // alert(obj.vwApp_News_v_2[0].Body);

        //if(datemenus != datenow) {
        if(datemenus != datemenus) {
            updatemenutables(obj);
        }

         syncmaintables(obj);


    if(document.getElementById("settingsync")!=null){
        db.transaction(getsyncdate, errorCBfunc, successCBfunc);
    }

}


