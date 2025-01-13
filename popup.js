import { getGlassCount, incrementGlassCount } from "./storage.js";
import { addGlass } from "./background.js";

const glassCounter = document.getElementById("counter");
const addGlassButton = document.getElementById("add-glass");

// fonction générale pour update l'affichage

async function updateGlassCountDisplay() {
	const count = await getGlassCount();
	glassCounter.textContent = `${count} verres d’eau`;
}

// Gère l'ajout d'un verre après un clic sur le bouton du popup
addGlassButton.addEventListener("click", async () => {
	await addGlass();
	console.log("in add glass button");
	await updateGlassCountDisplay();
});

// initialisation : dès que le DOM est chargé
document.addEventListener("DOMContentLoaded", updateGlassCountDisplay);

// pour update l'affichage à chaque fois que la valeur est modifiée 
// dans le storage
chrome.storage.onChanged.addListener((changes, namespace) => {
	if (changes.compteur && namespace === "local") {
		const newValue = changes.compteur.newValue || 0;
		glassCounter.textContent = `${newValue} verres d’eau`;
	}
});
