var db = null;
var TABLE_REFERENCES = 'references';
var sqlExec;

function addLocationDB(latitude, longitude, title, address){
  sqlExec.executeSql('INSERT INTO \''+TABLE_REFERENCES+'\' VALUES (?,?,?,?,?)',
  [null, latitude, longitude,title,address]);
}

document.addEventListener('deviceready', function() {
  db = window.sqlitePlugin.openDatabase({name: 'references.db', location: 'default'});

  if(db != null){
    db.transaction(function(tx) {
      sqlExec = tx;
      tx.executeSql("CREATE TABLE IF NOT EXISTS '"+TABLE_REFERENCES+"' ("
        +"'id' INTEGER PRIMARY KEY, "
        +"'latitude' INTEGER, "
        +"'longitude' INTEGER, "
        +"'title' TEXT, "
        +"address TEXT)");

      // addLocationDB(-3.746286, -38.562930,'Av Humberto Monte','uma avenida');
      // addLocationDB(-3.746363, -38.532673,'Av 13 de Maio','uma avenida');
      // addLocationDB(-3.719266, -38.516538,'Rua dos Tabajaras','Perto do Mambembe');

    }, function(error) {
      console.log('Transaction ERROR: ' + error.message);
      alert('Transaction ERROR: ' + error.message);
    }, function() {
      console.log('Populated database OK');
      // alert('Populated database OK');
    });

    // db.transaction(function(tx) {
    //     tx.executeSql('SELECT count(*) AS mycount FROM \'references\'', [], function(tx, rs) {
    //       console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
    //       alert('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
    //     }, function(tx, error) {
    //       console.log('SELECT error: ' + error.message);
    //       alert('SELECT error: ' + error.message);
    //     });
    //   });
  }
});

function getAllLocationsDB(){
  if(db != null){
    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM \''+TABLE_REFERENCES+'\'', [], function(tx, rs) {

        for (i = 0; i < rs.rows.length; i++){
          var id = rs.rows.item(i).id;
          var latitude = rs.rows.item(i).latitude;
          var longitude = rs.rows.item(i).longitude;
          var title = rs.rows.item(i).title;
          var address = rs.rows.item(i).address;
          // alert(' [' + id+', '+latitude+', '+longitude+', '+title+', '+address+']');

          map.addMarker({
            'position': new plugin.google.maps.LatLng(latitude, longitude),
            'title': title.toUpperCase(),
            'snippet': "(click to save)"
          }, function(marker) {
            marker.showInfoWindow();
          });
        }

      }, function(tx, error) {
        alert('TESTE SELECT error: ' + error.message);
      });
    });
  }
}
