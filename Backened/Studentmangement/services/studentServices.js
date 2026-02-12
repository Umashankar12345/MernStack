// Array to store students
const students = [];

// Add student function
const addStudent = (studentData) => {
    students.push(studentData);
    return studentData;
};

// Get all students
const getAllStudents = () => {
    return students;
};

// Get total students
const getTotalStudents = () => {
    return students.length;
};

module.exports = {
    addStudent,
    getAllStudents,
    getTotalStudents
};
