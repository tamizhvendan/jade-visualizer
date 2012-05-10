$( function () {
	var $output = $('#output'),
		$translate = $('#translate'),
		$jadeText = $('#jadeTemplate'),
		socket = io.connect();
		
	
	$translate.on('click', function () { 
		socket.emit('translate', $jadeText.val().trim());
	});

	socket.on('output', function (translatedText) { 
		$output.text(translatedText);
	});
});
