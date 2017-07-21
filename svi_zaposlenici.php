<?php
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    $response = array();
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

    $response["zaposlenici"] = array();
    $zaposlenik              = array();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT sifZap, imeZap, prezimeZap, brTelZap, emailZap, napomena FROM zaposlenik WHERE pravoID>0");
    $stmt->execute();
    $stmt->bind_result($sifra, $ime, $prezime, $brTel, $email, $napomena);
    while ($stmt->fetch()) {
        $zaposlenik["sifra"] = $sifra;
        $zaposlenik["ime"]     = ucfirst(utf8_encode($ime));
        $zaposlenik["prezime"]   = ucfirst(utf8_encode($prezime));
        $zaposlenik["brTel"] = $brTel;
        $zaposlenik["email"] = $email;
        $zaposlenik["napomena"] = $napomena;
        array_push($response["zaposlenici"], $zaposlenik);
    }
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT MAX(sifZap) AS autoInc FROM zaposlenik");
    $stmt->execute();
    $stmt->bind_result($autoInc);
    $stmt->fetch();
    $stmt->close();

    $response["autoInc"] = $autoInc + 1;

    $mysqli->close();
    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>