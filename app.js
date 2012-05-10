var http = require('http'),
	jade = require('jade'),
	socketIO = require('socket.io'),
	staticFileProvider = require('./lib/staticFileProvider'),
	port = process.env.PORT || 2222,
	server = {},
	io = {};

var parseJadeText = function (jadeTemplate) {
	console.log(jadeTemplate);
	return jade.compile(jadeTemplate)();
};

server = http.createServer(function (req, res) {
	staticFileProvider.serveFile(req, res);
});

server.listen(port);
console.log('Jade-Visualizer is listening @ Port : ' + port);

io = socketIO.listen(server);

io.sockets.on('connection', function (socket) {
	socket.on('translate', function (jadeTemplate) {
		var parsedText = parseJadeText(jadeTemplate);
		socket.emit('output', parsedText);
	});
});
