<?php
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    $response = array();
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("UPDATE zaposlenik SET imeZap=?, prezimeZap=?, datRodZap=?, adresaZap=?, nazivMjestoZap=?, brTelZap=?, emailZap=?, pravoID=?, napomena=?  WHERE sifZap=? ");
    $stmt->bind_param("sssssssisi", $_GET["ime"], $_GET["prezime"], $_GET["datum"], $_GET["adresa"], $_GET["mjesto"], $_GET["brTel"], $_GET["email"], $_GET["pravoID"], $_GET["napomena"], $_GET['sifra']);
    $stmt->execute();
    $stmt->close();
  
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("DELETE FROM zaposlenik_grupa  WHERE sifZap=?");
    $stmt->bind_param("i", $_GET['sifra']);
    $stmt->execute();
    $stmt->close();

    $grupe  = explode(',' , $_GET['grupe'] );
    reset($grupe);
   
    foreach ($grupe as $grupa) {
   
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("INSERT INTO zaposlenik_grupa  VALUES(?,?)");
    $stmt->bind_param("is", $_GET['sifra'],$grupa);
    $stmt->execute();
    $stmt->close();


    }

    $mysqli->close();
    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>