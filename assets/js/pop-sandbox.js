// Trigger modal on button click
document.getElementById('RMIbutton').addEventListener('click', function () {
  var formnode = document.getElementById("formbox");
  formnode.classList.remove("extra-padding-2");
  var formcontainer = document.getElementById("popformcontainer");
  var formclone = formnode.cloneNode(true);
  var modalnode = document.getElementById("modal-form-content");

  //clear content of modal node
  while (modalnode.firstChild) {
    modalnode.removeChild(modalnode.firstChild);
  }
  //insert clone into modal
  modalnode.appendChild(formclone);
  //clear content of form node
  while (formcontainer.firstChild) {
    formcontainer.removeChild(formcontainer.firstChild);
  }
});

//listen for when modal is closed
var myModal = document.getElementById('RMIModal');
myModal.addEventListener('hidden.bs.modal', function (event) {
  var modalnode = document.getElementById("formbox");
  modalnode.classList.add("extra-padding-2");
  var modalclone = modalnode.cloneNode(true);
  var formnode = document.getElementById("popformcontainer");
//console.log(modalclone);
  //clear content of form node
  while (formnode.firstChild) {
    formnode.removeChild(formnode.firstChild);
  }
  //insert clone into form area
  formnode.appendChild(modalclone);
});
