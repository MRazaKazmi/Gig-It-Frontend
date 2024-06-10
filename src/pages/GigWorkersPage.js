import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../GigWorkersPage.css';

const GigWorkersPage = () => {
  const navigate = useNavigate();

  const handleFindGig = () => {
    navigate('/gig-workers/gigs');
  };

  const handleViewProposals = () => {
    navigate('/gig-workers/view-proposals');
  };

  return (
    <div className="gig-workers-page">
    <div className="main-container">
      <h2 className="page-title">Gig Workers Page</h2>
      <button onClick={handleFindGig} className="btn">Find a Gig</button>
      <button onClick={handleViewProposals} className="btn">View Proposals</button>
    </div>
    </div>
  );
};

export default GigWorkersPage;
