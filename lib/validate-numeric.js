'use strict';

module.exports = schema => {
    const checkType = (schema.type === 'integer') ?
        data => ((typeof data !== 'number') || (data !== parseInt(data, 10))) :
        data => (typeof data !== 'number');

    return data => {
        var errors = [];
        if (checkType(data)) {
            errors.push(`Invalid type: ${typeof data} (expected ${schema.type})`);
        } else {

            if (typeof schema.minimum === 'number') {
                if (data < schema.minimum) {
                    errors.push(`Value ${data} is less than minimum ${schema.minimum}`);
                }
                if (schema.exclusiveMinimum === true) {
                    if (data === schema.minimum) {
                        errors.push(`Value ${data} is equal to exclusive minimum ${schema.minimum}`);
                    }
                }
            }

            if (typeof schema.maximum === 'number') {
                if (data > schema.maximum) {
                    errors.push(`Value ${data} is greater than maximum ${schema.maximum}`);
                }
                if (schema.exclusiveMaximum === true) {
                    if (data === schema.maximum) {
                        errors.push(`Value ${data} is equal to exclusive maximum ${schema.maximum}`);
                    }
                }
            }
            const multipleOf = schema.multipleOf;
            if (typeof multipleOf === 'number') {
                if ((data % multipleOf) !== 0) {
                    errors.push(`Value ${data} is not a multiple of ${multipleOf}`);
                }
            }
        }
        return errors;
    };
};
