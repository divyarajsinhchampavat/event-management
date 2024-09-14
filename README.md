# Event Management App

## Overview

The Event Management App is a full-stack application designed to manage events efficiently. It includes features for creating, viewing, updating, and deleting events, as well as user management and image upload capabilities.

## Technologies Used

- **Frontend**: ReactJS, TypeScript, CSS
- **Backend**: NestJS, TypeScript, PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Image Handling**: Multer for file uploads

## Setup

### Setup Backend

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/event-management.git
   cd event-management/backend


## Installation Guide
Navigate to the backend directory and run:

```bash
npm install

### **Create Backend `.env` File**

Create a `.env` file in the backend directory and add your environment variables. For example:

```env
DATABASE_NAME = event_management_backend
DATABASE_HOST = localhost
DATABASE_PORT = 5432
DATABASE_USERNAME = postgres
DATABASE_PASSWORD = G@ll@gher
JWT_SECRET=your_jwt_secret
```

## Run Database Migrations
  ```bash
npm run migration:run
```

## Start the Backend Server

```bash
npm run start
```

The backend server will be running at http://localhost:3000.

## Navigate to the Frontend Directory
```bash
cd ../frontend
```
## Install Frontend Dependencies
E
nsure you are in the frontend directory and run:

```bash
npm install
```

## Start the Frontend Server
```bash
npm start
```

The frontend application will be running at http://localhost:3001.



## Features

- **Backend**: Built with NestJS, includes API endpoints for managing events and user authentication.
- **Frontend**: Built with ReactJS, provides a user interface for interacting with events.

## API Endpoints

- **Create Event**: `POST /events`
- **Get Events**: `GET /events`
- **Update Event**: `PUT /events/:id`
- **Delete Event**: `DELETE /events/:id`
- **Create User**: `POST /users`
- **Login**: `POST /auth/login`
