const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM model_example.books')
  return rows;
};

const getBooksByAuthorId = async(id) => {
  const [rows] = await connection.execute('SELECT title FROM model_example.books WHERE author_id = ?', [id]);
  if (!rows) return null;
  return rows;
}

module.exports = {
  getAll,
  getBooksByAuthorId
};
