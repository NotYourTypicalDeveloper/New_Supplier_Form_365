$(document).ready(function () {
    console.log('new-supplier-form.js is connected');
})

var $supplierSection = $('#supplier-extender-section');
var $oneOffDD = $('#oneoff'); // one-off supplier drop down
var $oneOffSelectedOption = $('#oneoff option:selected').text();
var $categoryDD = $('#category');
var $freelancerSection = $('#freelancer-section');

var $currencyDD = $('#currency-input');
var $otherCurrInp = $('#other-currency-wrapper');

var $CESTquestionDD = $('#CEST-question');
var $CESTFullSection = $('#CEST-extender-form');

// Is it an IT Contractor drop down
var $ITContractorDD = $('#IT_Contractor-question');
var $ITContractorSection = $('#ITContractor-questions-section');

// Ever worked for Bauer
var $EverWorkedForBauerDD = $('#ever-worked-for-Bauer');
// if yes, when
var $everWorkedDate = $('#ever-worked-date-wrapper');

var $IRC35Question = $('#CEST-radiopres-question');
var $IRC35Date = $('#IRC35-date-wrapper');




// Functions to toggle hide or show of certain sections depending on which option is selected

// Show, if selected option = "YES"
function showHide(selectedOption, choice, section) {
    if (selectedOption === choice) {
        section.css('display', 'flex');
        section.show();
    } else {
        section.hide();
    }
}


// ______ON CHANGE EVENTS - Hide/Show sections 

// if One-Off supplier = YES, show supplier extender form. If not hide all the sections (Freelancer + supplier)
$oneOffDD.change(function () {
    showHide(this.value, 'No', $supplierSection);
});

// ON CHANGE, show/ hide Freelancer section
$categoryDD.change(function () {
    showHide(this.value, 'Contributor/Freelancer', $freelancerSection);
})

// ON CHANGE, show/hide other currency input
$currencyDD.change(function () {
    showHide(this.value, 'Other', $otherCurrInp);
})

// ON CHANGE, show/hide other CEST section
$CESTquestionDD.change(function () {
    showHide(this.value, 'Yes', $CESTFullSection)
})

$ITContractorDD.change(function () {
    showHide(this.value, 'Yes', $ITContractorSection)
})

$EverWorkedForBauerDD.change(function () {
    showHide(this.value, 'Yes', $everWorkedDate);
})

$IRC35Question.change(function () {
    showHide(this.value, 'Yes', $IRC35Date)
})