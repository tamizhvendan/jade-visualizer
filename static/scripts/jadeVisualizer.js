$(function () {
    var $output = $('#output'),
		$translate = $('#translate'),
		$jadeTemplate = $('#jadeTemplate'),
        $alert = $('.alert'),
        $alertHeader = $('.alert-heading'),
        $errorMsg = $('#errorMsg'),
        $alertClose = $('.close'),
		socket = io.connect(),
        tabKeyCode = 9;

    (function init() {
        $jadeTemplate.val('p.jade Hello World!!');
        $alert.hide();
        $output.text('<p class="jade">Hello World!!</p>');    
        prettyPrint();
    })();

    $alertClose.on('click', function () {
        $alert.fadeOut();
    });

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
        event.preventDefault();
        $alert.fadeOut();
        var jadeText = $jadeTemplate.val().split('\n');
        socket.emit('translate', jadeText);
    });

    socket.on('output', function (translatedText) {
        $output.text(translatedText);
        prettyPrint();
    });

    socket.on('error', function (error) {
        $alertHeader.text('Oops! Something wrong with the template');
        $errorMsg.text(error);
        $alert.fadeIn();
        $jadeTemplate.focus();
    });
});
