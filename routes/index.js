var express = require('express');
var router = express.Router();
const courseController = require('../controllers/courseController.js');
const studentController = require('../controllers/studentController.js');
const userController = require('../controllers/userController.js');
function redirectGuest(req,res,next){
  if (!req.user){
    res.redirect('/login');
    return
  }
  next();
};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/courses');
});

router.get('/courses', redirectGuest, courseController.viewAll);
router.get('/courses/profile/:id', redirectGuest, courseController.viewProfile);
router.get('/courses/edit/:id', redirectGuest, courseController.renderEditForm);
router.post('/courses/edit/:id', redirectGuest, courseController.updateCourse);
router.get('/courses/add', redirectGuest, courseController.renderAddForm);
router.post('/courses/add', redirectGuest, courseController.addCourse);
router.get('/courses/delete/:id', redirectGuest, courseController.deleteCourse);


router.get('/students', redirectGuest, studentController.viewAll);
router.get('/students/profile/:id', redirectGuest, studentController.viewProfile);
router.get('/students/edit/:id', redirectGuest, studentController.renderEditForm);
router.post('/students/edit/:id', redirectGuest, studentController.updateStudent);
router.get('/students/add', redirectGuest, studentController.renderAddForm);
router.post('/students/add', redirectGuest, studentController.addStudent);
router.get('/students/delete/:id', redirectGuest, studentController.deleteStudent);

router.post('/students/:studentId/enroll/', redirectGuest, studentController.enrollStudent);
router.get('/students/:studentId/removeCourse/:courseId', redirectGuest, studentController.removeCourse);
router.post('/courses/:courseId/enroll', redirectGuest, courseController.enrollStudent);
router.get('/courses/:courseId/removeStudent/:studentId', redirectGuest, courseController.removeStudent);

router.get('/register-student', userController.renderStudentRegistrationForm);
router.post('/register-student', userController.registerStudent);
router.get('/register-staff', userController.renderStaffRegistrationForm);
router.post('/register-staff', userController.registerStaff);
router.get('/login', userController.renderLoginForm);
router.post('/login', userController.login);

router.get('/logout', userController.logout);
module.exports = router;
