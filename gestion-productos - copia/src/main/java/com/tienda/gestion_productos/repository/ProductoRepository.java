package com.tienda.gestion_productos.repository;

import com.tienda.gestion_productos.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
