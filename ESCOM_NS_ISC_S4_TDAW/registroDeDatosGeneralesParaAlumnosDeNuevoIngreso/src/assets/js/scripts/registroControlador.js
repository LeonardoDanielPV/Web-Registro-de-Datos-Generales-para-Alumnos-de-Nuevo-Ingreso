$(document).ready(function(){
    $("#btnRegistrar").click(function(evento){
        evento.preventDefault();
        if(!comprobarDatos())
        {
            $("#errorGeneral").show();
        }
        else
        {
            cardConfirmarDatos();
        }
    });
    $("#btnLimpiar").click(function(evento){
        limpiarDatos();
    });


    limpiarDatos();

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

    $("#condicionDeSalud").change(function(){
        var seleccionado = $(this).val();

        if(seleccionado == "otra")
        {
            $("#colCondicionDeSaludOtra").show();
        }
        else
        {
            $("#colCondicionDeSaludOtra").hide();
        }
    });


    // Registrar
    $("#btnModificar").click(function(){
        cardModificarDatos();
    });

    $("#btnCrear").click(function(){
        guardarDatos();
    });

});

//-----------------------------------------------------------------------------
//
//  comprobarDatos
//

function comprobarDatos()
{
    var validar = true;
    if(!comprobarIdentidad())
    {
        validar = false;
    }
    if(!comprobarContacto())
    {
        validar = false;
    }
    if(!comprobarProcedencia())
    {
        validar = false;
    }
    if(!comprobarSalud())
    {
        validar = false;
    }
    if(!comprobarSesion())
    {
        validar = false;
    }

    return validar;
}

//-----------------------------------------------------------------------------
//
//  comprobarIdentidad
//

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

//-----------------------------------------------------------------------------
//
//  comprobarContacto
//

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

//-----------------------------------------------------------------------------
//
//  comprobarProcedencia
//

function comprobarProcedencia()
{
    var escuela = $("#escuela").val();
    var escuelaOtra = $("#perfilEscuelaOtra").val();
    var entidadFederativa = $("#entidadFederativa").val();
    var promedio = $("#perfilPromedio").val();
    var opcion1 = $("#opcion1").is(':checked');
    var opcion2 = $("#opcion2").is(':checked');
    var opcion3 = $("#opcion3").is(':checked');
    
    if((escuela == "otra" && escuelaOtra.length == 0) || promedio.length == 0)
    {
        $("#errorProcedencia").show();
        $("#spanErrorProcedencia").text("No debe haber campos vacios.");
        return false;
    }

    if(!(opcion1 || opcion2 || opcion3))
    {
        $("#errorProcedencia").show();
        $("#spanErrorProcedencia").text("Selecciona el nro. de opcion donde pusiste a ESCOM.");
        return false;
    }

    var patron = /^[0-9\.]+$/;
    if(!patron.test(promedio))
    {
        $("#errorProcedencia").show();
        $("#spanErrorProcedencia").text("Tu promedio debe contener solo números (puede ser decimal).");
        return false;
    }

    var i = 0;
    var cont = 0;
    while(i < promedio.length && cont < 2)
    {
        if(promedio[i] == '.')
            cont = cont + 1;
        i = i + 1;
    }
    if(!(cont < 2))
    {
        $("#errorProcedencia").show();
        $("#spanErrorProcedencia").text("Tu promedio no puede contener más de un punto");
        return false;
    }

    patron = /^\d+(\.\d{0,2})?$/;
    if(!patron.test(promedio))
    {
        $("#errorProcedencia").show();
        $("#spanErrorProcedencia").text("Tu promedio debe contener maximo 2 decimales y sus unidades.");
        return false;
    }

    $("#errorProcedencia").hide();
    return true;
}

//-----------------------------------------------------------------------------
//
//  comprobarSalud
//

function comprobarSalud()
{
    var condicionDeSalud = $("#condicionDeSalud").val();
    var condicionDeSaludOtra = $("#perfilCondicionDeSaludOtra").val();

    if(condicionDeSalud == "otra")
    {
        if(condicionDeSaludOtra.length == 0)
        {
            $("#errorSalud").show();
            $("#spanErrorSalud").text("No debe haber campos vacios.");
            return false;
        }
    }

    $("#errorSalud").hide();
    return true;
}

//-----------------------------------------------------------------------------
//
//  comprobarSesion
//

function comprobarSesion()
{
    var correoElectronico = $("#perfilCorreoElectronico").val();
    var contrasenia = $("#perfilContrasenia").val();

    if(correoElectronico.length == 0 || contrasenia.length == 0)
    {
        $("#errorSesion").show();
        $("#spanErrorSesion").text("No debe haber campos vacios.");
        return false;
    }

    var patron = /@/;
    if(!patron.test(correoElectronico))
    {
        $("#errorSesion").show();
        $("#spanErrorSesion").text("Tu correo debe tener una @.");
        return false;
    }
    else if(correoElectronico.length == 1 || correoElectronico[0] == '@' || correoElectronico[correoElectronico.length - 1] == '@')
    {
        $("#errorSesion").show();
        $("#spanErrorSesion").text("Escribe una parte antes y despues del símbolo \"@\".");
        return false;
    }

    if(contrasenia.length < 8)
    {
        $("#errorSesion").show();
        $("#spanErrorSesion").text("Usa una contraseña de al menos 8 digitos.");
        return false;
    }

    $("#errorSesion").hide();
    return true;
}

//-----------------------------------------------------------------------------
//
//  limpiarDatos
//

function limpiarDatos()
{
    document.getElementById("formDatos").reset();

    $("#errorGeneral").hide();
    $("#errorIdentidad").hide();
    $("#errorContacto").hide();
    $("#errorProcedencia").hide();
    $("#colEscuelaOtra").show();
    $("#errorSalud").hide();
    $("#errorSesion").hide();
    $("#colCondicionDeSaludOtra").hide();
}

//-----------------------------------------------------------------------------
//
//  cardConfirmarDatos
//

function cardConfirmarDatos()
{
    // Identidad
    var nroDeBoleta = $("#perfilNroDeBoleta").val();
    var nombres = $("#perfilNombres").val();
    var apellidoPaterno = $("#perfilApellidoPaterno").val();
    var apellidoMaterno = $("#perfilApellidoMaterno").val();
    var fechaDeNacimiento = $("#perfilFechaDeNacimiento").val();
    var generoMasculino = $("#generoMasculino").is(':checked');
    var generoFemenino = $("#generoFemenino").is(':checked');
    var generoOtro = $("#generoOtro").is(':checked');
    var CURP = $("#perfilCURP").val();

    // Contacto
    var calleYNumero = $("#perfilCalleYNumero").val();
    var colonia = $("#perfilColonia").val();
    var alcaldia = $("#alacaldia").val();
    var codigoPostal = $("#perfilCodigoPostal").val();
    var telefonoOCelular = $("#perfilTelefonoOCelular").val();

    // Procedencia
    var escuela = $("#escuela").val();
    var escuelaOtra = $("#perfilEscuelaOtra").val();
    var entidadFederativa = $("#entidadFederativa").val();
    var promedio = $("#perfilPromedio").val();
    var opcion1 = $("#opcion1").is(':checked');
    var opcion2 = $("#opcion2").is(':checked');
    var opcion3 = $("#opcion3").is(':checked');

    // Salud
    var condicionDeSalud = $("#condicionDeSalud").val();
    var condicionDeSaludOtra = $("#perfilCondicionDeSaludOtra").val();

    // Sesion
    var correoElectronico = $("#perfilCorreoElectronico").val();
    var contrasenia = $("#perfilContrasenia").val();

    // Nombre
    $("#spanConfNombre").text(nombres + ", verifica que los datos que ingresaste sean correctos.");

    // Cargado

    // Identidad
    $("#confNroDeBoleta").text(nroDeBoleta);
    $("#confNombres").text(nombres);
    $("#confApellidoPaterno").text(apellidoPaterno);
    $("#confApellidoMaterno").text(apellidoMaterno);
    $("#confFechaDeNacimiento").text(fechaDeNacimiento);
    $("#confGenero").text(identificarGeneroPorRadios(generoMasculino, generoFemenino, generoOtro));
    $("#confCURP").text(CURP);

    // Contacto
    $("#confCalleYNumero").text(calleYNumero);
    $("#confColonia").text(colonia);
    $("#confAlcaldia").text(identificarAlcaldiaPorId(alcaldia));
    $("#confCodigoPostal").text(codigoPostal);
    $("#confTelefonoOCelular").text(telefonoOCelular);

    // Procedencia
    $("#confEscuela").text(identificarEscuelaPorId(escuela, escuelaOtra));
    $("#confEntidadFederativa").text(identificarEntidadFederativaPorId(entidadFederativa));
    $("#confPromedio").text(promedio);
    $("#confOpcion").text(identificaOpcionPorRadios(opcion1, opcion2, opcion3));

    // Salud
    $("#confOpcionSalud").text(identificarSaludPorId(condicionDeSalud, condicionDeSaludOtra));

    // Sesion
    $("#confCorreoElectronico").text(correoElectronico);
    $("#confContrasenia").text(contrasenia);
    

    $("#profile").removeClass("show active");
    $("#perfilConfirmar").addClass("show active");
}

//-----------------------------------------------------------------------------
//
//  identificarGeneroPorRadios
//

function identificarGeneroPorRadios(generoMasculino, generoFemenino, generoOtro)
{
    var genero;
    if(generoMasculino)
        genero = "Masculino";
    else if(generoFemenino)
        genero = "Femenino";
    else
        genero = "Otro";

    return genero;
}

//-----------------------------------------------------------------------------
//
//  identificarAlcaldiaPorId
//

function identificarAlcaldiaPorId(alcaldiaId)
{
    var alcaldiaValor;
    if(alcaldiaId == "sinAlc")
    {
        alcaldiaValor = "Sin especificar";
    }
    else if(alcaldiaId == "a1")
    {
        alcaldiaValor = "Álvaro Obregón"
    }
    else if(alcaldiaId == "a2")
    {
        alcaldiaValor = "Azcapotzalco"
    }
    else if(alcaldiaId == "a3")
    {
        alcaldiaValor = "Benito Juárez"
    }
    else if(alcaldiaId == "a4")
    {
        alcaldiaValor = "Coyoacán"
    }
    else if(alcaldiaId == "a5")
    {
        alcaldiaValor = "Cuajimalpa de Morelos"
    }
    else if(alcaldiaId == "a6")
    {
        alcaldiaValor = "Cuauhtémoc"
    }
    else if(alcaldiaId == "a7")
    {
        alcaldiaValor = "Gustavo A. Madero"
    }
    else if(alcaldiaId == "a8")
    {
        alcaldiaValor = "Iztacalco"
    }
    else if(alcaldiaId == "a9")
    {
        alcaldiaValor = "Iztapalapa"
    }
    else if(alcaldiaId == "a10")
    {
        alcaldiaValor = "La Magdalena Contreras"
    }
    else if(alcaldiaId == "a11")
    {
        alcaldiaValor = "Miguel Hidalgo"
    }
    else if(alcaldiaId == "a12")
    {
        alcaldiaValor = "Milpa alta"
    }
    else if(alcaldiaId == "a13")
    {
        alcaldiaValor = "Tláhuac"
    }
    else if(alcaldiaId == "a14")
    {
        alcaldiaValor = "Tlalpan"
    }
    else if(alcaldiaId == "a15")
    {
        alcaldiaValor = "Venustiano Carranza"
    }
    else if(alcaldiaId == "a16")
    {
        alcaldiaValor = "Xochimilco"
    }

    return alcaldiaValor;
}

//-----------------------------------------------------------------------------
//
//  identificarEscuelaPorId
//

function identificarEscuelaPorId(escuelaId, escuelaOtra)
{
    var escuelaValor = "indefinido";
    if(escuelaId == "otra")
        escuelaValor = escuelaOtra;
    else if(escuelaId == "cyt1")
        escuelaValor = "CECyT 1 González Vázquez Vega";
    else if(escuelaId == "cyt2")
        escuelaValor = "CECyT 2 Miguel Bernard";
    else if(escuelaId == "cyt3")
        escuelaValor = "CECyT 3 Estanislao Ramírez Ruiz";
    else if(escuelaId == "cyt4")
        escuelaValor = "CECyT 4 Lázaro Cárdenas";
    else if(escuelaId == "cyt5")
        escuelaValor = "CECyT 5 Benito Juárez García";
    else if(escuelaId == "cyt6")
        escuelaValor = "CECyT 6 Miguel Othón de Mendizábal";
    else if(escuelaId == "cyt7")
        escuelaValor = "CECyT 7 Cuauhtémoc";
    else if(escuelaId == "cyt8")
        escuelaValor = "CECyT 8 Narciso Bassols García";
    else if(escuelaId == "cyt9")
        escuelaValor = "CECyT 9 Juan de Dios Bátiz";
    else if(escuelaId == "cyt10")
        escuelaValor = "CECyT 10 Carlos Vallejo Márquez";
    else if(escuelaId == "cyt11")
        escuelaValor = "CECyT 11 Wilfrido Massieu Pérez";
    else if(escuelaId == "cyt12")
        escuelaValor = "CECyT 12 José María Morelos y Pavón";
    else if(escuelaId == "cyt13")
        escuelaValor = "CECyT 13 Ricardo Flores Magón";
    else if(escuelaId == "cyt14")
        escuelaValor = "CECyT 14 Luis Enrique Erro";
    else if(escuelaId == "cyt15")
        escuelaValor = "CECyT 15 Diódoro Antúnez Echegaray";
    else if(escuelaId == "cyt16")
        escuelaValor = "CECyT 16";
    else if(escuelaId == "cyt17")
        escuelaValor = "CECyT 17";
    else if(escuelaId == "cyt18")
        escuelaValor = "CECyT 18";
    else if(escuelaId == "cyt19")
        escuelaValor = "CECyT 19 Leona Vicario";
    else if(escuelaId == "cet1")
        escuelaValor = "CET 1 Walter Cross Buchanan";

    return escuelaValor;
}

//-----------------------------------------------------------------------------
//
//  identificarEntidadFederativaPorId
//

function identificarEntidadFederativaPorId(entidadId)
{
    var entidadValor = "indefinido";
    if(entidadId == "sinEnt")
        entidadValor = "Sin especificar";
    else if(entidadId == "ent1")
        entidadValor = "Aguascalientes";
    else if(entidadId == "ent2")
        entidadValor = "Baja California";
    else if(entidadId == "ent3")
        entidadValor = "Baja California Sur";
    else if(entidadId == "ent4")
        entidadValor = "Campeche";
    else if(entidadId == "ent5")
        entidadValor = "Chiapas";
    else if(entidadId == "ent6")
        entidadValor = "Chihuahua";
    else if(entidadId == "ent7")
        entidadValor = "Ciudad de México";
    else if(entidadId == "ent8")
        entidadValor = "Coahuila de Zaragoza";
    else if(entidadId == "ent9")
        entidadValor = "Colima";
    else if(entidadId == "ent10")
        entidadValor = "Durango";
    else if(entidadId == "ent11")
        entidadValor = "Guanajuato";
    else if(entidadId == "ent12")
        entidadValor = "Guerrero";
    else if(entidadId == "ent13")
        entidadValor = "Hidalgo";
    else if(entidadId == "ent14")
        entidadValor = "Jalisco";
    else if(entidadId == "ent15")
        entidadValor = "Estado de México";
    else if(entidadId == "ent16")
        entidadValor = "Michoacán de Ocampo";
    else if(entidadId == "ent17")
        entidadValor = "Morelos";
    else if(entidadId == "ent18")
        entidadValor = "Nayarit";
    else if(entidadId == "ent19")
        entidadValor = "Nuevo León";
    else if(entidadId == "ent20")
        entidadValor = "Oaxaca";
    else if(entidadId == "ent21")
        entidadValor = "Puebla";
    else if(entidadId == "ent22")
        entidadValor = "Querétaro";
    else if(entidadId == "ent23")
        entidadValor = "Quintana Roo";
    else if(entidadId == "ent24")
        entidadValor = "San Luis Potosí";
    else if(entidadId == "ent25")
        entidadValor = "Sinaloa";
    else if(entidadId == "ent26")
        entidadValor = "Sonora";
    else if(entidadId == "ent27")
        entidadValor = "Tabasco";
    else if(entidadId == "ent28")
        entidadValor = "Tamaulipas";
    else if(entidadId == "ent29")
        entidadValor = "Tlaxcala";
    else if(entidadId == "ent30")
        entidadValor = "Veracruz de Ignacio de la Llave";
    else if(entidadId == "ent31")
        entidadValor = "Yucatán";
    else if(entidadId == "ent32")
        entidadValor = "Zacatecas";
    
    return entidadValor;
}

//-----------------------------------------------------------------------------
//
//  identificaOpcionPorRadios
//

function identificaOpcionPorRadios(opcion1, opcion2, opcion3)
{
    var opcion;
    if(opcion1)
        opcion = "Primera";
    else if(opcion2)
        opcion = "Segunda"
    else
        opcion = "Tercera";

    return opcion;
}

//-----------------------------------------------------------------------------
//
//  identificarSaludPorId
//

function identificarSaludPorId(condicionDeSalud, condicionDeSaludOtra)
{
    var condicion;
    if(condicionDeSalud == "sinDisc")
    {
        condicion = "Sin discapacidad";
    }
    else if(condicionDeSalud == "disc1")
    {
        condicion = "Con discapacidad auditiva";
    }
    else if(condicionDeSalud == "disc2")
    {
        condicion = "Con discapacidad motriz usuaria de silla de ruedas";
    }
    else if(condicionDeSalud == "disc3")
    {
        condicion = "Con discapacidad motriz usuaria de muletas";
    }
    else if(condicionDeSalud == "disc4")
    {
        condicion = "Con discapacidad motriz usuaria de bastón";
    }
    else if(condicionDeSalud == "disc5")
    {
        condicion = "Con discapacidad visual";
    }
    else if(condicionDeSalud == "otra")
    {
        condicion = condicionDeSaludOtra;
    }

    return condicion;
}

//-----------------------------------------------------------------------------
//
//  cardModificarDatos
//

function cardModificarDatos()
{
    limpiarDatos();

    // Identidad
    var nroDeBoleta = $("#confNroDeBoleta").text();
    var nombres = $("#confNombres").text();
    var apellidoPaterno = $("#confApellidoPaterno").text();
    var apellidoMaterno = $("#confApellidoMaterno").text();
    var fechaDeNacimiento = $("#confFechaDeNacimiento").text();
    var genero = $("#confGenero").text();
    var CURP = $("#confCURP").text();

    // Contacto
    var calleYNumero = $("#confCalleYNumero").text();
    var colonia = $("#confColonia").text();
    var alcaldia = $("#confAlcaldia").text();
    var codigoPostal = $("#confCodigoPostal").text();
    var telefonoOCelular = $("#confTelefonoOCelular").text();

    // Procedencia
    var escuela = $("#confEscuela").text();
    var entidadFederativa = $("#confEntidadFederativa").text();
    var promedio = $("#confPromedio").text();
    var opcion = $("#confOpcion").text();

    // Salud
    var condicionDeSalud = $("#confOpcionSalud").text();

    // Sesion
    var correoElectronico = $("#confCorreoElectronico").text();
    var contrasenia = $("#confContrasenia").text();

    // Sutituir

    // Identidad
    console.log(nroDeBoleta);
    $("#perfilNroDeBoleta").val(nroDeBoleta);
    $("#perfilNombres").val(nombres);
    $("#perfilApellidoPaterno").val(apellidoPaterno);
    $("#perfilApellidoMaterno").val(apellidoMaterno);
    $("#perfilFechaDeNacimiento").addClass("input");
    $(".flatpickr-input").val(fechaDeNacimiento);
    if(genero == "Masculino")
        $("#generoMasculino").prop("checked", true);
    else if(genero = "Femenino")
        $("#generoFemenino").prop("checked", true);
    else
        $("#generoOtro").prop("checked", true);
    $("#perfilCURP").val(CURP);

    // Contacto
    $("#perfilCalleYNumero").val(calleYNumero);
    $("#perfilColonia").val(colonia);
    reescribeAlcaldia(alcaldia);
    $("#perfilCodigoPostal").val(codigoPostal);
    $("#perfilTelefonoOCelular").val(telefonoOCelular);

    // Procedencia
    reescribeEscuela(escuela);
    reescribeEntidadFederativa(entidadFederativa);
    $("#perfilPromedio").val(promedio);
    if(opcion == "Primera")
        $("#opcion1").prop("checked", true);
    else if(opcion == "Segunda")
        $("#opcion2").prop("checked", true);
    else
        $("#opcion3").prop("checked", true);

    // Salud
    reescribeCondicionDeSalud(condicionDeSalud);

    // Sesion
    $("#perfilCorreoElectronico").val(correoElectronico);
    $("#perfilContrasenia").val(contrasenia);



    $("#perfilConfirmar").removeClass("show active");
    $("#profile").addClass("show active");
}

//-----------------------------------------------------------------------------
//
//  reescribeAlcaldia
//

function reescribeAlcaldia(alcaldiaValor)
{
    var alcaldiaId;
    if(alcaldiaValor == "Sin especificar")
    {
        alcaldiaId = "sinAlc";
    }
    else if(alcaldiaValor == "Álvaro Obregón")
    {
        alcaldiaId = "a1"
    }
    else if(alcaldiaValor == "Azcapotzalco")
    {
        alcaldiaId = "a2"
    }
    else if(alcaldiaValor == "Benito Juárez")
    {
        alcaldiaId = "a3"
    }
    else if(alcaldiaValor == "Coyoacán")
    {
        alcaldiaId = "a4"
    }
    else if(alcaldiaValor == "Cuajimalpa de Morelos")
    {
        alcaldiaId = "a5"
    }
    else if(alcaldiaValor == "Cuauhtémoc")
    {
        alcaldiaId = "a6"
    }
    else if(alcaldiaValor == "Gustavo A. Madero")
    {
        alcaldiaId = "a7"
    }
    else if(alcaldiaValor == "Iztacalco")
    {
        alcaldiaId = "a8"
    }
    else if(alcaldiaValor == "Iztapalapa")
    {
        alcaldiaId = "a9"
    }
    else if(alcaldiaValor == "La Magdalena Contreras")
    {
        alcaldiaId = "a10"
    }
    else if(alcaldiaValor == "Miguel Hidalgo")
    {
        alcaldiaId = "a11"
    }
    else if(alcaldiaValor == "Milpa alta")
    {
        alcaldiaId = "a12"
    }
    else if(alcaldiaValor == "Tláhuac")
    {
        alcaldiaId = "a13"
    }
    else if(alcaldiaValor == "Tlalpan")
    {
        alcaldiaId = "a14"
    }
    else if(alcaldiaValor == "Venustiano Carranza")
    {
        alcaldiaId = "a15"
    }
    else if(alcaldiaValor == "Xochimilco")
    {
        alcaldiaId = "a16"
    }

    $("#alacaldia").val(alcaldiaId);
}

//-----------------------------------------------------------------------------
//
//  reescribeEscuela
//

function reescribeEscuela(escuelaValor)
{
    var escuelaId;
    if(escuelaValor == "CECyT 1 González Vázquez Vega")
        escuelaId = "cyt1";
    else if(escuelaValor == "CECyT 2 Miguel Bernard")
        escuelaId = "cyt2";
    else if(escuelaValor == "CECyT 3 Estanislao Ramírez Ruiz")
        escuelaId = "cyt3";
    else if(escuelaValor == "CECyT 4 Lázaro Cárdenas")
        escuelaId = "cyt4";
    else if(escuelaValor == "CECyT 5 Benito Juárez García")
        escuelaId = "cyt5";
    else if(escuelaValor == "CECyT 6 Miguel Othón de Mendizábal")
        escuelaId = "cyt6";
    else if(escuelaValor == "CECyT 7 Cuauhtémoc")
        escuelaId = "cyt7";
    else if(escuelaValor == "CECyT 8 Narciso Bassols García")
        escuelaId = "cyt8";
    else if(escuelaValor == "CECyT 9 Juan de Dios Bátiz")
        escuelaId = "cyt9";
    else if(escuelaValor == "CECyT 10 Carlos Vallejo Márquez")
        escuelaId = "cyt10";
    else if(escuelaValor == "CECyT 11 Wilfrido Massieu Pérez")
        escuelaId = "cyt11";
    else if(escuelaValor == "CECyT 12 José María Morelos y Pavón")
        escuelaId = "cyt12";
    else if(escuelaValor == "CECyT 13 Ricardo Flores Magón")
        escuelaId = "cyt13";
    else if(escuelaValor == "CECyT 14 Luis Enrique Erro")
        escuelaId = "cyt14";
    else if(escuelaValor == "CECyT 15 Diódoro Antúnez Echegaray")
        escuelaId = "cyt15";
    else if(escuelaValor == "CECyT 16")
        escuelaId = "cyt16";
    else if(escuelaValor == "CECyT 17")
        escuelaId = "cyt17";
    else if(escuelaValor == "CECyT 18")
        escuelaId = "cyt18";
    else if(escuelaValor == "CECyT 19 Leona Vicario")
        escuelaId = "cyt19";
    else if(escuelaValor == "CET 1 Walter Cross Buchanan")
        escuelaId = "cet1";
    else
    {
        escuelaId = "otra"
        $("#colEscuelaOtra").show();
        $("#perfilEscuelaOtra").val(escuelaValor);
    }

    if(escuelaId != "otra")
        $("#colEscuelaOtra").hide();
    $("#escuela").val(escuelaId);
}

//-----------------------------------------------------------------------------
//
//  reescribeEntidadFederativa
//

function reescribeEntidadFederativa(entidadValor)
{
    var entidadId;
    if(entidadValor == "Sin especificar")
        entidadId = "sinEnt";
    else if(entidadValor == "Aguascalientes")
        entidadId = "ent1";
    else if(entidadValor == "Baja California")
        entidadId = "ent2";
    else if(entidadValor == "Baja California Sur")
        entidadId = "ent3";
    else if(entidadValor == "Campeche")
        entidadId = "ent4";
    else if(entidadValor == "Chiapas")
        entidadId = "ent5";
    else if(entidadValor == "Chihuahua")
        entidadId = "ent6";
    else if(entidadValor == "Ciudad de México")
        entidadId = "ent7";
    else if(entidadValor == "Coahuila de Zaragoza")
        entidadId = "ent8";
    else if(entidadValor == "Colima")
        entidadId = "ent9";
    else if(entidadValor == "Durango")
        entidadId = "ent10";
    else if(entidadValor == "Guanajuato")
        entidadId = "ent11";
    else if(entidadValor == "Guerrero")
        entidadId = "ent12";
    else if(entidadValor == "Hidalgo")
        entidadId = "ent13";
    else if(entidadValor == "Jalisco")
        entidadId = "ent14";
    else if(entidadValor == "Estado de México")
        entidadId = "ent15";
    else if(entidadValor == "Michoacán de Ocampo")
        entidadId = "ent16";
    else if(entidadValor == "Morelos")
        entidadId = "ent17";
    else if(entidadValor == "Nayarit")
        entidadId = "ent18";
    else if(entidadValor == "Nuevo León")
        entidadId = "ent19";
    else if(entidadValor == "Oaxaca")
        entidadId = "ent20";
    else if(entidadValor == "Puebla")
        entidadId = "ent21";
    else if(entidadValor == "Querétaro")
        entidadId = "ent22";
    else if(entidadValor == "Quintana Roo")
        entidadId = "ent23";
    else if(entidadValor == "San Luis Potosí")
        entidadId = "ent24";
    else if(entidadValor == "Sinaloa")
        entidadId = "ent25";
    else if(entidadValor == "Sonora")
        entidadId = "ent26";
    else if(entidadValor == "Tabasco")
        entidadId = "ent27";
    else if(entidadValor == "Tamaulipas")
        entidadId = "ent28";
    else if(entidadValor == "Tlaxcala")
        entidadId = "ent29";
    else if(entidadValor == "Veracruz de Ignacio de la Llave")
        entidadId = "ent30";
    else if(entidadValor == "Yucatán")
        entidadId = "ent31";
    else if(entidadValor == "Zacatecas")
        entidadId = "ent32";

    $("#entidadFederativa").val(entidadId);
}

//-----------------------------------------------------------------------------
//
//  reescribeCondicionDeSalud
//

function reescribeCondicionDeSalud(condicionDeSalud)
{
    var condicion;
    if(condicionDeSalud == "Sin discapacidad")
    {
        condicion = "sinDisc";
    }
    else if(condicionDeSalud == "Con discapacidad auditiva")
    {
        condicion = "disc1";
    }
    else if(condicionDeSalud == "Con discapacidad motriz usuaria de silla de ruedas")
    {
        condicion = "disc2";
    }
    else if(condicionDeSalud == "Con discapacidad motriz usuaria de muletas")
    {
        condicion = "disc3";
    }
    else if(condicionDeSalud == "Con discapacidad motriz usuaria de bastón")
    {
        condicion = "disc4";
    }
    else if(condicionDeSalud == "Con discapacidad visual")
    {
        condicion = "disc5";
    }
    else if(condicionDeSalud)
    {
        condicion = "otra";
        $("#colCondicionDeSaludOtra").show();
        $("#perfilCondicionDeSaludOtra").val(condicionDeSalud);
    }

    if(condicion != "otra")
        $("#colCondicionDeSaludOtra").hide();
    $("#condicionDeSalud").val(condicion);
}

//-----------------------------------------------------------------------------
//
//  guardardDatos
//

function guardarDatos()
{
    // Aqui se debe ejecutar el algoritmo para guardar los datos en la base de datos
    
    // Identidad
    let lnroDeBoleta = $("#confNroDeBoleta").text();
    let lNombres = $("#confNombres").text();
    let lApellidoPaterno = $("#confApellidoPaterno").text();
    let lApellidoMaterno = $("#confApellidoMaterno").text();
    let lFechaDeNacimiento = $("#confFechaDeNacimiento").text();
    let lGenero = $("#confGenero").text();
    let lCURP = $("#confCURP").text();
    
    // Contacto
    let lCalleYNumero = $("#confCalleYNumero").text();
    let lColonia = $("#confColonia").text();
    let lAlcaldia = $("#confAlcaldia").text();
    let lCodigoPostal = $("#confCodigoPostal").text();
    let lTelefonoOCelular = $("#confTelefonoOCelular").text();
    
    // Procedencia
    let lEscuela = $("#confEscuela").text();
    let lEntidadFederativa = $("#confEntidadFederativa").text();
    let lPromedio = $("#confPromedio").text();
    let lOpcion = $("#confOpcion").text();
    
    // Salud
    let lCondicionDeSalud = $("#confOpcionSalud").text();
    
    // Sesion
    let lCorreoElectronico = $("#confCorreoElectronico").text();
    let lContrasenia = $("#confContrasenia").text();

    $.ajax({
        url: "/ESCOM_NS_ISC_S4_TDAW/registroDeDatosGeneralesParaAlumnosDeNuevoIngreso/src/assets/php/scripts/guardarDatos.php",
        method: "POST",
        cache: false,
        data: {
            // usuario
            correoElectronico: lCorreoElectronico,
            clave: lContrasenia,
            tipo: "alumno",

            // alumno
            // identidad
            nroBoleta: lnroDeBoleta,
            nombres: lNombres,
            apellidoPaterno: lApellidoPaterno,
            apellidoMaterno: lApellidoMaterno,
            fechaDeNacimiento: lFechaDeNacimiento,
            genero: lGenero,
            CURP: lCURP,
            // contacto
            //correoElectronico:,
            calleNro: lCalleYNumero,
            colonia: lColonia,
            alcaldia: lAlcaldia,
            CP: lCodigoPostal,
            nroTelefonoCelular: lTelefonoOCelular,
            // procedencia
            escuela: lEscuela,
            entidadFederativa: lEntidadFederativa,
            promedio: lPromedio,
            nroOpciones: lOpcion,
            // salud
            condicionSalud: lCondicionDeSalud
        },
        success: evaluarRespuestaPHP
    });
}

//-----------------------------------------------------------------------------
//
//  evaluarRespuestaPHP
//

function evaluarRespuestaPHP(respAx)
{
    if(respAx == "Error: boleta")
    {
        alert("Parece que tu nro. de boleta ya esta registrado. Por favor, comprueba ese dato.");
    }
    else if(respAx == "Error: correo")
    {
        alert("Parece que tu correo ya esta registrado. Por favor, usa otro.");
    }
    else if(!isNaN(respAx))
    {
        alert("Se mandará el siguiente ID a PHP para asignarle un grupo: " + respAx)

        asignarGrupo(respAx);
    }
    else
    {
        alert("Lo sentimos. Ocurrio un error inesperado.")
    }
}

//-----------------------------------------------------------------------------
//
//  asignarGrupo
//

function asignarGrupo(lId)
{
    $.ajax({
        url: "/ESCOM_NS_ISC_S4_TDAW/registroDeDatosGeneralesParaAlumnosDeNuevoIngreso/src/assets/php/scripts/asignarGrupo.php",
        method: "POST",
        cache: false,
        data: {id: lId},
        success: (respAx)=>{
            if(respAx == "Exito")
            {
                alert("Asignado correctamente.");
                iniciarSesion(lId)
            }
            else
            {
                alert("Lo sentimos. Ocurrio un error inesperado.");
            }
        }
    });
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
                alert("Lo sentimos. Ocurrio un error inesperado.");
        }
    });
}
