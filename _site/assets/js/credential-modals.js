    $(document).ready(function () {
        console.log('Document is ready');
        $('.acalog').acalogWidgetize({
            gateway: 'https://catalog.dallascollege.edu',
        });

        setTimeout(function () {
            $('#jq_resultsContainer').find('.acalog-close').remove();
        }, 10000);
        console.log('Acalog loads');

        // Event listener for links
        $('a.credential').on('click', function (event) {
            event.preventDefault();
            console.log('Link clicked');
            var programId = $(this).attr('cat-id');
            var ed2go = $(this).attr('ed2go');
            var gpsId = $(this).attr('gps-id');

            console.log('programId:', programId);
            console.log('ed2go:', ed2go);
            console.log('gpsId:', gpsId);

            if(programId) {
                $('#CredentialModal .modal-body').html(
                    '<div class="acalog" data-acalog-data="programs" data-acalog-catalog-legacy-id="2" data-acalog-program-legacy-id="' + programId + '">Loading...</div>');
                    // Re-initialize acalogWidgetize for the new content
                    $('.acalog').acalogWidgetize({
                        gateway: 'https://catalog.dallascollege.edu',
                    });

            $('#CredentialModal').modal('show');
            } else if (ed2go === 'yes') {
                $('#CredentialModal .modal-body').html(
                    '<div>Dallas College Continuing Education, in partnership with ed2go, offers a wide range of highly interactive courses that you can take entirely online to advance your skills and knowledge as a lifelong learner. You can find courses and certificates at <a href="https://www.ed2go.com">ed2go.com</a></div>');
            // Planned Code
            // } else if (gpsId) {
            //     $('#CredentialModal .modal-body').html(
            //         '<div><a href="https://www.dallascollege.edu/cd/gps/pages/gpsmap.aspx?gpsId=' + gpsId + '">View the Guided Pathway</a></div>');
            // }
        // Code for Terminalfour Mockup and testing
        } else if (gpsId) {
            $('#CredentialModal .modal-body').html(
                '<embed src="/gps-map-embed.html" width="100%" height=2500px onerror="alert(\'URL invalid !!\');" />');
        }
        // End for Terminalfour Mockup and testing

        });
    });

    // RFI form on Area of Study pages

//    document.addEventListener('DOMContentLoaded', function () {

      // look for CE related fields
      function toggle_CE_related() {
          const selectedValue = this.value;
          const targetField = document.getElementById('tfa_59');

          if (['tfa_42', 'tfa_43', 'tfa_44', 'tfa_45', 'tfa_46'].includes(selectedValue)) {
              targetField.value = true;
          } else {
              targetField.value = false;
          }
      };

      // show PLA related field
      function toggle_PLA_related() {
          const selectedValue = document.querySelector('input[name="tfa_65"]:checked').value;
          const targetElement = document.getElementById('tfa_70-D');

          if (selectedValue === 'tfa_66') {
              targetElement.style.display = 'block';
          } else {
              targetElement.style.display = 'none';
          }
      }

      document.getElementById('tfa_14').addEventListener('change', toggle_CE_related);
      document.getElementById('tfa_66').addEventListener('change', toggle_PLA_related);
      document.getElementById('tfa_67').addEventListener('change', toggle_PLA_related);

//    });

    // End RFI form on Area of Study pages
