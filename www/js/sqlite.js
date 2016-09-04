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
        +"'address' TEXT)");

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

// variables for loaction saving
// var idSelected = null;
// var titleToSave;
// var latToSave;
// var lngToSave;
// var addressToSave;

function saveNewLocation(idSelected, latToSave, lngToSave,titleToSave,addressToSave){
  db = window.sqlitePlugin.openDatabase({name: 'references.db', location: 'default'});
  if(db != null){
    db.transaction(function(tx) {
      tx.executeSql('INSERT INTO \''+TABLE_REFERENCES+'\' VALUES (?,?,?,?,?)',
      [idSelected, latToSave, lngToSave, titleToSave, addressToSave]);
    }, function(error) {
      console.log('Transaction ERROR: ' + error.message);
      alert('Transaction ERROR: ' + error.message);
    }, function() {
      console.log('Populated database OK');
    });
  }

}

var idForEditLocation;

function getAllLocationsDB(){
  if(db != null){
    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM \''+TABLE_REFERENCES+'\'', [], function(tx, rs) {

        for (i = 0; i < rs.rows.length; i++){
          const id = rs.rows.item(i).id;
          const latitude = rs.rows.item(i).latitude;
          const longitude = rs.rows.item(i).longitude;
          const title = rs.rows.item(i).title;
          const address = rs.rows.item(i).address;
          // alert(' [' + id+', '+latitude+', '+longitude+', '+title+', '+address+']');

          map.addMarker({
            'position': new plugin.google.maps.LatLng(latitude, longitude),
            'title': title,
            'snippet': "(click to edit)"
          }, function(marker) {
            marker.showInfoWindow();

            marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function() {
              // popup to save new location
              frameWork7.popup('.popup-services');
              $$("#address_pu").text(address);
              $$("#input_title_pu").val(title);

              idForEditLocation = id;
              // var parsedJson = JSON.parse(JSON.stringify(result.position));
              // markerSelectedLat = latitude; //parsedJson['lat'];
              // markerSelectedLng = longitude; //parsedJson['lng'];
              // $$("#latlng_pu").text('lat:'+markerSelectedLat+' long:'+markerSelectedLng);
              $$("#latlng_pu").text('lat:'+latitude+' long:'+longitude);
            });

          });
        }

      }, function(tx, error) {
        alert('TESTE SELECT error: ' + error.message);
      });
    });
  }
}

function removeLocationDB(id) {
    db.transaction(function (tx) {
        var query = "DELETE FROM '"+TABLE_REFERENCES+"' WHERE id = ?";

        tx.executeSql(query, [id], function (tx, res) {
            console.log("removeId: " + res.insertId);
            console.log("rowsAffected: " + res.rowsAffected);
        },
        function (tx, error) {
            console.log('DELETE error: ' + error.message);
        });
    }, function (error) {
        console.log('transaction error: ' + error.message);
    }, function () {
        console.log('transaction ok');
    });
}

function updateLocationDB(title, id) {
    db.transaction(function (tx) {
        var query = "UPDATE '"+TABLE_REFERENCES+"' SET title = ? WHERE id = ?";

        tx.executeSql(query, [title, id], function(tx, res) {
            console.log("insertId: " + res.insertId);
            console.log("rowsAffected: " + res.rowsAffected);
        },
        function(tx, error) {
            console.log('UPDATE error: ' + error.message);
        });
    }, function(error) {
        console.log('transaction error: ' + error.message);
    }, function() {
        console.log('transaction ok');
    });
}
