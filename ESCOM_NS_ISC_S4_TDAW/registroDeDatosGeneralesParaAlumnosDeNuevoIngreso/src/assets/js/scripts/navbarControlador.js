$(document).ready(function(){
    $("#btnCerrarSesionP").click(function(event){
        event.preventDefault();
        
        $.ajax({
            url: "/ESCOM_NS_ISC_S4_TDAW/registroDeDatosGeneralesParaAlumnosDeNuevoIngreso/src/assets/php/scripts/cerrarSesion.php",
            method: "POST",
            cache: false,
            data: {},
            success: (respAx)=>{
                //alert("Se cerro la sesion.");
                window.location.href = "/ESCOM_NS_ISC_S4_TDAW/registroDeDatosGeneralesParaAlumnosDeNuevoIngreso/src/index.html"
            }
        });
    });
    $("#btnCerrarSesionS").click(function(event){
        event.preventDefault();
        
        $.ajax({
            url: "/ESCOM_NS_ISC_S4_TDAW/registroDeDatosGeneralesParaAlumnosDeNuevoIngreso/src/assets/php/scripts/cerrarSesion.php",
            method: "POST",
            cache: false,
            data: {},
            success: (respAx)=>{
                //alert("Se cerro la sesion.");
                window.location.href = "/ESCOM_NS_ISC_S4_TDAW/registroDeDatosGeneralesParaAlumnosDeNuevoIngreso/src/index.html"
            }
        });
    });

    $.ajax({
        url: "/ESCOM_NS_ISC_S4_TDAW/registroDeDatosGeneralesParaAlumnosDeNuevoIngreso/src/assets/php/scripts/obtenerIdSesion.php",
        method: "POST",
        cache: false,
        data: {},
        success: evaluarRespuestaPHP
    });
});

function evaluarRespuestaPHP(respAx)
{
    if(isNaN(respAx))
    {
        //alert("No hay sesion iniciada.");
        reajustarElementos(false);
    }
    else
    {
        //alert("El id de la sesion es:" + respAx);
        reajustarElementos(true);
    }
}

function reajustarElementos(sesionIniciada)
{
    if(sesionIniciada)
    {
        $("#btnIniSesionP").hide();
        $("#btnRegistrarP").hide();
        $("#btnIniSesionS").hide();
        $("#btnRegistrarS").hide();
        $.ajax({
            url: "/ESCOM_NS_ISC_S4_TDAW/registroDeDatosGeneralesParaAlumnosDeNuevoIngreso/src/assets/php/scripts/obtenerTipoSesion.php",
            method: "POST",
            cache: false,
            data: {},
            success: (respAx)=>{
                //alert("Eres " + respAx);
                if(respAx == "administrador")
                {
                    $("#btnDatosGeneralesP").hide();
                    $("#btnDatosGeneralesS").hide();
                    $("#navDatosGenerales").hide();
                }
            }
        });
    }
    else
    {
        $("#btnDatosGeneralesP").hide();
        $("#btnCerrarSesionP").hide();
        $("#btnDatosGeneralesS").hide();
        $("#btnCerrarSesionS").hide();
        $("#navContenido").hide();
    }
}