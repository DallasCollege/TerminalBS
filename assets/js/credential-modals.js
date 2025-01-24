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
                    '<div class="acalog" data-acalog-data="programs" data-acalog-catalog-legacy-id="2" data-acalog-program-id="' + programId + '">Loading...</div>');
                    // Re-initialize acalogWidgetize for the new content
                    $('.acalog').acalogWidgetize({
                        gateway: 'https://catalog.dallascollege.edu',
                    });

            $('#CredentialModal').modal('show');
            } else if (ed2go === 'yes') {
                $('#CredentialModal .modal-body').html(
                    '<div>Ed2Go is a partnership with Dallas College offering online CE. You can find certificates at <a href="https://www.ed2go.com">ed2go.com</a></div>');
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
