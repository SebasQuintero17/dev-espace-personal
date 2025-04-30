const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Crear una nueva publicación
router.post('/create', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json({ message: 'Publicación creada correctamente', post: newPost });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la publicación' });
  }
});

// Obtener todas las publicaciones
router.get('/all', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las publicaciones' });
  }
});

module.exports = router;