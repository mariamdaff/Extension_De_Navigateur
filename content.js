// let's go !

// fonction qui récupère les éléments HTML qui sont du texte


export function changeTextColors() {
	textToModify = document.querySelector("body");
	textToModify.style.color = "blue";
	console.log("text color modified to blue");
}

changeTextColors();