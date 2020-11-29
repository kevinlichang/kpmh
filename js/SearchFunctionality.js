//data inheritted from the index page
var data = localStorage['searchRequest'];
if(data){
var inputString = JSON.parse(data).content;
var inputType = JSON.parse(data).type;
}
var expertList = [];
var profileIndex = 0;
var postLink = 'localhost:4001/queries/searchprofiles?searchName=';



//class that store the data returned from the database
class Expert{
	constructor(userid, fname, lname, email, phone, classes, skills, org, linkedin, twitter, github, project){
		this.userid = userid;
		this.fname = fname;
		this.lname = lname; 
		this.email = email;
		this.phone = phone
		this.classes = classes;
		this.skills = skills; 
		this.org = org; 
		this.linkedin = linkedin;
		this.twitter = twitter;
		this.github = github;
		this.project = project;
	}
}


//sent get request based on the search type 
function sendData(){
	var req = new XMLHttpRequest();
	let payload = JSON.stringigy(reformatInput(inputString));
	//if search by Name
	if(inputType == 1){
		req.open("POST", "Link to search by name"+payload+"&appid="+apiKey, true);
	//if search by classes, skills and org
	}else{
		req.open("POST", "Link to search by CSO"+payload+"&appid="+apiKey, true);
	}
	req.send(null);
	req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        for(let i = 0; i < response.length; i++){
        	let temp = new expert();
        	temp.userid = response[i].userid;
        	temp.fname = response[i].fname;
        	temp.lname = response[i].lname;
        	temp.email = response[i].email;
        	temp.phone = response[i].phone;
        	temp.classes = response[i].classes;
        	temp.skills = response[i].skills;
        	temp.org = response[i].org;
        	temp.linkedin = response[i].linkedin;
        	temp.twitter = response[i].twitter;
        	temp.github = response[i].github;
        	temp.project = response[i].project;
        	expertList.push(temp);	
        }
      }else{
        console.log("Error in network request: " + req.statusText);
      }});
}


function reformatInput(inputStr){
	var inputValue = [];
	var tempStr = "";
	for(let i = 0; i < inputStr.length; i++){
		if(inputStr[i] != '-'){
			tempStr += inputStr[i];
		}
		if(inputStr[i] == '-' || i == inputStr.length - 1){
			inputValue.push(tempStr);
			tempStr = "";
		}
	}
	return {values:inputValue};
}

//formate the string made by classes, skills, or org 
function formatStr(objStr){
	if(objStr){
		var tempStr = "";
		for(let j = 0; j < objStr.length; j++){
			tempStr += objStr[j].tag_name;
			if(j != objStr.length - 1){
				tempStr += ", ";
			}
		}
		return tempStr;
	}else{
		return "";
	}
}

function formReposLink(gitStr){
	if(gitStr){
		tempStr = '';
		for(let i = 0; i < gitStr.length; i++){
			if(gitStr[i] == '/' && i != gitStr.Length - 1){
				tempStr = '';
			}else{
				tempStr += gitStr[i];
			}
		}
		return 'https://api.github.com/users/'+tempStr+'/repos';
	}else{
		return '';
	}	
}

function getData(){
	var dataBack = [];
	var req = new XMLHttpRequest();
	var payload= reformatInput(inputString);
	//if search by Name
	if(inputType == 1){
		payload.searchName = true;
	//if search by classes, skills and org
	}else{
		payload.searchName = false;
	}
	postLink += payload.searchName;
	req.open('POST', postLink, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(payload);
	req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        for(let i = 0; i < response.length; i++){
        	let temp = new expert();
        	temp.userid = response[i].userid;
        	temp.fname = response[i].fname;
        	temp.lname = response[i].lname;
        	temp.email = response[i].email;
        	temp.phone = response[i].phone;
        	temp.classes = formatStr(response[i].classes);
        	temp.skills = formatStr(response[i].skills);
        	temp.org = formatStr(response[i].org);
        	temp.linkedin = response[i].linkedin;
        	temp.twitter = response[i].twitter;
        	temp.github = response[i].github;
        	temp.project = formReposLink(response[i].github);
        	dataBack.push(temp);	
        }
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(JSON.stringify(payload));
   	return dataBack;
}


//implement temporary testing array is used before database implementation finishes. 
var exampleExperts = [
  {
      userid: 1,
      fname: "John",
      lname: "clarke",
      phone: "999999999",
      email: "clarjohn@oregonstate.edu",
      linkedin: "https://www.linkedin.com/in/jclarkew/",
      github: "https://github.com/clarjohn",
      twitter: "",
      classes:[{tag_name: "CS 161", tag_description:"Intro Computer Science" ,tag_show:true},
                {tag_name: "CS 162", tag_description:"Intro Computer Science 2" ,tag_show:true},
                {tag_name: "CS 290", tag_description:"Intro web development" ,tag_show:true}],
      skills:[{tag_name: "Python", tag_description:"" ,tag_show:true},
              {tag_name: "SQL", tag_description:"" ,tag_show:true}],
      org:[{tag_name: "Climate Corp", tag_description:"Product Manager" ,tag_show:true}],
  },
  {
    userid: 2,
    fname: "Jane",
    lname: "Doe",
    phone: "999999999",
    email: "DoeJane@oregonstate.edu",
    linkedin: "",
    github: "",
    twitter: "",
    classes:[{tag_name: "CS 161", tag_description:"Intro Computer Science" ,tag_show:true},
            {tag_name: "CS 162", tag_description:"Intro Computer Science 2" ,tag_show:true},
            {tag_name: "CS 290", tag_description:"Intro web development" ,tag_show:true}],
    skills:[{tag_name: "Python", tag_description:"" ,tag_show:true},
            {tag_name: "SQL", tag_description:"" ,tag_show:true}],
    org:[{tag_name: "Climate Corp", tag_description:"Product Manager" ,tag_show:true}],
  },
  {
      userid: 3,
      fname: "Emily",
      lname: "Earnhardt",
      phone: "5413602345",
      email: "EEarnhardt@oregonstate.edu",
      linkedin: "https://www.linkedin.com/in/EEarnhardt/",
      github: "https://github.com/kevinlichang",
      twitter: "https://twitter.com/EEarnhardt",
      classes:[{tag_name: "CS 161", tag_description:"Intro Computer Science" ,tag_show:true},
                {tag_name: "CS 162", tag_description:"Intro Computer Science 2" ,tag_show:true},
                {tag_name: "CS 290", tag_description:"Intro web development" ,tag_show:true}],
      skills:[{tag_name: "Python", tag_description:"" ,tag_show:true},
              {tag_name: "SQL", tag_description:"" ,tag_show:true}],
      org:[{tag_name: "Climate Corp", tag_description:"Product Manager" ,tag_show:true}],
  },
  {
    userid: 4,
    fname: "Mark",
    lname: "Smith",
    phone: "5413602345",
    email: "MSmith@oregonstate.edu",
    linkedin: "https://www.linkedin.com/in/MSmith/",
    github: "https://github.com/clarjohn",
    twitter: "https://twitter.com/MSmith",
    classes:[{tag_name: "CS 161", tag_description:"Intro Computer Science" ,tag_show:true},
            {tag_name: "CS 162", tag_description:"Intro Computer Science 2" ,tag_show:true},
            {tag_name: "CS 344", tag_description:"Intro web development" ,tag_show:true}],
    skills:[{tag_name: "Python", tag_description:"" ,tag_show:true},
            {tag_name: "SQL", tag_description:"" ,tag_show:true}],
    org:[{tag_name: "Climate Corp", tag_description:"Product Manager" ,tag_show:true}],
  },
];
expertList = exampleExperts;
for(let h = 0; h < exampleExperts.length; h ++){
	expertList[h].classes = formatStr(exampleExperts[h].classes)
	expertList[h].skills = formatStr(exampleExperts[h].skills)
	expertList[h].org = formatStr(exampleExperts[h].org)
	expertList[h].project = formReposLink(exampleExperts[h].github)
}


//used to send current selected data to the menter-profile page

function gitProject(reposLink){
	var show = document.getElementById("projectDisplay");
	if(reposLink){
		show.style.display = "initial";
		var request = new XMLHttpRequest();
	    request.open('GET', reposLink, 
	    true)
	    request.onload = function() {
	        var data = JSON.parse(this.response);
	        var statusHTML = '';
	        $.each(data, function(i, status){
	            statusHTML += '<div class="card"> \
	                                <a href= '+status.html_url+'> ' + status.name +  ' </a> \
	                            </div>';
	        });
	        $('.repos').html(statusHTML);
	    }
	    request.send();
		// Get the modal
		var modal = document.getElementById("myModal");
		// Get the button that opens the modal
		var btn = document.getElementById("myBtn");
		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];
		// When the user clicks on the button, open the modal
		btn.onclick = function() {
		  modal.style.display = "block";
		}
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		  modal.style.display = "none";
		}
		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		  if (event.target == modal) {
		    modal.style.display = "none";
		  }
		}
	}else{
		show.style.display = "none";
	}
}

//implementation of the page changed after clicking the expert's name 
function showProfile(result,index,event){
	let color = document.getElementsByClassName("clickable-row");
	for(let i = 0; i < color.length; i++){
		color[i].className = "clickable-row";
		if(i == index){
			color[i].className="clickable-row colored";
			profileIndex = i;
		}
	}
	document.getElementById("selectedName").innerHTML = result[index].lname+" "+result[index].fname;
	document.getElementById("selectedEmail").innerHTML = result[index].email;
	document.getElementById("selectedPhone").innerHTML = result[index].phone;
	document.getElementById("selectedClasses").innerHTML = result[index].classes;
	document.getElementById("selectedSkills").innerHTML = result[index].skills;
	document.getElementById("selectedOrg").innerHTML = result[index].org;
	document.getElementById("selectedLinkedin").innerHTML = result[index].linkedin;
	document.getElementById("selectedLinkedin").href = result[index].linkedin;
	document.getElementById("selectedTwitter").innerHTML = result[index].twitter;
	document.getElementById("selectedTwitter").href = result[index].twitter;
	document.getElementById("selectedGit").innerHTML = result[index].github;
	document.getElementById("selectedGit").href = result[index].github;
	gitProject(result[index].project);
	if(event){
		event.preventDefault();
	}
}

//implementation of the clickable names listed in the left half of search result page
function listNames(result){
	if(inputString){
		let temp ="";
		if(inputType == 1){
			temp += " by Name";
		}else if(inputType == 0){
			temp += " by CSO";
		}
		document.getElementById('searchInputString').innerHTML = inputString;
		document.getElementById("searchInputType").innerHTML = temp;
	}
	var tbody = document.getElementById("tableBody");
	for(let i = 0; i < expertList.length; i++){
		var newRow = document.createElement("tr");
		newRow.className = "clickable-row";
		newRow.setAttribute('onclick', 'showProfile(expertList,'+ i +')')
		var newTH = document.createElement("th");
		tbody.appendChild(newRow);
		newRow.appendChild(newTH);
		newTH.innerHTML = expertList[i].lname+" "+expertList[i].fname;
	}
}

//to send data to mentor-profile page when user click update button in this page
function storeUpdate(){
	var update = expertList[profileIndex];
	localStorage.setItem("updateData", JSON.stringify(update));
}


//sendData();
//expertList = getData();
listNames(expertList);
showProfile(expertList,0);

