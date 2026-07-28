document.addEventListener('DOMContentLoaded', function() {
  // RFI form on Area of Study pages
  document.getElementById('tfa_14').addEventListener('change', toggle_CE_related);
  document.getElementById('tfa_66').addEventListener('change', toggle_PLA_related);
  document.getElementById('tfa_67').addEventListener('change', toggle_PLA_related);

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
});
                

// custom phone check moved here, from inline after input tfa_5
//if(typeof wFORMS != 'undefined') {
//  if(wFORMS.behaviors.validation) {
//    wFORMS.behaviors.validation.rules['customtfa_5'] =  { selector: '*[id="tfa_5"]', check: 'validateCustom'};
//    wFORMS.behaviors.validation.messages['customtfa_5'] = "Please enter a number in this format xxx-xxx-xxxx";
//  }
// }

// look for CE related fields
function toggle_CE_related() {
    const selectedValue = this.value;
    const targetField = document.getElementById('tfa_59');

    if (['tfa_42', 'tfa_43', 'tfa_44', 'tfa_45', 'tfa_46', 'tfa_81'].includes(selectedValue)) {
        targetField.value = true;
    } else {
        targetField.value = false;
    }
};

// show PLA related field
function toggle_PLA_related() {
    const selected = document.querySelector('input[name="tfa_65"]:checked');
    const target = document.getElementById('tfa_70-D');
	
  if (!target) return;
    target.style.display =
      (selected && selected.value === 'tfa_66')
    	? 'block'
    	: 'none';
}

  
 // changed 2026-07-28 jdb 
 //   if (selectedValue === 'tfa_66') {
 //       targetElement.style.display = 'block';
 //   } else {
 //       targetElement.style.display = 'none';
 //   }
  
// show PLA related field on 2026 secondary form
function toggle_CPL_related() {
    const selected = document.querySelector('input[name="tfa_121"]:checked');
    const target = document.getElementById('tfa_130');

    if (!target) return;
        target.style.display =
            (selected && selected.value === 'tfa_122')
                ? 'block'
                : 'none';
}



// from original TFA script in <body> and <div class="codesection" id="code-(formid)">


// set the URL in the hidden field
function setCurrentUrlInHiddenField() {
  ["tfa_19", "tfa_139"].forEach(function(id) {
    var input = document.getElementById(id);
    if (input) {
      input.value = window.location.href;
    }
  });
}


// wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", setCurrentUrlInHiddenField);












