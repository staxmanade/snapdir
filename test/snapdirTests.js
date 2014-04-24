'use strict';

require('approvals')
    .configure({
        reporters: ["visualstudio", "p4merge", "opendiff", "tortoisemerge", "gitdiff"]
    }).mocha(__dirname);

var sut = require('../lib/snapdir.js');

describe('snapdir', function(){
    it('#getTreeSync()', function(done){

        sut.getTreeSync("sampleDir", function(err, result){
            this.verifyAsJSON(result);
            done();
        }.bind(this));

    });
});
