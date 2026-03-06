const categoryKeywords = {
  'cat-1': ['iphone', 'celular', 'smartphone', 'telefone'],
  'cat-2': ['macbook', 'notebook', 'laptop', 'computador portatil'],
  'cat-3': ['ipad', 'tablet'],
  'cat-4': ['watch', 'relogio', 'smartwatch', 'apple watch'],
  'cat-5': ['airpods', 'fone', 'fones', 'headphone', 'headphones', 'earbuds', 'audio'],
  'cat-6': ['imac', 'mac mini', 'mac studio', 'mac', 'desktop'],
  'cat-7': ['acessorio', 'acessorios', 'cabo', 'carregador', 'teclado', 'pencil', 'caneta', 'magsafe'],
};

const useCaseMap = {
  estudar: ['cat-2', 'cat-3'],
  estudo: ['cat-2', 'cat-3'],
  trabalho: ['cat-2', 'cat-6'],
  trabalhar: ['cat-2', 'cat-6'],
  produtividade: ['cat-2', 'cat-6'],
  esporte: ['cat-4'],
  exercicio: ['cat-4'],
  corrida: ['cat-4'],
  academia: ['cat-4'],
  musica: ['cat-5'],
  podcast: ['cat-5'],
  foto: ['cat-1'],
  fotografia: ['cat-1'],
  camera: ['cat-1'],
  desenho: ['cat-3', 'cat-7'],
  design: ['cat-2', 'cat-3'],
  video: ['cat-2', 'cat-6'],
  edicao: ['cat-2', 'cat-6'],
  gaming: ['cat-2', 'cat-6'],
  jogo: ['cat-2', 'cat-6'],
};

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .trim();
}

function extractPrice(tokens) {
  let maxPrice = null;
  let minPrice = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const nextTokens = tokens.slice(i + 1, i + 3).join(' ');

    const priceMatch = nextTokens.match(/(\d[\d.]*)/);
    if (!priceMatch) continue;

    const rawNum = priceMatch[1].replace(/\./g, '');
    const price = parseFloat(rawNum);
    if (isNaN(price)) continue;

    if (['ate', 'menos', 'abaixo', 'maximo', 'max'].includes(token)) {
      maxPrice = price;
    } else if (['partir', 'acima', 'minimo', 'min'].includes(token)) {
      minPrice = price;
    }
  }

  // Also check for standalone numbers preceded by "r$" or "rs"
  for (let i = 0; i < tokens.length; i++) {
    if (['r$', 'rs', 'reais'].includes(tokens[i])) {
      const nextToken = tokens[i + 1];
      if (nextToken) {
        const num = parseFloat(nextToken.replace(/\./g, ''));
        if (!isNaN(num) && !maxPrice) {
          maxPrice = num;
        }
      }
    }
    // Check for patterns like "5000", "13000" standalone as max price hint
    if (!maxPrice && !minPrice) {
      const num = parseFloat(tokens[i].replace(/\./g, ''));
      if (!isNaN(num) && num >= 100) {
        // If preceded by "ate" or similar, already handled above
        // Otherwise treat large numbers as max price
        const prev = tokens[i - 1];
        if (prev && ['ate', 'menos', 'abaixo', 'maximo', 'max', 'r$', 'rs'].includes(prev)) {
          continue; // already handled
        }
      }
    }
  }

  return { maxPrice, minPrice };
}

export function smartSearch(query, products, categories) {
  if (!query || query.trim().length < 2) {
    return { results: [], interpretation: [], query };
  }

  const normalized = normalize(query);
  const tokens = normalized.split(/\s+/).filter(Boolean);
  const interpretation = [];

  // 1. Detect categories
  let matchedCategoryIds = new Set();

  for (const [catId, keywords] of Object.entries(categoryKeywords)) {
    for (const kw of keywords) {
      if (normalized.includes(kw)) {
        matchedCategoryIds.add(catId);
        const cat = categories.find(c => c.id === catId);
        if (cat) interpretation.push(`Categoria: ${cat.name}`);
        break;
      }
    }
  }

  // 2. Detect use cases
  for (const [useCase, catIds] of Object.entries(useCaseMap)) {
    if (normalized.includes(useCase)) {
      catIds.forEach(id => matchedCategoryIds.add(id));
      interpretation.push(`Uso: ${useCase}`);
    }
  }

  // 3. Extract price
  const { maxPrice, minPrice } = extractPrice(tokens);
  if (maxPrice) interpretation.push(`Ate R$ ${maxPrice.toLocaleString('pt-BR')}`);
  if (minPrice) interpretation.push(`A partir de R$ ${minPrice.toLocaleString('pt-BR')}`);

  // 4. Detect flags
  const expressKeywords = ['rapido', 'urgente', 'express', 'hoje', '1 hora', '1h', 'entrega rapida'];
  const expressOnly = expressKeywords.some(kw => normalized.includes(kw));
  if (expressOnly) interpretation.push('Entrega Express');

  const saleKeywords = ['oferta', 'desconto', 'promocao', 'promo', 'barato'];
  const onSaleOnly = saleKeywords.some(kw => normalized.includes(kw));
  if (onSaleOnly) interpretation.push('Em promocao');

  // 5. Detect quality/budget hints
  const qualityKeywords = ['melhor', 'pro', 'premium', 'top', 'avancado'];
  const budgetKeywords = ['barato', 'economico', 'custo beneficio', 'em conta', 'acessivel'];
  const wantQuality = qualityKeywords.some(kw => normalized.includes(kw));
  const wantBudget = budgetKeywords.some(kw => normalized.includes(kw));

  // 6. Detect storage
  const storageMatch = normalized.match(/(\d+)\s*gb/);
  const storageFilter = storageMatch ? `${storageMatch[1]}GB` : null;
  if (storageFilter) interpretation.push(`Armazenamento: ${storageFilter}`);

  // 7. Detect condition
  const wantUsed = normalized.includes('usado') || normalized.includes('seminovo');
  if (wantUsed) interpretation.push('Condicao: Usado');

  // Score and filter products
  let scored = products
    .filter(p => p.stock > 0)
    .map(product => {
      let score = 0;
      const prodNorm = normalize(product.name);
      const descNorm = normalize(product.description || '');

      // Category match
      if (matchedCategoryIds.size > 0) {
        if (matchedCategoryIds.has(product.category_id)) {
          score += 8;
        } else {
          score -= 5;
        }
      }

      // Name match
      for (const token of tokens) {
        if (token.length < 2) continue;
        if (['ate', 'menos', 'abaixo', 'acima', 'partir', 'melhor', 'pro', 'barato', 'com', 'para', 'de', 'e', 'ou', 'em', 'um', 'uma'].includes(token)) continue;
        if (prodNorm.includes(token)) score += 10;
        if (descNorm.includes(token)) score += 5;
      }

      // Spec match
      if (storageFilter && product.specs) {
        const hasStorage = product.specs.some(s => normalize(s.value).includes(normalize(storageFilter)));
        if (hasStorage) score += 6;
      }

      // Express match
      if (expressOnly && product.express_delivery) score += 4;
      if (expressOnly && !product.express_delivery) score -= 10;

      // Sale match
      if (onSaleOnly) {
        if (product.original_price && product.original_price > product.price) {
          score += 5;
        } else {
          score -= 3;
        }
      }

      // Condition match
      if (wantUsed) {
        if (product.condition === 'used') score += 5;
        else score -= 3;
      }

      // Price filter
      if (maxPrice && product.price > maxPrice) score -= 20;
      if (minPrice && product.price < minPrice) score -= 20;

      return { product, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (wantQuality) return b.product.price - a.product.price;
      if (wantBudget) return a.product.price - b.product.price;
      return 0;
    });

  return {
    results: scored.map(s => s.product),
    interpretation,
    query,
  };
}

export const suggestedQueries = [
  'iPhone com desconto',
  'Notebook leve para estudar ate 13000',
  'Melhor fone bluetooth',
  'Relogio para esporte',
  'Acessorio barato com entrega rapida',
  'iPad para desenho',
  'Mac para edicao de video',
  'Celular com camera 48MP',
];
