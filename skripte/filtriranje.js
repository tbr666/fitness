document.getElementById("filtriranje").style.color = 'red';
document.getElementById("filtriranje").removeAttribute("href");
document.getElementById("filtriranje").className = 'notWorking';
$( function() {
    $('#datumOd').datepicker({
				inline: true,
				showOtherMonths: true,
				dateFormat: 'yy-mm-dd',
				dayNamesMin: ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'],
			});
    $('#datumDo').datepicker({
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
var niz;
var inner;
var existsTextArea = false;

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
            document.getElementById('section').appendChild(document.createElement('br'));
            var dohvatiAdrese = document.createElement('button');
            dohvatiAdrese.className = 'commonButton';
            dohvatiAdrese.onclick = function(){ adrese(); } ;
            dohvatiAdrese.innerHTML = 'Dohvati adrese';
            document.getElementById('section').appendChild(dohvatiAdrese);
            var dohvatiPodatke = document.createElement('button');
            dohvatiPodatke.className = 'commonButton';
            dohvatiPodatke.onclick = function(){ podaci(); } ;;
            dohvatiPodatke.innerHTML = 'Dohvati podatke'; 
            document.getElementById('section').appendChild(dohvatiPodatke);
            
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

function adrese() {


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

var formDataEmail ='aktivni=' + aktivni +'&neaktivni=' + neaktivni +'&grupe=' + noveGrupe + '&danPocetni=' + danOd + '&mjesecPocetni=' + mjesecOd + '&godinaPocetna=' + godinaOd + '&danKrajnji=' + danDo + '&mjesecKrajnji=' + mjesecDo + '&godinaKrajnja=' + godinaDo;


var spinner = new Spinner(opts).spin(target);
        
        $.ajax({
            url: "email_filter.php",
            type: "GET",
            data: formDataEmail,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                niz = '';
                inner = '<tr><th>Adresa</th></tr>';
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                var dohvaceneAdrese = JSON.parse(data).adrese;
                    for (var i = 0; i < dohvaceneAdrese.length; i++) {
                      var email = dohvaceneAdrese[i];
                      if(email!=null && email!=undefined) {
                        niz += email +';\r\n';
                        inner += '<tr><td>' + email + ';</td></tr>';
                      }
                        
            }
             if(!existsTextArea) {
               var input = document.createElement("textarea");
               input.id='adrese';
               input.cols = "40";
               input.rows = "40";
               document.getElementById('section').appendChild(document.createElement('br'));
               document.getElementById('section').appendChild(document.createElement('br'));
               document.getElementById('section').appendChild(document.createElement('br'));
               document.getElementById('section').appendChild(input);
               var ispis = document.createElement('label');
               ispis.className = 'linkLabelVisible';
               ispis.innerHTML = 'Ispis';
               ispis.onclick = function(){ ispisiAdrese(); } ;
               document.getElementById('section').appendChild(document.createElement('br'));
               document.getElementById('section').appendChild(document.createElement('br'));
               document.getElementById('section').appendChild(ispis);
               existsTextArea = true;
             }
             document.getElementById('adrese').cols = '60';
             document.getElementById('adrese').innerHTML = niz;
             window.scrollTo(0,document.body.scrollHeight);


            
           }
        });

}

function podaci() {

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

var formDataPodaci ='aktivni=' + aktivni +'&neaktivni=' + neaktivni +'&grupe=' + noveGrupe + '&danPocetni=' + danOd + '&mjesecPocetni=' + mjesecOd + '&godinaPocetna=' + godinaOd + '&danKrajnji=' + danDo + '&mjesecKrajnji=' + mjesecDo + '&godinaKrajnja=' + godinaDo;


var spinner = new Spinner(opts).spin(target);
       
        $.ajax({
            url: "podaci_filter.php",
            type: "GET",
            data: formDataPodaci,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                niz = '';
                inner = '<tr><th>Ime</th><th>Prezime</th><th>Email</th><th>Telefon</th></tr>';
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                var dohvaceniPodaci = JSON.parse(data).clanovi;
                    for (var i = 0; i < dohvaceniPodaci.length; i++) {
                      var ime = dohvaceniPodaci[i].ime;
                      var prezime = dohvaceniPodaci[i].prezime;
                      var email = dohvaceniPodaci[i].email;
                      var brTel = dohvaceniPodaci[i].brTel;
                       niz+= ime+' '+prezime+' '+email+' '+brTel+';\r\n';
                      inner+='<tr><td>' + ime +'</td>' + '<td>' + prezime + '</td>' + '<td>' + email + '</td>' + '<td>' + brTel + '</td></tr>';
            }
             if(!existsTextArea) {
               var input = document.createElement("textarea");
               input.id='adrese';
               input.cols = "60";
               input.rows = "40";
               document.getElementById('section').appendChild(document.createElement('br'));
               document.getElementById('section').appendChild(document.createElement('br'));
               document.getElementById('section').appendChild(document.createElement('br'));
               document.getElementById('section').appendChild(input);
               existsTextArea = true;
               var ispis = document.createElement('label');
               ispis.className = 'linkLabelVisible';
               ispis.innerHTML = 'Ispis';
               ispis.onclick = function(){ ispisiPodatke(); } ;
               document.getElementById('section').appendChild(document.createElement('br'));
               document.getElementById('section').appendChild(document.createElement('br'));
               document.getElementById('section').appendChild(ispis);
             }
             document.getElementById('adrese').cols = '100';
             document.getElementById('adrese').innerHTML = niz;
             window.scrollTo(0,document.body.scrollHeight);
            
            
           }
        });


}

function ispisiPolje(){
      var mywindow = window.open('', 'PRINT', 'height=800,width=1200');


        mywindow.document.write('<html><head><title>' + document.title  + '</title> <link rel="stylesheet" type="text/css" href="dizajn/dizajn_ispisa.css" />');

        mywindow.document.write('</head><body >');
      mywindow.document.write('<h1>' + document.title  + '</h1>');
        mywindow.document.write(niz);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); 
        mywindow.focus(); 

        mywindow.print();
        mywindow.close();


        return true;

        }

function ispisiAdrese(){
      var mywindow = window.open('', 'PRINT', 'height=800,width=1200');


        mywindow.document.write('<html><head><title>' + 'Email adrese'  + '</title> <link rel="stylesheet" type="text/css" href="dizajn/dizajn_ispisa.css" />');

        mywindow.document.write('</head><body >');
      mywindow.document.write('<h1>' + 'Email adrese'  + '</h1>');
        mywindow.document.write('<table class="narrow">'+inner+'</table>');
        mywindow.document.write('</body></html>');

        mywindow.document.close(); 
        mywindow.focus(); 

        mywindow.print();
        mywindow.close();


        return true;

        }

function ispisiPodatke(){
      var mywindow = window.open('', 'PRINT', 'height=800,width=1200');


        mywindow.document.write('<html><head><title>' + 'Članovi'  + '</title> <link rel="stylesheet" type="text/css" href="dizajn/dizajn_ispisa.css" />');

        mywindow.document.write('</head><body >');
      mywindow.document.write('<h1>' + 'Članovi'  + '</h1>');
        mywindow.document.write('<table class="middle">'+inner+'</table>');
        mywindow.document.write('</body></html>');

        mywindow.document.close(); 
        mywindow.focus(); 

        mywindow.print();
        mywindow.close();


        return true;

        }



