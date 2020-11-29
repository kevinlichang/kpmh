//data inheritted from search result page for the default displaying
var update = localStorage['updateData'];
var oldData;
if(update){
localStorage.removeItem('updateData');
oldData = JSON.parse(update);
}







/// Variable to hold actions 

var actions = 
'<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
'<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
'<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>';



/// Submit Button Logic
var submitBtn = document.getElementById("submitID");


function submitProfile(event){
    event.preventDefault();
}

submitBtn.addEventListener("click",submitProfile);


function fillOldData(obj){
    var tempArr = [];
    for(let i = 0; i < obj.length; i++){
        tempArr[i] = {};
        tempArr[i].Name = obj[i];
    }
    return tempArr;
}

/// Load table
function LoadProfile(){
    let testProfile ={
        "Fname": "John",
        "Lname": "Clarke",
        "Email": "clarjohn@oregonstate.edu",
        "Phone": "",
        "AccountActive": "false",
        "LinkedIn": "https://www.linkedin.com/in/jclarkew/",
        "Github": "https://github.com/clarjohn",
        "UserViz": "false",
        "Classes": [{"Name": "CS 161", "Show":"true", "UserAdded":"true"},
                     {"Name": "CS 162", "Show":"false", "UserAdded":"true"},
                     {"Name": "CS 290", "Show":"true", "UserAdded":"false"}],
         "Skills": [{"Name": "Python", "Show":"true", "UserAdded":"true"},
                     {"Name": "SQL", "Show":"true", "UserAdded":"true"}],
         "Org":[{"Name": "Climate Corp", "Show":"true", "UserAdded":"true"}] 
     }

     //profile inheritted from the search result page
     var testProfile2 = {};
     if(oldData){
        testProfile2.Fname = oldData.fname;
        testProfile2.Lname = oldData.lname;
        testProfile2.Email = oldData.email;
        testProfile2.Phone = oldData.phone;
        testProfile2.LinkedIn = oldData.linkedin;
        testProfile2.Github = oldData.github;
        testProfile2.Classes = fillOldData(oldData.classes);
        testProfile2.Skills = fillOldData(oldData.skills);
        testProfile2.Org = fillOldData(oldData.org);
        MentorProfile = testProfile2;
     }
     else{
        MentorProfile = testProfile
    }
};

function displayProfile(){
    $('#firstName').value = "John";

};

window.onload = function(event){
    console.log("loading profile")
    LoadProfile();
    $('#firstName').value = "John";
    event.preventDefault();
};


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





});

//values inheritted from result list page
if(oldData){
    $('#firstName').value = oldData.fname;
    $('#firstName').value = oldData.lname;
    $('#emailId').value = oldData.email;
    $('#phoneId').value = oldData.phone;
    $('#LinkedinId').value = oldData.linkedin;
    $('#GitId').value = oldData.github;
}