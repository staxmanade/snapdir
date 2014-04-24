'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

// TODO: actually make the async function asyncronous...
// TODO: report errors

exports.getTreeSync = function(globPattern) {

    function dirTree(filename){
        filename = path.normalize(filename);

        var stats = fs.lstatSync(filename);
        var info = {
            name: path.basename(filename)
        };

        if (stats.isDirectory()) {
            info.children = fs.readdirSync(filename).map(function(item) {
                return dirTree(filename + '/' + item);
            });
        } else {
            // NOTE: this could be a symlink? What to do?

            var data = fs.readFileSync(filename);
                info.sha1 = crypto
                    .createHash('sha1')
                    .update(data, 'utf8')
                    .digest('hex')
        }
        return info;
    }
    return dirTree(globPattern);
};


exports.getTree = function(globPattern, callback) {

    callback(null, exports.getTreeSync(globPattern));
    return;
};
