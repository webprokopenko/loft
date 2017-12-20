const dotenv = require('dotenv');
const env = dotenv.config({ path: './config.env' });
const http = require('http');
const fs = require('fs');
const dateFormat = require('dateformat');
var now = new Date();


if (env.error) {
    throw env.error
}

const time = env.parsed.TIME;
const interval = env.parsed.INTERVAL;



let  StartServer = function() {
    server = http.createServer(function (request, response) {

        let intervalId = setInterval(function () {
            response.end(dateFormat(now, "longTime", true));
            console.log(dateFormat(now, "longTime", true));
        }, interval);

        let timeoutId = setTimeout(function () {
            clearInterval(intervalId);
        }, time);

    }).listen(3002);
};

StartServer();

