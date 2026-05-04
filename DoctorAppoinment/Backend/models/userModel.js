const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    role: {
        type: String,
        enum: ['patient', 'doctor'],
        default: 'patient',
    },
    specialization: {
        type: String,
        required: function () { return this.role === 'doctor'; }
    },
    experience: {
        type: Number,
        required: function () { return this.role === 'doctor'; }
    },
    availableSlots: [{
        day: String,
        startTime: String,
        endTime: String
    }],
    state: {
        type: String,
    },
    district: {
        type: String,
    },
    phone: {
        type: String,
        required: function () { return this.role === 'doctor'; }
    },
    fees: {
        type: Number,
        default: 500,
    },
    about: {
        type: String,
    },
    image: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/377/377429.png' // Default doctor/user icon
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [{
        userName: String,
        rating: Number,
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            default: [0, 0]
        }
    },
}, {
    timestamps: true,
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);
