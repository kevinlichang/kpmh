var url = document.URL;
url = url.slice(0, -8);

$(document).ready(function () {
  // Send button funciton. 
  $("#send-message-btn").click(function () {

    let fname = $("#fname").val();
    let lname = $("#lname").val();
    let message = $("#message").val();
    let email = $("#email").val();
    // Sending email function

    let subject = "New Message from " + fname + " " + lname;
    let text = message + "\n" + "Contact email: " + email;
    console.log(email);
    console.log(subject);
    console.log(text);

    $.post(url + "/emailer",
      {
        subject: subject,
        text: text
      }
    );
    $("#send-text").addClass("hidden");
    $("#checkmark").removeClass("hidden").addClass("visible")
    $(this).addClass("green");

  });

  
});

// index
const req = new XMLHttpRequest();
req.onreadystatechange = function () {
  if (req.readyState == 4 && req.status == 200) {
    const user = JSON.parse(req.response).user;
    document.getElementById("welcome-message").innerText = `Welcome ${user.username}!!`;
  }
};
req.open("GET", "http://localhost:4001/user", true);
req.send();

//login
const urlParams = new URLSearchParams(window.location.search);
const info = urlParams.get('info');
console.log(urlParams)

if (info) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.innerText = info;
  errorMessage.style.display = "block";
}