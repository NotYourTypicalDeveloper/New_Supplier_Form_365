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




// Functions to toggle hide or show of certain sections depending on which option is selected
// Hide section, if selected option = "YES"
function showIfNo(selectedOption, choice, section) {
    if (selectedOption === choice || selectedOption === '') {
        section.hide()
    } else {
        section.css('display', 'flex'); // otherwise it will display the section as block
        section.show();
    }
}

// Show, if selected option = "YES"
function showIfYes(selectedOption, choice, section) {
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
    showIfNo(this.value, 'Yes', $supplierSection);
});

// ON CHANGE, show/ hide Freelancer section
$categoryDD.change(function () {
    console.log('changed', this.value);
    showIfYes(this.value, 'Contributor/Freelancer', $freelancerSection);
})

// ON CHANGE, show/hide other currency input
$currencyDD.change(function () {
    showIfYes(this.value, 'Other', $otherCurrInp);
})

// ON CHANGE, show/hide other CEST section
$CESTquestionDD.change(function () {
    showIfYes(this.value, 'Yes', $CESTFullSection)
})

$ITContractorDD.change(function () {
    showIfYes(this.value, 'Yes', $ITContractorSection)
})

$EverWorkedForBauerDD.change(function () {
    showIfYes(this.value, 'Yes', $everWorkedDate);
})