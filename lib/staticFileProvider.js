var fs = require('fs'),
	path = require('path'),
	staticDirectoryPath = path.join(__dirname, 'static').replace('lib',''),
	extensions = {
		'.html' : 'text/html',
		'.css' : 'text/css',
		'.js' : 'application/javascript'		
	};

function handleFileNotFound(response) {
	response.writeHead(404);
	response.end();
}

function handleInternalServerError(response){
	response.writeHead(500);
	response.end();
}

function writeFileContentInResponse(filePath, fileContentType, response) {
	fs.readFile(filePath, function ( isFileReadError, fileContents) { 
		if ( isFileReadError ) {
			handleInternalServerError(response);
		} else { 
			response.writeHead( 200, { 
				'content-type': fileContentType,
				'content-length': fileContents.length
			});
			response.end(fileContents);
		}
	});
}

module.exports.serveFile = function ( request, response ) {
	
	var requestUrl = request.url,
		fileName = path.basename(requestUrl) || 'index.html',
		fileExtension = path.extname(fileName),
		directoryName = path.dirname(requestUrl).substring(1),
		localFilePath = path.join(staticDirectoryPath, directoryName, fileName);
	

	if(extensions[fileExtension]) {
		path.exists(localFilePath, function ( isFileExists ) { 
			if ( isFileExists ) {
				writeFileContentInResponse(localFilePath, extensions[fileExtension], response);
			} else {
				handleFileNotFound(response);
			}
		});
	} else {
		handleFileNotFound(response);
	}		
};
