const express = require('express');
const app = express(); // cria uma instancia do express
const port = 3000;

const author = require('./models/author');
const books = require('./models/books');

app.listen(port, () => { console.log(`Ouvindo a porta ${port}`) })

app.get('/authors', async (_req, res) => {
  const authors = await author.getAll()
  return res.status(200).json(authors)
});

app.get('/books', async(_req, res) => {
  const allBooks = await books.getAll();
  return res.status(200).json(allBooks);
});

app.get('/books/:id', async (req, res) => {
  const booksById = await books.getByAuthorId(req.params.id);
  if(!booksById) return res.status(404).json({ message: 'Not found' });
  return res.status(200).json(booksById);
})
