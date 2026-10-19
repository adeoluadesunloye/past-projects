
const loginPopup = document.querySelector(".login-popup");

const close = document.querySelector(".close");



window.addEventListener("load",function(){
	showPopup();
})

function showPopup(){
	const timeLimit = 3
	let i = 0;
	const timer = setInterval(function(){
		i++;
		if(i == timeLimit){
			clearInterval(timer);
			loginPopup.classList.add("show");
		}
		console.log(i)
	}, 1000);
}

close.addEventListener("click",function(){
	loginPopup.classList.remove("show");
})


const wrapper = document.querySelector(".wrapper");
const form    = wrapper.querySelectorAll(".form");
const submitInput = form[0].querySelector(".btn");


function getDataForm(e){
	if (document.querySelector(".name").value === "") {
		 input.setCustomValidity(valOrFunction(options.defaultText, window, [input]));
	}

	else {

	  e.preventDefault();

	  var formData = new FormData(form[0]);
        document.getElementById("firstname").innerHTML = "Welcome " + formData.get('nameField') + "!";
	  $(document).ready(function(){
    $(".test").hide();
    $(".okay").show();
    $(document.getElementById("outpute").innerHTML = "Welcome " + formData.get('nameField') + "!").show();
});
 
	}
}


document.addEventListener('DOMContentLoaded', function(){

  submitInput.addEventListener('click', getDataForm, false)

}, false);

