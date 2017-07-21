<?php
   
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

    $response["clanovi"] = array();
    $clan             = array();
    $response["vpovi"] = array();
    $vp = array();
    $response["grupe"] = array();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT clan.sifClan, imeClan, prezimeClan, adresaClan, nazivMjestoClan, datUplataDo FROM clan LEFT JOIN najkasnijiIstekClan ON clan.sifClan = najkasnijiIstekClan.sifClan;");
    $stmt->execute();
    $stmt->bind_result($sifra, $ime, $prezime, $adresa, $mjesto, $datum);
    while ($stmt->fetch()) {
        $clan["sifra"]     = $sifra;
        $clan["ime"]     = $ime;
        $clan["prezime"]   = $prezime;
        $clan["adresa"]   = $adresa;
        $clan["mjesto"]   = $mjesto;
        if($datum != null) {
        $datumVrijeme = strtotime($datum);
        $diff = floor((time()-$datumVrijeme )/86400);
        }
        if($datum == null) $clan["aktivan"] = 'ne';
        else if($diff<=14) $clan["aktivan"] = 'da';
        array_push($response["clanovi"], $clan);
    }
    $stmt->close();

    $mysqli->close();
    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>