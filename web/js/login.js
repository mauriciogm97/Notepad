$('#login_button').on('click', function () {
  // cargar email y password de su html
  let email = $('#email').val()
  let password = $('#password').val()

  json_to_send = {
    "email": email,
    "password": password
  };

  json_to_send = JSON.stringify(json_to_send)
  $.ajax({
    url: 'https://notepad-finalweb.herokuapp.com/login',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    dataType: 'json',
    data: json_to_send,
    success: function (data) {
      localStorage.setItem('token', data.token)

      // TODO: Acciones de success
    },
    error: function (error_msg) {
      // TODO: Acciones error
    }
  })
})