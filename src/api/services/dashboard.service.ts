import { apiClient } from '../client';
import type { EstatisticasDashboardResponse } from '../types';

export const dashboardService = {
  getStats: () =>
    apiClient<EstatisticasDashboardResponse>({ method: 'GET', path: '/api/v1/admin/dashboard/estatisticas' }),
};
