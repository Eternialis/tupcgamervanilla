let contadorId = 0;

// Productos cargados con hardcode a modo de prueba:
let productos = [];

producto1 = new Producto("Procesador Intel Core i7 9700F 4.7GHz Turbo 1151 Coffee Lake", "Microprocesador", "Intel", 400.50, 500, "Procesador_Intel_Core_i7_9700F_4.7GHz_Turbo_1151_Coffee_Lake_40da7c9b-med.jpg");
producto2 = new Producto("Gabinete Kolink Void ARGB ATX Vidrio Templado", "Gabinete", "Kolink", 250.50, 240, "Gabinete_Kolink_Void_ARGB_ATX_Vidrio_Templado_f962dc11-med.jpg");
producto3 = new Producto("Fuente ASUS ROG STRIX 750G 80 Plus Gold 750W Full Modular", "Fuente", "ASUS", 970.20, 40, "Fuente_ASUS_ROG_STRIX_750G_80_Plus_Gold_750W_Full_Modular_38c61d29-med.jpg");

productos.push(producto1);
productos.push(producto2);
productos.push(producto3);

let productosStorage = JSON.parse(localStorage.getItem("productos"));
if (!productosStorage) {
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Fabricantes cargados con hardcode a modo de prueba: 

let fabricantes = [];

fabricante1 = new Fabricante("Intel", "Estados Unidos", "Intel Corporation es el mayor fabricante de circuitos integrados del mundo según su cifra de negocio anual.​ La compañía estadounidense es la creadora de la serie de procesadores x86, los procesadores más comúnmente encontrados en la mayoría de las computadoras personales.");
fabricante2 = new Fabricante("Kolink", "Hungría", "Establecida en 2002, Kolink proporcionó teclados y ratones de bajo costo a revendedores de computadoras en Hungría. A lo largo de los años, Kolink amplió su gama para incluir estuches y fuentes de alimentación de nivel de entrada. Desde sus pequeños comienzos hasta su expansión por Europa, Kolink está estableciendo rápidamente una huella global de clientes. Su equipo mundial de expertos de la industria evalúa constantemente las demandas del mercado y actualiza la gama de productos para ofrecer las últimas tendencias.");
fabricante3 = new Fabricante("ASUS", "Taiwán", "ASUSTeK Computer, Inc., conocida simplemente como ASUS —pronunciado habitualmente con fonética inglesa «ei-sus»—, es una corporación multinacional de hardware, electrónica y robótica​ con sede en Taipéi, Taiwán, en el Distrito de Beitou.");

fabricantes.push(fabricante1);
fabricantes.push(fabricante2);
fabricantes.push(fabricante3);

let fabricantesStorage = JSON.parse(localStorage.getItem("fabricantes"));
if (!fabricantesStorage) {
    localStorage.setItem("fabricantes", JSON.stringify(fabricantes));
}


// Permite actualizar las opciones de fabricantes en el formulario de productos dependiendo de los fabricantes cargados en el local Storage

function refreshProductsFabs() {
    fabricantesStorage = JSON.parse(localStorage.getItem("fabricantes"));
    const fragmentFabricantes = document.createDocumentFragment();
    $('<option>', {
        value: "",
        text: "",
    }).appendTo(fragmentFabricantes);

    fabricantesStorage.forEach(fabricante => {
        $('<option>', {
            value: `${fabricante.nombre}`,
            text: `${fabricante.nombre}`,
        }).appendTo(fragmentFabricantes);

    })
    $("#fabricante").empty();
    $("#fabricante").append(fragmentFabricantes);

}

refreshProductsFabs();

// Esconde los formularios de producto y fabricante.

function hiddingForms() {

    if ($("#btnFabricante").attr("class").includes("highlightColor")) {
        $("#formFabricante").delay(1000).slideUp("slow");
        $("#btnFabricante").toggleClass("highlightColor");
    }
    if ($("#btnProducto").attr("class").includes("highlightColor")) {
        $("#formProducto").delay(1000).slideUp("slow");
        $("#btnProducto").toggleClass("highlightColor");
    }
    $("#successMsjGeneral").hide();
    $("#successMsjGeneralFab").hide();
}

