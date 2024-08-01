import React, { useState, SyntheticEvent, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>(); // Correctly accessing the id parameter
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await axios.get(`products/${id}`);
          setTitle(data.title);
          setDescription(data.description);
          setImage(data.image);
          setPrice(data.price);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      })();
    }
  }, [id]);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Basic validation
    if (!title || !description || !image || price <= 0) {
      setError('All fields are required and price must be greater than zero.');
      return;
    }

    const data = { title, description, image, price };

    try {
      if (id) {
        // Update existing product
        await axios.put(`products/${id}`, data);
      } else {
        // Create new product
        await axios.post('products', data);
        alert('Product created successfully!');
      }

      setRedirect(true);
    } catch (error) {
      setError('Error submitting product. Please try again.');
      console.error(error);
    }
  };

  // Use navigate function for redirection
  if (redirect) {
    navigate("/products");
  }

  return (
    <Layout>
      <Box component="form" onSubmit={submit} sx={{ mt: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {id ? 'Update Product' : 'Create a New Product'}
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
