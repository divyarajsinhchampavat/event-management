import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get event ID from URL
    const [event, setEvent] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`${process.env.URL}/events/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setEvent(response.data);
            } catch (error) {
                setError('Error fetching event details');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id, token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvent((prevEvent: any) => ({ ...prevEvent, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.URL}/events/${id}`, event, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            navigate('/events'); // Redirect to events list after update
        } catch (error) {
            setError('Error updating event');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Edit Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={event.name || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={event.description || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={event.startDate ? event.startDate.split('T')[0] : ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={event.endDate ? event.endDate.split('T')[0] : ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Event</button>
            </form>
        </div>
    );
};

export default EditEvent;
