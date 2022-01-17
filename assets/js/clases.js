//// USUARIOS ////
class Usuario {
    constructor(nombres, apellidos, genero, rango, nacimiento, user, pass, imagen) {
        contadorId++
        this.id = contadorId
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.genero = genero;
        this.rango = rango;
        this.nacimiento = nacimiento;
        this.user = user;
        this.pass = pass;
        this.imagen = "./assets/img/productos/" + imagen;
        this.cantidadVendida = 0;
    }
};

//// PRODUCTOS ////
class Producto {
    constructor(nombre, categoria, fabricante, precio, stock, imagen) {
        contadorId++
        this.id = contadorId
        this.nombre = nombre;
        this.categoria = categoria;
        this.fabricante = fabricante;
        this.precio = precio;
        this.stock = stock;
        this.imagen = "./assets/img/productos/" + imagen;
        this.cantidadVendida = 0;
    }
};



//// FABRICANTES ////
class Fabricante {
    constructor(nombre, origen, info) {
        this.nombre = nombre;
        this.origen = origen;
        this.info = info;
    }
};

