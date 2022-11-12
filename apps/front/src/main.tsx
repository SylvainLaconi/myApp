import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './contexts/Auth';
import router from './router';
import theme from './theme';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ChakraProvider theme={theme}>
					<RouterProvider router={router} />
				</ChakraProvider>
			</AuthProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
