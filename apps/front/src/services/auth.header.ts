const authHeader = () => {
	const token = JSON.parse(localStorage.getItem('token') as string);

	if (token) {
		return {
			Authorization: 'Bearer ' + token,
		};
	} else {
		return {};
	}
};

export default authHeader;
