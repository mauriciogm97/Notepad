(function ($) {
  "use strict";

  $('#signup').on('click', function () {

    console.log('IN')

    let password = $('input[name=pass]').val();
    let email = $('input[name=email]').val();
    let name = $('input[name=name]').val();

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
        // TODO: Cambiar a index
        window.location = './login.html'
      },
      error: function (error_msg) {
        // TODO: Acciones de error
      }
    });
  });

})(jQuery);