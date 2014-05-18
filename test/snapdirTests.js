'use strict';

require('approvals')
    .configure({
        reporters: ["visualstudio", "p4merge", "opendiff", "tortoisemerge", "gitdiff"]
    }).mocha(__dirname);

var sut = require('../lib/snapdir.js');

describe('snapdir', function(){

    it('#getTree()', function(done){
        sut.getTree({
            globPattern: "sampleDir"
        }, function (err, result) {
            this.verifyAsJSON(result);
            done();
        }.bind(this));
    });

    it('#getTreeSync()', function(){
        var result = sut.getTreeSync({
            globPattern: "sampleDir"
        });
        this.verifyAsJSON(result);
    });


    it('#getTreeSync() - noSha', function () {
        var result = sut.getTreeSync({
            globPattern: "sampleDir",
            noSha: true
        });
        this.verifyAsJSON(result);
    });

});
