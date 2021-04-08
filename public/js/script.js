let url = "http://localhost:4001";

$(document).ready(function(){
    // Send button funciton. 
    $("#send-message-btn").click(function(){   

        let fname = $("#fname").val();
        let lname = $("#lname").val();
        let message = $("#message").val();
        let email=$("#email").val();
        // Sending email function
        
        let subject = "New Message from " + fname + " " + lname;
        let text = message + "\n" + "Contact email: " + email;
        console.log(email);
        console.log(subject);
        console.log(text);
    
        $.post(url + "/emailer",
        {
            subject:subject,
            text:text
        });
    });

});