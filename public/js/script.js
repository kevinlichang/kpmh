var url = document.URL;
url = url.slice(0, -8);

// ------------ Contact Page Form ------------------

const contactForm = document.getElementById("contact-form");
fetchURL = document.URL + "/send"
const formEvent = contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(contactForm);
  sendMail(mail, fetchURL);

  $("#send-text").addClass("hidden");
  $("#checkmark").removeClass("hidden").addClass("visible");
  $("#send-message-btn").attr("disabled", "disabled");
  $("#success-msg").text("Message sent! Returning to home page.")
  setTimeout(function () {
    window.location.href = url
  }, 3200);
});

const sendMail = (mail, url) => {
  fetch(url, {
    method: "post",
    body: mail,
  }).then((response) => {
    return response;
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