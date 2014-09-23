var db;
var dbCreated = false;

var d = new Date();
//alert(d);
var day = d.getDate();
var month = d.getMonth();
var year = d.getFullYear();
var hours= d.getHours();

var datenow = (day + '' + month+ '' + year + '' + hours);
var milliesecs = d.getTime();
var datenowsec = Math.round((milliesecs/1000));
var golbaltoken= "";


//alert (datenowsec);

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
    console.log("LOCALDB - Database ready");
    db.transaction(populateDB, errorCB, successCB);
}
db.transaction(populateDB, errorCB, successCB);

function loadnewtable(){
    $('#busy').show();

    var token = rand() + rand();
    golbaltoken = token;
    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO MobileApp_LastUpdatesec (Datesecs,datemenus,syncwifi,isadmin,token) VALUES ("0", "0",0,0,"' + token + '")');
        console.log("INSERT INTO MobileApp_LastUpdatesec");
    });




    db.transaction(populateDB, errorCB, displayupdatenow);

    passdatatoserver();
}




function populateDB1(tx,results) {
    var row = results.rows.item(0);
    //alert(row.Count);
    $('#busy').show();
    if(row.Count ==0){
           var token = rand() + rand() + rand() + rand();

        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO MobileApp_LastUpdatesec (Datesecs,datemenus,syncwifi,isadmin,token) VALUES ("0", "0",0,0,"' + token + '")');
            console.log("INSERT INTO MobileApp_LastUpdatesec");
        });

        db.transaction(populateDB, errorCB, successCB);



    }else{
        var sql = "select Datesecs,datemenus from MobileApp_LastUpdatesec";
        tx.executeSql(sql, [], getchecksync,getchecksyncerror);
    }

}

var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

function populateDB(tx){
    $('#busy').show();
    var sql = "select Count(Datesecs) as Count from MobileApp_LastUpdatesec";
    tx.executeSql(sql, [], populateDB1,getchecksyncerror);

}



function getchecksyncerror(err)
{
    console.log(err.message);
//alert(err.message);
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

        var row = results.rows.item(0);

       // alert('http://centralfootball.neosportz.com/databen.aspx?sec=' + row.Datesecs);

        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'http://centralfootball.neosportz.com/databen.aspx?sec=' + row.Datesecs, false);
        xmlHttp.send(null);

        var json = xmlHttp.responseText;

        var obj = JSON.parse(json);
         // alert(obj.vwApp_News_v_2[0].Body);
        var datemenus= row.datemenus;

       // alert("datemenus=" +  row.datemenus);

        if(datemenus != datenow) {

            db.transaction(function(tx) {
                tx.executeSql('Drop TABLE MobileApp_Results_Menu ');
                console.log("MobileApp_Results_Menu table is Dropped");
            });
            db.transaction(function(tx) {
                tx.executeSql('Drop TABLE MobileApp_Schedule_Menu ');
                console.log("MobileApp_Schedule_Menu table is Dropped");
            });
            db.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS MobileApp_Schedule_Menu (_id INTEGER NOT NULL, DivisionName TEXT NOT NULL,DivisionID INTEGER NOT NULL,UpdateDateUTC TEXT NULL,DatetimeStart TEXT NOT NULL,DivisionOrderID INTEGER NOT NULL)');
                console.log("MobileApp_Schedule_Menu table is created");
            });
             db.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS MobileApp_Results_Menu (_id INTEGER NOT NULL, DivisionName TEXT NOT NULL,DivisionID INTEGER NOT NULL,UpdateDateUTC TEXT NULL,DatetimeStart TEXT NOT NULL,DivisionOrderID INTEGER NOT NULL)');
                console.log("MobileApp_Results_Menu table is created");
             });


            $.each(obj.App_Schedule_Menu, function (idx, obj) {
                db.transaction(function(tx) {
                    tx.executeSql('INSERT INTO MobileApp_Schedule_Menu (_id, DivisionName,DivisionID ,UpdateDateUTC ,DatetimeStart,DivisionOrderID ) VALUES (' + obj._id + ',"' + obj.DivisionName + '", ' + obj.DivisionID + ',"' + obj.UpdateDateUTC + '", "' + obj.DatetimeStart + '", ' + obj.DivisionOrderID + ' )');
                    console.log("INSERT INTO MobileApp_Schedule_Menu is created");
                });
            });

            $.each(obj.App_Results_Menu, function (idx, obj) {
                db.transaction(function(tx) {
                    tx.executeSql('INSERT INTO MobileApp_Results_Menu (_id, DivisionName,DivisionID ,UpdateDateUTC ,DatetimeStart,DivisionOrderID ) VALUES (' + obj._id + ',"' + obj.DivisionName + '", ' + obj.DivisionID + ',"' + obj.UpdateDateUTC + '", "' + obj.DatetimeStart + '", ' + obj.DivisionOrderID + ' )');
                    console.log("INSERT INTO MobileApp_Results_Menu is created");
                });
            });



        $.each(obj.App_Results, function (idx, obj) {
            db.transaction(function(tx) {
                tx.executeSql('Delete from MobileApp_Results where ID =' + obj.ID);
                console.log('Delete MobileApp_Results where ID');
            });
            db.transaction(function(tx) {
                tx.executeSql('INSERT INTO MobileApp_Results(ID,_id,DatetimeStart,HomeName,AwayName,Field,Latitude,Longitude,DivisionID ,DivisionName,HomeClubID,AwayClubID,HomeTeamID,AwayTeamID,HomeScore ,AwayScore ,UpdateDateUTC ,TournamentName,TournamentID ,DatetimeStartSeconds ,DivisionOrderID,ShowToAll,Final ) VALUES (' + obj.ID + ',' + obj._id + ',"' + obj.DatetimeStart + '","' + obj.HomeName + '","' + obj.AwayName + '","' + obj.Field + '","' + obj.Latitude + '","' + obj.Longitude + '", ' + obj.DivisionID + ',"' + obj.DivisionName + '", ' + obj.HomeClubID + ', ' + obj.AwayClubID + ', ' + obj.HomeTeamID + ', ' + obj.AwayTeamID + ', ' + obj.HomeScore + ',' + obj.AwayScore + ' , "' + obj.UpdateDateUTC + '", "' + obj.TournamentName + '",' + obj.TournamentID + ', "' + obj.DatetimeStartSeconds + '",' + obj.DivisionOrderID + ',' + obj.ShowToAll + ',' + obj.Final + ' )');
                console.log("INSERT INTO MobileApp_Results is created");
            });
        });



        $.each(obj.clubs, function (idx, obj) {
            db.transaction(function(tx) {
                tx.executeSql('Delete from MobileApp_clubs where ID =' + obj.ID);
            });
                console.log('Delete MobileApp_clubs where ID');
            db.transaction(function(tx) {
                tx.executeSql('INSERT INTO MobileApp_clubs(ID,_id ,name,UpdateDateUTC,UpdateDateUTCBase64 ,Base64,History,Contacts,UpdateSecondsUTC,UpdateSecondsUTCBase64,Color,Fav,Follow) VALUES (' + obj.ID + ',' + obj._id + ',"' + obj.name + '","' + obj.UpdateDateUTC + '","' + obj.UpdateDateUTCBase64 + '","' + obj.Base64 + '","' + obj.History + '","' + obj.Contacts + '","' + obj.UpdateSecondsUTC + '","' + obj.UpdateSecondsUTCBase64 + '", "' + obj.Color + '",0,0)');
                console.log("INSERT INTO MobileApp_clubs is created");
            });
        });


        $.each(obj.App_Schedule, function (idx, obj) {
            db.transaction(function(tx) {
                tx.executeSql('Delete from MobileApp_Schedule where ID =' + obj.ID);
                console.log('Delete MobileApp_Schedule where ID');
            });
            db.transaction(function(tx) {
                tx.executeSql('INSERT INTO MobileApp_Schedule(ID,_id,DatetimeStart,HomeName,AwayName,Field,Latitude,Longitude,DivisionID ,DivisionName,HomeClubID,AwayClubID,HomeTeamID,AwayTeamID ,UpdateDateUTC ,TournamentName,TournamentID ,DatetimeStartSeconds ,DivisionOrderID,ShowToAll,Final,Cancel ) VALUES (' + obj.ID + ',' + obj._id + ',"' + obj.DatetimeStart + '","' + obj.HomeName + '","' + obj.AwayName + '","' + obj.Field + '","' + obj.Latitude + '","' + obj.Longitude + '", ' + obj.DivisionID + ',"' + obj.DivisionName + '", ' + obj.HomeClubID + ', ' + obj.AwayClubID + ', ' + obj.HomeTeamID + ', ' + obj.AwayTeamID + ',"' + obj.UpdateDateUTC + '", "' + obj.TournamentName + '",' + obj.TournamentID + ', "' + obj.DatetimeStartSeconds + '",' + obj.DivisionOrderID + ',' + obj.ShowToAll + ',' + obj.Final + ',' + obj.Cancel + ' )');
                console.log("INSERT INTO MobileApp_Schedule is created");
            });
        });


        $.each(obj.clubsimages, function (idx, obj) {
            db.transaction(function(tx) {
                tx.executeSql('Delete from MobileApp_clubsimages where ID =' + obj.ID);
                console.log('Delete MobileApp_clubsimages where ID');
        });
        db.transaction(function(tx) {
                tx.executeSql('INSERT INTO MobileApp_clubsimages(ID,_id,UpdateDateUTCBase64,Base64,UpdateSecondsUTCBase64) VALUES (' + obj.ID + ',' + obj._id + ',"' + obj.UpdateDateUTCBase64 + '","' + obj.Base64 + '","' + obj.UpdateSecondsUTCBase64 + '")');
                console.log("INSERT INTO MobileApp_clubsimages is created");
            });

        });

        $.each(obj.vwApp_Teams, function (idx, obj) {
            db.transaction(function(tx) {
                tx.executeSql('Delete from MobileApp_vwApp_Teams where ID =' + obj.ID);
                console.log('Delete MobileApp_vwApp_Teams where ID');
            });
            db.transaction(function(tx) {
                tx.executeSql('INSERT INTO MobileApp_vwApp_Teams(ID,_id,Name,Base64,ClubID,DivisionID,DivisionName,UpdateSecondsUTC,UpdateSecondsUTCBase64,UpdateDateUTC,UpdateDateUTCBase64 ) VALUES (' + obj.ID + ',' + obj._id + ',"' + obj.Name + '","' + obj.Base64 + '",' + obj.ClubID + ',' + obj.DivisionID + ',"' + obj.DivisionName + '","' + obj.UpdateSecondsUTC + '","' + obj.UpdateSecondsUTCBase64 + '","' + obj.UpdateDateUTC + '","' + obj.UpdateDateUTCBase64 + '")');
                console.log("INSERT INTO MobileApp_vwApp_Teams is created");
            });
        });

        $.each(obj.vwApp_News_v_2, function (idx, obj) {
            db.transaction(function(tx) {
                tx.executeSql('Delete from MobilevwApp_News_v_2 where ID =' + obj.ID);
                console.log('Delete MobilevwApp_News_v_2 where ID');
            });
               db.transaction(function(tx) {
                tx.executeSql('INSERT INTO MobilevwApp_News_v_2(ID,_id,UpdateDateUTC,Title,Body,ClubID,TeamID,Hide,IsAd,Base64,URL,Hint,DisplayDateUTC,DisplaySecondsUTC) VALUES (' + obj.ID + ',' + obj._id + ',"' + obj.UpdateDateUTC + '","' + obj.Title + '","' + obj.Body + '",' + obj.ClubID + ',"' + obj.TeamID + '","' + obj.Hide + '","' + obj.IsAd + '","' + obj.Base64 + '","' + obj.URL + '","' + obj.Hint + '","' + obj.DisplayDateUTC + '","' + obj.DisplaySecondsUTC + '")');
                console.log("INSERT INTO MobilevwApp_News_v_2 is created");
            });
        });

    $.each(obj.App_Players, function (idx, obj) {
        db.transaction(function(tx) {
            tx.executeSql('Delete from MobilevwApp_Base_Players where ID =' + obj.ID);
            console.log('Delete MobilevwApp_Base_Players where ID');
        });
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO MobilevwApp_Base_Players(ID,_id,ClubID,FullName,Base64,TeamID,UpdateSecondsUTC,UpdateSecondsUTCBase64,UpdateDateUTC,UpdateDateUTCBase64,Position) VALUES (' + obj.ID + ',' + obj._id + ',' + obj.ClubID + ',"' + obj.FullName + '","' + obj.Base64 + '","' + obj.TeamID + '","' + obj.UpdateSecondsUTC + '","' + obj.UpdateSecondsUTCBase64 + '","' + obj.UpdateDateUTC + '","' + obj.UpdateDateUTCBase64 + '","' + obj.Position + '")');
            console.log("INSERT INTO MobilevwApp_Base_Players is created");
        });
    });
    $.each(obj.App_Players_Images, function (idx, obj) {
        db.transaction(function(tx) {
            tx.executeSql('Delete from MobileApp_Players_Images where ID =' + obj.ID);
            console.log('Delete MobileApp_Players_Images where ID');
        });
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO MobileApp_Players_Images(ID,_id,Base64,UpdateDateUTCBase64,UpdateSecondsUTCBase64) VALUES (' + obj.ID + ',' + obj._id + ',"' + obj.Base64 + '","' + obj.UpdateDateUTCBase64 + '","' + obj.UpdateSecondsUTCBase64 + '")');
            console.log("INSERT INTO MobileApp_Players_Images is created");
        });
    });

    $.each(obj.ScoringTable, function (idx, obj) {
        db.transaction(function(tx) {
            tx.executeSql('Delete from MobileScoringTable where Name =' + obj.Name);
            console.log('Delete MobileScoringTable');
        });
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO MobileScoringTable(Name,Value,UpdatedateUTC) VALUES ("' + obj.Name + '","' + obj.Value + '","' + obj.UpdatedateUTC + '")');
            console.log("INSERT INTO MobileScoringTable is created");
        });
    });
        }

        db.transaction(function(tx) {
            tx.executeSql('Update MobileApp_LastUpdatesec set Datesecs = "' + datenowsec + '",datemenus= "' + datenow + '"');
            console.log("Update INTO MobileApp_LastUpdatesec");
        });

    $('#busy').hide();

}





function errorCB(err) {
    console.log("Error processing SQL: "+err.message);
    //alert("Error processing SQL loaddata: "+err.code);
}
function errorInQuery(err) {
    console.log("Error processing check MobileApp_Schedule_Menu SQL: "+err.message);
    //alert("Error processing SQL loaddata: "+err.code);
}


// Transaction success callback
//
function successCB() {
   // alert("success!");
}


function successinsert(string) {
    console.log("Correct Insert into " + string + "");
}
function failedinsert(string) {
    console.log("Error processing SQL: Insert into " + string + "");
    //alert("Error processing SQL loaddata: "+err.code);
}

function failedinsert1(string) {
    console.log("Error processing SQL1: Insert into " + string + "");
    //alert("Error processing SQL loaddata: "+err.code);
}





