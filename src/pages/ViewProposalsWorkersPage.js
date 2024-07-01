import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ViewProposalsPage.css';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const ViewProposalsWorkersPage = () => {
  const [proposals, setProposals] = useState([]);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      const decodedToken = parseJwt(tokenFromStorage);
      console.log("Decoded Token:", decodedToken);
      if (decodedToken) {
        setUserId(decodedToken.userid); // Assuming the token contains user ID as 'userid'
        setToken(tokenFromStorage);
        fetchProposals(decodedToken.userid, tokenFromStorage);
      }
    }
  }, []);

  const fetchProposals = async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:80/proposals/p_user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch proposals');
      }
      const data = await response.json();
      setProposals(data);
    } catch (error) {
      console.error('Error fetching proposals:', error.message);
    }
  };

  return (
    <div className="proposals-container">
      <h2 className="page-title">View Proposals</h2>
      {proposals.length === 0 ? (
        <p>No proposals found for your gigs.</p>
      ) : (
        <table className="proposals-table">
          <thead>
            <tr>
              <th>Proposal ID</th>
              <th>Gig Title</th>
              <th>Proposal Title</th>
              <th>Proposal Text</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal) => (
              <tr key={proposal.id}>
                <td>{proposal.id}</td>
                <td>{proposal.gigtitle}</td>
                <td>{proposal.title}</td>
                <td>{proposal.proposaltext}</td>
                <td>{proposal.budget}</td>
                <td>{proposal.status}</td>
                <td>{proposal.datesubmitted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewProposalsWorkersPage;
