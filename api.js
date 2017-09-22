// Load Environment
require('./src/utilities/env.loader');

// Start Server
require(`./${process.env.SRC_DIR_NAME}/api`); // eslint-disable-line
