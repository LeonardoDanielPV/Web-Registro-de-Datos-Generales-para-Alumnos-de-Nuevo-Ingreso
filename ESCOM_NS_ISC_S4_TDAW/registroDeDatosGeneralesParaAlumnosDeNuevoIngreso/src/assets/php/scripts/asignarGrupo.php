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

    $id = $_POST["id"];

    //-------------------------------------------------------------------------
    //
    //  Algoritmo
    //

    $alumnosRegistradosPorSemestre = 300;
    $maxNroLaboratorios = 6;
    $maxCapacidadLab = 30;
    
    $minutosExamen = 90;
    $minutosEntreExamen = 15;  // Dentro del horario de trabajo, maximo 780 - ($minutosExamen - 90)

    $diaInicio = "2024-01-16";
    $horaInicio = "07:00:00";
    $horaFinal = "21:30:00";

    $consulta = "SELECT * FROM grupo
                    ORDER BY horario_inicio_examen_diagnostico ASC";
    $grupo = mysqli_query($conexion, $consulta);
    $n = mysqli_num_rows($grupo);   // tuplas en grupo

    // Ver si hay algun grupo disponible en orden ascendente
    $encontrado = false;
    $idGrupo = -1;
    $horarioMayor = DateTime::createFromFormat("Y-m-d H:i:s", "$diaInicio $horaInicio");
    date_modify($horarioMayor, "-$minutosEntreExamen minutes");
    $labMayor = $maxNroLaboratorios;
    for ($i = 0; $i < $n and !$encontrado; $i++)
    {
        $fila = mysqli_fetch_array($grupo);
        $idGrupo = $fila[0];
        $horarioMayor = DateTime::createFromFormat("Y-m-d H:i:s", $fila[3]);
        $horarioMayorInicio = DateTime::createFromFormat("Y-m-d H:i:s", $fila[2]);
        $labMayor = intval($fila[4]);

        $consulta = "SELECT COUNT(*) FROM asignacion WHERE grupo_id = $idGrupo";
        $resultado = mysqli_query($conexion, $consulta);
        $fila = mysqli_fetch_array($resultado);
        if ($fila[0] < $maxCapacidadLab)
            $encontrado = true;
    }

    // Si no hay grupo disponible, entonces crear otro grupo.
    // Si se llenaron todos los laboratorios en un horario, entonces
    // crear otro grupo con un horario con base al anterior más alto.
    // Si no se llanron todos los laboratorios en un horario, entonces
    // crear otro grupo con un horario igual al anterior más alto.
    if (!$encontrado)
    {
        //-------------------------------------------------
        //  Calcular el laboratorio
        $labMayor++;
        if ($labMayor > $maxNroLaboratorios)
            $labMayor = 1;
        //-------------------------------------------------

        // Si se llenaron todos los laboratorios en un horario
        if ($labMayor == 1)
        {
            // Calcular el nuevo horario con base al anterior más alto
            $horarioInicioExamen = clone $horarioMayor;
            date_modify($horarioInicioExamen, "+$minutosEntreExamen minutes");
            // Calcular el horario final para el horario inicial, no cuentan los 15 mintos.
            $horarioFinExamen = clone $horarioInicioExamen;
            date_modify($horarioFinExamen, "+$minutosExamen minutes");

            // Si la hora final del horario final sobrepasa el limite,
            // entonces crear el horario en otro día
            $diaHorarioInicioExamen = $horarioInicioExamen->format("Y-m-d");
            if ($horarioFinExamen > DateTime::createFromFormat("Y-m-d H:i:s", "$diaHorarioInicioExamen $horaFinal"))
            {
                $horarioInicioExamen = DateTime::createFromFormat("Y-m-d H:i:s", "$diaHorarioInicioExamen $horaInicio");
                date_modify($horarioInicioExamen, "+1 day");
                $horarioFinExamen = clone $horarioInicioExamen;
                date_modify($horarioFinExamen, "+$minutosExamen minutes");
            }
        }
        else
        {
            $horarioInicioExamen = clone $horarioMayorInicio;
            $horarioFinExamen = clone $horarioMayor;
        }
        
        // Crear el nuevo grupo
        $hInicioExamenString = $horarioInicioExamen->format("Y-m-d H:i:s");
        $hFinExamenString = $horarioFinExamen->format("Y-m-d H:i:s");
        $consulta = "INSERT INTO grupo(horario_inicio_examen_diagnostico, horario_fin_examen_diagnostico, laboratorio)
                        VALUES(\"$hInicioExamenString\", \"$hFinExamenString\", $labMayor)";
        $resultado = mysqli_query($conexion, $consulta);
        $idGrupo = mysqli_insert_id($conexion);
        // Poner nombre al grupo
        $consulta = "UPDATE grupo SET nombre = \"Grupo $idGrupo\" WHERE id = $idGrupo";
        $resultado = mysqli_query($conexion, $consulta);
    }

    // Asignar grupo
    $consulta = "INSERT INTO asignacion
                    VALUES($id, $idGrupo)";
    $resultado = mysqli_query($conexion, $consulta);

    mysqli_close($conexion);
    echo "Exito";
?>