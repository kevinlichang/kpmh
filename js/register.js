/// Variable to hold actions 

var actions = 
'<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
'<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
'<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>';

//variables for urls for endpoints
var url = document.URL;
url = url.slice(0, -14)
var confirmURL = url + "/confirm-profile.html"


//// dynamic Table Classes
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
    //var actions = $('#tab_class td:last-child').html();
    // Append table for classes
    $('#add-class').click(function(){
        $(this).attr("disabled", "disabled");
        var index = $('#tab_class tbody tr:last-child').index();
        var row = '<tr>' +
            '<td class ="editable"><input type="text" class="form-control" name="Class" id="ClassName"></td>' +
            '<td class ="editable"><input type="text" class="form-control" name="Title" id="ClassTitle"></td>' +
            '<td><input type="checkbox" class="form-control" name="ShowClass" id="ClassShow"></td>' +
            '<td>' + actions + '</td>' +
        '</tr>';
        $('#tab_class').append(row);
        $('#tab_class tbody tr').eq(index + 1).find(".add, .edit").toggle();        
        $('[data-toggle="tooltip"]').tooltip();
    });

    // Append table for skills
    $('#add-Skills').click(function(){
        $(this).attr("disabled", "disabled");
        var index = $('#tab_Skills tbody tr:last-child').index();
        var row = '<tr>' +
            '<td  class ="editable"><input type="text" class="form-control" name="Skill" id="SkillName"></td>' +
            '<td><input type="checkbox" class="form-control" name="ShowSkill" id="SkillShow"></td>' +
            '<td>' + actions + '</td>' +
        '</tr>';
        $('#tab_Skills').append(row);
        $('#tab_Skills tbody tr').eq(index + 1).find(".add, .edit").toggle();       
        $('[data-toggle="tooltip"]').tooltip();
    });

        // Append table for skills
        $('#add-org').click(function(){
            $(this).attr("disabled", "disabled");
            var index = $('#tab_org tbody tr:last-child').index();
            var row = '<tr>' +
                '<td  class ="editable"><input type="text" class="form-control" name="Org" id="OrgName"></td>' +
                '<td  class ="editable"><input type="text" class="form-control" name="OrgRole" id="OrgRole"></td>' +
                '<td><input type="checkbox" class="form-control" name="ShowSkill" id="OrgShow"></td>' +
                '<td>' + actions + '</td>' +
            '</tr>';
            $('#tab_org').append(row);
            $('#tab_org tbody tr').eq(index + 1).find(".add, .edit").toggle();      
            $('[data-toggle="tooltip"]').tooltip();
        });
// Add row on add button click
    $(document).on("click", ".add", function(){
        var empty = false;
        var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function(){
            if(!$(this).val()){
                $(this).addClass("error");
                empty = true;
            } else{
                $(this).removeClass("error");
            }
        });
        $(this).parents("tr").find(".error").first().focus();
        if(!empty){
            input.each(function(){
                $(this).parent("td").html($(this).val());
            });         
            $(this).parents("tr").find(".add, .edit").toggle();
            $('.add-new').removeAttr("disabled");
        }       
    });
// Edit row on edit button click
    $(document).on("click", ".edit", function(){        
        $(this).parents("tr").find(".editable").each(function(){
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
        });     
        $(this).parents("tr").find(".add, .edit").toggle();
        $(".add-new").attr("disabled", "disabled");
    });
// Delete row on delete button click
    $(document).on("click", ".delete", function(){
        $(this).tooltip('hide');
        $(this).parents("tr").remove();
        $(".add-new").removeAttr("disabled");
    });




//Submit button funciton. 

    $("#register-submit").click(function(){   

        //data to be sent to database







        // Sending email function
        var to,subject,text; 
        to=$("#email").val();
        subject = "Confirm Profile for " + $("#firstname").val();

        var fullName = $("#firstname").val() + " " + $("#lastname").val();
        var confirmProfileLink = confirmURL + "?email=" + $("#email").val();
        text = "A new profile has been registered for " + fullName + ". Please click here to confirm: " + confirmProfileLink;
    
        $.get(url + "send-email-confirm",
        {
            to:to,
            subject:subject,
            text:text},
            null)
    });




});