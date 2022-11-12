import { Heading, Text, VStack } from '@chakra-ui/react';

import { useAuth } from '../contexts/Auth';

const Home = () => {
	const { user } = useAuth();

	return (
		<VStack w="full">
			<Heading>Home</Heading>
			<Text>Bienvenue sur mon app {user?.firstName}</Text>
		</VStack>
	);
};

export default Home;
