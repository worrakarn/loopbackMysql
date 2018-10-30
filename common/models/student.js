'use strict';

var disableAllMethods = require('../libraries/helpers').disableAllMethods;
var example = require('../libraries/result-example.js');
var showAllMethods = [];

module.exports = function(Student) {
  disableAllMethods(Student, showAllMethods);

  Student.getStudent = (cb)=>{
    let resultData = [];

    /*Student.create([{ first_name: 'Test', last_name: 'Test', email: 'Test@mail.com' }], (err, students)=>{ 
      if (err) console.log(err);
    });*/

    // ยังไม่เสร็จ
    /*Student.create({include: {
      relation: 'course', scope: {
        fields: [{ first_name: 'Test', last_name: 'Test', email: 'Test@mail.com' }],
        include: {
          relation: 'course',
          scope: {
            fields: [{ name: 'Test', description: 'Test' }],
          }
        }
      }
    }}, (err, students)=>{ 
      if (err) console.log(err);
    });*/

    /*
    Student.find({include: {
      relation: 'course', scope: {
        fields: ['name', 'description']
      }
    }}, (err, students)=>{ 
      console.log(students);
    });*/

    Student.find({where: {first_name: 'Testsads'}, include: {
      relation: 'course', scope: {
        fields: ['name', 'description']},
      }}, (err, students) => {
      console.log(students);
    });

    /*Student.destroyById(5, (err, students)=>{ 
      if (err) console.log(err);
    });*/

    /*Student.destroyAll({where: {id: 1}}, (err, students)=>{ 
      if (err) console.log(err);
    });*/

    /*Student.upsert({id: 3, first_name: 'TestTwo', last_name: 'TestTwo', email: 'Test@mail.com' }, (err, students)=>{ 
      if (err) console.log(err);
    });*/

    /*Student.updateAttributes({last_name: 'value'}, (err, students)=>{ 
      if (err) console.log(err);
    });*/

    /*Student.find({where: {first_name: 'Paul'}, limit: 3}, (err, students) => {
      console.log(students);
    });*/

    /*Student.find({ fields: {id: true, first_name: true, last_name: true, email: true}, order: 'id DESC', skip: 0 }, (err, students) => {
      console.log(students);
    });*/

    /*Student.find({where: {id: {gt: 1}}, limit: 3}, (err, students) => {
      console.log(students);
    });*/

    /*Student.find({where: {id: {between: [0, 5]}}, limit: 3}, (err, students) => {
      console.log(students);
    });*/

    /*Student.find({where: {email: {like: '%mail%'}}}, (err, students) => {
      console.log(students);
    });*/

    /*Student.find({where: {id: {inq: [1, 2, 3]}}}, (err, students) => {
      console.log(students);
    });*/

    /*Student.findOrCreate({where: {id: 5}}, {first_name: 'Test', last_name: 'Test', email: 'Test@mail.com'}, (err, students) => {
      console.log(students);
    });*/

    /*Student.updateAll({where: {first_name: 'test'}}, {first_name: 'TestThree', last_name: 'Test', email: 'Test@mail.com'}, (err, students) => {
      console.log(students);
    });*/

    /*Student.find({include: 'Course'}, (err, students) => {
      console.log(students);
    });*/

    /*
    Student.findById(1, { fields: {id: true, first_name: true, last_name: true, email: true} }, (err, studnets)=>{
      console.log(studnets);
    });*/

    /*Student.replaceById(1, {first_name: 'test', last_name: 'test', email: 'test'}, (err, studnets)=>{
      console.log(studnets);
    });*/

    var ds = Student.dataSource;
    var sql = "SELECT * FROM student";

    ds.connector.query(sql, (err, students)=>{
      if (err) console.error(err);
        //console.log(students)
      if (students.length) {
        students.forEach(row => {
          let rs = {
            'id': row.id,
            'first_name': row.first_name,
            'last_name': row.last_name,
            'email': row.email,
          };
          resultData.push(rs);
        });
        cb(null, resultData);
      } else {
        cb(null, resultData);
      }
    });
  };

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
