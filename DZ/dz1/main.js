const fs = require('fs');
const path = require('path');

const unsortedPath = './unsorted';
const sortedPath = './sorted';


const scanDir = (base)=>{
    const files = fs.readdirSync(base);
    files.forEach(item =>{
        let localBase = path.join(base,item);
        let state = fs.statSync(localBase);
        if(state.isDirectory()){
            scanDir(localBase);
        }else{
            insertSortedDir(item,base);
        }
    });
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