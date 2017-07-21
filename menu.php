<?php
session_start();
echo '<label class="headerLabel"><a href="zaposlenici.php" class="working" id="zaposlenici" >Zaposlenici</a></label>';
echo '<label class="headerLabel"><a href="filtriranje.php" class="working" id="filtriranje" >Filtriranje</a></label>';
echo '<label class="headerLabel"><a href="uplate.php" class="working" id="uplate" >Uplate</a></label>';
echo '<label class="headerLabel"><a href="clanovi.php" class="working" id="clanovi" >Članovi</a></label>';
echo '<label class="headerLabel" style="float:right;">'.$_SESSION["ime"].'&emsp;'.$_SESSION["prezime"].'&emsp;&emsp;&emsp;<a href="odjava.php" class="working" id="odjava" >Odjava</a></label>';
echo '<script> 
      function goToHomePage() {
       window.location.href="naslovna_stranica.php";
      }
      </script>
';
?>