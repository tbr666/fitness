 $(document).ready(function() {

          var last_valid_selection = null;

          $("#pravo").change(function(event) {

            if ($(this).val().length > 1) {

              $(this).val(last_valid_selection);
            } else {
              last_valid_selection = $(this).val();
            }
          });
        });