import React, { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setter(e.target.value);
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('login', {
        email,
        password,
      }); 
      setSuccess('Login successful!');
      setError(null);
      console.log(response.data);
      navigate('/'); // Redirect to the dashboard or desired route after successful login
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
      setSuccess(null);
      console.error(err);
    }
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            value={email}
            onChange={handleChange(setEmail)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange(setPassword)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
};

export default Login;
