var studentModel = require('../models/studentModel')

/**
 * Creates a new student in the database. Does NOT write NFC card.
 * Data fields: 
 *  req.body.firstName
 *  req.body.lastName
 *  req.body.department
 *  req.body.grade
*/
exports.newStudent = function(req, res, next) {
    var student = new studentModel({
        firstName: 'Jeremy',
        lastName: 'Tow',
        department: 'scouting',
        grade: 12,
    })
    student.save(function(err) {
        if (err) console.log(err)
        res.sendStatus(200)
    })
}

/**
 * Gets all students
 */
exports.getStudents = function(req, res, next) {
    studentModel.find({}, function(err, students) {
        if (err) console.log(err)
        res.send(students)
    })
}

/**
 * Updates student details
 * Data fields:
 *  req.body.firstName
 *  req.body.lastName
 *  req.body.department
 *  req.body.grade
 */
exports.updateStudent = function(req, res, next) {

}

/**
 * Deletes student
 * Data fields:
 *  req.body.studentId
 */
exports.deleteStudent = function(req, res, next) {
    studentModel.deleteOne({_id: req.body.studentId})
        .then(() => {
            res.sendStatus(200)
        })
}