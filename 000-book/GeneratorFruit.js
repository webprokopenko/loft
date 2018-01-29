function* genetator(){
    yield 'apple',
    yield 'orange',
    yield 'grapefruit'
    return 'done!'
}
const newObjectGenerator = genetator();
console.log(newObjectGenerator.next());
console.log(newObjectGenerator.next());
console.log(newObjectGenerator.next());
console.log(newObjectGenerator.next());
console.log(newObjectGenerator.next());
console.log(newObjectGenerator.next());

function args(){
    let arr = [].splice.call(arguments, 0);
    console.log(arr);
    console.log(arguments);
}

args(1,3,function(){
    console.log('func');
});
// Iterator Generator Перебор всех элементов массива и приостановление выполениня при обращении к каждому
function* iteratorGenerator(arr){
    for(let i=0; i<arr.length; i++){
        yield arr[i];
    }
}

//Iterator - перебор всех yeld элементов массива итератори и последовательный вызов всех 
const iterator = iteratorGenerator(['one','two','three','for','five','six']);
let currentItem = iterator.next();
while(!currentItem.done){
    console.log(currentItem.value);
    currentItem = iterator.next();
}

//Передача аргументов обратно в генератор

function* twoWayGenerator(){
    const what = yield null;
    console.log('Hello ' + what)
}

const twoWay = twoWayGenerator();
console.log(twoWay.next());
twoWay.next(' world');

function* testAsync(callback){
    yield setTimeout(() => {
        callback('Timeout')
    }, 1000);
    yield setTimeout(() => {
        callback('New timeout');
    }, 1000);
}
tt = testAsync(text=>{
    console.log(text);
});

function funGenerator(GeratorFunction){
    gen = GeratorFunction.next();
    while(!gen.done){
        gen = GeratorFunction.next();
    }
}

funGenerator(testAsync(text=>{
    console.log(text);
    })
);