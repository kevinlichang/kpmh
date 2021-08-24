var url = document.URL;
url = url.slice(0, -8);

// $(document).ready(function () {
//   // Send button funciton. 
//   $("#send-message-btn").click(function () {

//     let fname = $("#fname").val();
//     let lname = $("#lname").val();
//     let message = $("#message").val();
//     let email = $("#email").val();
//     // Sending email function

//     let subject = "New Message from " + fname + " " + lname;
//     let text = message + "\n" + "Contact email: " + email;
//     console.log(email);
//     console.log(subject);
//     console.log(text);

//     $.post(url + "/emailer",
//       {
//         subject: subject,
//         text: text
//       }
//     );
//     $("#send-text").addClass("hidden");
//     $("#checkmark").removeClass("hidden").addClass("visible");
//     $("#send-message-btn").attr("disabled", "disabled");
//     $("#success-msg").text("Message sent! Returning to home page.")
//     setTimeout(function () {
//       window.location.href = url
//     }, 3800);


//   });
  
// });

const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);

  $("#send-text").addClass("hidden");
  $("#checkmark").removeClass("hidden").addClass("visible");
  $("#send-message-btn").attr("disabled", "disabled");
  $("#success-msg").text("Message sent! Returning to home page.")
  setTimeout(function () {
    window.location.href = url
  }, 3700);
});

fetchURL = document.URL + "/send"

const sendMail = (mail) => {
  fetch(fetchURL, {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.json();
  });
};



// index
// const req = new XMLHttpRequest();
// req.onreadystatechange = function () {
//   if (req.readyState == 4 && req.status == 200) {
//     const user = JSON.parse(req.response).user;
//     document.getElementById("welcome-message").innerText = `Welcome ${user.username}!!`;
//   }
// };
// req.open("GET", url + "/user", true);
// req.send();

//login
// const urlParams = new URLSearchParams(window.location.search);
// const info = urlParams.get('info');
// console.log(urlParams)

// if (info) {
//   const errorMessage = document.getElementById("error-message");
//   errorMessage.innerText = info;
//   errorMessage.style.display = "block";
// }