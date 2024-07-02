import React from 'react';
import '../GigWorkersPage.css';
import { useNavigate } from 'react-router-dom';

const GigResult = ({ gig }) => {
  const navigate = useNavigate();

  const handleProposeClick = () => {
    navigate(`/gigs/${gig.gigid}/proposal`);
  };

  return (
    <div className={`gig-result ${gig.status === 'Closed' ? 'closed' : ''}`}>
      <h3>{gig.title}</h3>
      <p>{gig.description}</p>
      <p><strong>Location:</strong> {gig.location}</p>
      <p><strong>Type:</strong> {gig.type}</p>
      <p><strong>Budget:</strong> ${gig.budget}</p>
      <p><strong>Status:</strong> {gig.status}</p>
      {gig.status !== 'Closed' && (
        <div className="buttons-container">
          <button className="propose-button" onClick={handleProposeClick}>Propose</button>
        </div>
      )}
    </div>
  );
};

export default GigResult;
