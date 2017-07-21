<?php header('Content-type: text/html; charset=utf-8'); ?>
<!doctype html>
<html>

<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8;">
    
    <link rel="stylesheet" type="text/css" href="dizajn/dizajn.css" />
    <link rel="stylesheet" type="text/css" href="dizajn/sweetalert.css" />
    <link href="dizajn/normalize.css" rel="stylesheet" type="text/css"/>
    <link href="dizajn/datepicker.css" rel="stylesheet" type="text/css"/>	
    <title>Uplate</title>
</head>

<body>

   <div id="header">
   <img src="dizajn/slike/logo.png"  alt="Image can't be loaded" class="smallImage" onClick="goToHomePage()">
   <?php include 'menu.php'; ?>    
   </div>
<?php $date = date('Y-m-d', time()); $dateTo = date("Y-m-d", strtotime("+1 month", time()));  ?>
    <div id="section">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
        <script type="text/javascript" src="skripte/sweetalert.min.js"></script>
        <script type="text/javascript" src="skripte/spin.js"></script>
        <script type="text/javascript" src="skripte/spin.min.js"></script>
        <script type="text/javascript" src="skripte/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="skripte/jquery-ui-1.8.18.custom.min.js"></script>
<div id="prvi"> 
<label> Pretraži: </label>  <input type="text" id="pretraga" class="uskiTekst"  maxlength="50" oninput="osvjeziTablicu()" onKeyPress="enterOsvjeziTablicu(event)"> <button id="pretrazi" class="commonButtonWide" onClick="osvjeziTablicu()">Pretraga </button><br>
<div id="tableDiv" style="height:20em; overflow-y: auto !important; overflow">
</div>
</div>

<div id="drugi">
<h3>Uplate člana:</h3>
<div id="tableDiv2" style="height:20em; overflow-y: auto !important; margin-bottom:2em;">
</div>
<label id="sifra"></label><label id="userName"></label><br>
<label>Datum uplate:</label> <input type="text" id="datum" class="uskiTekst" placeholder="Datum uplate" value="<?php echo $date ?>" maxlength="11"><br>
<label>Vrijedi do:</label> <input type="text" id="vrijedi" class="uskiTekst" placeholder="Vrijedi do" value="<?php echo $dateTo ?>" maxlength="11"><br>
<label>Vrsta programa:</label><br>  <select  class="vrstaSelect" id="vrstaPrograma" multiple size=3>
                          <?php include 'dohvati_vrste_programa.php';?>
</select><br><br>
<label>Grupa:</label><br>  <select  class="vrstaSelect" id="grupa" multiple size=3>
   <?php
   include 'dohvati_grupe.php';   
    ?>                       
</select><br><br>
<label>Način plaćanja:</label><br>  <select  class="vrstaSelect" id="nacin" multiple size=2>
   <option value="1"> Gotovina
   <option value="2"> Netbanking                       
</select><br><br>
<label>Iznos uplate:</label> <input type="text" id="iznos" class="uskiTekst"  maxlength="4"><br><br>
<a><img src="slike/azuriraj.png" onClick="dodaj()" id="nova" class="controlWidgetVeliki"/></a>
<div class="hoverDivLarge"><label class="linkLabelVisible">Spremi uplatu</label></div>
</div><br>

<div id="content" style="margin-top:24em;">
<button onClick="filtrirajUplate()" class="commonButton">Prikaži uplate</button><br><br>
<h3> Aktivnost: </h3> 
<label for="aktivni">Aktivni</label> <input type="checkbox" id="aktivni" />
                             <label for="neaktivni">Neaktivni</label>   <input type="checkbox" id="neaktivni"/> <br><br>
<h3> Period: </h3>
<input type="text" id="datumOd" class="uskiTekst" placeholder="Datum od" maxlength="10" value="<?php echo $date; ?>"> <label>-</label>  
<input type="text" id="datumDo" class="uskiTekst" placeholder="Datum do" maxlength="10" value="<?php echo $date; ?>"> <br><br>
<h3>Grupe:</h3>
<label for="sve">Sve</label>
<input type="checkbox" onchange="oznaciSve(this)" id="sve"/><br>
<script type="text/javascript" src="skripte/uplate.js"></script>
<script type="text/javascript" src="skripte/visestruki_vp_grupa_nacin.js"></script>
</div>
</div>
</body>

</html>