'use strict';

var disableAllMethods = require('../libraries/helpers').disableAllMethods;
var example = require('../libraries/result-example.js');
var showAllMethods = [];

module.exports = function(Student) {
    disableAllMethods(Student, showAllMethods);
    

    Student.getStudent=(cb)=>{
        let resultData = [];
        Student.find({where: {first_name: 'Paul'}, limit: 3}, function(err, students) {
             console.log(students) 
        });

        var ds = Student.dataSource;
        var sql = "SELECT * FROM student";

        ds.connector.query(sql, function (err, students) {

            if (err) console.error(err);

            //console.log(students)
            if (students.length) {
                students.forEach(row => {
                  let rs = {
                    'id': row.id,
                    'first_name': row.first_name,
                    'last_name': row.last_name,
                    'email': row.email
                  };
                  resultData.push(rs);
                });
                cb(null, resultData);
              } else {
                cb(null, resultData);
              }

        });
        
    }

    Student.remoteMethod(
        'getStudent', {
      description: 'Student views',
            http: {
                path: '/',
                verb: 'get',
      },
      returns: [
        {arg: 'result_data', type: 'object', default: [example.resultStudent()]},
      ],
        }
    );
};


