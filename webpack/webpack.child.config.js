var baseConfig = require('./webpack.config');
process.env.EXAMPLE_API_SUBDOMAIN = 'child.api';
module.exports = baseConfig;