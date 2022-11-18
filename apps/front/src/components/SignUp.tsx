import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Link,
	VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Link as Reactlink } from 'react-router-dom';
import { z } from 'zod';

import { SignUserUp } from '../services/auth.api';

const regex = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);

const UserCreateFormSchema = () =>
	z
		.object({
			username: z
				.string()
				.min(3, '3 characters minimum')
				.max(40, '40 characters maximum'),
			firstName: z
				.string()
				.min(3, '3 characters minimum')
				.max(40, '40 characters maximum'),
			lastName: z
				.string()
				.min(3, '3 characters minimum')
				.max(40, '40 characters maximum'),
			email: z.string().email(),
			password: z.string().regex(regex, 'Stonger password needed'),
			passwordConfirmation: z.string(),
		})
		.refine((data) => data.password === data.passwordConfirmation, {
			message: "Passwords don't match",
			path: ['passwordConfirmation'], // path of error
		});

export type UserCreateFormData = z.infer<
	ReturnType<typeof UserCreateFormSchema>
>;

const SignUp = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<UserCreateFormData>({
		resolver: zodResolver(UserCreateFormSchema()),
	});

	const signInMutation = useMutation({
		mutationFn: SignUserUp,
		onSuccess: (data) => {
			console.log(data);

			navigate('/auth/login');
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const onSubmit = handleSubmit((data) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { passwordConfirmation, ...newUser } = data;

		signInMutation.mutate(newUser);
	});

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
						<FormLabel>Create an account to My App</FormLabel>
						<FormControl isInvalid={!!errors.firstName} h={'50px'} mt={'0px'}>
							<Input
								id="firstName"
								type={'text'}
								placeholder="Firstname"
								bgColor="gray.100"
								mt={0}
								{...register('firstName', { required: true })}
							/>
							<FormErrorMessage fontSize={'2xs'} mt={0}>
								{errors.firstName && errors.firstName.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={!!errors.lastName} h={'50px'} mt={'0px'}>
							<Input
								id="lastName"
								type={'text'}
								placeholder="Lastname"
								bgColor="gray.100"
								{...register('lastName', { required: true })}
							/>
							<FormErrorMessage fontSize={'2xs'} mt={0}>
								{errors.lastName && errors.lastName.message}
							</FormErrorMessage>
						</FormControl>

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

						<FormControl isInvalid={!!errors.email} h={'50px'} mt={'0px'}>
							<Input
								id="email"
								type={'email'}
								placeholder="Email"
								bgColor="gray.100"
								{...register('email', { required: true })}
							/>
							<FormErrorMessage fontSize={'2xs'} mt={0}>
								{errors.email && errors.email.message}
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

						<FormControl
							isInvalid={!!errors.passwordConfirmation}
							h={'50px'}
							mt={'0px'}
						>
							<Input
								id="passwordConfirmation"
								type={'password'}
								placeholder="Confirm password"
								bgColor="gray.100"
								{...register('passwordConfirmation', {
									required: true,
								})}
							/>
							<FormErrorMessage fontSize={'2xs'} mt={0}>
								{errors.passwordConfirmation &&
									errors.passwordConfirmation.message}
							</FormErrorMessage>
						</FormControl>

						<Button
							type="submit"
							w={150}
							bgColor={'blue.600'}
							color="white"
							isLoading={isSubmitting}
						>
							Sign up
						</Button>
						<FormLabel fontSize={'2xs'}>
							{'Already have an account ? '}
							<Link as={Reactlink} to={'/auth/login'} color="blue.500">
								{'Login'}
							</Link>
						</FormLabel>
					</VStack>
				</form>
			</VStack>
		</VStack>
	);
};

export default SignUp;
