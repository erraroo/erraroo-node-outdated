#! /usr/bin/env node

var bower = require('./bower.js');
var npm = require('./npm.js');
var rsvp = require('rsvp');

function main() {
  var promises = [npm(), bower()];

  rsvp.all(promises).then(function(arrays){
    var deps = arrays.reduce(function(a, b) {
      return a.concat(b);
    });

    console.log(JSON.stringify({
      dependencies: deps
    }, null, 2));
  });
}

main();
