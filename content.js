// change le texte en bleu
function changeTextColor() {
	document.body.style.color = "blue";
	console.log("text color modified to blue");
}
  
// Listen for messages from popup or background scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "changeColor") {
		changeTextColor();
		sendResponse({ status: "success" });
	}
});