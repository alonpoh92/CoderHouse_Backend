let template = '';
let templateChat = '';
let products = {};
let messages = {};
let socket;

fetch('/table_layout.hbs')
    .then(response => response.text())
        .then(data => {
            template = data;    
            fetch('/api/productos-test/products')
                .then(response => response.text())
                    .then(data => {
                        console.log(JSON.parse(data));
                        HbsCompile(template, {products: true, data: JSON.parse(data)}, 'products');
                    });
        });


function HbsCompile(temp, options, id){
    var template = Handlebars.compile(temp);
    var compiled = template(options);
    var dom = document.querySelector('#'+id)
    dom.innerHTML = compiled;
    dom.scrollTop = dom.scrollHeight - dom.clientHeight;
}





