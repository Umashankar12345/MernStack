const express = require('express');
const axios = require('axios');
const router = express.Router();

const PRACTO_BASE = 'https://api.practo.com';

// Helper: check if real keys are configured
const hasRealKeys = () => {
    return process.env.PRACTO_CLIENT_ID &&
        process.env.PRACTO_CLIENT_ID !== 'your_practo_client_id_here' &&
        process.env.PRACTO_API_KEY &&
        process.env.PRACTO_API_KEY !== 'your_practo_api_key_here';
};

const practoHeaders = () => ({
    'X-CLIENT-ID': process.env.PRACTO_CLIENT_ID,
    'X-API-KEY': process.env.PRACTO_API_KEY,
});

// ─── Mock Data (used when real keys aren't configured) ──────────
const MOCK_CITIES = [
    "Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad",
    "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow",
    "Patna", "Chandigarh", "Bhopal", "Kochi", "Coimbatore"
];

const MOCK_LOCALITIES = {
    "Bangalore": ["Koramangala", "Indiranagar", "Whitefield", "HSR Layout", "Jayanagar", "Electronic City"],
    "Mumbai": ["Andheri", "Bandra", "Borivali", "Dadar", "Powai", "Thane"],
    "Delhi": ["Connaught Place", "Dwarka", "Saket", "Rohini", "Karol Bagh", "Lajpat Nagar"],
    "Chennai": ["T Nagar", "Anna Nagar", "Adyar", "Velachery", "Tambaram"],
    "Hyderabad": ["Banjara Hills", "Jubilee Hills", "Madhapur", "Secunderabad", "Gachibowli"],
    "Pune": ["Kothrud", "Hinjewadi", "Viman Nagar", "Hadapsar", "Shivaji Nagar"],
    "Kolkata": ["Salt Lake", "Park Street", "Howrah", "New Town", "Dum Dum"],
    "Patna": ["Boring Road", "Kankarbagh", "Rajendra Nagar", "Bailey Road", "Patliputra"],
};

const MOCK_DOCTORS = [
    { doctor_id: "p1", name: "Dr. Rajesh Kumar", specialization: "Cardiologist", experience: 18, qualifications: "MBBS, MD (Cardiology), DM", recommendation_percent: 96, consultation_fees: 800, locality: "Koramangala", city: "Bangalore", photo_url: "https://randomuser.me/api/portraits/men/32.jpg", practo_url: "https://www.practo.com" },
    { doctor_id: "p2", name: "Dr. Priya Sharma", specialization: "Dermatologist", experience: 12, qualifications: "MBBS, MD (Dermatology)", recommendation_percent: 94, consultation_fees: 600, locality: "Indiranagar", city: "Bangalore", photo_url: "https://randomuser.me/api/portraits/women/44.jpg", practo_url: "https://www.practo.com" },
    { doctor_id: "p3", name: "Dr. Amit Verma", specialization: "Orthopedic", experience: 22, qualifications: "MBBS, MS (Ortho), DNB", recommendation_percent: 97, consultation_fees: 1000, locality: "Whitefield", city: "Bangalore", photo_url: "https://randomuser.me/api/portraits/men/55.jpg", practo_url: "https://www.practo.com" },
    { doctor_id: "p4", name: "Dr. Sneha Reddy", specialization: "Gynecologist", experience: 15, qualifications: "MBBS, MS (OBG), DNB", recommendation_percent: 98, consultation_fees: 700, locality: "HSR Layout", city: "Bangalore", photo_url: "https://randomuser.me/api/portraits/women/67.jpg", practo_url: "https://www.practo.com" },
    { doctor_id: "p5", name: "Dr. Vikram Singh", specialization: "Neurologist", experience: 20, qualifications: "MBBS, MD, DM (Neurology)", recommendation_percent: 95, consultation_fees: 1200, locality: "Jayanagar", city: "Bangalore", photo_url: "https://randomuser.me/api/portraits/men/41.jpg", practo_url: "https://www.practo.com" },
    { doctor_id: "p6", name: "Dr. Meena Iyer", specialization: "Pediatrician", experience: 10, qualifications: "MBBS, MD (Pediatrics)", recommendation_percent: 93, consultation_fees: 500, locality: "Andheri", city: "Mumbai", photo_url: "https://randomuser.me/api/portraits/women/23.jpg", practo_url: "https://www.practo.com" },
    { doctor_id: "p7", name: "Dr. Suresh Patel", specialization: "Cardiologist", experience: 25, qualifications: "MBBS, MD, DM (Cardiology)", recommendation_percent: 99, consultation_fees: 1500, locality: "Bandra", city: "Mumbai", photo_url: "https://randomuser.me/api/portraits/men/62.jpg", practo_url: "https://www.practo.com" },
    { doctor_id: "p8", name: "Dr. Anita Gupta", specialization: "Dermatologist", experience: 8, qualifications: "MBBS, DVD, DNB", recommendation_percent: 91, consultation_fees: 450, locality: "Connaught Place", city: "Delhi", photo_url: "https://randomuser.me/api/portraits/women/35.jpg", practo_url: "https://www.practo.com" },
    { doctor_id: "p9", name: "Dr. Ravi Rungta", specialization: "Cardiologist", experience: 16, qualifications: "MBBS, MD (Medicine), DM", recommendation_percent: 96, consultation_fees: 900, locality: "Boring Road", city: "Patna", photo_url: "https://randomuser.me/api/portraits/men/48.jpg", practo_url: "https://www.practo.com" },
    { doctor_id: "p10", name: "Dr. Pooja Das", specialization: "ENT Specialist", experience: 11, qualifications: "MBBS, MS (ENT)", recommendation_percent: 92, consultation_fees: 550, locality: "Kankarbagh", city: "Patna", photo_url: "https://randomuser.me/api/portraits/women/52.jpg", practo_url: "https://www.practo.com" },
];

// ─── Search Doctors ─────────────────────────────────────────────
router.get('/search', async (req, res) => {
    const { city, q, locality } = req.query;
    if (!city) return res.status(400).json({ message: 'City is required' });

    if (!hasRealKeys()) {
        // Mock mode
        let results = MOCK_DOCTORS.filter(d => d.city.toLowerCase() === city.toLowerCase());
        if (q) results = results.filter(d => d.name.toLowerCase().includes(q.toLowerCase()) || d.specialization.toLowerCase().includes(q.toLowerCase()));
        if (locality) results = results.filter(d => d.locality.toLowerCase() === locality.toLowerCase());
        return res.json({ doctors: results });
    }

    try {
        const params = { city };
        if (q) params.q = q;
        if (locality) params.locality = locality;
        const response = await axios.get(`${PRACTO_BASE}/search`, { headers: practoHeaders(), params });
        res.json(response.data);
    } catch (error) {
        console.error('Practo Search Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ message: 'Practo API error', details: error.response?.data || error.message });
    }
});

// ─── Doctor Details ─────────────────────────────────────────────
router.get('/doctor/:doctorId', async (req, res) => {
    const { doctorId } = req.params;

    if (!hasRealKeys()) {
        const doc = MOCK_DOCTORS.find(d => d.doctor_id === doctorId);
        return doc ? res.json(doc) : res.status(404).json({ message: 'Doctor not found' });
    }

    try {
        const response = await axios.get(`${PRACTO_BASE}/doctors/${doctorId}`, { headers: practoHeaders() });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Practo API error', details: error.response?.data || error.message });
    }
});

// ─── Practice / Clinic Details ──────────────────────────────────
router.get('/practice/:practiceId', async (req, res) => {
    if (!hasRealKeys()) {
        return res.json({ practice_id: req.params.practiceId, name: "City Health Clinic", address: "123 Main Street", city: "Bangalore", timings: "9:00 AM - 9:00 PM" });
    }
    try {
        const response = await axios.get(`${PRACTO_BASE}/practices/${req.params.practiceId}`, { headers: practoHeaders() });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Practo API error', details: error.response?.data || error.message });
    }
});

// ─── Meta: Supported Cities ────────────────────────────────────
router.get('/meta/cities', async (req, res) => {
    if (!hasRealKeys()) {
        return res.json({ cities: MOCK_CITIES });
    }
    try {
        const response = await axios.get(`${PRACTO_BASE}/search/metadata/cities`, { headers: practoHeaders() });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Practo API error', details: error.response?.data || error.message });
    }
});

// ─── Meta: Localities for a City ────────────────────────────────
router.get('/meta/localities', async (req, res) => {
    const { city } = req.query;
    if (!city) return res.status(400).json({ message: 'City is required' });

    if (!hasRealKeys()) {
        const localities = MOCK_LOCALITIES[city] || ["Area 1", "Area 2", "Area 3"];
        return res.json({ localities });
    }
    try {
        const response = await axios.get(`${PRACTO_BASE}/search/metadata/localities`, { headers: practoHeaders(), params: { city } });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Practo API error', details: error.response?.data || error.message });
    }
});

module.exports = router;
