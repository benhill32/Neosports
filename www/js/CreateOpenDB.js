var db;
var dbCreated = false;

db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
console.log("LOCALDB - Database ready");
db.transaction(createDB, errorCBfunc, successCBfunc);

function droptables(){

    db.transaction(function(tx) {
        tx.executeSql('Drop TABLE MobileApp_Results_Menu ');
        console.log("MobileApp_Results_Menu table is Dropped");
    });
    db.transaction(function(tx) {
        tx.executeSql('Drop TABLE MobileApp_Schedule_Menu ');
        console.log("MobileApp_Schedule_Menu table is Dropped");
    });
    db.transaction(function(tx) {
        tx.executeSql('Drop TABLE MobileApp_LastUpdatesec ');
        console.log("MobileApp_LastUpdatesec table is Dropped");
    });
    db.transaction(function(tx) {
        tx.executeSql('Drop TABLE MobileApp_Results ');
        console.log("MobileApp_Results table is Dropped");
    });
    db.transaction(function(tx) {
        tx.executeSql('Drop TABLE MobileApp_clubs ');
        console.log("MobileApp_clubs table is Dropped");
    });
    db.transaction(function(tx) {
        tx.executeSql('Drop TABLE MobileApp_Schedule ');
        console.log("MobileApp_Schedule table is Dropped");
    });
    db.transaction(function(tx) {
        tx.executeSql('Drop TABLE MobileApp_clubsimages ');
        console.log("MobileApp_clubsimages table is Dropped");
    });
    db.transaction(function(tx) {
        tx.executeSql('Drop TABLE MobileApp_vwApp_Teams ');
        console.log("MobileApp_vwApp_Teams table is Dropped");
    });
    db.transaction(function(tx) {
        tx.executeSql('Drop TABLE MobilevwApp_Base_Players ');
        console.log("MobilevwApp_Base_Players table is Dropped");
    });
    db.transaction(function(tx) {
        tx.executeSql('Drop TABLE MobilevwApp_News_v_2 ');
        console.log("MobilevwApp_News_v_2 table is Dropped");
    });
    db.transaction(function(tx) {
        tx.executeSql('Drop TABLE MobileApp_Players_Images ');
        console.log("MobileApp_Players_Images table is Dropped");
    });
    db.transaction(function(tx) {
        tx.executeSql('Drop TABLE MobileStandings ');
        console.log("MobileStandings table is Dropped");
    });

    db.transaction(function(tx) {
        tx.executeSql('Drop TABLE Mobilesponsorsclub ');
        console.log("Mobilesponsorsclub table is Dropped");
    });


    db.transaction(function(tx) {
        tx.executeSql('Drop TABLE Mobilescreenimage ');
        console.log("Mobilescreenimage table is Dropped");
    });

}

function createDB(tx) {
  //  tx.executeSql('Drop TABLE MobileApp_LastUpdatesec ');
  //  console.log("MobileApp_LastUpdatesec table is Dropped");
    tx.executeSql('CREATE TABLE IF NOT EXISTS MobileApp_LastUpdatesec ( Datesecs TEXT NULL, datemenus TEXT NULL,syncwifi INTEGER NOT NULL,isadmin INTERGER NOT NULL,token TEXT NOT NULL,hasclub INTERGER NOT NULL,hasclubdate TEXT NULL)');
    console.log("MobileApp_LastUpdatesec table is created");
 //   tx.executeSql('INSERT INTO MobileApp_LastUpdatesec (Datesecs,datemenus) VALUES ("0", "0" )');
 //   console.log("INSERT INTO MobileApp_LastUpdatesec");
    tx.executeSql('CREATE TABLE IF NOT EXISTS MobileApp_Results (ID INTEGER NOT NULL,_id INTEGER NOT NULL,DatetimeStart TEXT NOT NULL,HomeName TEXT NOT NULL,AwayName TEXT NOT NULL,Field TEXT NOT NULL,Latitude TEXT NOT NULL,Longitude TEXT NOT NULL,DivisionID INTEGER NOT NULL,DivisionName TEXT NOT NULL,HomeClubID INTEGER NOT NULL,AwayClubID INTEGER NOT NULL,HomeTeamID INTEGER NOT NULL,AwayTeamID INTEGER NOT NULL,HomeScore INTEGER NOT NULL,AwayScore INTEGER NOT NULL,UpdateDateUTC TEXT NOT NULL,TournamentName TEXT NOT NULL,TournamentID INTEGER NOT NULL,DatetimeStartSeconds TEXT NOT NULL,DivisionOrderID INTEGER NOT NULL,ShowToAll INTEGER NOT NULL,Final INTEGER NOT NULL )');
    console.log("MobileApp_Results table is created");
   // tx.executeSql('Drop TABLE MobileApp_clubs ');
    // console.log("MobileApp_Results_Menu table is Dropped");
    tx.executeSql('CREATE TABLE IF NOT EXISTS MobileApp_clubs (ID INTEGER NOT NULL,_id INTEGER NOT NULL,name TEXT NOT NULL,UpdateDateUTC TEXT NOT NULL,UpdateDateUTCBase64 TEXT NOT NULL,Base64 TEXT NULL,History TEXT NULL,Contacts TEXT NULL,UpdateSecondsUTC TEXT NULL,UpdateSecondsUTCBase64 TEXT NULL,Color TEXT NULL, Fav INTEGER NOT NULL, Follow INTEGER NOT NULL )');
    console.log("Mobileclubs table is created");
    tx.executeSql('CREATE TABLE IF NOT EXISTS MobileApp_Schedule (ID INTEGER NOT NULL,_id INTEGER NOT NULL,DatetimeStart TEXT NOT NULL,HomeName TEXT NOT NULL,AwayName TEXT NOT NULL,Field TEXT NOT NULL,Latitude TEXT NOT NULL,Longitude TEXT NOT NULL,DivisionID INTEGER NOT NULL,DivisionName TEXT NOT NULL,HomeClubID INTEGER NOT NULL,AwayClubID INTEGER NOT NULL,HomeTeamID INTEGER NOT NULL,AwayTeamID INTEGER NOT NULL,UpdateDateUTC TEXT NOT NULL,TournamentName TEXT NOT NULL,TournamentID INTEGER NOT NULL,DatetimeStartSeconds TEXT NOT NULL,DivisionOrderID INTEGER NOT NULL,ShowToAll INTEGER NOT NULL,Final INTEGER NOT NULL,Cancel INTEGER NOT NULL )');
    console.log("MobileApp_Schedule table is created");
    tx.executeSql('CREATE TABLE IF NOT EXISTS MobileApp_clubsimages (ID INTEGER NOT NULL,_id INTEGER NOT NULL,UpdateDateUTCBase64 TEXT NULL,Base64 TEXT NULL,UpdateSecondsUTCBase64 TEXT NOT NULL)');
    console.log("MobileApp_clubsimages table is created");
    tx.executeSql('CREATE TABLE IF NOT EXISTS MobileApp_vwApp_Teams (ID INTEGER NOT NULL,_id INTEGER NOT NULL,Name TEXT NOT NULL,Base64 TEXT NULL,ClubID INTEGER NOT NULL,DivisionID INTEGER NOT NULL,DivisionName TEXT NOT NULL,UpdateSecondsUTC TEXT NOT NULL,UpdateSecondsUTCBase64 TEXT NOT NULL,UpdateDateUTC TEXT NOT NULL,UpdateDateUTCBase64 TEXT NOT NULL)');
    console.log("MobileApp_vwApp_Teams table is created");

    tx.executeSql('CREATE TABLE IF NOT EXISTS MobilevwApp_Base_Players (ID INTEGER NOT NULL,_id INTEGER NOT NULL,ClubID INTEGER NOT NULL,FullName TEXT NOT NULL,Base64 TEXT NULL,TeamID INTEGER NOT NULL,UpdateSecondsUTC TEXT NOT NULL,UpdateSecondsUTCBase64 TEXT NOT NULL,UpdateDateUTC TEXT NOT NULL,UpdateDateUTCBase64 TEXT NOT NULL,Position TEXT NOT NULL)');
    console.log("MobilevwApp_Base_Players table is created");

    tx.executeSql('CREATE TABLE IF NOT EXISTS MobileApp_Players_Images (ID INTEGER NOT NULL,_id INTEGER NOT NULL,Base64 TEXT NULL,UpdateDateUTCBase64 TEXT NOT NULL,UpdateSecondsUTCBase64 TEXT NOT NULL)');
    console.log("MobileApp_Players_Images table is created");
    //alert('CREATE TABLE IF NOT EXISTS MobilevwApp_News_v_2 (ID INTEGER NOT NULL,_id INTEGER NOT NULL,UpdateDateUTC TEXT NULL,Title TEXT NOT NULL,Body NOT TEXT NULL,ClubID INTEGER NOT NULL,TeamID INTEGER NULL,Hide INTEGER NULL,IsAd INTEGER NULL,Base64 TEXT NULL,URL TEXT NULL,Hint TEXT NULL,DisplayDateUTC TEXT NOT NULL,DisplaySecondsUTC TEXT NOT NULL');

    tx.executeSql('CREATE TABLE IF NOT EXISTS MobilevwApp_News_v_2 (ID INTEGER NOT NULL,_id INTEGER NOT NULL,UpdateDateUTC TEXT NULL,Title TEXT NOT NULL,Body TEXT NULL,ClubID INTEGER NOT NULL,TeamID TEXT NULL,Hide TEXT NULL,IsAd TEXT NULL,Base64 TEXT NULL,URL TEXT NULL,Hint TEXT NULL,DisplayDateUTC TEXT NOT NULL,DisplaySecondsUTC TEXT NOT NULL)');
    console.log("MobilevwApp_News_v_2 table is created");

    tx.executeSql('CREATE TABLE IF NOT EXISTS MobileScoringTable (Name TEXT NULL, Value INTEGER NOT NULL,UpdatedateUTC TEXT NULL)');
    console.log("MobileScoringTable table is created");

    tx.executeSql('CREATE TABLE IF NOT EXISTS MobileStandings (_id INTEGER NOT NULL,Games INTEGER NOT NULL,Won INTEGER NOT NULL,Drawn INTEGER NOT NULL,Lost INTEGER NOT NULL,ForScore INTEGER NOT NULL,AgainstScore INTEGER NOT NULL,Difference INTEGER NOT NULL,ClubID INTEGER NOT NULL,Name TEXT NULL,TournamentID INTEGER NOT NULL,FlagPoints INTEGER NOT NULL,UpdateDateUTC TEXT NULL,TournamentName TEXT NULL)');
    console.log("MobileScoringTable table is created");

    tx.executeSql('CREATE TABLE IF NOT EXISTS Mobilesponsorsclub (ID INTEGER NOT NULL,Datetime TEXT NULL,Club INTEGER NOT NULL,Name TEXT NOT NULL,Website TEXT NULL,Image TEXT NULL,UserID TEXT NULL,OrderBy INTEGER NULL,Base64 TEXT NULL,CreatedateUTC TEXT NULL,UpdatedateUTC TEXT NULL,DeletedateUTC TEXT NULL,UpdatedateUTCBase64 TEXT NULL)');
    console.log("Mobilesponsorsclub table is created");


    tx.executeSql('CREATE TABLE IF NOT EXISTS Mobilescreenimage (_id INTEGER NOT NULL,Base64 TEXT NULL,BackgroundColor TEXT NULL,SoftwareFade TEXT NULL,UpdateDateUTC TEXT NULL,TopText TEXT NULL,BottomText TEXT NULL)');
    console.log("Mobilescreenimage table is created");
}




