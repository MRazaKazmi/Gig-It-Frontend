import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GigWorkersPage from './pages/GigWorkersPage';
import GigBossesPage from './pages/GigBossesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PostGigPage from './pages/PostGigPage';
import FindGigPage from './pages/FindGigPage';
import ViewProposalsBossesPage from './pages/ViewProposalsBossesPage';
import ViewProposalsWorkersPage from './pages/ViewProposalsWorkersPage';
import Navbar from './components/Navbar';
import ProposalFormPage from './pages/ProposalFormPage';
import './App.css';


const PrivateRoute = ({ element: Component, redirectTo, ...rest }) => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const usertype = decodedToken.usertype;

    if (usertype === 'worker' && redirectTo === '/gig-bosses') {
      return <Navigate to="/gig-workers" />;
    } else if (usertype === 'boss' && redirectTo === '/gig-workers') {
      return <Navigate to="/gig-bosses" />;
    }

    return <Component {...rest} />;
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <Router>
     <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/gig-workers" element={<PrivateRoute element={GigWorkersPage} redirectTo="/gig-bosses" />} />
        <Route path="/gig-bosses" element={<PrivateRoute element={GigBossesPage} redirectTo="/gig-workers" />} />
        <Route path="/gig-workers/gigs" element={<PrivateRoute element={FindGigPage} redirectTo="/gig-workers" />} />
        <Route path="/post-gig" element={<PrivateRoute element={PostGigPage} redirectTo="/login" />} />
        <Route path="/gig-bosses/view-proposals" element={<PrivateRoute element={ViewProposalsBossesPage} redirectTo="/login" />} />
        <Route path="/gig-workers/view-proposals" element={<PrivateRoute element={ViewProposalsWorkersPage} redirectTo="/login" />} />
        <Route path="/gigs/:gigid/proposal" element={<ProposalFormPage />} /> {/* Add route */}
      </Routes>
    </Router>
  );
};

  export default App;