<!doctype html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="dizajn/dizajn.css" />
    <link rel="stylesheet" type="text/css" href="dizajn/sweetalert.css" />
    <title>Prijava</title>
</head>

<body>

   <div id="header">
        <img src="dizajn/slike/logo.png"  alt="Image can't be loaded" class="smallImage">
   </div>
    <div id="section">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
        <script type="text/javascript" src="skripte/sweetalert.min.js"></script>
        <script type="text/javascript" src="skripte/spin.js"></script>
        <script type="text/javascript" src="skripte/spin.min.js"></script>
        <script type="text/javascript" src="skripte/prijavi_se.js"></script>
        <h1>Prijava</h1>
        <br>
        <br>
        <img src="slike/logo.png" alt="Image can't be loaded" class="headImage" id="homeImage">
        <input type="text" placeholder="Korisničko ime" id="loginId" class="centeredText" maxlength="100" onKeyPress="enterPrijaviSe(event)">
        <br>
        <input type="password" placeholder="Lozinka" id="password" class="centeredText" maxlength="100" onKeyPress="enterPrijaviSe(event)">
        <br>
        <br>
        <button onClick="prijaviSe()" class="centerButton">Prijavi se</button>
    <?php
        include 'provjeri_prijavu.php';
    ?>
    </div>

</body>

</html>