function setbg(color) {
  document.getElementById("textbody").style.background = color
}

var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

var notes = []

function displayNoteEditable(index) {
  let note = notes[index];
  $(document.getElementById('textbodymd')).addClass('hidden');
  let textbody = $(document.getElementById('textbody'));
  let name = note.name;
  let body = note.body;
  if (typeof name != 'undefined') {
    textbody.val(name + '\n');
    if (typeof body != 'undefined') {
      textbody.val(textbody.val() + body);
    }
  } else {
    textbody.val('');
  }
  textbody.removeClass('hidden');
}

function displayNoteMD(index) {
  function display(text) {
    $(document.getElementById('textbody')).addClass('hidden');
    let textbodymd = $(document.getElementById('textbodymd'));
    textbodymd.html(text);
    textbodymd.removeClass('hidden');
    textbodymd.on('click', () => {
      displayNoteEditable(index);
    })
  }

  let note = notes[index];
  let name = note.name;
  let body = note.body;

  if (typeof name != 'undefined') {
    const str = name + '\n' + body;
    $.ajax({
      url: 'https://api.github.com/markdown/raw',
      headers: {
        'Content-Type': 'text/plain',
      },
      method: 'POST',
      data: str,
      success: function (data) {
        display(data)
      },
      error: function (error_msg) {
        console.log(error_msg);
      }
    })
  } else {
    display('');
  }

}

function placeNote(note) {
  let note_head = $(document.createElement('div'));
  note_head.addClass('note-head')
  note_head.attr('index', notes.length);

  var note_name = '';
  if (typeof note.name == 'string') {
    note_name = note.name.replace(/[^\w\s\n!?]/g, '');
  }
  let note_head_name = $(document.createElement('p'));
  note_head_name.addClass('title');
  note_head_name.text(note_name);

  var note_body = '';
  if (typeof note.body == 'string') {
    note_body = note.body.replace(/[^\w\s\n!?]/g, '');
  }
  let note_head_body = $(document.createElement('p'));
  note_head_body.addClass('desc');
  note_head_body.text(note_body);

  note_head.append(note_head_name);
  note_head.append(note_head_body);

  note_head.on('click', () => {
    displayNoteMD(note_head.attr('index'))
    $.each($('.note-head'), function() {
        $(this).removeClass('clicked');
    })
    note_head.addClass('clicked');
  });

  let hr = $(document.createElement('hr'));

  $('#note-heads').prepend(hr);
  $('#note-heads').prepend(note_head);

  notes.push(note);
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
      for (let i = 0; i < data.length; i++) {
        placeNote(data[i]);
      }
    },
    error: function (error_msg) {
      console.log(error_msg);
    }
  });
}
loadNotes()

function clickHead() {
    $.each($('.note-head'), function() {
        $(this).removeClass('clicked');
    })
    $(this).addClass('clicked');
}

$('#addNote').on('click', function () {
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
      placeNote(data);
    },
    error: function (error_msg) {
      console.log(error_msg);
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

}