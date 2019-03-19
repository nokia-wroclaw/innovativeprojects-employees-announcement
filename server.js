const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());



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
