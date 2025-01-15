// fonction qui change le texte en bleu, 
// puis 5 secondes plus tard le remets en noir
function changeTextColor() {
	document.body.style.color = "blue";
	console.log("text color modified to blue");
	setTimeout(() => {
		document.body.style.color = "black";
		console.log("text color modified to black");
	}, 5000);
}

// event listerner qui attends une demande du back
// pour lancer le changement de couleur
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "changeColor") {
	  changeTextColor();
	  sendResponse({ response: "Color changed successfully" });
	}
});