const path = require('path');

console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')); //Перемещение из одного пути в относительный другой
console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')); //Построение абсолютного пути
console.log(path.normalize('/foo/bar//baz/asdf/quux/..')); //Нормализует путь
console.log(path.parse('/home/user/dir/file.txt')); //Парсит путь
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')); //Соединяет пути
console.log(path.sep); //Разделитель одинаково как под linux & Windows
