
var SimpleConsole = function(options){

	if(!options.handleCommand){
		throw new Error("options.handleCommand is required");
	}

	var handle_command = options.handleCommand;
	var placeholder = options.placeholder || "";
	var autofocus = options.autofocus;
	var storage_id = options.storageID || "simple-console";

	var add_chevron = function(element){
		var icon = document.createElement("span");
		icon.className = "octicon octicon-chevron-right";
		element.insertBefore(icon, element.firstChild);
	};

	var console_element = document.createElement("div");
	console_element.className = "simple-console";

	var output = document.createElement("div");
	output.className = "simple-console-output";
	output.setAttribute("role", "log");
	output.setAttribute("aria-live", "polite");

	var input_wrapper = document.createElement("div");
	input_wrapper.className = "simple-console-input-wrapper";
	add_chevron(input_wrapper);

	var input = document.createElement("input");
	input.className = "simple-console-input";
	input.setAttribute("autofocus", "autofocus");
	input.setAttribute("placeholder", placeholder);
	input.setAttribute("aria-label", placeholder);

	console_element.appendChild(output);
	console_element.appendChild(input_wrapper);
	input_wrapper.appendChild(input);

	var clear = function(){
		output.innerHTML = "";
	};

	var log = function(content){
		var was_scrolled_to_bottom = output.is_scrolled_to_bottom();

		var entry = document.createElement("div");
		entry.className = "entry";
		if(content instanceof Element){
			entry.appendChild(content);
		}else{
			entry.innerText = entry.textContent = content;
		}
		output.appendChild(entry);

		setTimeout(function(){
			if(was_scrolled_to_bottom){
				output.scroll_to_bottom();
			}
		});

		return entry;
	};

	var logHTML = function(html){
		var entry = log("");
		entry.innerHTML = html;
		return entry;
	};

	var error = function(error_message){
		var error_entry = log(error_message);
		error_entry.classList.add("error");
		return error_entry;
	};

	output.is_scrolled_to_bottom = function(){
		return output.scrollTop + output.clientHeight >= output.scrollHeight
	};

	output.scroll_to_bottom = function(){
		output.scrollTop = output.scrollHeight;
	};

	var command_history = [];
	var cmdi = command_history.length;
	var command_history_key = storage_id + " command history";

	var load_command_history = function(){
		try{
			command_history = JSON.parse(localStorage[command_history_key]);
			cmdi = command_history.length;
		}catch(e){}
	};

	var save_command_history = function(){
		try{
			localStorage[command_history_key] = JSON.stringify(command_history);
		}catch(e){}
	};

	load_command_history();

	input.addEventListener("keydown", function(e){
		if(e.keyCode === 13){ // Enter

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

	this.element = console_element;

	this.handleUncaughtErrors = function(){
		window.onerror = error;
	};

	this.log = log;
	this.logHTML = logHTML;
	this.error = error;
	this.clear = clear;

};
