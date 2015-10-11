var semver = require('semver');

function isOutdated(d) {
  return !semver.satisfies(d.latest, d.target);
}

function isPrerelease(version) {
  var parsed = semver.parse(version);

  return parsed && parsed.prerelease && parsed.prerelease.length;
}

module.exports = {
  isOutdated: isOutdated,
  isPrerelease: isPrerelease
};
