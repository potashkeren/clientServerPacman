
var _currentUser;
//init dictionary of _users : key-userName,value-password
var _users = {};
//add default _users
_users["a"] = "a";
_users["test2017"] = "test2017";
var numOfGhosts, time,coins;
function login() {
    var name = document.getElementById("logName").value;
    var pwd = document.getElementById("logPassword").value;

    if(!(name in _users)){
        alert("User does not exist in the system");
        return;
    }
    else {
        if (_users[name] == pwd) {
            _currentUser = name;
          //  $("#loginform").hide();
            $("#loginDiv").hide();
            $("#game").show();
            $("#settings").show();
           $("#play").hide();
        }
        else {
            alert("Wrong password, Please try again");
            return;
        }
    }
}

function playGame(){
    numOfGhosts = $("#selectGhosts").val();
    coins = $("#selectCoins").val();
    $("#settings").hide();
    $("#play").show();
     $("#welcome_user").text("WELCOME"  + _currentUser);
    Start();

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
        _currentUser="";
        $("#game").hide();
        $("#loginDiv").show();
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
            if ((user in _users) == false)
            {
                return true; // username is free
            } else {
                return false; // username is taken
            }
        }, "username already exsists.");

         jQuery.validator.addMethod("password", function (value, element) {
             return this.optional(element) || /^(?=.*[a-zA-Z])(?=.*\d).*$/.test(value);
          }, "password should be at least 8 digit and contains letter and numbers");

        jQuery.validator.addMethod("firstLastName", function (value, element) {
              return this.optional(element) || /^[a-zA-Z]*$/.test(value);
         }, "Name should contain only letters");

        $("form[name='registerForm']").validate({

            // Specify validation rules
            rules: {
                user_name: {
                    required : true,
                    //isUserExists : tru
                },
                password: {
                    required : true,
                    regex: true,
                    minlength: 8,
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
                    minlength: "Password must contain at least 8 characters",
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
                    required: "Please enter a Birthday"
                }
            },
            errorElement: 'div',
            errorPlacement: function(error, element) {
                switch (element.attr("name")) {
                    case 'user_name':
                        error.insertAfter($("#errordiv1"));
                        break;
                    case 'password':
                        error.insertAfter($("#errordiv2"));
                        break;
                    case 'fr_name':
                        error.insertAfter($("#errordiv3"));
                        break;
                    case 'ls_name':
                        error.insertAfter($("#errordiv4"));
                        break;
                    case 'email':
                        error.insertAfter($("#errordiv5"));
                        break;
                    case 'birthday':
                        error.insertAfter($("#errordiv6"));
                        break;
                    default:
                        error.insertAfter(element);
                }
            },
            submitHandler: function(form) {
                form.submit();
                _users[form[0].value] = form[1].value;
            }
        });
    });
    /*#endregion Validation*/


});



