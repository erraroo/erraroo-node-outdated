var bower = require('bower');
var semver = require('semver');
var rsvp = require('rsvp');
var util = require('./util');

function normalize(dep) {
  var o = {
    location: 'bower.json',
    name: dep.endpoint.name,
    target: dep.endpoint.target,
  };

  if (dep.hasOwnProperty('update')) {
    if (util.isPrerelease(dep.update.latest)) {
      o.latest = latestNonPrerelease(dep.versions);
    } else {
      o.latest = dep.update.latest;
    }
  } else {
    o.latest = latestNonPrerelease(dep.versions);
  }

  return o;
}

function latestNonPrerelease(versions) {
  for (var i = 0; i < versions.length; i++) {
    if (!util.isPrerelease(versions[i])) {
      return versions[i];
    }
  }

  return null;
}

function loadBower() {
  return new rsvp.Promise(function(resolve, reject) {
    bower.commands.list().on('end', function(results) {
      var deps = [];

      Object.keys(results.dependencies).forEach(function(key) {
        var dep = results.dependencies[key];
        deps.push(normalize(dep));
      });

      resolve(deps.filter(util.isOutdated));
    });
  });
}

module.exports = loadBower;
