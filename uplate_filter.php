<?php
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
    
    $grupe = explode(',', $_GET['grupe']);
    $aktivni = $_GET['aktivni'];
    $neaktivni = $_GET['neaktivni'];
  

    $uplata = array();
    $response["uplate"] = array();
    
    if ($aktivni == 'da') {

      $stmt = $mysqli->stmt_init();
      $stmt->prepare("SELECT sifUplata, datUplata, uplata.datUplataDo, nazivProgram, uplata.sifClan, imeClan, prezimeClan, nazivPlacanja, iznosUplata, uplata.sifGrupa  FROM uplata JOIN najkasnijiIstek ON uplata.sifClan = najkasnijiIstek.sifClan AND uplata.sifGrupa = najkasnijiIstek.sifGrupa JOIN clan ON uplata.sifClan = clan.sifClan JOIN nacin_placanja ON uplata.sifPlacanja=nacin_placanja.sifPlacanja JOIN vp ON uplata.sifVP=vp.sifVP JOIN program ON vp.sifProgram = program.sifProgram WHERE DATEDIFF(Datum(?,?,?),najkasnijiIstek.datUplataDo)<=14 ORDER BY uplata.sifUplata");
      $stmt->bind_param("iii", $_GET["danKrajnji"],$_GET["mjesecKrajnji"],$_GET["godinaKrajnja"]);
      $stmt->execute();
      $stmt->bind_result($sifUplata, $datum, $datumDo, $nazivProgram, $sifClan, $ime, $prezime, $nazivPlacanja, $iznos, $grupa);
      while ($stmt->fetch()) {
          if (in_array($grupa, $grupe)) { 
              $uplata["sifUplata"] = $sifUplata;
              $uplata["datum"] = $datum;
              $uplata["datumDo"] = $datumDo;
              $uplata["nazivProgram"] = $nazivProgram;
              $uplata["sifClan"] = $sifClan;
              $uplata["ime"] = $ime;
              $uplata["prezime"] = $prezime;
              $uplata["nazivPlacanja"] = $nazivPlacanja;
              $uplata["iznos"] = $iznos;
              $uplata["grupa"] = $grupa;
              array_push($response["uplate"],$uplata);  
          }
      }
    $stmt->close();
    }
   if ($neaktivni == 'da') {

      $stmt = $mysqli->stmt_init();
      $stmt->prepare("SELECT sifUplata, datUplata, uplata.datUplataDo, nazivProgram, uplata.sifClan, imeClan, prezimeClan, nazivPlacanja, iznosUplata, uplata.sifGrupa  FROM uplata JOIN najkasnijiIstek ON uplata.sifClan = najkasnijiIstek.sifClan AND uplata.sifGrupa = najkasnijiIstek.sifGrupa JOIN clan ON uplata.sifClan = clan.sifClan JOIN nacin_placanja ON uplata.sifPlacanja=nacin_placanja.sifPlacanja JOIN vp ON uplata.sifVP=vp.sifVP JOIN program ON vp.sifProgram = program.sifProgram WHERE DATEDIFF(Datum(?,?,?),najkasnijiIstek.datUplataDo)>14 ORDER BY uplata.sifUplata");
      $stmt->bind_param("iii", $_GET["danPocetni"],$_GET["mjesecPocetni"],$_GET["godinaPocetna"]);
      $stmt->execute();
      $stmt->bind_result($sifUplata, $datum, $datumDo, $nazivProgram, $sifClan, $ime, $prezime, $nazivPlacanja, $iznos, $grupa);
      while ($stmt->fetch()) {
          if (in_array($grupa, $grupe)) { 
              $uplata["sifUplata"] = $sifUplata;
              $uplata["datum"] = $datum;
              $uplata["datumDo"] = $datumDo;
              $uplata["nazivProgram"] = $nazivProgram;
              $uplata["sifClan"] = $sifClan;
              $uplata["ime"] = $ime;
              $uplata["prezime"] = $prezime;
              $uplata["nazivPlacanja"] = $nazivPlacanja;
              $uplata["iznos"] = $iznos;
              $uplata["grupa"] = $grupa;
              array_push($response["uplate"],$uplata);  
          }
      }
      $stmt->close(); 
    }
    
    $mysqli->close();
    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>