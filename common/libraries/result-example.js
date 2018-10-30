'use strict';

module.exports.resultStudent = () =>  {
  return {
    'id': 'Number',
    'first_name': 'String',
    'last_name': 'String',
    'email': 'String',
  };
};

module.exports.resultCourse = () =>  {
  return {
    'id': 'Number',
    'name': 'String',
    'description': 'String',
  };
};