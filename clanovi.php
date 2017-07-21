<?php header('Content-type: text/html; charset=utf-8'); ?>
<!doctype html>
<html>

<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    
    <link rel="stylesheet" type="text/css" href="dizajn/dizajn.css" />
    <link rel="stylesheet" type="text/css" href="dizajn/sweetalert.css" />
    <link href="dizajn/normalize.css" rel="stylesheet" type="text/css"/>
    <link href="dizajn/datepicker.css" rel="stylesheet" type="text/css"/>	
    <title>Članovi</title>
</head>

<body>

   <div id="header">
   <img src="dizajn/slike/logo.png"  alt="Image can't be loaded" class="smallImage" onClick="goToHomePage()">
   <?php include 'menu.php'; ?>    
   </div>
<?php $date = date('Y-m-d', time()); ?>
    <div id="section">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
        <script type="text/javascript" src="skripte/sweetalert.min.js"></script>
        <script type="text/javascript" src="skripte/spin.js"></script>
        <script type="text/javascript" src="skripte/spin.min.js"></script>
	<script type="text/javascript" src="skripte/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="skripte/jquery-ui-1.8.18.custom.min.js"></script>
<label> Pretraži: </label>  <input type="text" id="pretraga" class="uskiTekst"  maxlength="50" oninput="osvjeziTablicu()" onKeyPress="enterOsvjeziTablicu(event)"> <button id="pretrazi" class="commonButton" onClick="osvjeziTablicu()">Pretraga </button><br>
<div id="tableDiv" style="height:20em; overflow-y: auto !important;">
</div>
<a id="noviLink"><img src="slike/novi.png" onClick="novi()" id="novi" class="controlWidgetDesni"/></a>
<div class="hoverDiv"><label class="linkLabelHover">Dodaj člana</label></div></a>
<a><img src="slike/azuriraj.png" onClick="azuriraj()" id="azuriraj" class="controlWidget"/></a>
<div class="hoverDiv"><label class="linkLabelHover">Spremi promjene</label></div>
<a><img src="slike/obrisi.png" onClick="obrisi()" id="obrisi" class="controlWidget"/></a>
<div class="hoverDiv"><label class="linkLabelHover">Obriši člana</label></div><br><br>
<label id="sifra" class="linkLabelVisible"></label> <label id="aktivan"></label><br>
<label> Ime: </label>  <input type="text" id="ime" class="uskiTekst" placeholder="Ime" maxlength="50"> <br>
<label> Prezime: </label>  <input type="text" id="prezime" class="uskiTekst" placeholder="Prezime" maxlength="50"> <br>
<label> Datum rođenja: </label> <input type="text" id="datum" class="uskiTekst" placeholder="Datum rođenja" maxlength="11"> <br>
<label> Adresa: </label> <input type="text" id="adresa" class="uskiTekst" placeholder="Adresa" maxlength="50">
<label> Mjesto: </label> <input type="text" id="mjesto" class="uskiTekst" placeholder="Naziv mjesta" maxlength="50"><br>
<label> Zanimanje: </label> <input type="text" id="zanimanje" class="uskiTekst" placeholder="Zanimanje" maxlength="50"><br>
<label> Član od: </label> <input type="text" id="clanOd" class="uskiTekst" value="<?php echo $date ?>" placeholder="Član od" maxlength="11"><br>
<label> Telefon: </label> <input type="text" id="telefon" class="uskiTekst" placeholder="Telefon" maxlength="50"><br>
<label> Email: </label> <input type="text" id="email" class="uskiTekst" placeholder="Email" maxlength="50"><br>
<label> Referenca: </label> <br>  <select  class="pravoSelect" id="referenca" multiple size=3>
                           <option value="web stranica">web stranica
                           <option value="facebook">facebook
                           <option value="letak">letak
                           <option value="reklama vizual">reklama vizual
                           <option value="preporuka">preporuka
                           <option value="preporuka">ostalo
</select><br>
<label> Zdravstveni problem: </label><br>
<textarea  cols="60" rows="4" maxlength="2000" id="zdravstveniProblem"></textarea><br>
<label> Napomena: </label><br>
<textarea  cols="60" rows="4" maxlength="2000" id="napomena"></textarea><br>
<label> Grupe: </label><br><br>
<div id="grupe">
<button class="smallbutton" id="dodajGrupu" onClick="dodajStavku()">+</button>
</div>
<script type="text/javascript" src="skripte/clanovi.js"></script>
<script type="text/javascript" src="skripte/visestruki_referenca.js"></script>
</div>
</body>
</html>