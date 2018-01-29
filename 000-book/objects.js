let obj = function(name){
    return {
        name: name,
        getName: function(){
            return this.name;
        }
    }
}

let obj1 = new obj('Irina');
