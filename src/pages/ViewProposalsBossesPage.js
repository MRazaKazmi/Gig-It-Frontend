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
    fetch(`https://my-gigit-app-b9bbde9c9441.herokuapp.com/proposalswithgigs/user/${userId}`, {
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
    fetch(`https://my-gigit-app-b9bbde9c9441.herokuapp.com/proposals/${proposalId}/status`, {
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
          fetch(`https://my-gigit-app-b9bbde9c9441.herokuapp.com/gigs/${gigId}/status`, {
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
    <h2 className="page-title">View Proposals</h2>
    {proposals.length === 0 ? (
      <p>No proposals found for your gigs.</p>
    ) : (
      <table className="proposals-table">
        <thead>
          <tr>
            <th>Proposal ID</th>
            <th>Gig</th>
            <th>Gig Type</th>
            <th>Cover Letter</th>
            <th>Bid Amount</th>
            <th>Status</th>
            <th>Date Submitted</th>
            <th>Change Status</th> {/* Column for changing status */}
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr key={proposal.proposalid}>
              <td>{proposal.proposalid}</td>
              <td>{proposal.title}</td>
              <td>{proposal.type}</td>
              <td>{proposal.coverletter}</td>
              <td>{proposal.bidamount}</td>
              <td>{proposal.status}</td>
              <td>{new Date(proposal.datesubmitted).toLocaleDateString()}</td>
              <td>
                <select
                  value={proposal.status}
                  onChange={(e) => handleStatusChange(proposal.proposalid, e.target.value, proposal.gigid)}
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
}

export default ViewProposalsBossesPage;