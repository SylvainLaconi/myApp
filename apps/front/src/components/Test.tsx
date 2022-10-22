import { useState } from 'react';

const Test = () => {
	const [me, setMe] = useState<string>('me');

	return (
		<div>
			<h2>{me}</h2>
		</div>
	);
};

export default Test;
