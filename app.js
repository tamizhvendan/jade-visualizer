var http = require('http'),
	socketIO = require('socket.io'),    
	staticFileProvider = require('./lib/staticFileProvider'),
    jade2html = require('./lib/jade2html'),
	port = process.env.PORT || 2222,
	server = {},
	io = {};

server = http.createServer(function (req, res) {
	staticFileProvider.serveFile(req, res);
});

server.listen(port);
console.log('Jade-Visualizer is listening @ Port : ' + port);

io = socketIO.listen(server);

io.sockets.on('connection', function (socket) {
    
    function translateJadeToHtml(jadeData) {

        jade2html.translate(jadeData, function (err, html) {
            if ( err ) { 
                socket.emit('error', err); 
            } else {
                socket.emit('output', html);
            }
        });
   
    }

    socket.on('translate', function (jadeData) {
        translateJadeToHtml(jadeData);
    });

});
