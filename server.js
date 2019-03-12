const express = require('express');
const app = express();

const port = 5000;

const dbURL = "localhost:27017/announcements";

app.get('/api/authors', function(request, response) {
  const authors = [
    { id: 1, firstName: 'Dawid', lastName: 'Białek'},
    { id: 2, firstName: 'Łukasz', lastName: 'Gil'},
    { id: 3, firstName: 'Szymon', lastName: 'Bal'},
    { id: 4, firstName: 'Kamil', lastName: 'Śliwa'}
  ];
  response.json(authors);
});


app.listen(port, function() {
  console.log(`Listening at Port ${port}`);
});

//sample db connection
var monk = require('monk');
var db = monk(dbURL);

app.get('/authorsFromDB', function(reqest, resolution){
  var db = request.db;
  var collection = db.get('authors');

  resolution.json(collection);
});


