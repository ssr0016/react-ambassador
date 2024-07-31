import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToUsers: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/users');
  }, [navigate]);

  return null;
};

export default RedirectToUsers;
