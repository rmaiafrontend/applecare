import { describe, it, expect } from 'vitest';
import {
  mapProductFromApi,
  mapCategoryFromApi,
  mapTagFromApi,
  mapCartItemFromApi,
  mapOrderFromApi,
  apiToLocal,
  localToApi,
  mapToApi,
} from '@/api/adapters';

describe('mapProductFromApi', () => {
  const apiProduct = {
    id: 1,
    nome: 'iPhone 15',
    sku: 'IP15',
    preco: 4999,
    precoOriginal: 5999,
    estoque: 10,
    entregaExpressa: true,
    condicao: 'novo',
    descricao: 'Smartphone Apple',
    destaque: true,
    ativo: true,
    categoriaId: 2,
    categoriaNome: 'Smartphones',
    imagens: [
      { id: 1, imagemUrl: 'https://img.com/1.jpg', ordemExibicao: 0 },
      { id: 2, imagemUrl: 'https://img.com/2.jpg', ordemExibicao: 1 },
    ],
    etiquetas: [
      { id: 1, nome: 'Novo', slug: 'novo', cor: '#00ff00', ativo: true, criadoEm: '', atualizadoEm: '' },
    ],
    criadoEm: '2024-01-01',
  };

  it('maps all fields correctly', () => {
    const result = mapProductFromApi(apiProduct);

    expect(result.id).toBe(1);
    expect(result.name).toBe('iPhone 15');
    expect(result.sku).toBe('IP15');
    expect(result.price).toBe(4999);
    expect(result.original_price).toBe(5999);
    expect(result.stock).toBe(10);
    expect(result.express_delivery).toBe(true);
    expect(result.featured).toBe(true);
    expect(result.is_active).toBe(true);
    expect(result.category_id).toBe(2);
    expect(result.category_name).toBe('Smartphones');
    expect(result.created_date).toBe('2024-01-01');
  });

  it('extracts image URLs from imagens array', () => {
    const result = mapProductFromApi(apiProduct);
    expect(result.images).toEqual(['https://img.com/1.jpg', 'https://img.com/2.jpg']);
  });

  it('maps tags correctly', () => {
    const result = mapProductFromApi(apiProduct);
    expect(result.tags).toEqual([{ id: 1, name: 'Novo', slug: 'novo', color: '#00ff00' }]);
  });

  it('handles missing imagens and etiquetas', () => {
    const minimal = { ...apiProduct, imagens: undefined, etiquetas: undefined };
    const result = mapProductFromApi(minimal as any);
    expect(result.images).toEqual([]);
    expect(result.tags).toEqual([]);
  });
});

describe('mapCategoryFromApi', () => {
  it('maps category fields', () => {
    const result = mapCategoryFromApi({
      id: 1, nome: 'Phones', icone: 'Smartphone', imagemUrl: 'https://img.com/cat.jpg',
      ordemExibicao: 0, temPromocao: true, ativo: true, criadoEm: '', atualizadoEm: '',
    });

    expect(result).toEqual({
      id: 1, name: 'Phones', icon: 'Smartphone', image_url: 'https://img.com/cat.jpg',
      display_order: 0, has_promotion: true, is_active: true,
    });
  });
});

describe('mapTagFromApi', () => {
  it('maps tag fields', () => {
    const result = mapTagFromApi({
      id: 1, nome: 'Oferta', slug: 'oferta', cor: '#ff0000',
      ativo: true, criadoEm: '', atualizadoEm: '',
    });

    expect(result).toEqual({
      id: 1, name: 'Oferta', slug: 'oferta', color: '#ff0000', is_active: true,
    });
  });
});

describe('mapCartItemFromApi', () => {
  it('maps cart item with product', () => {
    const result = mapCartItemFromApi({
      id: 10, produtoId: 1, quantidade: 2, criadoEm: '',
      produto: {
        id: 1, nome: 'iPhone', preco: 4999, precoOriginal: 5999,
        estoque: 5, entregaExpressa: true, imagemUrl: 'https://img.com/1.jpg',
      },
    });

    expect(result.id).toBe(10);
    expect(result.product_id).toBe(1);
    expect(result.quantity).toBe(2);
    expect(result.product).toEqual({
      id: 1, name: 'iPhone', price: 4999, original_price: 5999,
      stock: 5, express_delivery: true, image_url: 'https://img.com/1.jpg',
    });
  });

  it('handles null product', () => {
    const result = mapCartItemFromApi({
      id: 10, produtoId: 1, quantidade: 1, criadoEm: '',
      produto: null as any,
    });
    expect(result.product).toBeNull();
  });
});

describe('mapOrderFromApi', () => {
  it('maps order with delivery address', () => {
    const result = mapOrderFromApi({
      id: 1, numeroPedido: 'PED-001', metodoPagamento: 'PIX',
      paraEntrega: true, subtotal: 100, custoFrete: 10, total: 110,
      observacao: 'Teste', urlWhatsapp: 'https://wa.me/123',
      enderecoCep: '01001000', enderecoRua: 'Rua A', enderecoNumero: '123',
      enderecoComplemento: 'Apto 1', enderecoBairro: 'Centro',
      enderecoCidade: 'SP', enderecoEstado: 'SP',
      itens: [{
        id: 1, produtoId: 1, nomeProduto: 'iPhone',
        quantidade: 2, precoUnitario: 50, precoTotal: 100,
      }],
      criadoEm: '2024-01-01',
    });

    expect(result.order_number).toBe('PED-001');
    expect(result.address).toEqual({
      cep: '01001000', street: 'Rua A', number: '123',
      complement: 'Apto 1', neighborhood: 'Centro', city: 'SP', state: 'SP',
    });
    expect(result.items).toHaveLength(1);
    expect(result.items[0].product_name).toBe('iPhone');
  });

  it('returns null address when no cep', () => {
    const result = mapOrderFromApi({
      id: 1, numeroPedido: 'PED-002', subtotal: 0, custoFrete: 0, total: 0,
      itens: [], criadoEm: '2024-01-01',
    } as any);
    expect(result.address).toBeNull();
  });
});

describe('apiToLocal / localToApi', () => {
  it('converts camelCase keys to snake_case', () => {
    const result = apiToLocal({ firstName: 'John', lastName: 'Doe' });
    expect(result).toEqual({ first_name: 'John', last_name: 'Doe' });
  });

  it('converts snake_case keys to camelCase', () => {
    const result = localToApi({ first_name: 'John', last_name: 'Doe' });
    expect(result).toEqual({ firstName: 'John', lastName: 'Doe' });
  });

  it('handles null/undefined', () => {
    expect(apiToLocal(null)).toBeNull();
    expect(apiToLocal(undefined)).toBeUndefined();
    expect(localToApi(null)).toBeNull();
  });

  it('handles arrays', () => {
    const result = apiToLocal([{ firstName: 'A' }, { firstName: 'B' }]);
    expect(result).toEqual([{ first_name: 'A' }, { first_name: 'B' }]);
  });
});

describe('mapToApi', () => {
  it('uses field-specific mappings', () => {
    const result = mapToApi({ original_price: 100, is_active: true, name: 'Test' });
    expect(result).toEqual({ precoOriginal: 100, ativo: true, name: 'Test' });
  });

  it('falls back to camelCase for unmapped fields', () => {
    const result = mapToApi({ some_field: 'value' });
    expect(result).toEqual({ someField: 'value' });
  });
});
