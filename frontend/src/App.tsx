import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Events from './pages/Events';
import EditEvent from './components/EditEvent';
import CreateEvent from './components/CreateEvent';
import CreateUser from './pages/CreateUser';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/edit/:id" element={<EditEvent />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/create-user" element={<CreateUser />} /> 
      </Routes>
    </Router>
  );
};

export default App;
