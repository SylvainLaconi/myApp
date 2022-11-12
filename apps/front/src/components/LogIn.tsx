import {
	Button,
	Divider,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Text,
	VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useAuth } from '../contexts/Auth';

const LoginFormSchema = () =>
	z.object({
		username: z.string().min(1, 'Username must be provided'),
		password: z.string().min(1, 'Password must be provided'),
	});

export type LoginFormData = z.infer<ReturnType<typeof LoginFormSchema>>;

const LogIn = () => {
	const navigate = useNavigate();

	const { LogIn, authError, isAuthenticated } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(LoginFormSchema()),
	});

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/home');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

	const onSubmit = handleSubmit((data) => LogIn(data));
	return (
		<VStack w="full" h="full" justifyContent={'center'}>
			<VStack
				alignItems="center"
				bgColor={'white'}
				p={4}
				w={300}
				borderRadius={6}
			>
				<form onSubmit={onSubmit}>
					<VStack>
						<FormLabel>Log In to My App</FormLabel>
						<Text fontSize={'2xs'} color="red.500" h="8px">
							{authError}
						</Text>
						<FormControl isInvalid={!!errors.username} h={'50px'} mt={'0px'}>
							<Input
								id="username"
								type={'text'}
								placeholder="Username"
								bgColor="gray.100"
								{...register('username', { required: true })}
							/>
							<FormErrorMessage fontSize={'2xs'} mt={0}>
								{errors.username && errors.username.message}
							</FormErrorMessage>
						</FormControl>

						<FormControl isInvalid={!!errors.password} h={'50px'} mt={'0px'}>
							<Input
								id="password"
								type={'password'}
								placeholder="Password"
								bgColor="gray.100"
								{...register('password', { required: true })}
							/>
							<FormErrorMessage fontSize={'2xs'} mt={0}>
								{errors.password && errors.password.message}
							</FormErrorMessage>
						</FormControl>

						<Button
							type="submit"
							w={150}
							bgColor={'blue.600'}
							color="white"
							isLoading={isSubmitting}
						>
							Log in
						</Button>
						<Divider />

						<Button
							variant="outline"
							w={150}
							bgColor={'white'}
							color="blue.600"
							borderColor={'blue.600'}
							onClick={() => navigate('/auth/signin')}
						>
							Create an account
						</Button>
					</VStack>
				</form>
			</VStack>
		</VStack>
	);
};

export default LogIn;
