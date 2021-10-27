
function initialize() {

    //// Signup form validation ////

    $('#signup-form').submit(function (e) {
        if ($("#confirmPassword").val() != $("#password").val()) {
            $("#password").next('.help-block').text('Password do not match');
            e.preventDefault();
            return false;
        }
    });



    //// Commented code ////

    // $('#welcome').on('mouseover', function () {
    //     $(this).css('color', 'red');
    // });

    // $('#signup-form').validate({
    //     rules: {
    //         fname: 'required',
    //         lname: 'required',
    //         email: {
    //             required: true,
    //             email: true
    //           },
    //         password: {
    //             required: true,
    //             minlength: 5,
    //             maxLength: 100
    //         }
    //     },
    //     messages: {
    //         fname: "Please enter your First Name",
    //         lname: "Please enter your Last Name",
    //         password: {
    //             required: "Please provide a password",
    //             minlength: "Your password must be at least 5 characters long"
    //         },
    //         email: "Please enter a valid email address"
    //     },
    //     submitHandler: function(form) {
    //         // if ($("#confirmPassword").value() != $("#password").value()) {
    //         //     consol
    //         // }

    //         form.submit();
    //     }
    // });

}



$(document).ready(function() {
    initialize();
});