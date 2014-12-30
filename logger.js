// Writing Our Own Middleware
// A good open-source logging middleware is Morgan
// 	https://github.com/expressjs/morgan

// We assign our logger function to module.exports in order to export
// it as a Node module and make it accessible from other files.
module.exports = function(request, response, next){
	// We use the Date object to track the start time.
	var start = +new Date();
	// Standard out is a writeable stream which we will be writing the log to.
	var stream = process.stdout;
	// The request object gives us the requested URL and the HTTP method used.
	var url = request.url;
	var method = request.method;

	// The response object is an EventEmitter which we can use to listen to events.
	// The finish event is emitted when the response has been handed off to the OS.
	response.on('finish', function(){
		var duration = +new Date() - start;
		var message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';
		// We call the write function on the writeable stream in order to print the log
		stream.write(message);
	});

	// next() moves request to the next middleware in the stack.
	next();
}
// The Node module system follows the CommonJS specification