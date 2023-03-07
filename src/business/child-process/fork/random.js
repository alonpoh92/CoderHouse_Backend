function sortObj(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

const random = (min, max) => {
    return Math.floor(Math.random() * (max-(min-1))) + min;
}

process.on('message', (cant) => {
    const result = {};
    for (let i=0; i<cant; i+=1){
        const rand = random(1, 1000);
        if(result[rand] == undefined){
            result[rand] = 1;
        }else{
            result[rand] += 1;
        }
    }
    process.send(sortObj(result));
});