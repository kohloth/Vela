export default function(db) {
	const collectionNames = [
		'articles',
		'contacts',
		'passphrases'
	];
	return Promise.all(collectionNames.map(async c => {
		return new Promise(async resolve => {
			const col = db.collection(c);
			if (await col.exists()) {
				await col.drop();
			}
			await col.create();
			resolve();
		});
	}));
}