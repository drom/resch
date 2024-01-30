'use strict';

module.exports = {
  type: 'array',
  title: 'table 1',
  widget: 'table',
  items: {
    type: 'object',
    widget: 'table',
    properties: {
      num:    {type: 'number', widget: 'table', title: '#'},
      first:  {type: 'string', widget: 'table', title: 'First Name'},
      last:   {type: 'string', widget: 'table', title: 'Last Name'},
      user:   {type: 'string', widget: 'table', title: 'Username'},
      gender: {type: 'string', widget: 'table', title: 'Gender', enum: ['male', 'female']}
    }
  }
};
