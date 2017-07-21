<?php
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    $response = array();
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("DELETE FROM clan WHERE sifClan=? ");
    $stmt->bind_param("i", $_GET['sifra']);
    $stmt->execute();
    $stmt->close();

    $mysqli->close();
    $response["success"] = 1;

    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>