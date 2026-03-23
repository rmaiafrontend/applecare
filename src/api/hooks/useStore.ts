import { useQuery } from '@tanstack/react-query';
import { storeService } from '../services';

const KEYS = {
  public: (slug: string) => ['store', slug, 'info'] as const,
};

export function usePublicStore(slug: string) {
  return useQuery({
    queryKey: KEYS.public(slug),
    queryFn: () => storeService.get(slug),
    enabled: !!slug,
  });
}
