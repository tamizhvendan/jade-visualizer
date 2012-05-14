module.exports.translate = function (jadeData, callback) {

    var jade = require('jade'),
        util = require('util'),
        eol = '\n',
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


