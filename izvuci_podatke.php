<?php
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    $response = array();
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT imeZap, prezimeZap, datRodZap, adresaZap, nazivMjestoZap, brTelZap, emailZap, userName, pravoID, napomena  FROM zaposlenik  WHERE sifZap=?");
    $stmt->bind_param("i", $_GET["sifra"]);
    $stmt->execute();
    $stmt->bind_result( $ime, $prezime, $datRod, $adresa, $nazivMjesto, $brTel, $email, $userName, $pravoID, $napomena);
    $stmt->fetch();
    $stmt->close();
    $response["ime"]     = $ime;
    $response["prezime"]     = $prezime;
    $response["datum"]     = $datRod;
    $response["adresa"]     = $adresa;
    $response["mjesto"]     = $nazivMjesto;
    $response["brTel"]     = $brTel;
    $response["email"]     = $email;
    $response["pravo"]     = $pravoID;
    $response["napomena"]  = $napomena;
    $response["userName"]   = $userName;
    $grupe = "";
    
     $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT sifGrupa  FROM zaposlenik_grupa WHERE sifZap=? ORDER BY sifGrupa");
    $stmt->bind_param("i", $_GET["sifra"]);
    $stmt->execute();
    $stmt->bind_result($sifGrupa);
    while ($stmt->fetch()) {
        $grupe .= $sifGrupa.',';
    }
    $stmt->close();

    $duljina = strlen($grupe);
    if($duljina > 0) $grupe = substr($grupe,0,$duljina-1);
    $response["grupe"]   = $grupe;

    $mysqli->close();
    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>