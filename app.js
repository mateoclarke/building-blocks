var express = require('express');
var app = express();
var port = 3000


var locations = {
	'Fixed': 'First floor', 'Movable': 'Second Floor', 'Rotating': 'Penthouse'
};

// MIDDLEWARE
var logger = require('./logger');
app.use(logger);
app.use(express.static('public'));

// ROUTE INSTANCES
// ---------------
// We've extracted our blocks routes to a module in the /routes/blocks.js file.
// This helps clean up our code and allows our main app.js file to easily
// accommodate additional routes in the future.
// We can do this by taking advantage of Node's module system.
var blocks = require('./routes/blocks');
// All requests to the /blocks url are dispatched to the blocks router.
// The router is mounted in a particular root url.
app.use('/blocks', blocks);


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