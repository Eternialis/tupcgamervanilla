// REGEX

const REG_TITULO = /[a-zA-Z0-9 .,-]{7,25}$/i;
const REG_PRECIO = /^\S+[0-9]{1,}([,.][0-9]{,2})?$/
const REG_STOCK = /^[0-9]+$/;
const REG_IMAGENES = /^\S+.jpg$/;

$(document).ready(function () {

    //Muestra de formulario de productos

    $("#btnProducto").click(() => {

        $("#btnProducto").toggleClass("highlightColor");
        $("#formProducto").delay(1000).toggle("slow");
        $("#successMsjGeneralFab").hide();
        if ($("#btnFabricante").attr("class").includes("highlightColor")) {
            $("#formFabricante").delay(1000).slideUp("slow");
            $("#btnFabricante").toggleClass("highlightColor");
        }
    });


    // Carga de productos

    $("#formProducto").submit((e) => {

        e.preventDefault();
        let error = false;
        let nombreProd = $("#nombreProd").val();
        let precio = $("#precio").val();
        let categoria = $("#categoria").val();
        let fabricante = $("#fabricante").val();
        let stock = $("#stock").val();
        let imagen = $("#localImg").val();

        console.log(imagen);

        if (nombreProd === "") {
            $("#nombreProd").addClass("inputError");
            error = true;
        } else if (!REG_TITULO.test(nombreProd)) {
            $("#errorMsjTitulo").show();
            $("#nombreProd").addClass("inputError");
            error = true;
        } else {
            $("#errorMsjTitulo").hide();
            $("#nombreProd").removeClass("inputError");
        }

        if (precio === "") {
            $("#precio").addClass("inputError");
            error = true;
        } else if (!REG_PRECIO.test(precio)) {
            $("#errorMsjprecio").show();
            $("#precio").addClass("inputError");
            error = true;
        } else {
            $("#errorMsjprecio").hide();
            $("#precio").removeClass("inputError");
        }

        if (stock === "") {
            $("#stock").addClass("inputError");
            error = true;
        } else if (!REG_STOCK.test(stock)) {
            $("#errorMsjstock").show();
            $("#stock").addClass("inputError");
            error = true;
        } else {
            $("#errorMsjstock").hide();
            $("#stock").removeClass("inputError");
        }

        if (categoria === "") {
            $("#categoria").addClass("inputError");
            error = true;
        } else {
            $("#categoria").removeClass("inputError");
        }

        if (fabricante === "") {
            $("#fabricante").addClass("inputError");
            error = true;
        } else {
            $("#fabricante").removeClass("inputError");
        }

        if (imagen === "") {
            $("#localImg").addClass("inputError");
            error = true;
        } else if (!REG_IMAGENES.test(imagen)) {
            $("#errorMsjImg").show();
            $("#localImg").addClass("inputError");
            error = true;
        } else {
            $("#errorMsjImg").hide();
            $("#localImg").removeClass("inputError");
        }


        if (error) {
            $("#errorMsjGeneral").show();
            $("#successMsjGeneral").hide();
        } else {
            $("#errorMsjGeneral").hide();
            $("#successMsjGeneral").show();

            const nuevoProducto = new Producto(nombreProd, categoria, fabricante, precio, stock, imagen);
            let productosStorage = JSON.parse(localStorage.getItem("productos"));

            if (productosStorage) {
                productosStorage.push(nuevoProducto);
            } else {
                productosStorage = [nuevoProducto];
            }
            localStorage.setItem("productos", JSON.stringify(productosStorage));
            $("#formProducto").children()[0].reset();
        }
    })


})


