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
      <div>
        <h1>Welcome, Gig Worker!</h1>
        <p>
          Thank you for joining our community of skilled gig workers. Here, you can find a variety of construction gigs
          that match your skills and preferences. Make sure to check out the latest postings and apply for the ones that
          interest you.
        </p>
        <p>
          If you have any questions or need assistance, feel free to reach out to our support team. We're here to help
          you succeed!
        </p>
      </div>
      <button onClick={handleFindGig} className="btn">Find a Gig</button>
      <button onClick={handleViewProposals} className="btn">View Proposals</button>
    </div>
    </div>
  );
};

export default GigWorkersPage;
