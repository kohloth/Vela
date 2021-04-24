import { aql } from 'arangojs';
import sanitiseInput from "../utils/sanitiseInput.js";

const fields = {
	body: String,
	title: String,
	createdAt: Date,
	updatedAt: Date,
	keywords: [String],
};

export default function (deps) {

	const { db } = deps;

	return {

		async create(articleDataIn) {
			const articleData = JSON.parse(JSON.stringify(articleDataIn));
			const now = new Date();
			if (!articleData.createdAt) articleData.createdAt = now;
			if (!articleData.updatedAt) articleData.updatedAt = now;
			const safeArticleData = sanitiseInput(fields, articleData);
			const res = await db.query(aql`
				INSERT ${safeArticleData} IN articles
					LET inserted = NEW RETURN inserted._key
			`);
			return { lastInsertKey: (await res.all())[0] };
		},

		async remove(articleKey) {
			return db.query(aql`
				FOR article IN articles
					FILTER article._key == ${articleKey.toString()}
					REMOVE article IN articles
			`);
		},

		async update(articleKey, articleDataIn) {
			const articleData = { ...articleDataIn };
			if (!articleData.updatedAt) {
				articleData.updatedAt = new Date();
			}
			const safeArticleData = sanitiseInput(fields, articleData);
			if (!safeArticleData.createdAt && 'createdAt' in safeArticleData) delete safeArticleData.createdAt;
			return db.query(aql`
				FOR article IN articles
					FILTER article._key == ${articleKey.toString()}
					UPDATE article WITH ${safeArticleData} IN articles
			`);
		},

		async find(articleKey) {
			const result = await db.query(aql`
				FOR article IN articles
					FILTER article._key == ${articleKey.toString()}
					RETURN article
			`);
			const all = await result.all();
			if (all.length) {
				return all[0];
			}
		},

		async get({
			filters = {},
			skip = 0,
			take = 999999999,
			select = ['_key', 'title', 'createdAt', 'updatedAt', 'keywords']
		} = {}) {
			const {
				filterKey,
				filterTitle,
				filterKeywords = [],
				oldestCreatedDate,
				newestCreatedDate,
			} = filters;
			const result = await db.query({
				query: `
					FOR article IN articles
						FILTER LENGTH(@filterKeywords) == 0 ? true :
							LENGTH(INTERSECTION(@filterKeywords, article.keywords)) == LENGTH(@filterKeywords)
						FILTER @oldestCreatedDate == null ? true : article.createdAt > @oldestCreatedDate
						FILTER @newestCreatedDate == null ? true : article.createdAt < @newestCreatedDate
						FILTER @filterTitle == null ? true : CONTAINS(LOWER(article.title), LOWER(@filterTitle))
						FILTER @filterKey == null ? true : article._key == @filterKey
						SORT article.updatedAt DESC, article.createdAt DESC
						LIMIT @skip, @take
						RETURN MERGE(
							article,
							{ updatedAt: article.updatedAt || article.createdAt }
						)
				`,
				bindVars: {
					filterKey: (filterKey || '').toString() || null,
					filterTitle: filterTitle || null,
					filterKeywords,
					oldestCreatedDate: oldestCreatedDate || null,
					newestCreatedDate: newestCreatedDate || null,
					skip,
					take,
				}
			});
			return (await result.all()).map(article => {
				const data = {};
				select.forEach(fieldKey => data[fieldKey] = article[fieldKey]);
				return data;
			});
		},
	};
}
