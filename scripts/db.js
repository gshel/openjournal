let db;
let dbReq = indexedDB.open('myDatabase', 1);
dbReq.onupgradeneeded = function(event) {
  // Set the db variable to our database so we can use it!  
  db = event.target.result;

  // Create an object store named notes. Object stores
  // in databases are where data are stored.
  let activites = db.createObjectStore('activities', {autoIncrement: true});
  let entries = db.createObjectStore('entries', {autoIncrement: true});
}
dbReq.onsuccess = function(event) {
  db = event.target.result;
}
dbReq.onerror = function(event) {
  alert('error opening database ' + event.target.errorCode);
}

function addEntry(db, message) {
  // Start a database transaction and get the entries object store
  let tx = db.transaction(['entries'], 'readwrite');
  let store = tx.objectStore('entries');
  // Put the entry into the object store
  let entry = {text: message, timestamp: Date.now()};
  store.add(entry);
  // Wait for the database transaction to complete
  tx.oncomplete = function() { console.log('stored entry!') }
  tx.onerror = function(event) {
    alert('error storing entry ' + event.target.errorCode);
  }
}

function submitEntry() {
  let message = document.getElementById('newmessage');
  addEntry(db, message.value);
  message.value = '';
}