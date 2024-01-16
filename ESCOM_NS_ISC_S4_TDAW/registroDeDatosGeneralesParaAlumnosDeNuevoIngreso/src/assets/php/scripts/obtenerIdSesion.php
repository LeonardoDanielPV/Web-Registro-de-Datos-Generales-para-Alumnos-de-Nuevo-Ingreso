<?php
    session_start();

    if (!isset($_SESSION["id"]))
    {
        echo "No sesion";
        exit();
    }

    echo $_SESSION["id"];
?>