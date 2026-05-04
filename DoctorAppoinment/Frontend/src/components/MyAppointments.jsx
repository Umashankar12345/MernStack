import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/MyAppointments.css';
import Footer from './Footer';

const MyAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:5000/api/appointments', config);
        setAppointments(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch appointments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="appointments-page">
      <Navbar />

      <div className="appointments-container">
        <h2>My Appointments</h2>
        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

        {appointments.length === 0 ? (
          <div className="no-appointments">
            <p>No appointments booked yet</p>
            <button onClick={() => navigate('/departments')}>Book Your First Appointment</button>
          </div>
        ) : (
          <div className="appointments-list">
            {appointments.map(appt => (
              <div key={appt._id} className="appointment-card">
                <div className="appt-header">
                  <h3>{appt.doctorName}</h3>
                  <span className={`status ${appt.status.toLowerCase()}`}>
                    {appt.status}
                  </span>
                </div>
                <div className="appt-details">
                  <p><strong>Department:</strong> {appt.department}</p>
                  <p><strong>Date:</strong> {appt.date}</p>
                  <p><strong>Time:</strong> {appt.timeSlot}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyAppointments;