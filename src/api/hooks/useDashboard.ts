import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['admin', 'dashboard', 'stats'],
    queryFn: () => dashboardService.getStats(),
  });
}
