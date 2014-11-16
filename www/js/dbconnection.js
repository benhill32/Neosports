
document.addEventListener("deviceready", onDeviceReadydbconn, false);






function onDeviceReadydbconn() {

    db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
}