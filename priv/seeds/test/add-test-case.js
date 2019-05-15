const uuidV4 = require('uuid/v4')

exports.seed = function (knex, Promise) {
  return knex('test').del()
    .then(function () {
      return knex('test').insert([
        { id: uuidV4(), test: '001' },
        { id: uuidV4(), test: '002' },
        { id: uuidV4(), test: '003' },
        { id: uuidV4(), test: '004' },
        { id: uuidV4(), test: '005' },
      ])
    })
}
