const dotenv = require('dotenv');
const env = dotenv.config({path: './config.env'});

if (env.error) {
  throw env.error
}

console.log(env.parsed.TIME);

// console.log(process.env.DB_HOST);