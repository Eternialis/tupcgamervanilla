// Evento para agregar productos al carrito (local storage)
const agregarAlCarrito = (e) => {
    const nombreProd = $(e.target).parent().children("a").text();
    const precioProd = $(e.target).parent().children("h4").text().slice(2);
    const objProd = { nombre: nombreProd, precio: precioProd };
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {

        if (usuario.carrito) {
            usuario.carrito.push(objProd);
        } else {
            usuario.carrito = [objProd];
        }

        localStorage.setItem("usuario", JSON.stringify(usuario));
        mostrarEnCarrito();
    }

};

//API con el valor actualizado del dolar

const VALOR_DOLAR = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
let dolarOficial = {};
let dolarBlue = {};

async function precioDolar(tipoDolar) {
    let objetoDolar = [];
    await $.get(VALOR_DOLAR, function (respuesta, estado) {
        if (estado === "success") {
            objetoDolar = respuesta
        }
    })
    return objetoDolar;
};

// Creación dinámica de las cards para los clientes: en pesos si funciona la API y en dolares si no.

let productosStorageCliente = JSON.parse(localStorage.getItem("productos"));
const fragmentProductosCliente = document.createDocumentFragment();

precioDolar().then(result => {
    Object.assign(dolarOficial, result[0].casa);
    Object.assign(dolarBlue, result[1].casa);

    productosStorageCliente.forEach(producto => {

        const temporalCard = document.querySelector("#cardProductoClienteTemplate").content.firstElementChild.cloneNode(true);
        temporalCard.querySelector(".productsContainer__Title").textContent = producto.nombre;
        temporalCard.querySelector("p").textContent = producto.categoria;
        temporalCard.querySelector("h4").textContent = `$ ${producto.precio * parseFloat(dolarBlue.venta)}`;
        temporalCard.querySelector("img").src = producto.imagen;

        temporalCard.querySelector("button").addEventListener("click", agregarAlCarrito);

        fragmentProductosCliente.appendChild(temporalCard);
    });

    $(".productsContainer").append(fragmentProductosCliente);
});

precioDolar().catch(result => {

    productosStorageCliente.forEach(producto => {

        const temporalCard = document.querySelector("#cardProductoClienteTemplate").content.firstElementChild.cloneNode(true);
        temporalCard.querySelector(".productsContainer__Title").textContent = producto.nombre;
        temporalCard.querySelector("p").textContent = producto.categoria;
        temporalCard.querySelector("h4").textContent = `U$D ${producto.precio} (el valor en pesos no está disponible)`;
        temporalCard.querySelector("img").src = producto.imagen;
        temporalCard.querySelector("button").addEventListener("click", agregarAlCarrito);

        fragmentProductosCliente.appendChild(temporalCard);
    });

    $(".productsContainer").append(fragmentProductosCliente);
});



//Eventos de click

$(document).ready(function () {

    // Filtros con las etiquetas de tipo de productos
    $(".filters > ul > li").click((e) => {

        let tagFilter = $(e.target).text();
        let tagProductos = $(".productsContainer__text > p");

        for (i = 0; i < tagProductos.length; i++) {

            if (tagProductos[i].textContent !== tagFilter) {
                tagProductos[i].parentNode.parentNode.style.display = "none"
            } else {
                tagProductos[i].parentNode.parentNode.style.display = "flex"
            }
        }
    });

    $("#clearFilters").click((e) => {

        let cardsProductos = document.querySelectorAll(".productsContainer__card");

        for (i = 0; i < cardsProductos.length; i++) {
            cardsProductos[i].style.display = "flex"
        }
    });

    // Modal de confirmación de compra

    const quitarLabel = () => {
        $(".modal").fadeOut();
    };

    const confirmarCompra = () => {
        $(".modal").fadeOut();
        let usuario = JSON.parse(localStorage.getItem("usuario"));
        delete usuario.carrito;
        localStorage.setItem("usuario", JSON.stringify(usuario));
        mostrarEnCarrito();

        const fragment = document.createDocumentFragment();
        const modal = document.querySelector("#modalTemplate").content.firstElementChild.cloneNode(true);
        modal.querySelector("p").textContent = "La compra se ha realizado con éxito";

        modal.querySelector("button.aceptarBtn").addEventListener("click", quitarLabel);
        modal.querySelector("button.cancelarBtn").addEventListener("click", quitarLabel);
        modal.querySelector("div.modal-content > i").addEventListener("click", quitarLabel);

        fragment.appendChild(modal);
        $("body").append(fragment);

    };

    let eventBorrarCard = "";

    $("#finalizarCompra").click((e) => {

        e.stopPropagation();
        let usuario = JSON.parse(localStorage.getItem("usuario"));

        const fragmentUl = document.createDocumentFragment();
        const fragment = document.createDocumentFragment();
        const modal = document.querySelector("#modalTemplate").content.firstElementChild.cloneNode(true);


        usuario.carrito.forEach(producto => {
            $('<li>', {
                text: `${producto.nombre} - $ ${producto.precio}`,
            }).appendTo(fragmentUl);
        })

        modal.querySelector("ul").appendChild(fragmentUl);
        let total = 0;

        for (let i = 0; i < usuario.carrito.length; i++) {
            num = Math.round(usuario.carrito[i].precio)
            total += num;
        }

        console.log(total)
        modal.querySelector("p").textContent = `El precio total es de $ ${total} ¿Desea confirmar su compra?`;

        modal.querySelector("button.aceptarBtn").addEventListener("click", confirmarCompra);
        modal.querySelector("button.cancelarBtn").addEventListener("click", quitarLabel);
        modal.querySelector("div.modal-content > i").addEventListener("click", quitarLabel);

        fragment.appendChild(modal);
        $("body").append(fragment);

    })


})