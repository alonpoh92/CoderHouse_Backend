const random = () => {

}

process.on('message', (msg) => {
    console.log(msg);
    process.send('aqui');
});