document.addEventListener('DOMContentLoaded', function() {
  // RFI form on Area of Study pages
  document.getElementById('tfa_14').addEventListener('change', toggle_CE_related);
  document.getElementById('tfa_122').addEventListener('change', toggle_CPL_related);
  document.getElementById('tfa_123').addEventListener('change', toggle_CPL_related);

//applies the automask/format to the phone field
const phoneInput = document.getElementById('tfa_5');
if (phoneInput) {
  phoneInput.addEventListener('input', function (e) {
    let val = e.target.value.replace(/\D/g, '').substring(0, 10);
    if (val.length >= 7) {
      val = val.replace(/(\d{3})(\d{3})(\d{1,4})/, '$1-$2-$3');
    } else if (val.length >= 4) {
      val = val.replace(/(\d{3})(\d{1,3})/, '$1-$2');
    }
    e.target.value = val;
  });
}

  const firstNameInput = document.getElementById('tfa_2');
  const lastNameInput = document.getElementById('tfa_3');

  const formbox = document.getElementById('formbox');
  const form = formbox ? formbox.querySelector('form') : null;

  // double check fields are present
  if (form && !form.contains(firstNameInput)) {
    console.warn('Form found in #formbox does not contain expected inputs');
  }  
  
  // prior definition, too vague and conflicted with search form : const form = document.querySelector('form');
  const submitButton = form.querySelector('[type="submit"]');
  if (!firstNameInput || !lastNameInput || !form || !submitButton) return;
  const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;

  function looksSuspicious(name) {
    const vowelCount = (name.match(/[aeiou]/gi) || []).length;
    const totalLength = name.length;
    if (totalLength <= 3) return false;
    if (vowelCount === 0) return true;
    // if (/[A-Z]{4,}/.test(name)) return true;
    if (/([a-z][A-Z]){2,}/.test(name)) return true;
    return false;
  }

  function validateField(input, fieldId) {
    const value = input.value.trim();
    const errorSpanId = `${fieldId}-error`;
    let errorSpan = document.getElementById(errorSpanId);
    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.id = errorSpanId;
      errorSpan.style.color = 'red';
      errorSpan.style.fontSize = '0.9em';
      errorSpan.style.display = 'block';
      errorSpan.style.marginTop = '4px';
      input.insertAdjacentElement('afterend', errorSpan);
    }
    if (!nameRegex.test(value)) {
      errorSpan.textContent = 'Invalid format.';
      return false;
    } else if (looksSuspicious(value)) {
      errorSpan.textContent = 'Please enter a valid name.';
      return false;
    } else {
      errorSpan.textContent = '';
      return true;
    }
  }

  function checkFormValidity() {
    const firstValid = validateField(firstNameInput, 'tfa_2');
    const lastValid = validateField(lastNameInput, 'tfa_3');
    submitButton.disabled = !(firstValid && lastValid);
  }
  firstNameInput.addEventListener('input', checkFormValidity);
  lastNameInput.addEventListener('input', checkFormValidity);
  form.addEventListener('submit', function(event) {
    const firstValid = validateField(firstNameInput, 'tfa_2');
    const lastValid = validateField(lastNameInput, 'tfa_3');
    if (!firstValid || !lastValid) {
      alert('Please enter a valid name');
      event.preventDefault();
    }
  });
  
  //submitButton.disabled = false;
  // initial on load only
  document.getElementById('submit_button').disabled = true;
  toggle_CPL_related();
});
                

// show PLA related field on 2026 secondary form
function toggle_CPL_related() {
    const selected = document.querySelector('input[name="tfa_121"]:checked');
    const target = document.getElementById('tfa_130-D');

    if (!target) return;
        target.style.display =
            (selected && selected.value === 'tfa_122')
                ? 'block'
                : 'none';
}



// from original TFA script in <body> and <div class="codesection" id="code-(formid)">


// set the URL in the hidden field
function setCurrentUrlInHiddenField() {
    const input = document.querySelector('input[name="tfa_139"]');

    if (input) {
        input.value = window.location.href;
    }
}

// wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", setCurrentUrlInHiddenField);