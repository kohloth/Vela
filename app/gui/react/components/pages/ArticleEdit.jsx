import React, { useContext, useEffect, useState, useCallback } from 'react';
import ResourcesContext from '../../contexts/resourcesContext.js';
import { format, parse } from 'date-fns';
import { useParams, useHistory } from 'react-router-dom';
import FormGroup from '../modules/FormGroup.jsx';
import './ArticleEdit.scss';
import uniq from 'lodash/uniq.js';

const dateFormat = 'dd-MM-yyyy';

export default function ArticleEdit() {
	const { makeApiRequest } = useContext(ResourcesContext);
	const history = useHistory();
	let { articleKey: articleKeyParam } = useParams();
	const [articleKey, setArticleKey] = useState(articleKeyParam || '');
	const [articleTitle, setArticleTitle] = useState('');
	const [articleKeywords, setArticleKeywords] = useState('');
	const [articleCreatedAt, setArticleCreatedAt] = useState('');
	const [articleUpdatedAt, setArticleUpdatedAt] = useState('');
	const [articleCreatedAtPlaceholder, setArticleCreatedAtPlaceholder] = useState('');
	const [articleUpdatedAtPlaceholder, setArticleUpdatedAtPlaceholder] = useState('');
	const [articleBody, setArticleBody] = useState('');
	const reload = useCallback(() => {
		if (!articleKeyParam) return;
		(async () => {
			const res = await makeApiRequest('article.find', { args: [articleKey] });
			const { data } = res;
			if (!data) return;
			setArticleKey(data._key);
			setArticleTitle(data.title || '');
			setArticleKeywords(uniq(data.keywords).join(', ').trim());
			if (data.createdAt) {
				setArticleCreatedAtPlaceholder(format(new Date(data.createdAt), dateFormat));
			}
			if (data.updatedAt) {
				setArticleUpdatedAtPlaceholder(format(new Date(data.updatedAt), dateFormat));
			}
			setArticleBody(data.body || '');
		})();
	}, [
		articleKeyParam,
		makeApiRequest,
		setArticleKey,
		setArticleTitle,
		setArticleKeywords,
		setArticleCreatedAt,
		setArticleUpdatedAt,
		setArticleBody,
	]);
	useEffect(() => {
		reload();
	}, []);
	const saveArticle = useCallback(async () => {
		let methodName = 'article.create';
		let args = {
			title: articleTitle,
			keywords: articleKeywords.split(',').map(kw => kw.trim()),
			createdAt: articleCreatedAt || null,
			updatedAt: articleUpdatedAt || null,
			body: articleBody,
		};
		if (articleKey) {
			methodName = 'article.update';
			args = [articleKey, args];
		}
		const result = await makeApiRequest(methodName, { args });
		if (!articleKey) {
			history.push(`/article-edit/${result.data.lastInsertKey}`);
			setTimeout(() => {
				reload();
			}, 500);
		}
	}, [
		articleKey,
		articleTitle,
		articleKeywords,
		articleCreatedAt,
		articleUpdatedAt,
		articleBody,
	]);
	return (
		<form className="article-edit">
			<FormGroup label="Title">
				<input
					className="article-edit__form-group-control"
					type="text"
					value={articleTitle}
					onChange={event => setArticleTitle(event.target.value)}
				/>
			</FormGroup>
			<FormGroup label="Tags">
				<input
					className="article-edit__form-group-control"
					type="text"
					value={articleKeywords}
					onChange={event => setArticleKeywords(event.target.value)}
				/>
			</FormGroup>
			<FormGroup label="Created at">
				<input
					className="article-edit__form-group-control"
					type="text"
					value={articleCreatedAt}
					onChange={event => setArticleCreatedAt(event.target.value)}
					placeholder={articleCreatedAtPlaceholder}
				/>
			</FormGroup>
			<FormGroup label="Updated at">
				<input
					readOnly
					className="article-edit__form-group-control"
					type="text"
					value={articleUpdatedAt}
					onChange={event => setArticleUpdatedAt(event.target.value)}
					placeholder={articleUpdatedAtPlaceholder}
				/>
			</FormGroup>
			<textarea
				className="article-edit__body-input"
				value={articleBody}
				onChange={event => setArticleBody(event.target.value)}
			/>
			<button className="article-edit__save-button" onClick={event => {
				event.preventDefault();
				saveArticle();
			}}>Save</button>
		</form>
	);
}