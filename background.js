import { incrementGlassCount } from "./storage.js";

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
    title: "Bravo, un verre de plus !",
    message: "Je vous rappellerai pour le prochain verre bientôt !",
  });
}

function createGoalReachedNotif() {
  createNotification("goal_reached", {
    type: "basic",
    iconUrl: "icons/img_1.png",
    title: "Objectif atteint !",
    message:
      "Félicitations ! Vous avez atteint votre objectif d'hydratation aujourd'hui !",
    // buttons: [
    //   { title: "Continuer les rappels", iconUrl: "icons/img_1.png" },
    //   {
    //     title: "Arrêter les rappels pour aujourd'hui",
    //     iconUrl: "icons/img_1.png",
    //   },
    // ],
  });
}

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

// Background Script
function sendMessageToTabs(tabs) {
	for (const tab of tabs) {
		chrome.tabs.sendMessage(tab.id, { action: "changeColor" })
		.then((response) => {
		  console.log("Message from the content script:");
		  console.log(response.response);
		})
		.catch((error) => {
		  console.error(`Error: ${error}`);
		});
	}
}

function handleTimeToDrink() {
	createReminderNotif();
	chrome.tabs.query({ currentWindow: true, active: true })
    .then(sendMessageToTabs)
    .catch((error) => {
    	console.error(`Error: ${error}`);
    });
}


// crée un timer, en supprimant au préalable le timer précédent s'il
// existe
function startTimer(interval) {
  if (timerId) clearInterval(timerId);
  timerId = setInterval(handleTimeToDrink, interval);
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

// gère les clics de bouton dans la notif reminder
chrome.notifications.onButtonClicked.addListener((id, index) => {
  if (id === "drinking_reminder") {
    if (index === 0) startTimer(10000); // remind in 10
    if (index === 1) {
      chrome.action.openPopup()();
    }
    chrome.notifications.clear(id);
  }
});

// lance le timer à l'installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  startTimer(20000);
});
