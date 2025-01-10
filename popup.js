import { getGlassCount, incrementGlassCount } from "./storage.js";
import { addGlass } from "./background.js";

const compteurVerre = document.getElementById("counter");
const boutonAjouter = document.getElementById("ajouter-un-verre");

// affichage du nombre de verres
function updateGlassCountDisplay() {
	getGlassCount((compteur) => {
		compteurVerre.textContent = `${compteur} verres d’eau`;
	});
}

// ajouter un verre quand on clique sur le bouton
boutonAjouter.addEventListener("click", () => {
	addGlass();
	updateGlassCountDisplay();
});

// affichage du nombre de verres initial
updateGlassCountDisplay();