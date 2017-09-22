/* eslint-disable arrow-body-style */

exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('images', (table) => {
      table.increments();
      table.timestamps();
      table.integer('asset_type_id').unsigned().references('asset_types.id');
      table.integer('asset_format_id').unsigned().references('asset_formats.id');
      table.string('bb_id');
      table.dateTime('published_at');
      table.string('url');
      table.text('payload', 'text');
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('images'),
  ]);
};
