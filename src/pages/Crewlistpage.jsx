// CrewListPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./CrewListPage.css"

const API_URL = "https://dm-airlines.adaptable.app";

const CrewListPage = () => {
  const [crewMembers, setCrewMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Go back to the last page
  };

  useEffect(() => {
    axios.get(`${API_URL}/api/crews`)
      .then(response => {
        setCrewMembers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.getTime() ? date.toLocaleDateString() : 'Invalid Date';
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Retired':
        return 'status-retired';
      case 'On Leave':
        return 'status-on-leave';
      default:
        return '';
    }
  };

  const filteredCrewMembers = crewMembers.filter(crew => 
    crew.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crew.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    formatDate(crew.birthday).toLowerCase().includes(searchQuery.toLowerCase()) ||
    (crew.typerating || 'N/A').toLowerCase().includes(searchQuery.toLowerCase()) ||
    formatDate(crew.license).toLowerCase().includes(searchQuery.toLowerCase()) ||
    crew.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  return (
    <div className="crew-list-container">
        <h1>Crew Members</h1>
        <div className="button-container">
          <button onClick={goBack} className='button-back-flight'>&larr;</button>
          <Link to="/add-crew" className="add-crew-link">Add New</Link>
        </div>
      <input 
        type="text" 
        placeholder="Search Crew Members..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="search-bar"
      />
      <table className="crew-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Role</th>
            <th>Birthday</th>
            <th>Type Rating</th>
            <th>License Expiry</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredCrewMembers.map(crew => (
            <tr key={crew._id} className="crew-row" onClick={() => navigate(`/crews/${crew._id}`)}>
              <td><img src={crew.profilePicture} alt={`${crew.name}'s Profile Image`} width={"50px"}/></td>
              <td>{crew.name}</td>
              <td>{crew.role}</td>
              <td>{formatDate(crew.birthday)}</td>
              <td>{crew.typerating || 'N/A'}</td>
              <td>{formatDate(crew.license)}</td>
              <td className={getStatusClassName(crew.status)}>{crew.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrewListPage;
