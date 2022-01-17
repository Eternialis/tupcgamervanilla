
$(document).ready(function () {

    // Muestra los productos almacenados en el localStorage

    $("#mostrarProductosBtn").click(() => {

        $("#mostrarProductosBtn").toggleClass("highlightColor").delay(1000).css("background-position", "100% 0%");

        if (localStorage.getItem("productos")) {

            let productosStorage = JSON.parse(localStorage.getItem("productos"));

            const fragment = document.createDocumentFragment();

            productosStorage.forEach(producto => {

                const temporalCard = document.querySelector("#cardProductoTemplate").content.firstElementChild.cloneNode(true);
                temporalCard.querySelector("h3").textContent = producto.nombre;
                temporalCard.querySelector("p").textContent = `${producto.tipo} \n Fabricante: ${producto.fabricante}`;
                temporalCard.querySelector("h4").textContent = `U$D${producto.precio} Stock:${producto.stock} unidades`;

                temporalCard.querySelector(".deleteBtn").addEventListener("click", modalAlert);
                temporalCard.querySelector(".stockBtn").addEventListener("click", reponerStock);

                fragment.appendChild(temporalCard);
            });

            hiddingForms();
            $("#containerProductos").append(fragment);

        }

    });

    //Borrar todos los productos almacenados en localStorage

    $("#borrarProductosBtn").click(() => {
        localStorage.removeItem("productos");

        $("#containerProductos").empty();
        hiddingForms();
    })

    // Modal de confirmación de borrado de producto
    let eventBorrarCard = "";
    const modalAlert = (e) => {

        e.stopPropagation();

        const fragment = document.createDocumentFragment();
        const modal = document.querySelector("#modalTemplate").content.firstElementChild.cloneNode(true);
        modal.querySelector("p").textContent = "El producto será eliminado de manera permanente";

        modal.querySelector("button.aceptarBtn").addEventListener("click", borrarProducto);
        modal.querySelector("button.cancelarBtn").addEventListener("click", quitarLabel);
        modal.querySelector("div.modal-content > i").addEventListener("click", quitarLabel);

        fragment.appendChild(modal);

        $("body").append(fragment);

        eventBorrarCard = $(e.target).parent().parent().parent();
    }

    // Borrado de una CARD y su producto en el localStorage

    const borrarProducto = () => {

        let productosStorage = JSON.parse(localStorage.getItem("productos"));
        let productoBorrado = eventBorrarCard.children(".temporalCard__text").children("h3").text();
        const indexProducto = productosStorage.findIndex(producto => producto.nombre === productoBorrado);
        productosStorage.splice(indexProducto, 1);
        localStorage.setItem("productos", JSON.stringify(productosStorage));
        $(".modal").fadeOut();
        eventBorrarCard.fadeOut();
    };

    const quitarLabel = () => {
        $(".modal").fadeOut();
    };

    const reponerStock = (e) => {
        console.log($(e.target).parent().parent().children("form").css("display", "flex"));
    };

})