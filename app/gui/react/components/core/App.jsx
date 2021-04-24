import React from 'react';

import Home from '../pages/Home';
import Articles from '../pages/Articles';
import ArticleEdit from '../pages/ArticleEdit';
import ArticleView from '../pages/ArticleView';
import Contacts from '../pages/Contacts';
import ContactEdit from '../pages/ContactEdit';
import Passphrases from '../pages/Passphrases';
import PassphraseEdit from '../pages/PassphraseEdit';
import Static from '../pages/Static';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
	Redirect,
} from "react-router-dom";

import './App.scss';

export default function App() {
	return (
		<div className="app">
			<Router>
				<ul className="app__nav">
					<li className="app__nav-item">
						<NavLink activeClassName="app__nav-link_active" className="app__nav-link" to="/articles">
							Articles
						</NavLink>
					</li>
					<li className="app__nav-item">
						<NavLink activeClassName="app__nav-link_active" className="app__nav-link" to="/static">
							Static HTML
						</NavLink>
					</li>
					<li className="app__nav-item">
						<NavLink activeClassName="app__nav-link_active" className="app__nav-link" to="/passphrases">
							Passphrases
						</NavLink>
					</li>
					<li className="app__nav-item">
						<NavLink activeClassName="app__nav-link_active" className="app__nav-link" to="/contacts">
							Contacts
						</NavLink>
					</li>
				</ul>
				<main className="app__main">
					<Switch>
						<Route path="/" exact>
							<Home />
						</Route>
						<Route path="/static" exact>
							<Static />
						</Route>
						<Route path="/articles">
							<Articles />
						</Route>
						<Route path="/article/:articleKey" exact>
							<ArticleView />
						</Route>
						<Route path="/article-edit/:articleKey?">
							<ArticleEdit />
						</Route>
						<Route path="/contacts">
							<Contacts />
						</Route>
						<Route path="/contact-edit/:contactKey?">
							<ContactEdit />
						</Route>
						<Route path="/passphrases">
							<Passphrases />
						</Route>
						<Route path="/passphrase-edit/:passphraseKey?">
							<PassphraseEdit />
						</Route>
					</Switch>
				</main>
			</Router>
		</div>
	);
}