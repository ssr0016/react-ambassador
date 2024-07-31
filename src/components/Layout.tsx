import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Menu from './Menu';
import axios from 'axios';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get('user');
        console.log(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login'); // Redirect to the login page
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="table-responsive small">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
