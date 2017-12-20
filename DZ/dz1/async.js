const fs = require('fs');
const {promisify} = require('util');
const path = require('path');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const unsortedPath = './unsorted';
const sortedPath = './sorted';

function statsBase(localBase){
    return new Promise(function(resolve, reject) {
        let stats = fs.stat(localBase,(err,data)=>{
            resolve(data.isDirectory());
        });
    });
}
const scanDir = async base =>{
    try {
        const files = await readdir(base);
        files.forEach(item=>{
            let localBase = path.join(base,item);
            statsBase(localBase).then(
                (directory)=>{
                    if(directory){
                        scanDir(localBase);
                        console.log("Directory: " + localBase);
                    }else{
                        insertSortedDir(item,base);
                    } 
                }
            )
        });
    } catch (error) {
        console.log(error);
    }
}
const insertSortedDir = (filename,base)=>{
    let localBase = path.join(sortedPath,filename[0]);
    let state = fs.stat(localBase,function(err,stats){
        if(err){
            if(err.code === 'ENOENT'){
                fs.mkdir(path.join(sortedPath,filename[0]),function(err){
                    copyFile(path.join(base,filename),path.join(localBase,filename));
                });
            }
        }else{
            copyFile(path.join(base,filename),path.join(localBase,filename));
        }
    });
}
function copyFile(from,to){
    fs.link(from,to,(err)=>{
        if(err){
            if(err.code === 'EEXIST'){
                let filename =  path.parse(to).base;
                let newfilename = getRandomArbitrary(1,10000) + filename;
                copyFile(from,to+newfilename);
            }
        }
    });
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

scanDir(unsortedPath);
