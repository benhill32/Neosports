var db;
var dbCreated = false;
var id = getUrlVarsfunc()["id"];

db = window.openDatabase("Neosportz_Football", "1.1", "Neosportz_Football", 200000);
console.log("LOCALDB - Database ready");
db.transaction(getstandings, errorCBfunc, successCBfunc);

function getstandings(tx) {
    var sql = "select _id,Games,Won,Drawn,Lost,ForScore,AgainstScore,Difference,ClubID,Name,TournamentID,FlagPoints,UpdateDateUTC ,TournamentName from MobileStandings where TournamentID = '" + id + "'  order by Won DESC";
    tx.executeSql(sql, [], getstandings_success);
}

function getstandings_success(tx, results) {
    $('#busy').hide();
    var len = results.rows.length;
//alert(len);
    $('#divstandings').append('<Div align="left" id="idteamname" style="float: left;" ></Div>');

    $('#divstandings').append('<Div align="left" id="idgamesp"  style="float: left;" ></Div>');
    $('#divstandings').append('<Div align="left" id="idgamesW"  style="float: left;" ></Div>');
    $('#divstandings').append('<Div align="left" id="idgamesD"  style="float: left;" ></Div>');
    $('#divstandings').append('<Div align="left" id="idgamesL"  style="float: left;" ></Div>');
    $('#divstandings').append('<Div align="right" id="idgamesFP"  style="float: left;" ></Div>');


    $('#idteamname').append('<Div  class="standheader" >Team name</Div>');
    $('#idgamesp').append('<Div  class="standheader" >P</Div>');
    $('#idgamesW').append('<Div  class="standheader" >W</Div>');
    $('#idgamesD').append('<Div  class="standheader" >D</Div>');
    $('#idgamesL').append('<Div  class="standheader" >L</Div>');
    $('#idgamesFP').append('<Div  class="standheader" >FP</Div>');

    for (var i=0; i<len; i++) {
        var menu = results.rows.item(i);

        $('#idteamname').append('<Div style="padding:5px;"  >' + menu.Name + '</Div>');
        $('#idgamesp').append('<Div  style="padding:5px;" >' + menu.Games + '</Div>');
        $('#idgamesW').append('<Div  style="padding:5px;" >' + menu.Won + '</Div>');
        $('#idgamesD').append('<Div  style="padding:5px;" >' + menu.Drawn + '</Div>');
        $('#idgamesL').append( '<Div  style="padding:5px;" >' + menu.Lost + '</Div>');
        $('#idgamesFP').append('<Div  style="padding:5px;" >' + menu.FlagPoints + '</Div>');

    }

    $('#idteamname').append('<Div  class="standfooter" ></Div>');
    $('#idgamesp').append('<Div  class="standfooter" ></Div>');
    $('#idgamesW').append('<Div  class="standfooter" ></Div>');
    $('#idgamesD').append('<Div  class="standfooter" ></Div>');
    $('#idgamesL').append('<Div  class="standfooter" ></Div>');
    $('#idgamesFP').append('<Div  class="standfooter" ></Div>');



 //   '<Div class="floatL hide">' + menu.AgainstScore + '</Div>' +
  //  '<Div class="floatL hide">' + menu.Difference + '</Div>' +
  //  '<Div class="floatL">' + menu.FlagPoints + '</Div>' +

}

