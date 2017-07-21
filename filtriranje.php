<?php header('Content-type: text/html; charset=utf-8'); ?>
<!doctype html>
<html>

<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <link rel="stylesheet" type="text/css" href="dizajn/dizajn.css" />
    <link rel="stylesheet" type="text/css" href="dizajn/sweetalert.css" />
    <link href="dizajn/normalize.css" rel="stylesheet" type="text/css"/>
    <link href="dizajn/datepicker.css" rel="stylesheet" type="text/css"/>	 
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
    <script type="text/javascript" src="skripte/sweetalert.min.js"></script>
    <script type="text/javascript" src="skripte/spin.js"></script>
    <script type="text/javascript" src="skripte/spin.min.js"></script>
    <script type="text/javascript" src="skripte/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="skripte/jquery-ui-1.8.18.custom.min.js"></script>
    <title>Filtriranje</title>
</head>

<body>

   <div id="header">
   <img src="dizajn/slike/logo.png"  alt="Image can't be loaded" class="smallImage" onClick="goToHomePage()">
   <?php include 'menu.php'; ?>    
   </div>
    <div id="section">
<?php $date = date('Y-m-d', time()); ?>
<h3> Aktivnost: </h3> 
 <input type="checkbox" id="aktivni" /> <label for="aktivni">Aktivni</label>
 <input type="checkbox" id="neaktivni"/>  <label for="neaktivni">Neaktivni</label> <br><br>
<h3> Period: </h3>
<input type="text" id="datumOd" class="uskiTekst" placeholder="Datum od" maxlength="10" value="<?php echo $date; ?>"> <label>-</label>  
<input type="text" id="datumDo" class="uskiTekst" placeholder="Datum do" maxlength="10" value="<?php echo $date; ?>"> <br><br>
<h3>Grupe:</h3>
<input type="checkbox" onchange="oznaciSve(this)" id="sve"/>
<label for="sve">Sve</label> <br>
<script type="text/javascript" src="skripte/filtriranje.js"></script>
</div>
</body>
</html>