const { fork } = require('child_process');

class RamdomController{
    async randomAsync(cant){
        return new Promise((resolve, reject) => {
            const calc = fork('./src/business/child-process/fork/random.js');
            calc.send(cant);
            calc.on('message', (data) => {
                resolve(data);
            })
        });
    }

    randomSync(cant){
        const result = {};
        for (let i=0; i<cant; i+=1){
            const rand = Math.floor(Math.random() * 1000) + 1;
            if(result[rand] == undefined){
                result[rand] = 1;
            }else{
                result[rand] += 1;
            }
        }
        const data = Object.keys(result).sort().reduce(function (res, key) {
                        res[key] = result[key];
                        return res;
                    }, {});
        return data;
    }
}

module.exports = new RamdomController;