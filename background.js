import { incrementGlassCount } from "./storage.js";

// Écouter l'événement de démarrage du navigateur
chrome.runtime.onStartup.addListener(() => {
  console.log("Chrome a démarré, l'extension est active !");

  // Ajoutez ici le code que vous voulez exécuter au démarrage de Chrome
  startTimer(20000); // Exemple : démarrer un timer de 20 secondes
});

let timerId = null;

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

// notifications
function createDrankOneNotif() {
  createNotification("drank_one", {
    type: "basic",
    iconUrl: "icons/img_1.png",
    title: "Drank one!",
    message: "Yay, good job! One more glass!",
    contextMessage: "I'll remind you of your next glass soon!",
  });
}

function createGoalReachedNotif() {
  createNotification("goal_reached", {
    type: "basic",
    iconUrl: "icons/img_1.png",
    title: "Goal Reached!",
    message: "Congrats! You've reached your hydration goal today!",
    buttons: [
      { title: "Keep reminders coming!", iconUrl: "icons/img_1.png" },
      { title: "No more reminders today", iconUrl: "icons/img_1.png" },
    ],
  });
}

function createReminderNotif() {
  createNotification("drinking_reminder", {
    type: "basic",
    iconUrl: "icons/notif.png",
    title: "Time to drink water!",
    message: "It's time for your next glass!",
    buttons: [
      {
        title: "Remind me in 10 minutes",
        iconUrl: "icons/time-forward-10.png",
      },
      { title: "Add a glass of water!", iconUrl: "icons/water-glass.png" },
    ],
  });
}

// crée un timer, en supprimant au préalable le timer précédent s'il
// existe
function startTimer(interval) {
  if (timerId) clearInterval(timerId);
  timerId = setInterval(createReminderNotif, interval);
  console.log(`Timer started: ${interval}ms`);
}


// ajout d'un verre, envoie des notifs et reset du timer
export async function addGlass() {
  const newCount = await incrementGlassCount();
  if (newCount === 8) {
    createGoalReachedNotif();
  } else {
    createDrankOneNotif();
  }
  startTimer(20000);
}

// // fonction pour ajouter un verre et gérer les notifs
// export async function addGlass() {
//   await incrementGlassCount(async (nouveauCompte) => {
//     console.log(`IN ADD GLASS - Nouveau compteur : ${nouveauCompte}`);
//     if (nouveauCompte === 8) {
//       createGoalReachedNotif();
//     } else {
//       createDrankOneNotif();
//     }
//   });
//   startTimer(30000);
// }


// chrome.notifications.onButtonClicked.addListener((id, index) => {
//   if (id === "drinking_reminder") {
//     if (index === 0) {
//       startTimer(10000); // rappel dans 10 secondes
//     } else if (index === 1) {
//       // Ouvrir une fenêtre contextuelle
//       chrome.windows.create({
//         url: chrome.runtime.getURL("popup.html"),
//         type: "popup",
//         width: 400,
//         height: 400
//       });
//     }
//     chrome.notifications.clear(id);
//   }
// });
let isWindowOpen = false;
chrome.notifications.onButtonClicked.addListener((id, index) => {
  if (id === "drinking_reminder" && index === 1) {
    if (isWindowOpen) return; // Si une fenêtre est déjà ouverte, ne rien faire
    isWindowOpen = true;
    chrome.windows.create({
      url: "popup.html",
      type: "popup",
      width: 400,
      height: 300,
    }, (newWindow) => {
      console.log("Nouvelle fenêtre créée avec ID :", newWindow.id);
      // Fermer la fenêtre après 10 secondes
      setTimeout(() => {
        chrome.windows.remove(newWindow.id, () => {
          console.log("Fenêtre fermée après 10 secondes");
          isWindowOpen = false; // Marquer la fenêtre comme fermée
        });
      }, 10000);
    });
  }
});
// lance le timer à l'installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  startTimer(20000);
});
