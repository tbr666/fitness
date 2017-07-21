<?php
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    $response = array();
    $response['grupe'] = array();
    $grupa = array();
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT imeClan, prezimeClan, datRodClan, adresaClan, nazivMjestoClan, zanimanjeClan,datClanOd, brTelClan, emailClan, sifReferenca, zdravstveniProblem, napomena  FROM clan  WHERE sifClan=?");
    $stmt->bind_param("i", $_GET["sifra"]);
    $stmt->execute();
    $stmt->bind_result( $ime, $prezime, $datum, $adresa, $mjesto, $zanimanje, $clanOd, $brTel, $email, $referenca, $zdravstveniProblem, $napomena);
    $stmt->fetch();
    $stmt->close();

    $response["ime"]     = $ime;
    $response["prezime"]     = $prezime;
    $response["datum"]     = $datum;
    $response["adresa"]     = $adresa;
    $response["mjesto"]     = $mjesto;
    $response["zanimanje"]     = $zanimanje;
    $response["clanOd"]     = $clanOd;
    $response["brTel"]     = $brTel;
    $response["email"]     = $email;
    $response["referenca"]     = $referenca;
    $response["zdravstveniProblem"]     = $zdravstveniProblem;
    $response["napomena"]  = $napomena;

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT  sifVP, sifGrupa FROM clan_vp WHERE sifClan = ?;");
    $stmt->bind_param("i", $_GET["sifra"]);
    $stmt->execute();
    $stmt->bind_result($sifVP , $sifGrupa);
    while ($stmt->fetch()) {
        $grupa["sifVP"]     = $sifVP;
        $grupa["sifGrupa"]   = $sifGrupa;
        array_push($response["grupe"], $grupa);
    }
    $stmt->close();

    $mysqli->close();
    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>