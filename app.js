var express = require('express');
var app = express();
var port = 3000

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
	var blocks = ['Fixed', 'Movable', 'Rotating'];
	response.json(blocks);

	/* This does the same as above: ---
		The json() function reads better
		when all we respond with is JSON.
		The same as send(), for Objects and
		Arrays 
		*/
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