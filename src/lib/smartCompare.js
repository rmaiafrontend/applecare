const categoryUseCases = {
  'cat-1': 'comunicacao e fotografia',
  'cat-2': 'trabalho e produtividade',
  'cat-3': 'criatividade e estudos',
  'cat-4': 'saude e atividades fisicas',
  'cat-5': 'audio e entretenimento',
  'cat-6': 'trabalho profissional',
  'cat-7': 'complementar seu ecossistema Apple',
};

const chipTiers = [
  'M2 Ultra', 'M3 Pro', 'M4', 'M3', 'M2',
  'A17 Pro', 'A16 Bionic', 'A15 Bionic', 'A14 Bionic',
  'S9 SiP', 'H2', 'H1',
];

function getChipRank(specs) {
  if (!specs) return -1;
  const chipSpec = specs.find(s => s.label === 'Chip');
  if (!chipSpec) return -1;
  const idx = chipTiers.findIndex(t => chipSpec.value.includes(t));
  return idx === -1 ? chipTiers.length : idx;
}

function getSpecValue(product, label) {
  if (!product.specs) return null;
  const spec = product.specs.find(s => s.label === label);
  return spec ? spec.value : null;
}

function getAllSpecLabels(products) {
  const labels = new Set();
  products.forEach(p => {
    if (p.specs) p.specs.forEach(s => labels.add(s.label));
  });
  return Array.from(labels);
}

function formatPrice(price) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}

export function generateComparison(products, categories) {
  if (!products || products.length < 2) return null;

  const specLabels = getAllSpecLabels(products);

  const specsTable = specLabels.map(label => ({
    label,
    values: products.map(p => getSpecValue(p, label) || '-'),
  }));

  // Find best value (cheapest)
  const sorted = [...products].sort((a, b) => a.price - b.price);
  const cheapest = sorted[0];
  const mostExpensive = sorted[sorted.length - 1];

  // Find best chip
  const byChip = [...products].sort((a, b) => getChipRank(a.specs) - getChipRank(b.specs));
  const bestChip = byChip[0];

  // Check if same category
  const sameCategory = products.every(p => p.category_id === products[0].category_id);

  // Build recommendation text
  let recommendation = '';
  const priceDiff = mostExpensive.price - cheapest.price;

  if (sameCategory) {
    const chipA = getSpecValue(bestChip, 'Chip');
    recommendation = `Entre ${products.map(p => p.name).join(' e ')}, `;

    if (cheapest.id === bestChip.id) {
      recommendation += `o ${cheapest.name} se destaca como a melhor opcao, oferecendo o melhor chip${chipA ? ` (${chipA})` : ''} pelo menor preco. `;
    } else {
      recommendation += `o ${cheapest.name} oferece o melhor custo-beneficio, custando ${formatPrice(priceDiff)} a menos. `;
      if (chipA) {
        recommendation += `Porem, se voce busca performance superior, o ${bestChip.name} se destaca com o chip ${chipA}. `;
      }
    }

    const expressProducts = products.filter(p => p.express_delivery);
    if (expressProducts.length > 0 && expressProducts.length < products.length) {
      recommendation += `Para receber mais rapido, o ${expressProducts.map(p => p.name).join(' e ')} conta${expressProducts.length > 1 ? 'm' : ''} com entrega express em 1 hora.`;
    }
  } else {
    recommendation = `Esses produtos atendem necessidades diferentes. `;
    products.forEach((p, i) => {
      const useCase = categoryUseCases[p.category_id] || 'uso geral';
      recommendation += `O ${p.name} e ideal para ${useCase}${i < products.length - 1 ? ', enquanto ' : '. '}`;
    });
    recommendation += `Considerando o investimento, o ${cheapest.name} e a opcao mais acessivel por ${formatPrice(cheapest.price)}.`;
  }

  // Highlights
  const highlights = [];

  const withDiscount = products.filter(p => p.original_price && p.original_price > p.price);
  if (withDiscount.length > 0) {
    const best = withDiscount.sort((a, b) => (1 - a.price / a.original_price) - (1 - b.price / b.original_price)).reverse()[0];
    const pct = Math.round((1 - best.price / best.original_price) * 100);
    highlights.push({ type: 'discount', product: best.name, text: `${pct}% de desconto` });
  }

  const expressOnes = products.filter(p => p.express_delivery);
  if (expressOnes.length > 0) {
    highlights.push({ type: 'express', product: expressOnes.map(p => p.name).join(', '), text: 'Entrega em 1 hora' });
  }

  if (bestChip && getSpecValue(bestChip, 'Chip')) {
    highlights.push({ type: 'performance', product: bestChip.name, text: `Chip ${getSpecValue(bestChip, 'Chip')}` });
  }

  return {
    specsTable,
    recommendation,
    bestValue: cheapest,
    highlights,
  };
}
