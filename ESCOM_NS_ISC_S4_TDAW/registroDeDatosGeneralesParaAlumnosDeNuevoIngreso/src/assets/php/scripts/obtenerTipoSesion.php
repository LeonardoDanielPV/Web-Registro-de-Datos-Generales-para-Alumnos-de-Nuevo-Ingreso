<?php
    //-------------------------------------------------------------------------
    //
    //  Sesión
    //
    
    session_start();

    if (!isset($_SESSION["id"]))
    {
        echo "No sesion";
        exit();
    }

    //-------------------------------------------------------------------------
    //
    //  Conexion
    //

    $conexion = mysqli_connect("localhost", "root", "", "datos_generales_alumnos_n_i");

    //-------------------------------------------------------------------------
    //
    //  Buscar y obtener
    //

    $id = $_SESSION["id"];
    $consulta = "SELECT tipo FROM usuario
                    WHERE id = $id";
    $resultado = mysqli_query($conexion, $consulta);

    $nroFilas = mysqli_num_rows($resultado);
    if ($nroFilas != 1)
    {
        echo "Error: id borrado";
        exit();
    }

    $fila = mysqli_fetch_array($resultado);
    $tipo = $fila[0];

    mysqli_close($conexion);
    echo $tipo;
?>