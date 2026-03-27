/**
 * Adapters para converter entre o formato camelCase da API
 * e o formato snake_case usado nos componentes existentes.
 *
 * Isso permite migração gradual — componentes continuam usando
 * os mesmos nomes de campo enquanto a API fala camelCase.
 */

import type {
  ProdutoListagemResponse,
  ImagemProdutoResponse,
  EtiquetaProdutoResponse,
  ProdutoCarrinhoResponse,
  CategoriaResponse,
  EtiquetaResponse,
  ItemCarrinhoResponse,
  PedidoResponse,
  ItemPedidoResponse,
  BannerResponse,
  ConfiguracaoLojaResponse,
  SalvarConfiguracaoLojaRequest,
} from './types';

// ─── Tipos locais (snake_case, usados pelos componentes) ────────────────

export interface LocalProduct {
  id: number;
  name: string;
  sku: string;
  price: number;
  original_price?: number;
  stock: number;
  express_delivery: boolean;
  condition?: string;
  description?: string;
  featured: boolean;
  is_active: boolean;
  category_id: number;
  category_name: string;
  images: string[];
  tags: LocalTag[];
  created_date: string;
}

export interface LocalTag {
  id: number;
  name: string;
  slug: string;
  color: string;
}

export interface LocalAdminTag extends LocalTag {
  is_active: boolean;
}

export interface LocalCategory {
  id: number;
  name: string;
  icon?: string;
  image_url?: string;
  display_order: number;
  has_promotion: boolean;
  is_active: boolean;
}

export interface LocalCartProduct {
  id: number;
  name: string;
  price: number;
  original_price?: number;
  stock: number;
  express_delivery: boolean;
  image_url: string;
}

export interface LocalCartItem {
  id: number;
  product_id: number;
  quantity: number;
  product: LocalCartProduct | null;
}

export interface LocalOrderAddress {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface LocalOrderItem {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface LocalOrder {
  id: number;
  order_number: string;
  payment_method?: string;
  for_delivery?: boolean;
  subtotal: number;
  shipping_cost: number;
  total: number;
  observation?: string;
  whatsapp_url?: string;
  address: LocalOrderAddress | null;
  items: LocalOrderItem[];
  created_date: string;
}

// ─── Conversões genéricas de chave ──────────────────────────────────────

function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function apiToLocal<T extends Record<string, unknown>>(obj: T): Record<string, unknown>;
export function apiToLocal(obj: null | undefined): null | undefined;
export function apiToLocal(obj: unknown[]): unknown[];
export function apiToLocal(obj: unknown): unknown;
export function apiToLocal(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(apiToLocal);
  if (typeof obj !== 'object' || obj instanceof Date) return obj;

  const mapped: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    mapped[toSnakeCase(key)] = apiToLocal(value);
  }
  return mapped;
}

export function localToApi<T extends Record<string, unknown>>(obj: T): Record<string, unknown>;
export function localToApi(obj: null | undefined): null | undefined;
export function localToApi(obj: unknown[]): unknown[];
export function localToApi(obj: unknown): unknown;
export function localToApi(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(localToApi);
  if (typeof obj !== 'object' || obj instanceof Date || obj instanceof FormData) return obj;

  const mapped: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    mapped[toCamelCase(key)] = localToApi(value);
  }
  return mapped;
}

// ─── Campo-específico mapeamentos ───────────────────────────────────────

const FIELD_MAP_TO_API: Record<string, string> = {
  // Product
  'original_price': 'precoOriginal',
  'express_delivery': 'entregaExpressa',
  'is_featured': 'destaque',
  'is_active': 'ativo',
  'category_id': 'categoriaId',
  'datasheet_url': 'fichaTecnicaUrl',
  'condition_checklist': 'checklistCondicao',
  'tag_ids': 'etiquetaIds',
  // Category
  'has_promotion': 'temPromocao',
  'display_order': 'ordemExibicao',
  'image_url': 'imagemUrl',
  // Banner
  'banner_image_url': 'imagemUrl',
  'banner_link': 'link',
  'banner_cta_text': 'textoCta',
  'banner_text_color': 'corTexto',
  'banner_overlay_opacity': 'opacidadeOverlay',
  // Config
  'store_name': 'nomeLoja',
  'store_slogan': 'sloganLoja',
  'logo_url': 'logoUrl',
  'logo_dark_url': 'logoEscuroUrl',
  'favicon_url': 'faviconUrl',
  'primary_color': 'corPrimaria',
  'secondary_color': 'corSecundaria',
  'accent_color': 'corDestaque',
  'background_color': 'corFundo',
  'text_color': 'corTexto',
  'whatsapp_number': 'numeroWhatsapp',
  'phone_number': 'numeroTelefone',
  'instagram_url': 'urlInstagram',
  'email_contact': 'emailContato',
  'footer_text': 'textoRodape',
  'seo_title': 'tituloSeo',
  'seo_description': 'descricaoSeo',
};

const FIELD_MAP_FROM_API: Record<string, string> = {};
for (const [local, api] of Object.entries(FIELD_MAP_TO_API)) {
  FIELD_MAP_FROM_API[api] = local;
}

export function mapToApi(obj: Record<string, unknown>): Record<string, unknown> {
  const mapped: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const apiKey = FIELD_MAP_TO_API[key] || toCamelCase(key);
    mapped[apiKey] = value;
  }
  return mapped;
}

// ─── Mappers tipados por domínio ────────────────────────────────────────

/**
 * Converte um produto da API para o formato esperado pelos componentes.
 */
export function mapProductFromApi(p: ProdutoListagemResponse): LocalProduct {
  return {
    id: p.id,
    name: p.nome,
    sku: p.sku,
    price: p.preco,
    original_price: p.precoOriginal,
    stock: p.estoque,
    express_delivery: p.entregaExpressa,
    condition: p.condicao,
    description: p.descricao,
    featured: p.destaque,
    is_active: p.ativo,
    category_id: p.categoriaId,
    category_name: p.categoriaNome,
    images: p.imagens?.map((img: ImagemProdutoResponse) => img.imagemUrl) ?? [],
    tags: p.etiquetas?.map((t: EtiquetaProdutoResponse) => ({
      id: t.id, name: t.nome, slug: t.slug, color: t.cor,
    })) ?? [],
    created_date: p.criadoEm,
  };
}

/**
 * Converte uma categoria da API para o formato esperado pelos componentes.
 */
export function mapCategoryFromApi(c: CategoriaResponse): LocalCategory {
  return {
    id: c.id,
    name: c.nome,
    icon: c.icone,
    image_url: c.imagemUrl,
    display_order: c.ordemExibicao,
    has_promotion: c.temPromocao,
    is_active: c.ativo,
  };
}

/**
 * Converte uma tag/etiqueta da API para o formato esperado pelos componentes.
 */
export function mapTagFromApi(t: EtiquetaResponse): LocalAdminTag {
  return {
    id: t.id,
    name: t.nome,
    slug: t.slug,
    color: t.cor,
    is_active: t.ativo,
  };
}

/**
 * Converte um item do carrinho da API para o formato esperado pelos componentes.
 */
export function mapCartItemFromApi(item: ItemCarrinhoResponse): LocalCartItem {
  return {
    id: item.id,
    product_id: item.produtoId,
    quantity: item.quantidade,
    product: item.produto ? {
      id: item.produto.id,
      name: item.produto.nome,
      price: item.produto.preco,
      original_price: item.produto.precoOriginal,
      stock: item.produto.estoque,
      express_delivery: item.produto.entregaExpressa,
      image_url: item.produto.imagemUrl,
    } : null,
  };
}

/**
 * Converte um pedido da API para o formato esperado pelos componentes.
 */
export function mapOrderFromApi(o: PedidoResponse): LocalOrder {
  return {
    id: o.id,
    order_number: o.numeroPedido,
    payment_method: o.metodoPagamento,
    for_delivery: o.paraEntrega,
    subtotal: o.subtotal,
    shipping_cost: o.custoFrete,
    total: o.total,
    observation: o.observacao,
    whatsapp_url: o.urlWhatsapp,
    address: o.enderecoCep ? {
      cep: o.enderecoCep,
      street: o.enderecoRua ?? '',
      number: o.enderecoNumero ?? '',
      complement: o.enderecoComplemento,
      neighborhood: o.enderecoBairro ?? '',
      city: o.enderecoCidade ?? '',
      state: o.enderecoEstado ?? '',
    } : null,
    items: (o.itens ?? []).map((i: ItemPedidoResponse): LocalOrderItem => ({
      id: i.id,
      product_id: i.produtoId,
      product_name: i.nomeProduto,
      quantity: i.quantidade,
      unit_price: i.precoUnitario,
      total_price: i.precoTotal,
    })),
    created_date: o.criadoEm,
  };
}

/**
 * Converte um objeto do formato da API para o formato local usando mapeamento específico.
 */
export function mapFromApi<T extends Record<string, unknown>>(obj: T): Record<string, unknown>;
export function mapFromApi(obj: null | undefined): null | undefined;
export function mapFromApi(obj: unknown[]): unknown[];
export function mapFromApi(obj: unknown): unknown;
export function mapFromApi(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(mapFromApi);
  if (typeof obj !== 'object') return obj;

  const mapped: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const localKey = FIELD_MAP_FROM_API[key] || toSnakeCase(key);
    mapped[localKey] = typeof value === 'object' && value !== null && !Array.isArray(value)
      ? mapFromApi(value as Record<string, unknown>)
      : Array.isArray(value)
        ? value.map((v: unknown) => typeof v === 'object' && v !== null ? mapFromApi(v as Record<string, unknown>) : v)
        : value;
  }
  return mapped;
}
