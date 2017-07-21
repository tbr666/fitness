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
    $stmt->prepare("SELECT imeClan, prezimeClan, brTelClan, emailClan FROM clan WHERE DAY(CURDATE()) = DAY(datRodClan) AND MONTH(CURDATE()) = MONTH(datRodClan) ORDER BY prezimeClan,imeClan");
    $stmt->execute();
    $stmt->bind_result($ime, $prezime, $brTel, $email);
    while ($stmt->fetch()) {
        $clan["ime"]     = ucfirst(utf8_encode($ime));
        $clan["prezime"]   = ucfirst(utf8_encode($prezime));
        $clan["brTel"] = $brTel;
        $clan["email"] = $email;
        array_push($response["clanovi"], $clan);
    }
    $stmt->close();
    $mysqli->close();
    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>