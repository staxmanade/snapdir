'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

// TODO: actually make the async function asyncronous...
// TODO: report errors

exports.getTreeSync = function (options) {

    var globPattern = options && options.globPattern;
    var includeSha = !(options && options.noSha);

    if (!globPattern) {
        throw "options.globPattern is required";
    }


    function dirTree(filename){
        filename = path.normalize(filename);

        var stats = fs.lstatSync(filename);
        var info = {
            name: path.basename(filename)
        };

        if (stats.isDirectory()) {
            info.children = fs.readdirSync(filename)
                .map(function (item) {
                    return dirTree(filename + '/' + item);
                //}).sort(function (a, b) {
                //    return a.name < b.name;
                });
        } else {
            // NOTE: this could be a symlink? What to do?

            if (includeSha) {
                var data = fs.readFileSync(filename);
                info.sha1 = crypto
                        .createHash('sha1')
                        .update(data, 'utf8')
                        .digest('hex')
            }
        }
        return info;
    }
    var result = dirTree(globPattern);
    return result;
};


exports.getTree = function(options, callback) {
    // TODO: make this sync...
    callback(null, exports.getTreeSync(options));
    return;
};
