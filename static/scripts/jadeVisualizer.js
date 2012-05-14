$(function () {
    var $output = $('#output'),
		$translate = $('#translate'),
		jadeTemplate = {},
        data = {},
        $alert = $('.alert'),
        $alertHeader = $('.alert-heading'),
        $errorMsg = $('#errorMsg'),
        $alertClose = $('.close'),
		socket = io.connect();

    (function init() {
        jadeTemplate  = CodeMirror.fromTextArea( document.getElementById('jadeTemplate'), {
            theme : 'eclipse'
        });
        
        data = CodeMirror.fromTextArea( document.getElementById('data'), {
            theme : 'eclipse',
            mode : { name : 'javascript', json : true },
            indentUnit : 4,
            matchBrackets : true,
            autoClearEmptyLines : true
        });
        
        jadeTemplate.setValue('p.jade #{helloWorld}');
        data.setValue('{"helloWorld" : "Hello World!!"}');
        data.refresh();
        $output.text('<p class="jade">Hello World!!</p>');    
        prettyPrint();
        $('.CodeMirror').css('border', '1px solid #0d0d0d');
        
    })();

    $alertClose.on('click', function () {
        $alert.fadeOut();
    });

    $translate.on('click', function (event) {
        var jadeText = "", jadeData = {};
        $output.text('Translation in progress ...');
        event.preventDefault();
        $alert.fadeOut();
        
        jadeText = jadeTemplate.getValue().split('\n');
        
        try {
            jadeData = JSON.parse(data.getValue() || "{}");  
        } catch ( err ) {
            showError('Oops, Something wrong with the data', err, data );
            return;
        }
        socket.emit('translate', { jadeTemplate : jadeText , locals : jadeData});
    });

    socket.on('output', function (translatedText) {
        $output.text(translatedText);
        prettyPrint();
    });

    function showError(errorHeader, errorMsg, elementToFocus) {
        $alertHeader.text(errorHeader);
        $output.text('');
        $errorMsg.text(errorMsg);
        $alert.fadeIn();
        elementToFocus.focus();
    }

    socket.on('error', function (errorMsg) {
        showError('Oops! Something wrong with the template', errorMsg, jadeTemplate);
    });
});
