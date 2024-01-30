'use strict';

module.exports = schema => data => {
  return (schema.enum.indexOf(data) === -1)
    ? [`No enum match for: ${data}`]
    : [];
};
