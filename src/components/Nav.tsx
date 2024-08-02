import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { User } from '../models/user';
import { connect } from 'react-redux';

type NavProps = {
  user: User | null;
};

const Nav: React.FC<NavProps> = ({ user }) => {
  const logout = async () => {
    try {
      await axios.post('/logout');
      // Redirect or handle post-logout actions here
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Company Name
        </Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link text-white">
                    {user.first_name} {user.last_name}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-white" onClick={logout}>
                    Sign out
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link text-white">
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default connect(
  (state: { user: User}) => ({
  user: state.user
})) (Nav);
