import React, { useState, useEffect } from 'react';
import SearchGigComponent from '../components/SearchGigComponent';
import GigResultsComponent from '../components/GigResultsComponent';
import '../GigWorkersPage.css';

const FindGigPage = () => {
  const [gigs, setGigs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [workerType, setWorkerType] = useState('');

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (!tokenFromStorage) {
      console.error('No token found. User is not authenticated.');
      return;
    }

    fetch('https://my-gigit-app-b9bbde9c9441.herokuapp.com/gigs', {
      headers: {
        Authorization: `Bearer ${tokenFromStorage}`
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch gigs. Status: ' + response.status);
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        setGigs(data);
      } else {
        console.error('Error fetching gigs: Data is not an array');
      }
    })
    .catch((error) => console.error('Error fetching gigs:', error));
  }, []); // Empty dependency array ensures this effect runs only once

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleWorkerTypeClick = (type) => {
    setWorkerType(type);
  };

  const filteredGigs = gigs.filter((gig) => {
    return (
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!workerType || gig.type === workerType)
    );
  });

  return (
    <div className="gig-workers-page">
      <h1 className="page-title">Gig Workers</h1>
      <SearchGigComponent
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleWorkerTypeClick={handleWorkerTypeClick}
      />
      <GigResultsComponent gigs={filteredGigs} />
    </div>
  );
};

export default FindGigPage;
