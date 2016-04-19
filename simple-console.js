
var output = document.getElementById("simple-console-output");
var input = document.getElementById("simple-console-input");

var clear = function(){
	output.innerHTML = "";
};

var log = function(text){
	var was_scrolled_to_bottom = output.is_scrolled_to_bottom();
	
	var entry = document.createElement("div");
	entry.className = "entry";
	entry.innerText = entry.textContent = text;
	output.appendChild(entry);
	
	setTimeout(function(){
		if(was_scrolled_to_bottom){
			output.scroll_to_bottom();
		}
	});
	
	return entry;
};

output.is_scrolled_to_bottom = function(){
	return output.scrollTop + output.clientHeight >= output.scrollHeight
};

output.scroll_to_bottom = function(){
	output.scrollTop = output.scrollHeight;
};

var command_history = [];
var cmdi = command_history.length;

var load_command_history = function(){
	try{
		command_history = JSON.parse(localStorage.command_history);
		cmdi = command_history.length;
	}catch(e){}
};

var save_command_history = function(){
	try{
		localStorage.command_history = JSON.stringify(command_history);
	}catch(e){}
};

load_command_history();

input.addEventListener("keydown", function(e){
	if(e.keyCode === 13){ // Enter
		// if(!e.shiftKey){
			// @TODO: textarea?
		// }
		
		var command = input.value;
		if(command === ""){ return; }
		input.value = "";
		
		command_history.push(command);
		cmdi = command_history.length;
		save_command_history();
		
		var command_entry = log(command);
		command_entry.classList.add("input");
		var icon = document.createElement("span");
		icon.className = "octicon octicon-chevron-right";
		command_entry.insertBefore(icon, command_entry.firstChild);
		
		output.scroll_to_bottom();
		
		handle_command(command);
		
	}else if(e.keyCode === 38){ // Up
		input.value = (--cmdi < 0) ? (cmdi = -1, "") : command_history[cmdi];
		input.setSelectionRange(input.value.length, input.value.length);
		e.preventDefault();
	}else if(e.keyCode === 40){ // Down
		input.value = (++cmdi >= command_history.length) ? (cmdi = command_history.length, "") : command_history[cmdi];
		input.setSelectionRange(input.value.length, input.value.length);
		e.preventDefault();
	}else if(e.keyCode === 46 && e.shiftKey){ // Shift+Delete
		if(input.value === command_history[cmdi]){
			command_history.splice(cmdi, 1);
			cmdi = Math.max(0, cmdi - 1)
			input.value = command_history[cmdi] || "";
			save_command_history();
		}
		e.preventDefault();
	}
});

window.onerror = function(error_message, etc){
	var error_entry = log(error_message);
	error_entry.classList.add("error");
};
