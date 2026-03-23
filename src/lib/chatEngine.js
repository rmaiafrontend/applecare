import { smartSearch } from './smartSearch';
import { formatPrice } from '@/lib/format';

const categoryKeywords = {
  'cat-1': ['iphone', 'celular', 'smartphone', 'telefone'],
  'cat-2': ['macbook', 'notebook', 'laptop', 'computador'],
  'cat-3': ['ipad', 'tablet'],
  'cat-4': ['watch', 'relogio', 'smartwatch'],
  'cat-5': ['airpods', 'fone', 'fones', 'headphone', 'audio'],
  'cat-6': ['imac', 'mac mini', 'mac studio', 'mac', 'desktop'],
  'cat-7': ['acessorio', 'acessorios', 'cabo', 'carregador', 'teclado', 'pencil'],
};

const useCaseKeywords = {
  estudar: { cats: ['cat-2', 'cat-3'], label: 'para estudos' },
  estudo: { cats: ['cat-2', 'cat-3'], label: 'para estudos' },
  trabalho: { cats: ['cat-2', 'cat-6'], label: 'para trabalho' },
  trabalhar: { cats: ['cat-2', 'cat-6'], label: 'para trabalho' },
  produtividade: { cats: ['cat-2', 'cat-6'], label: 'para produtividade' },
  esporte: { cats: ['cat-4'], label: 'para esportes' },
  exercicio: { cats: ['cat-4'], label: 'para exercicios' },
  corrida: { cats: ['cat-4'], label: 'para corrida' },
  academia: { cats: ['cat-4'], label: 'para academia' },
  musica: { cats: ['cat-5'], label: 'para musica' },
  podcast: { cats: ['cat-5'], label: 'para podcasts' },
  foto: { cats: ['cat-1'], label: 'para fotografia' },
  fotografia: { cats: ['cat-1'], label: 'para fotografia' },
  camera: { cats: ['cat-1'], label: 'para fotografia' },
  desenho: { cats: ['cat-3', 'cat-7'], label: 'para desenho' },
  design: { cats: ['cat-2', 'cat-3'], label: 'para design' },
  video: { cats: ['cat-2', 'cat-6'], label: 'para edicao de video' },
  edicao: { cats: ['cat-2', 'cat-6'], label: 'para edicao' },
  gaming: { cats: ['cat-2', 'cat-6'], label: 'para games' },
  jogo: { cats: ['cat-2', 'cat-6'], label: 'para games' },
  presente: { cats: [], label: 'para presente' },
};

const categoryNames = {
  'cat-1': 'iPhones',
  'cat-2': 'MacBooks',
  'cat-3': 'iPads',
  'cat-4': 'Apple Watch',
  'cat-5': 'Fones',
  'cat-6': 'Macs',
  'cat-7': 'Acessorios',
};

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .trim();
}

function extractPriceFromText(text) {
  const normalized = normalize(text);
  const tokens = normalized.split(/\s+/);
  let maxPrice = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (['ate', 'menos', 'abaixo', 'maximo', 'max'].includes(token)) {
      const nextTokens = tokens.slice(i + 1, i + 3).join('');
      const match = nextTokens.match(/(\d[\d.]*)/);
      if (match) {
        maxPrice = parseFloat(match[1].replace(/\./g, ''));
      }
    }
    if (['r$', 'rs'].includes(token)) {
      const next = tokens[i + 1];
      if (next) {
        const num = parseFloat(next.replace(/\./g, ''));
        if (!isNaN(num)) maxPrice = num;
      }
    }
  }

  // Standalone large numbers
  if (!maxPrice) {
    const numMatch = normalized.match(/(\d{3,})/);
    if (numMatch) {
      const num = parseFloat(numMatch[1]);
      if (num >= 100) maxPrice = num;
    }
  }

  return maxPrice;
}

function getProductBlurb(product, useCase) {
  const specs = product.specs || [];
  const chipSpec = specs.find(s => normalize(s.label).includes('chip') || normalize(s.label).includes('processador'));
  const storageSpec = specs.find(s => normalize(s.label).includes('armazenamento') || normalize(s.label).includes('capacidade'));
  const displaySpec = specs.find(s => normalize(s.label).includes('tela') || normalize(s.label).includes('display'));

  const parts = [];
  if (chipSpec) parts.push(chipSpec.value);
  if (storageSpec) parts.push(storageSpec.value);
  if (displaySpec) parts.push(`tela ${displaySpec.value}`);
  if (product.express_delivery) parts.push('entrega em 1h');

  const specStr = parts.length > 0 ? ` — ${parts.join(', ')}` : '';
  const discount = product.original_price && product.original_price > product.price
    ? ` (de ${formatPrice(product.original_price)})`
    : '';

  return `**${product.name}** por ${formatPrice(product.price)}${discount}${specStr}.`;
}

function detectIntent(text, context) {
  const normalized = normalize(text);
  const tokens = normalized.split(/\s+/);

  // Thanks / bye
  const thanksKw = ['obrigado', 'obrigada', 'valeu', 'vlw', 'brigado', 'brigada', 'tchau', 'ate mais', 'ate logo'];
  if (thanksKw.some(kw => normalized.includes(kw))) {
    return { type: 'thanks' };
  }

  // Greeting
  const greetKw = ['oi', 'ola', 'eae', 'eai', 'bom dia', 'boa tarde', 'boa noite', 'hey', 'hello'];
  if (greetKw.some(kw => normalized === kw || normalized.startsWith(kw + ' '))) {
    return { type: 'greeting' };
  }

  // Express
  const expressKw = ['rapido', 'urgente', 'express', 'hoje', 'pra hoje', 'agora', 'entrega rapida', '1h', '1 hora'];
  if (expressKw.some(kw => normalized.includes(kw))) {
    return { type: 'express' };
  }

  // Budget
  const maxPrice = extractPriceFromText(text);
  const budgetKw = ['barato', 'economico', 'acessivel', 'em conta', 'custo beneficio'];
  if (maxPrice || budgetKw.some(kw => normalized.includes(kw))) {
    return { type: 'budget', maxPrice: maxPrice || 5000 };
  }

  // Category
  for (const [catId, keywords] of Object.entries(categoryKeywords)) {
    for (const kw of keywords) {
      if (normalized.includes(kw)) {
        return { type: 'category', categoryId: catId };
      }
    }
  }

  // Use case
  for (const [kw, info] of Object.entries(useCaseKeywords)) {
    if (normalized.includes(kw)) {
      return { type: 'useCase', keyword: kw, ...info };
    }
  }

  // "nao sei" / vague
  const vagueKw = ['nao sei', 'me ajuda', 'ajuda', 'sugestao', 'sugere', 'recomenda', 'indica', 'qual', 'o que'];
  if (vagueKw.some(kw => normalized.includes(kw))) {
    return { type: 'vague' };
  }

  // Fallback: try smartSearch
  return { type: 'search' };
}

export function getGreeting() {
  return {
    role: 'ai',
    text: 'Ola! Sou o assistente aLink. Posso te ajudar a encontrar o produto Apple perfeito pra voce. O que esta procurando?',
    quickReplies: ['iPhone', 'MacBook', 'iPad', 'Fone de ouvido', 'Presente', 'Nao sei ainda'],
  };
}

export function processMessage(userMessage, products, categories, context = {}) {
  const intent = detectIntent(userMessage, context);
  const updatedContext = { ...context };
  let text = '';
  let resultProducts = [];
  let quickReplies = [];

  switch (intent.type) {
    case 'thanks': {
      text = 'Por nada! Foi um prazer te ajudar. Se precisar de mais alguma coisa, e so chamar. Boas compras!';
      quickReplies = ['Voltar ao inicio', 'Ver carrinho'];
      break;
    }

    case 'greeting': {
      text = 'Ola! Como posso te ajudar hoje? Me conta o que voce esta procurando ou o que precisa.';
      quickReplies = ['iPhone', 'MacBook', 'iPad', 'Fone de ouvido', 'Presente', 'Nao sei ainda'];
      break;
    }

    case 'express': {
      updatedContext.express = true;
      let filtered = products.filter(p => p.express_delivery && p.stock > 0);

      if (updatedContext.category) {
        filtered = filtered.filter(p => p.category_id === updatedContext.category);
      }
      if (updatedContext.maxPrice) {
        filtered = filtered.filter(p => p.price <= updatedContext.maxPrice);
      }

      filtered.sort((a, b) => a.price - b.price);
      resultProducts = filtered.slice(0, 5);

      if (resultProducts.length > 0) {
        text = `Entendi, voce precisa pra ja! Aqui estao os produtos com entrega Express (ate 1h):\n\n${resultProducts.map(p => getProductBlurb(p)).join('\n\n')}`;
        quickReplies = ['Ver mais opcoes', 'Algum com desconto?', 'Voltar ao inicio'];
      } else {
        text = 'Infelizmente nao encontrei produtos com entrega Express para os filtros atuais. Quer que eu busque sem o filtro de entrega rapida?';
        quickReplies = ['Sim, sem filtro de entrega', 'Outro produto'];
      }
      break;
    }

    case 'budget': {
      const maxPrice = intent.maxPrice;
      updatedContext.maxPrice = maxPrice;

      let filtered = products.filter(p => p.price <= maxPrice && p.stock > 0);

      if (updatedContext.category) {
        filtered = filtered.filter(p => p.category_id === updatedContext.category);
      }
      if (updatedContext.express) {
        filtered = filtered.filter(p => p.express_delivery);
      }

      filtered.sort((a, b) => b.price - a.price); // best within budget first
      resultProducts = filtered.slice(0, 5);

      const catLabel = updatedContext.category ? ` em ${categoryNames[updatedContext.category] || 'esta categoria'}` : '';

      if (resultProducts.length > 0) {
        text = `Otimo! Encontrei ${resultProducts.length} opcoes${catLabel} ate ${formatPrice(maxPrice)}:\n\n${resultProducts.map(p => getProductBlurb(p)).join('\n\n')}`;
        quickReplies = ['Entrega express?', 'Ver mais opcoes', 'Comparar esses'];
      } else {
        text = `Nao encontrei produtos${catLabel} ate ${formatPrice(maxPrice)}. Quer que eu amplie o orcamento?`;
        quickReplies = ['Ate R$ 8.000', 'Ate R$ 15.000', 'Sem limite'];
      }
      break;
    }

    case 'category': {
      const catId = intent.categoryId;
      updatedContext.category = catId;

      let filtered = products.filter(p => p.category_id === catId && p.stock > 0);

      if (updatedContext.maxPrice) {
        filtered = filtered.filter(p => p.price <= updatedContext.maxPrice);
      }
      if (updatedContext.express) {
        filtered = filtered.filter(p => p.express_delivery);
      }

      filtered.sort((a, b) => b.price - a.price);
      resultProducts = filtered.slice(0, 4);

      const catName = categoryNames[catId] || 'essa categoria';

      if (resultProducts.length > 0) {
        text = `Excelente escolha! Temos ${filtered.length} opcoes em ${catName}. Veja as principais:\n\n${resultProducts.map(p => getProductBlurb(p)).join('\n\n')}\n\nQual faixa de preco voce tem em mente?`;
        quickReplies = ['Ate R$ 5.000', 'Ate R$ 10.000', 'Sem limite de preco'];
      } else {
        text = `No momento nao temos ${catName} disponiveis com os filtros atuais. Quer ver outra categoria?`;
        quickReplies = ['iPhone', 'MacBook', 'iPad', 'Apple Watch'];
      }
      break;
    }

    case 'useCase': {
      const { cats, label } = intent;
      updatedContext.useCase = intent.keyword;

      let filtered = products.filter(p => cats.includes(p.category_id) && p.stock > 0);

      if (updatedContext.maxPrice) {
        filtered = filtered.filter(p => p.price <= updatedContext.maxPrice);
      }

      filtered.sort((a, b) => b.price - a.price);
      resultProducts = filtered.slice(0, 4);

      if (intent.keyword === 'presente' || cats.length === 0) {
        // Special "presente" handling — show popular across categories
        const popular = [...products]
          .filter(p => p.stock > 0)
          .sort((a, b) => {
            const discA = a.original_price ? (a.original_price - a.price) / a.original_price : 0;
            const discB = b.original_price ? (b.original_price - b.price) / b.original_price : 0;
            return discB - discA;
          });
        resultProducts = popular.slice(0, 4);
        text = `Para presentes, essas sao as melhores opcoes com otimo custo-beneficio:\n\n${resultProducts.map(p => getProductBlurb(p)).join('\n\n')}\n\nPra quem e o presente? Posso refinar a busca.`;
        quickReplies = ['Para trabalho', 'Para estudos', 'Para esporte', 'Ate R$ 3.000'];
      } else if (resultProducts.length > 0) {
        text = `Perfeito! ${label.charAt(0).toUpperCase() + label.slice(1)}, tenho otimas opcoes:\n\n${resultProducts.map(p => getProductBlurb(p, intent.keyword)).join('\n\n')}\n\nTem algum orcamento em mente?`;
        quickReplies = ['Ate R$ 5.000', 'Ate R$ 10.000', 'Sem limite', 'Entrega express?'];
      } else {
        text = `Nao encontrei produtos ${label} com os filtros atuais. Quer ver outras opcoes?`;
        quickReplies = ['Ver tudo', 'Outro uso'];
      }
      break;
    }

    case 'vague': {
      text = 'Sem problemas! Vou te ajudar a encontrar o produto ideal. Me conta: voce esta procurando pra que tipo de uso?';
      quickReplies = ['Para trabalho', 'Para estudos', 'Para presente', 'Para esporte', 'Para musica'];
      break;
    }

    case 'search':
    default: {
      // Fallback to smartSearch
      const searchResult = smartSearch(userMessage, products, categories);
      resultProducts = searchResult.results.slice(0, 5);

      if (resultProducts.length > 0) {
        text = `Encontrei ${resultProducts.length} resultado${resultProducts.length > 1 ? 's' : ''} pra voce:\n\n${resultProducts.map(p => getProductBlurb(p)).join('\n\n')}`;
        quickReplies = ['Ver mais opcoes', 'Refinar busca', 'Outro produto'];
      } else {
        text = 'Hmm, nao encontrei resultados para essa busca. Tenta me descrever de outro jeito o que voce precisa, ou escolha uma categoria:';
        quickReplies = ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'Fone de ouvido', 'Acessorios'];
      }
      break;
    }
  }

  return {
    response: {
      role: 'ai',
      text,
      products: resultProducts.length > 0 ? resultProducts : undefined,
      quickReplies: quickReplies.length > 0 ? quickReplies : undefined,
    },
    updatedContext,
  };
}
