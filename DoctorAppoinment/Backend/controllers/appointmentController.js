const asyncHandler = require('express-async-handler');
const Appointment = require('../models/appointmentModel');

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private (Patient)
const bookAppointment = asyncHandler(async (req, res) => {
    const { department, doctorName, date, timeSlot, doctorId, doctorPhone } = req.body;

    if (!department || !doctorName || !date || !timeSlot) {
        res.status(400);
        throw new Error('Please fill all fields');
    }

    const appointment = await Appointment.create({
        department,
        doctorName,
        doctor: doctorId || undefined,
        doctorPhone: doctorPhone || '',
        patientName: req.user.name,
        date,
        timeSlot,
        user: req.user.id,
    });

    res.status(201).json(appointment);
});

// @desc    Get appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = asyncHandler(async (req, res) => {
    let appointments;

    if (req.user.role === 'patient') {
        appointments = await Appointment.find({ user: req.user.id });
    } else if (req.user.role === 'doctor') {
        // Assuming doctor sees appointments where doctorName matches their name
        // Or all appointments for simplicity if logic isn't strictly defined assignment-wise
        // For now, let's filter by doctorName matching user name
        appointments = await Appointment.find({ doctorName: req.user.name });
    } else {
        res.status(401);
        throw new Error('Not authorized');
    }

    res.status(200).json(appointments);
});

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private (Doctor)
const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
        res.status(404);
        throw new Error('Appointment not found');
    }

    // Check if user is doctor
    if (req.user.role !== 'doctor') {
        res.status(401);
        throw new Error('User not authorized');
    }

    // Ensure the appointment is assigned to this doctor (optional but good security)
    if (appointment.doctorName !== req.user.name) {
        res.status(401);
        throw new Error('Not authorized to update this appointment');
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        req.body, // { status: 'approved' | 'rejected' }
        { new: true }
    );

    res.status(200).json(updatedAppointment);
});

module.exports = {
    bookAppointment,
    getAppointments,
    updateAppointmentStatus,
};
