const sequelize = require('sequelize');
const db = new sequelize('some-postgres', 'liran', 'mysecretpassword', {
  host: 'localhost',
  dialect: 'postgres'
});

export {db, sequelize}
