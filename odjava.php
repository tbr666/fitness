<?php

session_start();
$response = array();
include 'provjeri_sjednicu.php';
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

$stmt = $mysqli->stmt_init();
$stmt->prepare("UPDATE sjednica SET aktivnaSjed = 0, krajSjed = CURRENT_TIMESTAMP WHERE tokenSjed LIKE ? ");
$stmt->bind_param("s", $_SESSION["tokenSjednica"]);
$stmt->execute();
$stmt->close();
$response["success"] = 1;
session_destroy();
echo "<script> window.location.href = 'prijavi_se.php'; </script>";
$mysqli->close();
echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
   
?> 