$(function(){

	// This makes an AJAX call to /blocks, then
	// appends the results to block-list
	$.get('/blocks', appendToList);

	// Data is sent in a POST request to the /blocks endpoint
	$('form').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		// The serialize() functions transforms form data to URL-encoded notation
		// so our Express app can parse it back to Javascript
		var blockData = form.serialize();

		$.ajax({
			type: 'POST',
			url: '/blocks',
			data: blockData
		}).done(function(blockName){
			// The appendToList() function expects an array of Blocks
			// so we wrap our arguement in an array.
			// This way we avoid changing our original function to expect different types of arguements
			appendToList([blockName]);
			// We must clear the input text fields after posting the form
			form.trigger('reset');
		});
	});

	function appendToList(blocks) {
		var list = [];
		for(var i in blocks){
			block = blocks[i];
			content = '<a href="/blocks/'+block+'">'+block+'</a>';
			list.push($('<li>', {html: content }));
		}
		$('.block-list').append(list);
	}
});