$(document).ready(function () {
    console.log('new-supplier-form.js is connected');
})

var $employeeDetails = $('#employeeDetails');
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

//diversity question
var $diversityQuestion = $('#diversity-question');

// diversity date
var $diverDateSection = $('#diversity-date-wrapper');

// Ever worked for Bauer
var $EverWorkedForBauerDD = $('#ever-worked-for-Bauer');
// if yes, when
var $everWorkedDate = $('#ever-worked-date-wrapper');

var $IRC35Question = $('#CEST-radiopres-question');
var $IRC35Date = $('#IRC35-date-wrapper');

var $employeeInput = $('#typeAhead');

// Employee details table
var $empManager = $('#emp-manager');
var $empDivision = $('#emp-division');
var $empOffice = $('#emp-office');
var $empPhone = $('#emp-phone');
var $empCC = $('#emp-CC');

var $reviewerInput = $('#reviewer-input');
var $censhareInput = $('#CenshareDC5');


// Functions to toggle hide or show of certain sections depending on which option is selected

// Show, if selected option = "YES"
function showHide(selectedOption, choice, section, displayType) {
    if (selectedOption === choice) {
        section.css('display', displayType);
        section.show();
    } else {
        section.hide();
    }
}


// ______ON CHANGE EVENTS - Hide/Show sections 

// if One-Off supplier = YES, show supplier extender form. If not hide all the sections (Freelancer + supplier)
$oneOffDD.change(function () {
    showHide(this.value, 'No', $supplierSection, 'flex');
});

// ON CHANGE, show/ hide Freelancer section
$categoryDD.change(function () {
    showHide(this.value, 'Contributor/Freelancer', $freelancerSection, 'flex');
})

// ON CHANGE, show/hide question
$diversityQuestion.change(function () {
    showHide(this.value, 'Yes', $diverDateSection, 'block')
})

// ON CHANGE, show/hide other currency input
$currencyDD.change(function () {
    showHide(this.value, 'Other', $otherCurrInp, 'flex');
})

// ON CHANGE, show/hide other CEST section
$CESTquestionDD.change(function () {
    showHide(this.value, 'Yes', $CESTFullSection, 'flex')
})

$ITContractorDD.change(function () {
    showHide(this.value, 'Yes', $ITContractorSection, 'flex')
})

$EverWorkedForBauerDD.change(function () {
    showHide(this.value, 'Yes', $everWorkedDate, 'block');
})

$IRC35Question.change(function () {
    showHide(this.value, 'Yes', $IRC35Date)
})

///////////////////// Typeahead /////////////////////


// SET Typeahead
function setTypeAhead() {
    console.log("setting typeahead...");
    var clientContext = new SP.ClientContext("https://bauer.sharepoint.com/sites/mds/");
    var oList = clientContext.get_web().get_lists().getByTitle('MDSData');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
        '<View><Query><Where><Eq><FieldRef Name=\'Title\'/>' +
        '<Value Type=\'Text\'>ADUsers</Value></Eq></Where></Query></View>'
    );
    collListItem = oList.getItems(camlQuery);
    clientContext.load(collListItem);
    clientContext.executeQueryAsync(
        Function.createDelegate(this, typeAheadonQuerySucceeded),
        Function.createDelegate(this, typeAheadonQueryFailed)
    );
}

function typeAheadonQuerySucceeded(sender, args, targetField) {
    var listItemEnumerator = collListItem.getEnumerator();
    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        employeesJSONString = oListItem.get_item('JSON');
        employeesJSON = JSON.parse(employeesJSONString);

        //Enable typeahead on Recruiting Manager name field
        EnableEmployeeTypeAhead($employeeInput);

        console.log("Typeahead enabled successfully... yay");
    }
}

function typeAheadonQueryFailed(sender, args) {
    alert('Failed to get employees ' + args.get_message() + '\n' + args.get_stackTrace());
}

function EnableEmployeeTypeAhead(target) {

    // Constructing the suggestion engine
    employees = new Bloodhound({
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.DisplayName);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: employeesJSON
    });

    employees.initialize();

    // Initializing the employees typeahead
    target.typeahead(null, {
        display: 'DisplayName',
        source: employees,
        limit: 15,
        templates: {
            empty: [
                '<div style="background-color: #fdf9dd; font-weight: bold" class="empty-message">',
                'No Employees Found',
                '</div>'
            ].join('\n'),
            suggestion: Handlebars.compile('<div><strong>{{DisplayName}}</strong> – {{EmployeeID}}<br />{{EmailAddress}}</div>')
        }
    }).blur(function () {});

    target.on('typeahead:selected typeahead:autocompleted', function (obj, data) {
        target.val(data['DisplayName']);
        var officeString = data['Office'].split('-')[0]; // get office name and clean up

        var companyString = data['Company'];
        var departmentString = data['Department'];
        managerString = data['Manager']; // grab name of the Manager
        var i = managerString.indexOf(',OU=');
        var managerFormatted = managerString.slice(3, i); // return name and firstname, remove extra junk
        var j = managerFormatted.lastIndexOf(' ');

        managerSurname = managerFormatted.substring(j + 1);
        managerForename = managerFormatted.substring(0, j);
        $empManager.text(`${managerForename} ${managerSurname}`);
        $empDivision.text(`${companyString} ${departmentString}`);
        $empOffice.text(officeString);

        // show the employee details table
        $employeeDetails.show();

        // to add later
        // $empCC
        // $empPhone

    });
}


// ____________________ Set SUPPLIER REQUEST VIEWER dropdown menu ____________________
function setReviewersDropdown() {
    console.log("populating Reviewers list...");
    var clientContext = new SP.ClientContext("https://bauer.sharepoint.com/sites/UK-Forms/NewSuppliers");
    reviewerList = clientContext.get_web().get_lists().getByTitle('Supplier Request Reviewers');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
        '<View><Query></Query></View>'
    );
    this.allReviewersItems = reviewerList.getItems(camlQuery);
    clientContext.load(allReviewersItems);
    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onSetRVDropdownSucceeded),
        Function.createDelegate(this, this.onSetRVDropdownFailed)
    );
}

function onSetRVDropdownSucceeded(sender, args) {
    var eachReviewerName = "";
    var listItemEnumerator = allReviewersItems.getEnumerator();
    var reviewerInput = document.getElementById('reviewer-input');

    while (listItemEnumerator.moveNext()) {
        var reviewerListItem = listItemEnumerator.get_current();
        eachReviewerName = reviewerListItem.get_item('Title');
        var option = document.createElement("option");
        option.value = option.text = eachReviewerName;

        reviewerInput.add(option); // append options to input
    }

    var my_options = $("#reviewer-input option");
    sortOptions(my_options);

    $reviewerInput.empty().append(my_options);
    $reviewerInput.prepend("<option selected value=''>Please Select...</option>");

}

function sortOptions(my_options) {
    my_options.sort(function (a, b) {
        if (a.text > b.text)
            return 1;
        else if (a.text < b.text)
            return -1;
        else
            return 0;
    });
}

function onSetRVDropdownFailed(sender, args) {
    alert('Supplier reviewers request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

// ____________________ Set CENSHARE dropdown menu ____________________

function setCenshareDropdown() {
    console.log("populating Censhare code list...");
    var clientContext = new SP.ClientContext("https://bauer.sharepoint.com/sites/UK-Forms/NewSuppliers");
    censhareList = clientContext.get_web().get_lists().getByTitle('DC5 Censhare codes');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
        '<View><Query></Query></View>'
    );
    this.allCenshareItems = censhareList.getItems(camlQuery);
    clientContext.load(allCenshareItems);
    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onSetCSDropdownSucceeded),
        Function.createDelegate(this, this.onSetCSDropdownFailed)
    );
}

function onSetCSDropdownSucceeded(sender, args) {
    var eachCenshareCode = "";
    var listItemEnumerator = allCenshareItems.getEnumerator();
    var censhareInput = document.getElementById('CenshareDC5');

    while (listItemEnumerator.moveNext()) {
        var censhareListItem = listItemEnumerator.get_current();
        eachCenshareCode = censhareListItem.get_item('Title');
        var option = document.createElement("option");
        option.value = option.text = eachCenshareCode;

        censhareInput.add(option); // append options to input
    }

    var my_options = $("CenshareDC5 option");
    sortOptions(my_options);

    $reviewerInput.empty().append(my_options);
    $reviewerInput.prepend("<option selected value=''>Please Select...</option>");

}

function sortOptions(my_options) {
    my_options.sort(function (a, b) {
        if (a.text > b.text)
            return 1;
        else if (a.text < b.text)
            return -1;
        else
            return 0;
    });
}

function onSetRVDropdownFailed(sender, args) {
    alert('Supplier reviewers request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}
// set typeahead for Employee input  
setTypeAhead();

// set dropdown menu for SUPPLIER REQUEST REVIEW
setReviewersDropdown();