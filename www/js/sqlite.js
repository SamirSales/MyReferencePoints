var db = null;
var TABLE_REFERENCES = 'references';

document.addEventListener('deviceready', function() {
  db = window.sqlitePlugin.openDatabase({name: 'references.db', location: 'default'});

  if(db != null){
    db.transaction(function(tx) {
      tx.executeSql("CREATE TABLE IF NOT EXISTS '"+TABLE_REFERENCES+"' ('id', 'latitude', 'longitude', 'title', 'address');");
        // +'id INTEGER PRIMARY KEY AUTOINCREMENT, '
        // +'latitude INTEGER, '
        // +'longitude INTEGER, '
        // +'title TEXT, '
        // +'address TEXT)');
      tx.executeSql('INSERT INTO \''+TABLE_REFERENCES+'\' VALUES (?,?,?,?,?)', [null, 123456, 654321,'titulo do lugar','endereço']);
      tx.executeSql('INSERT INTO \''+TABLE_REFERENCES+'\' VALUES (?,?,?,?,?)', [null, 1256, 6521,'título 2 do lugar','endereço']);

    }, function(error) {
      console.log('Transaction ERROR: ' + error.message);
      alert('Transaction ERROR: ' + error.message);
    }, function() {
      console.log('Populated database OK');
      // alert('Populated database OK');
    });

    db.transaction(function(tx) {
        tx.executeSql('SELECT count(*) AS mycount FROM \'references\'', [], function(tx, rs) {
          console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
          alert('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
        }, function(tx, error) {
          console.log('SELECT error: ' + error.message);
          alert('SELECT error: ' + error.message);
        });
      });
  }
});
