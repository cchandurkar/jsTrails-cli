#! /usr/bin/env node

var cli = require('cli');
var fs = require('fs');
var specParser = require('./spec-parser');

// Parse the commands given
cli.parse({
  import:   ['i', 'Import a trail'],
  export:   ['e', 'Export a trail'],
  view:     ['v', 'View a trail'],
});

// Main
cli.main(function (args, options) {

  if(this.argc){
    if(options.import){
      fs.readFile(args[0], 'utf8', function (err, data) {
        if(err){
          console.log(err.message);
        } else {
          try {
            var trailData = JSON.parse(data);
            specParser.parse(trailData);
          }catch(e){
            cli.error("Failed to parse specification: " + args[0] + '. ' + e);
          }
        }
      });
    }
  }
});
