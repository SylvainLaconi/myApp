import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/Auth';

const ProtectedRoute = ({ children }: React.ComponentProps<'div'>) => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/auth/login" replace />;
	}

	return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
