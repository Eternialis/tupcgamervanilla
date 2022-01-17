const USUARIOS = "assets/js/usuarios.json"

async function obtener(userLog) {
    let usuario = {};

    await $.getJSON(USUARIOS, function (respuesta, estado) {
        if (estado === "success") {
            usuario = respuesta.find((userObj) => userObj.user === userLog)
        }
    })
    return usuario;
};

$(document).ready(function () {

    $(".logBtn").click((e) => {

        e.preventDefault();

        const username = $("#username").val();
        const password = $("#password").val();

        obtener(username).then(result => {

            if (result && password === result.pass) {
                const objCliente = { nombre: result.nombres, rango: result.rango };
                localStorage.setItem("usuario", JSON.stringify(objCliente));

                if (result.rango === "administrador") {
                    window.location.href = "./vistaEdicion.html";
                } else {
                    window.location.href = "./index.html";
                }
            } else {
                $("#errorMsj").show()
            }
        });

    });

})