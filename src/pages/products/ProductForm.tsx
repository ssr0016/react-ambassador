import React, { useState, SyntheticEvent } from 'react';
import Layout from '../../components/Layout';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const ProductForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Basic validation
    if (!title || !description || !image || price <= 0) {
      setError('All fields are required and price must be greater than zero.');
      return;
    }

    try {
      await axios.post('products', {
        title,
        description,
        image,
        price
      });
      alert('Product created successfully!');
      setRedirect(true);
    } catch (error) {
      setError('Error creating product. Please try again.');
      console.error(error);
    }
  };

  if (redirect) {
    return <Navigate to="/products" />;
  }

  return (
    <Layout>
      <Box component="form" onSubmit={submit} sx={{ mt: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create a New Product
        </Typography>
        
        {error && <Typography color="error" gutterBottom>{error}</Typography>}
        
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Image URL"
          fullWidth
          margin="normal"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Layout>
  );
};

export default ProductForm;
