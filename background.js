import { incrementGlassCount } from "./storage.js";

let timerId = null; // Identifiant du timer pour les rappels
let notificationsEnabled = true; // notifications activées par défaut

// Une fonction générale pour gérer les notification,
// supprime toute notification avec le même id pour éviter les
// erreurs, avant d'en recréer une + vérifie qu'il n'y a pas d'erreurs
// renvoyée par chrome lors de la création
function createNotification(id, options) {
  chrome.notifications.clear(id, () => {
    chrome.notifications.create(id, options, (notifId) => {
      if (chrome.runtime.lastError) {
        console.error(
          `Notification error: ${chrome.runtime.lastError.message}`
        );
      } else {
        console.log(`Notification created: ${notifId}`);
      }
    });
  });
}

// notification après verre bu
function createDrankOneNotif() {
  createNotification("drank_one", {
    type: "basic",
    iconUrl: "icons/img_1.png",
    title: "Bravo, un verre de plus !",
    message: "Continuez comme ça !",
  });
}

// notification objectif atteint
function createGoalReachedNotif() {
  createNotification("goal_reached", {
    type: "basic",
    iconUrl: "icons/img_1.png",
    title: "Objectif atteint !",
    message:
      "Félicitations ! Vous avez atteint votre objectif d'hydratation aujourd'hui !",
  });
}

// notification rappel avec bouton (qui ouvre le popup
// pour ajouter un verre)
function createReminderNotif() {
  createNotification("drinking_reminder", {
    type: "basic",
    iconUrl: "icons/notif.png",
    title: "Il est l'heure de boire de l'eau !",
    message: "N'oubliez pas de boire votre prochain verre !",
    buttons: [
      {
        title: "Rappeler dans 10 minutes",
        iconUrl: "icons/time-forward-10.png",
      },
      { title: "Ajouter un verre d'eau", iconUrl: "icons/water-glass.png" },
    ],
  });
}

// function qui communique avec le content script
// pour changer la couleur du texte d'une page
// web en bleu lorsque le rappel arrive
function sendMessageToTabs(tabs) {
  for (const tab of tabs) {
    chrome.tabs
      .sendMessage(tab.id, { action: "changeColor" })
      .then((response) => {
        console.log("Message from the content script:");
        console.log(response.response);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  }
}

// gestionnaire pour la notif de rappel et la
// communication avec le content script
function handleTimeToDrink() {
	createReminderNotif();
	chrome.tabs.query({ active: true })
    .then(sendMessageToTabs)
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
}

// crée un timer, en supprimant au préalable le timer précédent s'il
// existe. (lance le gestionnaire pour la notif de rappel et la
// communication avec le content script)
// ne fais rien si les notifications sont désactivées (via le bouton popup)
function startTimer(interval) {
  if (!notificationsEnabled) return; // Si les notifications sont désactivées, on arrête ici

  if (timerId) clearInterval(timerId); // On clear l'ancien timer si existant
  timerId = setInterval(handleTimeToDrink, interval); // Lance un nouveau timer

  console.log(`Timer started: ${interval}ms`);
}

// Fonction pour arrêter le timer
function stopTimer() {
  if (timerId) {
    clearInterval(timerId); // Arrêt du timer
    timerId = null; // Remise à null du timer
    console.log("Timer stopped.");
  }
}

// Fonction pour ajouter un verre et gérer les notifications
export async function addGlass() {
  const newCount = await incrementGlassCount(); // Incrémente le compteur de verres
  if (newCount === 8) {
    createGoalReachedNotif(); // Si l'objectif est atteint, on envoie une notification
  } else {
    createDrankOneNotif(); // Sinon, on envoie une notification pour un verre ajouté
  }
  startTimer(20000); // Relance le timer de la notif rappel
}

// Gestion des clics de bouton dans la notification de rappel
chrome.notifications.onButtonClicked.addListener((id, index) => {
  if (id === "drinking_reminder") {
    if (index === 0) startTimer(10000); // Rappeler dans 10 minutes
    if (index === 1) {
      chrome.action.openPopup()(); // Ouvre la popup pour ajouter un verre
    }
    chrome.notifications.clear(id); // Supprime la notification une fois le bouton cliqué
  }
});

// Au moment de l'installation de l'extension
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  startTimer(20000); // Démarre un timer pour les rappels dès l'installation
});

// Gestion des messages reçus de la popup pour activer/désactiver les notifications
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleNotifications") {
    notificationsEnabled = !notificationsEnabled; // Inverse l'état des notifications

    // Sauvegarde de l'état dans chrome.storage
    chrome.storage.local.set({ notificationsEnabled }, () => {
      if (notificationsEnabled) {
        console.log("Rappels activés.");
        startTimer(20000); // Relance le timer si les rappels sont activés
        sendResponse({ status: "notifications_enabled" });
      } else {
        console.log("Rappels désactivés.");
        stopTimer(); // Arrête le timer si les rappels sont désactivés
        sendResponse({ status: "notifications_disabled" });
      }
    });

    // Retourner true pour indiquer que l'on utilise sendResponse de manière asynchrone
    return true;
  }
});
