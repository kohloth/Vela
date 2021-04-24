import React, { useContext, useEffect, useState } from 'react';
import ResourcesContext from '../../contexts/resourcesContext.js';
import { format } from 'date-fns';
import './ArticleView.scss';
import { useParams } from 'react-router-dom';
import Mark from '../service/Mark.js';
import uniq from 'lodash/uniq.js';

export default function ArticleEdit() {
	const { makeApiRequest } = useContext(ResourcesContext);
	const [article, setArticle] = useState([]);
	let { articleKey } = useParams();
	useEffect(() => {
		(async () => {
			const res = await makeApiRequest('article.find', { args: [articleKey] });
			const { data } = res;
			setArticle(data);
		})();
	}, [makeApiRequest, setArticle]);
	return (
		<div className="article-view">
			<h1 className="article-view__title">Title: {article?.title}</h1>
			<div className="article-view__keywords">Keywords: {uniq(article?.keywords || []).map(kw => (
				<span key={kw} className="article-view__keyword">{kw}</span>
			))}</div>
			<p className="article-view__created-at">Created: {article?.createdAt && format(new Date(article?.createdAt), 'dd-MM-yyyy')}</p>
			<p className="article-view__updated-at">Updated: {article?.updatedAt && format(new Date(article?.updatedAt), 'dd-MM-yyyy')}</p>
			<span className="article-view__body"><Mark text={article?.body} /></span>
		</div>
	);
}