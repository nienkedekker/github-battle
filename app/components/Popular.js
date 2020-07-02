import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api.js';
import {
	FaUser,
	FaStar,
	FaCodeBranch,
	FaExclamationTriangle,
} from 'react-icons/fa';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';

function LanguagesNav({ selected, onUpdateLanguage }) {
	const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Python', 'CSS'];

	return (
		<ul className="flex-center">
			{languages.map((language) => (
				<li key={language}>
					<button
						style={language === selected ? { color: 'red' } : null}
						className="btn-clear nav-link"
						onClick={() => onUpdateLanguage(language)}
					>
						{language}
					</button>
				</li>
			))}
		</ul>
	);
}

LanguagesNav.propTypes = {
	selected: PropTypes.string.isRequired,
	onUpdateLanguage: PropTypes.func.isRequired,
};

function ReposGrid({ repos }) {
	return (
		<ul className="grid space-around">
			{repos.map((repo, index) => {
				const {
					name,
					owner,
					html_url,
					stargazers_count,
					forks,
					open_issues,
				} = repo;
				const { login, avatar_url } = owner;

				return (
					<li key={html_url}>
						<Card
							header={`#${index + 1}`}
							name={login}
							href={html_url}
							avatar={avatar_url}
						>
							<ul className="card-list">
								<li>
									<Tooltip text="github username">
										<FaUser color="rgb(255, 191, 116)" size={22} />
										<a href={`https://github.com/${login}`}>{login}</a>
									</Tooltip>
								</li>
								<li>
									<FaStar color="rgb(255, 215, 0)" size={22} />
									{stargazers_count.toLocaleString()} stars
                </li>
								<li>
									<FaCodeBranch color="rgb(129, 195, 245)" size={22} />
									{forks.toLocaleString()} forks
                </li>
								<li>
									<FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
									{open_issues.toLocaleString()} open
                </li>
							</ul>
						</Card>
					</li>
				);
			})}
		</ul>
	);
}

ReposGrid.propTypes = {
	repos: PropTypes.array.isRequired,
};

export default class Popular extends Component {
	state = {
		selectedLanguage: 'All',
		repos: {},
		error: null,
	};

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage = (selectedLanguage) => {
		this.setState({
			selectedLanguage,
		});

		if (!this.state.repos[selectedLanguage]) {
			fetchPopularRepos(selectedLanguage)
				.then((data) => {
					this.setState(({ repos }) => ({
						repos: {
							...repos,
							[selectedLanguage]: data,
						},
					}));
				})
				.catch((error) => {
					console.log('error', error);
					this.setState({ error: 'could not fetch repo' });
				});
		}
	};

	isLoading = () => {
		const { selectedLanguage, repos, error } = this.state;
		return !repos[selectedLanguage] && error === null;
	};

	render() {
		const { selectedLanguage, repos, error } = this.state;
		return (
			<React.Fragment>
				<LanguagesNav
					selected={selectedLanguage}
					onUpdateLanguage={this.updateLanguage}
				></LanguagesNav>

				{this.isLoading() && <Loading text="Fetching Repos" />}

				{error && <p>{error}</p>}

				{repos[selectedLanguage] && (
					<ReposGrid repos={repos[selectedLanguage]}></ReposGrid>
				)}
			</React.Fragment>
		);
	}
}
