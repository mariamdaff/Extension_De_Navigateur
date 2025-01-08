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