const usuario = localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")) : { nombre: "visitante", rango: "visitante" };

// Definición de perfil de usuario en la barra de navegación (o botones para loguearse / registrarse)

if (usuario.nombre !== "visitante") {
    $("#cart").css("display", "flex")
    // $("profile")
    $("#profile > p").text(usuario.nombre);
    $("#profile").css("display", "flex")
} else {
    $("#login").show();
    $("#signin").show();
}

if (usuario.rango !== "administrador") {
    $("#vistaEdicion").hide()
}

$("#logout").click(() => {

    localStorage.removeItem("usuario");

    location.reload();
})

//Evento para mostrar productos en el carrito

function mostrarEnCarrito() {

    let usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario.carrito) {

        const fragmentCarrito = document.createDocumentFragment();

        usuario.carrito.forEach(producto => {
            $('<li>', {
                text: `${producto.nombre} - $ ${producto.precio}`,
            }).appendTo(fragmentCarrito);
        })

        $("#cantidadProductos").text(usuario.carrito.length);
        $("#list > ul").empty();
        $("#list > ul").append(fragmentCarrito);
    } else {

        $("#list > ul").empty();
        $("#cantidadProductos").text("");
        $("#list").hide();
    }
}

mostrarEnCarrito();
$("#list").hide();

$(document).ready(function () {

    // Borrado de los productos del carrito
    $("#borrarCompra").click(() => {

        let usuario = JSON.parse(localStorage.getItem("usuario"));
        delete usuario.carrito;
        localStorage.setItem("usuario", JSON.stringify(usuario));
        mostrarEnCarrito();

    })

    $("#cart > i").click(() => {

        $("#list").toggle("slow");
    })

})