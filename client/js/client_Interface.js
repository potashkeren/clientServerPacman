
var _currentUser;
//init dictionary of _users : key-userName,value-password
var _users = {};
var _isGameOn=false;
//add default _users
_users["a"] = "a";
_users["test2017"] = "test2017";
var c_numOfGhosts, c_time,c_coins;
function login() {
    var name = document.getElementById("logName").value;
    var pwd = document.getElementById("logPassword").value;

    if(!(name in _users)){
    $("#errorUser").text("User does not exist in the system");
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
        $("#errorUser").text("Wrong password, Please try again");
            return;
        }
    }
}

function playGame(){

    var checkCoins,checkTime;
    document.getElementById("errorCoins").innerHTML ="";
    document.getElementById("errorTime").innerHTML ="";
    checkCoins = document.getElementById("selectCoins").value;
    checkTime = document.getElementById("selectTime").value;
    if (isNaN(checkCoins) || checkCoins < 50 || checkCoins > 90) {
        document.getElementById("errorCoins").innerHTML = "The number of coins should be between 50 and 90";
    }
    else if (isNaN( checkTime) ||  checkTime < 60 ) {
        document.getElementById("errorTime").innerHTML = "Game time should be at least 60 seconds";
    }
    else{
        $("#settings").hide();
        $("#play").show();

        c_numOfGhosts = $("#selectGhosts").val();
        c_coins = $("#selectCoins").val();
        c_time = $("#selectTime").val();
        $("#welcome_user").text("WELCOME" +"\u00A0" + _currentUser);
        startGame(c_time,c_coins,c_numOfGhosts);
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
function gameOverdown() {
    document.getElementById("Game Over").close();
}

function dialogRGdown() {
    document.getElementById("Dialog_rg").close();
    $('#regDiv').hide();
    $("#game").show();
    $("#settings").show();
    $("#play").hide();
}

/*#endregion Menu&Dialog*/

//move between div
$(document).ready(function () {
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

    /*#region DivFunctions*/
    $('#regDiv').hide();
    $('#loginDiv').hide();
    $("#game").hide();

    $('#welcomeNav').click(function () {
        $('#welcomeDiv').show();
        $('#regDiv').hide();
        $('#loginDiv').hide();
        $("#game").hide();
        $("#settings").hide();
        $("#play").hide();
        if(_isGameOn == true){
            gameOver("");
        }
    });

    $('#regNav').click(function () {
        $('#welcomeDiv').hide();
        $('#regDiv').show();
        $('#loginDiv').hide();
        $("#game").hide();
        $("#settings").hide();
        $("#play").hide();
        if(_isGameOn == true){
            gameOver("");
        }
    });

    $('#loginNav').click(function () {
        $("#errorUser").text("");
        $('#welcomeDiv').hide();
        $('#regDiv').hide();
        $('#loginDiv').show();
        $("#game").hide();
        $("#settings").hide();
        $("#play").hide();
        if(_isGameOn == true){
            gameOver("");
        }
    });

    $('#aboutNav').click(function () {
        document.getElementById("Dialog").showModal();
    });

    $('#regDiv1').click(function () {
        $('#welcomeDiv').hide();
        $('#regDiv').show();
        $('#loginDiv').hide();
        $("#game").hide();
        $("#settings").hide();
        $("#play").hide();
    });

    $('#logDiv1').click(function () {
         $("#errorUser").text("");
        $('#welcomeDiv').hide();
        $('#regDiv').hide();
        $('#loginDiv').show();
        $("#game").hide();
        $("#settings").hide();
        $("#play").hide();
        if(_isGameOn == true){
            gameOver("");
        }
    });

    $('#main').click(function () {
        closeNav();
    });

    $('#logout').click(function () {
        $("#errorUser").text("");
        _currentUser="";
        $("#game").hide();
        $("#loginDiv").show();
        document.getElementById("logPassword").value = "";
        document.getElementById("logName").value = "";
        if(_isGameOn == true){
            gameOver("");
        }
    })

    $('#startQuick').click(function () {
        $("#loginDiv").hide();
        $("#game").show();
        $("#settings").show();
        $("#play").hide();
        $('#welcomeDiv').hide();
        $('#regDiv').hide();
    });
    /*#endregion DivFunctions*/

    /*#region Validation*/

    $(function() {

        $("form[name='registerForm']").validate({

            // Specify validation rules
            rules: {
                user_name: {
                    required : true,
                    isUserFree : true,
                },
                password: {
                    required : true,
                    oneLetterDigit: true,
                    onlyLetterDigit: true,
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

        jQuery.validator.addMethod("isUserFree", function(user, element) {
              if ((user in _users) == false){
               return true;
               } else {
                     return false;
               }
         }, "User Name already exsists");

        jQuery.validator.addMethod("oneLetterDigit", function (value, element) {
               return this.optional(element) ||  /^(?=.*[a-zA-Z])(?=.*\d).*$/.test(value);
         }, "Password should contain at least 1 letter and 1 digit");

        jQuery.validator.addMethod("notNumber", function (value, element) {
               return this.optional(element) ||/^[^0-9]+$/.test(value);
         }, "Name shouldn't contain numbers");

        jQuery.validator.addMethod("onlyLetterDigit", function (value, element) {
               return this.optional(element) ||/^[0-9a-zA-Z]+$/.test(value);
        }, "Password should contain only letters and digits");

    });

    /*#endregion Validation*/

    $(function() {

        //populate our years select box
        for (i = 2014; i > 1917; i--){
            $('#years').append($('<option />').val(i).html(i));
        }
        //populate our months select box
        for (i = 1; i < 13; i++){
            $('#months').append($('<option />').val(i).html(i));
        }
        //populate our Days select box
        updateNumberOfDays();

        //"listen" for change events
        $('#years, #months').change(function(){
            updateNumberOfDays();
        });

    });

    //function to update the days based on the current values of month and year
    function updateNumberOfDays(){
        $('#days').html('');
        month = $('#months').val();
        year = $('#years').val();
        days = daysInMonth(month, year);

        for(i=1; i < days+1 ; i++){
                $('#days').append($('<option />').val(i).html(i));
        }
    }

    //helper function
    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
});



