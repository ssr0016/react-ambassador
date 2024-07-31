import React, { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
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

    // Basic validation
    if (password !== passwordConfirm) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirm: passwordConfirm,
      });
      setSuccess('Registration successful!');
      setError(null);
      console.log(response.data);
      navigate('/login'); // Redirect to the login page
    } catch (err: any) {
      setError('Registration failed. Please try again.');
      setSuccess(null);
      console.error(err);
    }
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please register</h1>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-floating">
          <input
            name="first_name"
            className="form-control"
            placeholder="First Name"
            value={firstName}
            onChange={handleChange(setFirstName)}
          />
          <label>First Name</label>
        </div>

        <div className="form-floating">
          <input
            name="last_name"
            className="form-control"
            placeholder="Last Name"
            value={lastName}
            onChange={handleChange(setLastName)}
          />
          <label>Last Name</label>
        </div>

        <div className="form-floating">
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="name@example.com"
            value={email}
            onChange={handleChange(setEmail)}
          />
          <label>Email address</label>
        </div>

        <div className="form-floating">
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handleChange(setPassword)}
          />
          <label>Password</label>
        </div>

        <div className="form-floating">
          <input
            name="password_confirm"
            type="password"
            className="form-control"
            placeholder="Password Confirm"
            value={passwordConfirm}
            onChange={handleChange(setPasswordConfirm)}
          />
          <label>Password Confirm</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Register;
