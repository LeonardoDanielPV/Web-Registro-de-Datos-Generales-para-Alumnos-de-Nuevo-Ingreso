$(document).ready(function(){
    $("#btnCerrarSesionT").click(function(event){
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
});