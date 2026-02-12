const studentService = require("../services/studentServices");

// POST - Add Student
const createStudent = (req, res) => {
    const { student_name, course_name, student_email, mobile } = req.body;

    // Basic validation
    if (!student_name || !course_name || !student_email || !mobile) {
        return res.status(400).json({
            message: "All fields are required!"
        });
    }

    const newStudent = {
        student_name,
        course_name,
        student_email,
        mobile
    };

    studentService.addStudent(newStudent);

    res.status(201).json({
        message: "Student added successfully!",
        student: newStudent
    });
};

// GET - Fetch All Students
const fetchStudents = (req, res) => {
    const students = studentService.getAllStudents();
    const total = studentService.getTotalStudents();

    res.status(200).json({
        total_students: total,
        students: students
    });
};

module.exports = {
    createStudent,
    fetchStudents
};
