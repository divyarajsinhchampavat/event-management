import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Event } from '../utils/types';
import './Events.css';


const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(1); // Pagination state
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // To check if there are more events
    const token = localStorage.getItem('token'); // assuming token is stored after login

    const fetchEvents = async (nextPage: number) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:4000/events', {
                params: {
                    page: nextPage, // Pass the current page to backend
                    limit: 10, // You can set the limit as per your need
                    sortBy: 'id',
                    sortOrder: 'ASC',
                    search,
                    startDate,
                    endDate
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const fetchedEvents = response.data;

            // Replace existing events with new ones
            setEvents(fetchedEvents);

            // If the length of the response is less than the limit, no more data
            setHasMore(fetchedEvents.length === 10);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1); // Reset to first page when new search is submitted
        fetchEvents(1); // Fetch first page of events
    };

    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchEvents(nextPage);
    };

    const handlePrevPage = () => {
        const prevPage = page > 1 ? page - 1 : 1;
        setPage(prevPage);
        fetchEvents(prevPage);
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:4000/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // Refetch events after deletion
            fetchEvents(page);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div>
            <h2>Search Events</h2>
            <Link to="/events/create">
                <button>Create New Event</button>
            </Link>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="search">Event Name or Description:</label>
                    <input
                        type="text"
                        id="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading events...</p>}

            {!loading && events.length > 0 && (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Images</th> {/* Added Images column */}
                                <th>Actions</th> {/* Added Actions column */}
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (                                
                                <tr key={event.id}>
                                    <td>{event.name}</td>
                                    <td>{event.description}</td>
                                    <td>{new Date(event.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(event.endDate).toLocaleDateString()}</td>
                                    <td>
                                        {event.images && event.images.length > 0 ? (
                                            event.images.map((img, index) => (        
                                            <img
                                                key={index}
                                                src={img.images} 
                                                alt={`Event ${event.id}`}
                                                style={{ width: '100px', height: 'auto', marginRight: '10px' }}
                                            />
                                            ))
                                        ) : (
                                            <p>No images</p>
                                        )}
                                        </td>
                                    <td>
                                        <Link to={`/events/edit/${event.id}`}>
                                            <button>Edit</button>
                                        </Link>
                                        <button onClick={() => handleDelete(event.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {page > 1 && !loading && (
                        <button onClick={handlePrevPage}>Previous</button>
                    )}
                    {hasMore && !loading && (
                        <button onClick={handleNextPage}>Next</button>
                    )}
                </>
            )}

            {!loading && events.length === 0 && <p>No events found.</p>}
        </div>
    );
};

export default Events;
