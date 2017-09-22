import chalk       from 'chalk';
import assert      from 'assert';
import knexCleaner from 'knex-cleaner';
import bookshelf   from '../src/models/bookshelf';

/**
 * Ensure Testing DB Has Latest Migrations
 */
async function checkDB() {
  console.log(chalk.dim('Ensuring Testing DB is up to date...'));
  await bookshelf.knex.migrate.latest();
  console.log('All migrations have been auto applied.');
}

/**
 * Wipes Testing DB
 */
async function cleanDB() {
  console.log(chalk.dim('Cleaning Testing DB...'));
  await knexCleaner.clean(bookshelf.knex, {
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
  console.log('Testing DB clean.');
}

/**
 * Global Before Hooks (Run Before Any Tests Begin)
 */
before(async () => {
  assert(process.env.NODE_ENV === 'testing');
  await checkDB();
  await cleanDB();
  console.log(chalk.green('Running Test Suite...'));
});

/**
 * Global After Hooks (Run After All Tests Complete)
 */
after(async () => {
  console.log(chalk.green('Test Run Complete.'));
  await cleanDB();
});
