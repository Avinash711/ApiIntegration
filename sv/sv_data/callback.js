const f1 = function(value){
    return value + 100;

}

const callback = function callback(f1){
       console.log(f1)
       return f1; 

}
const result = callback(f1(200));
console.log(result);

