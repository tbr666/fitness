function enterPrijaviSe(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { 

        prijaviSe();
    }
}

function prijaviSe() {

    document.getElementById("loginId").blur();
    document.getElementById("password").blur();
    var loginId = document.getElementById("loginId").value;
    var password = document.getElementById("password").value;

    if (loginId == "") {
        document.getElementById("loginId").focus();
    } else if (password == "") {
        document.getElementById("password").focus();
    } else {
        var formData = "loginId=" + loginId + "&lozinka=" + password;
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
        var target = document.getElementById('header');
        var spinner = new Spinner(opts).spin(target);
        
        $.ajax({
            url: "prijava.php",
            type: "GET",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var userName = JSON.parse(data).userName;
                if (userName != null) {
                   window.location.href = 'naslovna_stranica.php';
                } else {
                    swal("Neispravna lozinka ili korisničko ime", "Kombinacija lozinke i korisničko imena nije valjana","warning");
                }
            }
        });
    }
}