var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

var Hapi = require('hapi');
var server = new Hapi.Server({ port: 8080, host: 'localhost'});

server.route( [
    // Get tour list
    {
        method: 'GET',
        path: '/api/tours',
        config: {json: {space: 2}},
        handler: function(request, reply) {
          var findObject = {};
          for (var key in request.query){
            findObject[key] = request.query[key];
          }
          return collection.find(findObject).toArray();
        }
    },
    // Add new tour
    {
        method: 'POST',
        path: '/api/tours',
        config: {json: {space: 2}},
        handler: function(request, reply) {
          collection.insertOne(request.payload);
          return request.payload;
        }
    },
    // Get a single tour
    {
        method: 'GET',
        path: '/api/tours/{name}',
        config: {json: {space: 2}},
        handler: function(request, reply) {
          return collection.findOne({"tourName": request.params.name});
        }
    },
    // Update a single tour
    {
        method: 'PUT',
        path: '/api/tours/{name}',
        config: {json: {space: 2}},
        handler: function(request, reply) {
          if (request.query.replace == "true"){
            request.payload.tourName = request.params.name;
            collection.replaceOne(
              {"tourName":request.params.name},
              request.payload);
              return collection.findOne({"tourName":request.params.name});
          }else{
            collection.updateOne(
              {tourName:request.params.name},
              {$set: request.payload}
            );
            return collection.findOne({"tourName":request.params.name});
          }

        }
    },
    // Delete a single tour
    {
        method: 'DELETE',
        path: '/api/tours/{name}',
        handler: function(request, reply) {
          return "Deleting " + request.params.name;
        }
    },
    // Home page
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
          return "Hello world from Hapi/Mongo example.";
        }
    }
]);

MongoClient.connect(url, function(err, client){
  console.log("Connected successfully to server");
  var db = client.db('learning_mongo');
  collection = db.collection('tours');

  server.start(function(err) {
      console.log('Hapi is listening to http://localhost:8080')
  });
});
