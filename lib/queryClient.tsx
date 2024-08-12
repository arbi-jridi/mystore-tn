import { QueryClient } from '@tanstack/query-core';
import { cache } from 'react';

const queryClient = cache(() => new QueryClient());

export default queryClient;
