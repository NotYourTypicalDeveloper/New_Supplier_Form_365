$(document).ready(function () {

    $mainForm.validate({
        rules: {
            employee_name: "required",
            reviewer: "required",
            category: "required",
            one_off: "required",

            service_type: "required",
            bauer_location_question: "required",
            tax_NI: "required",
            bauer_equip: "required",
            fix_perm: "required",
            supplier_name: "required",
            supplier_phone: "required",
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

            location: "required",
            location: "required",
            location: "required",
            location: "required",
            location: "required",
            location: "required",
            location: "required",
            location: "required",
            location: "required",
            location: "required",
            







        },

        messages: {
            employee_name: "You must enter and select a valid Bauer employee",
            reviewer: "Please select a reviewer from the list",
            start_date: "Please pick a date",
        }

    });
});

var $mainForm = $("#newsupp-form");