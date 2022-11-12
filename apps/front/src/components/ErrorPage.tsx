import { Heading, Text, VStack } from '@chakra-ui/react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error: any = useRouteError();

	return (
		<VStack bgColor="gray.50" w={'100vw'} h={'100vh'}>
			<Heading as="h2">Oops!</Heading>
			<Text>Sorry, an unexpected error has occurred.</Text>
			<Text>
				<i>{error.statusText || error.message}</i>
			</Text>
		</VStack>
	);
};

export default ErrorPage;
