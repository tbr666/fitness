<?php
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    $response = array();
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
    
    $lozinka = hash('sha512', $_GET['lozinka']);
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT COUNT(*) FROM zaposlenik WHERE userName LIKE ?;");
    $stmt->bind_param("s",$_GET["userName"]);
    $stmt->execute();
    $stmt->bind_result($numberUsername);
    $stmt->fetch();
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT COUNT(*) FROM zaposlenik WHERE emailZap LIKE ?;");
    $stmt->bind_param("s",$_GET["email"]);
    $stmt->execute();
    $stmt->bind_result($numberEmail);
    $stmt->fetch();
    $stmt->close();

    if( $numberUsername>0 ) {
   
     $response["success"] = 0;
     $response["title"] = 'Korisničko ime već postoji';
     $response["message"]= 'Korisničko ime koje ste unijeli već postoji';

    }
    else if( $numberEmail>0 ) {

     $response["success"] = 0;
     $response["title"] = 'Email je već iskorišten';
     $response["message"]= 'Email kojeg ste unijeli već je iskorišten';

    }

    else {

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("INSERT INTO zaposlenik VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssssis",null, $_GET["ime"], $_GET["prezime"], $_GET["datum"], $_GET["adresa"], $_GET["mjesto"], $_GET["brTel"], $_GET["email"], $_GET["userName"], $lozinka, $_GET["pravoID"], $_GET["napomena"]);
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
    $response["success"]=1;
    }

    $mysqli->close();
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>