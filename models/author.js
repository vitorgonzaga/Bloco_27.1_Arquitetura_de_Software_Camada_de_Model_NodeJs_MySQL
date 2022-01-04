const connection = require('./connection');

const authorEdit = ({id, firstName, middleName, lastName}) => {
  const fullName = [ firstName, middleName, lastName ].filter((string) => string).join(" "); // "(string) => string" faz com que o filtro desconsidere strings inexistentes (nulas)
  return {
    id,
    firstName,
    middleName,
    lastName,
    fullName
  }
}

const serialize = (authorData) => {
  return {
    id: authorData.id,
    firstName: authorData.first_name,
    middleName: authorData.middle_name,
    lastName: authorData.last_name
  }
}

// Operações com banco de dados geralmente são assincronas
// O parâmetro da função execute da instancia "connection" é a querie SQL em formato de string (exatamente como seria escrita no workbench, por exemplo)
const getAll = async () => {
  const [authors] = await connection.execute('SELECT id, first_name, middle_name, last_name from authors');

  return authors.map(serialize).map(authorEdit);
};


module.exports = { getAll }
