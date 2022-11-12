import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import LogIn from './components/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import Root from './components/Root';
import SignUp from './components/SignUp';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'auth/signin',
				element: <SignUp />,
			},
			{
				path: 'auth/login',
				element: <LogIn />,
			},
			{
				path: 'home',
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
			},
		],
	},
]);

export default router;
