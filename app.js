var express = require('express');
var app = express();
var port = 3000

app.get('/', function(request, response) {
	response.send('I\'m so fresh to Express');
	/* This does the same as above but using Node commands */
	// response.write('I\'m so fresh to Node.js');
	// response.end();
});

app.get('/blocks', function(request, response) {
	var blocks = ['Fixed', 'Movable', 'Rotating'];
	response.json(blocks);

	/* This does the same as above: ---
		The json() function reads better
		when all we respond with is JSON.
		The same as send(), for Objects and
		Arrays */
	// response.send(blocks);
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