<?php
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

    $response["clanovi"] = array();
    $clan              = array();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT imeClan, prezimeClan, brTelClan, emailClan FROM clan JOIN najkasnijiIstek ON clan.sifClan = najkasnijiIstek.sifClan WHERE DATEDIFF(Datum(?,?,?), datumNajkasnijiIstek) <=14 ORDER BY prezimeClan,imeClan LIMIT 100 OFFSET ?;");
    $stmt->bind_param("iiii", $_GET['dan'], $_GET['mjesec'], $_GET['godina'], $_GET['broj']);
    $stmt->execute();
    $stmt->bind_result($ime, $prezime, $brTel, $email);
    while ($stmt->fetch()) {
        $clan["ime"]     = $ime;
        $clan["prezime"]   = $prezime;
        $clan["brTel"] = $brTel;
        $clan["email"] = $email;

        array_push($response["clanovi"], $clan);
    }
    $stmt->close();
    $mysqli->close();
    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>