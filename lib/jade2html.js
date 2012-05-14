module.exports.translate = function (jadeData, callback) {

    var os = require('os'),
        jade = require('jade'),
        util = require('util'),
        eol = os.platform() === 'win32' ? '\r\n' : '\n',
        jadeTemplateWithEol = jadeData.jadeTemplate.join(eol),
        parsedJadeTemplate = "";

    try {
        
        parsedJadeTemplate = jade.compile(jadeTemplateWithEol, { 
            pretty : true 
        })(jadeData.locals);

        parsedJadeTemplate = parsedJadeTemplate.trim();
        callback(null, parsedJadeTemplate);
    } catch ( err) {
        callback(util.inspect(err));
    }
};


