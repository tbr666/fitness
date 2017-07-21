<?php header('Content-type: text/html; charset=utf-8'); ?>
<!doctype html>
<html>

<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <link rel="stylesheet" type="text/css" href="dizajn/dizajn.css" />
    <link rel="stylesheet" type="text/css" href="dizajn/sweetalert.css" />
    <title>Naslovna stranica</title>
</head>

<body>

   <div id="header">
    <img src="dizajn/slike/logo.png"  alt="Image can't be loaded" class="smallImage">
   <?php include 'menu.php'; ?>    
   </div>
    <div id="section">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
        <script type="text/javascript" src="skripte/sweetalert.min.js"></script>
        <script type="text/javascript" src="skripte/spin.js"></script>
        <script type="text/javascript" src="skripte/spin.min.js"></script>
        <script type="text/javascript" src="skripte/ucitaj_glavno.js"></script>
    <div id="lijevi"> 
        <h2> Rođendani članova </h2>
    </div> 
    <div id="desni"> 
        <h2>Članarine ističu ovaj tjedan</h2>
    </div>
</div>

</body>

</html>