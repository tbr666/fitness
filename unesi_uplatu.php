<?php
    
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("INSERT INTO uplata (sifClan,datUplata,datUplataDo,sifPlacanja,sifVP,sifGrupa,iznosUplata,tokenSjednica) VALUES (?,Datum(?,?,?),Datum(?,?,?),?,?,?,?,?)");
    $stmt->bind_param("iiiiiiiiisis", $_GET['sifClan'], $_GET['danUplata'], $_GET['mjesecUplata'], $_GET['godinaUplata'], $_GET['danUplataDo'], $_GET['mjesecUplataDo'], $_GET['godinaUplataDo'], $_GET['sifPlacanja'], $_GET['sifVP'], $_GET['sifGrupa'], $_GET['iznos'], $_SESSION['tokenSjednica'] );
    $stmt->execute();
    $stmt->close();
     
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT MAX(sifUplata) AS sifra FROM uplata WHERE sifClan=?");
    $stmt->bind_param("i", $_GET['sifClan']);
    $stmt->execute();
    $stmt->bind_result($response['sifra']);
    $stmt->fetch();
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT nazivProgram  FROM vp JOIN program ON vp.sifProgram = program.sifProgram WHERE sifVP=?");
    $stmt->bind_param("i", $_GET['sifVP']);
    $stmt->execute();
    $stmt->bind_result($response['nazivProgram']);
    $stmt->fetch();
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT COUNT(*) AS number FROM clan_vp  WHERE sifClan=? AND sifVP=? AND sifGrupa=?");
    $stmt->bind_param("iii", $_GET['sifClan'], $_GET['sifVP'], $_GET['sifGrupa']);
    $stmt->execute();
    $stmt->bind_result($number);
    $stmt->fetch();
    $stmt->close();

    if($number == 0){

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("INSERT INTO clan_vp VALUES (?,?,?)");
    $stmt->bind_param("iis", $_GET['sifClan'], $_GET['sifVP'], $_GET['sifGrupa']  );
    $stmt->execute();
    $stmt->close();

    }


    $mysqli->close();
    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>