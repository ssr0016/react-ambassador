import React, { useState, useEffect, SyntheticEvent } from 'react';
import Layout from '../components/Layout';
import { Button, TextField, Alert, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { User } from '../models/user';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get<User>('/user');
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
      } catch (error) {
        setError('Error fetching user data.');
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put('/users/info', {
        first_name: firstName,
        last_name: lastName,
        email
      });
      setSuccess('Profile updated successfully.');
      setError(null);
      console.log(response.data);
    } catch (error) {
      setError('Error updating profile.');
      setSuccess(null);
      console.error('Error updating user data:', error);
    } finally {
      setLoading(false);
    }
  }

  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== passwordConfirm) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put('/users/password', {
        password,
        password_confirm: passwordConfirm
      });
      setSuccess('Password updated successfully.');
      setError(null);
      console.log(response.data);
    } catch (error) {
      setError('Error updating password.');
      setSuccess(null);
      console.error('Error updating user password:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <h3>Account Information</h3>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={infoSubmit}>
        <div className="mb-3">
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </div>
        <Box display="flex" justifyContent="left" alignItems="center">
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </form>

      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={passwordSubmit}>
        <div className="mb-3">
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Confirm Password"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            fullWidth
          />
        </div>
        <Box display="flex" justifyContent="left" alignItems="center">
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </form>
    </Layout>
  )
}

export default Profile;
