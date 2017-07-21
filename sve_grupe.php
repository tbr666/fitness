<?php
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    $response = array();
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

    $response["grupe"] = array();
    $grupaZapis              = array();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT nazivProgram, sifGrupa FROM grupa JOIN program ON program.sifProgram = grupa.sifProgram ORDER BY nazivProgram, sifGrupa");
    $stmt->execute();
    $stmt->bind_result($program, $grupa);
    while ($stmt->fetch()) {
        $grupaZapis["program"] = $program;
        $grupaZapis["grupa"]     = $grupa;
        array_push($response["grupe"], $grupaZapis);
    }
    $stmt->close();
    $mysqli->close();
    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>