'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { SessionProvider } from 'next-auth/react';

const theme = createTheme({
	typography: {
		allVariants: {
			fontFamily: 'inherit',
		},
	},
});

const Providers = ({ children }: { children: React.ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</SessionProvider>
		</QueryClientProvider>
	);
};

export default Providers;
