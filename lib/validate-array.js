'use strict';

module.exports = schema => data => {
  let errors = [];
  if (!Array.isArray(data)) {
    errors = errors.concat(
      [`Invalid type: ${typeof data} (expected array)`]
    );
  } else {
    if (typeof schema.minItems === 'number') {
      if (data.length < schema.minItems) {
        errors = errors.concat(
          [`Array is too short (${data.length}), minimum ${schema.minItems}`]
        );
      }
    }

    if (typeof schema.maxItems === 'number') {
      if (data.length > schema.maxItems) {
        errors = errors.concat(
          [`Array is too long (${data.length}), maximum ${schema.maxItems}`]
        );
      }
    }
  }
  return errors;
};
