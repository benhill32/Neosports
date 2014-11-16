var db;
var deviceplatformdb;
document.addEventListener("deviceready", onDeviceReadydbconn, false);


function onDeviceReadydbconn() {
    deviceplatformdb = device.platform;

    if(deviceplatformdb == "iOS"){
      //  alert(deviceplatformdb);
        db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    }else if(deviceplatformdb == "Android"){
       // alert(deviceplatformdb);
        db = window.openDatabase("../../../../mnt/sdcard0/Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    }



}