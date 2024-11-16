import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

function AgregarProducto() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState(''); // Campo descripción
  const [imageUrl, setImageUrl] = useState(''); // URL de la imagen
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    const soloNumeros = /^\d+$/;

    if (nombre.length < 2 || nombre.length > 50) {
      setError("El nombre debe tener entre 2 y 50 caracteres");
      return;
    }
    if (soloNumeros.test(nombre)) {
      setError("El nombre no puede contener solo números");
      return;
    }
    if (precio < 0) {
      setError("El precio debe ser mayor o igual a 0");
      return;
    }
    if (stock < 0) {
      setError("El stock debe ser mayor o igual a 0");
      return;
    }
    if (!description || description.length < 10) {
      setError("La descripción debe tener al menos 10 caracteres");
      return;
    }
    if (!imageUrl) {
      setError("Debe proporcionar una URL de imagen");
      return;
    }

    // Crear objeto de producto
    const productoConImagen = {
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      description,
      image: imageUrl, // Usamos la URL proporcionada
    };

    // Enviar datos al backend
    axios.post('http://localhost:8080/api/productos', productoConImagen)
      .then(response => {
        console.log('Producto agregado:', response.data);
        setNombre('');
        setPrecio('');
        setStock('');
        setDescription('');
        setImageUrl('');
        setError(null);
      })
      .catch(error => {
        console.error('Hubo un error al agregar el producto:', error);
        setError("Error al agregar el producto");
      });
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Agregar Nuevo Producto
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <TextField
          label="Precio"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <TextField
          label="Stock"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <TextField
          label="Descripción"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="URL de Imagen"
          variant="outlined"
          fullWidth
          margin="normal"
          value={imageUrl}
          onChange={handleImageUrlChange}
          placeholder="Pega una URL de imagen aquí"
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            color: '#ffffff',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#115293',
              color: '#ffffff',
            },
            mt: 2,
          }}
          fullWidth
        >
          Agregar Producto
        </Button>
      </Box>
    </Container>
  );
}

export default AgregarProducto;
