<?php
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    $response = array();
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT sifVP,nazivProgram, brDolazaka, cijena FROM vp JOIN program ON vp.sifProgram = program.sifProgram ORDER BY vp.sifVP, program.sifProgram");
    $stmt->execute();
    $stmt->bind_result($sifVP,$program, $dolazaka, $cijena );
    while ($stmt->fetch()) {
         echo '<option value="'.$sifVP.'">'.$program.'('.$dolazaka.') '.$cijena.' kn';
    }
    $stmt->close();
    $mysqli->close();
?>