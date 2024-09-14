import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalGuests, setTotalGuests] = useState<number | undefined>(undefined);
  const [images, setImages] = useState<File[]>([]);
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('totalGuests', totalGuests?.toString() || '');
    images.forEach(image => formData.append('images', image));

    try {
      await axios.post(`http://localhost:3000/events`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      // Handle successful event creation
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
      <div>
        <label htmlFor="totalGuests">Total Guests:</label>
        <input
          type="number"
          id="totalGuests"
          value={totalGuests}
          onChange={(e) => setTotalGuests(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="images">Images:</label>
        <input
          type="file"
          id="images"
          multiple
          onChange={handleImageChange}
        />
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEvent;
