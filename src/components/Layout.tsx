import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Menu from './Menu';
import axios from 'axios';
import { User } from '../models/user';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get<User>('/user');
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login'); // Redirect to the login page if there's an error
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      <Nav user={user} />
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="py-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
