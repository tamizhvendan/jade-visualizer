$(function () {
	var $output = $('#output'),
		$translate = $('#translate'),
		$jadeText = $('#jadeTemplate'),
		socket = io.connect();


	$translate.on('click', function (event) {
		socket.emit('translate', $jadeText.val().trim());
		event.preventDefault();
	});

	socket.on('output', function (translatedText) {
		$output.text(translatedText);
		prettyPrint();
	});
});
