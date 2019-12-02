(function ($) {
  "use strict";

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

  $('#login').on('click', function () {
    window.location = './index.html';
  })

  $('#signup').on('click', function (event) {
    event.preventDefault();

    let password = $('input[name=pass]').val();
    let email = $('input[name=email]').val();
    let name = $('input[name=name]').val();

    if (validateForm()) {
      let json_to_send = {
        "password": password,
        "email": email,
        "name": name,
      };

      json_to_send = JSON.stringify(json_to_send);

      $.ajax({
        url: 'https://notepad-finalweb.herokuapp.com/users',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        dataType: 'json',
        data: json_to_send,
        success: function (data) {
          window.location = './index.html';
        },
        error: function (error_msg) {
          console.log('Failure', error_msg);
        }
      });
    } else {
      console.log('Invalid data');
    }
  });

})(jQuery);