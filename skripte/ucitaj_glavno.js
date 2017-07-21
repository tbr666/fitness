var emailRodendani = [];
var emailIsteci = [];
var nizRodendani = '';
var nizIsteci = '';
var existsTextAreaLijevi = '';
var existsTextAreaDesni = '';
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

ucitajRodendane();

function ucitajRodendane() {
  
        var spinner = new Spinner(opts).spin(target);
        
        $.ajax({
            url: "clanovi_rodendan.php",
            type: "GET",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.href='odjava.php';
                    return;
                }
                ucitajIsteke();
                var clanovi = JSON.parse(data).clanovi;
                var rodendani;
                if (clanovi.length > 0) {
                    rodendani = document.createElement('table');
                    var inner = '<tr>'
                    inner += '<th>Ime</th><th>Prezime</th><th>Broj telefona</th><th>Email</th>'; 
                    inner += '</tr>';
                    for (var i = 0; i < clanovi.length; i++) {
                        var ime = clanovi[i].ime;
                        var prezime = clanovi[i].prezime;
                        var brTel = clanovi[i].brTel;
                        var email = clanovi[i].email;
                        inner +='<tr>';
                        if (ime == null) ime = '';
                        if (prezime == null) prezime = '';
                        if (brTel == null) brTel = '';
                        if (email == null) brTel = '';
                        inner +='<td>' + ime + '</td>' + '<td>' + prezime + '</td>' + '<td>' + brTel + '</td>' + '<td>' + email + '</td>';
                        emailRodendani.push(email);
                        nizRodendani += email + ';\r\n';
                        inner +='</tr>';
                    }
                    rodendani.innerHTML = inner;
                    var prikaz = document.createElement('label');
                    prikaz.className = 'linkLabelVisible';
                    prikaz.innerHTML = 'Prikaži email adrese';
                    prikaz.onclick = function(){ prikaziRodendane(); } ;
                    var ispis = document.createElement('label');
                    ispis.className = 'linkLabelVisibleDesno';
                    ispis.innerHTML = 'Ispiši email adrese';
                    ispis.onclick = function(){ ispisiRodendane(); } ;
                }
                else {
                    rodendani = document.createElement('h3');
                    rodendani.innerHTML = 'Nema rođendana na ovaj dan';
                }
                document.getElementById('lijevi').appendChild(rodendani);
                if (clanovi.length > 0) {
                    document.getElementById('lijevi').appendChild(document.createElement('br'));
                    document.getElementById('lijevi').appendChild(document.createElement('br'));
                    document.getElementById('lijevi').appendChild(prikaz);
                    document.getElementById('lijevi').appendChild(ispis);
                }
            }
        });


  }

function ucitajIsteke() {

        var spinner = new Spinner(opts).spin(target);

        $.ajax({
            url: "clanovi_istice_u_tjednu.php",
            type: "GET",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var clanovi = JSON.parse(data).clanovi;
                var istekli;
                if (clanovi.length > 0) {
                    istekli = document.createElement('table');
                    var inner = '<tr>'
                    inner += '<th>Ime</th><th>Prezime</th><th>Broj telefona</th><th>Email</th><th>Datum isteka</th><th>Grupa</th>'; 
                    inner += '</tr>';
                    for (var i = 0; i < clanovi.length; i++) {
                        var ime = clanovi[i].ime;
                        var prezime = clanovi[i].prezime;
                        var brTel = clanovi[i].brTel;
                        var email = clanovi[i].email;
                        var datum = clanovi[i].datum;
                        var grupa = clanovi[i].grupa;
                        inner +='<tr>';
                        if (ime == null) ime = '';
                        if (prezime == null) prezime = '';
                        if (brTel == null) brTel = '';
                        if (email == null) email = '';
                        if (datum == null) datum = '';
                        if (grupa == null) grupa = '';
                        inner +='<td>' + ime + '</td>' + '<td>' + prezime + '</td>' + '<td>' + brTel + '</td>' + '<td>' + email + '</td>' + '<td>' + datum + '</td>' + '<td>' + grupa + '</td>';
                        emailIsteci.push(email);
                        nizIsteci += email + ';\r\n';
                        inner +='</tr>';
                    }
                    istekli.innerHTML = inner;
                    var prikaz = document.createElement('label');
                    prikaz.className = 'linkLabelVisible';
                    prikaz.innerHTML = 'Prikaži email adrese';
                    prikaz.onclick = function(){ prikaziIsteke(); } ;
                    var ispis = document.createElement('label');
                    ispis.className = 'linkLabelVisibleDesno';
                    ispis.innerHTML = 'Ispiši email adrese';
                    ispis.onclick = function(){ ispisiIsteke(); } ;
                }
                else {
                    istekli = document.createElement('h3');
                    istekli.innerHTML = 'Nema članarina koje ističu ovaj tjedan';
                }
                document.getElementById('desni').appendChild(istekli);
                if (clanovi.length > 0) {
                    document.getElementById('desni').appendChild(document.createElement('br'));
                    document.getElementById('desni').appendChild(document.createElement('br'));
                    document.getElementById('desni').appendChild(prikaz);
                    document.getElementById('desni').appendChild(ispis);
                }
            }
        });

}

function ispisiRodendane(){
      var mywindow = window.open('', 'PRINT', 'height=800,width=1200');


        mywindow.document.write('<html><head><title>' + 'Rođendani'  + '</title><link rel="stylesheet" type="text/css" href="dizajn/dizajn_ispisa.css" />');

        mywindow.document.write('</head><body >');
      mywindow.document.write('<h1>' + 'Rođendani'  + '</h1>');
       mywindow.document.write('<table class="narrow"><tr><th>Adresa</th><tr><td>'+emailRodendani.join('</td></tr><tr><td>')+'</td></tr></table>');
        mywindow.document.write('</body></html>');

        mywindow.document.close(); 
        mywindow.focus(); 

        mywindow.print();
        mywindow.close();


        return true;

        }

function ispisiIsteke(){
      var mywindow = window.open('', 'PRINT', 'height=800,width=1200');


        mywindow.document.write('<html><head><title>' + 'Isteci članarina'  + '</title> <link rel="stylesheet" type="text/css" href="dizajn/dizajn_ispisa.css" />');

        mywindow.document.write('</head><body >');
      mywindow.document.write('<h1>' + 'Isteci članarina'  + '</h1>');
        mywindow.document.write('<table class="narrow"><tr><th>Adresa</th><tr><td>'+emailIsteci.join('</td></tr><tr><td>')+'</td></tr></table>');
        mywindow.document.write('</body></html>');

        mywindow.document.close(); 
        mywindow.focus(); 

        mywindow.print();
        mywindow.close();


        return true;

        }

function prikaziIsteke() {

if(!existsTextAreaDesni) {
               var input = document.createElement("textarea");
               input.id='adreseDesni';
               input.cols = "40";
               input.rows = "20";
               document.getElementById('desni').appendChild(document.createElement('br'));
               document.getElementById('desni').appendChild(document.createElement('br'));
               document.getElementById('desni').appendChild(input);
               existsTextAreaDesni = true;
             }
             document.getElementById('adreseDesni').cols = '50';
             document.getElementById('adreseDesni').innerHTML = nizIsteci;
             window.scrollTo(0,document.body.scrollHeight);


}

function prikaziRodendane() {

 if(!existsTextAreaLijevi) {
               var input = document.createElement("textarea");
               input.id='adreseLijevi';
               input.cols = "40";
               input.rows = "10";
               document.getElementById('lijevi').appendChild(document.createElement('br'));
               document.getElementById('lijevi').appendChild(document.createElement('br'));
               document.getElementById('lijevi').appendChild(input);
               existsTextAreaLijevi = true;
             }
             document.getElementById('adreseLijevi').cols = '50';
             document.getElementById('adreseLijevi').innerHTML = nizRodendani;
             window.scrollTo(0,document.body.scrollHeight);



}

