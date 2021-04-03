$(document).ready(function(){
    // Send button funciton. 
    $("#register-submit").click(function(){   

        // Sending email function
        var email,subject,text; 
        email=$("#email").val();
        subject = "New Message from " + $("#fname").val() + " " + $("#lname").val();
        text = $("#message").val();
    
        $.get(url + "send-email-confirm",
        {
            subject:subject,
            text:text},
            null)
    });

});