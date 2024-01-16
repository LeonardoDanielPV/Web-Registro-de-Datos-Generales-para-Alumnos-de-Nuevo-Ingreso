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

    $correoElectronico = $_POST["correoElectronico"];
    $clave = $_POST["clave"];

    //-------------------------------------------------------------------------
    //
    //  Buscar y validar
    //

    $consulta = "SELECT * FROM usuario
                    WHERE correo_electronico = \"$correoElectronico\"";
    $resultado = mysqli_query($conexion, $consulta);

    $nroFilas = mysqli_num_rows($resultado);
    if ($nroFilas != 1)
    {
        echo "Error: correo";
        exit();
    }

    $fila = mysqli_fetch_array($resultado);
    if ($fila[2] != $clave)
    {
        echo "Error: clave";
        exit();
    }

    $id = $fila[0];

    mysqli_close($conexion);
    echo $id;
?>