module.exports = {
  test: {
    client: 'mysql2',
    connection: {
      host: 'db',
      user: 'root',
      password: 'root',
      database: 'test',
    },
    migrations: {
      directory: './priv/migrations',
    },
    seeds: {
      directory: './priv/seeds/test',
    },
    useNullAsDefault: true,
  },
}
