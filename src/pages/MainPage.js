import React from 'react';
import { Link } from 'react-router-dom';
import '../MainPage.css';

const MainPage = () => {
  return (
    <div className="main-container">
      <div className="background-image-container">
        <img src="/images/main-page-background-transformed.jpeg" alt="Construction" className="background-image" />
        <div className="button-container">
          <Link to="/gig-workers">
            <button className="main-button">Gig Workers</button>
          </Link>
          <Link to="/gig-bosses">
            <button className="main-button">Gig Bosses</button>
          </Link>
        </div>
      </div>
      <div className="welcome-section">
        <h2>Welcome to GigIt!</h2>
        <p>
          GigIt is your one-stop marketplace for all construction-related gigs. Whether you are a gig worker looking for your next project or a gig boss in need of skilled labor, we have you covered. Browse through our listings, post a job, or find the perfect gig today!
        </p>
      </div>
      <footer className="footer">
        <p>Made with <span className="heart">&hearts;</span> by Raza Kazmi</p>
      </footer>
    </div>
  );
};

export default MainPage;