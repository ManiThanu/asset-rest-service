/* eslint-disable arrow-body-style */

exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('asset_types', (table) => {
      table.increments();
      table.timestamps();
      table.string('name').unique();
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('asset_types'),
  ]);
};
