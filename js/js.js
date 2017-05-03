
var currentUser;
//init dictionary of users : key-userName,value-password
var users = {};
//add default users
users["a"] = "a";
users["test2017"] = "test2017";



function login() {
    var name = document.getElementById("logName").value;
    var pwd = document.getElementById("logPassword").value;

    if(!(name in users)){
        alert("User does not exist in the system");
        return;
    }
    else {
        if (users[name] == pwd) {
            currentUser = name;
            $("#game").show();
            $("#loginform").hide();

        }
        else {
            alert("Wrong password, Please try again");
            return;
        }
    }
}

/*#region Menu&Dialog*/
// menu function
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

// dialog function
function dialogdown() {
    document.getElementById("Dialog").close();
}

/*#endregion Menu&Dialog*/

//move between div
$(document).ready(function () {

    /*#region DivFunctions*/
    $('#regDiv').hide();
    $('#loginDiv').hide();
    $("#game").hide();

    $('#welcomeNav').click(function () {
        $('#welcomeDiv').show();
        $('#regDiv').hide();
        $('#loginDiv').hide();
    });

    $('#regNav').click(function () {
        $('#welcomeDiv').hide();
        $('#regDiv').show();
        $('#loginDiv').hide();
    });

    $('#loginNav').click(function () {
        $('#welcomeDiv').hide();
        $('#regDiv').hide();
        $('#loginDiv').show();
    });

    $('#aboutNav').click(function () {
        document.getElementById("Dialog").showModal();
    });

    $('#regDiv1').click(function () {
        $('#welcomeDiv').hide();
        $('#regDiv').show();
        $('#loginDiv').hide();
    });

    $('#logDiv1').click(function () {
        $('#welcomeDiv').hide();
        $('#regDiv').hide();
        $('#loginDiv').show();
    });

    $('#main').click(function () {
        closeNav();
    });

    $('#logout').click(function () {
        currentUser="";
        $("#game").hide();
        $("#loginform").show();
        document.getElementById("logPassword").value = "";
        document.getElementById("logName").value = "";
    })
    /*#endregion DivFunctions*/

    /*#region Validation*/

    $(function() {
        $.validator.addMethod("regex", function(value, element, regexpr) {
            var flag = false;
            var regexTemplate = /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/;
            return regexTemplate.test(value);
        }, "Please enter a valid pasword.");

        $.validator.addMethod("notContainingNumbers", function(value, element, regexpr) {
            var regexTemplate = /\d/;
            return !regexTemplate.test(value);
        }, "containing number.");

        $.validator.addMethod("isUserExists", function(user, element, regexpr) {
            if ((user in users) == false)
            {
                return true; // username is free
            } else {
                return false; // username is taken
            }
        }, "username already exsists.");


        $("form[name='registerForm']").validate({

            // Specify validation rules
            rules: {
                user_name: {
                    required : true,
                    //isUserExists : true

                },
                password: {
                    required : true,
                    regex: true,
                   // minlength: 8
                },
                fr_name: {
                    required: true,
                   // notContainingNumbers: true
                },
                ls_name: {
                    required: true,
                    //notContainingNumbers: true
                },
                email: {
                    required: true,
                    email: true
                },
                birthday: {
                    required: true
                }
            },

            // Specify validation error messages
            messages: {
                user_name: {
                    required: "Please enter a User Name",
                    //isUserExists: "Username already taken"
                },
                password: {
                    required: "Please enter a Password",
                    //minlength: "Password must contain at least 8 characters",
                    //regex: "password should contain at least 1 letter and 1 digit",
                },
                fr_name: {
                    required: "Please enter a First name",
                   // notContainingNumbers: "firstname shouldn't contain numbers"
                },
                ls_name: {
                    required: "Please enter a Last name",
                    //notContainingNumbers: "lastname shouldn't contain numbers"
                },
                email: {
                    required: "Please enter a Email"
                },
                birthday:{

                }
            },
            errorElement: 'div',
            errorPlacement: function(error, element) {
                 error.appendTo('#errordiv');

            },
            submitHandler: function(form) {
                form.submit();
                users[form[0].value] = form[1].value;
            }
        });
    });
    /*#endregion Validation*/
});



