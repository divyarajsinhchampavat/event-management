import React from 'react';
import { Event } from '../utils/types';
import styles from './EventCard.module.css';

interface EventCardProps extends Event {}

const EventCard: React.FC<EventCardProps> = ({ name, description, startDate, endDate, totalGuests }) => {
  return (
    <div className={styles.card}>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
      {totalGuests && <p>Total Guests: {totalGuests}</p>}
    </div>
  );
};

export default EventCard;
