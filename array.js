'use strict';

function getDefaults (schema) {
    if (schema.type === 'string') {
        // TODO check for default, minLength, pattern?
        return '';
    }
    if (schema.type === 'object') {
        const props = schema.properties;
        const keys = Object.keys(props);
        return keys.reduce((res, key) => Object.assign(res, {
            [key]: getDefaults(props[key])
        }), {});
    }
    if (schema.type === 'array') {
        // TODO check for minimum number of items?
        return [];
    }
    return null;
}

module.exports = React => genForm => {

    const $ = React.createElement;

    function genItemizer (config) {
        const { schema, path, updateData } = config;
        let arr = [];

        return {
            get: function (index) {
                if (arr[index] === undefined) {

                    const selfPath = path.concat([index]);

                    const selfBody = { $splice: [[index, 1]] };
                    const selfSpec = path.reduceRight(
                        (prev, key) => ({ [key]: prev }), selfBody);

                    const Form = genForm({
                        schema: schema.items,
                        path: selfPath,
                        updateData: updateData
                    });

                    arr[index] = function AI (props) {

                        function handleDelete () {
                            updateData(selfSpec);
                        }

                        return $('span', {},
                            $('button', {
                                type: 'button',
                                onClick: handleDelete
                            }, '-'),
                            $(Form, props)
                        );
                    };
                }
                return arr[index];
            }
        };
    }

    const errors = data => {
        var errors = [];

        if (!Array.isArray(data)) {
            errors.push('type');
        } else {
            // TODO: check more
        }

        if (errors.length === 0) { return null; }

        return $('span', {
            style: {color: 'red'}
        }, 'E: ', errors.join(', '));
    };

    return config => {
        const { schema, path, updateData } = config;
        const arrayBody = { $push: [getDefaults(schema.items)] };
        const arraySpec = path.reduceRight(
            (prev, key) => ({ [key]: prev }), arrayBody);

        const itemizer = genItemizer(config);

        function handleAdd () {
            updateData(arraySpec);
        }

        return class A extends React.Component {

            constructor (props) {
                super(props);
            }

            shouldComponentUpdate (nextProps) {
                if (this.props.data === nextProps.data) {
                    return false;
                }
                return true;
            }

            render () {
                const data = this.props.data;
                return (
                    $('li', {},
                        $('button', {
                            type: 'button',
                            onClick: handleAdd
                        }, '+'),
                        schema.title,
                        $('ol', { start: 0 },
                            data.map((e, i) => $(itemizer.get(i), {
                                key: i,
                                data: e
                            }))
                        ),
                        errors(data)
                    )
                );
            }
        };
    };
};
