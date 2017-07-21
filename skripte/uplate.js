document.getElementById("uplate").style.color = 'red';
document.getElementById("uplate").removeAttribute("href");
document.getElementById("uplate").className = 'notWorking';
$( function() {
    $('#datum').datepicker({
				inline: true,
				showOtherMonths: true,
				dateFormat: 'yy-mm-dd',
				dayNamesMin: ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'],
			});
    $('#vrijedi').datepicker({
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
var autoInc;
var redovi = new Array();
var imena  = new Array();
var prezimena = new Array();
var adrese = new Array();
var mjesta = new Array();
var sifre = new Array();
var imePrezimeSifra = new Array();
var inicijalniPocetak;
var inicijalniKraj;
var ukupniIznos = 0;
var ukupniIznosIspis;

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

ucitajGrupe();
        

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
                          

                          document.getElementById('content').appendChild(document.createElement('br')); 
                          document.getElementById('content').appendChild(boxProgram);
                          document.getElementById('content').appendChild(labelProgram);
                          document.getElementById('content').appendChild(document.createElement('br')); 
                          document.getElementById('content').appendChild(boxGrupa); 
                          document.getElementById('content').appendChild(labelGrupa);                  
                          document.getElementById('content').appendChild(document.createElement('br')); 
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

                          document.getElementById('content').appendChild(boxGrupa);
                          document.getElementById('content').appendChild(labelGrupa);
                          document.getElementById('content').appendChild(document.createElement('br')); 
                        }
            }
            document.getElementById('content').appendChild(document.createElement('br'));
            dohvatiSveClanove();
            
           }
        });


}

function oznaciGrupe(box,program) {


var isChecked = box.checked;

var grupe = programiGrupe[program];
if(grupe == undefined) return;
for(i=0, tot =grupe.length; i<tot; i++) grupe[i].checked = isChecked;

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

function dohvatiSveClanove() {

var spinner = new Spinner(opts).spin(target);
        
        $.ajax({
            url: "svi_clanovi.php",
            type: "GET",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                var clanovi = JSON.parse(data).clanovi;
                var popis;
                popis = document.createElement('table');
                popis.className = 'clanovi';
                    var inner = '<tr>'
                    inner += '<th>Šifra</th><th>Ime</th><th>Prezime</th><th>Adresa</th><th>Mjesto</th><th>Aktivan</th>'; 
                    inner += '</tr>';
                    for (var i = 0; i < clanovi.length; i++) {
                        var sifra = clanovi[i].sifra;
                        var ime = clanovi[i].ime;
                        var prezime = clanovi[i].prezime;
                        var adresa = clanovi[i].adresa;
                        var mjesto = clanovi[i].mjesto;
                        var aktivan = clanovi[i].aktivan;
                        inner +='<tr id="'+ sifra + '" onClick="postaviSifru(' + sifra + ')">';
                        if (ime == null) ime = '';
                        if (prezime == null) prezime = '';
                        if (adresa == null) adresa = '';
                        if (mjesto == null) mjesto = '';
                         imePrezimeSifra[sifra] = ime + ' ' + prezime;
                         unutarnje='<td>' + sifra + '</td>' + '<td>' + ime + '</td>' + '<td>' + prezime + '</td>' + '<td>' + adresa + '</td>' + '<td>' + mjesto + '</td>' + '<td>' +'<input type="checkbox" disabled';
                        if (aktivan == 'da') unutarnje+=' checked ';
                        unutarnje+='/>' + '</td>';
                        inner += unutarnje + '</tr>';
                        redovi.push(unutarnje);
                        imena.push(ime);
                        prezimena.push(prezime);
                        adrese.push(adresa);
                        mjesta.push(mjesto);
                        sifre.push(sifra);   
                    }
                    popis.innerHTML = inner;
                    popis.id = 'tablica';
                    document.getElementById('tableDiv').appendChild(popis);
                    inicijalniPocetak =  document.getElementById('datum').value;
                    inicijalniKraj = document.getElementById('vrijedi').value;
                
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
var tablica = document.getElementById('tablica');
tablica.innerHTML = '<tr><th>Šifra</th><th>Ime</th><th>Prezime</th><th>Adresa</th><th>Mjesto</th><th>Aktivan</th></tr>';
var innerPlus = '';
for(i=0, tot=redovi.length; i<tot; i++) {
   var unutarnje = redovi[i];

   if(imena[i].indexOf(pretraga)==0||prezimena[i].indexOf(pretraga)==0||(imena[i]+' '+prezimena[i]).indexOf(pretraga)==0||adrese[i].indexOf(pretraga)==0||mjesta[i].indexOf(pretraga)==0) {
      
      innerPlus += '<tr id="' +sifre[i]+ '" onClick="postaviSifru(' + sifre[i] + ')">' + unutarnje + '</tr>'; 
   }
}
tablica.innerHTML += innerPlus;


}

function postaviSifru(sifra) {
var bivsaTablicaUplate = document.getElementById('tablicaUplataClana');
if(bivsaTablicaUplate != null)  document.getElementById('tableDiv2').removeChild(bivsaTablicaUplate);
trenutnaSifra = sifra;
document.getElementById('sifra').innerHTML = '['+sifra+']';
document.getElementById('userName').innerHTML = imePrezimeSifra[sifra];
var spinner = new Spinner(opts).spin(target);
formData = 'sifClan=' + trenutnaSifra;
$.ajax({
            url: "uplate_clana.php",
            type: "GET",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                var uplate = JSON.parse(data).uplate;
                var popis;
                popis = document.createElement('table');
                popis.className = 'clanovi';
                    var inner = '<tr>'
                    inner += '<th>R.br.</th><th>Datum</th><th>Vrijedi do</th><th>Naziv programa</th><th>Grupa</th><th>Način plaćanja</th><th>Iznos</th>'; 
                    inner += '</tr>';
                    for (var i = 0; i < uplate.length; i++) {
                        var sifra = uplate[i].sifra;
                        var datum = uplate[i].datum;
                        var datumDo = uplate[i].datumDo;
                        var nazivPlacanja = uplate[i].nazivPlacanja;
                        var nazivProgram = uplate[i].nazivProgram;
                        var iznos = uplate[i].iznos;
                        var grupa = uplate[i].grupa;
                        inner +='<tr>';
                        var unutarnje='<td>' + sifra + '</td>' + '<td>' + datum + '</td>' + '<td>' + datumDo + '</td>' + '<td>' + nazivProgram + '</td>' + '<td>' + grupa + '</td>' + '<td>' + nazivPlacanja + '</td>' + '<td>' + iznos + '</td>';
                        
                        inner += unutarnje + '</tr>'; 
                    }
                    popis.innerHTML = inner;
                    popis.id = 'tablicaUplataClana';
                    document.getElementById('tableDiv2').appendChild(popis);
                
            }
        });


}
function dodaj() {

if (trenutnaSifra!=null) dodajUplatu();

}

function dodajUplatu() {

var datum = document.getElementById('datum').value;
var vrijedi = document.getElementById('vrijedi').value;
var datumPolje = datum.split('-');
var datumDoPolje = vrijedi.split('-');
if(datumPolje.length != 3) { document.getElementById('datum').focus(); return;   }
if(datumDoPolje.length != 3) { document.getElementById('vrijedi').focus(); return;   }
var danUplata = datumPolje[2];
var mjesecUplata = datumPolje[1];
var godinaUplata = datumPolje[0];
var danUplataDo = datumDoPolje[2];
var mjesecUplataDo = datumDoPolje[1];
var godinaUplataDo = datumDoPolje[0];
var iznos = document.getElementById('iznos').value;
if(iznos == '' || /^\+?(0|[1-9]\d*)$/.test(iznos) == false) { document.getElementById('iznos').focus(); return; }
var sveVP = document.getElementById('vrstaPrograma');
var sveGrupe = document.getElementById('grupa');
var sviNacini = document.getElementById('nacin');
var indexVP = sveVP.selectedIndex;
var indexGrupa = sveGrupe.selectedIndex;
var indexNacin = sviNacini.selectedIndex;
if(indexVP == -1) { sveVP.focus();   return;  }
if(indexGrupa == -1) { sveGrupe.focus(); return; }
if(indexNacin == -1) { sviNacini.focus(); return; }
var sifVP = sveVP.options[indexVP].value;
var sifGrupa = sveGrupe.options[indexGrupa].value;
var sifPlacanja = sviNacini.options[indexNacin].value;

var spinner = new Spinner(opts).spin(target);

var formDataNova = 'sifClan=' + trenutnaSifra + '&danUplata=' + danUplata + '&mjesecUplata=' + mjesecUplata + '&godinaUplata=' + godinaUplata + '&danUplataDo=' + danUplataDo + '&mjesecUplataDo=' + mjesecUplataDo + '&godinaUplataDo=' + godinaUplataDo + '&sifPlacanja=' + sifPlacanja + '&sifVP=' + sifVP + '&sifGrupa=' + sifGrupa + '&iznos=' + iznos;
   
   $.ajax({
            url: "unesi_uplatu.php",
            type: "GET",
            data: formDataNova,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                setTimeout(function() { 
                 swal('Uplata dodana', '', 'success');  
                },500); 
                var sifraUplate = JSON.parse(data).sifra;
                var nazivProgram = JSON.parse(data).nazivProgram;
                var naziviPlacanja = ['gotovina','netbanking'];
                var tablicaUplataClana = document.getElementById('tablicaUplataClana');
                tablicaUplataClana.innerHTML += '<tr>' +'<td>' + sifraUplate + '</td>' + '<td>' + datum + '</td>' + '<td>' + vrijedi + '</td>' + '<td>' + nazivProgram + '</td>' + '<td>' + sifGrupa + '</td>' + '<td>' + naziviPlacanja[sifPlacanja-1] + '</td>' + '<td>' + iznos + '</td>'+'</tr>';
                resetirajPolja();                   
            }
        });

}

function resetirajPolja() {

document.getElementById('iznos').value = '';
document.getElementById('vrstaPrograma').selectedIndex = -1;
document.getElementById('grupa').selectedIndex = -1;
document.getElementById('nacin').selectedIndex = -1;
document.getElementById('datum').value = inicijalniPocetak;
document.getElementById('vrijedi').value = inicijalniKraj;

}

function filtrirajUplate() {

var aktivni;
var neaktivni;
if( document.getElementById('aktivni').checked ) aktivni = 'da';
else aktivni = 'ne';
if( document.getElementById('neaktivni').checked ) neaktivni = 'da';
else neaktivni = 'ne';
if(aktivni == 'ne' && neaktivni == 'ne') { document.getElementById('aktivni').focus(); return;  }
var pocetni = document.getElementById('datumOd').value.split('-');
var krajnji = document.getElementById('datumDo').value.split('-');
if(pocetni.length != 3) { document.getElementById('datumOd').focus(); return; }
if(krajnji.length != 3) { document.getElementById('datumDo').focus(); return; }
var godinaOd = pocetni[0];
var mjesecOd = pocetni[1];
var danOd = pocetni[2];
var godinaDo = krajnji[0];
var mjesecDo = krajnji[1];
var danDo = krajnji[2];
var sveGrupe = document.getElementsByClassName('grupa');
var noveGrupe='';
for(l=0, tot=sveGrupe.length; l<tot; l++){
    if(sveGrupe[l].checked) noveGrupe+=sveGrupe[l].value+',';    
}
if(noveGrupe.length > 0) noveGrupe = noveGrupe.substring(0,noveGrupe.length-1);
if(noveGrupe == '') { document.getElementById('sve').focus(); return;}

var formDataUplate ='aktivni=' + aktivni +'&neaktivni=' + neaktivni +'&grupe=' + noveGrupe + '&danPocetni=' + danOd + '&mjesecPocetni=' + mjesecOd + '&godinaPocetna=' + godinaOd + '&danKrajnji=' + danDo + '&mjesecKrajnji=' + mjesecDo + '&godinaKrajnja=' + godinaDo;


var spinner = new Spinner(opts).spin(target);
         
        $.ajax({
            url: "uplate_filter.php",
            type: "GET",
            data: formDataUplate,
            success: function(data, textStatus, jqXHR) {
                ukupniIznos = 0;
                var bivsaTablica = document.getElementById('tablicaUplata');
                var bivsiLink = document.getElementById('ispisUplata');
                var bivsiUkupno = document.getElementById('ukupnoUplata');
                if(bivsaTablica!=null) document.getElementById('content').removeChild(bivsaTablica);
                if(bivsiLink!=null) document.getElementById('content').removeChild(bivsiLink);
                if(bivsiUkupno!=null) document.getElementById('content').removeChild(bivsiUkupno);
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                var popis;
                popis = document.createElement('table');
                popis.className = 'clanovi';
                    var inner = '<tr>'
                    inner += '<th>R.br.</th><th>Datum</th><th>Vrijedi do</th><th>Naziv programa</th><th>Šifra</th><th>Ime</th><th>Prezime</th><th>Način plaćanja</th><th>Iznos</th><th>Grupa</th>'; 
                    inner += '</tr>';
                var uplate = JSON.parse(data).uplate;
                    for (var i = 0; i < uplate.length; i++) {
                      var sifUplata = uplate[i].sifUplata;
                      var datum = uplate[i].datum;
                      var datumDo = uplate[i].datumDo;
                      var nazivProgram = uplate[i].nazivProgram;
                      var sifClan = uplate[i].sifClan;
                      var ime = uplate[i].ime;
                      var prezime = uplate[i].prezime;
                      var nazivPlacanja = uplate[i].nazivPlacanja;
                      var iznos = uplate[i].iznos;
                      ukupniIznos += iznos;
                      var grupa = uplate[i].grupa;
                      inner +='<tr>';
                        var unutarnje='<td>' + sifUplata + '</td>' + '<td>' + datum + '</td>' + '<td>' + datumDo + '</td>' + '<td>' + nazivProgram + '</td>' + '<td>' + sifClan + '</td>' + '<td>' + ime + '</td>' + '<td>' + prezime + '</td>' + '<td>' + nazivPlacanja + '</td>' + '<td>' + iznos + '</td>' + '<td>' + grupa + '</td>';
                        
                        inner += unutarnje + '</tr>'; 

            }
             popis.innerHTML = inner;
             popis.id = 'tablicaUplata';
             document.getElementById('content').appendChild(popis);
             var ukupno = document.createElement('label');
             ukupno.innerHTML = 'Ukupni iznos uplata za ovo razdoblje je: ' + ukupniIznos;
             ukupniIznosIspis = '<label>Ukupni iznos uplata za ovo razdoblje je: ' + ukupniIznos + '</label>';
             ukupno.id = 'ukupnoUplata';
             var ispis = document.createElement('label');
             ispis.className = 'linkLabelVisibleDesno';
             ispis.onclick = function(){ ispisiUplate(); } ; 
             ispis.innerHTML = 'Ispis';
             ispis.id = 'ispisUplata';
             document.getElementById('content').appendChild(ukupno);
             document.getElementById('content').appendChild(ispis);
            
           }
        });


}

function ispisiUplate(){
      var mywindow = window.open('', 'PRINT', 'height=800,width=1200');


        mywindow.document.write('<html><head><title>' + 'Uplate'  + '</title> <link rel="stylesheet" type="text/css" href="dizajn/dizajn_ispisa.css" />');
        mywindow.document.write('</head><body>');
      mywindow.document.write('<h1>' + 'Uplate'  + '</h1>');
        mywindow.document.write('<table>'+document.getElementById('tablicaUplata').innerHTML+'</table>'+'<br>'+ukupniIznosIspis);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); 
        mywindow.focus(); 

        mywindow.print();
        mywindow.close();


        return true;

        }
