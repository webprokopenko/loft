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

    function done(err){
        if(err){
            hasError = true;
            return callback(err);
        }
        if(++completed === links.length && !hasError){
            return callback();
        }
    }
    links.forEach(link=>{
        spyder(link, neesting - 1, done)
    })
}


spyder('https://coinmarketcap.com/', 2, (err,filename,bool)=>{
    if(err)
        console.log(`Error: ${err}`);
    if(bool){
        console.log(`Transaction complete ${filename}`);
    }else{
        console.log('Transaction not complete!!!');
    }
})

