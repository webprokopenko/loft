const dotenv = require('dotenv');
const env = dotenv.config({path: './config.env'});

if (env.error) {
  throw env.error
}

const time = env.parsed.TIME;
const interval = env.parsed.INTERVAL;

let intervalId = setInterval(function() {
    console.log("сет интервал");
  }, interval);

let timeoutId = setTimeout(function(){
    console.log( 'Конец сет интервала' );
    clearInterval(intervalId);
  }, time);

