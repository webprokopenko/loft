const name = require('./name');    
const substec = require('./func');
const My = require('./class');
const my = new My('My');

name.info('name');
name.log('name');

substec('Substec');
substec.log('Substec');

my.info('INfo');
my.log(' info');