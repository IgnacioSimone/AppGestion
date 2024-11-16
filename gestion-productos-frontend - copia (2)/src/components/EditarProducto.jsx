import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Alert } from '@mui/material';

function EditarProducto({ producto, onEditSuccess }) {
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);
  const [stock, setStock] = useState(producto.stock);
  const [description, setDescription] = useState(producto.description || ''); // Campo descripción
  const [imageUrl, setImageUrl] = useState(producto.image || ''); // URL de la imagen
  const [error, setError] = useState(null);

  const handleEdit = (e) => {
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

    // Crear objeto de producto actualizado
    const productoActualizado = { nombre, precio, stock, description, image: imageUrl };

    // Enviar datos al backend
    axios.put(`http://localhost:8080/api/productos/${producto.id}`, productoActualizado)
      .then(response => {
        console.log('Producto actualizado:', response.data);
        setError(null);
        onEditSuccess();
      })
      .catch(error => {
        console.error('Hubo un error al actualizar el producto:', error);
        setError("Error al actualizar el producto");
      });
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  return (
    <form onSubmit={handleEdit}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <div>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <TextField
          label="Precio"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <TextField
          label="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <TextField
          label="Descripción"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
      </div>
      <div>
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
      </div>
      <div>
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
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
}

export default EditarProducto;
