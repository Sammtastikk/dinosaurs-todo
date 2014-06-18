var express = require('express');
var fs = require('fs');
var app = express();
var jf = require("jsonfile");

console.log(__dirname)
app.use(express.static(__dirname + '/client'));

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

app.create('/item/', function (req,res) {
  fs.readFile('data.json', function(err, data) {
    if (err) throw err;
    var dataitems=JSON.parse (data.toString());
    dataitems.push(req.params);
    jf.writeFileSync(dataitems,'data.json');
    res.send(200);
  }); 
});
 
 app.update ('/items/:id', function (req, res){
  fs.readFile('data.json', function(err, data) {
    if (err) throw err;
    var dataitems=JSON.parse (data.toString());
    for (var i = 0; i < dataitems.length; i++) {
      if (dataitems[i].id === req.params.id) {
        dataitems[i] = req.params;  
      }
    };
    jf.writeFileSync(dataitems,"data.json"); 
    res.send(200);
  }); 
});

console.log("Starting to listen");

var server = app.listen(3000, function() {
    console.log('Listening on port' + server.address().port);
});

console.log("Waiting for server to start")