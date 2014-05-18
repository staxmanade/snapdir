'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

// TODO: actually make the async function asyncronous...
// TODO: report errors

exports.getTreeSync = function (options) {

    var globPattern = options && options.globPattern;
    var includeSha = !(options && options.noSha);
    var filter = (options && options.filter) || function (file) { return true; }
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
                .map(function(item) {
                    return filename + '/' + item;
                })
                .filter(function (item) {
                    return filter(item);
                })
                .map(function (item) {
                    return dirTree(item);
                }).sort(function (a, b) {

                    var aName = (a.name || '').toLowerCase();
                    var bName = (b.name || '').toLowerCase();

                    if (aName < bName) return -1;
                    if (aName > bName) return 1;
                    return 0;
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
