import { Component } from 'react';

// Fake function that "fetches user data"
const fetchUser = (user, timeout) => {
	return new Promise(function (resolve) {
		setTimeout(() => resolve(user = { name: 'Nienke', location: 'Amsterdam' }), timeout);
	});
};

export default class Twitter extends Component {
	state = {
		user: null
	};

	componentDidMount() {
		const { username, timeout } = this.props;
		fetchUser(username, timeout).then((user) => this.setState({ user }, () => console.log('setState has finished!')));
	}

	render() {
		return this.props.children(this.state.user);
	}
}
