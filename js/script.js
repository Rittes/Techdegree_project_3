// Basic Info Variables

const $otherInput = $('#other-title');

// Shirt Design Variables and Placeholder

const $selectDesign = $('#design');
const $selectColor = $('#color');
const $colorsJsDiv = $('#colors-js-puns');
const $jsPunsColors = $('#color option:nth-child(-n+3)');
const $jsColors = $('#color option:nth-child(n+4)');
const $placeholder = $('<option value="selecttheme">Please select a T-shirt theme</option>');
$($placeholder).attr('selected', true);
$selectColor.prepend($placeholder)

// Activities Variables and 'Total' Div

const $activities = $('.activities');
const $activitiesInput = $('.activities input');
let totalCost = 0;
$totalDiv = $(`<div class="total-cost">Total: $${totalCost}</div>`);
$activities.append($totalDiv);

// Payment Variables

const $creditCard = $('#credit-card')
const $paypal = $('#paypal');
const $bitcoin = $('#bitcoin');
const $paymentOption = $('#payment');
$paymentOption.val('credit card');
$('#payment option:eq(0)').attr('disabled', true);


// Validation Variables

const $nameSpan = $('<span class="validation">Please enter a valid name</span>');
const $emailSpan = $('<span class="validation">Please enter a valid email address</span>');
const $otherSpan = $('<span class="validation">Please enter your job role</span><br>');
const $activitySpan = $('<span class="validation">Please select at least one event</span><br>');
const $creditCardSpan = $('<span class="validation">Please enter a valid card number</span>');
const $zipcodeSpan = $('<span class="validation">Invalid zipcode</span>');
const $cvvSpan = $('<span class="validation">Invalid CVV</span>');

$nameSpan.insertBefore('#name');
$emailSpan.insertBefore('#mail');
$otherSpan.insertBefore('#title');
$activitySpan.insertAfter('.activities legend');
$creditCardSpan.insertBefore('#cc-num');
$zipcodeSpan.insertBefore('#zip');
$cvvSpan.insertBefore('#cvv');

// Hide elements at first and 'focus' on the name box

$('#name').focus();
$otherInput.hide();
$jsColors.hide();
$jsPunsColors.hide();
$colorsJsDiv.hide();
$paypal.hide();
$bitcoin.hide();
$nameSpan.hide();
$emailSpan.hide();
$otherSpan.hide();
$activitySpan.hide();
$creditCardSpan.hide();
$zipcodeSpan.hide();
$cvvSpan.hide();


// Input box appear when "other" is selected from "Job Role" menu

$('#title').change(function() {
    if ($(this).val() === 'other') {
        $($otherInput).show();
        $('#other-title').focus();
        $otherInput.keyup(function() {
            other();
        });
    } else {
        $otherInput.hide();
        $otherSpan.hide();
    }
});

// Only show available colors when theme is selected

$selectDesign.change(function() {
    $('#design option:eq(0)').attr('disabled', true);
    $placeholder.text('Select Color').attr('disabled', true);
    if ($(this).val() === 'js puns') {
        $jsPunsColors.show();
        $jsColors.hide();
        $colorsJsDiv.show();
    }
    if ($(this).val() === 'heart js') {
        $jsColors.show();
        $jsPunsColors.hide();
        $colorsJsDiv.show();
    }
    $selectColor.val('selecttheme');
});

// When an activity box is checked it will disable any activity with 
// conflicting times and adds a total cost at the end.

$activities.change(function(e) {
    const $clicked = $(e.target);
    const $clickedType = $clicked.attr('data-day-and-time');
    const $itemCost = parseInt($clicked.attr('data-cost'));
    $activitiesInput.each(function() {
        const $checkedBox = $(this);
        if (($clickedType === $checkedBox.attr('data-day-and-time')) &&
            ($clicked.attr('name') !== $checkedBox.attr('name'))) {
            if ($clicked.prop('checked')) {
                $checkedBox.attr('disabled', true);
                $checkedBox.parent().addClass('disable-label');
            } else {
                $checkedBox.attr('disabled', false);
                $checkedBox.parent().removeClass('disable-label');
            }
        }
    });
    if ($clicked.prop('checked')) {
        totalCost += $itemCost;
        $totalDiv.text(`Total: $${totalCost}`);
    } else {
        totalCost -= $itemCost;
        $totalDiv.text(`Total: $${totalCost}`);
    }
});

// When the item is selected from the list it'll toggle the correct payment
// method, if 'credit card' is selected, credit card is validated
$paymentOption.change(function() {

    if ($(this).val() === 'credit card') {
        $creditCard.show();
        $paypal.hide();
        $bitcoin.hide();
        validateCreditCard();
    }
    if ($(this).val() === 'paypal') {
        $creditCard.hide();
        $paypal.show();
        $bitcoin.hide();
    }
    if ($(this).val() === 'bitcoin') {
        $creditCard.hide();
        $paypal.hide();
        $bitcoin.show();
    }

});

// Validating Functions

// These functions check if input meets requirements for submition
// If they don't, user will get an error. If it they do meet requirements
// the function returs false and allows the user to submit the form

function name() {
    const $nameInput = $('#name');
    if ($nameInput.val().length === 0) {
        $nameInput.addClass('error');
        $nameSpan.show();
        return true;
    } else {
        $nameInput.removeClass('error');
        $nameSpan.hide();
        return false;
    }
}

function email() {
    const $emailInput = $('#mail');
    const regex = /^[^@]+@[^@.]+\.[a-z]{3}$/i;
    if (!(regex.test($("#mail").val()))) {
        $emailInput.addClass('error');
        $emailSpan.show();
        return true;
    } else {
        $emailInput.removeClass('error');
        $emailSpan.hide();
        return false;
    }

}

function other() {
    if ($otherInput.val().length === 0) {
        $otherInput.addClass('error');
        $otherSpan.show();
        return true;
    } else {
        $otherInput.removeClass('error');
        $otherSpan.hide();
        return false;
    }
}

function activity() {
    if (totalCost === 0) {
        $activities.css('color', 'red');
        $activitySpan.show();
        return true;
    } else {
        $activities.css('color', 'black');
        $activitySpan.hide();
        return false;
    }

}

function creditCard() {
    const $creditCardInput = $('#cc-num');
    const regex = /^[\d]{4}[\d]{4}[\d]{4}[\d]{4}$/;
    if (!regex.test($("#cc-num").val())) {
        $creditCardInput.addClass('error');
        $creditCardSpan.show();
        return true;
    } else {
        $creditCardInput.removeClass('error');
        $creditCardSpan.hide();
        $('#zip').focus()
        return false;
    }

}

function zipcode() {
    const $zipcodeInput = $('#zip');
    const regex = /^[\d]{5}$/;
    if (!regex.test($("#zip").val())) {
        $zipcodeInput.addClass('error');
        $zipcodeSpan.show();
        return true;
    } else {
        $zipcodeInput.removeClass('error');
        $zipcodeSpan.hide();
        $('#cvv').focus();
        return false;
    }
}

function cvv() {
    const $cvvInput = $('#cvv');
    const regex = /^[\d]{3}$/;
    if (!regex.test($("#cvv").val())) {
        $cvvInput.addClass('error');
        $cvvSpan.show();
        return true;
    } else {
        $cvvInput.removeClass('error');
        $cvvSpan.hide();
        return false;
    }
}

function validateCreditCard() {
    $('#cc-num').keyup(function() {
        creditCard();
    });
    $('#zip').keyup(function() {
        zipcode();
    });
    $('#cvv').keyup(function() {
        cvv();
    });
}

// Listeners

$('#name').keyup(function() {
    name();
});

$('#mail').keyup(function() {
    email();
});

// If any validation function returns true the form will not submit and will
// show an error. If no functions return true the form submits.

$('form').submit(function(e) {
    if (name() === true) {
        e.preventDefault();
    }
    if (email() === true) {
        e.preventDefault();
    }
    if (activity() === true) {
        e.preventDefault();
    }
    if ($('#title').val() === 'other') {
        if (other() === true) {
            e.preventDefault();
        }
    }
    if ($('#payment').val() === 'credit card') {
        if (creditCard() === true) {
            e.preventDefault();
        }
        if (zipcode() === true) {
            e.preventDefault();
        }
        if (cvv() === true) {
            e.preventDefault();
        }
    }

});