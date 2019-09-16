
const KEY_CODE_TILDE = 192;
const KEY_CODE_ESCAPE = 27;
const container = document.body;
const consoleInput = con.input; //document.querySelector(".simple-console-input");

window.addEventListener("keydown", (event)=> {
	var wasOpen = container.classList.contains("console-open");
	if (event.keyCode === KEY_CODE_ESCAPE) {
		container.classList.remove("console-open");
	}
	if (
		event.target.classList.contains("simple-console-input") ||
		!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.defaultPrevented)
	) {
		// TODO: if needed to type tildes/backticks, perhaps require a modifier like Ctrl+` / Ctrl+~ as the shortcut
		// if (event.keyCode === KEY_CODE_TILDE && (event.ctrlKey || event.metaKey)) {
		if (event.keyCode === KEY_CODE_TILDE) {
			container.classList.toggle("console-open");
		}
	}
	var nowOpen = container.classList.contains("console-open");
	if (wasOpen !== nowOpen) {
		event.preventDefault();
		if (nowOpen) {
			consoleInput.focus();
		} else {
			consoleInput.blur();
		}
	}
});

const sideSelect = document.getElementById("open-from-side");
const updateSide = (event)=> {
	var side = sideSelect.value;
	container.classList.remove("console-anchor-top", "console-anchor-bottom", "console-anchor-left", "console-anchor-right");
	container.classList.add(`console-anchor-${side}`);
};
sideSelect.addEventListener("change", updateSide);
updateSide();

// Alternatively, don't pass `autofocus: true` to SimpleConsole!
// but I have the rest of the demo code shared which makes things simpler so whatever
// I'll just explicitly unfocus it for the tilde example
var initiallyOpen = container.classList.contains("console-open");
if (document.activeElement === consoleInput && !initiallyOpen) {
	consoleInput.blur();
}
