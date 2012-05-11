$(function () {
    var $output = $('#output'),
		$translate = $('#translate'),
		$jadeTemplate = $('#jadeTemplate'),
		socket = io.connect(),
        tabKeyCode = 9;

    $jadeTemplate.val('');

    function handleTabKeyPress(event) {
        var jadeText = $jadeTemplate.val();
        jadeText += '\t';
        $jadeTemplate.val(jadeText);
        event.preventDefault();
    }

    $jadeTemplate.on('keydown', function (event) {
        if (event.keyCode === tabKeyCode) {
            handleTabKeyPress(event);
        }
    });

    $translate.on('click', function (event) {
        var jadeText = $jadeTemplate.val().split('\n');
        socket.emit('translate', jadeText);
        event.preventDefault();
    });

    socket.on('output', function (translatedText) {
        $output.text(translatedText);
        prettyPrint();
    });
});
