<?php

    //-------------------------------------------------------------------------
    //
    //  Sesión
    //
    
    session_start();

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

    if($tipo == "administrador")
    {
        $datos = "";

        $consulta = "SELECT id, nombre FROM grupo";
        $grupos = mysqli_query($conexion, $consulta);
        $n = mysqli_num_rows($grupos);
        for($i = 0; $i < $n; $i++)
        {
            $grupo = mysqli_fetch_array($grupos);
            $nombre = $grupo[1];
            
            $idActual = $grupo[0];
            $consulta = "SELECT COUNT(*) FROM asignacion WHERE grupo_id = $idActual";
            $resultado = mysqli_query($conexion, $consulta);
            $fila = mysqli_fetch_array($resultado);
            $cantidadAlumnos = $fila[0];

            $datos = $datos . $nombre . "," . $cantidadAlumnos;
            if($i + 1 < $n)
                $datos += ",";
        }
    }
    else if($tipo == "alumno")
    {
        $consulta = "SELECT grupo_id FROM asignacion WHERE id = $id";
        $resultado = mysqli_query($conexion, $consulta);
        $fila = mysqli_fetch_array($resultado);
        $idGrupo = $fila[0];

        $consulta = "SELECT nombre FROM grupo";
        $resultado = mysqli_query($conexion, $consulta);
        $grupo = mysqli_fetch_array($resultado);
        $nombre = $grupo[0];
            
        $consulta = "SELECT COUNT(*) FROM asignacion WHERE grupo_id = $idGrupo";
        $resultado = mysqli_query($conexion, $consulta);
        $fila = mysqli_fetch_array($resultado);
        $cantidadAlumnos = $fila[0];

        $datos = $nombre . "," . $cantidadAlumnos;
    }
    else
    {
        $datos = "0, 0";
    }

    mysqli_close($conexion);
    echo $datos;
?>