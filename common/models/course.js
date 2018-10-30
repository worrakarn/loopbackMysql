'use strict';

var disableAllMethods = require('../libraries/helpers').disableAllMethods;
var example = require('../libraries/result-example.js');
var showAllMethods = [];

module.exports = function(Course) {
  disableAllMethods(Course, showAllMethods);

  Course.getCourse = (cb)=>{
    let resultData = [];

    /*Course.find({where: {first_name: 'Paul'}, limit: 3}, (err, Courses) => {
      console.log(Courses);
    });*/

    /*Course.find({ fields: {id: true, name: true, description: true} }, (err, Courses) => {
      console.log(Courses);
    });*/

    /*Course.find({include: 'Courses'}, (err, students) => {
      console.log(students);
    });*/

    /*
    Course.findById(1, { fields: {id: true, first_name: true, last_name: true, email: true} }, (err, studnets)=>{
      console.log(studnets);
    });*/

    /*Course.destroyAll({where: {id: 1}}, (err, students)=>{ 
      if (err) console.log(err);
    });*/

    var ds = Course.dataSource;
    var sql = "SELECT * FROM Course";

    ds.connector.query(sql, (err, Courses)=>{
      if (err) console.error(err);
        //console.log(Courses)
      if (Courses.length) {
        Courses.forEach(row => {
          let rs = {
            'id': row.id,
            'name': row.name,
            'description': row.description,
          };
          resultData.push(rs);
        });
        cb(null, resultData);
      } else {
        cb(null, resultData);
      }
    });
  };

  Course.remoteMethod(
    'getCourse', {
      description: 'Course views',
      http: {
        path: '/',
        verb: 'get',
      },
      returns: [
        {arg: 'result_data', type: 'object', default: [example.resultCourse()]},
      ],
    }
  );
};
