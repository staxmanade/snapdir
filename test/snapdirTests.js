'use strict';

require('approvals')
    .configure({
        reporters: ["visualstudio", "p4merge", "opendiff", "tortoisemerge", "gitdiff"]
    }).mocha(__dirname);

var sut = require('../lib/snapdir.js');

describe('snapdir', function(){

    it('#getTree()', function(done){
        sut.getTree("sampleDir", function(err, result){
            this.verifyAsJSON(result);
            done();
        }.bind(this));
    });

    it('#getTreeSync()', function(){
        var result = sut.getTreeSync("sampleDir");
        this.verifyAsJSON(result);
    });
});
