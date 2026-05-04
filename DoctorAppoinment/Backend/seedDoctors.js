const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const doctors = [
    // ─── Karnataka ──────────────────────────
    { name: 'Dr. Arun Kumar', email: 'dr.arun@hospital.com', specialization: 'Cardiologist', experience: 22, rating: 4.9, phone: '+91 9876543210', state: 'Karnataka', district: 'Bangalore Urban', fees: 800, about: 'Senior Cardiologist at Narayana Health. MD from AIIMS Delhi. Specializes in interventional cardiology and heart failure management.', coordinates: [77.5946, 12.9716] },
    { name: 'Dr. Kavita Nair', email: 'dr.kavita@hospital.com', specialization: 'Ophthalmologist', experience: 14, rating: 4.8, phone: '+91 9876543211', state: 'Karnataka', district: 'Mysore', fees: 650, about: 'Eye specialist at Mysore Eye Hospital. Expert in cataract surgery and LASIK procedures.', coordinates: [76.6394, 12.2958] },

    // ─── Maharashtra ────────────────────────
    { name: 'Dr. Priya Sharma', email: 'dr.priya@hospital.com', specialization: 'Dermatologist', experience: 15, rating: 4.9, phone: '+91 9876543212', state: 'Maharashtra', district: 'Mumbai', fees: 1000, about: 'Consultant Dermatologist at Kokilaben Hospital. MBBS, MD Dermatology. Expert in cosmetic dermatology and hair transplant.', coordinates: [72.8777, 19.0760] },
    { name: 'Dr. Nisha Agarwal', email: 'dr.nisha@hospital.com', specialization: 'Oncologist', experience: 20, rating: 4.9, phone: '+91 9876543213', state: 'Maharashtra', district: 'Pune', fees: 1500, about: 'Senior Oncologist at Tata Memorial Hospital. DNB Oncology. 20+ years in cancer treatment.', coordinates: [73.8567, 18.5204] },

    // ─── Delhi ──────────────────────────────
    { name: 'Dr. Rajesh Gupta', email: 'dr.rajesh@hospital.com', specialization: 'Orthopedic', experience: 28, rating: 4.8, phone: '+91 9876543214', state: 'Delhi', district: 'New Delhi', fees: 1200, about: 'HOD Orthopedics at AIIMS Delhi. Expert in joint replacement and sports injuries. MS Orthopedics, Fellowship UK.', coordinates: [77.2090, 28.6139] },
    { name: 'Dr. Amit Verma', email: 'dr.amit@hospital.com', specialization: 'Gastroenterologist', experience: 21, rating: 4.7, phone: '+91 9876543215', state: 'Delhi', district: 'South Delhi', fees: 900, about: 'Senior Gastroenterologist at Sir Ganga Ram Hospital. DM Gastro from PGI Chandigarh.', coordinates: [77.2273, 28.5382] },

    // ─── Tamil Nadu ─────────────────────────
    { name: 'Dr. Sneha Reddy', email: 'dr.sneha@hospital.com', specialization: 'Gynecologist', experience: 18, rating: 4.9, phone: '+91 9876543216', state: 'Tamil Nadu', district: 'Chennai', fees: 700, about: 'Consultant Gynecologist at Apollo Hospital Chennai. MS OBG, Fellowship in Reproductive Medicine.', coordinates: [80.2707, 13.0827] },
    { name: 'Dr. Karthik Rajan', email: 'dr.karthik@hospital.com', specialization: 'Urologist', experience: 24, rating: 4.8, phone: '+91 9876543217', state: 'Tamil Nadu', district: 'Coimbatore', fees: 1100, about: 'Senior Urologist at KMCH. MCh Urology. Expert in kidney stone removal and prostate surgery.', coordinates: [76.9558, 11.0168] },

    // ─── Telangana ──────────────────────────
    { name: 'Dr. Vikram Singh', email: 'dr.vikram@hospital.com', specialization: 'Neurologist', experience: 20, rating: 4.8, phone: '+91 9876543218', state: 'Telangana', district: 'Hyderabad', fees: 900, about: 'Senior Neurologist at KIMS Hospital. DM Neurology from NIMHANS. Expert in epilepsy and stroke management.', coordinates: [78.4867, 17.3850] },
    { name: 'Dr. Harish Rao', email: 'dr.harish@hospital.com', specialization: 'Radiologist', experience: 18, rating: 4.6, phone: '+91 9876543219', state: 'Telangana', district: 'Warangal', fees: 700, about: 'Consultant Radiologist. DMRD, DNB Radiology. Expert in MRI and CT diagnostics.', coordinates: [79.5941, 17.9784] },

    // ─── Kerala ─────────────────────────────
    { name: 'Dr. Deepa Menon', email: 'dr.deepa@hospital.com', specialization: 'General Physician', experience: 12, rating: 4.7, phone: '+91 9876543220', state: 'Kerala', district: 'Kochi', fees: 400, about: 'General Physician at Amrita Hospital Kochi. MD Internal Medicine. 12 years of clinical practice.', coordinates: [76.2673, 9.9312] },
    { name: 'Dr. Lakshmi Pillai', email: 'dr.lakshmi@hospital.com', specialization: 'Ayurveda', experience: 30, rating: 4.9, phone: '+91 9876543221', state: 'Kerala', district: 'Thiruvananthapuram', fees: 350, about: 'Senior Ayurvedic Physician. BAMS, MD Ayurveda. 30 years of traditional healing experience.', coordinates: [76.9366, 8.5241] },

    // ─── Gujarat ────────────────────────────
    { name: 'Dr. Suresh Patel', email: 'dr.suresh@hospital.com', specialization: 'ENT Specialist', experience: 25, rating: 4.7, phone: '+91 9876543222', state: 'Gujarat', district: 'Ahmedabad', fees: 600, about: 'Senior ENT Surgeon at Sterling Hospital. MS ENT. Expert in sinus surgery and cochlear implants.', coordinates: [72.5714, 23.0225] },

    // ─── West Bengal ────────────────────────
    { name: 'Dr. Anita Desai', email: 'dr.anita@hospital.com', specialization: 'Pediatrician', experience: 16, rating: 4.9, phone: '+91 9876543223', state: 'West Bengal', district: 'Kolkata', fees: 500, about: 'Consultant Pediatrician at AMRI Hospital. MD Pediatrics from CMC Vellore. Expert in child nutrition.', coordinates: [88.3639, 22.5726] },

    // ─── Rajasthan ──────────────────────────
    { name: 'Dr. Manish Joshi', email: 'dr.manish@hospital.com', specialization: 'Psychiatrist', experience: 19, rating: 4.9, phone: '+91 9876543224', state: 'Rajasthan', district: 'Jaipur', fees: 1200, about: 'Senior Psychiatrist at SMS Hospital Jaipur. MD Psychiatry. Expert in anxiety, depression and addiction.', coordinates: [75.7873, 26.9124] },

    // ─── Uttar Pradesh ──────────────────────
    { name: 'Dr. Ravi Shankar', email: 'dr.ravi@hospital.com', specialization: 'Pulmonologist', experience: 23, rating: 4.8, phone: '+91 9876543225', state: 'Uttar Pradesh', district: 'Lucknow', fees: 750, about: 'Senior Pulmonologist at KGMU. DM Pulmonary Medicine. Expert in asthma, COPD and TB treatment.', coordinates: [80.9462, 26.8467] },

    // ─── Punjab ─────────────────────────────
    { name: 'Dr. Shalini Kapoor', email: 'dr.shalini@hospital.com', specialization: 'Dentist', experience: 11, rating: 4.8, phone: '+91 9876543226', state: 'Punjab', district: 'Ludhiana', fees: 500, about: 'BDS, MDS Orthodontics from DMC Ludhiana. Expert in braces, invisalign and dental implants.', coordinates: [75.8573, 30.9010] },

    // ─── Madhya Pradesh ─────────────────────
    { name: 'Dr. Meera Iyer', email: 'dr.meera@hospital.com', specialization: 'Endocrinologist', experience: 17, rating: 4.9, phone: '+91 9876543227', state: 'Madhya Pradesh', district: 'Bhopal', fees: 850, about: 'Consultant Endocrinologist at Bansal Hospital. DM Endocrinology. Expert in diabetes and thyroid disorders.', coordinates: [77.4126, 23.2599] },

    // ─── Bihar ──────────────────────────────
    { name: 'Dr. Sanjay Mehta', email: 'dr.sanjay@hospital.com', specialization: 'Nephrologist', experience: 26, rating: 4.7, phone: '+91 9876543228', state: 'Bihar', district: 'Patna', fees: 950, about: 'Senior Nephrologist at PMCH Patna. DM Nephrology. Expert in dialysis and kidney transplant.', coordinates: [85.1376, 25.6093] },

    // ─── Haryana ────────────────────────────
    { name: 'Dr. Pooja Saxena', email: 'dr.pooja@hospital.com', specialization: 'Physiotherapist', experience: 10, rating: 4.8, phone: '+91 9876543229', state: 'Haryana', district: 'Gurugram', fees: 400, about: 'BPT, MPT Sports Physiotherapy. Expert in sports injuries, post-surgical rehab and spine care.', coordinates: [77.0266, 28.4595] },

    // ─── Odisha ─────────────────────────────
    { name: 'Dr. Sarita Mohanty', email: 'dr.sarita@hospital.com', specialization: 'General Physician', experience: 15, rating: 4.6, phone: '+91 9876543230', state: 'Odisha', district: 'Bhubaneswar', fees: 350, about: 'General Physician at AIIMS Bhubaneswar. MD Internal Medicine. 15 years of clinical experience.', coordinates: [85.8245, 20.2961] },

    // ─── Assam ──────────────────────────────
    { name: 'Dr. Bhaskar Dutta', email: 'dr.bhaskar@hospital.com', specialization: 'Cardiologist', experience: 19, rating: 4.7, phone: '+91 9876543231', state: 'Assam', district: 'Guwahati', fees: 700, about: 'Consultant Cardiologist at GNRC Hospital. DM Cardiology. Expert in angioplasty and pacemaker implant.', coordinates: [91.7362, 26.1445] },

    // ─── Jharkhand ──────────────────────────
    { name: 'Dr. Sunita Kumari', email: 'dr.sunita@hospital.com', specialization: 'Gynecologist', experience: 13, rating: 4.6, phone: '+91 9876543232', state: 'Jharkhand', district: 'Ranchi', fees: 500, about: 'Consultant Obstetrician & Gynecologist at Medica Hospital Ranchi. MS OBG. Expert in high-risk pregnancies.', coordinates: [85.3096, 23.3441] },

    // ─── Chhattisgarh ───────────────────────
    { name: 'Dr. Rakesh Tiwari', email: 'dr.rakesh@hospital.com', specialization: 'Orthopedic', experience: 16, rating: 4.5, phone: '+91 9876543233', state: 'Chhattisgarh', district: 'Raipur', fees: 600, about: 'Orthopedic Surgeon at Ramkrishna Care Hospital. MS Orthopedics. Expert in fracture management and arthroscopy.', coordinates: [81.6296, 21.2514] },

    // ─── Uttarakhand ────────────────────────
    { name: 'Dr. Neha Rawat', email: 'dr.neha@hospital.com', specialization: 'Dermatologist', experience: 9, rating: 4.7, phone: '+91 9876543234', state: 'Uttarakhand', district: 'Dehradun', fees: 500, about: 'Dermatologist at Max Hospital Dehradun. MD Dermatology. Expert in acne treatment and skin rejuvenation.', coordinates: [78.0322, 30.3165] },

    // ─── Himachal Pradesh ───────────────────
    { name: 'Dr. Aman Thakur', email: 'dr.aman@hospital.com', specialization: 'General Physician', experience: 14, rating: 4.6, phone: '+91 9876543235', state: 'Himachal Pradesh', district: 'Shimla', fees: 400, about: 'General Physician at IGMC Shimla. MD Medicine. 14 years serving in hill regions.', coordinates: [77.1734, 31.1048] },

    // ─── Jammu and Kashmir ──────────────────
    { name: 'Dr. Faisal Ahmad', email: 'dr.faisal@hospital.com', specialization: 'Pediatrician', experience: 12, rating: 4.7, phone: '+91 9876543236', state: 'Jammu and Kashmir', district: 'Srinagar', fees: 500, about: 'Consultant Pediatrician at SKIMS Srinagar. MD Pediatrics. Expert in neonatal care and child health.', coordinates: [74.7973, 34.0837] },

    // ─── Goa ────────────────────────────────
    { name: 'Dr. Carlos Fernandes', email: 'dr.carlos@hospital.com', specialization: 'Dentist', experience: 20, rating: 4.8, phone: '+91 9876543237', state: 'Goa', district: 'North Goa', fees: 550, about: 'Senior Dental Surgeon at Goa Medical College. MDS Prosthodontics. Expert in dental implants and smile design.', coordinates: [73.8278, 15.4909] },

    // ─── Chandigarh ─────────────────────────
    { name: 'Dr. Gurpreet Kaur', email: 'dr.gurpreet@hospital.com', specialization: 'Neurologist', experience: 17, rating: 4.8, phone: '+91 9876543238', state: 'Chandigarh', district: 'Chandigarh', fees: 1000, about: 'Neurologist at PGI Chandigarh. DM Neurology. Expert in stroke, Parkinson\'s disease and headache disorders.', coordinates: [76.7794, 30.7333] },
];

const seedDoctors = async () => {
    await connectDB();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('doctor123', salt);

        let created = 0;
        let skipped = 0;

        for (const doc of doctors) {
            const exists = await User.findOne({ email: doc.email });
            if (exists) {
                skipped++;
                console.log(`⏭️  Skipped (already exists): ${doc.name}`);
                continue;
            }

            await User.create({
                name: doc.name,
                email: doc.email,
                password: hashedPassword,
                role: 'doctor',
                specialization: doc.specialization,
                experience: doc.experience,
                rating: doc.rating,
                phone: doc.phone,
                state: doc.state,
                district: doc.district,
                fees: doc.fees,
                about: doc.about,
                image: `https://randomuser.me/api/portraits/${doc.name.includes('Dr. P') || doc.name.includes('Dr. S') || doc.name.includes('Dr. N') || doc.name.includes('Dr. K') || doc.name.includes('Dr. M') || doc.name.includes('Dr. A') && !doc.name.includes('Amit') && !doc.name.includes('Aman') || doc.name.includes('Dr. D') || doc.name.includes('Dr. L') || doc.name.includes('Dr. G') ? 'women' : 'men'}/${10 + created}.jpg`,
                location: {
                    type: 'Point',
                    coordinates: doc.coordinates,
                },
                availableSlots: [
                    { day: 'Monday', startTime: '09:00', endTime: '13:00' },
                    { day: 'Tuesday', startTime: '09:00', endTime: '13:00' },
                    { day: 'Wednesday', startTime: '14:00', endTime: '18:00' },
                    { day: 'Thursday', startTime: '09:00', endTime: '13:00' },
                    { day: 'Friday', startTime: '09:00', endTime: '17:00' },
                    { day: 'Saturday', startTime: '10:00', endTime: '14:00' },
                ],
            });
            created++;
            console.log(`✅ Created: ${doc.name} (${doc.specialization}) - ${doc.district}, ${doc.state}`);
        }

        console.log(`\n🎉 Seeding complete! Created: ${created}, Skipped: ${skipped}`);
        console.log(`📊 Total doctors in DB: ${await User.countDocuments({ role: 'doctor' })}`);
        process.exit();
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedDoctors();
