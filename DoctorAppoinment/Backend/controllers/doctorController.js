const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Search doctors with filters (state, district, specialization, name)
// @route   GET /api/doctors/search
// @access  Public
const searchDoctors = async (req, res) => {
    try {
        const { state, district, specialization, name } = req.query;
        const query = { role: 'doctor' };

        if (state) query.state = state;
        if (district) query.district = district;
        if (specialization) query.specialization = { $regex: specialization, $options: 'i' };
        if (name) query.name = { $regex: name, $options: 'i' };

        const doctors = await User.find(query).select('-password').sort({ rating: -1 });
        res.json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get top 20 doctors (highest rated)
// @route   GET /api/doctors/top
// @access  Public
const getTopDoctors = async (req, res) => {
    try {
        const { limit = 20 } = req.query;
        const doctors = await User.find({ role: 'doctor' })
            .select('-password')
            .sort({ rating: -1, experience: -1 })
            .limit(parseInt(limit));
        res.json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get distinct specializations (optionally filtered by state/district)
// @route   GET /api/doctors/specializations
// @access  Public
const getSpecializations = async (req, res) => {
    try {
        const { state, district } = req.query;
        const query = { role: 'doctor' };
        if (state) query.state = state;
        if (district) query.district = district;

        const specializations = await User.distinct('specialization', query);
        res.json(specializations.filter(Boolean).sort());
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get nearby doctors
// @route   GET /api/doctors/nearby
// @access  Public
const getNearbyDoctors = asyncHandler(async (req, res) => {
    const { lat, lng, distance, specialization, minExp } = req.query;

    if (!lat || !lng) {
        res.status(400);
        throw new Error('Please provide latitude and longitude');
    }

    const query = {
        role: 'doctor',
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [parseFloat(lng), parseFloat(lat)]
                },
                $maxDistance: parseInt(distance) || 10000
            }
        }
    };

    if (specialization) query.specialization = specialization;
    if (minExp) query.experience = { $gte: parseInt(minExp) };

    const doctors = await User.find(query).select('-password');
    res.json(doctors);
});

module.exports = {
    searchDoctors,
    getTopDoctors,
    getSpecializations,
    getNearbyDoctors,
};
