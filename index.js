const bodyParser = require('body-parser');
const express = require('express');
const app = express(); // cria uma instancia do express
const port = 3000;

const author = require('./models/author');
const books = require('./models/books');

// Nos possibilita desestruturar informações que vem através do body das requisições
app.use(bodyParser.json());

// Retorna todos os autores
app.get('/authors', async (_req, res) => {
  const authors = await author.getAll()
  return res.status(200).json(authors)
});

// Retorna o autor pelo id
app.get('authors/:id', async (req, res) => {
  const authorId = req.params.id;
  const author = await author.getAuthorById(authorId);
  if (!author) return res.status(404).json({ message: 'Not Found' });
  return res.status(200).json(author);
})

// Criando um método post para adicionar um novo escritor

app.post('/authors', async (req, res) => {
  const { first_name, middle_name, last_name } = req.body;
  if(!author.isValid(first_name, middle_name, last_name)) {
    return res.status(400).json({ message: 'Dados inválidos' })
  }
  await author.addAuthor(first_name, middle_name, last_name);
  return res.status(200).json({ message: 'Autor criado com sucesso!' })
});

// Retorna todos os livros
app.get('/books', async(_req, res) => {
  const allBooks = await books.getAll();
  return res.status(200).json(allBooks);
});

// Retorna os livros por authorId
app.get('/books/:id', async (req, res) => {
  const booksById = await books.getBooksByAuthorId(req.params.id);
  if(!booksById) return res.status(404).json({ message: 'Not found' });
  return res.status(200).json(booksById);
})

app.listen(port, () => { console.log(`Ouvindo a porta ${port}`) })