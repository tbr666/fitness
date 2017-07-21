<?php
error_reporting(E_ERROR);
session_start();
function sjednicaValidna($tokenSjednice)
{
    
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT COUNT(sjednicaId) AS num FROM sjednica  WHERE tokenSjed LIKE ? AND aktivnaSjed = 1");
    $stmt->bind_param("s", $tokenSjednice);
    $stmt->execute();
    $stmt->bind_result($num);
    $stmt->fetch();
    $stmt->close();

    $mysqli->close();
    return $num > 0;
}

require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
if (isset($_SESSION["tokenSjednica"]) && sjednicaValidna($_SESSION["tokenSjednica"])) {

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT sjednica.sifZaposlenik FROM sjednica WHERE tokenSjed LIKE ? AND aktivnaSjed = 1  ");
    $stmt->bind_param("s", $_SESSION["tokenSjednica"]);
    $stmt->execute();
    $stmt->bind_result($_SESSION['sifZap']);
    $stmt->fetch();
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT userName, imeZap, prezimeZap, datRodZap, adresaZap, nazivMjestoZap, brTelZap, emailZap, napomena FROM zaposlenik WHERE sifZaposlenik = ? AND pravoID = 3");
    $stmt->bind_param("i", $_SESSION['sifZap']);
    $stmt->execute();
    $stmt->bind_result($_SESSION["userName"], $_SESSION["ime"], $_SESSION["prezime"], $_SESSION["datRod"], $_SESSION["adresa"], $_SESSION["nazivMjesto"], $_SESSION["brTel"], $_SESSION["email"], $_SESSION["napomena"]);
    $stmt->fetch();
    $stmt->close();

    $mysqli->close();
   
   if(!is_null($_SESSION["userName"])) {
       echo "<script> window.location.href = 'naslovna_stranica.php'; </script>";
   }
   else session_destroy();
}
 else session_destroy();
?> 