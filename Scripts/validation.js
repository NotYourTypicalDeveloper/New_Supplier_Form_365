$(document).ready(function () {
    $mainForm.validate({

        rules: {
            employee_name: "required"
        },
        messages: {
            employee_name: "Please enter your name"
        }
    });
});

var $mainForm = $("#newsupp-form");