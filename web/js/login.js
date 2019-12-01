/* ========================================================================
     [Validate]*/
function validate(input) {
  if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
    if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
      return false;
    }
  } else {
    if ($(input).attr('name') == 'confirmPassword') {
      if ($(input).val() != $('#password').val()) {
        console.log($('#password').val());
        return false;
      }
    }
    if ($(input).val().trim() == '') {
      return false;
    }
  }
}

function validateForm() {
  var input = $('.validate-input .input100');
  var check = true;

  for (var i = 0; i < input.length; i++) {
    if (validate(input[i]) == false) {
      showValidate(input[i]);
      check = false;
    }
  }
  return check;
};

$('.validate-form .input100').each(function () {
  $(this).focus(function () {
    hideValidate(this);
  });
});

function showValidate(input) {
  var thisAlert = $(input).parent();

  $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
  var thisAlert = $(input).parent();

  $(thisAlert).removeClass('alert-validate');
}
/* ========================================================================*/

$('#signup_link').on('click', function () {
  window.location = './signup.html';
})

$('#login_button').on('click', function (event) {
  event.preventDefault();

  // cargar email y password de su html
  let email = $('#email').val()
  let password = $('#password').val()

  let json_to_send = {
    "email": email,
    "password": password
  };

  json_to_send = JSON.stringify(json_to_send);

  if (validateForm()) {
    req = $.ajax({
      url: 'https://notepad-finalweb.herokuapp.com/login',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function (data) {
        console.log(data);
        localStorage.setItem('token', data.token);
        console.log(data)
        window.location = './notes.html';
      },
      error: function (error_msg) {
        console.log('Failure ', error_msg);
        // TODO: Acciones error
        $('#error_msg').removeClass('hidden');
      }
    })

  } else {
    console.log('Invalid data.');
  }
})