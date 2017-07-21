<?php
    
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("INSERT INTO clan (imeClan, prezimeClan, datRodClan, adresaClan, nazivMjestoClan, brTelClan, emailClan, zanimanjeClan, datClanOd, sifReferenca, zdravstveniProblem, napomena, tokenSjednica) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)");
    $stmt->bind_param("sssssssssisss", $_GET['ime'], $_GET['prezime'], $_GET['datum'] , $_GET['adresa'], $_GET['mjesto'], $_GET['brTel'], $_GET['email'], $_GET['zanimanje'], $_GET['clanOd'], $_GET['referenca'], $_GET['zdravstveniProblem'], $_GET['napomena'], $_SESSION['tokenSjednica'] );
    $stmt->execute();
    $stmt->close();

    $vpovi  = explode('**' , $_GET['vpovi'] );
    reset($vpovi);
   
    foreach ($vpovi as $vp) {
   
    $varijanta_grupa = explode('*' , $vp );
    $varijanta = $varijanta_grupa[0];
    $grupa = $varijanta_grupa[1];
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("INSERT INTO clan_vp  VALUES(?,?,?)");
    $stmt->bind_param("iis", $_GET['sifra'], $varijanta, $grupa);
    $stmt->execute();
    $stmt->close();


    }
    
    $mysqli->close();
    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>