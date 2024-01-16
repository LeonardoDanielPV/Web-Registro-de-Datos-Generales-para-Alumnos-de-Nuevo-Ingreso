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

    $.ajax({
        url: "/ESCOM_NS_ISC_S4_TDAW/registroDeDatosGeneralesParaAlumnosDeNuevoIngreso/src/assets/php/scripts/obtenerTipoSesion.php",
        method: "POST",
        cache: false,
        data: {},
        success: ajustaParaSesion
    });

    $.ajax({
        url: "/ESCOM_NS_ISC_S4_TDAW/registroDeDatosGeneralesParaAlumnosDeNuevoIngreso/src/assets/php/scripts/obtenerNombreCompletoSesion.php",
        method: "POST",
        cache: false,
        data: {},
        success: ponerNombreCompleto
    });
});

function ajustaParaSesion(respAx)
{
    var lTipo = respAx;

    ponerTipoSesion(lTipo);

    $.ajax({
        url: "/ESCOM_NS_ISC_S4_TDAW/registroDeDatosGeneralesParaAlumnosDeNuevoIngreso/src/assets/php/scripts/obtenerInfoGrupo.php",
        method: "POST",
        cache: false,
        data: {tipo: lTipo},
        success: crearCardsGrupo
    });
}

function ponerTipoSesion(tipo)
{
    if(tipo == "alumno")
    {
        $("#pAlumnAdmin").text("Alumno");
    }
    else if(tipo == "administrador")
    {
        $("#pAlumnAdmin").text("Administrador");
    }
}

function ponerNombreCompleto(respAx)
{
    $("#hNombreCompleto").text(respAx);
}

function crearCardsGrupo(respAx)
{
    var datos = respAx.split(',');

    var indice = 0;
    var contenidoHTML = "";
    while(indice < datos.length)
    {
        contenidoHTML +=  "<div class=\"col-md-6\">"+
                                "<div class=\"card card-team\">"+
                                "<div class=\"card-body\">"+
                                    "<div class=\"card-title\">"+
                                    "<a href=\"grupo.html\"><h5 data-filter-by=\"text\">" + datos[indice++] + "</h5></a>"+
                                    "<span>1 Examen, " + datos[indice++] + " Alumnos</span>"+
                                    "</div>"+
                                    "<ul class=\"avatars\">"+

                                    "<li>"+
                                        "<a data-toggle=\"tooltip\">"+
                                        "<img alt=\"Foto perfil generica\" class=\"avatar\" src=\"assets/img/fotoPerfilGenerica.png\" />"+
                                        "</a>"+
                                    "</li>"+

                                    "<li>"+
                                        "<a data-toggle=\"tooltip\">"+
                                        "<img alt=\"Foto perfil generica\" class=\"avatar\" src=\"assets/img/fotoPerfilGenerica.png\" />"+
                                        "</a>"+
                                    "</li>"+

                                    "<li>"+
                                        "<a data-toggle=\"tooltip\">"+
                                        "<img alt=\"Foto perfil generica\" class=\"avatar\" src=\"assets/img/fotoPerfilGenerica.png\" />"+
                                        "</a>"+
                                    "</li>"+

                                    "</ul>"+
                                "</div>"+
                                "</div>"+
                            "</div>";
    }

    var miDiv = document.getElementById("divCardsGrupos");
    miDiv.innerHTML = contenidoHTML;
}