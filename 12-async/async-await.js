const fs = require('fs');
const {promisify} = require('util');
const getData = async url =>{
    try {
        const body = 'test body';
        await console.log(body);
        console.log('after body');
        await console.log(url);
    } catch (error) {
        console.log(error);
    }
}
getData('test url');

const readdir = promisify(fs.readdir);

const scanDir = async url =>{
    try {
        const dir = await readdir(url);
        console.log(dir);
    } catch (error) {
        console.log(error);
    }
}
scanDir('./');