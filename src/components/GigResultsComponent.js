import React from 'react';
import GigResultComponent from './GigResultComponent';
import '../GigWorkersPage.css';

const GigResultsComponent = ({ gigs }) => {
  return (
    <div className="gig-results">
      {gigs.length === 0 ? (
        <p>No gigs found.</p>
      ) : (
        gigs.map((gig) => <GigResultComponent key={gig.gigid} gig={gig} />)
      )}
    </div>
  );
};

export default GigResultsComponent;
