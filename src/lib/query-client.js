import { QueryClient } from '@tanstack/react-query';

export const queryClientInstance = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: (failureCount, error) => {
				// Não retentar erros de cliente (4xx) — só server errors e network
				if (error?.status >= 400 && error?.status < 500) return false;
				return failureCount < 2;
			},
		},
	},
});