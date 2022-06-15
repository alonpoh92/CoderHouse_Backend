class Usuario{
    constructor(name, lastName, books=[], pets=[]){
        this.nombre = name;
        this.apellido = lastName;
        this.libros = books;
        this.mascotas = pets;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(pet){
        this.mascotas.push(pet);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(name, writer){
        const book = {nombre: name, autor: writer};
        this.libros.push(book);
    }

    getBookNames(){
        return this.libros.map(x => x.nombre);
    }
}

user = new Usuario('Alonso', 'Aponte');
console.log(user.getFullName());
user.addMascota('Sophie');
user.addMascota('Max');
console.log(user.countMascotas());
user.addBook('100 años de soledad', 'Gabriel Garcia Marquez');
user.addBook('El coronel no tiene quien le escriba', 'Gabriel Garcia Marquez');
console.log(user.getBookNames())
console.log(user);