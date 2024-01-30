'use strict';

module.exports = () => data => {
  if (typeof data !== 'boolean') {
    return [`Invalid type: ${typeof data} (expected boolean)`];
  }
  return [];
};
