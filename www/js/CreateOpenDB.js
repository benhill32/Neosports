document.addEventListener("deviceready", onDeviceReadycreateopen, false);
var db;
var dbCreated = false;

alert("outside");


function onDeviceReadycreateopen() {
    alert("start");
    devicePlatformfunc = device.platform;

    if(devicePlatformfunc == "iOS"){
        db = window.openDatabase("../Library/Caches/myDB/Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    }else{
        db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    }



}

if (url.indexOf("localhost") != -1){
    db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    db.transaction(createDB, errorCBfunc, successCBfunc);

}







