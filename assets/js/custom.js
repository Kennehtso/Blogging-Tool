(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

function copyToClipboard(id) {
    var copyText = location.origin + "/reader/article?id=" + id;
    navigator.clipboard.writeText(copyText);
    alert(`Copied link to Clipboard : \n ${copyText}.`);
}

function confirmAction(name, action, type) {
    return confirm(`Are you sure you want to *${action.toUpperCase()}* this ${type}: \n '${name}' ?`);
}