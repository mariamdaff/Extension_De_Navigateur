import { getGlassCount, incrementGlassCount } from "./storage.js";
import { addGlass } from "./background.js";

const glassCounter = document.getElementById("counter"); // Récupère l'élément pour afficher le nombre de verres
const addGlassButton = document.getElementById("add-glass"); // Bouton pour ajouter un verre
const endMessage = document.getElementById("endMessage"); // Récupère l'élément pour afficher le message
const toggleRemindersButton = document.getElementById("toggle-reminders"); // Bouton pour activer/désactiver les rappels

// fonction générale pour update l'affichage du nombre de verres
async function updateGlassCountDisplay() {
  const count = await getGlassCount(); // Récupère le nombre actuel de verres
  glassCounter.textContent = `${count} verres d’eau`; // Met à jour l'affichage
}

// Fonction pour mettre à jour le message à afficher en fonction du nombre de verres
const updateEndMessage = async () => {
  const glassCount = await getGlassCount(); // récupère le nombre de verres

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

  endMessage.textContent = message; //met à jour l'affichage du message
};

// Fonction pour activer ou désactiver les rappels en envoyant un message à background.js
async function toggleReminders() {
  chrome.runtime.sendMessage({ action: "toggleNotifications" }, (response) => {
    if (response.status === "notifications_enabled") {
      toggleRemindersButton.textContent = "Désactiver les rappels"; // Si les rappels sont activés
    } else if (response.status === "notifications_disabled") {
      toggleRemindersButton.textContent = "Activer les rappels"; // Si les rappels sont désactivés
    }
  });
}

// Au moment du chargement de la popup
document.addEventListener("DOMContentLoaded", async () => {
  await updateGlassCountDisplay(); // Initialisation du compteur de verres
  await updateEndMessage(); // Met à jour le message de fin

  // Récupère l'état actuel des rappels et met à jour le texte du bouton
  const data = await chrome.storage.local.get("notificationsEnabled");
  const notificationsActive = data.notificationsEnabled ?? true; // Par défaut activé
  toggleRemindersButton.textContent = notificationsActive
    ? "Désactiver les rappels"
    : "Activer les rappels"; // Affiche le bon texte sur le bouton

  // Gestionnaire pour ajouter un verre
  addGlassButton.addEventListener("click", async () => {
    await addGlass(); // Ajoute un verre et gère les notifications
    await updateGlassCountDisplay(); // Met à jour l'affichage du compteur
    await updateEndMessage(); // Met à jour le message
  });

  // Gestionnaire pour activer/désactiver les rappels
  toggleRemindersButton.addEventListener("click", toggleReminders); // Active ou désactive les rappels
});

// Surveillance des changements dans le local storage pour mettre à jour l'affichage en temps réel
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.compteur && namespace === "local") {
    // Si le compteur change
    const newValue = changes.compteur.newValue || 0; // Récupère la nouvelle valeur
    console.log("Storage change detected:", newValue); // Log du changement
    glassCounter.textContent = `${newValue} verres d’eau`; // Met à jour l'affichage du compteur
  }
});
