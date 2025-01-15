import { getGlassCount, incrementGlassCount } from "./storage.js";
import { addGlass } from "./background.js";

const glassCounter = document.getElementById("counter");
const addGlassButton = document.getElementById("add-glass");
const endMessage = document.getElementById("endMessage");

// fonction générale pour update l'affichage
async function updateGlassCountDisplay() {
  const count = await getGlassCount();
  glassCounter.textContent = `${count} verres d’eau`;
}

const updateEndMessage = async () => {
  const glassCount = await getGlassCount();

  let message = `Lancez-vous ! \u{1F4AA}`; // Valeur par défaut
  if (glassCount === 1) {
    message = `Lancez-vous ! \u{1F4AA}`;
  } else if (glassCount === 2) {
    message = `C'est un bon début ! \u{1F331}`;
  } else if (glassCount === 3) {
    message = `Génial, continuez comme ça ! \u{1F91F}`;
  } else if (glassCount === 4) {
    message = `Vous êtes à mi-chemin de votre objectif ! \u{1F600}`;
  } else if (glassCount === 5) {
    message = `Persévérez ! \u{1F938}`;
  } else if (glassCount === 6) {
    message = `Dernière ligne droite ! \u{1F680}`;
  } else if (glassCount === 7) {
    message = `Vous y êtes presque ! \u{1F979}`;
  } else if (glassCount >= 8) {
    message = `Bravo ! \u{1F44F}`;
  }

  endMessage.textContent = message;
};

// Gère l'ajout d'un verre après un clic sur le bouton du popup
// Initialisation de l'affichage
document.addEventListener("DOMContentLoaded", async () => {
  // Initialisation
  await updateGlassCountDisplay();
  await updateEndMessage();

  // Gestionnaire pour le clic sur le bouton
  addGlassButton.addEventListener("click", async () => {
    await addGlass();
    await updateGlassCountDisplay();
    await updateEndMessage();
  });
});

// pour update l'affichage à chaque fois que la valeur est modifiée
// dans le storage
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.compteur && namespace === "local") {
    const newValue = changes.compteur.newValue || 0;
    console.log("Storage change detected:", changes.compteur.newValue);
    glassCounter.textContent = `${newValue} verres d’eau`;
  }
});
