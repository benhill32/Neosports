

function weblink(htmllink){
    window.location.href=htmllink;
    }


function clearfavteam(){

    db.transaction(function(tx) {
        tx.executeSql('Update MobileApp_clubs set Fav = 0');
        console.log("Update INTO MobileApp_clubs");
    });
}

function addfavteam(ID){

    db.transaction(function(tx) {
        tx.executeSql('Update MobileApp_clubs set Fav = 1,Follow= 0 where ID=' + ID);
        console.log("Update INTO MobileApp_clubs");
    });
}

function addfavclub(){

    db.transaction(function(tx) {
        tx.executeSql('Update MobileApp_LastUpdatesec set hasclub = 1');
        console.log("Update MobileApp_LastUpdatesec");
    });
}


function clearfavclub(){
    var funcdate = new Date();
    var functime = funcdate.getTime();

    db.transaction(function(tx) {
        tx.executeSql('Update MobileApp_LastUpdatesec set hasclub = 0, hasclubdate = "' + functime + '"');
        console.log("Update MobileApp_LastUpdatesec");
    });
}


function goBack() {
    window.history.back()
}

