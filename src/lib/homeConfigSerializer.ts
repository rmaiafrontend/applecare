import type { SalvarConfiguracaoHomeRequest, ConfiguracaoHomeResponse } from '@/api/types/config';

/**
 * Maps flat form field names → API blob field names.
 * Each blob is stored as a JSON string on the backend.
 */
const FIELD_GROUPS: Record<keyof SalvarConfiguracaoHomeRequest, string[]> = {
  configCabecalho: [
    'header_store_name', 'header_tagline', 'header_logo_url',
    'header_hours', 'header_quick_links',
    'header_whatsapp', 'header_instagram', 'header_tiktok', 'header_youtube', 'header_facebook',
    'identity_logo_url', 'identity_primary_color', 'identity_accent_color', 'identity_slug',
  ],
  configHero: [
    'hero_image_url', 'hero_title', 'hero_subtitle',
    'hero_cta_text', 'hero_cta_link',
    'hero_badge_text', 'hero_badge_active', 'hero_badge_animated',
  ],
  configDiferenciais: [
    'differentials_active', 'differentials_items',
  ],
  configBotaoIa: [
    'ai_button_active', 'ai_button_title', 'ai_button_subtitle',
    'ai_button_cta_text', 'ai_button_gradient_from', 'ai_button_gradient_to',
  ],
  configSecaoCategorias: [
    'categories_active', 'categories_title', 'categories_layout',
  ],
  configBannerSecundario: [
    'secondary_banner_active', 'secondary_banner_title',
    'secondary_banner_product_ids',
  ],
  configCardsInfo: [
    'info_card_active', 'info_card_emoji', 'info_card_title',
    'info_card_description', 'info_card_cta_text', 'info_card_cta_link',
    'info_card_bg_color',
  ],
  configListaProdutos: [
    'product_list_title', 'product_list_template', 'product_list_max_items',
    'product_list_curated_ids', 'product_list_show_cta', 'product_list_cta_text',
  ],
  ordenacaoSecoes: [
    'sections_order', 'carousels',
  ],
};

function safeParse(json: string | null | undefined): Record<string, unknown> {
  if (!json) return {};
  try {
    return JSON.parse(json);
  } catch {
    console.warn('[homeConfigSerializer] Failed to parse JSON blob:', json.slice(0, 80));
    return {};
  }
}

/**
 * Converts the API response (JSON string blobs) into a flat form object.
 */
export function deserializeHomeConfig(response: ConfiguracaoHomeResponse | null | undefined): Record<string, unknown> {
  if (!response) return {};

  const flat: Record<string, unknown> = {};
  const blobFields: (keyof SalvarConfiguracaoHomeRequest)[] = [
    'configCabecalho', 'configHero', 'configDiferenciais', 'configBotaoIa',
    'configSecaoCategorias', 'configBannerSecundario', 'configCardsInfo',
    'configListaProdutos', 'ordenacaoSecoes',
  ];

  for (const field of blobFields) {
    const parsed = safeParse(response[field]);
    Object.assign(flat, parsed);
  }

  return flat;
}

/**
 * Converts a flat form object into the API request format (JSON string blobs).
 */
export function serializeHomeConfig(form: Record<string, unknown>): SalvarConfiguracaoHomeRequest {
  const result: Record<string, string> = {};

  for (const [blobField, fieldNames] of Object.entries(FIELD_GROUPS)) {
    const group: Record<string, unknown> = {};
    for (const key of fieldNames) {
      if (key in form) {
        group[key] = form[key];
      }
    }
    result[blobField] = JSON.stringify(group);
  }

  return result as unknown as SalvarConfiguracaoHomeRequest;
}
