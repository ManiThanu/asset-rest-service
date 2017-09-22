const knexConfig  = require('../../knexfile');
const knex        = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
const Bookshelf   = require('bookshelf')(knex);

// Provides Common Base Model
Bookshelf.plugin(require('msyn-bookshelf-modelbase').pluggable);

// Resolves Circular Dependency Issues
Bookshelf.plugin('registry');

// Extendable Model
export const Model = Bookshelf.Model;

export default Bookshelf;
