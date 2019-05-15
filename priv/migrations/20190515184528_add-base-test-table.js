
exports.up = function (knex, Promise) {
  return knex.schema.createTable('test', function (t) {
    t.charset('utf8')
    t.collate('utf8_general_ci')
    t.uuid('id').notNullable().primary()
    t.string('test').notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('test')
}
