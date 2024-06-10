import React from 'react';
import '../GigWorkersPage.css';
import { Link } from 'react-router-dom';


const GigResult = ({ gig }) => {
  return (
    <div className="gig-result">
      <h3>{gig.title}</h3>
      <p>{gig.description}</p>
      <p><strong>Location:</strong> {gig.location}</p>
      <p><strong>Type:</strong> {gig.type}</p>
      <p><strong>Budget:</strong> ${gig.budget}</p>
      <p><strong>Status:</strong> {gig.status}</p>
      <Link to={`/gigs/${gig.gigid}/proposal`}>Propose</Link>

    </div>
  );
};

export default GigResult;
