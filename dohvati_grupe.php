<?php
   session_start();
    include 'provjeri_sjedicu.php';
    require_once __DIR__ . '/db_config.php';
    $response = array();
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT sifGrupa FROM grupa JOIN program ON grupa.sifProgram=program.sifProgram ORDER BY program.nazivProgram, sifGrupa");
    $stmt->execute();
    $stmt->bind_result($grupa);
    while ($stmt->fetch()) {
         echo '<option value="'.$grupa.'">'.$grupa;
    }
    $stmt->close();
    $mysqli->close();    
?>