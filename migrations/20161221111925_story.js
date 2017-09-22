/* eslint-disable arrow-body-style */

exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('stories', (table) => {
      table.increments();
      table.timestamps();
      table.integer('asset_type_id').unsigned().references('asset_types.id');
      table.integer('asset_format_id').unsigned().references('asset_formats.id');
      table.string('bb_id');
      table.string('revision_id');
      table.dateTime('group_published_at');
      table.dateTime('story_published_at');
      table.dateTime('group_updated_at');
      table.dateTime('story_updated_at');
      table.text('payload', 'mediumtext');
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('stories'),
  ]);
};
