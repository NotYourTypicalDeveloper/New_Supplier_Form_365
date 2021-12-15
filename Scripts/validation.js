var $mainForm = $("#newsupp-form");
$(document).ready(function () {
    console.log('validation.js is connected');

    $mainForm.validate({
        rules: {
            employee_name: {
                required: true,
                minlength: 7

            },
            reviewer: "required",
            category: "required",
            one_off: "required",

            service_type: "required",
            bauer_location_question: "required",
            tax_NI: "required",
            bauer_equip: "required",
            fix_perm: "required",
            supplier_name: "required",
            supplier_phone: {
                required: true
            },
            supplier_email: {
                required: true,
                email: true
            },
            supplier_address: "required",
            supplier_postcode: "required",
            payment_address: "required",
            payment_postcode: "required",
            CRN: "required",
            VAT_number: "required",
            self_billing_question: "required",
            foreign_perf_question: "required",
            currency: "required",
            other_currency: "required",

            CEST_question: "required",
            IT_contractor_question: "required",
            diversity_question: "required",
            diversity_date: "required",
            deliverables_input: "required",
            uk_citizen: "required",
            authorized_work: "required",
            ever_worked_Bauer: "required",
            ever_worked_date: "required",

            contractor_name: "required",
            job_title: "required",
            start_date: "required",
            end_date: "required",
            notice_period: "required",
            day_rate: "required",
            hours: "required",
            services: "required",
            other_info: "required",
            contract_length: "required",
            agency_name: "required",
            agency_address: "required",
            agency_contact: "required",
            CEST_radiopres_question: "required",
            IRC_completion_date: "required",

            payee_name: "required",
            bank_name: "required",

            bank_account_number: {
                required: true,
                number: true,
                minlength: 8,
                maxlength: 10,
            },

            bank_address: "required",

            sort_code: {
                required: true,
                number: true,
                minlength: 6,
                maxlength: 6,
            },

            roll_number: "required",
            purchases_desc: "required",
            IBAN: "required",
            BIC_code: "required"

        },

        messages: {
            employee_name: "You must enter and select a valid Bauer employee",
            reviewer: "Please select a reviewer from the list",
            supplier_email: "Please ensure the email address is in the correct format",
            start_date: "Please pick a date",
            end_date: "Please pick a date",

        },
        
        submitHandler: function () {
            createListItem();
          },

          invalidHandler: function (event, validator) {
            var errorDiv = $('#error-msg');
            var errors = validator.numberOfInvalids();
            if (errors) {
              errorDiv.html('PLEASE CHECK THE ' + errors + ' ERROR(S) HIGHLIGHTED IN RED').show();
            } else {
              errorDiv.hide();
            }
          }

    });
});

