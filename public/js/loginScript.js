var url = document.URL;
url = url.slice(0, -6);

$("#login-form").submit((event) => {
  event.preventDefault();
  loginData = {
    username: $('#username').val(),
    password: $('#password').val()
  }

  $.ajax({
    url: url + '/api/login',
    type: 'post',
    data: loginData,
    success: (data) => {
      $('#response-message').text(data.message);
      localStorage.setItem('token', data.token)
      
    },
    error: (data) => {
      $('#response-message').text(data.message);
    }
  });


});

