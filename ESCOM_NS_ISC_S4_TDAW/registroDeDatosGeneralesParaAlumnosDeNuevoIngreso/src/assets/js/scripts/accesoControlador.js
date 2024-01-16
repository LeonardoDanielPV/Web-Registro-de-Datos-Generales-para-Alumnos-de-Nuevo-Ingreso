$(document).ready(function(){
    $("#btnAcceder").click(function(evento){
        evento.preventDefault();
        buscarUsuario();
    });

    $("#errorGeneral").hide();
});

//-----------------------------------------------------------------------------
//
//  buscarUsuario
//

function buscarUsuario()
{
    var lCorreoElectronico = $("#accesoCorreoElectronico").val();
    var lClave = $("#accesoContrasenia").val();

    $.ajax({
        url: "/ESCOM_NS_ISC_S4_TDAW/registroDeDatosGeneralesParaAlumnosDeNuevoIngreso/src/assets/php/scripts/buscarUsuario.php",
        method: "POST",
        cache: false,
        data: {correoElectronico: lCorreoElectronico, clave: lClave},
        success: evaluarRespuestaPHP
    });
}

//-----------------------------------------------------------------------------
//
//  evaluarRespuestaPHP
//

function evaluarRespuestaPHP(respAx)
{
    if(isNaN(respAx))
    {
        $("#errorGeneral").show();
    }
    else
    {
        let id = respAx;
        //alert(id);
        iniciarSesion(id);
    }
}

//-----------------------------------------------------------------------------
//
//  iniciarSesion
//

function iniciarSesion(lId)
{
    $.ajax({
        url: "/ESCOM_NS_ISC_S4_TDAW/registroDeDatosGeneralesParaAlumnosDeNuevoIngreso/src/assets/php/scripts/iniciarSesion.php",
        method: "POST",
        cache: false,
        data: {id: lId},
        success: (respAx)=>{
            if(respAx == "Exito")
            {
                //alert("Accedido correctamente.");
                window.location.href = "/ESCOM_NS_ISC_S4_TDAW/registroDeDatosGeneralesParaAlumnosDeNuevoIngreso/src/index.html"
            }
            else
            {
                alert("Lo sentimos. Ocurrio un error inesperado.");
            }
        }
    });
}