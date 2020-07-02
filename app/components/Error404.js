import React from 'react';

const Error404 = (props) => {
	return (
		<div>404 error: <i>{props.location.pathname}</i> does not exist.</div>
	);
};

export default Error404;
