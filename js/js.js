
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
function dialogRGdown() {
    document.getElementById("Dialog_rg").close();
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

        $("form[name='registerForm']").validate({

            // Specify validation rules
            rules: {
                user_name: {
                    required : true,
                    isUserExsist : true,
                },
                password: {
                    required : true,
                    passwordValid: true,
                    minlength: 8,
                },
                fr_name: {
                    required: true,
                    notNumber: true
                },
                ls_name: {
                    required: true,
                    notNumber: true
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
                },
                password: {
                    required: "Please enter a Password",
                    minlength: "Password must contain at least 8 characters",
                },
                fr_name: {
                    required: "Please enter a First name",
                },
                ls_name: {
                    required: "Please enter a Last name",
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
                 document.getElementById("Dialog_rg").showModal();
            }
        });

        jQuery.validator.addMethod("isUserExsist", function(user, element) {
              if ((user in _users) == false){
               return true;
               } else {
                     return false;
               }
         }, "User Name already exsists");

        jQuery.validator.addMethod("passwordValid", function (value, element) {
               return this.optional(element) ||  /^(?=.*[a-zA-Z])(?=.*\d).*$/.test(value);
         }, "password must contain at least 1 letter and 1 digit");

        jQuery.validator.addMethod("notNumber", function (value, element) {
               return this.optional(element) ||/^[^0-9]+$/.test(value);
         }, "Name shouldn't contain numbers");
    });

    /*#endregion Validation*/


});



