const fs = require('fs-extra');
const path = require('path');

//Trae los libros de la BBDD
const { Router } = require('express');
const router = Router();

const Book = require('../models/Book'); //Requiere el modelo Book

router.get('/', async (req, res) => {
    const books = await Book.find(); //Trae los libros de la base de datos 
    res.json(books); //Formatea a Json 
});

router.post('/', async (req, res) => {
    const { title, author, isbn } = req.body;
    const imagePath ='/uploads/'+req.file.filename;
    const newBook = new Book({ title, author, isbn,imagePath }); //Crea un nuevo libro
    await newBook.save(); //Guarda el libro en la BBDD
    res.json({ message: 'Book Saved Succesfully!' });
});

router.delete('/:id', async (req, res) => {
   const book = await Book.findByIdAndDelete(req.params.id);
    fs.unlink(path.resolve('./backend/public'+book.imagePath));
    res.json({ message: 'Libro eliminado' });
})
module.exports = router;
