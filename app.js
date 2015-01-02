var express = require('express');
var app = express();
var port = 3000

var blocks = {
	'Fixed': 'Fastened securely in position',
	'Movable': 'Capable of being moved',
	'Rotating': 'Moving in a circle around its center'
};

var locations = {
	'Fixed': 'First floor', 'Movable': 'Second Floor', 'Rotating': 'Penthouse'
};

// MIDDLEWARE
var logger = require('./logger');
app.use(logger);
app.use(express.static('public'));
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

app.param('name', function (request, response, next) {
	var name = request.params.name;
	var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
	request.blockName = block;
	next();
});

// ROUTE INSTANCES
// ---------------
/* Replacing repetition with a ROUTE INSTANCE.
Using app.route is a recommended approach for avoiding duplicate route names
*/
	// var blocksRoute = app.route('/blocks')
	// blocksRoute.get(function(request, response){

	// });
	// blocksRoute.post(parseUrlencoded, function(request, response){

	// });
	/* 
	But the chaining functions on the route below is better */

// Chaining functions calls on a route can eliminate intermediate variables and 
// help our code stay more readable. This is a pttern commonly found in Express applications.
app.route('/blocks')
	.get(function(request, response){
		if (request.query.limit >= 0) {
			response.json(blocks.slice(0, request.query.limit))
		} else {
			response.json(Object.keys(blocks));
		}
	})
	.post(function(request, response){
		var newBlock = request.body;
		blocks[newBlock.name] = newBlock.description;
		response.status(201).json(newBlock.name);
	});

app.route('/blocks/:name')
	.get(function(request, response){
		var description = blocks[request.blockName];
		if (!description) {
			response.status(404).json('No description found for ' + request.params.name);
		} else {	
			response.json(description);
		}
	})
	.delete(function(request, response){
		delete blocks[request.blockName];
		response.sendStatus(200);
	});


app.get('/locations/:name', function(request, response){
	var description = locations[request.blockName];
	if (!description) {
		response.status(404).json('No description found for ' + request.params.name);
	} else {	
		response.json(description);
	}
});


// PORT
app.listen(port, function(){
	console.log('Listening on http://localhost:' + port + '/');
});