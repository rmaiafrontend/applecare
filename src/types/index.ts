/**
 * Tipos locais usados pelos componentes (formato snake_case).
 *
 * Os componentes devem importar tipos daqui:
 *   import type { LocalProduct, LocalOrder } from '@/types';
 *
 * Os mappers/adapters ficam em @/api/adapters.
 * Os tipos da API (camelCase) ficam em @/api/types.
 */

// Tipos de domínio (componentes)
export type {
  LocalProduct,
  LocalTag,
  LocalAdminTag,
  LocalCategory,
  LocalCartProduct,
  LocalCartItem,
  LocalOrderAddress,
  LocalOrderItem,
  LocalOrder,
} from '@/api/adapters';

// Tipos de formulários (checkout)
export type { AddressData } from '@/components/checkout/CheckoutAddressForm';
export type { PaymentData } from '@/components/checkout/CheckoutPaymentForm';

// Tipos de engines
export type {
  SearchProduct,
  SearchCategory,
  SearchResult,
} from '@/engines/smartSearch';
