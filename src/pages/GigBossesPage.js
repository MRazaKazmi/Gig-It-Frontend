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
    <div>
      <h1>Welcome, Gig Boss!</h1>
        <p>
          Thank you for joining our community of gig bosses. Here, you can post various construction gigs and find
          skilled workers to get your projects done efficiently. Make sure to review the latest proposals from gig workers
          and select the best candidates for your needs.
        </p>
        <p>
          If you have any questions or need assistance, feel free to reach out to our support team. We're here to help you
          find the right talent for your projects!
        </p>
      </div>
      <button onClick={handlePostGig} className="btn">Post a Gig</button>
      <button onClick={handleViewProposals} className="btn">View Proposals</button>
    </div>
    </div>
  );
};

export default GigBossesPage;
