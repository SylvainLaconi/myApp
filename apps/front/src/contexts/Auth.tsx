import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useMutation, useQuery } from 'react-query';

import { GetUserProfile, LogUserIn } from '../services/auth.api';
import { Context, Result, UserCredentials } from '../types';

export const AuthContext = createContext<Context | null>(null);

export const AuthProvider = ({ children }: React.ComponentProps<'div'>) => {
	const [token, setToken] = useState<string | null>(null);
	const [authError, setAuthError] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [user, setUser] = useState<Result | null>(null);

	const mutation = useMutation({
		mutationFn: LogUserIn,
		onSuccess: async (data) => {
			setToken(data?.result?.access_token);

			setIsAuthenticated(true);
		},
		onError: (error: any) => {
			console.error(error);
			setAuthError('Incorrect username or password');
		},
	});

	const LogIn = useCallback(
		(userCredentials: UserCredentials) => mutation.mutate(userCredentials),
		[mutation],
	);

	useEffect(() => {
		if (token) {
			localStorage.setItem('token', JSON.stringify(token));
		} else {
			localStorage.removeItem('token');
		}
	}, [token]);

	const profile = useQuery({
		queryKey: ['UserProfile'],
		queryFn: GetUserProfile,
		enabled: isAuthenticated,
	});

	useEffect(() => {
		if (profile.data?.result) {
			setUser(profile.data?.result);
		}
	}, [profile.data?.result]);

	const LogOut = useCallback(() => {
		setToken(null);
		setAuthError(null);
		setIsAuthenticated(false);
		setUser(null);
	}, []);

	const value = useMemo(() => {
		return {
			isAuthenticated,
			user,
			token,
			authError,
			LogIn,
			LogOut,
		};
	}, [LogIn, LogOut, authError, isAuthenticated, token, user]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
	return useContext(AuthContext) as Context;
};
