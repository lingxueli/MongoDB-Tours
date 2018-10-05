var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

var findDocuments = function(db, callback){
    var collection = db.collection('tours');

    collection.find().toArray(function(err, docs){
      console.log(docs);
      callback;
    });
}
MongoClient.connect(url, function(err, client){
  console.log("Connected successfully to server");
  var db = client.db('learning_mongo');
  findDocuments(db, function(){
    db.close();
  });
})
