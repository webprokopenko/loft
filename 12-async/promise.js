console.log('Working Start');

function working(){
    return new Promise (function(resolve,reject){
        let err = false;
        setTimeout(function(){
            console.log('Working Work');
            resolve();
        },1000);
    });
}
working()
    .then(function(){
        console.log('Working END');
    })
    .catch(function(err){
        console.log(err);
    })