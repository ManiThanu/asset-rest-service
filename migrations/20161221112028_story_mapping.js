/* eslint-disable arrow-body-style */

exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('story_mappings', (table) => {
      table.increments();
      table.timestamps();
      table.string('feed_id').index();
      table.integer('asset_id').unsigned().references('id').inTable('stories');
      table.integer('asset_type_id').unsigned().references('asset_types.id');
      table.integer('asset_format_id').unsigned().references('asset_formats.id');
      table.string('bb_id');
      table.string('revision_id');
      table.dateTime('group_published_at').index();
      table.dateTime('story_published_at');
      table.dateTime('group_updated_at');
      table.dateTime('story_updated_at');
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('story_mappings'),
  ]);
};
