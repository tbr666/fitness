$(document).ready(function() {

          
          var last_valid_selection_grupa = null;
          $("#grupa").change(function(event) {
            
            if ($(this).val().length > 1) {

              $(this).val(last_valid_selection_grupa);
            } else {
              last_valid_selection_grupa = $(this).val();
            }
          });
          var last_valid_selection_nacin = null;
          $("#nacin").change(function(event) {
            
            if ($(this).val().length > 1) {

              $(this).val(last_valid_selection_nacin);
            } else {
              last_valid_selection_nacin = $(this).val();
            }
          });
          var last_valid_selection_vrsta = null;
          $("#vrstaPrograma").change(function(event) {
            
            if ($(this).val().length > 1) {

              $(this).val(last_valid_selection_vrsta);
            } else {
              last_valid_selection_vrsta = $(this).val();
            }
          });

        });