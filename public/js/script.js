let url = "http://localhost:4001";

$(document).ready(function(){
    // Send button funciton. 
    $("#send-message-btn").click(function(){   

        // Sending email function
        var email,subject,text; 
        email=$("#email").val();
        subject = "New Message from " + $("#fname").val() + " " + $("#lname").val();
        text = $("#message").val() + "\n" + "Contact email: " + email;
    
        $.get(url + "/send-message",
        {
            subject:subject,
            text:text},
            null)
    });

});