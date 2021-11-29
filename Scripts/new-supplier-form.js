$(document).ready(function () {
    console.log('new-supplier-form.js is connected');
})

var $supplierSection = $('#supplier-extender-section');
var $oneOffDD = $('#oneoff'); // one-off supplier drop down
var $oneOffSelectedOption = $('#oneoff option:selected').text();
var $categoryDD = $('#category');
var $freelancerSection = $('#freelancer-section');

var $currencyDD = $('#currency-input');
var $otherCurrInp = $('#other-currency');

// Functions to toggle hide or show of certain sections depending on which option is selected
// Hide section, if selected option = "YES"
function hideIfYes(selectedOption, choice, section) {
    if (selectedOption === choice || selectedOption === '') {
        section.hide()
    } else {
        section.show();
    }
}

// Show, if selected option = "YES"
function showIfYes(selectedOption, choice, section) {
    if (selectedOption === choice) {
        section.show();
    } else {
        section.hide();
    }
}


// ______ON CHANGE EVENTS - Hide/Show sections 

// if One-Off supplier = YES, show supplier extender form. If not hide all the sections (Freelancer + supplier)
$oneOffDD.change(function () {
    hideIfYes(this.value, 'Yes', $supplierSection);
});

// ON CHANGE, show/ hide Freelancer section
$categoryDD.change(function () {
    showIfYes(this.value, 'Contributor/Freelancer', $freelancerSection);
})

// ON CHANGE, show/hide other currency input
$currencyDD.change(function () {
    showIfYes(this.value, 'Other', $otherCurrInp);
})