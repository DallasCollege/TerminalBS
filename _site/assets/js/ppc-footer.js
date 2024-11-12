document.querySelectorAll('.btnrequestinfo').forEach(function(button) {
    button.addEventListener('click', function() {
        // Scroll to the formbox and offset by 100px
        var formbox = document.getElementById('formbox');
        window.scrollTo({
            top: formbox.offsetTop - 100,
            behavior: 'smooth' // Smooth scroll
        });

        // Display sr-only alert
        var formAlert = document.getElementById('formalert-aria');
        formAlert.style.display = 'block';
    });
});

document.querySelectorAll('.btnrequestinfo').forEach(function(button) {
    button.addEventListener('click', function(event) {
        // Focus the first visible, enabled input inside the form

        var form = document.querySelector('.tfablinkform');
        var inputs = form.querySelectorAll('input, select, textarea');
        var firstVisibleEnabledInput = null;

        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            if (!input.disabled && input.offsetParent !== null) { // Check if the input is enabled and visible
                firstVisibleEnabledInput = input;
                break;
            }
        }

        if (firstVisibleEnabledInput) {
            firstVisibleEnabledInput.focus();
        }

        // Blink the form fields
        setTimeout(function() {
            blinkFormInputs(document.getElementById('formbox'));
        }, 1000);
    });
});

function blinkFormInputs(form) {
    var elements = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], select');
    elements.forEach(function(element) {
        element.classList.add('blink-inputs');
    });

    // Remove the blink effect after 2 seconds
    setTimeout(function() {
        elements.forEach(function(element) {
            element.classList.remove('blink-inputs');
        });
    }, 2000);
}



/*
$('.btnrequestinfo').on('click', function() {
    $('html,body').animate({
        scrollTop: $("#formbox").offset().top - 100
    }, 800); // original slower scroll: 1300
    // display sr-only alert, reading the message within and indicating that the first form field is now in focus
    $('#formalert-aria').show();
});

$('.btnrequestinfo').on('click', function(event) {
    //focus the first field in form
    $('.tfablinkform :input:enabled:visible:first').focus();
    //$("#amf-input-first_name_134").focus();
    // blink fields
    setTimeout(function() {
        blinkFormInputs($('#formbox'));
    }, 1300);
});

function blinkFormInputs(form) {
    var elemns = $(form).find('input[type="text"], input[type="email"], input[type="tel"], select');
    $(elemns).addClass('blink-inputs');
    // remove animation after 2 seconds
    setTimeout(function() {
        $(elemns).removeClass('blink-inputs');
    }, 2000);
}
*/
