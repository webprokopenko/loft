console.log(process.execPath); // Выводить откуда запущен node(где лежит)
console.log(process.version); // Версия Node.js
console.log(process.platform); //Платформа
console.log(process.arch); // Архитектура процессора
console.log(process.title); // Название
console.log(process.pid); // Id процесса в системе
console.log(process.cwd()); // Каталог в котором мы находимся
console.log(process.argv); // Аргументы переданные при запуске ноды
console.log('Test %d str %s', 34,'string');
try{
    console.assert(3>5,'A>B'); //Тестирование
}catch(err){
    console.log(err);
}

process.on('exit',(code)=>{
    console.log("exit with code + " + code); // Обработчик на случай выхода из системы - возвращает код ошибки который был передан в exit
})
process.exit(1); //Выход из процесса Если 0 - удачный выход все остальное плохой выход