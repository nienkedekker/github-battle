import React from 'react';
import ReactDOM from 'react-dom';
import Popular from './components/Popular.js';
import Battle from './components/Battle.js';
import Results from './components/Results.js';
import Nav from './components/Nav.js';
import { ThemeProvider } from './context/theme.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

const NoRouteMatch = ({ location }) => {
	return (
		<div>
			No match for {location.pathname}
		</div>
	);
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: 'light',
			toggleTheme: () => {
				this.setState(({ theme }) => ({
					theme: theme === 'light' ? 'dark' : 'light',
				}));
			},
		};
	}
	render() {
		return (
			<Router>
				<ThemeProvider value={this.state}>
					<div className={this.state.theme}>
						<div className="container">
							<Nav />
							<Switch>
								<Route path="/" exact component={Popular} />
								<Route path="/battle" exact component={Battle} />
								<Route path="/battle/results" component={Results} />
								<Route component={NoRouteMatch} />
							</Switch>
						</div>
					</div>
				</ThemeProvider>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
