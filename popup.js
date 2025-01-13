import { getGlassCount, incrementGlassCount } from "./storage.js";
import { addGlass } from "./background.js";

const compteurVerre = document.getElementById("counter");
const boutonAjouter = document.getElementById("ajouter-un-verre");

// affichage du nombre de verres
async function updateGlassCountDisplay() {
  const compteur = await getGlassCount();
  compteurVerre.textContent = `${compteur} verres d’eau`;
}
// ajouter un verre quand on clique sur le bouton
boutonAjouter.addEventListener("click", async () => {
  await addGlass();
  await updateGlassCountDisplay();
});
// Initialisation
updateGlassCountDisplay();

chrome.storage.onChanged.addListener((changes, namespace) => {
	if (changes.compteur && namespace === "local") {
		console.log("Storage change detected:", changes.compteur.newValue);
		compteurVerre.textContent = `${changes.compteur.newValue} verres d’eau`;
	}
});

document.addEventListener("DOMContentLoaded", updateGlassCountDisplay);
