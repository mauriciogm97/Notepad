function setbg(color) {
  document.getElementById("textbody").style.background = color
}

var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

function loadNotes() {
  $.ajax({
    url: 'https://notepad-finalweb.herokuapp.com/getNotes',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      // TODO: Acciones success
      // for (let i = 0; i < data.length; i++) {
      //
      // }
    },
    error: function (error_msg) {
      // TODO: Acciones error
      // Nota, es error de servidor, una lista de notas vacias no es un error.
    }
  });
}
loadNotes()

$('#add_note').on('click', function () {
  $.ajax({
    url: 'https://notepad-finalweb.herokuapp.com/createNote',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    success: function (data) {
      // TODO: Acciones success
    },
    error: function (error_msg) {
      // TODO: Acciones error
    }
  });
})

const updateNote = function () {
  // TODO: Asignar
  let name = ''
  let body = ''

  json_to_send = {
    "name": name,
    "body": body
  };
  json_to_send = JSON.stringify(json_to_send);

  // TOOD: Append note id
  req_url = 'https://notepad-finalweb.herokuapp.com/updateNote/'

  $.ajax({
    url: req_url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'PATCH',
    data: json_to_send,
    success: function (data) {
      // TODO: Acciones de success
    },
    error: function (error_msg) {
      // TODO: Acciones de error
    }
  });
}

const deleteNote = function () {
  // TOOD: Append note id
  req_url = 'https://notepad-finalweb.herokuapp.com/updateNote/'

  $.ajax({
    url: req_url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'PATCH',
    data: json_to_send,
    success: function (data) {
      // TODO: Acciones de success
    },
    error: function (error_msg) {
      // TODO: Acciones de error
    }
  });
}

$('#logout').on('click', function () {
  $.ajax({
    url: 'https://notepad-finalweb.herokuapp.com/logout',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      localStorage.remove('token')

      // TODO: Acciones success
    },
    error: function (error_msg) {
      // TODO: Acciones error
    }
  });
})

const getMarkdown = function () {
  // TODO: Assign string
  const str = ''
  const req_url = 'https: //helloacm.com/api/markdown/?cached&s=' + str

  $.ajax({
    url: req_url,
    method: 'GET',
    success: function (data) {
      localStorage.remove('token')

      // TODO: Acciones success
    },
    error: function (error_msg) {
      // TODO: Acciones error
    }
  })
}