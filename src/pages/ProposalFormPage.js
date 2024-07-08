import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../ProposalFormPage.css';

const parseJwt = (token) => {
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return {
      userid: decodedToken.userid || (decodedToken.user && decodedToken.user.userid),
      usertype: decodedToken.usertype || (decodedToken.user && decodedToken.user.usertype)
    };
  } catch (e) {
    return null;
  }
};

const ProposalFormPage = () => {
  const { gigid } = useParams();
  const [token, setToken] = useState('');
  const [form, setForm] = useState({
    gigid,
    userid: '',
    coverletter: '', // Initialize with an empty string or default value
    bidamount: '', // Initialize with an empty string or default value
    datesubmitted: new Date().toISOString().split('T')[0], // Initialize with today's date
    status: 'Pending', // default status
  });
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      const decodedToken = parseJwt(tokenFromStorage);
      if (decodedToken) {
        console.log("Decoded Token:", decodedToken);
        setForm((prevForm) => ({
          ...prevForm,
          userid: decodedToken.userid,
        }));
        setToken(tokenFromStorage);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://my-gigit-app-b9bbde9c9441.herokuapp.com/gigs/${gigid}/proposals/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Proposal submitted successfully:', data);
        navigate('/gig-workers');
      })
      .catch((error) => {
        console.error('Error submitting proposal:', error.message);
      });
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Submit Proposal</h2>
      <form onSubmit={handleSubmit} className="proposal-form">
        <div className="form-group">
          <label htmlFor="coverletter">Cover Letter</label>
          <input
            type="text"
            id="coverletter"
            name="coverletter"
            value={form.coverletter}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bidamount">Bid Amount</label>
          <input
            type="number"
            id="bidamount"
            name="bidamount"
            value={form.bidamount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="datesubmitted">Date Submitted</label>
          <input
            type="date"
            id="datesubmitted"
            name="datesubmitted"
            value={form.datesubmitted}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">
          Submit Proposal
        </button>
      </form>
    </div>
  );
};

export default ProposalFormPage;
