var npm = require('npm');
var rsvp = require('rsvp');
var semver = require('semver');
var util = require('./util');

function normalize(dep) {
  return {
    location: 'package.json',
    name: dep[1],
    latest: dep[4],
    target: dep[5]
  };
}

function loadNpm() {
  return new rsvp.Promise(function(resolve, reject) {
    npm.load(function(error, npm) {
      if (error) {
        reject(error);
        return;
      }

      npm.commands.outdated({}, true, function(error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data.map(normalize).filter(util.isOutdated));
        }
      });
    });
  });
}

module.exports = loadNpm;
