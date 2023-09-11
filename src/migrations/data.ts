const { DataSource } = require('typeorm');

const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  username: 'postgres',
  password: 'postgres',
  database: 'testDB',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  logging: true,
});

module.exports = dataSource;
