<?php
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    $response = array();
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

    $response["clanovi"] = array();
    $clan              = array();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT emailClan FROM clan WHERE datClanOd >= Datum(?,?,?) ORDER BY emailClan LIMIT 100 OFFSET ?;");
    $stmt->bind_param("iiii", $_GET['dan'], $_GET['mjesec'], $_GET['godina'], $_GET['broj']);
    $stmt->execute();
    $stmt->bind_result($email);
    while ($stmt->fetch()) {
       
        $clan["email"] = $email;

        array_push($response["clanovi"], $clan);
    }
    $stmt->close();
    $mysqli->close();
    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>