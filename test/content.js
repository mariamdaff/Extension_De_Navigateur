// let's go !

// fonction qui récupère les éléments HTML qui sont du texte

textToModify = document.querySelector("body");

function changeTextColors(text) {
	console.log("im here");
	text.style.color = "blue"; 
}

changeTextColors(textToModify);