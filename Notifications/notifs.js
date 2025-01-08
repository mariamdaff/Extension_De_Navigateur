chrome.runtime.onInstalled.addListener(() => {
	console.log('Extension installed');
	createReminderNotif();
});

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

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
	if (notificationId === 'drinking-reminder') {
		if (buttonIndex === 0) {
			console.log('User clicked "Remind me in 10!"');
			setTimeout(() => createReminderNotif(), 10000); // 10 seconds for testing
		} else if (buttonIndex === 1) {
			console.log('User clicked "Drinking now!"');
		}
	}
});
  