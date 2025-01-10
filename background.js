import { getGlassCount, incrementGlassCount } from "./storage.js";

let timerId;

function startTimer(timeToSet) {
	if (timerId) {
		console.log("in if in start timer");
        clearInterval(timerId); // clear any old timer so only one is running at a time
	}
	console.log("in startTimer, timerID = " + timerId);
    timerId = setInterval(() => {
        console.log(`timer ${timerId} has been set for 30 seconds.`);
		createReminderNotif();
    }, timeToSet);
	console.log("in start timer, time so set = " + timeToSet);
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  startTimer(30000);
});
// lancer l'ouverture du pop-up ?
// une alerte qui explique comment fonctionne l'extension ?

// fonction pour ajouter un verre et gérer les notifs
export function addGlass() {
	let glassCount = getGlassCount();
  	incrementGlassCount((nouveauCompte) => {
    	console.log(`IN ADD GLASS - Nouveau compteur : ${nouveauCompte}`);
	});
    if ((glassCount + 1) === 8) {
    	createGoalReachedNotif();
    } else {
    	createDrankOneNotif();
    }
	startTimer(30000);
}

// function to create the notif for congratulating on drinking a new glass
function createDrankOneNotif() {
  chrome.notifications.create("drank-one", {
    type: "basic",
    iconUrl: "icons/img_1.png",
    title: "Drank one",
    message: "Yay, good job ! One more glass !",
    contextMessage:
      "I'll remind you your next glass in an hour, see you soon !",
  });
}

// function to create the notif for achieving goal
function createGoalReachedNotif() {
  chrome.notifications.create("goal-reached", {
    type: "basic",
    iconUrl: "icons/img_1.png",
    title: "Goal Reached !",
    message: "Congrats ! You reached you goal for today !",
    contextMessage: "What can I do for you now ?",
    buttons: [
      {
        title: "Keep sending me reminders for more hydratation !",
        iconUrl: "icons/img_1.png"
      },
      {
        title: "No more reminders for today :)",
        iconUrl: "icons/img_1.png"
      },
    ],
  });
}

// notif for when the "remind me in 10" is clicked
function createBeBackNotif() {
  chrome.notifications.create("will-be-back", {
    type: "basic",
    iconUrl: "icons/img_1.png",
    title: "I'll be back !",
    message: "Roger that, I'll remind you to drink in 10 minutes. See you !",
  });
}

// notif time to drink
function createReminderNotif() {
  chrome.notifications.create("drinking-reminder", {
    type: "basic",
    iconUrl: "icons/notif.png",
    title: "Time to drink water !",
    message: "It's time to drink your next glass !\nWhat do you want to do ?",
    buttons: [
      {
        title: "Remind me in 10 !",
        iconUrl: "icons/time-forward-10.png",
      },
      {
        title: "Drinking now !",
        iconUrl: "icons/water-glass.png",
      },
    ],
  });
}

// function to handle the remind in 10 case (notif, timeout, and remind)
function remindInTen() {
  createBeBackNotif();
  startTimer(10000);
}

// button handler
chrome.notifications.onButtonClicked.addListener(
  (notificationId, buttonIndex) => {
    console.log(
      `Button clicked in notification ${notificationId} with index ${buttonIndex}`
    );
    if (notificationId === "drinking-reminder") {
      if (buttonIndex === 0) {
        chrome.notifications.clear("drinking-reminder", remindInTen());
      } else if (buttonIndex === 1) {
        chrome.notifications.clear("drinking-reminder", addGlass());
      }
    }
  }
);

/* NOTES

possible to add a callback function after clearing notif to automatically relaunch the timer, add a glass, show another notif

- how much time do the notifs stay ? how to adjust that ?
- handle click on notif / closing notif without clicking the buttons
- 

*/