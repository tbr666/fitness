document.getElementById("clanovi").style.color = 'red';
document.getElementById("clanovi").removeAttribute("href");
document.getElementById("clanovi").className = 'notWorking';

 $( function() {
    $('#datum').datepicker({
				inline: true,
				showOtherMonths: true,
				dateFormat: 'yy-mm-dd',
				dayNamesMin: ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'],
			});
    $('#clanOd').datepicker({
				inline: true,
				showOtherMonths: true,
				dateFormat: 'yy-mm-dd',
				dayNamesMin: ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'],
			});
  } );

var trenutnaSifra = null;
var currentRow;
var autoInc;
var redovi = new Array();
var imena  = new Array();
var prezimena = new Array();
var adrese = new Array();
var mjesta = new Array();
var emailovi = new Array();
var sifre = new Array();
var aktivnosti = new Array();
var sviVpovi = new Array();
var sveGrupe;
var inicijalniDatum;


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
var formData = '';
var target = document.getElementById('header');

dohvatiSveClanove();

function dohvatiSveClanove() {

var spinner = new Spinner(opts).spin(target);
        
        $.ajax({
            url: "svi_clanovi_administracija.php",
            type: "GET",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                var bivsaTablica = document.getElementById('tablicaClanova');
                var bivsiLink = document.getElementById('ispisClanova');
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }

                var vpovi = JSON.parse(data).vpovi;
                for (var p=0, tot=vpovi.length; p<tot; p++){
                   var sifVP = vpovi[p].sifVP;
                   var nazivProgram = vpovi[p].nazivProgram;
                   var brDolazaka = vpovi[p].brDolazaka;
                   sviVpovi[sifVP-1]= nazivProgram + ' ('+ brDolazaka + ')';
                }

                sveGrupe = JSON.parse(data).grupe;

                var clanovi = JSON.parse(data).clanovi;
                autoInc = JSON.parse(data).autoInc;
                document.getElementById('sifra').innerHTML = '['+autoInc+']';
                var popis;
                popis = document.createElement('table');
                popis.className = 'clanovi';
                    var inner = '<tr>'
                    inner += '<th>Šifra</th><th>Ime</th><th>Prezime</th><th>Adresa</th><th>Mjesto</th><th>Zanimanje</th><th>BR.telefona</th><th>Email</th><th>Referenca</th><th>Zdravstveni problem</th><th>Napomena</th><th>Aktivan</th>'; 
                    inner += '</tr>';
                    for (var i = 0; i < clanovi.length; i++) {
                        var sifra = clanovi[i].sifra;
                        var ime = clanovi[i].ime;
                        var prezime = clanovi[i].prezime;
                        var adresa = clanovi[i].adresa;
                        var mjesto = clanovi[i].mjesto;
                        var zanimanje = clanovi[i].zanimanje;
                        var clanOd = clanovi[i].clanOd;
                        var brTel = clanovi[i].brTel;
                        var email = clanovi[i].email;
                        var referenca = clanovi[i].referenca;
                        var zdravstveniProblem = clanovi[i].zdravstveniProblem;
                        var napomena = clanovi[i].napomena;
                        var aktivan = clanovi[i].aktivan;
                        inner +='<tr id="'+ sifra + '" onClick="postaviSifru(' + sifra + ',this)">';
                        if (ime == null) ime = '';
                        if (prezime == null) prezime = '';
                        if (adresa == null) adresa = '';
                        if (mjesto == null) mjesto = '';
                         unutarnje='<td>' + sifra + '</td>' + '<td>' + ime + '</td>' + '<td>' + prezime + '</td>' + '<td>' + adresa + '</td>' + '<td>' + mjesto + '</td>' + '<td>' + zanimanje + '</td>' + '<td>' + brTel + '</td>' + '<td>' + email + '</td>' + '<td>' + referenca + '</td>' + '<td>' + zdravstveniProblem + '</td>' + '<td>' + napomena + '</td>' + '<td>' +'<input type="checkbox" disabled';
                        if (aktivan == 'da') unutarnje+=' checked ';
                        unutarnje+='/>' + '</td>';
                        inner += unutarnje + '</tr>';
                        redovi.push(unutarnje);
                        imena.push(ime);
                        emailovi.push(email);
                        prezimena.push(prezime);
                        adrese.push(adresa);
                        mjesta.push(mjesto);
                        sifre.push(sifra); 
                        aktivnosti[sifra] = aktivan;  
                    }
                    popis.innerHTML = inner;
                    popis.id = 'tablicaClanova';
                    var ispis = document.createElement('label');
                    ispis.className = 'linkLabelVisible';
                    ispis.innerHTML = 'Ispis';
                    ispis.id = 'ispisClanova';
                    ispis.style.marginBottom = '5%';
                    ispis.onclick = function(){ ispisiClanove(); } ; 
                    document.getElementById('tableDiv').appendChild(popis);
                    document.getElementById('section').insertBefore(ispis,document.getElementById('noviLink'));
                    inicijalniDatum = document.getElementById('clanOd').value;

                
            }
        });


}

function enterOsvjeziTablicu(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { 

        osvjeziTablicu();
    }
}

function osvjeziTablicu() {

var pretraga = document.getElementById('pretraga').value;
var tablica = document.getElementById('tablicaClanova');
tablica.innerHTML = '<tr><th>Šifra</th><th>Ime</th><th>Prezime</th><th>Adresa</th><th>Mjesto</th><th>Zanimanje</th><th>BR.telefona</th><th>Email</th><th>Referenca</th><th>Zdravstveni problem</th><th>Napomena</th><th>Aktivan</th></tr>';
var innerPlus = '';
for(i=0, tot=redovi.length; i<tot; i++) {
   var unutarnje = redovi[i];

   if(imena[i].indexOf(pretraga)==0||prezimena[i].indexOf(pretraga)==0||(imena[i]+' '+prezimena[i]).indexOf(pretraga)==0||adrese[i].indexOf(pretraga)==0||mjesta[i].indexOf(pretraga)==0) {
      
      innerPlus += '<tr id="' +sifre[i]+ '" onClick="postaviSifru(' + sifre[i] + ',this)">' + unutarnje + '</tr>'; 
   }
}
tablica.innerHTML += innerPlus;


}


function ispisiClanove(){
      var mywindow = window.open('', 'PRINT', 'height=800,width=1550');


        mywindow.document.write('<html><head><title>' + 'Članovi'  + '</title> <link rel="stylesheet" type="text/css" href="dizajn/dizajn_ispisa.css" />');
        mywindow.document.write('</head><body>');
      mywindow.document.write('<h1>' + 'Članovi'  + '</h1>');
        mywindow.document.write('<table>'+document.getElementById('tablicaClanova').innerHTML+'</table>');
        mywindow.document.write('</body></html>');

        mywindow.document.close(); 
        mywindow.focus(); 

        mywindow.print();
        mywindow.close();


        return true;

        }

function postaviSifru(sifra,row) {

 trenutnaSifra = sifra;
 currentRow = row.rowIndex;
 var aktivanLabel = document.getElementById('aktivan');
 document.getElementById('sifra').innerHTML = '['+trenutnaSifra+']';
 if(aktivnosti[sifra] == 'da') {
    aktivanLabel.style.color = 'green';
    aktivanLabel.innerHTML = 'aktivan';
 }
 else {
    aktivanLabel.style.color = 'red';
    aktivanLabel.innerHTML = 'neaktivan';
 }

 var spinner = new Spinner(opts).spin(target);

 var formDataIzvuci = 'sifra=' + sifra;
        $.ajax({
            url: "izvuci_podatke_clana.php",
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
                zanimanje = podaci.zanimanje;
                clanOd = podaci.clanOd;
                brTel = podaci.brTel;
                email = podaci.email;
                referenca = podaci.referenca;
                zdravstveniProblem = podaci.zdravstveniProblem;
                napomena = podaci.napomena;
                document.getElementById('ime').value = ime;
                document.getElementById('prezime').value = prezime;
                document.getElementById('datum').value = datum;
                document.getElementById('adresa').value = adresa;
                document.getElementById('mjesto').value = mjesto;
                document.getElementById('zanimanje').value = zanimanje;
                document.getElementById('clanOd').value = clanOd;
                document.getElementById('telefon').value = brTel;
                document.getElementById('email').value = email;
                document.getElementById('referenca').selectedIndex = referenca-1;
                document.getElementById('zdravstveniProblem').value = zdravstveniProblem;
                document.getElementById('napomena').value = napomena;
                var grupe = podaci.grupe;
                document.getElementById('grupe').innerHTML = '';
                for(var i=0, tot=grupe.length; i<tot; i++) {
                  var selektorVP = dodajSelektorVP(grupe[i].sifVP);
                  var selektorGrupa = dodajSelektorGrupa(grupe[i].sifGrupa);
                  var removeButton = document.createElement('button');
                  removeButton.innerHTML = '-';
                  removeButton.className = 'smallButton';
                  removeButton.onclick = function(){ obrisiElement(this.parentNode) } ;
                  var zapis = document.createElement('div');
                  zapis.style.marginBottom = '2%';
                  zapis.appendChild(selektorVP);
                  zapis.appendChild(selektorGrupa);
                  zapis.appendChild(removeButton);
                  document.getElementById('grupe').appendChild(zapis);
               
            }
                  var addButton = document.createElement('button');
                  addButton.innerHTML = '+';
                  addButton.className = 'smallButton';
                  addButton.id = 'dodajGrupu';
                  addButton.onclick = function(){ dodajStavku(); } ;
                  document.getElementById('grupe').appendChild(addButton);
         }
        });
     
}

function resetirajPolja(){

document.getElementById('grupe').innerHTML = '';
var addButton = document.createElement('button');
addButton.innerHTML = '+';
addButton.className = 'smallButton';
addButton.id = 'dodajGrupu';
addButton.onclick = function(){ dodajStavku(); } ;
document.getElementById('grupe').appendChild(addButton);
trenutnaSifra = null;
document.getElementById('sifra').innerHTML = '['+autoInc+']';
document.getElementById('aktivan').innerHTML = '';
document.getElementById('ime').value = '';
document.getElementById('prezime').value = '';
document.getElementById('datum').value = '';
document.getElementById('adresa').value = '';
document.getElementById('mjesto').value = '';
document.getElementById('zanimanje').value = '';
document.getElementById('clanOd').value = inicijalniDatum;
document.getElementById('telefon').value = '';
document.getElementById('email').value = '';
document.getElementById('referenca').selectedIndex = -1;
document.getElementById('zdravstveniProblem').value = '';
document.getElementById('napomena').value = '';

}

function novi() {
  if(trenutnaSifra == null) noviClan();
  else resetirajPolja();
}

function obrisi() {
  if(trenutnaSifra != null) swal({
                        title: "Brisanje člana",
                        text: "Jeste sigurno da želite obrisati člana?",
                        type: "warning",
                        showCancelButton: true
                    }, function() {
                        obrisiClana(trenutnaSifra);
                    }); 
}

function obrisiClana(sifra) {

var spinner = new Spinner(opts).spin(target);

 var formDataObrisi = 'sifra=' + sifra;
        $.ajax({
            url: "obrisi_clana.php",
            type: "GET",
            data: formDataObrisi,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                tablica = document.getElementById('tablicaClanova');
                tablica.deleteRow(currentRow);
                resetirajPolja();
                 setTimeout(function() { 
                     swal('Član obrisan', '', 'success');
                },500);
            }
        });

}

function noviClan() {
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var telefonRegex = /^[0-9]+$/;
    ime = document.getElementById('ime').value;
    prezime = document.getElementById('prezime').value;
    datum = document.getElementById('datum').value;
    adresa = document.getElementById('adresa').value;
    mjesto = document.getElementById('mjesto').value;
    zanimanje = document.getElementById('zanimanje').value;
    clanOd = document.getElementById('clanOd').value;
    brTel = document.getElementById('telefon').value;
    email = document.getElementById('email').value;
    referenca = document.getElementById('referenca').selectedIndex+1;
    zdravstveniProblem = document.getElementById('zdravstveniProblem').value;
    napomena = document.getElementById('napomena').value;
    if(ime == "") { document.getElementById('ime').focus(); return; }
    if(prezime == "") { document.getElementById('prezime').focus(); return; }
    if(datum == "") { document.getElementById('datum').focus(); return; }
    if(adresa == "") { document.getElementById('adresa').focus(); return; }
    if(mjesto == "") { document.getElementById('mjesto').focus(); return; }
    if(zanimanje == "") { document.getElementById('zanimanje').focus(); return; }
    if(clanOd == "") { document.getElementById('clanOd').focus(); return; }
    if(brTel == "") { document.getElementById('telefon').focus(); return; }
    if(email == "") { document.getElementById('email').focus(); return; }
    if(referenca == 0) { document.getElementById('referenca').focus(); return; }
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
    var spinner = new Spinner(opts).spin(target);
    var noviVpovi = '';
    var odabiri = document.getElementById('grupe').getElementsByClassName('pravoSelect');
    for(var i=0, tot=odabiri.length; i<tot; i++) {
       if( i%2 == 0) { 
          noviIndex = odabiri[i].selectedIndex + 1;
          noviVpovi += noviIndex+'*';
       }
       else {
          noviVpovi += odabiri[i].value + '**';
       }

    }
    var len = noviVpovi.length;
    if (len > 0) noviVpovi = noviVpovi.substring(0,len-2);
    var formDataNovi = 'ime=' + ime + '&prezime=' + prezime + '&datum=' + datum + '&adresa=' + adresa + '&mjesto=' + mjesto + '&brTel=' + brTel + '&email=' + email + '&zanimanje=' + zanimanje + '&clanOd=' + clanOd + '&referenca=' + referenca + '&zdravstveniProblem=' + zdravstveniProblem + '&napomena=' + napomena +'&sifra=' + autoInc +'&vpovi=' + noviVpovi;
   $.ajax({
            url: "unesi_clana.php",
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
                    setTimeout(function() { 
                     swal(JSON.parse(data).title, JSON.parse(data).message, 'warning');
                },500);
                  
                   return;
                }
                swal({ 
                   title: 'Član dodan',
                   text: '',
                   type: 'success' 
                },
                function(){
                     var tablicaClanova = document.getElementById('tablicaClanova');
                var unutarnje = '<td>' + autoInc + '</td>' + '<td>' + ime + '</td>' + '<td>' + prezime + '</td>' + '<td>' + adresa + '</td>' + '<td>' + mjesto + '</td>' + '<td>' + zanimanje + '</td>' + '<td>' + brTel + '</td>' + '<td>' + email + '</td>' + '<td>' + document.getElementById('referenca').options[referenca-1].value + '</td>' + '<td>' + zdravstveniProblem + '</td>' + '<td>' + napomena + '</td>' + '<td>' + '<input type="checkbox" disabled/>' + '</td>';
                tablicaClanova.innerHTML += '<tr id="'+ autoInc + '" onclick ="postaviSifru('+ autoInc +',this)">' + unutarnje + '</tr>';
                document.getElementById('tableDiv').scrollTop = document.getElementById('tableDiv').scrollHeight;
                 redovi.push(unutarnje);
                 imena.push(ime);
                 emailovi.push(email);
                 prezimena.push(prezime);
                 adrese.push(adresa);
                 mjesta.push(mjesto);
                 sifre.push(autoInc); 
                 aktivnosti[sifra] = 'ne'; 
                autoInc++;
                resetirajPolja();    
                });
                                
            }
        });

}

function azuriraj() {
  if(trenutnaSifra!=null) azurirajClana(trenutnaSifra);
}


function azurirajClana(sifra){

 var spinner = new Spinner(opts).spin(target);

    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var telefonRegex = /^[0-9]+$/;
    ime = document.getElementById('ime').value;
    prezime = document.getElementById('prezime').value;
    datum = document.getElementById('datum').value;
    adresa = document.getElementById('adresa').value;
    mjesto = document.getElementById('mjesto').value;
    zanimanje = document.getElementById('zanimanje').value;
    clanOd = document.getElementById('clanOd').value;
    brTel = document.getElementById('telefon').value;
    email = document.getElementById('email').value;
    referenca = document.getElementById('referenca').selectedIndex+1;
    zdravstveniProblem = document.getElementById('zdravstveniProblem').value;
    napomena = document.getElementById('napomena').value;
    if(ime == "") { document.getElementById('ime').focus(); return; }
    if(prezime == "") { document.getElementById('prezime').focus(); return; }
    if(datum == "") { document.getElementById('datum').focus(); return; }
    if(adresa == "") { document.getElementById('adresa').focus(); return; }
    if(mjesto == "") { document.getElementById('mjesto').focus(); return; }
    if(zanimanje == "") { document.getElementById('zanimanje').focus(); return; }
    if(clanOd == "") { document.getElementById('clanOd').focus(); return; }
    if(brTel == "") { document.getElementById('telefon').focus(); return; }
    if(email == "") { document.getElementById('email').focus(); return; }
    if(referenca == 0) { document.getElementById('referenca').focus(); return; }
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
    var noviVpovi = '';
    var odabiri = document.getElementById('grupe').getElementsByClassName('pravoSelect');
    for(var i=0, tot=odabiri.length; i<tot; i++) {
       if( i%2 == 0) { 
          noviIndex = odabiri[i].selectedIndex + 1;
          noviVpovi += noviIndex+'*';
       }
       else {
          noviVpovi += odabiri[i].value + '**';
       }

    }
    var len = noviVpovi.length;
    if (len > 0) noviVpovi = noviVpovi.substring(0,len-2);
    var formDataAzuriraj = 'ime=' + ime + '&prezime=' + prezime + '&datum=' + datum + '&adresa=' + adresa + '&mjesto=' + mjesto + '&brTel=' + brTel + '&email=' + email + '&zanimanje=' + zanimanje + '&clanOd=' + clanOd + '&referenca=' + referenca + '&zdravstveniProblem=' + zdravstveniProblem + '&napomena=' + napomena + '&sifra= ' + sifra + '&vpovi=' + noviVpovi ;
   
   $.ajax({
            url: "azuriraj_clana.php",
            type: "GET",
            data: formDataAzuriraj,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href = 'odjava.php';
                    return;
                }
                 setTimeout(function() { 
                     swal('Član ažuriran', '', 'success');
                },500);
                
                var aktivan = aktivnosti[sifra]; 
                newInner = '';          
                newInner = '<td>' + sifra + '</td>' + '<td>' + ime + '</td>' + '<td>' + prezime + '</td>' + '<td>' + adresa + '</td>' + '<td>' + mjesto + '</td>' + '<td>' + zanimanje + '</td>' + '<td>' + brTel + '</td>' + '<td>' + email + '</td>' + '<td>' + document.getElementById('referenca').options[referenca-1].value + '</td>' + '<td>' + zdravstveniProblem + '</td>' + '<td>' + napomena + '</td>' + '<td>' + '<input type="checkbox" disabled'; 
                if(aktivan == 'da') newInner += ' checked '; 
                newInner += '/>' + '</td>';
                document.getElementById(sifra).innerHTML = newInner;
            }
        });
}

function dodajSelektorGrupa(sifGrupa) {

newSelect = document.createElement('select');
for(var i=0, tot = sveGrupe.length; i<tot; i++)
{
   var opt = document.createElement("option");
   opt.value= sveGrupe[i];
   opt.innerHTML = sveGrupe[i];
   newSelect.appendChild(opt);
}
newSelect.value = sifGrupa;
newSelect.className = 'pravoSelect';
document.getElementById('grupe').appendChild(newSelect);
return newSelect;

}

function dodajSelektorVP(sifVP) {

newSelect = document.createElement('select');
for(var i=0, tot = sviVpovi.length; i<tot; i++)
{
   var opt = document.createElement("option");
   opt.value= sviVpovi[i];
   opt.innerHTML = sviVpovi[i];
   newSelect.appendChild(opt);
}
newSelect.selectedIndex = sifVP-1;
newSelect.className = 'pravoSelect';
document.getElementById('grupe').appendChild(newSelect);
return newSelect;

}

function dodajStavku () {

   document.getElementById('grupe').removeChild(document.getElementById('dodajGrupu'));
   selektorVP = dodajSelektorVP(1);
   selektorGrupa =dodajSelektorGrupa('A-SUB 10 h');
   var removeButton = document.createElement('button');
   removeButton.innerHTML = '-';
   removeButton.className = 'smallButton';
   removeButton.onclick = function(){ obrisiElement(this.parentNode) } ;
   var zapis = document.createElement('div');
   zapis.style.marginBottom = '2%';
   zapis.appendChild(selektorVP);
   zapis.appendChild(selektorGrupa);
   zapis.appendChild(removeButton);
   document.getElementById('grupe').appendChild(zapis);
   var addButton = document.createElement('button');
   addButton.innerHTML = '+';
   addButton.className = 'smallButton';
   addButton.id = 'dodajGrupu';
   addButton.onclick = function(){ dodajStavku(); } ;
   document.getElementById('grupe').appendChild(addButton);
}

function obrisiElement(element){

document.getElementById('grupe').removeChild(element);

}