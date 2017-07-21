<?php
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

    $response["uplate"] = array();
    $uplata              = array();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT imeClan, prezimeClan, datUplata, datUplataDo, nazivPlacanja, nazivProgram, iznosUplata  FROM uplata JOIN clan ON uplata.sifClan = clan.sifClan JOIN nacin_placanja ON uplata.sifPlacanja = nacin_placanja.sifPlacanja JOIN vp ON uplata.sifVP = vp.sifVP JOIN program ON vp.sifProgram LIKE program.sifProgram WHERE iznosUplata>1 AND datUplata BETWEEN Datum(?,?,?) AND Datum(?,?,?) ORDER BY datUplata LIMIT 100 OFFSET ?;");
    $stmt->bind_param("iiiiiii", $_GET["danPocetni"],$_GET["mjesecPocetni"],$_GET["godinaPocetna"], $_GET["danKrajnji"],$_GET["mjesecKrajnji"],$_GET["godinaKrajnja"], $_GET['broj']);
    $stmt->execute();
    $stmt->bind_result($ime, $prezime, $datum, $datumDo, $nazivPlacanja, $nazivProgram, $iznos);
    while ($stmt->fetch()) {
        $uplata["ime"]     = $ime;
        $uplata["prezime"]   = $prezime;
        $uplata["datum"] = $datum;
        $uplata["datumDo"] = $datumDo;
        $uplata["nazivPlacanja"] = $nazivPlacanja;
        $uplata["nazivProgram"] = $nazivProgram;
        $uplata["iznos"] = $iznos;

        array_push($response["uplate"], $uplata);
    }
    $stmt->close();
    $mysqli->close();
    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>