$('#searchInput').keypress(function(e){
    if(e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
})

function storeInput(){
	let inputString = document.getElementById("searchInput").value;
	let inputType = 0;
	if(document.getElementById('searchInputName').checked){
		inputType = 1;
	}
	var data = {'content':inputString, 'type':inputType};
	if(localStorage['searchRequest']){
		localStorage.removeItem('searchRequest');
	}
	localStorage.setItem("searchRequest", JSON.stringify(data));
}