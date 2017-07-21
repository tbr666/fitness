<?php
function getClientIPEnv() {
    $ipAddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipAddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipAddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipAddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipAddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
        $ipAddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipAddress = getenv('REMOTE_ADDR');
    else
        $ipAddress = 'UNKNOWN';
 
    return $ipAddress;
}

function getClientIPServer() {
    $ipAddress = '';
    if ($_SERVER['HTTP_CLIENT_IP'])
        $ipAddress = $_SERVER['HTTP_CLIENT_IP'];
    else if($_SERVER['HTTP_X_FORWARDED_FOR'])
        $ipAddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if($_SERVER['HTTP_X_FORWARDED'])
        $ipAddress = $_SERVER['HTTP_X_FORWARDED'];
    else if($_SERVER['HTTP_FORWARDED_FOR'])
        $ipAddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if($_SERVER['HTTP_FORWARDED'])
        $ipAddress = $_SERVER['HTTP_FORWARDED'];
    else if($_SERVER['REMOTE_ADDR'])
        $ipAddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipAddress = 'UNKNOWN';
 
    return $ipAddress;
}

session_start();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

 $lozinka = hash('sha512', $_GET['lozinka']);
 $loginId = $_GET['loginId'];
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT sifZap, imeZap, prezimeZap, datRodZap, adresaZap, nazivMjestoZap, brTelZap, emailZap, userName, napomena FROM zaposlenik WHERE userName LIKE ? AND lozinka LIKE ? AND pravoID = 3");
    $stmt->bind_param("ss", $loginId,$lozinka);
    $stmt->execute();
    $stmt->bind_result($_SESSION["sifZap"], $_SESSION["ime"], $_SESSION["prezime"], $_SESSION["datRod"], $_SESSION["adresa"], $_SESSION["nazivMjesto"], $_SESSION["brTel"], $_SESSION["email"], $_SESSION["userName"],$_SESSION["napomena"]);
    $stmt->fetch();
    $stmt->close();
    
    $response           = array();
    $response["userName"] = $_SESSION["userName"];

    if (!is_null($_SESSION["userName"])) {

    $time = time();
    $tokenSjednica = hash('sha512', $_SESSION["userName"] . 'jfnr33o8JuG52N' . $time);
    $_SESSION['ip'] = getClientIPServer();
    if ($_SESSION['ip'] == 'UNKNOWN') $_SESSION['ip'] = getClientIPEnv();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("INSERT INTO sjednica (tokenSjed, sifZaposlenik, IPAdresaSjed, pocetakSjed, krajSjed, aktivnaSjed) VALUES(?,?,?,CURRENT_TIMESTAMP,null,1)");
    $stmt->bind_param("sis", $tokenSjednica, $_SESSION["sifZap"], $_SESSION['ip']    );
    $stmt->execute();
    $stmt->close();

    $_SESSION["tokenSjednica"] = $tokenSjednica;
    $response["tokenSjednica"]= $_SESSION["tokenSjednica"];
    $response["sifZap"]= $_SESSION["sifZap"];
    $response["ime"]= $_SESSION["ime"];
    $response["prezime"]= $_SESSION["prezime"];
    $response["datRod"]= $_SESSION["datRod"];
    $response["adresa"]= $_SESSION["adresa"];
    $response["nazivMjesto"]= $_SESSION["nazivMjesto"];
    $response["brTel"]= $_SESSION["brTel"];
    $response["email"]= $_SESSION["email"];
    $response["napomena"]= $_SESSION["napomena"];
    $response["ip"]= $_SESSION["ip"];


    }
    else{
     unset($_SESSION["userName"]);
    }

    $mysqli->close();
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
   
?> 