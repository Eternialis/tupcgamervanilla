//REGEX
const REG_FABRICANTE = /[a-zA-Z]{3,25}$/i;


$(document).ready(function () {

    //Muestra de formulario de fabricantes

    $("#btnFabricante").click(() => {

        $("#btnFabricante").toggleClass("highlightColor");
        $("#formFabricante").delay(1000).toggle("slow");
        $("#successMsjGeneral").hide();
        if ($("#btnProducto").attr("class").includes("highlightColor")) {
            $("#formProducto").delay(1000).slideUp("slow");
            $("#btnProducto").toggleClass("highlightColor");
        }
    })


    // Carga de fabricante

    $("#formFabricante").submit((e) => {

        e.preventDefault();
        let error = false;
        let nombreFabricante = $("#nombreFabricante").val();
        let origen = $("#origen").val();
        let infoFabricante = $("#infoFabricante").val();

        if (nombreFabricante === "") {
            $("#nombreFabricante").addClass("inputError");
            error = true;
        } else if (!REG_FABRICANTE.test(nombreFabricante)) {
            $("#errorMsjNombreFab").show();
            $("#nombreFabricante").addClass("inputError");
            error = true;
        } else {
            $("#errorMsjNombreFab").hide();
            $("#nombreFabricante").removeClass("inputError");
        }

        if (origen === "") {
            $("#origen").addClass("inputError");
            error = true;
        } else if (!REG_FABRICANTE.test(origen)) {
            $("#errorMsjOrigenFab").show();
            $("#origen").addClass("inputError");
            error = true;
        } else {
            $("#errorMsjOrigenFab").hide();
            $("#origen").removeClass("inputError");
        }


        if (error) {
            $("#errorMsjGeneralFab").show();
            $("#successMsjGeneralFab").hide();
        } else {
            $("#errorMsjGeneralFab").hide();
            $("#successMsjGeneralFab").show();

            const nuevoFabricante = new Fabricante(nombreFabricante, origen, infoFabricante);
            let fabricantesStorage = JSON.parse(localStorage.getItem("fabricantes"));
            if (fabricantesStorage) {
                fabricantesStorage.push(nuevoFabricante);
                localStorage.setItem("fabricantes", JSON.stringify(fabricantesStorage));
            } else {
                localStorage.setItem("fabricantes", JSON.stringify([nuevoFabricante]));
            }
            $("#formFabricante").children()[0].reset();
            refreshProductsFabs();
        }
    })



})