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
function spyder(url, callback){
    filename = utilities.urlToFilename(url);
    fs.exists(filename, exist=>{
        if(exist)
            return callback(null, filename, false);
        
        download(url, filename, err=>{
            if(err)
                return callback(err);

            callback(null, filename, true)
        })
    });
}
spyder('http://mafiarave.co',(err,filename,bool)=>{
    if(err)
        console.log(`Error: ${err}`);
    if(bool){
        console.log(`Transaction complete ${filename}`);
    }else{
        console.log('Transaction not complete!!!');
    }
})

