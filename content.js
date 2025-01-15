// // change le texte en bleu
function changeTextColor() {
	document.body.style.color = "blue";
	console.log("text color modified to blue");
	setTimeout(() => {
		document.body.style.color = "black";
		console.log("text color modified to black");
	}, 5000);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "changeColor") {
	  changeTextColor();
	  sendResponse({ response: "Color changed successfully" });
	}
});