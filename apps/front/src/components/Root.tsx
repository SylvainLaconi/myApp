import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Heading, HStack, IconButton, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/Auth';

const Root = () => {
	const { LogOut } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/home');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<VStack bgColor="gray.100" w={'100vw'} h={'100vh'} m={0}>
			<HStack
				bgColor="gray.900"
				w="full"
				h={'fit-content'}
				p={2}
				m={0}
				justifyContent="space-between"
			>
				<Heading color={'white'} as="h1" fontSize={'2xl'} m={0}>
					MY APP
				</Heading>
				<IconButton
					aria-label="logout"
					icon={<ExternalLinkIcon />}
					onClick={LogOut}
				/>
			</HStack>
			<VStack w={'full'} h={'full'} p={2} m="0px !important">
				<Outlet />
			</VStack>
		</VStack>
	);
};

export default Root;
