function setbg(color) {
  document.getElementById("textbody").style.background = color
}

var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

var notes = []
var selected = notes.index - 1;

function getRateLimit() {
  $.ajax({
    url: 'https://api.github.com/rate_limit',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    success: function (data) {
      console.log(data)
    },
    error: function (error_msg) {
      console.log(error_msg);
    }
  })
}

function displayNoteEditable(index) {
  selected = index;
  let note = notes[index];
  $(document.getElementById('textbodymd')).addClass('hidden');
  let textbody = $(document.getElementById('textbody'));
  let name = note.name;
  let body = note.body;
  if (typeof name != 'undefined') {
    textbody.val(name);
    if (typeof body != 'undefined') {
      textbody.val(textbody.val() + body);
    }
  } else {
    textbody.val('');
  }
  textbody.removeClass('hidden');
  textbody.select();

  $('#save').removeClass('hidden');
  $('#discard').removeClass('hidden');
  $('#info').removeClass('hidden');
}

function displayNoteMD(index) {
  selected = index;

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
    const str = name + body;

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

  $('#save').addClass('hidden');
  $('#discard').addClass('hidden');
  $('#info').addClass('hidden');
  $('#delete').removeClass('hidden');
}

function mdToPlainText(mdText, callback) {
  if (typeof mdText == 'string') {
    callback(mdText.replace(/[^\w\s\n!?]/g, ''));
  } else {
    callback('');
  }
}

function updateNoteHead(note, index) {
  let note_head = $('[index="' + index + '"]');
  let texts = note_head.children('p');

  mdToPlainText(note.name, function (name) {
    texts[0].innerHTML = name;
  })

  mdToPlainText(note.body, function (body) {
    texts[1].innerHTML = body;
  })
}

function placeNoteHead(note) {
  let note_head = $(document.createElement('div'));
  note_head.addClass('note-head')
  note_head.attr('index', notes.length);

  let note_head_name = $(document.createElement('p'));
  note_head_name.addClass('title');
  mdToPlainText(note.name, function (name) {
    note_head_name.text(name);
  })

  let note_head_body = $(document.createElement('p'));
  note_head_body.addClass('desc');
  mdToPlainText(note.body, function (body) {
    note_head_body.text(body);
  })

  note_head.append(note_head_name);
  note_head.append(note_head_body);

  note_head.on('click', () => {
    displayNoteMD(note_head.attr('index'))
    $.each($('.note-head'), function () {
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
        placeNoteHead(data[i]);
      }
    },
    error: function (error_msg) {
      console.log(error_msg);
    }
  });
}
loadNotes()

// TODO: esta función no la llama nadie?
function clickHead() {
  $.each($('.note-head'), function () {
    $(this).removeClass('clicked');
  })
  $(this).addClass('clicked');
}

function removeNote(index) {
  $('[index="' + index + '"]').remove();
  let textBodyMd = $('#textbodymd');
  let textBodyEditable = $('#textbody');
  textBodyMd.html('');
  textBodyEditable.val('');
  textBodyMd.removeClass('hidden');
  textBodyEditable.addClass('hidden');
  textBodyMd.unbind();
  $('#delete').addClass('hidden');
  $('#save').addClass('hidden');
  $('#discard').addClass('hidden');
  $('#info').addClass('hidden');
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
      placeNoteHead(data);
    },
    error: function (error_msg) {
      console.log(error_msg);
    }
  });
})

$('#save').on('click', function () {

  let text = $('#textbody').val()

  var lineEnd = text.indexOf('\n');
  if (lineEnd == -1) {
    lineEnd = text.length;
  }

  let name = text.substring(0, lineEnd);
  let body = text.substring(lineEnd, text.length);

  json_to_send = {
    "name": name,
    "body": body
  };
  json_to_send = JSON.stringify(json_to_send);

  req_url = 'https://notepad-finalweb.herokuapp.com/updateNote/' + notes[selected]._id;

  $.ajax({
    url: req_url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'PATCH',
    data: json_to_send,
    success: function (data) {
      notes[selected] = data;
      displayNoteMD(selected);
      updateNoteHead(data, selected);
    },
    error: function (error_msg) {
      console.log(error_msg);
    }
  });
})

$('#discard').on('click', function () {
  if (confirm("Are you sure you want to discard the changes?")) {
    displayNoteMD(selected);
  }
})

$('#delete').on('click', function () {
  if (confirm("Are you sure you want to delete the note?")) {
    let note = notes[selected];

    req_url = 'https://notepad-finalweb.herokuapp.com/deleteNote/' + note._id;

    $.ajax({
      url: req_url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      success: function (data) {
        removeNote(selected);
      },
      error: function (error_msg) {
        console.log(error_msg);
      }
    });
  }
})

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
      localStorage.removeItem('token');
      window.location = './index.html';
    },
    error: function (error_msg) {
      console.log(error_msg);
    }
  });
})