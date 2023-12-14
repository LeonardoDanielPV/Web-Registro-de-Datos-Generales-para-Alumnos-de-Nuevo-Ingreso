$(document).ready(function(){
    $("#errorGeneral").hide();
    $("#errorIdentidad").hide();
    $("#errorContacto").hide();
    $("#errorProcedencia").hide();
    $("#errorSalud").hide();
    $("#errorSesion").hide();

    $("#escuela").change(function(){
        var seleccionado = $(this).val();

        if(seleccionado == "otra")
        {
            $("#colEscuelaOtra").show();
        }
        else
        {
            $("#colEscuelaOtra").hide();
        }
    });
});

$("#btnRegistrar").click(function(evento){
    evento.preventDefault();
    if(!comprobarDatos())
    {
        $("#errorGeneral").show();
    }
    else
    {
        //cardConfirmarDatos();
    }
});

function comprobarDatos()
{
    var validar = true;
    if(!comprobarIdentidad())
    {
        validar = false;
    }
    if(comprobarContacto())
    {
        validar = false;
    }
    if(comprobarProcedencia())
    {
        validar = false;
    }
    /*if(comprobarSalud())
    {
        validar = false;
    }
    if(comprobarSesion())
    {
        validar = false;
    }*/

    return validar;
}

function comprobarIdentidad()
{
    var nroDeBoleta = $("#perfilNroDeBoleta").val();
    var nombres = $("#perfilNombres").val();
    var apellidoPaterno = $("#perfilApellidoPaterno").val();
    var apellidoMaterno = $("#perfilApellidoMaterno").val();
    var fechaDeNacimiento = $("#perfilFechaDeNacimiento").val();
    var generoMasculino = $("#generoMasculino").is(':checked');
    var generoFemenino = $("#generoFemenino").is(':checked');
    var generoOtro = $("#generoOtro").is(':checked');
    var CURP = $("#perfilCURP").val();

    if(nroDeBoleta.length == 0 || nombres.length == 0 || apellidoPaterno.length == 0 || apellidoMaterno.length == 0 || fechaDeNacimiento.length == 0 || CURP.length == 0)
    {
        $("#errorIdentidad").show();
        $("#spanErrorIdentidad").text("No debe haber campos vacios.");
        return false;
    }

    if(!(generoMasculino || generoFemenino ||generoOtro))
    {
        $("#errorIdentidad").show();
        $("#spanErrorIdentidad").text("Selecciona tu género.");
        return false;
    }

    var patron = /^[A-Za-zÁÉÍÓÚáéíóú\s\-]+$/;
    if(!patron.test(nombres) || !patron.test(apellidoPaterno) || !patron.test(apellidoMaterno))
    {
        $("#errorIdentidad").show();
        $("#spanErrorIdentidad").text("Tu nombre y apellidos no pueden tener caracteres especiales ni números.");
        return false;
    }

    if(nroDeBoleta.length != 10)
    {
        $("#errorIdentidad").show();
        $("#spanErrorIdentidad").text("Tu número de boleta es incorrecta. Solo puede tener 10 dígitos.");
        return false;
    }

    patron = /^[0-9]+$/;
    var validar = true;
    if(!patron.test(nroDeBoleta))
    {
        if(nroDeBoleta[0] == 'P')
        {
            if(nroDeBoleta[1] == 'E' || nroDeBoleta[1] == 'E')
            {
                if(!patron.test(nroDeBoleta.substring(2, 10)))
                {
                    $("#errorIdentidad").show();
                    $("#spanErrorIdentidad").text("Tu número de boleta es incorrecta. Solo debe tener números desdepues de \"PE\" o \"PP\".");
                    validar = false;
                }
            }
            else
            {
                $("#errorIdentidad").show();
                $("#spanErrorIdentidad").text("Tu número de boleta es incorrecta. Debe haber \'P\' o \'E\' despues de la primera \'P\'.");
                validar = false;
            }
        }
        else
        {
            $("#errorIdentidad").show();
            $("#spanErrorIdentidad").text("Tu número de boleta es incorrecta. Solo debe tener números o iniciar con \"PE\" o \"PP\".");
            validar = false;
        }
    }
    if(!validar)
        return false;

    if(CURP.length != 18)
    {
        $("#errorIdentidad").show();
        $("#spanErrorIdentidad").text("Tu CURP es incorrecta. Solo puede tener 18 dígitos.");
        return false;
    }
    patron = /^[A-Za-z]+$/;
    if(!patron.test(CURP.substring(0, 4)))
    {
        $("#errorIdentidad").show();
        $("#spanErrorIdentidad").text("Tu CURP es incorrecta. Los primeros 4 digitos deben ser letras.");
        return false;
    }
    patron = /^[0-9]+$/;
    if(!patron.test(CURP.substring(4, 10)))
    {
        $("#errorIdentidad").show();
        $("#spanErrorIdentidad").text("Tu CURP es incorrecta. Los digitos en el rango de 5 a 10 inclusive deben ser números.");
        return false;
    }
    patron = /^[A-Za-z]+$/;
    if(!patron.test(CURP.substring(10, 16)))
    {
        $("#errorIdentidad").show();
        $("#spanErrorIdentidad").text("Tu CURP es incorrecta. Los digitos en el rango de 11 a 16 inclusive deben ser letras.");
        return false;
    }
    patron = /^[A-Za-z0-9]+$/;
    if(!patron.test(CURP.substring(16, 18)))
    {
        $("#errorIdentidad").show();
        $("#spanErrorIdentidad").text("Tu CURP es incorrecta. Los ultimos 2 dígitos solo pueden ser letras o números.");
        return false; 
    }

    $("#errorIdentidad").hide();
    return true;
}

function comprobarContacto()
{
    var calleYNumero = $("#perfilCalleYNumero").val();
    var colonia = $("#perfilColonia").val();
    var alcaldia = $("#alacaldia").val();
    var codigoPostal = $("#perfilCodigoPostal").val();
    var telefonoOCelular = $("#perfilTelefonoOCelular").val();

    if(calleYNumero.length == 0 || colonia.length == 0 || codigoPostal.length == 0 || telefonoOCelular.length == 0)
    {
        $("#errorContacto").show();
        $("#spanErrorContacto").text("No debe haber campos vacios.");
        return false;
    }
    
    var patron = /^[0-9]+$/;
    if(!patron.test(codigoPostal))
    {
        $("#errorContacto").show();
        $("#spanErrorContacto").text("El codigo postal solo debe tener números.");
        return false;
    }

    if(telefonoOCelular.length != 10)
    {
        $("#errorContacto").show();
        $("#spanErrorContacto").text("El nro. de telefono o celular solo debe tener 10 digitos.");
        return false;
    }

    if(!patron.test(telefonoOCelular))
    {
        $("#errorContacto").show();
        $("#spanErrorContacto").text("El nro. de telefono o celular solo debe tener números.");
        return false;
    }

    $("#errorContacto").hide();
    return true;
}

function comprobarProcedencia()
{
    var escuela = $("#escuela").val();
    var escuelaOtra = $("#perfilEscuelaOtra");
    var entidadFederativa = $("#entidadFederativa");
    var promedio = $("#perfilPromedio");
    var opcion1 = $("#opcion1").is(':checked');
    var opcion2 = $("#opcion2").is(':checked');
    var opcion3 = $("#opcion3").is(':checked');
    

}