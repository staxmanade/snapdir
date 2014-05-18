# snapdir

## Getting Started
Install the module with: `npm install snapdir`

```javascript
var snapdir = require('snapdir');

var result = sut.getTreeSync({
    globPattern: "sampleDir",  // required glob search pattern
    filter: function( fileName ) { return true; }, // can be used to exclude files...
    noSha: true                // default is false
});

```

## License
Copyright (c) Jason Jarret 2014 . Licensed under the MIT license.
