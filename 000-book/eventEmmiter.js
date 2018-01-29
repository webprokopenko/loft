const event = require('events').EventEmitter;
const fs = require('fs');

function findPatterns(files,regex){
    const emmiter = new event();
    files.forEach(file=>{
        fs.readFile(file, 'utf8', (err,content)=>{
            if(err)
                return emmiter.emit('error', err);

                emmiter.emit('fileread', file);

            let match = null;
            if(match = content.match(emmiter.regex)){
                match.forEach(elem=> emmiter.emit('found', file, elem));
            }
        })
    });
    return emmiter;
}
findPatterns(['./objects.js'],/ name \w+ /)
    .on('error',(err)=>console.log(err))
    .on('fileread',file=>console.log("File read " + file))
    .on('found', (file,elem)=>console.log(`Found in ${file} element: ${elem}`));
    
class FindPatterns extends event{
    constructor(regex){
        super();
        this.regex = regex;
        this.files=[]
    }
    addFile(file){
        this.files.push(file);
        return this;
    }
    find(){
        this.files.forEach(file=>{
            fs.readFile(file, 'utf8', (err,content)=>{
                if(err)
                    return this.emit('error', err);

                this.emit('fileread', file);

                let match = null;
                if(match = content.match(this.regex)){
                    match.forEach(elem=> this.emit('found', file, elem));
                }
            })
        });
        return this;
    }
}

let find = new FindPatterns(/ let \w+/);
find.addFile('./objects.js')
    .find()
    .on('error',(err)=>console.log(err))
    .on('fileread',file=>console.log("File read " + file))
    .on('found', (file,elem)=>console.log(`Found in ${file} element: ${elem}`));