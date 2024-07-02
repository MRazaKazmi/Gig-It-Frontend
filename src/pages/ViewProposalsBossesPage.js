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

const ViewProposalsBossesPage = () => {
  const [proposals, setProposals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      const decodedToken = parseJwt(tokenFromStorage);
      if (decodedToken) {
        fetchProposals(tokenFromStorage, decodedToken.userid);
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchProposals = (token, userId) => {
    fetch(`http://localhost:80/proposals/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Access denied, invalid token');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setProposals(data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching proposals:', error);
        if (error.message === 'Access denied, invalid token') {
          navigate('/login');
        }
      });
  };

  const handleStatusChange = (proposalId, newStatus, gigId) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:80/proposals/${proposalId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error updating proposal status');
        }
        return response.json();
      })
      .then(data => {
        console.log('Proposal status updated:', data);

        // Only update the gig status if the proposal is accepted
        if (newStatus === 'accepted') {
          fetch(`http://localhost:80/gigs/${gigId}/status`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ status: 'Closed' }),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Error updating gig status');
              }
              return response.json();
            })
            .then(data => {
              console.log('Gig status updated:', data);
              setProposals(proposals.map(proposal => proposal.proposalid === proposalId ? { ...proposal, status: newStatus } : proposal));
            })
            .catch(error => console.error('Error updating gig status:', error));
        } else {
          setProposals(proposals.map(proposal => proposal.proposalid === proposalId ? { ...proposal, status: newStatus } : proposal));
        }
      })
      .catch(error => console.error('Error updating proposal status:', error));
  };

  return (
    <div className="proposals-container">
      <h2>View Proposals</h2>
      {proposals.length === 0 ? (
        <p>No proposals found.</p>
      ) : (
        <ul className="proposals-list">
          {proposals.map((proposal) => (
            <li key={proposal.proposalid} className="proposal-item">
              <div className="proposal-info">
                <p><strong>Cover Letter:</strong> {proposal.coverletter}</p>
                <p><strong>Date Submitted:</strong> {new Date(proposal.datesubmitted).toLocaleDateString()}</p>
                <p><strong>Status:</strong></p>
                <select
                  value={proposal.status}
                  onChange={(e) => handleStatusChange(proposal.proposalid, e.target.value, proposal.gigid)}
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewProposalsBossesPage;
