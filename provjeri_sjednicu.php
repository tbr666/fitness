<?php
error_reporting(E_ERROR);
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

if (!isset($_SESSION["tokenSjednica"]) || !sjednicaValidna($_SESSION["tokenSjednica"])) {
    $response["success"] = -666;
    $response["message"] = "Token nije validan";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
    exit();
}

else{

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT sjednica.sifZaposlenik, zaposlenik.userName FROM sjednica JOIN zaposlenik ON sjednica.sifZaposlenik = zaposlenik.sifZap WHERE tokenSjed LIKE ? AND aktivnaSjed = 1  ");
    $stmt->bind_param("s", $_SESSION["tokenSjednica"]);
    $stmt->execute();
    $stmt->bind_result($_SESSION['sifZap'], $_SESSION['userName']);
    $stmt->fetch();
    $stmt->close();

    $mysqli->close();
}
?> 