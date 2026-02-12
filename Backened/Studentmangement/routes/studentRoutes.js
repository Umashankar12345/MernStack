const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// POST API
router.post("/add-student", studentController.createStudent);

// GET API
router.get("/students", studentController.fetchStudents);

module.exports = router;
