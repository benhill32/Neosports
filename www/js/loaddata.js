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
var deviceIDfunc;



document.addEventListener("deviceready", onDeviceReadyloaddata, false);

// Cordova is ready
//

function onDeviceReadyloaddata() {
    pushnotifiy();
    db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    console.log("LOCALDB - Database ready");
    deviceIDfunc = device.uuid;
    document.addEventListener("online", getnetworkdetails, false);


}




function getnetworkdetails(){

    document.addEventListener("online", checkonline, false);
}

function checkonline(){

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


  //  golbaltoken = token;

    blankLastUpdatesec();

    db.transaction(populateDB, errorCBfunc, displayupdatenow);

    //registers the device
  //  passdatatoserver();
}





function populateDB1(tx,results) {
    getnetworkdetails();
        var row = results.rows.item(0);
        //alert(row.Count);
    if(row.Count ==0){


       blankLastUpdatesec();

        db.transaction(populateDB, errorCBfunc, successCBfunc);
    }else{
        var sql = "select Datesecs,datemenus,token from MobileApp_LastUpdatesec";

//alert(row.syncwifi + " - " + networkconnection);

        if((row.syncwifi ==1 && networkconnection==2) || ((row.syncwifi ==0))){
            tx.executeSql(sql, [], getchecksync,errorCBfunc);
        }else{
            $('#busy').hide();
         //  alert("no sync");
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
     //   xmlHttp.open("GET", 'http://centralfootball.neosportz.com/databen.aspx?deviceID=a07883508d108e26&token=9D190637-2FEB-4A26-BA72-9A158A220A2A&sec=' + datenowsecsync,false);


       xmlHttp.open("GET", 'http://centralfootball.neosportz.com/databen.aspx?deviceID=' + deviceIDfunc + '&token=' + row.token + '&sec=' + datenowsecsync,false);
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
    getnetworkdetails();

    var sql = "select Datesecs,datemenus,syncwifi,token,isadmin from MobileApp_LastUpdatesec";
    tx.executeSql(sql, [], onclickresync,errorCBfunc);

}




function onclickresync(tx, results) {

    $('#busy').hide();
    var row = results.rows.item(0);
  //  alert(row.isadmin);
   // alert(row.syncwifi + " - " + networkconnection);

    if((row.syncwifi ==1 && networkconnection==2) || ((row.syncwifi ==0))){




    // only runs while on the index.html page.
    if(document.getElementById("indexdiv")!=null){

        loadindexmessage();
    }

    var datemenus= row.datemenus;
    var datenowsecsync = row.Datesecs;

    var datenow = new Date();
    var timenow = datenow.getTime();

    var dif = timenow-(datenowsecsync);

        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();

        $('#busy').show();
        xmlHttp.open("GET", 'http://centralfootball.neosportz.com/databen.aspx?deviceID=' + deviceIDfunc + '&token=' + row.token + '&sec=' + datenowsecsync,false);

   // alert('http://centralfootball.neosportz.com/databen.aspx?deviceID=' + deviceIDfunc + '&token=' + row.token + '&sec=' + datenowsecsync);

        xmlHttp.send();

        var json = xmlHttp.responseText;

        var obj = JSON.parse(json);
        // alert(obj);

        //if(datemenus != datenow) {
        if(datemenus != datemenus) {
            updatemenutables(obj);
        }

         syncmaintables(obj);


        if(document.getElementById("settingsync")!=null){
            db.transaction(getsyncdate, errorCBfunc, successCBfunc);
        }
    }else{
        $('#busy').hide();
       // alert("no sync");
    }
}


function successHandler (result) {
    alert('result = ' + result);
}

function errorHandler (error) {
    alert('error = ' + error);
}

function tokenHandler (result) {
    alert('token: '+ result);
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
}
function pushnotifiy() {
    pushNotification = window.plugins.pushNotification;


    if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
        pushNotification.register(
            successHandler,
            errorHandler,
            {
                "senderID":"307714525175",
                "ecb":"onNotification"
            });
    } else if ( device.platform == 'blackberry10'){
        pushNotification.register(
            successHandler,
            errorHandler,
            {
                invokeTargetId : "replace_with_invoke_target_id",
                appId: "replace_with_app_id",
                ppgUrl:"replace_with_ppg_url", //remove for BES pushes
                ecb: "pushNotificationHandler",
                simChangeCallback: replace_with_simChange_callback,
                pushTransportReadyCallback: replace_with_pushTransportReady_callback,
                launchApplicationOnPush: true
            });
    } else {
        pushNotification.register(
            tokenHandler,
            errorHandler,
            {
                "badge":"true",
                "sound":"true",
                "alert":"true",
                "ecb":"onNotificationAPN"
            });
    }
}

function onNotification(e) {
    $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

    switch( e.event )
    {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                console.log("regID = " + e.regid);
                var xmlHttpt = null;
                xmlHttpt = new XMLHttpRequest();

                $('#busy').show();
                var strur = 'http://centralfootball.neosportz.com/registerdevice.aspx?deviceID=' + deviceIDfunc + '&devicemodel=' + devicemodelfunc + '&deviceCordova=' + deviceCordovafunc + '&devicePlatform=' + devicePlatformfunc + '&deviceVersion=' + deviceVersionfunc + '&regid=' + e.regid;
                xmlHttpt.open("GET",strur ,false);
                alert(strur);
                xmlHttpt.send();
                var json = xmlHttp.responseText;

                alert(json);
            }
            break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if ( e.foreground )
            {
                $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

                // on Android soundname is outside the payload.
                // On Amazon FireOS all custom attributes are contained within payload
                var soundfile = e.soundname || e.payload.sound;
                // if the notification contains a soundname, play it.
                var my_media = new Media("/android_asset/www/"+ soundfile);
                my_media.play();
            }
            else
            {  // otherwise we were launched because the user touched a notification in the notification tray.
                if ( e.coldstart )
                {
                    $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                }
                else
                {
                    $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                }
            }

            $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
            //Only works for GCM
            $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
            //Only works on Amazon Fire OS
            $status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
            break;

        case 'error':
            $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
            break;

        default:
            $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            break;
    }
}

function onNotificationAPN(e) {
    if (e.alert) {
        $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
// showing an alert also requires the org.apache.cordova.dialogs plugin
        navigator.notification.alert(e.alert);
    }
    if (e.sound) {
// playing a sound also requires the org.apache.cordova.media plugin
        var snd = new Media(e.sound);
        snd.play();
    }
    if (e.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
    }
}





