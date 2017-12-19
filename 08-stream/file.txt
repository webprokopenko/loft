const stream = require('stream');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class ToFileStream extends stream.Writable{
    constructor(){
        super({objectMode: true});
    }
    _write(chunk, encoding, callback){
        mkdirp(path.dirname(chunk.path), err=>{
            if(err){
                callback(err);
            }
            fs.writeFile(chunk.path, chunk.content, callback);
        });
    }
}

const tfs = new ToFileStream();

const content = fs.readFileSync('my-stream-write.js');
tfs.write({path:'file.txt',content});
tfs.end(()=>{
    console.log('Done!');
})