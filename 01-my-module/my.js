const fs = require('fs');

let originalRequest = require;

function loadModule(filename, module, require){
    const wrapSrc = `
        (function(module,exports,require){
            ${fs.readFileSync(filename,'utf-8')}
        })
    `
}