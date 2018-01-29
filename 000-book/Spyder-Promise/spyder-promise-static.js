const utilities = require('./../utilities');

const path = require('path');
const requiest = utilities.promisify(require('request'));
const mkdirp = utilities.promisify(require('mkdirp'));
const fs = require('fs');
const readFile = readFile.promisify(fs.readFile);
const writeFile = utilities.promisify(fs.writeFile);

function download(url, filename){
    console.log(`Donwloading ${url}`);
    let body;
    return request(url)
        .then(response=>{
            body = response.body;
            return mkdirp(path.dirname(filename));
        })
        .then(()=>{
            writeFile(filename, body)
        })
        .then(()=>{
            console.log(`Donwloaded and saved ${url}`);
            return body;
        })
}