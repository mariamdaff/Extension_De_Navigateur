// on install launch notif to test
chrome.runtime.onInstalled.addListener(() => {
	console.log('Extension installed');
	createReminderNotif(); // a virer, to test
});

function createBeBackNotif() {
	chrome.notifications.create('will-be-back', {
		type: 'basic',
		// iconUrl: 'Ressources/icons/',
		title: "I'll be back !",
		message: "Roger that, I'll remind you to drink in 10 minutes. See you !",
  	});
}

function createReminderNotif() {
	chrome.notifications.create('drinking-reminder', {
		type: 'basic',
		iconUrl: 'Ressources/icons/notif.png',
		title: 'Time to drink water !',
		message: "It's time to drink your next glass !\nWhat do you want to do ?",
		buttons: [
			{ title: 'Remind me in 10 !', iconUrl: 'Ressources/icons/time-forward-10.png' },
			{ title: 'Drinking now !', iconUrl: 'Ressources/icons/water-glass.png' }
	 	]
  	});
}

function remindInTen() {
	createBeBackNotif();
	setTimeout(() => createReminderNotif(), 10000); // 10 seconds for testing
}

function addGlass() {
	createDrankOneNotif(); // to dev
	// increment glass counter
	// check if goal is reached
	// if not
		// reset timer
	// if reached {
		// create congrats notif
	createGoalReachedNotif(); // to dev
		// ask if 
			// -> update goal
			// OR
			// -> keep notifications on every hour
			// OR
			// -> stay silent (but keep the possibility to add a glass by clicking the pop up)
		// }
}

// button handler
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
	if (notificationId === 'drinking-reminder') {
		if (buttonIndex === 0) {
			console.log('User clicked "Remind me in 10!"');
			chrome.notifications.clear("drinking-reminder", remindInTen());

		} else if (buttonIndex === 1) {
			console.log('User clicked "Drinking now!"');
			chrome.notifications.clear("drinking-reminder", addGlass());
		}
	}
});
  

/* NOTES

possible to add a callback function after the clear notif to automatically relaunch the timer, add a glass, show another notif

*/