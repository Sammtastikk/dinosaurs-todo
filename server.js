var express = require('express');
var fs = require('fs');
var app = express();
var jf = require("jsonfile");

// Generate random id
function createGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
  return v.toString(16);
  });
}

console.log(__dirname)
app.use(express.static(__dirname + '/client'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/', function(req, res) {
    fs.readFile('index.html', function (err, data) {
  		if (err) throw err;

  		res.send(data.toString());
	});
});

app.get ('/test', function (req, res){
  		var clay = {
  			"title": "my dummy to do item",
  			"completed": false,
  			"id": "7590287345098237459087"
  		}
	res.json (clay);
});

app.get ('/items', function (req, res){
  fs.readFile('data.json', function (err, data) {
    if (err) throw err;
    var dataitems=JSON.parse (data.toString());
    res.json (dataitems);
  });


});
  
app.get ('/items/:id', function (req, res){
  fs.readFile('data.json', function (err, data) {
    if (err) throw err;
    var dataitems=JSON.parse (data.toString());
    for (var i = 0; i < dataitems.length; i++) {
      if (dataitems[i].id === req.params.id) {
        res.json(dataitems[i]);
        return  
      }
    }; 
    res.send(404)
  }); 
});

app.delete('/item/:id', function (req,res) {
  fs.readFile('data.json', function(err, data) {
    if (err) throw err;
    var dataitems=JSON.parse (data.toString());
    var newdata = [];
    for (var i = 0; i < dataitems.length; i++) {
      if (dataitems[i].id === req.params.id) {
      }
      else {
        newdata.push(dataitems[i]);
      }
    }
    jf.writeFileSync(newdata,'data.json'); 
    res.send(200);
  }); 
});

app.post('/items', function (req,res) {
  console.log ("post is being called")
  fs.readFile('data.json', function(err, data) {
    if (err) throw err;
    var dataitems=JSON.parse (data.toString());
    var newItem = {title: req.body.title, completed: false, id: createGuid()}
    newItem = toString(newItem);

    dataitems.push(newItem);
    jf.writeFileSync('data.json', dataitems);
    res.send(200);
  }); 
});
 /*
 app.update ('/items/:id/:title', function (req, res){
  fs.readFile('data.json', function(err, data) {
    if (err) throw err;
    var dataitems=JSON.parse (data.toString());
    for (var i = 0; i < dataitems.length; i++) {
      if (dataitems[i].id === req.params.id) {
        dataitems[i].id = req.params.id;  
      }
    };
    jf.writeFileSync(dataitems,"data.json"); 
    res.send(200);
  }); 
});
*/

console.log("Starting to listen");

var server = app.listen(3000, function() {
    console.log('Listening on port' + server.address().port);
});

console.log("Waiting for server to start")