const connection = require('./connection');

const getFullNameAuthor = ({firstName, middleName, lastName}) => {
  const fullName = [ firstName, middleName, lastName ].filter((string) => string).join(" "); // "(string) => string" faz com que o filtro desconsidere strings inexistentes (nulas)
  return fullName
}

const serialize = (authorData) => {
  return {
    id: authorData.id,
    firstName: authorData.first_name,
    middleName: authorData.middle_name,
    lastName: authorData.last_name,
    fullName: getFullNameAuthor(authorData.first_name, authorData.middle_name, authorData.last_name)
  }
}

// Operações com banco de dados geralmente são assincronas
// O parâmetro da função execute da instancia "connection" é a querie SQL em formato de string (exatamente como seria escrita no workbench, por exemplo)
const getAll = async () => {
  const [authors] = await connection.execute('SELECT id, first_name, middle_name, last_name from authors');

  return authors.map(serialize);
};

const getAuthorById = async (id) => {
  const [author] = await connection.execute('select id, first_name, middle_name, last_name from authors where id = ?', [id])
  if(!author) return null
  return author.map(serialize)[0];
}


module.exports = { getAll, serialize, getAuthorById }
