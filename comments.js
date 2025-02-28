// Create web server
//
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Read comments from file
app.get('/comments', function(req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log('Error: ' + err);
      res.send('Error: ' + err);
      return;
    }
    res.send(data);
  });
});

// Write comments to file
app.post('/comments', function(req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log('Error: ' + err);
      res.send('Error: ' + err);
      return;
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.log('Error: ' + err);
        res.send('Error: ' + err);
        return;
      }
      res.send(comments);
    });
  });
});

// Start server
var server = app.listen(3000, function() {
  console.log('Server listening on port 3000');
});