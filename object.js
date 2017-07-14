'use strict';

module.exports = React => genForm => {

    const $ = React.createElement;

    function propReducer (config) {
        const { schema, path } = config;
        const obj = schema.properties;
        const keys = Object.keys(obj);
        return keys.map(key => {
            var val = obj[key];
            return {
                name: key,
                fn: genForm({
                    schema: val,
                    path: path.concat([key]),
                    updateData: config.updateData
                })
            };
        });
    }

    const errors = data => {
        var errors = [];

        if (typeof data !== 'object') {
            errors.push('type');
        }

        // TODO: check more

        if (errors.length === 0) { return null; }

        return $('span', {
            style: {color: 'red'}
        }, 'E: ', errors.join(', '));
    };

    return config => {
        const { title } = config;
        const children = propReducer(config);

        return class O extends React.Component {

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
                    $('li', {}, title,
                        $('ul', {},
                            children.map((e, i) => $(e.fn, {
                                key: i,
                                data: data[e.name]
                            }))
                        ),
                        errors(data)
                    )
                );
            }
        };
    };
};
