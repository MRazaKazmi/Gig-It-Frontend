import React from 'react';
import '../GigWorkersPage.css';

const Search = ({ searchTerm, handleSearchChange, handleWorkerTypeClick }) => {
  return (
    <div className="search-section">
      <input
        type="text"
        placeholder="Search gigs..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="filter-section">
        <button onClick={() => handleWorkerTypeClick('roofing')} className="filter-button">
          <img src="/images/roofer.svg" alt="Roofer" />
          Roofer
        </button>
        <button onClick={() => handleWorkerTypeClick('plumbing')} className="filter-button">
          <img src="/images/plumber.svg" alt="Plumber" />
          Plumber
        </button>
        <button onClick={() => handleWorkerTypeClick('electrical')} className="filter-button">
          <img src="/images/electrician.svg" alt="Electrician" />
          Electrician
        </button>
        <button onClick={() => handleWorkerTypeClick('masonry')} className="filter-button">
          <img src="/images/mason2.svg" alt="Mason" />
          Mason
        </button>
        <button onClick={() => handleWorkerTypeClick('carpentry')} className="filter-button">
          <img src="/images/carpenter.svg" alt="Carpenter" />
          Carpenter
        </button>
        <button onClick={() => handleWorkerTypeClick('flooring')} className="filter-button">
          <img src="/images/floorer.svg" alt="Floorer" />
          Floorer
        </button>
      </div>
    </div>
  );
};

export default Search;
