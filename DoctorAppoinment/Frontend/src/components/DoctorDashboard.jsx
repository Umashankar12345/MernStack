import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

function DoctorDashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            if (!token || !user || user.role !== 'doctor') {
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
            } catch (error) {
                console.error('Error fetching appointments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [navigate]);

    const handleStatusUpdate = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.put(`http://localhost:5000/api/appointments/${id}`, { status }, config);

            // Update UI
            setAppointments(appointments.map(appt =>
                appt._id === id ? { ...appt, status } : appt
            ));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Doctor Dashboard</h1>

                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {appointments.length === 0 ? (
                            <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                                No appointments found.
                            </li>
                        ) : (
                            appointments.map((appt) => (
                                <li key={appt._id} className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <p className="text-sm font-medium text-indigo-600 truncate">
                                                Patient: {appt.patientName}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {appt.date} at {appt.timeSlot}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Department: {appt.department}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${appt.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    appt.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'}`}>
                                                {appt.status}
                                            </span>
                                        </div>
                                        {appt.status === 'pending' && (
                                            <div className="flex space-x-2 ml-4">
                                                <button
                                                    onClick={() => handleStatusUpdate(appt._id, 'approved')}
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(appt._id, 'rejected')}
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DoctorDashboard;
