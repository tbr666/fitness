<?php
    session_start();
    $response = array();
    include 'provjeri_sjednicu.php';
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
    
    $grupe = explode(',', $_GET['grupe']);
    $aktivni = $_GET['aktivni'];
    $neaktivni = $_GET['neaktivni'];
   
    $adrese = array();  
    $clan = array();
    $response["clanovi"] = array();
    
    if ($aktivni == 'da') {

      $stmt = $mysqli->stmt_init();
      $stmt->prepare("SELECT imeClan, prezimeClan, emailClan, brTelClan, sifGrupa  FROM  najkasnijiIstek JOIN clan ON najkasnijiIstek.sifClan = clan.sifClan WHERE DATEDIFF(Datum(?,?,?),datUplataDo)<=14 ORDER BY sifGrupa");
      $stmt->bind_param("iii", $_GET["danKrajnji"],$_GET["mjesecKrajnji"],$_GET["godinaKrajnja"]);
      $stmt->execute();
      $stmt->bind_result($ime, $prezime, $email, $brTel, $grupa);
      while ($stmt->fetch()) {
          if (in_array($grupa, $grupe) && !in_array($email, $adrese) ) { 
              $clan["ime"] = $ime;
              $clan["prezime"] = $prezime;
              $clan["brTel"] = $brTel;
              $clan["email"] = $email;
              array_push($response["clanovi"],$clan);  
              array_push($adrese, $email); 
          }
      }
    $stmt->close();
    }
   if ($neaktivni == 'da') {

      $stmt = $mysqli->stmt_init();
      $stmt->prepare("SELECT imeClan, prezimeClan, emailClan, brTelClan, sifGrupa  FROM najkasnijiIstek JOIN clan ON najkasnijiIstek.sifClan = clan.sifClan WHERE DATEDIFF(Datum(?,?,?),datUplataDo)>14 ORDER BY sifGrupa");
      $stmt->bind_param("iii", $_GET["danPocetni"],$_GET["mjesecPocetni"],$_GET["godinaPocetna"]);
      $stmt->execute();
      $stmt->bind_result($ime, $prezime, $email, $brTel, $grupa);
      while ($stmt->fetch()) {
          if (in_array($grupa, $grupe) && !in_array($email, $adrese) ) {   
              $clan["ime"] = $ime;
              $clan["prezime"] = $prezime;
              $clan["brTel"] = $brTel;
              $clan["email"] = $email;
              array_push($response["clanovi"],$clan);  
              array_push($adrese, $email); 
          }
      }
      $stmt->close(); 
    }
    
    $mysqli->close();
    $response["success"]=1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

?>