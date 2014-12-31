var express = require('express');
var app = express();
var port = 3000

var blocks = {
	'Fixed': 'Fastened securely in position',
	'Movable': 'Capable of being moved',
	'Rotating': 'Moving in a circle around its center'
};

// We require and use our logger module in our application.
// './' specifies that this is a local module and not a Node module.
var logger = require('./logger');
app.use(logger);

// The app.use function adds middleware to the application stack.
// static() function is middleware that serves files from the public folder.
app.use(express.static('public'));

	/* This does the same as above. The index.html file is served from Express.
	__dirname is the name of the directory the currently executing script resides in.
	*/
	// app.get('/', function(request, response) {
	// 	response.sendFile(__dirname + '/public/index.html');
	// });

app.get('/blocks', function(request, response) {
	// var blocks = ['Fixed', 'Movable', 'Rotating'];
	// use request.query to access query strings
	if (request.query.limit >= 0) {
		response.json(blocks.slice(0, request.query.limit))
	} else {
		response.json(blocks);
	}

	/* This does the same thing as: ---
			response.json(blocks)
		The json() function reads better
		when all we respond with is JSON.
		The same as send(), for Objects and
		Arrays 
		*/
	// response.send(blocks);
});

// CREATING DYNAMIC ROUTES
// Placeholders can be used to name arguments part of the URL path
app.get('/blocks/:name', function(request, response){
	// We use request.params.name to look up the Block's description
	var description = blocks[request.params.name];
	if (!description) {
		response.status(404).json('No description found for ' + request.params.name);
	} else {	
		// Responding with description and proper status code
		response.json(description);
	}

});

app.get('/blocks2', function(request, response){
	var blocks2 = '<ul><li>Fixed</li><li>Movable</li></ul>';
	response.send(blocks2);
})

app.get('/blocks3', function(request, response) {
	// The redirect() function sets the proper response headers
	// optional status code can be passed as the first argument to redirct()
	// examples uses 301 Moved Permanently 
	// default is status code 302 Moved Temporarily
	response.redirect(301, '/parts');
});

app.listen(port, function(){
	console.log('Listening on http://localhost:' + port + '/');
});