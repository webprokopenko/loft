const path = require('path');
const fs = require('fs');
const request = require('request');
const event = require('events').EventEmitter;
const mkdirp = require('mkdirp');
const utilities = require('./utilities');

function saveFile(filename, data, callback) {
    mkdirp(path.dirname(filename), err=>{
        if(err)
            return callback(err);
    })
    fs.writeFile(filename, data, 'utf8',callback);
}

function download(url, filename, callback){
    console.log(`Downloading ${url}`);
    request(url, function (error, response, body) {
        if(error)
            return callback(error);

        saveFile(filename, body, err=>{
            if(err)
                return callback(err);
            
            console.log(`Download complete ${url} to ${filename}`);
            callback(null,body);
        });
    });
}
function spyder(url, neesting, callback){
    filename = utilities.urlToFilename(url);
    fs.readFile(filename, 'utf8' ,(err, body)=>{
        if(err){
            if(err.code != 'ENOENT'){
                return callback(err);
            }
        }
        download(url, filename, (err,body)=>{
            if(err)
                return callback(err);
        
            spyderLinks(url, body, neesting, callback);
        })
    });
}

function spyderLinks(url, body, neesting, callback){
    if(neesting ===0){
        return process.nextTick(callback);
    }

    const links = utilities.getPageLinks(url, body);

    function iterate(index){
        if(index === links.length){
            return callback();
        }
        spyder(links[index], neesting - 1, err=>{
            if(err){
                return callback(err);
            }
            iterate(index + 1);
        });
    }
    iterate(0);
}


spyder('http://mafiarave.co', 2, (err,filename,bool)=>{
    if(err)
        console.log(`Error: ${err}`);
    if(bool){
        console.log(`Transaction complete ${filename}`);
    }else{
        console.log('Transaction not complete!!!');
    }
})

