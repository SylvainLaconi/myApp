export type User = {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export type Result = Record<string, any>[] & Record<string, any>;

export type ErrorResponse = {
	success: boolean;
	name: Error['name'];
	error: Error['message'];
};

export type SuccessResponse = {
	success: boolean;
	result?: Result;
};

export type Response = ErrorResponse & SuccessResponse;

export type UserCredentials = {
	username: User['username'];
	password: User['password'];
};

export type Context = {
	isAuthenticated: boolean;
	user: Result | null;
	token: string | null;
	authError: string | null;
	LogIn: (userCredentials: UserCredentials) => void;
	LogOut: () => void;
};
