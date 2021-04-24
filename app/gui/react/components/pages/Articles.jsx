import React, { useContext, useEffect, useState, useCallback } from 'react';
import ResourcesContext from '../../contexts/resourcesContext.js';
import { format } from 'date-fns';
import './Articles.scss';
import { Link } from 'react-router-dom';
import FormGroup from '../modules/FormGroup.jsx';
import debounce from 'lodash/debounce.js';
import uniq from 'lodash/uniq.js';

export default function Articles() {

	const { makeApiRequest } = useContext(ResourcesContext);

	const [articles, setArticles] = useState([]);
	const [titleFilter, setTitleFilter] = useState('');
	const [keywordFilter, setKeywordFilter] = useState('');

	const reload = useCallback(async (keywordFilter, titleFilter) => {
		const args = { filters: {} };
		if (titleFilter) args.filters.filterTitle = titleFilter;
		if (keywordFilter) args.filters.filterKeywords = keywordFilter.split(',');
		const res = await makeApiRequest('article.get', { args });
		const { data } = res;
		setArticles(data);
	}, [setArticles, makeApiRequest]);

	const debouncedReload = useCallback(debounce((keywordFilter, titleFilter) => {
		reload(keywordFilter, titleFilter);
	}, 500), [reload]);

	useEffect(() => {
		debouncedReload(keywordFilter, titleFilter);
	}, [debouncedReload, keywordFilter, titleFilter]);

	useEffect(() => {
		reload();
	}, [reload]);

	const removeArticle = useCallback(async articleKey => {
		await makeApiRequest('article.remove', { args: [articleKey] });
		reload(keywordFilter, titleFilter);
	}, [makeApiRequest, reload]);

	return (
		<div className="articles">
			<div className="articles__head">
				<FormGroup label="Filter by title">
					<input
						className="articles__head-input"
						type="text"
						value={titleFilter}
						onChange={event => setTitleFilter(event.target.value)}
					/>
				</FormGroup>
				<FormGroup label="Filter by keywords">
					<input
						className="articles__head-input"
						type="text"
						value={keywordFilter}
						onChange={event => setKeywordFilter(event.target.value)}
					/>
				</FormGroup>
				<Link className="articles__new-button" to="article-edit">New article</Link>
			</div>
			<table className="articles__main-table-table">
				<thead className="articles__main-table-thead">
					<tr className="articles__main-table-tr">
						<th className="articles__main-table-th">Key</th>
						<th className="articles__main-table-th">Title</th>
						<th className="articles__main-table-th">Keywords</th>
						<th className="articles__main-table-th">Created at</th>
						<th className="articles__main-table-th">Updated at</th>
						<th className="articles__main-table-th">&nbsp;</th>
					</tr>
				</thead>
				<tbody className="articles__main-table-tbody">
					{articles.map(article => (
						<tr className="articles__main-table-tr" key={article._key}>
							<td className="articles__main-table-td">
								<Link className="articles__table-row-link" to={`article/${article._key}`}>{article._key}</Link>
							</td>
							<td className="articles__main-table-td articles__main-table-td_title">
								<Link className="articles__table-row-link" to={`article/${article._key}`}>{article.title}</Link>
							</td>
							<td className="articles__main-table-td articles__main-table-td_keywords">{uniq(article.keywords).map(kw => (
								<span className="articles__keyword" key={kw}>{kw}</span>
							))}</td>
							<td className="articles__main-table-td articles__main-table-td_created-at">{format(new Date(article.createdAt), 'dd-MM-yyyy')}</td>
							<td className="articles__main-table-td articles__main-table-td_updated-at">{format(new Date(article.updatedAt), 'dd-MM-yyyy')}</td>
							<td className="articles__main-table-td articles__main-table-td_actions">
								<Link className="articles__table-row-button" to={`article-edit/${article._key}`}>Edit</Link>
								<button className="articles__table-row-button" onClick={() => removeArticle(article._key)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}