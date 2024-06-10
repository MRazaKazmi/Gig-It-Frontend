import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../GigBossesPage.css';

const GigBossesPage = () => {
  const navigate = useNavigate();

  const handlePostGig = () => {
    navigate('/post-gig');
  };

  const handleViewProposals = () => {
    navigate('/gig-bosses/view-proposals');
  };

  return (
    <div className="gig-bosses-page">
    <div className="main-container">
      <h2 className="page-title">Gig Bosses Page</h2>
      <button onClick={handlePostGig} className="btn">Post a Gig</button>
      <button onClick={handleViewProposals} className="btn">View Proposals</button>
    </div>
    </div>
  );
};

export default GigBossesPage;
