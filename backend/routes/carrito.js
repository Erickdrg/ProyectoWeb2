const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: Obtener todos los elementos del carrito
router.get('/', (req, res) => {
  db.query('SELECT * FROM Carrito', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.delete('/producto/vaciar', (req, res) => {
  db.query('TRUNCATE TABLE Carrito', (err, results) => {
    if (err) {
      console.error("Error al truncar la tabla Carrito:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Carrito vaciado' });
  });
});


// GET: Obtener un solo elemento por id_car
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Carrito WHERE id_car = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(results[0]);
  });
});

// POST: Crear un nuevo carrito
router.post('/agregar', (req, res) => {
  console.log("req.body",req.body)
  const {  id_pokemon, amount, id_user,price,total,nombre } = req.body;
  const query = 'INSERT INTO Carrito (id_pokemon, amount, id_user, precio,total,nombre) VALUES ( ?, ?, ?,?,?,?)';
  db.query(query, [id_pokemon, amount, id_user,price,total,nombre], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Carrito creado'
     });
  });
});

// PUT: Actualizar un carrito existente
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { id_product, amount, id_user } = req.body;
  const query = 'UPDATE Carrito SET id_product = ?, amount = ?, id_user = ? WHERE id_car = ?';
  db.query(query, [id_product, amount, id_user, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Carrito actualizado' });
  });
});

// DELETE: Eliminar un carrito
router.delete('/:id_user/:id_producto', (req, res) => {
  const id_producto = req.params.id_producto;
  const id_user = req.params.id_user;
  db.query('DELETE FROM Carrito WHERE id_user = ? and id_pokemon = ? ', [id_user,id_producto], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Carrito eliminado' });
  });
});


// PATCH: Sumar o restar cantidad según el id_product
router.patch('/actualizar-cantidad/:id_product', (req, res) => {
    const id_product = req.params.id_product;
    const { cantidad } = req.body;
  
    const query = 'UPDATE Carrito SET amount = ? WHERE id_product = ?';
    console.log("cantidad", cantidad);
    alert("Hola estamos en cantidad",cantidad)
    db.query(query, [cantidad, id_product], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
  
      res.json({ message: 'Cantidad actualizada correctamente' });
    });
  });


// PATCH: Sumar o restar cantidad según el id_product y el id_user
router.patch('/actualizar-cantidad/:id_product/:id_user', (req, res) => {
  const id_product = req.params.id_product;
  const id_user = req.params.id_user;
  const { cantidad } = req.body;

  const query = `
    UPDATE Carrito
    SET amount =  ?
    WHERE id_product = ? AND id_user = ?
  `;

  db.query(query, [cantidad, id_product, id_user], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado para este usuario' });

    res.json({ message: 'Cantidad actualizada correctamente' });
  });
});


// GET: Obtener todos los carritos de un usuario
router.get('/usuario/:id_user', (req, res) => {
    const id_user = req.params.id_user;
    db.query('SELECT id_pokemon,amount,precio,total,nombre FROM Carrito WHERE id_user = ?', [id_user], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  

// GET: Obtener el amout de un producto en el carrito
router.get('/producto/:id_product', (req, res) => {
    const id_product = req.params.id_product;
    db.query('SELECT amount FROM Carrito WHERE id_product = ?', [id_product], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
      res.json( results[0].amount);
    });
  });




module.exports = router;
