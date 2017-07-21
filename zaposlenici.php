<?php header('Content-type: text/html; charset=utf-8'); ?>
<!doctype html>
<html>

<head><meta http-equiv="Content-Type" content="text/html; charset=big5">
    
    <link rel="stylesheet" type="text/css" href="dizajn/dizajn.css" />
    <link rel="stylesheet" type="text/css" href="dizajn/sweetalert.css" />
    <link href="dizajn/normalize.css" rel="stylesheet" type="text/css"/>
    <link href="dizajn/datepicker.css" rel="stylesheet" type="text/css"/>	
    <title>Zaposlenici</title>
</head>

<body>

   <div id="header">
   <img src="dizajn/slike/logo.png"  alt="Image can't be loaded" class="smallImage" onClick="goToHomePage()">
   <?php include 'menu.php'; ?>    
   </div>
    <div id="section">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
        <script type="text/javascript" src="skripte/sweetalert.min.js"></script>
        <script type="text/javascript" src="skripte/spin.js"></script>
        <script type="text/javascript" src="skripte/spin.min.js"></script>
        <script type="text/javascript" src="skripte/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="skripte/jquery-ui-1.8.18.custom.min.js"></script>
<a><img src="slike/novi.png" onClick="novi()" id="novi" class="controlWidget"/></a>
<div class="hoverDiv"><label class="linkLabelHover">Dodaj zaposlenika</label></div>
<a><img src="slike/azuriraj.png" onClick="azuriraj()" id="azuriraj" class="controlWidget"/></a>
<div class="hoverDiv"><label class="linkLabelHover">Spremi promjene</label></div>
<a><img src="slike/obrisi.png" onClick="obrisi()" id="obrisi" class="controlWidget"/></a>
<div class="hoverDiv"><label class="linkLabelHover">Obriši zaposlenika</label></div><br><br>
<label class="linkLabel" id="promijeniLozinku" onClick="promijeniLozinku()">Promijeni lozinku</label><br>
<label id="sifra"></label> <label id="userName"></label> <br>
<label id="noviUsernameLabel"> Username: </label>  <input type="text" id="noviUsername" class="uskiTekst" placeholder="Username" maxlength="15"> <br> 
<label id="lozinkaLabel"> Lozinka: </label>  <input type="password" id="lozinka" class="uskiTekst" placeholder="Lozinka" maxlength="15" onKeyPress="enterPotvrdiPromjenu(event)">  <br>
<label id="ponoviLozinkuLabel"> Ponovi lozinku: </label>  <input type="password" id="ponoviLozinku" class="uskiTekst" placeholder="Ponovi lozinku" maxlength="15" onKeyPress="enterPotvrdiPromjenu(event)"> <button id="lozinkaTipka" class="commonButton" onClick="potvrdiPromjenu()" style="visibility:hidden;">Potvrdi lozinku </button> <br>
<label> Ime: </label>  <input type="text" id="ime" class="uskiTekst" placeholder="Ime" maxlength="50"> <br>
<label> Prezime: </label>  <input type="text" id="prezime" class="uskiTekst" placeholder="Prezime" maxlength="50"> <br>
<label> Datum rođenja: </label> <input type="text" id="datum" class="uskiTekst" placeholder="Datum rođenja" maxlength="11"> <br>
<label> Adresa: </label> <input type="text" id="adresa" class="uskiTekst" placeholder="Adresa" maxlength="50">
<label> Mjesto: </label> <input type="text" id="mjesto" class="uskiTekst" placeholder="Naziv mjesta" maxlength="50"><br>
<label> Telefon: </label> <input type="text" id="telefon" class="uskiTekst" placeholder="Telefon" maxlength="50"><br>
<label> Email: </label> <input type="text" id="email" class="uskiTekst" placeholder="Email" maxlength="50"><br>
<label> Pravo: </label> <br>  <select  class="pravoSelect" id="pravo" multiple size=3>
                           <option value="Instruktor">Instruktor
                           <option value="Moderator">Moderator
                           <option value="Super Administrator">Super Administrator
</select><br>
<label> Napomena: </label><br>
<textarea  cols="60" rows="4" maxlength="2000" id="napomena"></textarea><br>
<script type="text/javascript" src="skripte/zaposlenici.js"></script>
<script type="text/javascript" src="skripte/visestruki_pravo.js"></script>
</div>
</body>
</html>