document.getElementById("zaposlenici").style.color = 'red';
document.getElementById("zaposlenici").removeAttribute("href");
document.getElementById("zaposlenici").className = 'notWorking';
$( function() {
    $('#datum').datepicker({
				inline: true,
				showOtherMonths: true,
				dateFormat: 'yy-mm-dd',
				dayNamesMin: ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'],
			});
  } );
var naziviPrograma = new Array();
var duljina;
var programiGrupe = new Array();
var trenutnaSifra = null;
var currentRow;
var autoInc;
var mijenjanjeLozinke = 'ne';

var opts = {
            lines: 13,
            length: 36,
            width: 14,
            radius: 62,
            scale: 1,
            corners: 1,
            color: 'white',
            opacity: 0.25,
            rotate: 0,
            direction: 1,
            speed: 1,
            trail: 60,
            fps: 30,
            zIndex: 2e9,
            className: 'spinner',
            top: '50%',
            left: '50%',
            shadow: true,
            hwaccel: false,
            position: 'absolute'
        };
var formData = "";
var target = document.getElementById('header');

ucitajZaposlenike();

function ucitajZaposlenike() {
  
        var spinner = new Spinner(opts).spin(target);
        
        $.ajax({
            url: "svi_zaposlenici.php",
            type: "GET",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                autoInc = JSON.parse(data).autoInc;
                document.getElementById('sifra').innerHTML = '['+autoInc+']';
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                var zaposlenici = JSON.parse(data).zaposlenici;
                var zaposleniciPopis;
                if (zaposlenici.length > 0) {
                    zaposleniciPopis = document.createElement('table');
                    zaposleniciPopis.id = 'tablica';
                    zaposleniciPopis.className='manja';
                    var inner = '<tr>'
                    inner += '<th>Šifra</th><th>Ime</th><th>Prezime</th><th>Broj telefona</th><th>Email</th><th>Napomena</th>'; 
                    inner += '</tr>';
                    for (var i = 0; i < zaposlenici.length; i++) {
                        var sifra = zaposlenici[i].sifra;
                        var ime = zaposlenici[i].ime;
                        var prezime = zaposlenici[i].prezime;  
                        var brTel = zaposlenici[i].brTel;
                        var email = zaposlenici[i].email;
                        var napomena = zaposlenici[i].napomena;
                        inner +='<tr onclick ="izvuciPodatke('+ sifra +',this)" id="' + sifra + '" >';
                        if (ime == null) ime = '';
                        if (prezime == null) prezime = '';
                        if (brTel == null) brTel = '';
                        if (email == null) brTel = '';
                        inner +='<td>' + sifra + '</td>' + '<td>' + ime + '</td>' + '<td>' + prezime + '</td>' + '<td>' + brTel + '</td>' + '<td>' + email + '</td>'+ '<td>' + napomena + '</td>';
                        inner +='</tr>';
                    }
                    zaposleniciPopis.innerHTML = inner;
                }
                else {
                    zaposleniciPopis = document.createElement('h2');
                    zaposleniciPopis.innerHTML = 'Nema zaposlenika';
                }
               document.getElementById('section').insertBefore(zaposleniciPopis, document.getElementById('section').firstChild);
               ucitajGrupe();
            }
        });


  }

function ucitajGrupe() {
 
var spinner = new Spinner(opts).spin(target);
        
        $.ajax({
            url: "sve_grupe.php",
            type: "GET",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                var grupe = JSON.parse(data).grupe;
               
                    for (var i = 0; i < grupe.length; i++) {
                        var program = grupe[i].program;
                        var grupa = grupe[i].grupa;
                        if(naziviPrograma.indexOf(program) == -1) {
  

                          duljina = 0;
                          programiGrupe[program] = new Array();
                          naziviPrograma[0] = program;

                          var boxProgram = document.createElement('input');
                          boxProgram.id = program;
                          boxProgram.type = 'checkbox';
                          boxProgram.className= 'program';
                          boxProgram.value = program;
                          boxProgram.onchange = function(){
                            oznaciGrupe(this,this.id);
                           };
                          oznaciGrupe(this,program);
                          var labelProgram = document.createElement('label');
                          labelProgram.innerHTML = program;
                          labelProgram.htmlFor = boxProgram.id;
                        
                          var boxGrupa = document.createElement('input');
                          boxGrupa.id = grupa;
                          boxGrupa.type = 'checkbox';
                          boxGrupa.className= 'grupa';
                          boxGrupa.value = grupa;
                          var labelGrupa = document.createElement('label');
                          labelGrupa.innerHTML = grupa;
                          labelGrupa.htmlFor = boxGrupa.id;
                          labelGrupa.className = 'grupaLabel';
                          programiGrupe[program][duljina] = boxGrupa;
                          

                          document.getElementById('section').appendChild(document.createElement('br')); 
                          document.getElementById('section').appendChild(boxProgram);
                          document.getElementById('section').appendChild(labelProgram);
                          document.getElementById('section').appendChild(document.createElement('br'));
                          document.getElementById('section').appendChild(boxGrupa); 
                          document.getElementById('section').appendChild(labelGrupa);
                          document.getElementById('section').appendChild(document.createElement('br')); 
                        }
                        else {

                          duljina ++;

                          var boxGrupa = document.createElement('input');
                          boxGrupa.id = grupa;
                          boxGrupa.type = 'checkbox';
                          boxGrupa.className= 'grupa';
                          boxGrupa.value = grupa;
                          var labelGrupa = document.createElement('label');
                          labelGrupa.innerHTML = grupa;
                          labelGrupa.htmlFor = boxGrupa.id;
                          labelGrupa.className = 'grupaLabel';
                          programiGrupe[program][duljina] = boxGrupa;

                          document.getElementById('section').appendChild(boxGrupa);
                          document.getElementById('section').appendChild(labelGrupa);
                          document.getElementById('section').appendChild(document.createElement('br')); 
                        }
            }
           }
        });


}

function oznaciGrupe(box,program) {


var isChecked = box.checked;

var grupe = programiGrupe[program];
if(grupe == undefined) return;
for(i=0, tot =grupe.length; i<tot; i++) grupe[i].checked = isChecked;

}

function izvuciPodatke(sifra,row) {

currentRow = row.rowIndex;

trenutnaSifra = sifra;
document.getElementById('promijeniLozinku').style.visibility = 'visible';
var spinner = new Spinner(opts).spin(target);
 
        var formDataIzvuci = 'sifra=' + sifra;
        $.ajax({
            url: "izvuci_podatke.php",
            type: "GET",
            data: formDataIzvuci,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                var podaci = JSON.parse(data);
                ime = podaci.ime;
                prezime = podaci.prezime;
                datum = podaci.datum;
                adresa = podaci.adresa;
                mjesto = podaci.mjesto;
                brTel = podaci.brTel;
                email = podaci.email;
                pravo = podaci.pravo;
                napomena = podaci.napomena;
                userName = podaci.userName;
                grupe = podaci.grupe;
                var grupeBoxovi = document.getElementsByClassName("grupa");
                var programiBoxovi = document.getElementsByClassName("program");
                var totGrupe = grupeBoxovi.length;
                var totProgrami = programiBoxovi.length;
                for(i=0; i<totGrupe; i++) grupeBoxovi[i].checked = false;
                for(i=0; i<totProgrami; i++) programiBoxovi[i].checked = false;
                var mojeGrupe = grupe.split(',');
                for(i=0; i<totGrupe; i++) {
                    for(j=0 , totMojeGrupe=mojeGrupe.length; j<totGrupe; j++){
                        if (grupeBoxovi[i].value == mojeGrupe[j]) grupeBoxovi[i].checked = true;
                    }
                }
                document.getElementById('sifra').innerHTML = '['+sifra+']';
                document.getElementById('userName').innerHTML = userName;
                document.getElementById('ime').value = ime;
                document.getElementById('prezime').value = prezime;
                document.getElementById('datum').value = datum;
                document.getElementById('adresa').value = adresa;
                document.getElementById('mjesto').value = mjesto;
                document.getElementById('telefon').value = brTel;
                document.getElementById('email').value = email;
                document.getElementById('pravo').selectedIndex = pravo-1;
                document.getElementById('napomena').value = napomena;
                document.getElementById('noviUsername').style.visibility = 'hidden';
                document.getElementById('noviUsernameLabel').style.visibility = 'hidden';
                document.getElementById('lozinka').style.visibility = 'hidden';
                document.getElementById('lozinkaLabel').style.visibility = 'hidden';
                document.getElementById('ponoviLozinku').style.visibility = 'hidden';
                document.getElementById('ponoviLozinkuLabel').style.visibility = 'hidden';
               
            }
        });


}

function obrisi() {
   
  if(trenutnaSifra!=null) swal({
                        title: "Brisanje zaposlenika",
                        text: "Jeste sigurno da želite obrisati zaposlenika?",
                        type: "warning",
                        showCancelButton: true
                    }, function() {
                        obrisiZaposlenika(trenutnaSifra);
                    }); 
}

function azuriraj() {
  if(trenutnaSifra!=null) azurirajZaposlenika(trenutnaSifra);
}

function novi() {
  if(trenutnaSifra==null) noviZaposlenik();
  else resetirajPolja('novi');
}

function obrisiZaposlenika(sifra){

 var spinner = new Spinner(opts).spin(target);

 var formDataObrisi = 'sifra=' + sifra;
        $.ajax({
            url: "obrisi_zaposlenika.php",
            type: "GET",
            data: formDataObrisi,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                var jaSam = JSON.parse(data).jaSam;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                tablica = document.getElementById('tablica');
                tablica.deleteRow(currentRow);
                setTimeout(function() { 
                     swal('Zaposlenik obrisan', '', 'success');
                },500);
                resetirajPolja('brisanje');
                if(jaSam == 'da') setTimeout(function() { 
                     window.location.href = 'odjava.php';  
                },1000);
            }
        });

}

function azurirajZaposlenika(sifra){

 var spinner = new Spinner(opts).spin(target);

    ime = document.getElementById('ime').value;
    prezime = document.getElementById('prezime').value;
    datum = document.getElementById('datum').value;
    adresa = document.getElementById('adresa').value;
    mjesto = document.getElementById('mjesto').value;
    brTel = document.getElementById('telefon').value;
    email = document.getElementById('email').value;
    pravo = document.getElementById('pravo').selectedIndex+1;
    napomena = document.getElementById('napomena').value;
    if(ime == "") { document.getElementById('ime').focus(); return; }
    if(prezime == "") { document.getElementById('prezime').focus(); return; }
    if(datum == "") { document.getElementById('datum').focus(); return; }
    if(adresa == "") { document.getElementById('adresa').focus(); return; }
    if(mjesto == "") { document.getElementById('mjesto').focus(); return; }
    if(brTel == "") { document.getElementById('telefon').focus(); return; }
    if(email == "") { document.getElementById('email').focus(); return; }
    if(pravo == 0) { document.getElementById('pravo').focus(); return; }
    var sveGrupe = document.getElementsByClassName('grupa');
    var noveGrupe='';
    for(l=0, tot=sveGrupe.length; l<tot; l++){
     if(sveGrupe[l].checked) noveGrupe+=sveGrupe[l].value+',';    
    }
    if(noveGrupe.length > 0) noveGrupe = noveGrupe.substring(0,noveGrupe.length-1);
    var formDataAzuriraj = 'sifra=' + sifra + '&ime=' + ime + '&prezime=' + prezime + '&datum=' + datum + '&adresa=' + adresa + '&mjesto=' + mjesto + '&brTel=' + brTel + '&email=' + email + '&pravoID=' + pravo + '&napomena=' + napomena + '&grupe=' + noveGrupe;
   
   $.ajax({
            url: "azuriraj_zaposlenika.php",
            type: "GET",
            data: formDataAzuriraj,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                setTimeout(function() { 
                 swal('Zaposlenik ažuriran', '', 'success'); 
                },500);           
                document.getElementById(sifra).innerHTML = '<td>' + sifra + '</td>' + '<td>' + ime + '</td>' + '<td>' + prezime + '</td>' + '<td>' + brTel + '</td>' + '<td>' + email + '</td>'+ '<td>' + napomena + '</td>';
            }
        });
}

function noviZaposlenik(){
   
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var telefonRegex = /^[0-9]+$/;
    ime = document.getElementById('ime').value;
    prezime = document.getElementById('prezime').value;
    datum = document.getElementById('datum').value;
    adresa = document.getElementById('adresa').value;
    mjesto = document.getElementById('mjesto').value;
    brTel = document.getElementById('telefon').value;
    email = document.getElementById('email').value;
    pravo = document.getElementById('pravo').selectedIndex+1;
    napomena = document.getElementById('napomena').value;
    userName = document.getElementById('noviUsername').value;
    lozinka = document.getElementById('lozinka').value;
    ponoviLozinku = document.getElementById('ponoviLozinku').value;
    if(ime == "") { document.getElementById('ime').focus(); return; }
    if(prezime == "") { document.getElementById('prezime').focus(); return; }
    if(datum == "") { document.getElementById('datum').focus(); return; }
    if(adresa == "") { document.getElementById('adresa').focus(); return; }
    if(mjesto == "") { document.getElementById('mjesto').focus(); return; }
    if(brTel == "") { document.getElementById('telefon').focus(); return; }
    if(email == "") { document.getElementById('email').focus(); return; }
    if(pravo == 0) { document.getElementById('pravo').focus(); return; }
    if(userName == '') { document.getElementById('newUserName').focus(); return; } 
    if(lozinka == '') { document.getElementById('lozinka').focus(); return; } 
    if(ponoviLozinku == '') { document.getElementById('ponoviLozinku').focus(); return; } 
    if(lozinka.length<8) { 
        document.getElementById('lozinka').focus(); 
        swal('Nesigurna lozinka', 'Lozinka mora biti duga najmanje 8 znakova', 'warning'); 
        return; 
    } 
    if(lozinka!=ponoviLozinku) {
        document.getElementById('ponoviLozinku').focus(); 
        swal('Lozinke se ne podudaraju', 'Lozinke se moraju podudarati', 'warning'); 
        return;
    }
    if(!telefonRegex.test(brTel.replace(/\s+/g, '')) || brTel.replace(/\s+/g, '').length<8) {
        document.getElementById('telefon').focus(); 
        swal('Neispravni broj telefona', 'Unijeli ste neispravni broj telefona', 'warning'); 
        return;
    }
    if(!emailRegex.test(email)) {
        document.getElementById('email').focus(); 
        swal('Neispravna email adresa', 'Unijeli ste neispravnu email adresu', 'warning'); 
        return;
    }
    var sveGrupe = document.getElementsByClassName('grupa');
    var noveGrupe='';
    for(l=0, tot=sveGrupe.length; l<tot; l++){
     if(sveGrupe[l].checked) noveGrupe+=sveGrupe[l].value+',';    
    }
    if(noveGrupe.length > 0) noveGrupe = noveGrupe.substring(0,noveGrupe.length-1);
    var spinner = new Spinner(opts).spin(target);
    var formDataNovi = 'sifra=' + autoInc + '&userName=' + userName + '&lozinka=' + lozinka + '&ime=' + ime + '&prezime=' + prezime + '&datum=' + datum + '&adresa=' + adresa + '&mjesto=' + mjesto + '&brTel=' + brTel + '&email=' + email + '&pravoID=' + pravo + '&napomena=' + napomena + '&grupe=' + noveGrupe;
   
   $.ajax({
            url: "novi_zaposlenik.php",
            type: "GET",
            data: formDataNovi,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                if(success == 0) {
                   swal(JSON.parse(data).title, JSON.parse(data).message, 'warning');
                   return;
                }
                setTimeout(function() { 
                 swal('Zaposlenik dodan', '', 'success'); 
                },500); 
                document.getElementById('tablica').innerHTML += '<tr onclick ="izvuciPodatke('+ autoInc +',this)"><td>' + autoInc + '</td>' + '<td>' + ime + '</td>' + '<td>' + prezime + '</td>' + '<td>' + brTel + '</td>' + '<td>' + email + '</td>'+ '<td>' + napomena + '</td></tr>';
                autoInc++;
                resetirajPolja('novi');                    
            }
        });

    

}

function resetirajPolja(opis) {

mijenjanjeLozinke = 'ne';
document.getElementById('promijeniLozinku').style.visibility = 'hidden';
document.getElementById('noviUsername').style.visibility = 'visible';
document.getElementById('noviUsernameLabel').style.visibility = 'visible';
document.getElementById('lozinka').style.visibility = 'visible';
document.getElementById('lozinkaLabel').style.visibility = 'visible';
document.getElementById('ponoviLozinku').style.visibility = 'visible';
document.getElementById('ponoviLozinkuLabel').style.visibility = 'visible';
document.getElementById('lozinkaTipka').style.visibility = 'hidden';
trenutnaSifra = null;
currentRow = null;
document.getElementById('noviUsername').value = '';
document.getElementById('lozinka').value = '';
document.getElementById('ponoviLozinku').value = '';
document.getElementById('sifra').innerHTML = '['+autoInc+']';
document.getElementById('userName').innerHTML = '';
document.getElementById('ime').value = '';
document.getElementById('prezime').value = '';
document.getElementById('datum').value = '';
document.getElementById('adresa').value = '';
document.getElementById('mjesto').value = '';
document.getElementById('telefon').value = '';
document.getElementById('email').value = '';
document.getElementById('pravo').selectedIndex = -1;
document.getElementById('napomena').value = '';
var grupeBoxovi = document.getElementsByClassName("grupa");
var programiBoxovi = document.getElementsByClassName("program");
var totGrupe = grupeBoxovi.length;
var totProgrami = programiBoxovi.length;
for(i=0; i<totGrupe; i++) grupeBoxovi[i].checked = false;
for(i=0; i<totProgrami; i++) programiBoxovi[i].checked = false;
}

function oznaciSve(element){

var isChecked = element.checked;
var sviProgrami = document.getElementsByClassName('program');
for(i=0, tot=sviProgrami.length; i<tot; i++) {
    sviProgrami[i].checked = isChecked;
    var program = sviProgrami[i].value; 
    var sveGrupe = programiGrupe[program];
    for(j=0, tot2=sveGrupe.length; j<tot2; j++) {
      sveGrupe[j].checked = isChecked;
    }
}

}

function promijeniLozinku() {

mijenjanjeLozinke = 'da';
document.getElementById('lozinka').style.visibility = 'visible';
document.getElementById('lozinkaLabel').style.visibility = 'visible';
document.getElementById('ponoviLozinku').style.visibility = 'visible';
document.getElementById('ponoviLozinkuLabel').style.visibility = 'visible';
document.getElementById('lozinkaTipka').style.visibility = 'visible';

}

function enterPotvrdiPromjenu(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13 && mijenjanjeLozinke == 'da') { 

        potvrdiPromjenu();
    }
}

function potvrdiPromjenu() {

var lozinka = document.getElementById('lozinka').value;
var ponoviLozinku = document.getElementById('ponoviLozinku').value;
if(lozinka == '') { document.getElementById('lozinka').focus(); return; }
if(ponoviLozinku == '') { document.getElementById('ponoviLozinku').focus(); return; }
if(lozinka.length < 8 ){

        document.getElementById('lozinka').focus(); 
        swal('Nesigurna lozinka', 'Lozinka mora biti duga najmanje 8 znakova', 'warning'); 
        return; 
}
if(lozinka!=ponoviLozinku) {
        document.getElementById('ponoviLozinku').focus(); 
        swal('Lozinke se ne podudaraju', 'Lozinke se moraju podudarati', 'warning'); 
        return;
    }
var spinner = new Spinner(opts).spin(target);
var formDataLozinka = 'lozinka=' + lozinka + '&sifra=' + trenutnaSifra;

$.ajax({
            url: "promijeni_lozinku.php",
            type: "GET",
            data: formDataLozinka,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                swal('Lozinka promijenjena', '', 'success'); 
                document.getElementById('lozinka').style.visibility = 'hidden';
                document.getElementById('lozinkaLabel').style.visibility = 'hidden';
                document.getElementById('ponoviLozinku').style.visibility = 'hidden';
                document.getElementById('ponoviLozinkuLabel').style.visibility = 'hidden';
                document.getElementById('lozinkaTipka').style.visibility = 'hidden';
                document.getElementById('lozinka').value = '';
                document.getElementById('ponoviLozinku').value = '';
                mijenjanjeLozinke = 'ne';
                
            }
        });

}



