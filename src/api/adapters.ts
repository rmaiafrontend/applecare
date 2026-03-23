/**
 * Adapters para converter entre o formato camelCase da API
 * e o formato snake_case usado nos componentes existentes.
 *
 * Isso permite migração gradual — componentes continuam usando
 * os mesmos nomes de campo enquanto a API fala camelCase.
 */

// Converte camelCase para snake_case
function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

// Converte snake_case para camelCase
function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Converte as chaves de um objeto de camelCase para snake_case (recursivo)
export function apiToLocal(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(apiToLocal);
  if (typeof obj !== 'object' || obj instanceof Date) return obj;

  const mapped: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = toSnakeCase(key);
    mapped[snakeKey] = apiToLocal(value);
  }
  return mapped;
}

// Converte as chaves de um objeto de snake_case para camelCase (recursivo)
export function localToApi(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(localToApi);
  if (typeof obj !== 'object' || obj instanceof Date || obj instanceof FormData) return obj;

  const mapped: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = toCamelCase(key);
    mapped[camelKey] = localToApi(value);
  }
  return mapped;
}

// Campo-específico mapeamentos para nomes que diferem entre local e API
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

// Converte um objeto do formato local para o formato da API usando mapeamento específico
export function mapToApi(obj: Record<string, any>): Record<string, any> {
  const mapped: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const apiKey = FIELD_MAP_TO_API[key] || toCamelCase(key);
    mapped[apiKey] = value;
  }
  return mapped;
}

/**
 * Converte um produto da API para o formato esperado pelos componentes (ProductCard, etc).
 * Lida com o campo `imagens` (array de objetos) → `images` (array de URLs).
 */
export function mapProductFromApi(p: any) {
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
    images: p.imagens?.map((img: any) => img.imagemUrl) || (p.imagemUrl ? [p.imagemUrl] : []),
    tags: p.etiquetas?.map((t: any) => ({
      id: t.id, name: t.nome, slug: t.slug, color: t.cor,
    })) || [],
    created_date: p.criadoEm,
  };
}

/**
 * Converte uma categoria da API para o formato esperado pelos componentes.
 */
export function mapCategoryFromApi(c: any) {
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
export function mapTagFromApi(t: any) {
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
export function mapCartItemFromApi(item: any) {
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
export function mapOrderFromApi(o: any) {
  return {
    id: o.id,
    order_number: o.numeroPedido,
    payment_method: o.metodoPagamento,
    subtotal: o.subtotal,
    shipping_cost: o.custoFrete,
    total: o.total,
    observation: o.observacao,
    whatsapp_url: o.urlWhatsapp,
    items: (o.itens || []).map((i: any) => ({
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

// Converte um objeto do formato da API para o formato local usando mapeamento específico
export function mapFromApi(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(mapFromApi);
  if (typeof obj !== 'object') return obj;

  const mapped: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj as Record<string, any>)) {
    const localKey = FIELD_MAP_FROM_API[key] || toSnakeCase(key);
    mapped[localKey] = typeof value === 'object' && value !== null && !Array.isArray(value)
      ? mapFromApi(value)
      : Array.isArray(value)
        ? value.map((v: any) => typeof v === 'object' && v !== null ? mapFromApi(v) : v)
        : value;
  }
  return mapped;
}
