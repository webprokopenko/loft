const fs = require('fs');
const path = require('path');

const file = './test/test01.txt';

fs.readFile(file,(err, data)=>{
    if(err){
        console.log(err.message);
    }
    console.log(data.toString());
    fs.writeFile('./tmp/test.txt',`${data.toString()}` + " add text",err=>{
        if(err){
            if(err.code === 'ENOENT'){
                fs.mkdirSync('./tmp');
                fs.writeFile('./tmp/test.txt',`${data.toString()}` + " add text",err=>{})
            }
        }
    });

});