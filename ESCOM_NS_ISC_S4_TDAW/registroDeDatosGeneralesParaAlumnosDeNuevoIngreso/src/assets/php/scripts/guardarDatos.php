<?php
    //-------------------------------------------------------------------------
    //
    //  Conexion
    //

    $conexion = mysqli_connect("localhost", "root", "", "datos_generales_alumnos_n_i");

    //-------------------------------------------------------------------------
    //
    //  Datos
    //

    // usuario
    $correoElectronico = $_POST["correoElectronico"];
    $clave = $_POST["clave"];
    $tipo = $_POST["tipo"];

    // alumno
    // identidad
    $nroBoleta = $_POST["nroBoleta"];
    $nombres = $_POST["nombres"];
    $apellidoPaterno = $_POST["apellidoPaterno"];
    $apellidoMaterno = $_POST["apellidoMaterno"];
    $fechaDeNacimiento = $_POST["fechaDeNacimiento"];
    $genero = $_POST["genero"];
    $CURP = $_POST["CURP"];
    // contacto
    //$correoElectronico = ;
    $calleNro = $_POST["calleNro"];
    $colonia = $_POST["colonia"];
    $alcaldia = $_POST["alcaldia"];
    $CP = $_POST["CP"];
    $nroTelefonoCelular = $_POST["nroTelefonoCelular"];
    // procedencia
    $escuela = $_POST["escuela"];
    $entidadFederativa = $_POST["entidadFederativa"];
    $promedio = $_POST["promedio"];
    $nroOpciones = $_POST["nroOpciones"];
    // salud
    $condicionSalud = $_POST["condicionSalud"];

    //-------------------------------------------------------------------------
    //
    //  Validacion de datos unicos
    //

    $consulta = "SELECT id FROM identidad WHERE nro_boleta = \"$nroBoleta\"";
    $resultado = mysqli_query($conexion, $consulta);
    $nroFilas = mysqli_num_rows($resultado);
    if ($nroFilas != 0) {
        echo "Error: boleta";
        exit();
    }

    $consulta = "SELECT id FROM usuario WHERE correo_electronico = \"$correoElectronico\"";
    $resultado = mysqli_query($conexion, $consulta);
    $nroFilas = mysqli_num_rows($resultado);
    if ($nroFilas != 0) {
        echo "Error: correo";
        exit();
    }

    $consulta = "SELECT id FROM contacto WHERE correo_electronico = \"$correoElectronico\"";
    $resultado = mysqli_query($conexion, $consulta);
    $nroFilas = mysqli_num_rows($resultado);
    if ($nroFilas != 0) {
        echo "Error: correo";
        exit();
    }

    //-------------------------------------------------------------------------
    //
    //  Enviar los datos al servidor
    //

    // usuario
    $consulta = "INSERT INTO usuario(correo_electronico, clave, tipo)
                    VALUES(\"$correoElectronico\", \"$clave\", \"$tipo\")";
    $resultado = mysqli_query($conexion, $consulta);
    // Identificador
    $consulta = "SELECT id FROM usuario WHERE correo_electronico = \"$correoElectronico\"";
    $resultado = mysqli_query($conexion, $consulta);
    $fila = mysqli_fetch_array($resultado);
    $id = $fila[0];

    // alumno
    // identidad
    $consulta = "INSERT INTO identidad
                    VALUES(\"$id\", \"$nroBoleta\", \"$nombres\", \"$apellidoPaterno\",
                           \"$apellidoMaterno\", \"$fechaDeNacimiento\", \"$genero\", \"$CURP\")";
    $resultado = mysqli_query($conexion, $consulta);
    // contacto
    $consulta = "INSERT INTO contacto
                    VALUES(\"$id\", \"$correoElectronico\", \"$calleNro\", \"$colonia\",
                           \"$alcaldia\", \"$CP\", \"$nroTelefonoCelular\")";
    $resultado = mysqli_query($conexion, $consulta);
    // procedencia
    $consulta = "INSERT INTO procedencia
                    VALUES(\"$id\", \"$escuela\", \"$entidadFederativa\", \"$promedio\",
                           \"$nroOpciones\")";
    $resultado = mysqli_query($conexion, $consulta);
    // salud
    $consulta = "INSERT INTO salud
                    VALUES(\"$id\", \"$condicionSalud\")";
    $resultado = mysqli_query($conexion, $consulta);

    mysqli_close($conexion);
    echo "$id";
?>