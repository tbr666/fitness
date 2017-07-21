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
    $stmt->prepare("SELECT clan.sifClan, imeClan, prezimeClan, adresaClan, nazivMjestoClan, zanimanjeClan, datClanOd, brTelClan, emailClan, nazivRef, zdravstveniProblem, napomena, datUplataDo FROM clan JOIN referenca ON clan.sifReferenca = referenca.sifRef LEFT JOIN najkasnijiIstekClan ON clan.sifClan = najkasnijiIstekClan.sifClan;");
    $stmt->execute();
    $stmt->bind_result($sifra, $ime, $prezime, $adresa, $mjesto, $zanimanje, $clanOd, $brTel, $email, $referenca, $zdravstveniProblem, $napomena, $datum );
    while ($stmt->fetch()) {
        $clan["sifra"]     = $sifra;
        $clan["ime"]     = $ime;
        $clan["prezime"]   = $prezime;
        $clan["adresa"]   = $adresa;
        $clan["mjesto"]   = $mjesto;
        $clan["zanimanje"]   = $zanimanje;
        $clan["brTel"]   = $brTel;
        $clan["email"]   = $email;
        $clan["referenca"]   = $referenca;
        $clan["zdravstveniProblem"]   = $zdravstveniProblem;
        $clan["napomena"]   = $napomena;
        if($datum != null) {
        $datumVrijeme = strtotime($datum);
        $diff = floor((time()-$datumVrijeme )/86400);
        }
        if($datum == null) $clan["aktivan"] = 'ne';
        else if($diff<=14) $clan["aktivan"] = 'da';
        else $clan["aktivan"] = 'ne';
        array_push($response["clanovi"], $clan);
    }

    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT MAX(sifClan) AS sifra FROM clan");
    $stmt->execute();
    $stmt->bind_result($autoInc);
    $stmt->fetch();
    $stmt->close();

    $response["autoInc"] = $autoInc + 1;

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT sifGrupa FROM grupa ORDER BY sifProgram,sifGrupa;");
    $stmt->execute();
    $stmt->bind_result($grupa);
    while ($stmt->fetch()) {
        array_push($response["grupe"], $grupa);
    }
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT sifVP, nazivProgram ,brDolazaka FROM vp JOIN program ON vp.sifProgram = program.sifProgram;");
    $stmt->execute();
    $stmt->bind_result($sifVP, $nazivProgram, $brDolazaka);
    while ($stmt->fetch()) {
        $vp["sifVP"] = $sifVP;
        $vp["nazivProgram"] = $nazivProgram;
        $vp["brDolazaka"] = $brDolazaka;
        array_push($response["vpovi"], $vp);
    }
    $stmt->close();

    $mysqli->close();

    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>