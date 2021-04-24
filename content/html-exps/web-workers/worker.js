self.addEventListener('message', (e) => {
	switch (e.data.eventType) {
		case 'plainMessageSent':
			if (e.data.userMessage === 'trolling') {
				self.postMessage({eventType: 'lallaaaaa'});
			} else {
				let userMessage = e.data.userMessage;
				for (var i = 1; i < 10000000; i++) {
					userMessage = btoa(userMessage);
					userMessage = atob(userMessage);
				}
				self.postMessage({eventType: 'complexMessageSent', complexMessage: userMessage});
			}
			break;
		default:
			throw new Error('Invalid message type: ' + e.data.eventType);
	}
});
