import React, { useState, useEffect } from 'react';
import '../PostGigPage.css';
import { useNavigate } from 'react-router-dom';


const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const PostGigPage = () => {
  const [token, setToken] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userid: '',
    title: '',
    description: '',
    type:'',
    location: '',
    budget: '',
    dateposted: new Date().toISOString().split('T')[0],
    status: 'Open'
  });

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      const decodedToken = parseJwt(tokenFromStorage);
      console.log("Decoded Token:", decodedToken);
      if (decodedToken) {
        setForm((prevForm) => ({
          ...prevForm,
          userid: decodedToken.userid, // Set userid directly from decoded token
        }));
        setToken(tokenFromStorage);
        setUserRole(decodedToken.usertype); // Assuming the token contains user role as 'role'

      }
    }
  }, []);

  useEffect(() => {
    if (userRole && userRole !== 'boss') {
      // Redirect if the user is not a gig boss
      navigate('/');
    }
  }, [userRole, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:80/gigs/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => { throw new Error(text) });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Gig posted successfully:', data);
        // Redirect or update UI after successful submission
      })
      .catch((error) => {
        console.error('Error posting gig:', error.message);
      });
  };
  return (
    <div className="form-container">
      <h2 className="page-title">Post a Gig</h2>
      <form onSubmit={handleSubmit} className="gig-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="roofing">Roofing</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="masonry">Masonry</option>
            <option value="carpentry">Carpentry</option>
            <option value="flooring">Flooring</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="budget">Budget</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateposted">Date Posted</label>
          <input
            type="date"
            id="dateposted"
            name="dateposted"
            value={form.datePosted}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <button type="submit" className="btn">Post Gig</button>
      </form>
    </div>
  );
};

export default PostGigPage;
